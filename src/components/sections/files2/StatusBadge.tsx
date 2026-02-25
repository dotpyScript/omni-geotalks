"use client";

import type { WebinarStatus } from "./types";

// ─── StatusBadge Props ─────────────────────────────────────────────────────────

interface StatusBadgeProps {
  status: WebinarStatus;
}

// ─── StatusBadge ───────────────────────────────────────────────────────────────
// Renders the top-right badge on each card banner.
// Live + Upcoming get a pulsing dot; Completed shows as a gold tag.

export function StatusBadge({ status }: StatusBadgeProps) {
  const isLive = status === "live";
  const isCompleted = status === "completed";

  const label = isLive ? "Live Now" : isCompleted ? "Recording" : "Upcoming";
  const showPulse = isLive || status === "upcoming";

  const colorClasses = {
    live: "bg-[rgba(0,229,160,0.15)] border border-[rgba(0,229,160,0.35)] text-[#00e5a0]",
    upcoming: "bg-[rgba(0,212,255,0.10)] border border-[rgba(0,212,255,0.28)] text-[#00d4ff]",
    completed: "bg-[rgba(201,168,76,0.10)] border border-[rgba(201,168,76,0.22)] text-[#c9a84c]",
  };

  return (
    <div
      className={[
        "absolute top-[14px] right-[14px] z-[2]",
        "inline-flex items-center gap-[6px]",
        "text-[0.6rem] tracking-[0.22em] uppercase font-medium",
        "font-['DM_Sans',sans-serif]",
        "px-[11px] py-[5px]",
        colorClasses[status],
      ].join(" ")}
    >
      {showPulse && (
        <span
          aria-hidden="true"
          className="w-[5px] h-[5px] rounded-full bg-current animate-[pulse_2s_infinite]"
        />
      )}
      {label}
    </div>
  );
}
