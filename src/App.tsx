// import "./App.css";
// import { useTime } from "./util/useTime";
// import { useLeaderboard } from "./util/useLeaderboard";
// import { useEvents } from "./util/useEvents";
// import { Event } from "./util/api";
// import useTimeSyncedReload from "./util/useReload";
// import background from "./assets/background.svg";
// import zeus from "./assets/zeus.svg";
// import logo from "./assets/logo.svg";
// import Pin from "./assets/pin.svg";
// import Clock from "./assets/clock.svg";
// // import scroll from "./assets/scroll.svg";
// import solana from "./assets/solana.png";
// import deere from "./assets/deere.svg";
// import cat from "./assets/cat.png";
// import discover from "./assets/discover.svg";
// import warp from "./assets/warp.svg";
// import capitalone from "./assets/capitalone.svg";
// import klaviyo from "./assets/klaviyo.png";
// import agco from "./assets/agco.png";

// import cloudflare from "./assets/cloudflare.png";
// import deshaw from "./assets/deshaw.png";
// import hrt from "./assets/hrt.svg";
// import researchpark from "./assets/researchpark.png";
// import slb from "./assets/slb.png";
// import telora from "./assets/telora.jpeg";
// import { useEffect, useState } from "react";


// function App() {
//     const { now, countdown, isHacking } = useTime();
//     const [zeusAppear, setZeusAppear] = useState(false);
//     const [lightningAppear, setLightningAppear] = useState(false);
//     const leaderboard = useLeaderboard();
//     const events = useEvents();
//     useTimeSyncedReload();

//     useEffect(() => {
//         const now = new Date();
//         const minutes = now.getMinutes();
//         const seconds = now.getSeconds();
//         const ms = now.getMilliseconds();

//         const currentMs = (minutes * 60 + seconds) * 1000 + ms;
//         const nextEventMin = Math.floor((minutes + 10) / 10) * 10;
//         const nextEventMinMs = nextEventMin * 60 * 1000;
//         const delay = nextEventMinMs - currentMs;

//         setTimeout(() => {
//             setZeusAppear(true);
//         }, delay - (10 * 1000));

//         setTimeout(() => {
//             setLightningAppear(true);
//         }, delay - (2 * 1000));
//     }, [])

//     return (
//         <div className="App">
//             <div className={`zeus-container ${zeusAppear ? "zeus-appear" : ""}`}>
//                 <img src={zeus} alt="zeus" className="zeus" />
//                 <div className="lightning-container">
//                     <div className={`lightning lightning-one ${lightningAppear ? "lightning-appear" : ""}`}></div>
//                     <div className={`lightning lightning-two ${lightningAppear ? "lightning-appear" : ""}`}></div>
//                 </div>
//             </div>
//             <div className="topRow">
//                 <div className="title">
//                     <img src={logo} alt="logo" className="logo" />
//                     <p>
//                         <i>Pursue your prophecy!</i>
//                     </p>
//                 </div>

//                 <div className="countdownParent">
//                     <span className="countdownTitle">
//                         {isHacking ? "Hacking Ends in:" : "Hacking Starts in:"}
//                     </span>
//                     <div className="countdown">
//                         {countdown.days > 0 && (
//                             <div>
//                                 <h1>{countdown.days}</h1>
//                                 <p>Days</p>
//                             </div>
//                         )}
//                         <div>
//                             <h1>{countdown.hours}</h1>
//                             <p>Hours</p>
//                         </div>
//                         <div>
//                             <h1>{countdown.minutes}</h1>
//                             <p>Minutes</p>
//                         </div>
//                         <div>
//                             <h1>{countdown.seconds}</h1>
//                             <p>Seconds</p>
//                         </div>
//                     </div>
//                 </div>

//                 <h2>
//                     {now.toLocaleTimeString([], {
//                         hour: "numeric",
//                         minute: "2-digit",
//                     })}
//                 </h2>
//             </div>

