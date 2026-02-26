import { useMemo } from "react";
import { useLeaderboard } from "./util/useLeaderboard";
import LeaderboardCanvas from "./LeaderboardCanvas";

export default function Leaderboard() {
  const leaderboard = useLeaderboard();
  const players = useMemo(() => (leaderboard ?? []).slice(0, 7), [leaderboard]);

  const backgroundImage = `
    radial-gradient(ellipse 140% 120% at 50% 0%,
      rgba(0, 255, 60, 0.1) 0%,
      rgba(0, 255, 60, 0.12) 35%,
      rgba(0, 255, 60, 0.00) 50%
    ),
    linear-gradient(180deg, rgba(0, 135, 3, 0.38)),
    linear-gradient(to right, rgba(84, 172, 72, 0.20) .3vh, transparent 1px),
    linear-gradient(to bottom, rgba(84, 172, 72, 0.20) .3vh, transparent 1px)
  `;

  return <LeaderboardCanvas players={players} backgroundImage={backgroundImage} />;
}