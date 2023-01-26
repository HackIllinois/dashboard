import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import BACKGROUND from './background.svg';
import styles from './styles.module.scss';
import QRCODE from './qrcode.png';


const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;

const getDisplayTime = () => {
    const openingCeremonyTime = new Date("02/24/2023 6:00 PM'");
    const now = new Date();
    const distance = openingCeremonyTime - now;

    const days = Math.floor(distance / _day);
    let hours = Math.floor((distance % _day) / _hour);
    let minutes = Math.floor((distance % _hour) / _minute);
    let seconds = Math.floor((distance % _minute) / _second);

    const dayText = days !== 1 ? "days" : "day";
    const hoursText = hours !== 1 ? "hours": "hour";
    const minutesText = minutes !== 1 ? "minutes" : "minute";
    const secondsText = seconds !== 1 ? "seconds" : "second";

    if (distance <= 0) {
        return <h2>Hacking has started!</h2>;
    }

    return (<>
        <h2> <span style={{ fontWeight: 'bold', color: '#fcaf7e'}}>{days}</span>  {dayText} {" "}<span style={{ fontWeight: 'bold', color: '#fcaf7e'}}>{hours}</span>  {hoursText} {" "}
        <span style={{ fontWeight: 'bold', color: '#fcaf7e'}}>{minutes}</span>  {minutesText} {" "}
        <span style={{ fontWeight: 'bold', color: '#fcaf7e' }}>{seconds}</span>  {secondsText}
        </h2>
        <i style={{fontSize: '1.5vw'}}>Friday, February 24th 6:00 PM at the Illini Union</i>
    </>
    )
    };

const Slide = () => {
    const [displayTime, setDisplayTime] = useState(getDisplayTime());

    useEffect(() => {
        const interval = setInterval(() => setDisplayTime(getDisplayTime()), 1000);

        return () => clearInterval(interval);
    });

    return <div className={clsx("slide")} style={{ position: "relative" }}>
        <img style={{ width: "100%", height: "100%", position: "absolute", objectFit: 'cover'  }} src={BACKGROUND} alt="" />
        <div className={styles.topHeader}>
            Opening Ceremony Starts In<br></br>
            {displayTime}
        </div>
        <div className={styles.middleHeader}>
            <p>Register at <span className={styles.link}>hackillinois.org/register</span></p>
        </div>
        <img className={styles.qrCode} src={QRCODE} alt="" />
    </div>;
};

export default <Slide />;
