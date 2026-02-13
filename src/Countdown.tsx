import { useTime } from "./util/useTime";
import caution from "./assets/caution.svg"
import asset2 from "./assets/asset2.svg"
import asset3 from "./assets/asset3.svg"

export default function Countdown() {

    const {countdown, isHacking} = useTime();

    return (
<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.2vh",
    color: "#E9FFE9",
    fontFamily: "Tsukimi Rounded",
    width:"fit-content",
    // position:"absolute",
    // top:"1vh",
    // left: (countdown.days > 0) ? "59vh" : "68vh",
    zIndex:999
  }}
>
    
  <span
    style={{
        fontSize: "2.5vh",
        opacity: 0.9,
        textTransform: "uppercase",
        color: isHacking ? "#F73F3F" : "#E9FFE9",
        fontWeight:700,
    }}
  >
    {isHacking && <img src={caution} style={{width:"2.3vh", marginRight: "1vh"}}></img>}
    {isHacking ? "Hacking Ends in:" : "Hacking Starts in:"}
    {isHacking && <img src={caution} style={{width:"2.3vh", marginLeft: "1vh"}}></img>}
  </span>


  <div style={{display:"flex", flexDirection:"row"}}>
        <img src={isHacking ? asset2 : asset3} style={{width:"4vh"}}/>

  <div
    style={{
        display: "grid",
        gridAutoFlow: "column",
        gridAutoColumns: "1fr",
        gap: "6vh",
        alignItems: "center",
        border: isHacking ? "0.13vh solid #F00" : "0.13vh solid #00FF2B",
        borderRadius:"3.5vh", 
        background: isHacking ? "rgba(255, 0, 0, 0.20)" : "rgba(0, 255, 0, 0.20)",
        backdropFilter:"blur(17.5px)",
        padding:"1.5vh"
    }}
  >

    {countdown.days > 0 && (
      <div style={{ display: "grid", justifyItems: "center", rowGap: "0.6vh" }}>
        <div style={{ fontSize: "4.5vh", fontWeight: 700, lineHeight: 1, textShadow:"0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)" }}>
          {countdown.days}
        </div>
        <div style={{ fontSize: "2.5vh", fontWeight: 700, textShadow:"0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)" }}>DAYS</div>
      </div>
    )}

    <div style={{ display: "grid", justifyItems: "center", rowGap: "0.6vh" }}>
      <div style={{ fontSize: "4.5vh", fontWeight: 700, lineHeight: 1, textShadow:"0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)"}}>
        {countdown.hours}
      </div>
      <div style={{ fontSize: "2.5vh", fontWeight: 700, textShadow:"0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)" }}>HRS</div>
    </div>

    <div style={{ display: "grid", justifyItems: "center", rowGap: "0.6vh", textShadow:"0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)"}}>
      <div style={{ fontSize: "4.5vh", fontWeight: 700, lineHeight: 1, textShadow:"0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)"}}>
        {countdown.minutes}
      </div>
      <div style={{ fontSize: "2.5vh", fontWeight: 700 }}>MIN</div>
    </div>

    <div style={{ display: "grid", justifyItems: "center", rowGap: "0.6vh" }}>
      <div style={{ fontSize: "4.5vh", fontWeight: 700, lineHeight: 1, textShadow:"0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)"}}>
        {countdown.seconds}
      </div>
      <div style={{ fontSize: "2.5vh", fontWeight: 700, textShadow:"0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)"}}>SEC</div>
    </div>
  </div>
     <img src={isHacking ? asset2 : asset3} style={{width:"4vh", transform:"scale(-1,-1)" }}/>
</div>
</div>
    )
}