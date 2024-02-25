import { useEffect, useState } from "react";
// import {getLeaderboard, Profile} from "./api";

export const useTime = (refreshCycle = 1000) => {
    const [now, setNow] = useState(getTime());
    const [countdown, setCountdown] = useState(getCountdown());
    const [isHacking, setIsHacking] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(getTime());
            if (Date.now() < 1708736400000) {
                setCountdown(getStartCountdown)
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
    const t = 1708866000000 - Date.now();
    if (t < 0) return {days: 0, hours: 0, minutes: 0, seconds: 0};
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    return {days, hours, minutes, seconds}
}

const getStartCountdown = () => {
    const t = 1708736400000 - Date.now();
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    return {days, hours, minutes, seconds}
};