//             <div className="bottomRow">
//                 <div className="leaderboard">
//                     <h2>Leaderboard</h2>
//                     {leaderboard.map((profile, index) => (
//                         <div key={index} className="profile">
//                             <p className="rank">{index + 1}</p>
//                             <div className="name-profile">
//                                 <div className="profile-picture">
//                                     <img
//                                         src={profile.avatarUrl}
//                                         alt="profile"
//                                         className="profile-picture"
//                                     />
//                                 </div>
//                                 <p className="name">
//                                     {profile.displayName.length > 25
//                                         ? profile.displayName.slice(0, 24) + "..."
//                                         : profile.displayName}
//                                 </p>
//                             </div>
//                             <p>{profile.points.toLocaleString('en-US')} PTS</p>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="events">
//                     <h2>Upcoming Events</h2>
//                     {events.length > 0 ? events.map((event: Event, index: number) => (
//                         <div className="eventCard" key={index}>
//                             <div className="headerContainer">
//                                 <h3 className="eventTitle">{event.name}</h3>
//                                 <div className="tags">
//                                     {event.sponsor !== "" && (
//                                         <p className="sponsor">
//                                             {event.sponsor}
//                                         </p>
//                                     )}
//                                     {event.isPro && (
//                                         <p className="knights">KNIGHTS</p>
//                                     )}
//                                     <p className="type">{event.eventType}</p>
//                                     {event.points > 0 && <p className="points">
//                                         +{event.points.toLocaleString("en-US")} PTS
//                                     </p>}
//                                 </div>
//                             </div>

//                             <div className="timeContainer">
//                                 <img
//                                     src={Clock}
//                                     alt="clock"
//                                     className="clock"
//                                 />
//                                 <p className="time">
//                                     {
//                                         event.startTime === event.endTime ? new Date(
//                                             event.startTime * 1000
//                                         ).toLocaleTimeString([], {
//                                             hour: "numeric",
//                                             minute: "2-digit",
//                                         }) : `${new Date(
//                                             event.startTime * 1000
//                                         ).toLocaleTimeString([], {
//                                             hour: "numeric",
//                                             minute: "2-digit",
//                                         })} - 
//                                     ${new Date(
//                                             event.endTime * 1000
//                                         ).toLocaleTimeString([], {
//                                             hour: "numeric",
//                                             minute: "2-digit",
//                                         })}`
//                                     }
//                                 </p>
//                             </div>
//                             <div className="timeContainer">
//                                 {event.locations.map((location, i) => (
//                                     <>
//                                         <img
//                                             src={Pin}
//                                             alt="pin"
//                                             className="pin"
//                                         />
//                                         <p className="location" key={i}>
//                                             {location.description.length > 300
//                                                 ? location.description.slice(
//                                                     0,
//                                                     300
//                                                 ) + "..."
//                                                 : location.description}
//                                         </p>
//                                     </>
//                                 ))}
//                             </div>

//                             <p className="eventDescription">
//                                 {event.description}
//                             </p>
//                         </div>
//                     )) : <p className="noEvents">No upcoming events :')</p>}
//                 </div>

//                 <div className="sponsors">
//                     <div className="sponsorLogos">
//                         <h2>Sponsors</h2>
//                         <div>
//                             <img src={cat} alt="cat" />
//                         </div>
//                         <div>
//                             <img src={deere} alt="deere" />
//                             <img src={solana} alt="solana" />
//                         </div>
//                         <div>
//                             <img src={discover} alt="discover" />
//                             <img src={klaviyo} alt="klaviyo" />
//                         </div>
//                         <div>
//                             <img src={capitalone} alt="capitalone" />
//                             <img src={agco} alt="agco" />
//                         </div>
//                         <div>
//                             <img src={slb} alt="slb" />
//                             <img src={cloudflare} alt="cloudflare" />

//                         </div>
//                         <div>
//                             <img src={deshaw} alt="deshaw" />
//                             <img src={researchpark} alt="researchpark" />
//                         </div>
//                         <div>
//                             <img src={warp} alt="warp" />
//                             <img src={telora} alt="telora" />
//                         </div>
//                         <div>
//                             <img src={hrt} alt="hrt" />
//                         </div>
//                         <div></div>
//                     </div>
//                 </div>
//             </div>

//             <div className="background">
//                 <img src={background} alt="background" />
//             </div>
//         </div>
//     );
// }

