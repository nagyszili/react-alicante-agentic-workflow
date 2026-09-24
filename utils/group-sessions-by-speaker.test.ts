import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./group-sessions-by-speaker";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups sessions under their speaker", () => {
    const grouped = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Marta Fernandez" }),
      session({ id: "s2", speaker: "Iker Otxoa" }),
      session({ id: "s3", speaker: "Marta Fernandez" }),
    ]);

    expect(grouped).toEqual([
      {
        speaker: "Iker Otxoa",
        sessions: [session({ id: "s2", speaker: "Iker Otxoa" })],
      },
      {
        speaker: "Marta Fernandez",
        sessions: [
          session({ id: "s1", speaker: "Marta Fernandez" }),
          session({ id: "s3", speaker: "Marta Fernandez" }),
        ],
      },
    ]);
  });

  it("sorts speakers alphabetically regardless of input order", () => {
    const grouped = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Sofia Almeida" }),
      session({ id: "s2", speaker: "Diego Castellanos" }),
    ]);

    expect(grouped.map((entry) => entry.speaker)).toEqual([
      "Diego Castellanos",
      "Sofia Almeida",
    ]);
  });

  it("keeps a speaker's own sessions in the order they arrive", () => {
    const grouped = groupSessionsBySpeaker([
      session({ id: "later", speaker: "Marta Fernandez", startTime: "14:00" }),
      session({
        id: "earlier",
        speaker: "Marta Fernandez",
        startTime: "09:00",
      }),
    ]);

    expect(grouped[0].sessions.map((s) => s.id)).toEqual(["later", "earlier"]);
  });

  it("excludes the closing panel's placeholder speaker", () => {
    const grouped = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Marta Fernandez" }),
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
    ]);

    expect(grouped).toEqual([
      {
        speaker: "Marta Fernandez",
        sessions: [session({ id: "s1", speaker: "Marta Fernandez" })],
      },
    ]);
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
