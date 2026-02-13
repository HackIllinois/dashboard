const APIv2 = "https://adonix.hackillinois.org";

export type Profile = {
    displayName: string;
    points: number;
    avatarUrl: string;
}

export type AttendeeTeam = {
    id: string;
    name: string;
    points: number;
    members: number;
}

export interface Event {
    id: string;
    name: string;
    description: string;
    isAsync?: boolean;
    startTime: number;
    endTime: number;
    locations: {
        description: string;
        tags: string[];
        latitude: number;
        longitude: number;
    }[];
    sponsor?: string;
    eventType: string;
    points: number;
    isPro: boolean;
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

export function getEvents(): Promise<Event[]> {
    return request("/event").then((res) => res.events);
}

export function getAttendeeTeams(): Promise<AttendeeTeam[]> {
    return request("/attendee-team").then((res) => res.teams);
}