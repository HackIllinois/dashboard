import "./App.css";
import { useTime } from "./util/useTime";
import { useLeaderboard } from "./util/useLeaderboard";
import { useEvents } from "./util/useEvents";
import { Event } from "./util/api";
import  useTimeSyncedReload  from "./util/useReload";
import background from "./assets/background.svg";
import logo from "./assets/logo.svg";
import Pin from "./assets/pin.svg";
import Clock from "./assets/clock.svg";
import scroll from "./assets/scroll.svg";
import solana from "./assets/solana.png";
import deere from "./assets/deere.svg";
import cat from "./assets/cat.svg";
import discover from "./assets/discover.svg";
import warp from "./assets/warp.svg";
import capitalone from "./assets/capitalone.svg";
import klaviyo from "./assets/klaviyo.png";
import agco from "./assets/agco.png";

import cloudflare from "./assets/cloudflare.png";
import deshaw from "./assets/deshaw.png";
import hrt from "./assets/hrt.svg";
import researchpark from "./assets/researchpark.png";
import slb from "./assets/slb.png";
import telora from "./assets/telora.jpeg";


function App() {
    const { now, countdown, isHacking } = useTime();
    const leaderboard = useLeaderboard();
    const events = useEvents();
    useTimeSyncedReload();

    return (
        <div className="App">
            <div className="topRow">
                <div className="title">
                    <img src={logo} alt="logo" className="logo" />
                    <p>
                        <i>Pursue your prophecy!</i>
                    </p>
                </div>

                <div className="countdownParent">
                    <span className="countdownTitle">
                        {isHacking ? "Hacking Ends in:" : "Hacking Starts in:"}
                    </span>
                    <div className="countdown">
                        {countdown.days > 0 && (
                            <div>
                                <h1>{countdown.days}</h1>
                                <p>Days</p>
                            </div>
                        )}
                        <div>
                            <h1>{countdown.hours}</h1>
                            <p>Hours</p>
                        </div>
                        <div>
                            <h1>{countdown.minutes}</h1>
                            <p>Minutes</p>
                        </div>
                        <div>
                            <h1>{countdown.seconds}</h1>
                            <p>Seconds</p>
                        </div>
                    </div>
                </div>

                <h2>
                    {now.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                    })}
                </h2>
            </div>

            <div className="bottomRow">
                <div className="leaderboard">
                    <h2>Leaderboard</h2>
                    {leaderboard.map((profile, index) => (
                        <div key={index} className="profile">
                            <div key={index} className="scroll">
                                <img
                                    src={scroll}
                                    alt="scroll"
                                    className="scroll"
                                />
                            </div>
                            <p className="name">
                                {profile.displayName.length > 25
                                    ? profile.displayName.slice(0, 24) + "..."
                                    : profile.displayName}
                            </p>
                            <p>{profile.points.toLocaleString('en-US')} PTS</p>
                        </div>
                    ))}
                </div>

                <iframe width="1920" height="1080" src="https://www.youtube.com/embed/6GEPDfJKcE0?si=l3Vs_Mvmz2RKoIdZ&autoplay=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                {/* <div className="events">
                    <h2>Upcoming Events</h2>
                    {events.length > 0 ? events.map((event: Event, index: number) => (
                        <div className="eventCard" key={index}>
                            <div className="headerContainer">
                                <h3 className="eventTitle">{event.name}</h3>
                                <div className="tags">
                                    {event.sponsor !== "" && (
                                        <p className="sponsor">
                                            {event.sponsor}
                                        </p>
                                    )}
                                    {event.isPro && (
                                        <p className="knights">KNIGHTS</p>
                                    )}
                                    <p className="type">{event.eventType}</p>
                                    {event.points > 0 && <p className="points">
                                        +{event.points} PTS
                                    </p>}
                                </div>
                            </div>

                            <div className="timeContainer">
                                <img
                                    src={Clock}
                                    alt="clock"
                                    className="clock"
                                />
                                <p className="time">
                                    {new Date(
                                        event.startTime * 1000
                                    ).toLocaleTimeString([], {
                                        hour: "numeric",
                                        minute: "2-digit",
                                    })}{" "}
                                    -{" "}
                                    {new Date(
                                        event.endTime * 1000
                                    ).toLocaleTimeString([], {
                                        hour: "numeric",
                                        minute: "2-digit",
                                    })}
                                </p>

                                {/* {event.locations.map((location, i) => (
                                    <>
                                        <img
                                            src={Pin}
                                            alt="pin"
                                            className="pin"
                                        />
                                        <p className="location" key={i}>
                                            {location.description}
                                        </p>
                                    </>
                                ))} }
                            </div>
                            <div className="timeContainer">
                                {event.locations.map((location, i) => (
                                    <>
                                        <img
                                            src={Pin}
                                            alt="pin"
                                            className="pin"
                                        />
                                        <p className="location" key={i}>
                                            {location.description.length > 300
                                                ? location.description.slice(
                                                      0,
                                                      300
                                                  ) + "..."
                                                : location.description}
                                        </p>
                                    </>
                                ))}
                            </div>

                            <p className="eventDescription">
                                {event.description}
                            </p>
                        </div>
                    )) : <p className="noEvents">No upcoming events :')</p>}
                </div> */}

                <div className="sponsors">
                    <div className="sponsorLogos">
                        <h2>Sponsors</h2>
                        <div>
                            <img src={cat} alt="cat"/>
                        </div>
                        <div>
                            <img src={deere} alt="deere" />
                            <img src={solana} alt="solana" />
                        </div>
                        <div>
                            <img src={discover} alt="discover" />
                            <img src={klaviyo} alt="klaviyo" />
                        </div>
                        <div>
                            <img src={capitalone} alt="capitalone" />
                            <img src={agco} alt="agco" />
                        </div>
                        <div>
                            <img src={slb} alt="slb" />
                            <img src={cloudflare} alt="cloudflare" />
                    
                        </div>
                        <div>
                            <img src={deshaw} alt="deshaw" />
                            <img src={researchpark} alt="researchpark" />
                        </div>
                        <div>
                            <img src={warp} alt="warp" />
                            <img src={telora} alt="telora" />
                        </div>
                        <div>
                            <img src={hrt} alt="hrt" />
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>

            <div className="background">
                <img src={background} alt="background" />
            </div>
        </div>
    );
}

export default App;
