import { useEffect, useMemo, useState } from "react";
import "./acm.css";
import { AcmItem, acmSchedule } from "./acmSchedule";

type LaidOutItem = AcmItem & {
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
  items: AcmItem[];
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

function getDaySummaries(items: AcmItem[]): DaySummary[] {
  const byDay = new Map<string, AcmItem[]>();

  for (const item of items) {
    const list = byDay.get(item.dayKey) ?? [];
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

function layoutItems(items: AcmItem[]): LaidOutItem[] {
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

function buildTimeMarkers(items: AcmItem[]): TimeMarker[] {
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

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => window.location.reload(), 300_000);
    return () => window.clearInterval(timer);
  }, []);

  const daySummaries = useMemo(() => getDaySummaries(acmSchedule), []);
  const activeDay = useMemo(() => chooseVisibleDay(daySummaries, now), [daySummaries, now]);
  const laidOut = useMemo(() => layoutItems(activeDay.items), [activeDay]);
  const markers = useMemo(() => buildTimeMarkers(activeDay.items), [activeDay]);
  const liveItems = useMemo(
    () => activeDay.items.filter((item) => now >= item.start && now < item.end),
    [activeDay, now]
  );
  const upcomingItems = useMemo(
    () => acmSchedule.filter((item) => item.start >= now).slice(0, 8),
    [now]
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
                  className={`acm-item ${isLive ? "acm-item-live" : ""} ${isDetailed ? "acm-item-detailed" : "acm-item-compact"} acm-item-${sizeTier}`}
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
    </main>
  );
}
