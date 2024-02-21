import "./App.css";
import { useTime } from "./util/useTime";
import { useLeaderboard } from "./util/useLeaderboard";
import background from "./assets/background.svg";
import logo from "./assets/logo.svg";

function App() {
    const { now, countdown } = useTime();
    const leaderboard = useLeaderboard();
    console.log(leaderboard);
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
                  {leaderboard.map((profile, index) => 
                    <div key={index} className="profile">
                      <p>{profile.displayName} - {profile.points} points</p>
                    </div>
                  )}
                </div>
            </div>

            <div className="background">
                <img src={background} alt="background" />
            </div>
        </div>
    );
}

export default App;
