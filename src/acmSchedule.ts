export type AcmItem = {
  id: string;
  dayKey: string;
  start: Date;
  end: Date;
  title: string;
  location?: string;
  needed?: number;
  lead?: string;
  staff?: string;
  backup?: string;
};

type RawItem = {
  dayKey: string;
  start: string;
  end: string;
  title: string;
  location?: string;
  needed?: number;
  lead?: string;
  staff?: string;
  backup?: string;
};

const rawItems: RawItem[] = [
  { dayKey: "2026-02-27", start: "2:00PM", end: "5:00PM", title: "Open Help Desk + Setup MLH Help Desk 1 (swag)", needed: 4, lead: "Zoeya", staff: "Mini, Eric, Anushree" },
  { dayKey: "2026-02-27", start: "2:00PM", end: "5:00PM", title: "Help Desk + Attendee Check-In", needed: 4, lead: "Aditya", staff: "Shreepad, Ananya, Timothy" },
  { dayKey: "2026-02-27", start: "2:00PM", end: "5:00PM", title: "ACM Front Room Systems Debugging", lead: "Yash", staff: "Sherry, Miguel, Yaseen" },
  { dayKey: "2026-02-27", start: "2:30PM", end: "4:30PM", title: "Scavenger Hunt", needed: 2, lead: "Zoeya", staff: "XP Events team" },
  { dayKey: "2026-02-27", start: "3:00PM", end: "5:00PM", title: "Company Expo", needed: 3, lead: "Akul, Aryan", staff: "Outreach team" },
  { dayKey: "2026-02-27", start: "5:00PM", end: "6:00PM", title: "Opening Ceremony", needed: 54, lead: "Full Staff" },
  { dayKey: "2026-02-27", start: "5:30PM", end: "7:30PM", title: "Dinner", needed: 6, lead: "Shreenija", staff: "Rohan, Lisa, Benji, Jasmine, Eric", backup: "Anshi" },
  { dayKey: "2026-02-27", start: "6:00PM", end: "8:00PM", title: "Help Desk + Setup MLH Help Desk 2 (hardware)", needed: 4, lead: "Advita", staff: "Grace, Ritsika, Katrina" },
  { dayKey: "2026-02-27", start: "6:00PM", end: "7:30PM", title: "RSO Expo", needed: 2, lead: "Lily", staff: "Marketing team" },
  { dayKey: "2026-02-27", start: "7:30PM", end: "8:30PM", title: "All Track Intros", needed: 3, lead: "Akul, Aryan", staff: "Outreach team" },
  { dayKey: "2026-02-27", start: "8:00PM", end: "10:00PM", title: "Help Desk", needed: 4, lead: "Miguel", staff: "Prachod, Richard, Megh" },
  { dayKey: "2026-02-27", start: "8:30PM", end: "9:30PM", title: "Team Matching", needed: 2, lead: "Ethan", staff: "Anushree" },
  { dayKey: "2026-02-27", start: "8:30PM", end: "10:00PM", title: "Project Ideation", needed: 5, lead: "Akul, Aryan", staff: "Rohan, Nikhil, Shreenija" },
  { dayKey: "2026-02-27", start: "8:30PM", end: "9:30PM", title: "Set Up SCD Help Desk", lead: "Rohan", staff: "Eric" },
  { dayKey: "2026-02-27", start: "9:30PM", end: "10:00PM", title: "Side Quest #1", needed: 2, lead: "Anushree", staff: "Benji" },
  { dayKey: "2026-02-27", start: "10:00PM", end: "12:00AM", title: "Help Desk", needed: 4, lead: "Rachel", staff: "Nikhil, Megh, Cindy" },
  { dayKey: "2026-02-27", start: "10:00PM", end: "11:00PM", title: "Deployment Workshop w/ WCS", needed: 2, lead: "Mia", staff: "Ari" },
  { dayKey: "2026-02-27", start: "10:00PM", end: "10:30PM", title: "MLH GitHub Workshop", needed: 1, lead: "Timothy" },
  { dayKey: "2026-02-27", start: "10:30PM", end: "11:30PM", title: "Telora Workshop", needed: 2, lead: "Arvand", staff: "Advita" },
  { dayKey: "2026-02-27", start: "11:00PM", end: "1:00AM", title: "IMC Poker Tournament", needed: 4, lead: "Yash", staff: "Aryan, Alex, 3 from GTO Illini" },
  { dayKey: "2026-02-27", start: "11:00PM", end: "1:00AM", title: "Quiet Workspace", needed: 2, lead: "Zoeya", staff: "Mini" },
  { dayKey: "2026-02-27", start: "11:30PM", end: "12:30AM", title: "Telora Interviews", needed: 0 },
  { dayKey: "2026-02-27", start: "11:00PM", end: "1:00AM", title: "Transition to SCD 1", needed: 4, lead: "Akul", staff: "Ronit (12:35), Alex (12:45), Nikhil (12:55)" },
  { dayKey: "2026-02-27", start: "12:00AM", end: "2:00AM", title: "Help Desk", needed: 3, lead: "Sherry", staff: "Ari, Cindy" },
  { dayKey: "2026-02-27", start: "12:00AM", end: "12:30AM", title: "Midnight Snacks", needed: 1, lead: "Shreenija" },
  { dayKey: "2026-02-27", start: "1:00AM", end: "3:00AM", title: "Transition to SCD 2", needed: 5, staff: "Aryan (1:05), Megh (1:15), Ananya (1:25), Kevin (1:45), Anushree (2:00)" },
  { dayKey: "2026-02-27", start: "1:00AM", end: "7:00AM", title: "SCD Overnight", needed: 5, lead: "Aryan", staff: "Alex, Megh, Anushree, Kevin" },

  { dayKey: "2026-02-28", start: "8:00AM", end: "10:00AM", title: "Help Desk", needed: 1, staff: "Shreepad" },
  { dayKey: "2026-02-28", start: "8:00AM", end: "9:30AM", title: "Transition from SCD", needed: 4, lead: "Lily", staff: "Jacob (8:00), Prachod (8:30), Benji (9:00)" },
  { dayKey: "2026-02-28", start: "9:00AM", end: "9:30AM", title: "Side Quest #2", needed: 1, lead: "Lucy" },
  { dayKey: "2026-02-28", start: "10:00AM", end: "12:00PM", title: "Help Desk", needed: 3, lead: "Miguel", staff: "Leqi, Megan" },
  { dayKey: "2026-02-28", start: "10:00AM", end: "10:30AM", title: "Side Quest #3", needed: 0 },
  { dayKey: "2026-02-28", start: "10:00AM", end: "10:30AM", title: "OpenAI", needed: 2, lead: "Shreenija", staff: "Aydan" },
  { dayKey: "2026-02-28", start: "10:30AM", end: "12:30PM", title: "Brunch", needed: 4, lead: "Shreenija", staff: "Michelle H, Rohan, Lisa", backup: "Nikhita, Ann" },
  { dayKey: "2026-02-28", start: "11:00AM", end: "11:30AM", title: "Side Quest #4", needed: 1, lead: "Arvand" },
  { dayKey: "2026-02-28", start: "12:00PM", end: "2:00PM", title: "Help Desk", needed: 3, lead: "Aditya", staff: "Ritsika, Jasmine" },
  { dayKey: "2026-02-28", start: "12:00PM", end: "1:00PM", title: "Solana Event", needed: 2, lead: "Akul", staff: "Yaseen" },
  { dayKey: "2026-02-28", start: "1:00PM", end: "2:00PM", title: "Cosmic Challenge (CTF)", needed: 3, lead: "Ethan", staff: "Sherry, Rohan" },
  { dayKey: "2026-02-28", start: "1:00PM", end: "1:30PM", title: "Side Quest #5", needed: 0 },
  { dayKey: "2026-02-28", start: "2:00PM", end: "3:00PM", title: "Fulcrum Event", needed: 3, lead: "Akul, Aryan", staff: "Nikhil" },
  { dayKey: "2026-02-28", start: "2:00PM", end: "4:00PM", title: "Help Desk", needed: 3, lead: "Sherry", staff: "Quinten, Michelle H" },
  { dayKey: "2026-02-28", start: "2:30PM", end: "3:00PM", title: "Side Quest #6", needed: 0 },
  { dayKey: "2026-02-28", start: "3:00PM", end: "4:00PM", title: "IMC Talk", needed: 2, lead: "Nathan", staff: "Bill" },
  { dayKey: "2026-02-28", start: "4:00PM", end: "6:00PM", title: "Help Desk", needed: 3, lead: "Grace", staff: "Richard, Aydan" },
  { dayKey: "2026-02-28", start: "4:00PM", end: "5:00PM", title: "Mentor-Judge Social", needed: 1, lead: "Lisa" },
  { dayKey: "2026-02-28", start: "4:00PM", end: "5:00PM", title: "T-Mobile Event", needed: 1, lead: "Nathan" },
  { dayKey: "2026-02-28", start: "5:00PM", end: "7:00PM", title: "Astral Exhibition (+ Flash Mob)", needed: 3, lead: "Zoeya", staff: "Events team + as many flash mob staff as possible" },
  { dayKey: "2026-02-28", start: "5:00PM", end: "6:00PM", title: "CapitalOne Talk", needed: 2, lead: "Naomi", staff: "Yaseen" },
  { dayKey: "2026-02-28", start: "6:00PM", end: "8:00PM", title: "Help Desk", needed: 3, lead: "Naomi", staff: "Milana, Mia" },
  { dayKey: "2026-02-28", start: "6:00PM", end: "8:00PM", title: "Dinner", needed: 5, lead: "Shreenija", staff: "Lisa, Rohan, Benji, Jenica", backup: "Hela, Nikhita" },
  { dayKey: "2026-02-28", start: "8:00PM", end: "10:00PM", title: "Help Desk", needed: 2, lead: "Bill", staff: "Jenica" },
  { dayKey: "2026-02-28", start: "8:00PM", end: "8:30PM", title: "Endeavor AI Talk", needed: 2, lead: "Akul, Aryan" },
  { dayKey: "2026-02-28", start: "8:00PM", end: "9:00PM", title: "MLH Tech Together Meetup", needed: 1, lead: "Arwa" },
  { dayKey: "2026-02-28", start: "8:00PM", end: "9:00PM", title: "Cory Levy Fireside Chat", needed: 1, lead: "Aryan" },
  { dayKey: "2026-02-28", start: "9:00PM", end: "10:00PM", title: "Code in the Dark", needed: 3, lead: "Akul", staff: "Megan, Jacob" },
  { dayKey: "2026-02-28", start: "10:00PM", end: "12:00AM", title: "Help Desk", needed: 2, lead: "Rachel", staff: "Aditya" },
  { dayKey: "2026-02-28", start: "10:00PM", end: "10:30PM", title: "Side Quest #7", needed: 0 },
  { dayKey: "2026-02-28", start: "10:30PM", end: "11:30PM", title: "Late Night Snacks", needed: 1, lead: "Aryan" },
  { dayKey: "2026-02-28", start: "10:30PM", end: "11:30PM", title: "Clash Royale Tournament", needed: 2, lead: "Prachod (MC)", staff: "Megh" },
  { dayKey: "2026-02-28", start: "11:00PM", end: "1:00AM", title: "Transition to SCD 1", needed: 5, lead: "Zoeya", staff: "Kyle (12:25), Nathan (12:35), Yash (12:45), Yaseen (12:55)" },
  { dayKey: "2026-02-28", start: "11:30PM", end: "12:00AM", title: "Side Quest #8", needed: 0 },
  { dayKey: "2026-02-28", start: "12:00AM", end: "1:00AM", title: "Help Desk", needed: 2, lead: "Akul", staff: "Arwa" },
  { dayKey: "2026-02-28", start: "1:00AM", end: "3:00AM", title: "Transition to SCD 2", needed: 5, staff: "Shreepad (1:05), Mia (1:15), Prachod (1:25), TBD (1:45), Rachel (2:00)" },
  { dayKey: "2026-02-28", start: "1:00AM", end: "7:00AM", title: "SCD Overnight", needed: 4, lead: "Kyle, Rachel", staff: "Michelle K, Advita" },

  { dayKey: "2026-03-01", start: "7:00AM", end: "9:00AM", title: "SCD Help Desk", needed: 1, lead: "Benji" },
  { dayKey: "2026-03-01", start: "7:00AM", end: "9:30AM", title: "Transition from SCD", needed: 3, lead: "Lily", staff: "Miguel, Katrina" },
  { dayKey: "2026-03-01", start: "7:30AM", end: "8:00AM", title: "Judge Check-In", needed: 1, lead: "Shreenija" },
  { dayKey: "2026-03-01", start: "8:00AM", end: "9:00AM", title: "Judge Orientation", needed: 1, lead: "Shreenija" },
  { dayKey: "2026-03-01", start: "8:30AM", end: "9:00AM", title: "Side Quest #9", needed: 0 },
  { dayKey: "2026-03-01", start: "9:00AM", end: "11:00AM", title: "Help Desk", needed: 3, lead: "Mia", staff: "Mini, Quinten" },
  { dayKey: "2026-03-01", start: "9:00AM", end: "11:30AM", title: "Project Showcase", needed: 0 },
  { dayKey: "2026-03-01", start: "11:00AM", end: "1:00PM", title: "Help Desk", needed: 3, lead: "Timothy", staff: "Milana, Leqi" },
  { dayKey: "2026-03-01", start: "11:30AM", end: "12:30PM", title: "Lunch (Attendees)", needed: 2, lead: "Akul", staff: "Prachod", backup: "Ann" },
  { dayKey: "2026-03-01", start: "11:30AM", end: "12:00PM", title: "Lunch (Judges)", needed: 2, lead: "Shreenija", staff: "Rohan" },
  { dayKey: "2026-03-01", start: "12:00PM", end: "1:30PM", title: "Judge Deliberation (Science Fair)", needed: 3, lead: "Aryan", staff: "Cindy, Ari" },
  { dayKey: "2026-03-01", start: "12:30PM", end: "1:30PM", title: "Shark Tank", needed: 0 },
  { dayKey: "2026-03-01", start: "1:00PM", end: "2:00PM", title: "Help Desk", needed: 2, lead: "Akul", staff: "Advita" },
  { dayKey: "2026-03-01", start: "1:00PM", end: "1:30PM", title: "Side Quest #10", needed: 0 },
  { dayKey: "2026-03-01", start: "2:00PM", end: "3:00PM", title: "Closing Ceremonies", needed: 54, lead: "Full Staff" },
  { dayKey: "2026-03-01", start: "3:00PM", end: "3:30PM", title: "Help Desk + Raffle Prize Distribution", needed: 0 }
];

