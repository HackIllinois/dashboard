import React, { useState, useEffect } from "react";
import clsx from "clsx";
import BACKGROUND from "./background.svg";
import styles from "./styles.module.scss";
import FERRIS_WHEEL_ANIMATION from "./ferris-wheel.json";
import Lottie from "lottie-react";

const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;

const checkinTime = new Date("02/24/2023 3:00 PM'");
const openingCeremonyTime = new Date("02/24/2023 6:00 PM'");
const hackingStarts = new Date("02/24/2023 7:00 PM'");
const hackingEnds = new Date("02/26/2023 9:00 AM'");
const judgingStarts = new Date("02/26/2023 10:30 AM'");
const closingCeremonyTime = new Date("02/26/2023 3:00 PM'");

const Slide = () => {
  const getDisplayTime = () => {
    const now = new Date();

    const text = [
      "Check-in Starts In",
      "Opening Ceremony Starts In",
      "Hacking Starts In",
      "Project Submissions Due In",
      "Judging Starts In",
      "Closing Ceremony Starts In",
    ];
    const times = [
      checkinTime,
      openingCeremonyTime,
      hackingStarts,
      hackingEnds,
      judgingStarts,
      closingCeremonyTime,
    ];

    let distance = 0;
    let textToDisplay = "";

    for (let i = 0; i < times.length; i++) {
      distance = times[i] - now;

      if (distance > 0) {
        textToDisplay = text[i];
        break;
      }
    }

    if (textToDisplay === '') {
      return <p className={styles.subsubtitle}>See you next year!</p>;
    }

    const days = Math.floor(distance / _day);
    const hours = Math.floor((distance % _day) / _hour);
    const minutes = Math.floor((distance % _hour) / _minute);
    const seconds = Math.floor((distance % _minute) / _second);

    const dayText = days !== 1 ? "days" : "day";
    const hoursText = hours !== 1 ? "hours" : "hour";
    const minutesText = minutes !== 1 ? "minutes" : "minute";
    const secondsText = seconds !== 1 ? "seconds" : "second";

    return (
      <>
        <p className={styles.subsubtitle}>{textToDisplay}</p>
        <h2>
          {" "}
          <span style={{ fontWeight: "bold", color: "#FEA3AA" }}>
            {days}
          </span>{" "}
          {dayText}{" "}
          <span style={{ fontWeight: "bold", color: "#FEA3AA" }}>{hours}</span>{" "}
          {hoursText}{" "}
          <span style={{ fontWeight: "bold", color: "#FEA3AA" }}>
            {minutes}
          </span>{" "}
          {minutesText}{" "}
          <span style={{ fontWeight: "bold", color: "#FEA3AA" }}>
            {seconds}
          </span>{" "}
          {secondsText}
        </h2>
        {/* <i style={{ fontSize: "1.5vw" }}>Friday, February 24th 6:00 PM</i> */}
      </>
    );
  };

  const [displayTime, setDisplayTime] = useState(getDisplayTime());

  useEffect(() => {
    const interval = setInterval(() => setDisplayTime(getDisplayTime()), 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className={clsx("slide")}>
      <img
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          objectFit: "cover",
        }}
        src={BACKGROUND}
        alt=""
      />
      <Lottie
        className={styles.ferrisWheelAnimation}
        animationData={FERRIS_WHEEL_ANIMATION}
      />
      ;
      <div className={styles.topHeader}>
        <div className={styles.welcomeTo}>Get ready for</div>
        <h1>HackIllinois</h1>
        <br></br>
        <p className={styles.subtitle}>making memories</p>
        {displayTime}
      </div>
    </div>
  );
};

export default <Slide />;
