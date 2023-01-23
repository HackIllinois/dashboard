import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import BACKGROUND from './background.svg';

const getDisplayTime = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const Slide = () => {
    const [displayTime, setDisplayTime] = useState(getDisplayTime());

    useEffect(() => {
        const interval = setInterval(() => setDisplayTime(getDisplayTime()), 1000);

        return () => clearInterval(interval);
    });

    return <div className={clsx("slide")} style={{ position: "relative" }}>
        <img style={{ width: "100%", height: "100%", position: "absolute" }} src={BACKGROUND} alt="" />
        <div style={{ position: "absolute", bottom: "0", padding: "3vw", fontSize: "10vw" }}>{displayTime}</div>
    </div>;
};

export default <Slide />;