// export default App;
// import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { useEvents } from "./util/useEvents";
import { Event } from "./util/api";
import stars from "./assets/stars.svg";
import debris from "./assets/debris.svg";
import leftRock from "./assets/left_rock.svg";
import rightRock from "./assets/right_rock.svg";
import { motion } from "framer-motion";
import Clock from "./assets/clock2.svg";
import Pin from "./assets/pin2.svg";
import logo from "./assets/logo2.svg";

function formatDateTime(epochSeconds: number) {
    const date = new Date(epochSeconds * 1000);
    return date.toLocaleString([], {
        month: "short",
        day: "numeric",
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

function App() {
    const events = useEvents();
    const eventCards = useMemo(() => events, [events]);
    const [rockPath, setRockPath] = useState('path("M 0 0 C 0 0 0 0 0 0")');

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        html.style.height = "100%";
        body.style.height = "100%";
        body.style.margin = "0";
                body.style.backgroundColor = "#0b0a1f";

        const updateRockPath = () => {
            const vh = (value: number) => (window.innerHeight * value) / 100;
            const vhPoints = {
                startX: -20,
                startY: 40,
                c1x: -75,
                c1y: -0,
                c2x: -60,
                c2y: -30,
                endX: -30,
                endY: -120,
            };
            const path = `path("M ${vh(vhPoints.startX)} ${vh(
                vhPoints.startY
            )} C ${vh(vhPoints.c1x)} ${vh(vhPoints.c1y)} ${vh(
                vhPoints.c2x
            )} ${vh(vhPoints.c2y)} ${vh(vhPoints.endX)} ${vh(
                vhPoints.endY
            )}")`;
            setRockPath(path);
        };

        updateRockPath();
        window.addEventListener("resize", updateRockPath);

        return () => {
            html.style.height = "";
            body.style.height = "";
            body.style.margin = "";
            body.style.backgroundColor = "";
            window.removeEventListener("resize", updateRockPath);
        };
    }, []);

    return (
        <div
            className="App"
            style={{
                textAlign: "center",
                overflow: "hidden",
                height: "100%",
                minHeight: "100vh",
                width: "100%",
                margin: "0px",
                padding: "0px",
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "2vh",
                color: "#F7F8FF",
                position: "relative",
                background:
                    "radial-gradient(120vh 80vh at 70% 15%, rgba(123, 83, 186, 0.45) 0%, rgba(28, 18, 64, 0.65) 45%, rgba(11, 10, 31, 0.92) 100%)",
            }}
        >
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 0,
                    isolation: "isolate",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                    }}
                >
                    <img src={logo} alt="logo" className="logo" style={{
                        position: "absolute",
                            top: "6vh",
                            left: "6vh",
                            width: "30vh",
                            zIndex:999
                    }} />
                    <img
                        src={stars}
                        alt=""
                        style={{
                            position: "absolute",
                            top: "-100vh",
                            left: "80vh",
                            width: "100vh",
                            opacity: 0.75,
                            rotate: "90deg",
                        }}
                    />
                </div>
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 2,
                    }}
                >
                    <motion.img
                        src={debris}
                        alt=""
                        style={{
                            position: "absolute",
                            top: "-2vh",
                            left: "29%",
                            transform: "translateX(-50%)",
                            width: "130vh",
                            filter:"brightness(0.5)"
                        }}
                        animate={{ y: [-10, 10, -10], rotate: [-0.6, 0.6, -0.6] }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.img
                        src={leftRock}
                        alt=""
                        style={{
                            position: "absolute",
                            bottom: "-8vh",
                            left: "-5vh",
                            width: "40vh",
                            maxWidth: "420px",
                             filter:"brightness(0.8)"
                        }}
                        animate={{ y: [8, -8, 8], rotate: [0.8, -0.6, 0.8] }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.img
                        src={rightRock}
                        alt=""
                        style={{
                            position: "absolute",
                            top: "18vh",
                            right: "-6vh",
                            width: "45vh",
                            filter:"brightness(0.8)"
                        }}
                        animate={{ y: [-6, 6, -6], rotate: [-0.6, 0.6, -0.6] }}
                        transition={{
                            duration: 5.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    {/* <motion.img
                        src={rightRock}
                        alt=""
                        style={{
                            position: "absolute",
                            bottom: "-12vh",
                            right: "-10vh",
                            width: "40vh",
                            maxWidth: "320px",
                            filter:"brightness(0.8)",
                            offsetPath: rockPath,
                            offsetRotate: "auto",
                        }}
                        animate={{ offsetDistance: ["0%", "100%"] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "linear",
                        }}
                    /> */}
                </div>
            </div>
            <section
                className="events"
                style={{
                    width: "25vw",
                    // height: "75vh",
                    position: "fixed",
                    top: "12vh",
                    right: "10vh",
                    zIndex: 2,
                }}
            >
                <h2
                    style={{
                        color: "#F7F8FF",
                        fontSize: "3vh",
                        marginTop: "-0.5vh",
                        fontFamily: '"Tsukimi Rounded", "Montserrat", sans-serif',
                        textTransform: "uppercase",
                        letterSpacing: "0.3vh",
                    }}
                >
                    Events
                </h2>
                {eventCards.length === 0 && (
                    <p
                        className="noEvents"
                        style={{
                            margin: "auto",
                            color: "rgba(247, 248, 255, 0.7)",
                            fontSize: "2vh",
                        }}
                    >
                        No upcoming events.
                    </p>
                )}
                {eventCards.map((event) => (
                    <article
                        className="eventCard"
                        key={event.id}
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(22, 18, 50, 0.85) 0%, rgba(39, 25, 86, 0.85) 50%, rgba(26, 20, 66, 0.9) 100%)",
                            borderRadius: "2vh",
                            padding: "1.2vh",
                            width: "95%",
                            justifyContent: "center",
                            marginBottom: "1.2vh",
                            border: "1px solid rgba(130, 122, 255, 0.18)",
                            boxShadow: "0 1.2vh 2.6vh rgba(10, 6, 27, 0.5)",
                        }}
                    >
                        <div
                            className="headerContainer"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.5vh",
                            }}
                        >
                            <h3
                                className="eventTitle"
                                style={{
                                    fontWeight: 700,
                                    fontSize: "2vh",
                                    margin: "1vh",
                                    marginLeft: ".4vh",
                                    color: "#F7F8FF",
                                    textAlign: "left",
                                    fontFamily: '"Tsukimi Rounded", "Montserrat", sans-serif',
                                    textTransform: "uppercase",
                                }}
                            >
                                {event.name}
                            </h3>
                            <div
                                className="tags"
                                style={{
                                    display: "flex",
                                    gap: "1vh",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                <p
                                    className="type"
                                    style={{
                                        margin: 0,
                                        padding: "0.5vh 1.2vh",
                                        color: "#0A061B",
                                        backgroundColor: "#FFD670",
                                        borderRadius: "2vh",
                                        display: "inline-block",
                                        fontWeight: 600,
                                        fontSize: "1.6vh",
                                    }}
                                >
                                    {event.eventType}
                                </p>
                            </div>
                        </div>
                        <div
                            className="timeContainer"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.6vh",
                                fontWeight: 500,
                                color: "rgba(247, 248, 255, 0.7)",
                            }}
                        >
                            <img
                                    src={Clock}
                                    alt="clock"
                                    className="clock"
                                    height={"18vh"}
                                    width={"18vh"}
                                />
                            <p
                                className="time"
                                style={{
                                    margin: 0,
                                    padding: "0.3vh",
                                    color: "rgba(247, 248, 255, 0.82)",
                                    fontSize: "2vh",
                                }}
                            >
                                {formatDateTime(event.startTime)}{" "}
                                {event.startTime === event.endTime
                                    ? ""
                                    : `– ${formatDateTime(event.endTime)}`}
                            </p>
                        </div>
                        <div
                            className="timeContainer"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.6vh",
                                fontWeight: 500,
                                color: "rgba(247, 248, 255, 0.7)",
                            }}
                        >
                            <img
                                            src={Pin}
                                            alt="pin"
                                            className="pin"
                                             height={"18vh"}
                                            width={"18vh"}
                                        />
                            <p
                                className="location"
                                style={{
                                    margin: 0,
                                    padding: "0.3vh",
                                    color: "rgba(247, 248, 255, 0.82)",
                                    fontSize: "2vh",
                                }}
                            >
                                {getLocationLabel(event)}
                            </p>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default App;
