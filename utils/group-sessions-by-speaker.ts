import type { Session } from "@/types/session";

export interface SpeakerSessions {
  speaker: string;
  sessions: Session[];
}

/**
 * The closing panel's speaker field is a placeholder for "everyone from the
 * day", not an actual person — it must never show up as its own speaker card.
 */
const EXCLUDED_SPEAKERS = ["Full speaker lineup"];

/**
 * Groups sessions by speaker name and sorts speakers alphabetically. Each
 * speaker's own sessions keep the order they arrive in (fetchSessions()
 * already orders by start time, so this stays chronological per speaker).
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (EXCLUDED_SPEAKERS.includes(session.speaker)) continue;

    const existing = bySpeaker.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      bySpeaker.set(session.speaker, [session]);
    }
  }

  return Array.from(bySpeaker, ([speaker, speakerSessions]) => ({
    speaker,
    sessions: speakerSessions,
  })).sort((a, b) => a.speaker.localeCompare(b.speaker));
}
