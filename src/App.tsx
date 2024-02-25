import "./App.css";
import { useTime } from "./util/useTime";
import { useLeaderboard } from "./util/useLeaderboard";
import { useEvents } from "./util/useEvents";
import { Event } from "./util/api";
import { useReload } from "./util/useReload";
import background from "./assets/background.svg";
import logo from "./assets/logo.svg";
import Pin from "./assets/pin.svg";
import Clock from "./assets/clock.svg";
import bottle from "./assets/bottle.svg";
import solana from "./assets/solana.svg";
import deere from "./assets/deere.svg";
import cat from "./assets/cat.svg";
import discover from "./assets/discover.svg";
import github from "./assets/github.svg";
import warp from "./assets/warp.svg";
import spectrum from "./assets/spectrum.svg";
import wolfram from "./assets/wolfram.svg";

function App() {
    const { now, countdown, isHacking } = useTime();
    const leaderboard = useLeaderboard();
    const events = useEvents();
    useReload();

    return (
        <div className="App">
            <div className="topRow">
                <div className="title">
                    <img src={logo} alt="logo" className="logo" />
                    <p>
                        <i>Adventure Awaits!</i>
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
                            <div key={index} className="bottle">
                                <img
                                    src={bottle}
                                    alt="bottle"
                                    className="bottle"
                                />
                            </div>
                            <p className="name">
                                {profile.displayName.length > 25
                                    ? profile.displayName.slice(0, 24) + "..."
                                    : profile.displayName}
                            </p>
                            <p className="points">{profile.points} PTS</p>
                        </div>
                    ))}
                </div>

                <div className="events">
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
                                    <p className="points">
                                        +{event.points} PTS
                                    </p>
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
                                ))} */}
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
                    )) : <p className="noEvents">No upcoming events</p>}
                </div>

                <div className="sponsors">
                    <h2>Sponsors</h2>
                    <div className="sponsorLogos">
                        <div className="solana">
                            <img src={solana} alt="solana" />
                        </div>
                        <div className="row">
                            <img src={deere} alt="deere" />
                            <img src={cat} alt="cat" />
                        </div>
                        <div>
                            <img src={discover} alt="discover" />
                        </div>
                        <div>
                            <img src={github} alt="github" />
                        </div>
                        <div>
                            <img src={warp} alt="warp" />
                            <img src={spectrum} alt="spectrum" />
                        </div>
                        <div>
                            <img src={wolfram} alt="wolfram" />
                        </div>
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
