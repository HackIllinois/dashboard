import { useState, useEffect, useMemo } from "react";
import { Event } from "./util/api";
import Clock from "./assets/clock2.svg";
import Pin from "./assets/pin2.svg";

type EventCardProps = {
  isLast: boolean
  event: any; // you can tighten this type later
  // Clock: string;
  // Pin: string;
  // formatDateTime: (t: any) => string;
  // getLocationLabel: (e: any) => string;
};

function formatDateTime(epochSeconds: number) {
    const date = new Date(epochSeconds * 1000);
    return date.toLocaleString([], {
        // month: "short",
        // day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        weekday:"short"
    });
}

function getLocationLabel(event: Event) {
    if (!event.locations || event.locations.length === 0) {
        return "TBA";
    }
    return event.locations
        .map((location) => location.description.trim())
        .filter(Boolean)
        .join(" • ");
}

export default function EventCard({
  event,
  isLast
  // Clock,
  // Pin,
  // formatDateTime,
  // getLocationLabel,
}: EventCardProps) {

  const [nowSec, setNowSec] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
  const id = window.setInterval(() => {
    setNowSec(Math.floor(Date.now() / 1000));
  }, 10_000);

  return () => clearInterval(id);
  }, []);

  const eventColor =
  event.eventType === "MEAL" ? "#FFD93B" :
  event.eventType === "MINIEVENT" ? "#FF0AC6" :
  event.eventType === "SPEAKER" ? "#9B5CFF" :
  event.eventType === "WORKSHOP" ? "#FF3B3B" :
  event.eventType === "QNA" ? "#53DDFF" :
  event.eventType === "OTHER" ? "#00FF3B" :
  "#00FF3B";

  const isHappeningNow = useMemo(() => {
    return nowSec >= event.startTime && nowSec <= event.endTime;
  }, [nowSec, event.startTime, event.endTime]);


const [pos, setPos] = useState(0);
useEffect(() => {
  const duration = 8000; // 10 seconds

  let rafId: number;

  const tick = (time: number) => {
    setPos((time % duration) / duration);
    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);
}, []);

// const hashStr = (s: string) => {
//   let h = 21661362632;
//   for (let i = 0; i < s.length; i++) {
//     h ^= s.charCodeAt(i);
//     h = Math.imul(h, 16777619);
//   }
//   return h >>> 0;
// };
// const rand01 = (key: string, salt: string) => {
//   const h = hashStr(key + "|" + salt);
//   return (h % 10000) / 10000;
// };
// const phase = rand01("strobe35356", "phase134") * Math.PI * 2;
// const floatAmp = 3;
// const randSpeed = Math.floor(rand01("strobe3535", "ph542") * 2) + 1;

function hexToRGBA(hex:string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

  const cardStyle = {
    padding: "0.9vh 2vh 0.6vh 2vh",
    borderLeft: `0.4vh solid ${isHappeningNow ? 
      hexToRGBA(eventColor, 0.75 + 0.25 * Math.pow(0.5 + 0.5 * Math.sin(pos * Math.PI * 2), 1.5)) : hexToRGBA(eventColor,.5)
    }`,
  boxShadow: isHappeningNow ? `
  -0.8vh 0 1vh -1vh ${hexToRGBA(eventColor, 0.75 + 0.25 * Math.pow(0.5 + 0.5 * Math.sin(pos * Math.PI * 2), 1.5))}
` : "none",
  };

  const headerRow = {
    display: "flex",
    alignItems: "center",
    gap: "1vh",
  };

  const titleStyle = {
    margin: 0,
    marginLeft: ".4vh",
    fontWeight: 700,
    fontSize: "2.7vh",
    color: "#F7F8FF",
    fontFamily: '"Tsukimi Rounded", "Montserrat", sans-serif',
    textTransform: "uppercase" as const,
    textShadow: isHappeningNow ? `0 0 .8vh ${eventColor}, 0 0.1vh 0.5vh ${eventColor}` : `0 0 0.1vh ${eventColor}, 0 0.05vh 0.1vh ${eventColor}`,
    textAlign: "left" as const,
  };

  const tagStyle = {
    marginLeft:"auto",
    padding: "0.3vh 1vh",
    color: "#F5F7FA",
    backgroundColor: "#ed783d",
    borderRadius: "2vh",
    fontWeight: 600,
    fontSize: "2vh",
  };

  const infoRow = {
    display: "flex",
    alignItems: "center",
    gap: "0.6vh",
  };

  const infoText = {
    fontWeight: 600,
    margin: 0,
    padding: "0.3vh",
    // color: "rgba(247, 248, 255, 0.82)",
    color: "#F5F7FA",
    fontSize: "1.8vh",
    textShadow: isHappeningNow ? `0 0 .8vh ${eventColor}, 0 0.1vh 0.5vh ${eventColor}` : `0 0 0.1vh ${eventColor}, 0 0.05vh 0.1vh ${eventColor}`,
    textAlign: "left" as const,
  };

  const iconStyle = {
    width: "1.8vh",
    height: "1.8vh",
    filter: isHappeningNow ? `
    drop-shadow(0 0 .05vh ${eventColor})
  drop-shadow(0 0 0.05vh ${eventColor})
  drop-shadow(0 0 0.05vh ${eventColor})
  ` : `drop-shadow(0 0 0.1vh ${eventColor})`
  };

  return (
    <article style={cardStyle}>
       <div
    style={{
      position: "absolute",
      marginLeft:"-2.56vh",
      marginTop: "-1.87vh",
      width: ".7vh",
      height: "2.3vh",
      background: "#DFFFE4",
    }}
  />
  {isLast &&  <div
    style={{
      position: "absolute",
      marginLeft:"-2.56vh", 
      marginTop: event.name.length >= 29 ? "10vh":"6.3vh",
      width: ".7vh",
      height: "2.3vh",
      background: "#DFFFE4",
    }}
  />}
 
      <div style={headerRow}>
        <h3 style={titleStyle}>{event.name}</h3>

        <span style={tagStyle}>{event.eventType}</span>
      </div>

      <div style={infoRow}>
         <img src={Pin} alt="pin" style={iconStyle} />
        <p style={infoText}>{getLocationLabel(event)}</p>
        <img src={Clock} alt="clock" style={iconStyle} />
        <p style={infoText}>
          {formatDateTime(event.startTime)}
          {event.startTime !== event.endTime &&
            ` – ${formatDateTime(event.endTime)}`}
        </p>
      </div>
    </article>
  );
}