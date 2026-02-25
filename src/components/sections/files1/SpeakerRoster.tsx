"use client";

import type { Speaker } from "./types";
import { RosterItem } from "./RosterItem";

// ─── SpeakerRoster Props ───────────────────────────────────────────────────────

interface SpeakerRosterProps {
  speakers: Speaker[];
  activeId: number;
  onSelect: (id: number) => void;
}

// ─── SpeakerRoster ─────────────────────────────────────────────────────────────
// The scrollable right panel listing all speakers.
// Max height is fixed at 700px on desktop so it aligns with the spotlight panel.
// On mobile it expands to full height (no max-h constraint).

export function SpeakerRoster({ speakers, activeId, onSelect }: SpeakerRosterProps) {
  return (
    <div
      className={[
        "flex flex-col overflow-y-auto",
        // scrollbar styling — thin gold track
        "scrollbar-thin",
        // desktop: fixed max height matching spotlight
        "max-h-[700px]",
        // mobile: unconstrained
        "max-lg:max-h-none",
        // custom thin scrollbar via utility classes
        "[scrollbar-width:thin] [scrollbar-color:rgba(201,168,76,0.14)_transparent]",
        "[&::-webkit-scrollbar]:w-1",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:bg-[rgba(201,168,76,0.14)] [&::-webkit-scrollbar-thumb]:rounded-sm",
      ].join(" ")}
      role="list"
      aria-label="Speaker roster"
    >
      {speakers.map((speaker, index) => (
        <RosterItem
          key={speaker.id}
          speaker={speaker}
          isActive={speaker.id === activeId}
          index={index}
          onClick={() => onSelect(speaker.id)}
        />
      ))}
    </div>
  );
}
