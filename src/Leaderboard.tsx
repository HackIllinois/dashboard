
import { useEffect, useMemo, useState, useRef } from "react";
import { useLeaderboard } from "./util/useLeaderboard";
import player1 from "./assets/player1.svg"
import players from "./assets/players.svg"
import number from "./assets/number.svg"

export default function Leaderboard() {

    const leaderboard = useLeaderboard();
    const [pos, setPos] = useState(0);


    useEffect(() => {
      const duration = 8000; // ms per position change, it is randomized
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



    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

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


const [seed, setSeed] = useState(0);
const smoothRef = useRef<Record<string, { x: number; y: number }>>({});

useEffect(() => {
  const tick = () => setSeed(Math.floor(Date.now() / 200000));
  tick();
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);


const top5 = useMemo(() => (leaderboard ?? []).slice(0, 7), [leaderboard]);


    return (
        <div style={{
            // position:"absolute", height:"78vh",top:"19.5vh",
            position:"relative",
             width:"100%", height:"100%", borderRadius:"3.5vh",
            //  left:"6vh",
              border:"0.13vh solid #00FF2B", overflow:"hidden",
// backgroundImage: `
//       linear-gradient(180deg,
//         rgba(0, 204, 3, 0.50) 0%,
//         rgba(0, 229, 4, 0.40) 1.86%,
//         rgba(0, 255, 4, 0.30) 3.73%,
//         rgba(0, 153, 3, 0.15) 33.17%,
//         rgba(0, 153, 3, 0.15) 70.67%,
//         rgba(0, 255, 4, 0.30) 95.54%,
//         rgba(0, 229, 4, 0.40) 99.12%
//       ),
//       linear-gradient(to right, rgba(84, 172, 72, 0.20) 3px, transparent 1px),
//       linear-gradient(to bottom, rgba(84, 172, 72, 0.20) 3px, transparent 1px)
//     `,
        backgroundImage,
                        backgroundSize: "100% 100%, 100% 100%, 14% 10%, 10% 10%, 10% 10%, 10% 10%", backgroundRepeat: "no-repeat, no-repeat, repeat, repeat", backgroundPosition: "center, center, 0 0, 0 0"}}>

            <h1 style={{fontSize:"2.8vh", fontFamily:"Tsukimi Rounded", color:"#DDFFE4", textShadow:"0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)"}}>LEADERBOARD</h1>


            {/* floating top 5 */}
{top5.map((p, i) => {
  const key = String(p.displayName);

// const yBase = 20 + (80 / top5.length) * i



//   const yJitter = (rand01(key, "y") - 0.5) * 3;

// const baseX = 15 + rand01(key, "x") * 65;



const targetBaseX = 15 + rand01(key, "x|" + seed) * 65;
const targetYJitter = (rand01(key, "y|" + seed) - 0.5) * 3;

const targetYBase = 18 + (88 / top5.length) * i;
const targetY = clamp(targetYBase + targetYJitter, 16, 93);

const cur = (smoothRef.current[key] ??= { x: targetBaseX, y: targetY });
const a = 0.002;
cur.x += (targetBaseX - cur.x) * a;
cur.y += (targetY - cur.y) * a;





const phase = rand01(key, "phase") * Math.PI * 2;
const floatAmp = 7;
const randSpeed = Math.floor(rand01(key, "phase12") * 3) + 2;

const phase3 = rand01(key, "phrase3") * Math.PI * 2;
const floatAmp3 = 3;
const randSpeed3 = Math.floor(rand01(key, "phase32") * 1) + 4;

// const x = baseX + Math.sin(randSpeed * pos * Math.PI * 2 + phase) * floatAmp + Math.sin(randSpeed3 * pos * Math.PI * 2 + phase3) * floatAmp3;

const x = cur.x + Math.sin(randSpeed * pos * Math.PI * 2 + phase) * floatAmp + Math.sin(randSpeed3 * pos * Math.PI * 2 + phase3) * floatAmp3;



const phase2 = rand01(key, "phase2") * Math.PI * 2;
const floatAmp2 = 1;
const randSpeed2 = Math.floor(rand01(key, "phrase24") * 2) + 1;

const phase4 = rand01(key, "phase4") * Math.PI * 2;
const floatAmp4 = 1;
const randSpeed4 = Math.floor(rand01(key, "phase42") * 1) + 2;


// const y = clamp(yBase + yJitter, 15, 90) + Math.sin(randSpeed2 * pos * Math.PI * 2 + phase2) * floatAmp2 + Math.sin(randSpeed4 * pos * Math.PI * 2 + phase4) * floatAmp4;

const y = cur.y + Math.sin(randSpeed2 * pos * Math.PI * 2 + phase2) * floatAmp2 + Math.sin(randSpeed4 * pos * Math.PI * 2 + phase4) * floatAmp4;


const phase5 = rand01(key, "phase57");
const floatAmp5 = 6;
const randSpeed5 = Math.floor(rand01(key, "phrase53") * 2) + 1;

const turn = Math.sin(randSpeed5 * pos * Math.PI * 2 + phase5) * floatAmp5;

  const imgSrc = i === 0 ? player1 : players;

  return (
    <div
      key={key}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.6vh",
        pointerEvents: "none",
      }}
    >
        {/* <img src={number} style={{width:"5vh", marginLeft:"2vh"}}/> */}
      <img
        src={imgSrc}
        alt={i === 0 ? "1st place" : `place ${i + 1}`}
        style={{
          width: i === 0 ? "5.5vh" : "4.5vh",
          filter: i === 0 ? "drop-shadow(0 0 10px rgba(255,255,0,0.6))" : "drop-shadow(0 0 8px rgba(0,255,60,0.45))",
          opacity: 0.95,
          transform:`rotate(${turn}deg)`
        }}
      />
      <div style={{position:"absolute", fontFamily:"Tsukimi Rounded", fontWeight:700, marginTop:"1.2vh", fontSize:"2.4vh", 

        color: "#EFFFF0",
        textShadow: `
        0 0 3px rgba(0,0,0,0.9),
        0 2px 6px rgba(0,0,0,0.8)
        `
      }}>{p.points}</div>
      <div
        style={{
          maxWidth: "16vh",
          fontFamily: "Tsukimi Rounded",
          fontSize: "1.7vh",
          color: "#DDFFE4",
          textAlign: "center",
          lineHeight: 1.1,
          textShadow: "0 0 8px rgba(0,0,0,0.6)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontWeight:700
        }}
        title={p.displayName}
      >
        {p.displayName}
      </div>
    </div>
  );
})}

</div>
    )
}