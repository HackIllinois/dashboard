import { useEffect, useMemo, useState } from "react";
import "./acm.css";
import { AcmItem, acmSchedule } from "./acmSchedule";
import {
  Event,
  ShiftAssignment,
  ShiftCandidateUser,
  getEventsWithToken,
  getStaffEventsWithToken,
  getStaffShiftAssignmentsWithToken,
  getStaffShiftCandidatesWithToken
} from "./util/api";

type LaidOutItem = AcmItem & {
  source: "event" | "staffShift";
  column: number;
  totalColumns: number;
  topPct: number;
  heightPct: number;
};

type TimeMarker = {
  id: string;
  label: string;
  topPct: number;
};

type DaySummary = {
  dayKey: string;
  label: string;
  start: Date;
  end: Date;
  items: DashboardItem[];
};

type DashboardItem = AcmItem & {
  source: "event" | "staffShift";
  eventIds?: string[];
};

function dayLabel(dayKey: string): string {
  const [year, month, day] = dayKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric"
  });
}

function formatClock(date: Date): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function getDaySummaries(items: DashboardItem[]): DaySummary[] {
  const byDay = new Map<string, DashboardItem[]>();

  for (const item of items) {
    const list: DashboardItem[] = byDay.get(item.dayKey) ?? [];
    list.push(item);
    byDay.set(item.dayKey, list);
  }

  return Array.from(byDay.entries())
    .map(([key, dayItems]) => {
      const ordered = dayItems.slice().sort((a, b) => a.start.getTime() - b.start.getTime());
      return {
        dayKey: key,
        label: dayLabel(key),
        start: ordered[0].start,
        end: ordered.reduce((acc, cur) => (cur.end > acc ? cur.end : acc), ordered[0].end),
        items: ordered
      };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}

function chooseVisibleDay(days: DaySummary[], now: Date): DaySummary {
  const localDayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const exact = days.find((d) => d.dayKey === localDayKey);
  if (exact) return exact;

  if (now < days[0].start) return days[0];
  if (now > days[days.length - 1].end) return days[days.length - 1];

  const enclosing = days.find((d) => now >= d.start && now <= d.end);
  return enclosing ?? days[0];
}

function layoutItems(items: DashboardItem[]): LaidOutItem[] {
  if (!items.length) return [];

  const minStartMs = Math.min(...items.map((item) => item.start.getTime()));
  const maxEndMs = Math.max(...items.map((item) => item.end.getTime()));
  const timelineStartMs = Math.floor(minStartMs / 3_600_000) * 3_600_000;
  const timelineEndMs = Math.ceil(maxEndMs / 3_600_000) * 3_600_000;
  const totalSpan = Math.max(60, (timelineEndMs - timelineStartMs) / 60_000);

  const working = items
    .slice()
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .map((item) => ({
      item,
      startMinute: (item.start.getTime() - timelineStartMs) / 60_000,
      endMinute: (item.end.getTime() - timelineStartMs) / 60_000,
      column: 0,
      totalColumns: 1
    }));

  let groupStart = 0;
  let groupEnd = -1;
  let active: Array<{ endMinute: number; column: number }> = [];

  const finalizeGroup = (start: number, end: number) => {
    if (end < start) return;
    const columns = Math.max(...working.slice(start, end + 1).map((x) => x.column)) + 1;
    for (let i = start; i <= end; i += 1) {
      working[i].totalColumns = columns;
    }
  };

  working.forEach((entry, idx) => {
    if (idx === 0) {
      groupEnd = entry.endMinute;
    } else if (entry.startMinute >= groupEnd) {
      finalizeGroup(groupStart, idx - 1);
      groupStart = idx;
      groupEnd = entry.endMinute;
      active = [];
    } else {
      groupEnd = Math.max(groupEnd, entry.endMinute);
    }

    active = active.filter((slot) => slot.endMinute > entry.startMinute);
    const occupied = new Set(active.map((slot) => slot.column));
    let column = 0;
    while (occupied.has(column)) {
      column += 1;
    }

    entry.column = column;
    active.push({ endMinute: entry.endMinute, column });
  });

  finalizeGroup(groupStart, working.length - 1);

  return working.map((entry) => {
    const topPct = (entry.startMinute / totalSpan) * 100;
    const heightPct = (Math.max(30, entry.endMinute - entry.startMinute) / totalSpan) * 100;

    return {
      ...entry.item,
      column: entry.column,
      totalColumns: entry.totalColumns,
      topPct,
      heightPct
    };
  });
}

function buildTimeMarkers(items: DashboardItem[]): TimeMarker[] {
  if (!items.length) return [];

  const minStartMs = Math.min(...items.map((item) => item.start.getTime()));
  const maxEndMs = Math.max(...items.map((item) => item.end.getTime()));
  const timelineStartMs = Math.floor(minStartMs / 3_600_000) * 3_600_000;
  const timelineEndMs = Math.ceil(maxEndMs / 3_600_000) * 3_600_000;
  const span = Math.max(1, timelineEndMs - timelineStartMs);

  const markers: TimeMarker[] = [];
  for (let ms = timelineStartMs; ms <= timelineEndMs; ms += 3_600_000) {
    const markerDate = new Date(ms);
    markers.push({
      id: markerDate.toISOString(),
      label: formatClock(markerDate),
      topPct: ((ms - timelineStartMs) / span) * 100
    });
  }
  return markers;
}

export default function AcmDashboard() {
  const [now, setNow] = useState(new Date());
  const [items, setItems] = useState<DashboardItem[]>(
    acmSchedule.map((item) => ({ ...item, source: "staffShift" }))
  );
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const token = useMemo(() => new URLSearchParams(window.location.search).get("token"), []);

  useEffect(() => {
    if (!token) {
      return;
    }

    const loadAcmItems = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const [events, staffEvents, assignmentsResponse, candidatesResponse] = await Promise.all([
          getEventsWithToken(token),
          getStaffEventsWithToken(token),
          getStaffShiftAssignmentsWithToken(token),
          getStaffShiftCandidatesWithToken(token)
        ]);
        const shiftStaffMap = buildShiftStaffMap(
          assignmentsResponse.assignments,
          candidatesResponse.users
        );

        const regularItemsRaw = events
          .filter((event) => event.eventType !== "MEETING" && event.eventType !== "STAFFSHIFT")
          .map((event) => eventToDashboardItem(event, shiftStaffMap, "event"));
        const collapsedRegularItems = collapseExpoItems(regularItemsRaw);

        const staffShiftItemsRaw = staffEvents
          .filter((event) => event.eventType === "STAFFSHIFT")
          .map((event) => eventToDashboardItem(event, shiftStaffMap, "staffShift"));
        const collapsedStaffShiftItems = collapseExpoItems(staffShiftItemsRaw);

        const merged = dedupeItems([...collapsedRegularItems, ...collapsedStaffShiftItems])
          .sort((a, b) => a.start.getTime() - b.start.getTime());

        if (merged.length > 0) {
          setItems(merged);
        }
      } catch (_error) {
        setLoadError("Failed to fetch ACM events from API.");
      } finally {
        setLoading(false);
      }
    };

    void loadAcmItems();
  }, [token]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => window.location.reload(), 300_000);
    return () => window.clearInterval(timer);
  }, []);

  const daySummaries = useMemo(() => getDaySummaries(items), [items]);
  const activeDay = useMemo(() => chooseVisibleDay(daySummaries, now), [daySummaries, now]);
  const laidOut = useMemo(() => layoutItems(activeDay.items), [activeDay]);
  const markers = useMemo(() => buildTimeMarkers(activeDay.items), [activeDay]);
  const liveItems = useMemo(
    () => activeDay.items.filter((item) => now >= item.start && now < item.end),
    [activeDay, now]
  );
  const upcomingItems = useMemo(
    () => items.filter((item) => item.start >= now).slice(0, 8),
    [items, now]
  );

  const totalNeeded = liveItems.reduce((sum, item) => sum + (item.needed ?? 0), 0);
  const detailWindowEnd = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  return (
    <main className="acm-dashboard">
      <div className="acm-glow acm-glow-one" />
      <div className="acm-glow acm-glow-two" />

      <header className="acm-header">
        <div>
          <h1>Internal Events Dash</h1>
          <p>{activeDay.label}</p>
          {token && <p className="acm-api-mode">API mode enabled</p>}
          {loadError && <p className="acm-api-error">{loadError}</p>}
        </div>
        <div className="acm-clock-wrap">
          <span className="acm-clock-label">Local Time</span>
          <strong>{formatClock(now)}</strong>
        </div>
      </header>

      <section className="acm-body">
        <aside className="acm-side">
          <article className="acm-panel">
            <h2>Live Now</h2>
            <p className="acm-metric">{liveItems.length} running</p>
            <p className="acm-submetric">Staff requested: {totalNeeded}</p>
            {liveItems.slice(0, 3).map((item) => (
              <div key={item.id} className="acm-compact-item">
                <strong>{item.title}</strong>
                <span>
                  {formatClock(item.start)} - {formatClock(item.end)}
                </span>
                <span className={`acm-badge acm-badge-${item.source}`}>
                  {item.source === "staffShift" ? "Staff Shift" : "Event"}
                </span>
                {item.source === "staffShift" && item.staff && (
                  <span className="acm-upnext-lead">Assigned: {item.staff}</span>
                )}
              </div>
            ))}
          </article>

          <article className="acm-panel">
            <h2>Up Next</h2>
            {upcomingItems.map((item) => (
              <div key={item.id} className="acm-compact-item">
                <strong>{item.title}</strong>
                <span>
                  {dayLabel(item.dayKey).split(",")[0]} {formatClock(item.start)}
                </span>
                <span className={`acm-badge acm-badge-${item.source}`}>
                  {item.source === "staffShift" ? "Staff Shift" : "Event"}
                </span>
                {item.source === "staffShift" && item.staff && (
                  <span className="acm-upnext-lead">Assigned: {item.staff}</span>
                )}
                {item.lead && <span className="acm-upnext-lead">Lead: {item.lead}</span>}
              </div>
            ))}
          </article>
        </aside>

        <section className="acm-timeline-panel">
          <div className="acm-time-rail">
            {markers.map((marker) => (
              <div key={marker.id} className="acm-time-marker" style={{ top: `${marker.topPct}%` }}>
                {marker.label}
              </div>
            ))}
          </div>

          <div className="acm-timeline">
            {markers.map((marker) => (
              <div
                key={`${marker.id}-line`}
                className="acm-grid-line"
                style={{ top: `${marker.topPct}%` }}
              />
            ))}

            {laidOut.map((item) => {
              const width = `calc((100% - ${(item.totalColumns - 1) * 10}px) / ${item.totalColumns})`;
              const left = `calc(${(item.column / item.totalColumns) * 100}% + ${item.column * 10}px)`;
              const isLive = now >= item.start && now < item.end;
              const isDetailed = item.start < detailWindowEnd && item.end > now;
              const eventMinutes = Math.max(1, (item.end.getTime() - item.start.getTime()) / 60_000);
              const sizeTier = eventMinutes < 45 ? "tight" : eventMinutes < 75 ? "small" : "full";

              return (
                <article
                  key={item.id}
                  className={`acm-item ${item.source === "staffShift" ? "acm-item-shift" : "acm-item-event"} ${isLive ? "acm-item-live" : ""} ${isDetailed ? "acm-item-detailed" : "acm-item-compact"} acm-item-${sizeTier}`}
                  style={{
                    top: `${item.topPct}%`,
                    height: `${item.heightPct}%`,
                    width,
                    left
                  }}
                >
                  <h3>{item.title}</h3>
                  {isDetailed ? (
                    <>
                      <div className="acm-time-row">
                        <p className="acm-time-range">
                          {formatClock(item.start)} - {formatClock(item.end)}
                        </p>
                      </div>
                      <p className="acm-item-type">{item.source === "staffShift" ? "Staff Shift" : "Event"}</p>
                      {sizeTier !== "tight" && item.needed !== undefined && <p className="acm-detail">Needed: {item.needed}</p>}
                      {sizeTier === "full" && item.staff && <p className="acm-detail acm-staff">Staff: {item.staff}</p>}
                      {sizeTier === "full" && item.backup && <p className="acm-detail acm-muted-detail">Backup: {item.backup}</p>}
                    </>
                  ) : (
                    <div className="acm-compact-meta">
                      <p className="acm-time-range">{formatClock(item.start)}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </section>
      {loading && <div className="acm-loading">Refreshing from API...</div>}
    </main>
  );
}

function toDayKeyFromSeconds(epochSeconds: number): string {
  const date = new Date(epochSeconds * 1000);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function eventToDashboardItem(
  event: Event,
  shiftStaffMap: Map<string, string[]>,
  source: "event" | "staffShift"
): DashboardItem {
  const eventId = event.eventId || event.id;
  const isStaffShift = source === "staffShift";
  return {
    id: eventId,
    eventIds: eventId ? [eventId] : [],
    dayKey: toDayKeyFromSeconds(event.startTime),
    start: new Date(event.startTime * 1000),
    end: new Date(event.endTime * 1000),
    title: event.name,
    source,
    staff:
      isStaffShift && eventId
        ? (shiftStaffMap.get(eventId) ?? []).join(", ")
        : undefined
  };
}

function collapseExpoItems(items: DashboardItem[]): DashboardItem[] {
  const grouped = new Map<string, DashboardItem>();
  const passthrough: DashboardItem[] = [];

  for (const item of items) {
    const lower = item.title.toLowerCase();
    const category = lower.includes("company expo")
      ? "Company Expo"
      : lower.includes("rso expo")
        ? "RSO Expo"
        : lower.includes("solar search")
          ? "Solar Search"
        : null;
        
    if (!category) {
      passthrough.push(item);
      continue;
    }

    const key = `${item.dayKey}|${category}`;
    const existing = grouped.get(key);
    if (!existing) {
      grouped.set(key, {
        ...item,
        title: category,
        eventIds: [...(item.eventIds ?? (item.id ? [item.id] : []))]
      });
      continue;
    }

    const mergedIds = new Set([...(existing.eventIds ?? []), ...(item.eventIds ?? (item.id ? [item.id] : []))]);
    grouped.set(key, {
      ...existing,
      start: item.start < existing.start ? item.start : existing.start,
      end: item.end > existing.end ? item.end : existing.end,
      eventIds: Array.from(mergedIds)
    });
  }

  return [...passthrough, ...Array.from(grouped.values())];
}

function dedupeItems(items: DashboardItem[]): DashboardItem[] {
  const seen = new Set<string>();
  const deduped: DashboardItem[] = [];
  for (const item of items) {
    const key = `${item.source}|${item.title}|${item.start.getTime()}|${item.end.getTime()}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    deduped.push(item);
  }
  return deduped;
}

function buildShiftStaffMap(
  assignments: ShiftAssignment[],
  users: ShiftCandidateUser[]
): Map<string, string[]> {
  const userNameById = new Map<string, string>();
  for (const user of users) {
    userNameById.set(user.userId, user.name || user.userId);
  }

  const shiftToNames = new Map<string, string[]>();
  for (const assignment of assignments) {
    const resolvedName = userNameById.get(assignment.userId) ?? assignment.userId;
    for (const shiftId of assignment.shifts) {
      const current = shiftToNames.get(shiftId) ?? [];
      current.push(resolvedName);
      shiftToNames.set(shiftId, current);
    }
  }

  for (const shiftId of Array.from(shiftToNames.keys())) {
    const names = shiftToNames.get(shiftId) ?? [];
    const uniqueSorted = Array.from(new Set(names)).sort((a, b) => a.localeCompare(b));
    shiftToNames.set(shiftId, uniqueSorted);
  }

  return shiftToNames;
}
