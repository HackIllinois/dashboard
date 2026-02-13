import { getAttendeeTeams } from "./api";
import { useEffect, useState } from "react";
import { AttendeeTeam } from "./api";

export const useAttendeeTeams = (refreshCycle = 600000) => {
    const [teams, setTeams] = useState<AttendeeTeam[]>([]);

   

    useEffect(() => {
        getAttendeeTeams().then((res) => setTeams(res.slice(0, 10)));

        
        const intervalId = setInterval(() => {
            // console.log("events")
            getAttendeeTeams().then((res) => setTeams(res.slice(0, 10)));
            
        }, refreshCycle);
        return () => clearInterval(intervalId);
    }, [refreshCycle, setTeams]);

    return useAttendeeTeams;
};