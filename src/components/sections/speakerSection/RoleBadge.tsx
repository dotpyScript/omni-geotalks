"use client";

import type { SpeakerRole } from "./types";

// ─── RoleBadge ─────────────────────────────────────────────────────────────────
// Shows "Lead Speaker" (host) or "Guest Speaker" (guest) with a pulsing dot.

interface RoleBadgeProps {
  role: SpeakerRole;
  variant?: "full" | "short";
}

export function RoleBadge({ role, variant = "full" }: RoleBadgeProps) {
  const isHost = role === "host";
  const label =
    variant === "full"
      ? isHost ? "Lead Speaker" : "Guest Speaker"
      : isHost ? "Lead" : "Guest";

  return (
    <span
      className={[
        "inline-flex items-center gap-2",
        "text-[0.62rem] tracking-[0.25em] uppercase",
        "transition-all duration-300",
        isHost
          ? "text-(--gold) border border-(--border-mid) bg-(--gold-dim) px-3 py-[5px]"
          : "text-(--cyan) border border-(--cyan-dim) bg-(--cyan-dim) px-3 py-[5px]",
        variant === "short" ? "px-[9px] py-[3px] text-[0.58rem]" : "",
      ].join(" ")}
    >
      {/* Pulsing dot */}
      <span
        aria-hidden="true"
        className={[
          "w-[5px] h-[5px] rounded-full shrink-0",
          "animate-[pulse_2s_infinite]",
          isHost ? "bg-(--gold)" : "bg-(--cyan)",
        ].join(" ")}
      />
      {label}
    </span>
  );
}
