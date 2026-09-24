import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import { SpeakerCard } from "./speaker-card";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "opening-keynote",
    title: "Opening Keynote",
    speaker: "Marta Fernandez",
    track: "Architecture",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 30,
    description: "",
    ...overrides,
  };
}

describe("SpeakerCard", () => {
  it("shows the speaker's name as a level-2 heading", () => {
    render(<SpeakerCard speaker="Marta Fernandez" sessions={[session()]} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Marta Fernandez" }),
    ).toBeInTheDocument();
  });

  it("lists each session's title and start time", () => {
    render(
      <SpeakerCard
        speaker="Marta Fernandez"
        sessions={[
          session({ id: "s1", title: "Opening Keynote", startTime: "09:00" }),
          session({ id: "s2", title: "Closing Remarks", startTime: "17:00" }),
        ]}
      />,
    );

    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("· 09:00")).toBeInTheDocument();
    expect(screen.getByText("Closing Remarks")).toBeInTheDocument();
    expect(screen.getByText("· 17:00")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    render(
      <SpeakerCard
        speaker="Marta Fernandez"
        sessions={[session({ id: "opening-keynote" })]}
      />,
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });
});
