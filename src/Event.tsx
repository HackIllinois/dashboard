import { useState, useEffect, useMemo } from "react";
import { Event } from "./util/api";
import Clock from "./assets/clock2.svg";
import Pin from "./assets/pin2.svg";
import { color } from "framer-motion";
import { textSpanOverlapsWith } from "typescript";

type EventCardProps = {
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

  const isHappeningNow = useMemo(() => {
    return nowSec >= event.startTime && nowSec <= event.endTime;
  }, [nowSec, event.startTime, event.endTime]);

  const cardStyle = {
    padding: "0.6vh 2vh 0.6vh 2vh",
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
    textShadow:isHappeningNow ? "0 0 3px rgba(239, 120, 61, 0.4), 0 2px 6px rgba(239,120,61,0.4)" : "0 0 3px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)"
  };

  const tagStyle = {
    marginLeft:"auto",
    padding: "0.5vh 1.2vh",
    color: "#F5F7FA",
    backgroundColor: "#ed783d",
    borderRadius: "2vh",
    fontWeight: 600,
    fontSize: "1.6vh",
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
    textShadow: isHappeningNow ? "0 0 3px rgba(239, 120, 61, 0.4), 0 2px 6px rgba(239,120,61,0.4)" : "0 0 3px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)"
  };

  const iconStyle = {
    width: "1.8vh",
    height: "1.8vh",
    filter: isHappeningNow ? `
    drop-shadow(0 0 3px rgba(239, 120, 61, .8))
  drop-shadow(0 0 6px rgba(239, 120, 0, 0.6))
  drop-shadow(0 0 10px rgba(239, 120, 0, 0.5))
  ` : "drop-shadow(0 0 3px rgba(239, 120, 61, .8))"
  };

  const descRow = {
    textAlign:"left" as const,
    color:"white",
    fontSize:"1vh"
  }

  return (
    <article style={cardStyle}>
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
      {/* <div style={descRow}>{event.description}</div> */}
    </article>
  );
}