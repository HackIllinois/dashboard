// import "./App.css";
// import { useTime } from "./util/useTime";
// import { useLeaderboard } from "./util/useLeaderboard";
// import { useEvents } from "./util/useEvents";
// import { Event } from "./util/api";
// import useTimeSyncedReload from "./util/useReload";
// import background from "./assets/background.svg";
// import zeus from "./assets/zeus.svg";
// import logo from "./assets/logo.svg";
// import Pin from "./assets/pin.svg";
// import Clock from "./assets/clock.svg";
// // import scroll from "./assets/scroll.svg";
// import solana from "./assets/solana.png";
// import deere from "./assets/deere.svg";
// import cat from "./assets/cat.png";
// import discover from "./assets/discover.svg";
// import warp from "./assets/warp.svg";
// import capitalone from "./assets/capitalone.svg";
// import klaviyo from "./assets/klaviyo.png";
// import agco from "./assets/agco.png";

// import cloudflare from "./assets/cloudflare.png";
// import deshaw from "./assets/deshaw.png";
// import hrt from "./assets/hrt.svg";
// import researchpark from "./assets/researchpark.png";
// import slb from "./assets/slb.png";
// import telora from "./assets/telora.jpeg";
// import { useEffect, useState } from "react";


// function App() {
//     const { now, countdown, isHacking } = useTime();
//     const [zeusAppear, setZeusAppear] = useState(false);
//     const [lightningAppear, setLightningAppear] = useState(false);
//     const leaderboard = useLeaderboard();
//     const events = useEvents();
//     useTimeSyncedReload();

//     useEffect(() => {
//         const now = new Date();
//         const minutes = now.getMinutes();
//         const seconds = now.getSeconds();
//         const ms = now.getMilliseconds();

//         const currentMs = (minutes * 60 + seconds) * 1000 + ms;
//         const nextEventMin = Math.floor((minutes + 10) / 10) * 10;
//         const nextEventMinMs = nextEventMin * 60 * 1000;
//         const delay = nextEventMinMs - currentMs;

//         setTimeout(() => {
//             setZeusAppear(true);
//         }, delay - (10 * 1000));

//         setTimeout(() => {
//             setLightningAppear(true);
//         }, delay - (2 * 1000));
//     }, [])

//     return (
//         <div className="App">
//             <div className={`zeus-container ${zeusAppear ? "zeus-appear" : ""}`}>
//                 <img src={zeus} alt="zeus" className="zeus" />
//                 <div className="lightning-container">
//                     <div className={`lightning lightning-one ${lightningAppear ? "lightning-appear" : ""}`}></div>
//                     <div className={`lightning lightning-two ${lightningAppear ? "lightning-appear" : ""}`}></div>
//                 </div>
//             </div>
//             <div className="topRow">
//                 <div className="title">
//                     <img src={logo} alt="logo" className="logo" />
//                     <p>
//                         <i>Pursue your prophecy!</i>
//                     </p>
//                 </div>

//                 <div className="countdownParent">
//                     <span className="countdownTitle">
//                         {isHacking ? "Hacking Ends in:" : "Hacking Starts in:"}
//                     </span>
//                     <div className="countdown">
//                         {countdown.days > 0 && (
//                             <div>
//                                 <h1>{countdown.days}</h1>
//                                 <p>Days</p>
//                             </div>
//                         )}
//                         <div>
//                             <h1>{countdown.hours}</h1>
//                             <p>Hours</p>
//                         </div>
//                         <div>
//                             <h1>{countdown.minutes}</h1>
//                             <p>Minutes</p>
//                         </div>
//                         <div>
//                             <h1>{countdown.seconds}</h1>
//                             <p>Seconds</p>
//                         </div>
//                     </div>
//                 </div>

//                 <h2>
//                     {now.toLocaleTimeString([], {
//                         hour: "numeric",
//                         minute: "2-digit",
//                     })}
//                 </h2>
//             </div>

