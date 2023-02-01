import React, { useState, useEffect } from 'react';
import { hackingStarts, hackingEnds } from 'times';

const getDeltaTime = () => {
    const deltaHackingStarts = hackingStarts - Date.now();
    if (deltaHackingStarts > 0)
        return deltaHackingStarts;

    const deltaHackingEnds = Date.now() - hackingEnds;

    return Math.max(deltaHackingEnds, 0);
};

const getDisplayTime = time => {
    const _second = 1000;
    const _minute = _second * 60;
    const _hour = _minute * 60;

    let hours = Math.floor((time) / _hour);
    let minutes = Math.floor((time % _hour) / _minute);
    let seconds = Math.floor((time % _minute) / _second);
    return [hours, minutes, seconds].map(unit => String(unit).padStart(2, "0"));
};

const Countdown = () => {
    const [deltaTime, setDeltaTime] = useState(getDeltaTime());

    useEffect(() => {
        const interval = setInterval(() => setDeltaTime(getDeltaTime()), 1000);

        return () => clearInterval(interval);
    }, []);

    const units = ["Hours", "Minutes", "Seconds"];

    return (
        <div className="countdown">{getDisplayTime(deltaTime).map((quantity, i) => (
            <div key={i} className="countdownColumn">
                <div className="quantity">{quantity}</div>
                <div className="unit">{units[i]}</div>
            </div>
        ))}</div>
    );
};

export default Countdown;
