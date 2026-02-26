import { getAttendeeTeams } from "./api";
import { useEffect, useState } from "react";
import { AttendeeTeam } from "./api";

export const useAttendeeTeams = (refreshCycle = 600000) => {
    const [teams, setTeams] = useState<AttendeeTeam[]>([]);

    useEffect(() => {
        getAttendeeTeams().then((res) => setTeams(res));

        
        const intervalId = setInterval(() => {
            getAttendeeTeams().then((res) => setTeams(res));
            
        }, refreshCycle);
        return () => clearInterval(intervalId);
    }, [refreshCycle, setTeams]);


        // console.log(teams)
    return teams;
};