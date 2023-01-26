import React from 'react';
import clsx from 'clsx';
import BACKGROUND from './background.svg';

const Slide = () => {
    return <div className={clsx("slide")} style={{ position: "relative" }}>
        <img style={{ width: "100%", height: "100%", position: "absolute" }} src={BACKGROUND} alt="" />
        <h1 style={{ position: "absolute", padding: "3vw" }}>Welcome to HackIllinois!</h1>
    </div>;
};

export default <Slide />;
