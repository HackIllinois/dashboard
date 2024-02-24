import { getEvents } from "./api";
import { useEffect, useState } from "react";
import { Event } from "./api";

export const useEvents = (refreshCycle = 600000) => {
    const [events, setEvents] = useState<Event[]>([]);

   

    useEffect(() => {
        getEvents().then((res) => setEvents(res.sort((a, b) => a.startTime - b.startTime).filter((e) => e.endTime >= (Date.now()/1000)).slice(0, 3)));
        const intervalId = setInterval(() => {

            getEvents().then((res) => setEvents(res.sort((a, b) => a.startTime - b.startTime).slice(0, 3)));
            
        }, refreshCycle);
        return () => clearInterval(intervalId);
    }, [refreshCycle, setEvents]);

    return events;
};