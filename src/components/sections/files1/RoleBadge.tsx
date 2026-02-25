"use client";

import type { SpeakerRole } from "./types";

// ─── RoleBadge ─────────────────────────────────────────────────────────────────
// Shows "Lead Speaker" (host) or "Guest Speaker" (guest) with a pulsing dot.

interface RoleBadgeProps {
  role: SpeakerRole;
  /** "full" = "Lead Speaker" / "Guest Speaker", "short" = "Lead" / "Guest" */
  variant?: "full" | "short";
}

export function RoleBadge({ role, variant = "full" }: RoleBadgeProps) {
  const isHost = role === "host";
  const label =
    variant === "full"
      ? isHost
        ? "Lead Speaker"
        : "Guest Speaker"
      : isHost
      ? "Lead"
      : "Guest";

  return (
    <span
      className={[
        "inline-flex items-center gap-2",
        "text-[0.62rem] tracking-[0.25em] uppercase",
        "transition-all duration-300",
        // host styling
        isHost
          ? "text-[#c9a84c] border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.10)] px-3 py-[5px]"
          : "text-[#00d4ff] border border-[rgba(0,212,255,0.25)] bg-[rgba(0,212,255,0.08)] px-3 py-[5px]",
        variant === "short" ? "px-[9px] py-[3px] text-[0.58rem]" : "",
      ].join(" ")}
    >
      {/* Pulsing dot */}
      <span
        aria-hidden="true"
        className={[
          "w-[5px] h-[5px] rounded-full flex-shrink-0",
          "animate-[pulse_2s_infinite]",
          isHost ? "bg-[#c9a84c]" : "bg-[#00d4ff]",
        ].join(" ")}
      />
      {label}
    </span>
  );
}
