const APIv2 = (process.env.REACT_APP_ADONIX_URL || "https://adonix.hackillinois.org").replace(
    /\/+$/,
    ""
);

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
    eventId?: string;
    isStaff?: boolean;
    isPrivate?: boolean;
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

export type EventAttendeesResponse = {
    eventId: string;
    attendees: string[];
    excusedAttendees: string[];
};

export type ShiftAssignment = {
    userId: string;
    shifts: string[];
};

export type ShiftAssignmentsResponse = {
    assignments: ShiftAssignment[];
};

export type ShiftCandidateUser = {
    userId: string;
    name: string;
    email: string;
};

export type ShiftCandidatesResponse = {
    users: ShiftCandidateUser[];
};

const OMITTED_EVENT_NAMES = new Set(["mentor office hours"]);

function filterOmittedEvents(events: Event[]): Event[] {
    return events.filter((event) => !OMITTED_EVENT_NAMES.has(event.name.trim().toLowerCase()));
}

async function request(endpoint: string, token?: string) {
    const response = await fetch(APIv2 + endpoint, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: token } : {})
        }
    });

    if (!response.ok) {
        throw new Error(`Request failed for ${endpoint}: ${response.status}`);
    }

    return response.json();
};

export function getLeaderboard(): Promise<Profile[]> {
    return request("/profile/leaderboard").then((res) => res.profiles);
}

export function getEvents(): Promise<Event[]> {
    return request("/event").then((res) => filterOmittedEvents(res.events));
}

export function getEventsWithToken(token: string): Promise<Event[]> {
    return request("/event/", token).then((res) => filterOmittedEvents(res.events));
}

export function getStaffEventsWithToken(token: string): Promise<Event[]> {
    return request("/event/staff/", token).then((res) => filterOmittedEvents(res.events));
}

export function getEventAttendeesWithToken(eventId: string, token: string): Promise<EventAttendeesResponse> {
    return request(`/event/attendees/${eventId}/`, token);
}

export function getStaffShiftAssignmentsWithToken(token: string): Promise<ShiftAssignmentsResponse> {
    return request("/staff/shift/all/", token);
}

export function getStaffShiftCandidatesWithToken(token: string): Promise<ShiftCandidatesResponse> {
    return request("/staff/shift/candidates/", token);
}

export function getEventsAuthed(): Promise<Event[]> {
    return request("/event/").then((res) => filterOmittedEvents(res.events));
}

export function getStaffEventsAuthed(): Promise<Event[]> {
    return request("/event/staff/").then((res) => filterOmittedEvents(res.events));
}

export function getEventAttendeesAuthed(eventId: string): Promise<EventAttendeesResponse> {
    return request(`/event/attendees/${eventId}/`);
}

export function getAttendeeTeams(): Promise<AttendeeTeam[]> {
    return request("/attendee-team");
}
