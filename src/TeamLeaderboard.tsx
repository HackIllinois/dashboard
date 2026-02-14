import { useAttendeeTeams } from "./util/useAttendeeTeams";
import team1 from "./assets/team1.svg"

export default function TeamLeaderboard() {

    const attendeeTeams = useAttendeeTeams();

    // console.log(attendeeTeams)

    return (
        <>

        {/* <div style={{display:"block"}}> */}
                {attendeeTeams.map((team) => (

                     <div style={{
    // position:"absolute",
      width:"23vh",
       height:"23vh", 
       marginTop:"1vh",
    //    top:"2.5svh", 
    //    left:"150vh",
       border:"0.13vh solid #00FF2B", borderRadius:"3.5vh", 
      background:`
      linear-gradient(180deg, rgba(0, 135, 3, 0.38), rgba(0, 135, 3, 0.38)),
      linear-gradient(to right, rgba(84, 172, 72, 0.20) 3px, transparent 1px),
      linear-gradient(to bottom, rgba(84, 172, 72, 0.20) 3px, transparent 1px)
      `, backgroundSize: "100% 100%, 25% 25%, 25% 25%"}}>
        <img alt="team" src={team1} style={{width:"16vh", height:"16vh"}}></img>
        <div style={{fontSize:"2.2vh", fontFamily:"Tsukimi Rounded", color:"white", fontWeight:700, marginTop:"-1vh"}}>{team.points} Points</div>
        <div style={{fontSize:"2.2vh", fontFamily:"Tsukimi Rounded", color:"white", fontWeight:700}}>{team.members} Members</div>
        
      </div>


                ))}
        

      {/* </div> */}
        </>
    )
}