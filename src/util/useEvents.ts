import { getEvents } from "./api";
import { useEffect, useState } from "react";
import { Event } from "./api";

export const useEvents = (refreshCycle = 900000) => {
    console.log("useLeaderboard");
    const [events, setEvents] = useState<Event[]>([]);

   

    useEffect(() => {
        getEvents().then((res) => setEvents(res.sort((a, b) => a.startTime - b.startTime).slice(0, 3)));
        const intervalId = setInterval(() => {
            console.log("fetching leaderboard");
            getEvents().then((res) => setEvents(res.sort((a, b) => a.startTime - b.startTime).slice(0, 3)));
            
        }, refreshCycle);
        return () => clearInterval(intervalId);
    }, [refreshCycle, setEvents]);

    return events;
};