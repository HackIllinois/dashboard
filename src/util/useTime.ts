import { useEffect, useState } from "react";
// import {getLeaderboard, Profile} from "./api";

const HACK_START = 1740787200000;
const HACK_END = 1740920400000;

export const useTime = (refreshCycle = 1000) => {
    const [now, setNow] = useState(getTime());
    const [countdown, setCountdown] = useState(getCountdown());
    const [isHacking, setIsHacking] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(getTime());
            if (Date.now() < HACK_START) {
              setCountdown(getStartCountdown);
            } else {
              setIsHacking(true);
              setCountdown(getCountdown());
            }
        }, refreshCycle);
        return () => clearInterval(intervalId);
    }, [refreshCycle, setNow, setCountdown]);

    return { now, countdown, isHacking };
};

const getTime = () => {
    return new Date();
};

const getCountdown = () => {
    const t = HACK_END - Date.now();
    if (t < 0) return {days: 0, hours: 0, minutes: 0, seconds: 0};
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    return {days, hours, minutes, seconds}
}

const getStartCountdown = () => {
    const t = HACK_START - Date.now();
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    return {days, hours, minutes, seconds}
};
