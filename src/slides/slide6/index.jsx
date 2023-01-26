import React from 'react';
import clsx from 'clsx';
import BACKGROUND from './background.svg';

const Slide = () => {
    return <div className={clsx("slide")}>
        <img style={{ width: "100%", height: "100%" }} src={BACKGROUND} alt="" />
    </div>;
};

export default <Slide />;
