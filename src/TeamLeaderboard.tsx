import { useMemo } from "react";
import { useAttendeeTeams } from "./util/useAttendeeTeams";
import Aquila from "./assets/Aquila.svg"
import Hydrus from "./assets/Hydrus.svg"
import Delphinus from "./assets/Delphinus.svg"
import Orion from "./assets/Orion.svg"

export default function TeamLeaderboard() {

    const attendeeTeams = useAttendeeTeams();
      const sortedTeams = useMemo(() => {
        return [...attendeeTeams].sort((a,b) => b.points - a.points);
      }, [attendeeTeams])

    const logoMap: Record<string, string> = {
        Aquila,
        Hydrus,
        Delphinus,
        Orion,
      };

    return (
        <>
                {sortedTeams.map((team) => (
                     <div 
                     key={team.id} 
                     style={{
      width:"23vh",
       height:"23vh", 
       marginTop:"1vh",
       border:"0.13vh solid #00FF2B", borderRadius:"3.5vh", 
      background:`
      linear-gradient(180deg, rgba(0, 135, 3, 0.38), rgba(0, 135, 3, 0.38)),
      linear-gradient(to right, rgba(84, 172, 72, 0.20) 3px, transparent 1px),
      linear-gradient(to bottom, rgba(84, 172, 72, 0.20) 3px, transparent 1px)
      `, backgroundSize: "100% 100%, 25% 25%, 25% 25%"}}>
        <img alt="team" src={logoMap[team.name]} style={{width:"16vh", height:"16vh"}}></img>
        <div style={{fontSize:"2.2vh", fontFamily:"Tsukimi Rounded", color:"white", fontWeight:700, marginTop:"-1vh"}}>{team.points} Points</div>
        <div style={{fontSize:"2.2vh", fontFamily:"Tsukimi Rounded", color:"white", fontWeight:700}}>{team.members} Members</div>
         {/* <div style={{fontSize:"2.2vh", fontFamily:"Tsukimi Rounded", color:"white", fontWeight:700, marginTop:"-1vh"}}>0 Points</div> */}
        {/* <div style={{fontSize:"2.2vh", fontFamily:"Tsukimi Rounded", color:"white", fontWeight:700}}>0 Members</div> */}
        
      </div>


                ))}
        </>
    )
}