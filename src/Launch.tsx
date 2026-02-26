import { useEffect, useState, useCallback } from "react";
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
import hackastra from "./assets/hackastra.svg"
import fulcrumgt from "./assets/fulcrumgt.svg"


// animation for ufos' rays

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

function Launch() {
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
            className="Launch"
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  }}
>
  <img
    alt="hackastra"
    src={hackastra}
    style={{
      zIndex: 2,
      width: "115vh",
      pointerEvents: "none",
      marginTop: "30vh",
    }}
  />

  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "2vh",
      marginTop: "1.5vh",
    }}
  >
    <div
      style={{
        color: "white",
        fontFamily: "Tsukimi Rounded",
        fontWeight: 700,
        textShadow: "0 3px 6.239px #0D084D",
        fontSize: "4.75vh",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      POWERED BY
    </div>

    <img
      alt="fulcrumgt"
      src={fulcrumgt}
      style={{
        zIndex: 2,
        height: "10vh",
        width: "auto",
        pointerEvents: "none",
        display: "block",
        marginTop:"2vh",
        marginLeft:"-1vh"
      }}
    />
  </div>
</div>       
        </div>
    );
}

export default Launch;
