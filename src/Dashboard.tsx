import { useEffect, useMemo, useState, useCallback } from "react";
import { useEvents } from "./util/useEvents";
import logo from "./assets/logo2.svg";
import { useTime } from "./util/useTime";
import TopBar3 from "./assets/topbar3.svg"
import BottomBar3 from "./assets/bottombar3.svg"
import EventCard from "./Event";
import bg1 from "./assets/bg1.svg"
import bg2 from "./assets/bg2.svg"
import bg3 from "./assets/bg3.svg"
import earth1 from "./assets/earth1.svg"
import earth2 from "./assets/earth2.svg"
import earth3 from "./assets/earth3.svg"
import sun1 from "./assets/sun1.svg"
import sun2 from "./assets/sun2.svg"
import Leaderboard from "./Leaderboard";
import ufo11 from "./assets/ufo11.svg"
import ufo12 from "./assets/ufo12.svg"
import ufo21 from "./assets/ufo21.svg"
import ufo22 from "./assets/ufo22.svg"
import ufo31 from "./assets/ufo31.svg"
import ufo32 from "./assets/ufo32.svg"
import Countdown from "./Countdown";
import useTimeSyncedReload from "./util/useReload";
import TeamLeaderboard from "./TeamLeaderboard";
import fulcrumgt from "./assets/fulcrumgt.svg"

//sun animation
const sunStart = { top: 1, left: 45 }; // up position
const sunEnd   = { top: 35, left: 55 }; // down position

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function minSinceMidnight(d: Date) {
  return d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60;
}

// returns sun state between 0 and 1 
// 0 means sun is up and 1 means sun is down
function getSunProgress(now = new Date()): number {
  const m = minSinceMidnight(now);

  const riseStart = 6 * 60; // 6 am
  const riseEnd   = 8 * 60; // 8 am
  const setStart  = 17 * 60; // 5 pm
  const setEnd    = 22 * 60; // 10pm

  if (m >= setEnd || m < riseStart) return 1;

  if (m < riseEnd) {
    const t = clamp01((m - riseStart) / (riseEnd - riseStart));
    return 1 - t;
  }
  if (m < setStart) return 0;

  const t = clamp01((m - setStart) / (setEnd - setStart));

  return t;
}

