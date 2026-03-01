import hackastra from "./assets/hackastra.svg";
import fulcrumgt from "./assets/fulcrumgt.svg";

function Launch() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <img
        alt="hackastra"
        src={hackastra}
        style={{
          zIndex: 2,
          width: "115vh",
          pointerEvents: "none",
          marginTop: "30vh",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "2vh",
          marginTop: "1.5vh",
        }}
      >
        <div
          style={{
            color: "white",
            fontFamily: "Tsukimi Rounded",
            fontWeight: 700,
            textShadow: "0 3px 6.239px #0D084D",
            fontSize: "4.75vh",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          POWERED BY
        </div>

        <img
          alt="fulcrumgt"
          src={fulcrumgt}
          style={{
            zIndex: 2,
            height: "10vh",
            width: "auto",
            pointerEvents: "none",
            display: "block",
            marginTop: "2vh",
            marginLeft: "-1vh",
          }}
        />
      </div>
    </div>
  );
}

export default Launch;
