import React, { useState, useEffect, useCallback } from 'react';

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);

    const fetchLeaderboardData = useCallback(async () => {
        setTimeout(() => setLeaderboardData([
            { username: "A$H#1020", points: 1600 },
            { username: "bgrey#912", points: 1600 },
            { username: "bgrey#912", points: 1600 },
            { username: "bgrey#912", points: 1600 },
            { username: "bgrey#912", points: 1600 },
            { username: "bgrey#912", points: 1600 },
            { username: "bgrey#912", points: 1600 },
            { username: "bgrey#912", points: 1600 },
            { username: "bgrey#912", points: 1600 },
            { username: "bgrey#912", points: 1600 },
        ]), 1000 * 3);
    }, [setLeaderboardData]);

    useEffect(() => {
        fetchLeaderboardData();
        const interval = setInterval(() => fetchLeaderboardData(), 1000 * 60);

        return () => clearInterval(interval);
    }, [fetchLeaderboardData]);

    return (
        <div className="leaderboard">
            <div className="leaderboardHeader">Leaderboard</div>
            {leaderboardData.map(({ username, points }, i) => (
                <div key={i} className="leaderboardRow">
                    <span className="rank">{i}</span>
                    <span className="username">{username}</span>
                    <span className="points">{points}</span>
                </div>
            ))}
        </div>
    );
};

export default Leaderboard;
