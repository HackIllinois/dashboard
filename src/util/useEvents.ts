import { getEvents } from "./api";
import { useEffect, useState } from "react";
import { Event } from "./api";

export const useEvents = (refreshCycle = 600000) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await getEvents();

      const base = res
        .slice() // avoid mutating res when sorting
        .sort((a, b) => a.startTime - b.startTime)
        .filter((e) => e.endTime >= Date.now() / 1000);

      const top6 = base.slice(0, 6);

      // count long titles ONLY within the top 6
      const longTitleCount = top6.filter(
        (e) => e.name && e.name.length >= 29
      ).length;

      const reduction = Math.ceil(longTitleCount / 2);
      const finalCount = Math.max(0, 6 - reduction);

      setEvents(base.slice(0, finalCount));
    };

    fetchEvents();
    const intervalId = setInterval(fetchEvents, refreshCycle);
    return () => clearInterval(intervalId);
  }, [refreshCycle]);

  return events;
};