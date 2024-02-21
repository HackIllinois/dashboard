const APIv2 = "https://adonix.hackillinois.org";

export type Profile = {
    displayName: string;
    points: number;
}

async function request(endpoint: string) {
    const response = await fetch(APIv2 + endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.json();
};

export function getLeaderboard(): Promise<Profile[]> {
    return request("/profile/leaderboard").then((res) => res.profiles);
}