import React from 'react';
import clsx from 'clsx';
import BACKGROUND from './background.svg';
import styles from './styles.module.scss';

const Slide = () => {
    return <div className={clsx("slide")}>
        <img style={{ width: "100%", height: "100%", position: "absolute", objectFit: 'cover' }} src={BACKGROUND} alt="" />
        <div className={styles.topHeader}>
            <div className={styles.welcomeTo}>Get ready for</div>
            <h1>HackIllinois</h1>
            <br></br>
            <p className={styles.subtitle}>making memories</p>
            <br></br>
            <p className={styles.subsubtitle}>February 24-26 at Siebel CS, CIF, & Illini Union</p>
      </div>
    </div>;
};

export default <Slide />;