//             <div className="bottomRow">
//                 <div className="leaderboard">
//                     <h2>Leaderboard</h2>
//                     {leaderboard.map((profile, index) => (
//                         <div key={index} className="profile">
//                             <p className="rank">{index + 1}</p>
//                             <div className="name-profile">
//                                 <div className="profile-picture">
//                                     <img
//                                         src={profile.avatarUrl}
//                                         alt="profile"
//                                         className="profile-picture"
//                                     />
//                                 </div>
//                                 <p className="name">
//                                     {profile.displayName.length > 25
//                                         ? profile.displayName.slice(0, 24) + "..."
//                                         : profile.displayName}
//                                 </p>
//                             </div>
//                             <p>{profile.points.toLocaleString('en-US')} PTS</p>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="events">
//                     <h2>Upcoming Events</h2>
//                     {events.length > 0 ? events.map((event: Event, index: number) => (
//                         <div className="eventCard" key={index}>
//                             <div className="headerContainer">
//                                 <h3 className="eventTitle">{event.name}</h3>
//                                 <div className="tags">
//                                     {event.sponsor !== "" && (
//                                         <p className="sponsor">
//                                             {event.sponsor}
//                                         </p>
//                                     )}
//                                     {event.isPro && (
//                                         <p className="knights">KNIGHTS</p>
//                                     )}
//                                     <p className="type">{event.eventType}</p>
//                                     {event.points > 0 && <p className="points">
//                                         +{event.points.toLocaleString("en-US")} PTS
//                                     </p>}
//                                 </div>
//                             </div>

//                             <div className="timeContainer">
//                                 <img
//                                     src={Clock}
//                                     alt="clock"
//                                     className="clock"
//                                 />
//                                 <p className="time">
//                                     {
//                                         event.startTime === event.endTime ? new Date(
//                                             event.startTime * 1000
//                                         ).toLocaleTimeString([], {
//                                             hour: "numeric",
//                                             minute: "2-digit",
//                                         }) : `${new Date(
//                                             event.startTime * 1000
//                                         ).toLocaleTimeString([], {
//                                             hour: "numeric",
//                                             minute: "2-digit",
//                                         })} - 
//                                     ${new Date(
//                                             event.endTime * 1000
//                                         ).toLocaleTimeString([], {
//                                             hour: "numeric",
//                                             minute: "2-digit",
//                                         })}`
//                                     }
//                                 </p>
//                             </div>
//                             <div className="timeContainer">
//                                 {event.locations.map((location, i) => (
//                                     <>
//                                         <img
//                                             src={Pin}
//                                             alt="pin"
//                                             className="pin"
//                                         />
//                                         <p className="location" key={i}>
//                                             {location.description.length > 300
//                                                 ? location.description.slice(
//                                                     0,
//                                                     300
//                                                 ) + "..."
//                                                 : location.description}
//                                         </p>
//                                     </>
//                                 ))}
//                             </div>

//                             <p className="eventDescription">
//                                 {event.description}
//                             </p>
//                         </div>
//                     )) : <p className="noEvents">No upcoming events :')</p>}
//                 </div>

//                 <div className="sponsors">
//                     <div className="sponsorLogos">
//                         <h2>Sponsors</h2>
//                         <div>
//                             <img src={cat} alt="cat" />
//                         </div>
//                         <div>
//                             <img src={deere} alt="deere" />
//                             <img src={solana} alt="solana" />
//                         </div>
//                         <div>
//                             <img src={discover} alt="discover" />
//                             <img src={klaviyo} alt="klaviyo" />
//                         </div>
//                         <div>
//                             <img src={capitalone} alt="capitalone" />
//                             <img src={agco} alt="agco" />
//                         </div>
//                         <div>
//                             <img src={slb} alt="slb" />
//                             <img src={cloudflare} alt="cloudflare" />

//                         </div>
//                         <div>
//                             <img src={deshaw} alt="deshaw" />
//                             <img src={researchpark} alt="researchpark" />
//                         </div>
//                         <div>
//                             <img src={warp} alt="warp" />
//                             <img src={telora} alt="telora" />
//                         </div>
//                         <div>
//                             <img src={hrt} alt="hrt" />
//                         </div>
//                         <div></div>
//                     </div>
//                 </div>
//             </div>

//             <div className="background">
//                 <img src={background} alt="background" />
//             </div>
//         </div>
//     );
// }

