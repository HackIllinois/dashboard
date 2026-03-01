import { useMemo } from "react";
import { useEvents } from "./util/useEvents";
import logo from "./assets/logo2.svg";
import { useTime } from "./util/useTime";
import TopBar3 from "./assets/topbar3.svg";
import BottomBar3 from "./assets/bottombar3.svg";
import EventCard from "./Event";
import Leaderboard from "./Leaderboard";
import Countdown from "./Countdown";
import TeamLeaderboard from "./TeamLeaderboard";
import fulcrumgt from "./assets/fulcrumgt.svg";

function Dashboard() {
  const events = useEvents();
  const eventCards = useMemo(() => events, [events]);
  const { now } = useTime();

  return (
    <div
      className="Dashboard"
      style={{
        textAlign: "center",
        overflow: "hidden",
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        margin: "0px",
        padding: "0px",
        fontSize: "2vh",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "2vh",
          position: "absolute",
          top: "11vh",
          left: "6vh",
        }}
      >
        <div
          style={{
            color: "white",
            fontFamily: "Tsukimi Rounded",
            fontWeight: 700,
            textShadow: "0 3px 6.239px #0D084D",
            fontSize: "2.4vh",
            lineHeight: 1,
            whiteSpace: "nowrap",
            zIndex: 999,
          }}
        >
          POWERED BY
        </div>

        <img
          alt="fulcrumgt"
          src={fulcrumgt}
          style={{
            zIndex: 999,
            height: "5vh",
            pointerEvents: "none",
            marginTop: "1vh",
            marginLeft: "-1.5vh",
          }}
        />
      </div>

      <img
        src={logo}
        alt="logo"
        className="logo"
        style={{
          position: "absolute",
          top: "3vh",
          left: "6vh",
          width: "24vh",
          zIndex: 999,
        }}
      />
      <h2
        style={{
          position: "absolute",
          top: "16.5vh",
          left: "6vh",
          fontFamily: "Tsukimi Rounded",
          color: "white",
          zIndex: 999,
        }}
      >
        {now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        })}
      </h2>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          paddingLeft: "4vh",
          paddingRight: "4vh",
          paddingTop: "2vh",
          paddingBottom: "2vh",
          gap: "9vh",
        }}
      >
        {/* left column */}
        <div
          style={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            marginTop: "20.5vh",
            maxWidth: "45vh",
          }}
        >
          <Leaderboard />
        </div>

        {/* middle column */}

        <div
          style={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2vh",
            minWidth: 0,
            pointerEvents: "auto",
          }}
        >
          <Countdown />

          <div
            style={{
              maxWidth: "80vh",
              marginTop: "2vh",
              position: "relative",
              width: "100%",
              height: "71vh",
            }}
          >
            <img
              alt="topbar"
              src={TopBar3}
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                transform: "translate(-51.1%, -10%)",
                width: "116.5%",
                zIndex: 999,
                pointerEvents: "none",
                display: "block",
              }}
            />
            <div
              style={{
                height: "100%",
                width: "100%",
                border: "0.13vh solid #00FF2B",
                background: `
      linear-gradient(180deg, rgba(1, 98, 2, 0.7), rgba(0, 135, 3, 0.38)),
      linear-gradient(to right, rgba(32, 122, 20, 0.6) .3vh, transparent 1px),
      linear-gradient(to bottom, rgba(44, 137, 32, 0.6) .3vh, transparent 1px)
      `,
                // backgroundRepeat: "no-repeat, no-repeat, repeat, repeat",
                backgroundSize: "100% 100%, 25% 25%, 25% 25%",
                // backgroundPosition: "center, center, 0 0, 0 0",
                overflow: "hidden",
                // backdropFilter: "blur(.2vh)",
                // WebkitBackdropFilter: "blur(.2vh)",
              }}
            >
              <div
                style={{
                  marginTop:
                    window.innerWidth / window.innerHeight > 3 / 1.9
                      ? "2vh"
                      : ".8vh",
                  marginRight: "4vh",
                  fontFamily: "Tsukimi Rounded",
                  fontSize: "3vh",
                  fontWeight: 700,
                  color: "#ffffff",
                  textShadow:
                    "0 0 .8vh rgba(0,0,0,0.1), 0 0.1vh 0.2vh rgba(0,0,0,0.8)",
                }}
              >
                UPCOMING EVENTS
              </div>

              <div
                style={{
                  marginTop:
                    window.innerWidth / window.innerHeight > 3 / 1.8
                      ? "7.5vh"
                      : "7vh",
                  marginLeft: "2.8vh",
                }}
              >
                {eventCards.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isLast={index === eventCards.length - 1}
                  />
                ))}
              </div>
            </div>
            <img
              alt="bottombar"
              src={BottomBar3}
              style={{
                position: "absolute",
                left: "50%",
                bottom: 0,
                transform: "translate(-50%, 74%)",
                width: "110%",
                zIndex: 999,
                pointerEvents: "none",
                display: "block",
              }}
            />
          </div>
        </div>
        {/* right column */}
        <div
          style={{
            flex: "0 0 auto",
            //   width: "fit-content",
            display: "grid",
            flexDirection: "row",
            gap: "0vh",
            //   marginTop: "3vh",
          }}
        >
          <TeamLeaderboard />
        </div>
      </div>
      {/* columns end here */}
    </div>
  );
}

export default Dashboard;