function Dashboard() {
    const events = useEvents();
    const { now } = useTime();
    const eventCards = useMemo(
      () => events.filter((event) => event.endTime >= now.getTime() / 1000),
      [events, now]
    );
    const [sunProgress, setSunProgress] = useState(() => getSunProgress(new Date()));

    useTimeSyncedReload();

//identify which time of day it is for bg, ufos, sun position
type TimeSegment = "day" | "evening" | "night";

const getTimeSegment = useCallback((date = new Date()): TimeSegment => {
  const h = date.getHours();
  if (h >= 8 && h < 15) return "day";
  if (h >= 15 && h < 22) return "evening";
  return "night";
}, []);

const [segment, setSegment] = useState<TimeSegment>(() =>
  getTimeSegment()
);

useEffect(() => {
  const update = () => setSegment(getTimeSegment());
  const id = setInterval(update, 60000); // how often it checks if it is day/evening/night
  return () => clearInterval(id);
}, [getTimeSegment]);

useEffect(() => {
    const update = () => setSunProgress(getSunProgress(new Date()));
    update();
    const id = window.setInterval(update, 10_000); // refresh every 10 seconds
    return () => clearInterval(id);
  }, []);


//handling earth and sun based on time of day
const earthBySegment = {
  day: earth1,
  evening: earth2,
  night: earth3,
};

const bgBySegment = {
  day: bg1,
  evening: bg2,
  night: bg3,
};

const sunBySegment = {
  day: sun1,
  evening: sun2,
  night: sun2,
};

const earth = earthBySegment[segment];
const bg = bgBySegment[segment];
const sun = sunBySegment[segment];

const sunTop = lerp(sunStart.top, sunEnd.top, sunProgress);
const sunLeft = lerp(sunStart.left, sunEnd.left, sunProgress);

    return (
        <div
            className="Dashboard"
            style={{
                textAlign: "center",
                overflow: "hidden",
                height: "100%",
                minHeight: "100vh",
                width: "100%",
                margin: "0px",
                padding: "0px",
                fontSize: "2vh",
                backgroundColor: "black",
                position: "relative",

                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            >
                <img src={earth} 
                alt="earth"
                style={{

                    position:"absolute",
                    top: segment === "day" ? "23.5vh" : "12vh",
                    left: "-10vh",
                    width:"220vh",
                    zIndex:2
                    }}/>

                    <img
                    alt="sun"
            src={sun}
            style={{
                position: "absolute",
                top: `${sunTop}vh`,
                left: `${sunLeft}vh`,
                width: "95vh",
                zIndex: 0,
                willChange: "top, left",
            }}
            />

<div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "2vh",
      position:'absolute',
      top:"11vh",
      left:"6vh"
    }}
  >
    <div
      style={{
        color: "white",
        fontFamily: "Tsukimi Rounded",
        fontWeight: 700,
        textShadow: "0 3px 6.239px #0D084D",
        fontSize: "2.4vh",
        lineHeight: 1,
        whiteSpace: "nowrap",
        zIndex:999
      }}
    >
      POWERED BY
    </div>

    <img
      alt="fulcrumgt"
      src={fulcrumgt}
      style={{
        zIndex: 999,
        height: "5vh",
        pointerEvents: "none",
        marginTop:"1vh",
        marginLeft:"-1.5vh",
      }}
    />
    </div>

                    <img src={logo} alt="logo" className="logo" style={{
                        position: "absolute",
                        top: "3vh",
                        left: "6vh",
                        width: "24vh",
                        zIndex:999
                    }} />
                     <h2 style={{
                   position:"absolute",
                   top:"16.5vh",
                   left:"6vh",
                   fontFamily:"Tsukimi Rounded",
                   color:"white",
                   zIndex:999
                }}>
                                      {now.toLocaleTimeString([], {
                                              hour: "numeric",
                                                         minute: "2-digit",
                                                         second:"2-digit"
                                                                  })}
                                                                        </h2>

        <div className="ufo ufo1">
          <div className="ufoBob">
            <img className="ufoBody" src={ufo11} alt="ufo11"/>
            <img className="ufoRays" src={ufo12} alt="ufo12"/>
          </div>
        </div>

        <div className="ufo ufo2">
          <div className="ufoBob">
            <img className="ufoBody" src={ufo21} alt="ufo21"/>
            <img className="ufoRays" src={ufo22} alt="ufo22"/>
          </div>
        </div>

        <div className="ufo ufo3">
          <div className="ufoBob">
            <img className="ufoBody" src={ufo31} alt="ufo31"/>
            <img className="ufoRays" src={ufo32} alt="ufo32"/>
          </div>
        </div>



<div
  style={{
    position: "absolute",
    inset: 0,
    zIndex: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    paddingLeft: "4vh",
    paddingRight: "4vh",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    gap:"9vh",
  }}
>
 
 {/* left column */}
  <div
    style={{
    flex: "1 1 0",
      display: "flex",
      flexDirection: "column",
      marginTop: "20.5vh",
      maxWidth:"45vh",
    }}
  >
    <Leaderboard />
  </div>

  {/* middle column */}
  

<div
  style={{
    flex: "1 1 0",    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2vh",
    minWidth: 0,
    pointerEvents: "auto",
  }}
>
  <Countdown />

  <div
    style={{
        maxWidth: "80vh",
        marginTop:"2vh",
      position: "relative",
      width: "100%",
      height: "71vh",
    }}
  >
    <img
    alt="topbar"
      src={TopBar3}
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        transform: "translate(-51.1%, -10%)",
        width: "116.5%",
        zIndex: 999,
        pointerEvents: "none",
        display: "block",
      }}
    />
    <div
      style={{
        height: "100%",
        width: "100%",
        border: "0.13vh solid #00FF2B",
        background:`
      linear-gradient(180deg, rgba(1, 98, 2, 0.7), rgba(0, 135, 3, 0.38)),
      linear-gradient(to right, rgba(32, 122, 20, 0.6) .3vh, transparent 1px),
      linear-gradient(to bottom, rgba(44, 137, 32, 0.6) .3vh, transparent 1px)
      `,
        // backgroundRepeat: "no-repeat, no-repeat, repeat, repeat",
        backgroundSize: "100% 100%, 25% 25%, 25% 25%",
        // backgroundPosition: "center, center, 0 0, 0 0",
        overflow: "hidden",
        // backdropFilter: "blur(.2vh)",
// WebkitBackdropFilter: "blur(.2vh)",
      }}
    >
      <div style={{ marginTop:
      window.innerWidth / window.innerHeight > 3/1.9
        ? "2vh"
        : ".8vh", marginRight: "4vh", fontFamily: "Tsukimi Rounded", fontSize: "3vh", fontWeight: 700, color: "#ffffff", textShadow:"0 0 .8vh rgba(0,0,0,0.1), 0 0.1vh 0.2vh rgba(0,0,0,0.8)"}}>
        UPCOMING EVENTS
      </div>

      <div style={{ marginTop:
      window.innerWidth / window.innerHeight > 3/1.8
        ? "7.5vh"
        : "7vh", marginLeft:"2.8vh" }}>
        {eventCards.map((event, index) => (
          <EventCard key={event.id} event={event} isLast={index === eventCards.length - 1} />
        ))}
      </div>
    </div>
    <img
        alt="bottombar"
      src={BottomBar3}
      style={{
        position: "absolute",
        left: "50%",
        bottom: 0,
        transform: "translate(-50%, 74%)",
        width: "110%",
        zIndex: 999,
        pointerEvents: "none",
        display: "block",
      }}
    />
  </div>
</div>
  {/* right column */}
  <div
    style={{
      flex: "0 0 auto",    
    //   width: "fit-content",
      display: "grid",
      flexDirection: "row",
      gap: "0vh",
    //   marginTop: "3vh",
    }}
  >
                        <TeamLeaderboard/>

  </div>
</div>       
         {/* columns end here */}
         
        </div>
    );
}

export default Dashboard;