// export default App;
// import "./App.css";
import { useEffect, useMemo, useState, useRef } from "react";
import { useEvents } from "./util/useEvents";
import logo from "./assets/logo2.svg";
import { useTime } from "./util/useTime";
import TopBar from "./assets/topbar.svg"
import BottomBar from "./assets/bottombar.svg"
import EventCard from "./Event";
import bg1 from "./assets/bg1.svg"
import bg2 from "./assets/bg2.svg"
import bg3 from "./assets/bg3.svg"
import earth1 from "./assets/earth1.svg"
import earth2 from "./assets/earth2.svg"
import earth3 from "./assets/earth3.svg"
import sun1 from "./assets/sun1.svg"
import sun2 from "./assets/sun2.svg"
import asset2 from "./assets/asset2.svg"
import asset3 from "./assets/asset3.svg"
import Leaderboard from "./Leaderboard";
import caution from "./assets/caution.svg"
import ufo11 from "./assets/ufo11.svg"
import ufo12 from "./assets/ufo12.svg"
import ufo21 from "./assets/ufo21.svg"
import ufo22 from "./assets/ufo22.svg"
import ufo31 from "./assets/ufo31.svg"
import ufo32 from "./assets/ufo32.svg"



// ufo animation
type Phase = "enter" | "hold" | "exit" | "wait";

const ENTER_MS = 3000;
const HOLD_MS  = 7000;
const EXIT_MS  = 3000;
const WAIT_MS  = 5000;

const smoothstep = (x: number) => x * x * (3 - 2 * x);

function bezier2(p0: number, p1: number, p2: number, t: number) {
  const u = 1 - t;
  return u * u * p0 + 2 * u * t * p1 + t * t * p2;
}