function parseDay(dayKey: string): { year: number; month: number; day: number } {
  const [year, month, day] = dayKey.split("-").map(Number);
  return { year, month, day };
}

function parseTimeMinutes(time: string): number {
  const normalized = time.replace(/\s+/g, "").toUpperCase();
  const match = normalized.match(/^(\d{1,2}):(\d{2})(AM|PM)$/);
  if (!match) {
    throw new Error(`Invalid time: ${time}`);
  }

  const rawHour = Number(match[1]);
  const minute = Number(match[2]);
  const period = match[3];

  let hour = rawHour % 12;
  if (period === "PM") {
    hour += 12;
  }

  return hour * 60 + minute;
}

function buildDate(dayKey: string, minutes: number, plusDays = 0): Date {
  const { year, month, day } = parseDay(dayKey);
  return new Date(year, month - 1, day + plusDays, 0, minutes, 0, 0);
}

const lateNightDayKeys = new Set(
  rawItems
    .filter((item) => parseTimeMinutes(item.start) >= 18 * 60)
    .map((item) => item.dayKey)
);

function toAcmItem(item: RawItem, index: number): AcmItem {
  const startMin = parseTimeMinutes(item.start);
  const endMin = parseTimeMinutes(item.end);
  const startCarryDay = lateNightDayKeys.has(item.dayKey) && startMin < 8 * 60 ? 1 : 0;
  const endCarryDay = startCarryDay + (endMin <= startMin ? 1 : 0);

  return {
    id: `${item.dayKey}-${index}`,
    dayKey: item.dayKey,
    start: buildDate(item.dayKey, startMin, startCarryDay),
    end: buildDate(item.dayKey, endMin, endCarryDay),
    title: item.title,
    location: item.location,
    needed: item.needed,
    lead: item.lead,
    staff: item.staff,
    backup: item.backup
  };
}

export const acmSchedule: AcmItem[] = rawItems
  .map(toAcmItem)
  .sort((a, b) => a.start.getTime() - b.start.getTime());
