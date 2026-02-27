import { useState, useEffect, useMemo, useRef } from "react";
import { Event } from "./util/api";
import Clock from "./assets/clock2.svg";
import Pin from "./assets/pin2.svg";

type EventCardProps = {
  isLast: boolean
  event: any;
};

function formatDateTime(startEpoch: number, endEpoch: number) {
  const start = new Date(startEpoch * 1000);
  const end = new Date(endEpoch * 1000);

  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  const startPeriod = start.getHours() >= 12 ? "PM" : "AM";
  const endPeriod = end.getHours() >= 12 ? "PM" : "AM";

  const startWeekday = start.toLocaleString([], { weekday: "short" });
  const endWeekday = end.toLocaleString([], { weekday: "short" });

  function stripAmPm(str:string) {
    return str.replace(/\s?[AP]M$/i, "").trim();
  }

  const startTime = stripAmPm(
    start.toLocaleString([], {
      hour: "numeric",
      minute: "2-digit",
    })
  );

  const endTime = stripAmPm(
    end.toLocaleString([], {
      hour: "numeric",
      minute: "2-digit",
    })
  );

  if (sameDay) {
    // Same day and AM/PM -> compress
    if (startPeriod === endPeriod) {
      return `${startWeekday} ${startTime} - ${endTime} ${endPeriod}`;
    }
    // same day and AM/PM switch -> show both periods, but day only once
    return `${startWeekday} ${startTime} ${startPeriod} - ${endTime} ${endPeriod}`;
  }
  // diff day -> full format
  return `${startWeekday} ${startTime} ${startPeriod} - ${endWeekday} ${endTime} ${endPeriod}`;
}


function getLocationLabel(event: Event) {
    if (!event.locations || event.locations.length === 0) {
        return "TBA";
    }
    return event.locations
        .map((location) => location.description.trim())
        .filter(Boolean)
        .join(" • ")
        .replace("Siebel Center for Computer Science", "Siebel CS").replace("Sidney Lu Mechanical Engineering Building", "Sidney Lu Mechanical Engineering");
}

export default function EventCard({
  event,
  isLast
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

  const eventTagColor =
  event.eventType === "MEAL" ? "#aa8903" :
  event.eventType === "MINIEVENT" ? "#c20095" :
  event.eventType === "SPEAKER" ? "#9B5CFF" :
  event.eventType === "WORKSHOP" ? "#bd0000" :
  event.eventType === "QNA" ? "#53DDFF" :
  event.eventType === "OTHER" ? "#008c21" :
  "#008c21";

  const isHappeningNow = useMemo(() => {
    return nowSec >= event.startTime && nowSec <= event.endTime;
  }, [nowSec, event.startTime, event.endTime]);

  

function hexToRGBA(hex:string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const titleRef = useRef<HTMLHeadingElement>(null);
const [titleLines, setTitleLines] = useState(1);

useEffect(() => {
  const el = titleRef.current;
  if (!el) return;

  const style = window.getComputedStyle(el);
  let lineHeight = parseFloat(style.lineHeight);
  if (isNaN(lineHeight)) {
    lineHeight = parseFloat(style.fontSize) * 1.2;
  }

  const lines = Math.round(el.scrollHeight / lineHeight);
  setTitleLines(lines);
}, [event.name]);


  const cardStyle = {
    padding: "0.9vh 2vh 0.6vh 2vh",
    borderLeft: `0.4vh solid ${isHappeningNow ? 
      hexToRGBA(eventColor, 1) : hexToRGBA(eventColor,.25)
    }`,
  boxShadow: isHappeningNow ? `
  -0.8vh 0 1vh -1vh ${hexToRGBA(eventColor, 1)}
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
    backgroundColor: eventTagColor,
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
      marginTop: titleLines >= 2 ? "10vh":"6.3vh",
      width: ".7vh",
      height: "2.3vh",
      background: "#DFFFE4",
    }}
  />}
 
      <div style={headerRow}>
        <h3 ref={titleRef} style={titleStyle}>{event.name}</h3>

        <span style={tagStyle}>{event.eventType}</span>
      </div>

      <div style={infoRow}>
         <img src={Pin} alt="pin" style={iconStyle} />
        <p style={infoText}>{getLocationLabel(event)}</p>
        <img src={Clock} alt="clock" style={iconStyle} />
        <p style={infoText}>
            {formatDateTime(event.startTime, event.endTime)}
        </p>
      </div>
    </article>
  );
}