function useCycle(enabled: boolean) {
  const [phase, setPhase] = useState<Phase>("wait");
  const [t, setT] = useState(0);

  const phaseRef = useRef<Phase>("wait");
  const startRef = useRef(performance.now());

  useEffect(() => {
    if (!enabled) return;

    let rafId: number;

    const durationFor = (p: Phase) =>
      p === "enter" ? ENTER_MS :
      p === "hold"  ? HOLD_MS  :
      p === "exit"  ? EXIT_MS  :
                      WAIT_MS;

    const nextPhase = (p: Phase): Phase =>
      p === "enter" ? "hold" :
      p === "hold"  ? "exit" :
      p === "exit"  ? "wait" :
                      "enter";

    const tick = (now: number) => {
      const p = phaseRef.current;
      const dur = durationFor(p);

      const raw = clamp01((now - startRef.current) / dur);
      setT(raw);

      if (raw >= 1) {
        const np = nextPhase(p);
        phaseRef.current = np;
        setPhase(np);
        startRef.current = now;
        setT(0);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [enabled]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (!enabled) {
      phaseRef.current = "wait";
      setPhase("wait");
      setT(0);
      startRef.current = performance.now();
    }
  }, [enabled]);

  return { phase, t };
}

// animation for ufos' rays

function getPosForPhase(opts: {
  phase: Phase;
  t: number;
  p0: { top: number; left: number };
  p1: { top: number; left: number };
  p2: { top: number; left: number };
}) {
  const { phase, t, p0, p1, p2 } = opts;

  if (phase === "hold") return p2;
  if (phase === "wait") return p0;

  const tt = smoothstep(t);
  const u = phase === "enter" ? tt : (1 - tt);

  return {
    top: bezier2(p0.top, p1.top, p2.top, u),
    left: bezier2(p0.left, p1.left, p2.left, u),
  };
}

function getRaysOpacity(phase: Phase, t: number) {
  if (phase !== "hold") return 0;

  const fadePortion = 0.2;

  if (t < fadePortion) return smoothstep(t / fadePortion);
  if (t > 1 - fadePortion) return smoothstep((1 - t) / fadePortion);
  return 1;
}

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

function App() {
    const events = useEvents();
    const eventCards = useMemo(() => events, [events]);
    const { now, countdown, isHacking } = useTime();
    const [pos, setPos] = useState(0);
    const [sunProgress, setSunProgress] = useState(() => getSunProgress(new Date()));

//gradient bg fade animation
useEffect(() => {
  const duration = 10000; // ms per cycle
  const start = performance.now();
  let rafId: number;

  const tick = (now: number) => {
    const t = ((now - start) % duration) / duration;
    setPos(t);
    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);
}, []);

const travelStart = -65;  // starts above the panel
const travelEnd = 155;    // ends below the panel
const p1 = travelStart + pos * (travelEnd - travelStart);

  const backgroundImage = `
  radial-gradient(ellipse 140% 120% at 50% ${p1}%,
    rgba(0, 255, 60, 0.23) 0%,
    rgba(0, 255, 60, 0.12) 35%,
    rgba(0, 255, 60, 0.00) 50%
  ),
  linear-gradient(180deg,
    rgba(0, 135, 3, 0.38)
  ),
    linear-gradient(to right, rgba(84, 172, 72, 0.20) 3px, transparent 1px),
      linear-gradient(to bottom, rgba(84, 172, 72, 0.20) 3px, transparent 1px)
`;

//identify which time of day it is for bg, ufos, sun position
type TimeSegment = "day" | "evening" | "night";

function getTimeSegment(date = new Date()): TimeSegment {
  const h = date.getHours();
  if (h >= 8 && h < 15) return "day";
  if (h >= 15 && h < 22) return "evening";
  return "night";
}

const [segment, setSegment] = useState<TimeSegment>(() =>
  getTimeSegment()
);

useEffect(() => {
  const update = () => setSegment(getTimeSegment());
  const id = setInterval(update, 60000); // how often it checks if it is day/evening/night
  return () => clearInterval(id);
}, []);

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

const showUfos = segment === "night"
// || segment === "day";
const { phase, t } = useCycle(showUfos);


//bobbing animation for ufos
const hashStr = (s: string) => {
  let h = 21661362632;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const rand01 = (key: string, salt: string) => {
  const h = hashStr(key + "|" + salt);
  return (h % 10000) / 10000;
};

const phase2 = rand01("bobbing3536", "phase134") * Math.PI * 2;
const phase3 = rand01("bobbing2335", "phase1345") * Math.PI * 2;
const phase4 = rand01("bobbing3553", "phase64235") * Math.PI * 2;
const floatAmp = 3;
const randSpeed2 = Math.floor(rand01("bobbing3536", "phase124542") * 2) + 1;
const randSpeed3 = Math.floor(rand01("bobbing2335", "phase12256") * 2) + 1;
const randSpeed4 = Math.floor(rand01("bobbing2335", "phase1236") * 2) + 1;


//ufo positions
const ufo1 = getPosForPhase({
  phase,
  t,
  p0: { top: -40, left: -10 },
  p1: { top: -10, left: 10 },
  p2: { top: 18 + Math.sin(randSpeed2 * pos * Math.PI * 2 + phase2) * floatAmp, left: 4 },
});

const ufo2 = getPosForPhase({
  phase,
  t,
  p0: { top: -45, left: 90 },
  p1: { top: -5, left: 60 },
  p2: { top: 20 + Math.sin(randSpeed3 * pos * Math.PI * 2 + phase3) * floatAmp, left: 73 },
});

const ufo3 = getPosForPhase({
  phase,
  t,
  p0: { top: -50, left: 140 },
  p1: { top: -8, left: 160 },
  p2: { top: 11 + Math.sin(randSpeed4 * pos * Math.PI * 2 + phase4) * floatAmp, left: 114 },
});

const raysOpacity = getRaysOpacity(phase, t);

    return (
        <div
            className="App"
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
                <img src={earth} style={{

                    position:"absolute",
                    top: segment === "day" ? "23.5vh" : "12vh",
                    left: "-10vh",
                    width:"200vh",
                    zIndex:2
                    }}/>

                    <img
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
            {/* <img src={phase === "hold" ? ufo12: ufo11} style={{
                zIndex:2,
                width:"70vh",
                position:"absolute", 
                // top:"18vh", 
                // left:"4vh"
                top: `${ufo1.top}vh`,
                left: `${ufo1.left}vh`,
            }}/> */}
      {showUfos && (
  <>
    {/* UFO 1 */}
    <img
      src={ufo11}
      style={{
        zIndex: 2,
        width: "70vh",
        position: "absolute",
        top: `${ufo1.top}vh`,
        left: `${ufo1.left}vh`,
        pointerEvents: "none",
      }}
    />
    <img
      src={ufo12}
      style={{
        zIndex: 2,
        width: "70vh",
        position: "absolute",
        top: `${ufo1.top}vh`,
        left: `${ufo1.left}vh`,
        opacity: raysOpacity,
        transition: "opacity 700ms ease-in-out",
        pointerEvents: "none",
      }}
    />

    {/* UFO 2 */}
    <img
      src={ufo21}
      style={{
        zIndex: 2,
        width: "35vh",
        position: "absolute",
        top: `${ufo2.top}vh`,
        left: `${ufo2.left}vh`,
        pointerEvents: "none",
      }}
    />
    <img
      src={ufo22}
      style={{
        zIndex: 2,
        width: "35vh",
        position: "absolute",
        top: `${ufo2.top}vh`,
        left: `${ufo2.left}vh`,
        opacity: raysOpacity,
        transition: "opacity 550ms ease-in-out",
        pointerEvents: "none",
      }}
    />

    {/* UFO 3 */}
    <img
      src={ufo31}
      style={{
        zIndex: 2,
        width: "60vh",
        position: "absolute",
        top: `${ufo3.top}vh`,
        left: `${ufo3.left}vh`,
        pointerEvents: "none",
      }}
    />
    <img
      src={ufo32}
      style={{
        zIndex: 2,
        width: "60vh",
        position: "absolute",
        top: `${ufo3.top}vh`,
        left: `${ufo3.left}vh`,
        opacity: raysOpacity,
        transition: "opacity 800ms ease-in-out",
        pointerEvents: "none",
      }}
    />
  </>
)}

            {/* <img src={phase === "hold" ? ufo22: ufo21} style={{
                zIndex:2,
                width:"35vh",
                position:"absolute", 
                // top:"17vh", 
                // left:"73vh"
                top: `${ufo2.top}vh`,
                left: `${ufo2.left}vh`,
            }}/>

            <img src={phase === "hold" ? ufo32: ufo31} style={{
                zIndex:2,
                width:"60vh",
                position:"absolute", 
                // top:"11vh", 
                // left:"114vh"
                top: `${ufo3.top}vh`,
                left: `${ufo3.left}vh`,
            }}/> */}


                    <img src={logo} alt="logo" className="logo" style={{
                        position: "absolute",
                        top: "4vh",
                        left: "6vh",
                        width: "24vh",
                        zIndex:999
                    }} />
                     <h2 style={{
                   position:"absolute",
                   top:"11vh",
                   left:"6vh",
                   fontFamily:"Tsukimi Rounded",
                   color:"white"
                }}>
                                      {now.toLocaleTimeString([], {
                                              hour: "numeric",
                                                         minute: "2-digit",
                                                         second:"2-digit"
                                                                  })}
                                                                        </h2>






                                                                         <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.2vh",
    color: "#E9FFE9",
    fontFamily: "Tsukimi Rounded",
    width:"fit-content",
    position:"absolute",
    top:"1vh",
    left: (countdown.days > 0) ? "59vh" : "68vh",
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
        <div style={{ fontSize: "4.5vh", fontWeight: 700, lineHeight: 1, textShadow:"0 0 3px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)" }}>
          {countdown.days}
        </div>
        <div style={{ fontSize: "2.5vh", fontWeight: 700, textShadow:"0 0 3px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)" }}>DAYS</div>
      </div>
    )}

    <div style={{ display: "grid", justifyItems: "center", rowGap: "0.6vh" }}>
      <div style={{ fontSize: "4.5vh", fontWeight: 700, lineHeight: 1, textShadow:"0 0 3px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)"}}>
        {countdown.hours}
      </div>
      <div style={{ fontSize: "2.5vh", fontWeight: 700, textShadow:"0 0 3px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)" }}>HRS</div>
    </div>

    <div style={{ display: "grid", justifyItems: "center", rowGap: "0.6vh", textShadow:"0 0 3px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)"}}>
      <div style={{ fontSize: "4.5vh", fontWeight: 700, lineHeight: 1, textShadow:"0 0 3px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)"}}>
        {countdown.minutes}
      </div>
      <div style={{ fontSize: "2.5vh", fontWeight: 700 }}>MIN</div>
    </div>

    <div style={{ display: "grid", justifyItems: "center", rowGap: "0.6vh" }}>
      <div style={{ fontSize: "4.5vh", fontWeight: 700, lineHeight: 1, textShadow:"0 0 3px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)"}}>
        {countdown.seconds}
      </div>
      <div style={{ fontSize: "2.5vh", fontWeight: 700, textShadow:"0 0 3px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)"}}>SEC</div>
    </div>
  </div>
     <img src={isHacking ? asset2 : asset3} style={{width:"4vh", transform:"scale(-1,-1)" }}/>
</div>
</div>






                                                                        
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 2,
                    }}
                >

            <Leaderboard/>





                         <img src = {TopBar} style={{position:"absolute", width:"78.2vh", top:"19.6vh", left:"57.1vh", zIndex:"999"}}></img>
                         <img src = {BottomBar} style={{position:"absolute", width:"71vh", top:"84.5vh", left:"60.5vh", zIndex:"999"}}></img>

                    <div style={{backgroundImage, position:"absolute", height:"67.5vh",top:"22vh", width:"65vh", left:"63vh", border:"0.13vh solid #00FF2B", 
                        // backgroundSize: "100% 100%, 9.2% 10%, 10% 10%, 10% 10%, 10% 10%"
                        // , backgroundRepeat: "no-repeat, no-repeat",
                        //  backgroundPosition: "center"
                     backgroundRepeat: "no-repeat, no-repeat, repeat, repeat",
    backgroundSize: "100% 100%, 100% 100%, 12% 12%, 12% 12%",
    backgroundPosition: "center, center, 0 0, 0 0",
                         }}>
                    
                            <div style={{marginTop:"2.4vh", marginRight:"4vh", fontFamily:"Tsukimi Rounded", fontSize:"2.5vh", fontWeight:700, color:"#DDFFE4", textShadow:"0 0 3px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)"}}>UPCOMING EVENTS . . . . . . . . . . . . .</div>




                        <div style={{marginTop:"9vh"}}>

                   {eventCards.map((event) => (
  <EventCard
    key={event.id}
    event={event}
  />
))}
{eventCards.map((event) => (
  <EventCard
    key={event.id}
    event={event}
  />
))}

                </div>

                    </div>
<div style={{position:"absolute",
      width:"22vh", height:"22vh", top:"2.5svh", left:"150vh",border:"0.13vh solid #00FF2B", borderRadius:"3.5vh", 
      background:`
      linear-gradient(180deg, rgba(0, 135, 3, 0.38), rgba(0, 135, 3, 0.38)),
      linear-gradient(to right, rgba(84, 172, 72, 0.20) 3px, transparent 1px),
      linear-gradient(to bottom, rgba(84, 172, 72, 0.20) 3px, transparent 1px)
      `, backgroundSize: "100% 100%, 25% 25%, 25% 25%"}}></div>

      <div style={{position:"absolute",
      width:"22vh", height:"22vh", top:"26.5vh", left:"150vh",border:"0.13vh solid #00FF2B", borderRadius:"3.5vh", 
      background:`
      linear-gradient(180deg, rgba(0, 135, 3, 0.38), rgba(0, 135, 3, 0.38)),
      linear-gradient(to right, rgba(84, 172, 72, 0.20) 3px, transparent 1px),
      linear-gradient(to bottom, rgba(84, 172, 72, 0.20) 3px, transparent 1px)
      `, backgroundSize: "100% 100%, 25% 25%, 25% 25%"}}></div>


      <div style={{position:"absolute",
      width:"22vh", height:"22vh", top:"50.5vh", left:"150vh",border:"0.13vh solid #00FF2B", borderRadius:"3.5vh", 
      background:`
      linear-gradient(180deg, rgba(0, 135, 3, 0.38), rgba(0, 135, 3, 0.38)),
      linear-gradient(to right, rgba(84, 172, 72, 0.20) 3px, transparent 1px),
      linear-gradient(to bottom, rgba(84, 172, 72, 0.20) 3px, transparent 1px)
      `, backgroundSize: "100% 100%, 25% 25%, 25% 25%"}}></div>


      <div style={{position:"absolute",
      width:"22vh", height:"22vh", top:"74.5vh", left:"150vh",border:"0.13vh solid #00FF2B", borderRadius:"3.5vh", 
      background:`
      linear-gradient(180deg, rgba(0, 135, 3, 0.38), rgba(0, 135, 3, 0.38)),
      linear-gradient(to right, rgba(84, 172, 72, 0.20) 3px, transparent 1px),
      linear-gradient(to bottom, rgba(84, 172, 72, 0.20) 3px, transparent 1px)
      `, backgroundSize: "100% 100%, 25% 25%, 25% 25%"}}></div>
                                                                        
            </div>
         
        </div>
    );
}

export default App;
