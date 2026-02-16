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


//     useEffect(() => {
//   getAttendeeTeams()
//     .then((res) => {
//       console.log("getAttendeeTeams res:", res);
//       console.log("isArray?", Array.isArray(res), "len:", res?.length);
//       setTeams((Array.isArray(res) ? res : []).slice(0, 10));
//     })
//     .catch((e) => console.error("getAttendeeTeams failed:", e));
// }, []);

    // console.log(teams)
    return teams;
};