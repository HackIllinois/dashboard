import { getLeaderboard } from "./api";
import { useEffect, useState } from "react";
import { Profile } from "./api";

export const useLeaderboard = (refreshCycle = 900000) => {
    console.log("useLeaderboard");
    const [leaderboard, setLeaderboard] = useState<Profile[]>([]);

   

    useEffect(() => {
        getLeaderboard().then((res) => setLeaderboard(res.slice(0, 10)));
        const intervalId = setInterval(() => {
            console.log("fetching leaderboard");
            getLeaderboard().then((res) => setLeaderboard(res.slice(0, 10)));
            
        }, refreshCycle);
        return () => clearInterval(intervalId);
    }, [refreshCycle, setLeaderboard]);

    return leaderboard;
};