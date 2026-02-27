import { useEffect, useState, useRef, useCallback } from "react";
import bg1 from "./assets/bg1.svg"
import bg2 from "./assets/bg2.svg"
import bg3 from "./assets/bg3.svg"
import earth1 from "./assets/earth1.svg"
import earth2 from "./assets/earth2.svg"
import earth3 from "./assets/earth3.svg"
import sun1 from "./assets/sun1.svg"
import sun2 from "./assets/sun2.svg"
import ufo11 from "./assets/ufo11.svg"
import ufo12 from "./assets/ufo12.svg"
import ufo21 from "./assets/ufo21.svg"
import ufo22 from "./assets/ufo22.svg"
import ufo31 from "./assets/ufo31.svg"
import ufo32 from "./assets/ufo32.svg"
import useTimeSyncedReload from "./util/useReload";
import fridayNight from "./util/fridayNight.json";
import saturdayMorning from "./util/saturdayMorning.json"
import saturdayNight from "./util/saturdayNight.json"
import sundayMorning from "./util/sundayMorning.json"
import logo from "./assets/logo2.svg";
import { useTime } from "./util/useTime";
import fulcrumgt from "./assets/fulcrumgt.svg"


type Row = {
  buildingExitTime: string;
  busPickupTime: string;
  busPickupLocation: string;
  busDropoffTime: string;
  busDropoffLocation: string;
};

const columns: { key: keyof Row; label: string }[] = [
  { key: "buildingExitTime", label: "Building Exit Time" },
  { key: "busPickupTime", label: "Bus Pickup Time" },
  { key: "busPickupLocation", label: "Bus Pickup Location" },
  { key: "busDropoffTime", label: "Bus Dropoff Time" },
  { key: "busDropoffLocation", label: "Bus Dropoff Location" },
];



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

function App3() {
    const { now } = useTime();
    const [pos, setPos] = useState(0);
    const [sunProgress, setSunProgress] = useState(() => getSunProgress(new Date()));

    useTimeSyncedReload();

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

const showUfos = segment === "night"
|| segment === "evening"
|| segment === "day"
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
  p2: { top: 21 + Math.sin(randSpeed2 * pos * Math.PI * 2 + phase2) * floatAmp, left: 4 },
});

const ufo2 = getPosForPhase({
  phase,
  t,
  p0: { top: -45, left: 90 },
  p1: { top: -5, left: 60 },
  p2: { top: 23 + Math.sin(randSpeed3 * pos * Math.PI * 2 + phase3) * floatAmp, left: 73 },
});

const ufo3 = getPosForPhase({
  phase,
  t,
  p0: { top: -50, left: 140 },
  p1: { top: -8, left: 160 },
  p2: { top: 13 + Math.sin(randSpeed4 * pos * Math.PI * 2 + phase4) * floatAmp, left: 118 },
});

const raysOpacity = getRaysOpacity(phase, t);

function pickSchedule(now: Date): Row[] {
  const day = now.getDay(); // 0=Sun, 5=Fri, 6=Sat
  const m = now.getHours() * 60 + now.getMinutes();

  const SAT_3AM = 3 * 60;          // 03:00
  const SAT_10AM = 10 * 60;        // 10:00
  const SUN_230AM = 2 * 60 + 30;   // 02:30

  // Friday: always fridayNight
  if (day === 5) return fridayNight as Row[];

  // Saturday:
  // 12:00am–2:59am -> fridayNight
  // 3:00am–9:59am  -> saturdayMorning
  // 10:00am–11:59pm -> saturdayNight
  if (day === 6) {
    if (m < SAT_3AM) return fridayNight as Row[];
    if (m < SAT_10AM) return saturdayMorning as Row[];
    return saturdayNight as Row[];
  }

  // Sunday:
  // 12:00am–2:29am -> saturdayNight
  // 2:30am+        -> sundayMorning
  if (day === 0) {
    if (m < SUN_230AM) return saturdayNight as Row[];
    return sundayMorning as Row[];
  }

  // Fallback schedule
  return sundayMorning as Row[];
}

  const rows = pickSchedule(now);

  const gridCols = "1.3fr 1.2fr 2.4fr 1.3fr 2.0fr";

  
  
  //          background animation
    useEffect(() => {
      const duration = 15000; // ms per position change, it is randomized
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




    return (
        <div
            className="App3"
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
      {showUfos && (
  <>
    {/* UFO 1 */}
    <img
    alt="ufo"
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
    alt="ufo"
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
    alt="ufo"
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
    alt="ufo"
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
    alt="ufo"
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
        alt="ufo"
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

 <img src={logo} alt="logo" className="logo" style={{
                        position: "absolute",
                        top: "3vh",
                        left: "6vh",
                        width: "24vh",
                        zIndex:999
                    }} />
                     <h2 style={{
                   position:"absolute",
                   top:"4vh",
                   right:"6vh",
                   fontFamily:"Tsukimi Rounded",
                   color:"white",
                   zIndex:999,
                   textShadow:"0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)"
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
      flexDirection: "row",
      alignItems: "center",
      gap: "2vh",
      position:'absolute',
      top:"4vh",
      left:"70vh"
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
        zIndex: 2,
        height: "5vh",
        pointerEvents: "none",
        marginTop:"1vh",
        marginLeft:"-1.5vh",
      }}
    />
    </div>
                   
  <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "15vh",
      }}
    >
      <div
        style={{
          width: "min(175vh, 94vw)",
          overflow: "hidden",
          borderRadius:"3vh",
              border:"0.13vh solid #00FF2B", 
          backdropFilter: "blur(1.5vh)",
          backgroundImage:`
           radial-gradient(ellipse 140% 120% at 50% ${p1}%,
        rgba(0, 255, 60, 0.23) 0%,
        rgba(0, 255, 60, 0.12) 35%,
        rgba(0, 255, 60, 0.00) 50%
      ),
      linear-gradient(180deg,
        rgba(0, 135, 3, 0.38)
      ),
        linear-gradient(to right, rgba(84, 172, 72, 0.20) 3px, transparent 1px),
          linear-gradient(to bottom, rgba(84, 172, 72, 0.20) 3px, transparent 1px)`
        }}
      >
        {/* column names */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            padding: "1.6vh 2vh",
            background: "rgba(255,255,255,0.10)",
            borderBottom: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          {columns.map((c) => (
            <div
              key={c.key}
              style={{
                color:"#DDFFE4",
                fontWeight: 800,
                fontSize: "2vh",
                textAlign: "left",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontFamily:"Tsukimi Rounded",
                textShadow:"0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)"
              }}
            >
              {c.label}
            </div>
          ))}
        </div>

        {/* rows */}
        <div>
          {rows.map((r, i) => (
            <div
              key={`${r.buildingExitTime}-${i}`}
              style={{
                display: "grid",
                gridTemplateColumns: gridCols,
                padding: "1.5vh 2vh",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
                background:
                  i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
              }}
            >
              <Cell>{r.buildingExitTime}</Cell>
              <Cell>{r.busPickupTime}</Cell>
              <Cell>{r.busPickupLocation}</Cell>
              <Cell>{r.busDropoffTime}</Cell>
              <Cell>{r.busDropoffLocation}</Cell>
            </div>
          ))}
        </div>
      </div>
    </div>     
        </div>
    );
}

export default App3;



function Cell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        color: "white",
        fontSize: "2.2vh",
        textAlign: "left",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontFamily:"Tsukimi Rounded",
        fontWeight:600,
        textShadow:"0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)"
      }}
    >
      {children}
    </div>
  );
}