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