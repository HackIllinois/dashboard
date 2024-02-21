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
    const t = Date.now() - 1708866000;
    return new Date(t);
}
