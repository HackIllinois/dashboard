import React from 'react';
import clsx from 'clsx';
import BACKGROUND from './background.svg';

const Slide = () => {
    return <div className={clsx("slide")} style={{ position: "relative" }}>
        <img style={{ width: "100%", height: "100%", position: "absolute" }} src={BACKGROUND} alt="" />
        <div style={{ textAlign: "center", width: "100%", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <div style={{ fontSize: "3vw" }}>Hacking Ends In</div>
            <div style={{ fontSize: "10vw" }}>00:00:00</div>
        </div>
    </div>;
};

export default <Slide />;
