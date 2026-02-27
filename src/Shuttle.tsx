import fridayNight from "./util/fridayNight.json";
import saturdayMorning from "./util/saturdayMorning.json";
import saturdayNight from "./util/saturdayNight.json";
import sundayMorning from "./util/sundayMorning.json";
import logo from "./assets/logo2.svg";
import { useTime } from "./util/useTime";
import fulcrumgt from "./assets/fulcrumgt.svg";

type Row = {
  buildingExitTime: string;
  busPickupTime: string;
  busPickupLocation: string;
  busDropoffTime: string;
  busDropoffLocation: string;
};

const columns: { key: keyof Row; label: string }[] = [
  { key: "buildingExitTime", label: "Building Exit Time" },
  { key: "busPickupTime", label: "Bus Pickup Time" },
  { key: "busPickupLocation", label: "Bus Pickup Location" },
  { key: "busDropoffTime", label: "Bus Dropoff Time" },
  { key: "busDropoffLocation", label: "Bus Dropoff Location" },
];

function Shuttle() {
  const { now } = useTime();

  function pickSchedule(now: Date): Row[] {
    const day = now.getDay(); // 0=Sun, 5=Fri, 6=Sat
    const m = now.getHours() * 60 + now.getMinutes();

    const SAT_3AM = 3 * 60; // 03:00
    const SAT_10AM = 10 * 60; // 10:00
    const SUN_230AM = 2 * 60 + 30; // 02:30

    // Friday: always fridayNight
    if (day === 5) return fridayNight as Row[];

    // Saturday:
    // 12:00am–2:59am -> fridayNight
    // 3:00am–9:59am  -> saturdayMorning
    // 10:00am–11:59pm -> saturdayNight
    if (day === 6) {
      if (m < SAT_3AM) return fridayNight as Row[];
      if (m < SAT_10AM) return saturdayMorning as Row[];
      return saturdayNight as Row[];
    }

    // Sunday:
    // 12:00am–2:29am -> saturdayNight
    // 2:30am+        -> sundayMorning
    if (day === 0) {
      if (m < SUN_230AM) return saturdayNight as Row[];
      return sundayMorning as Row[];
    }

    // Fallback schedule
    return sundayMorning as Row[];
  }

  const rows = pickSchedule(now);

  const gridCols = "1.3fr 1.2fr 2.4fr 1.3fr 2.0fr";

  return (
    <div
      className="Shuttle"
      style={{
        textAlign: "center",
        overflow: "hidden",
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        margin: "0px",
        padding: "0px",
        fontSize: "2vh",
        backgroundColor: "black",
        position: "relative",
      }}
    >
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
          top: "4vh",
          right: "6vh",
          fontFamily: "Tsukimi Rounded",
          color: "white",
          zIndex: 999,
          textShadow: "0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)",
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "2vh",
          position: "absolute",
          top: "4vh",
          left: "70vh",
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
            zIndex: 2,
            height: "5vh",
            pointerEvents: "none",
            marginTop: "1vh",
            marginLeft: "-1.5vh",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "15vh",
        }}
      >
        <div
          style={{
            width: "min(175vh, 94vw)",
            overflow: "hidden",
            borderRadius: "3vh",
            border: "0.13vh solid #00FF2B",
            backdropFilter: "blur(1.5vh)",
            //     backgroundImage:`
            //      radial-gradient(ellipse 140% 120% at 50% 0%,
            //   rgba(0, 255, 60, 0.23) 0%,
            //   rgba(0, 255, 60, 0.12) 35%,
            //   rgba(0, 255, 60, 0.00) 50%
            // ),
            // linear-gradient(180deg,
            //   rgba(0, 135, 3, 0.38)
            // ),
            //   linear-gradient(to right, rgba(84, 172, 72, 0.20) 3px, transparent 1px),
            //     linear-gradient(to bottom, rgba(84, 172, 72, 0.20) 3px, transparent 1px)`
            backgroundColor: "rgba(1, 98, 2, 0.7)",
            // backgroundRepeat: "no-repeat, no-repeat, repeat, repeat",
            backgroundSize: "100% 100%, 25% 25%, 25% 25%",
          }}
        >
          {/* column names */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridCols,
              padding: "1.6vh 2vh",
              background: "rgba(255,255,255,0.10)",
              borderBottom: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            {columns.map((c) => (
              <div
                key={c.key}
                style={{
                  color: "#DDFFE4",
                  fontWeight: 800,
                  fontSize: "2vh",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontFamily: "Tsukimi Rounded",
                  textShadow:
                    "0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>

          {/* rows */}
          <div>
            {rows.map((r, i) => (
              <div
                key={`${r.buildingExitTime}-${i}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: gridCols,
                  padding: "1.5vh 2vh",
                  borderBottom: "1px solid rgba(255,255,255,0.10)",
                  background:
                    i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
                }}
              >
                <Cell>{r.buildingExitTime}</Cell>
                <Cell>{r.busPickupTime}</Cell>
                <Cell>{r.busPickupLocation}</Cell>
                <Cell>{r.busDropoffTime}</Cell>
                <Cell>{r.busDropoffLocation}</Cell>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shuttle;

function Cell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        color: "white",
        fontSize: "2.2vh",
        textAlign: "left",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontFamily: "Tsukimi Rounded",
        fontWeight: 600,
        textShadow: "0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)",
      }}
    >
      {children}
    </div>
  );
}
