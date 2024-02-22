import { useEffect, useState } from "react";
// import {getLeaderboard, Profile} from "./api";

export const useTime = (refreshCycle = 30000) => {
    const [now, setNow] = useState(getTime());
    const [countdown, setCountdown] = useState(getCountdown());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(getTime());
            setCountdown(getCountdown());
        }, refreshCycle);
        return () => clearInterval(intervalId);
    }, [refreshCycle, setNow, setCountdown]);

    return { now, countdown };
};

const getTime = () => {
    return new Date();
};

const getCountdown = () => {
    const t = 1708866000000 - Date.now();
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    return {days, hours, minutes}
}
