import "./App.css";
import { useTime } from "./util/useTime";
import { useLeaderboard } from "./util/useLeaderboard";
import { useEvents } from "./util/useEvents";
import { Event } from "./util/api";
import background from "./assets/background.svg";
import logo from "./assets/logo.svg";
import Pin from "./assets/pin.svg";
import Clock from "./assets/clock.svg";

function App() {
    const { now, countdown } = useTime();
    const leaderboard = useLeaderboard();
    const events = useEvents();
    console.log(events);
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
                    <span className="countdownTitle">Hacking Ends in:</span>
                    <div className="countdown">
                        <div>
                            <h1>{countdown.getDay()}</h1>
                            <p>Days</p>
                        </div>
                        <div>
                            <h1>{countdown.getHours()}</h1>
                            <p>Hours</p>
                        </div>
                        <div>
                            <h1>{countdown.getMinutes()}</h1>
                            <p>Minutes</p>
                        </div>
                    </div>
                </div>

                <h2>
                    {now.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </h2>
            </div>

            <div className="bottomRow">
                <div className="leaderboard">
                    <h2>Leaderboard</h2>
                    {leaderboard.map((profile, index) => (
                        <div key={index} className="profile">
                            <p>
                                {profile.displayName} - {profile.points} points
                            </p>
                        </div>
                    ))}
                </div>

                <div className="events">
                    <h2>Upcoming Events</h2>
                    {events.map((event: Event, index: number) => (
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
                                        <p className="knights">
                                            KNIGHTS
                                        </p>
                                    )}
                                    <p className="type">
                                        {event.eventType}
                                    </p>
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
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}{" "}
                                    -{" "}
                                    {new Date(
                                        event.endTime * 1000
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
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
                                            {location.description}
                                        </p>
                                    </>
                                ))}
                            </div>

                            <p className="eventDescription">
                                {event.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="background">
                <img src={background} alt="background" />
            </div>
        </div>
    );
}

export default App;
