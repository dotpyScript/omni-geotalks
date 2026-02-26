"use client";

import type { Speaker } from "./types";
import { SpeakerAvatar } from "./SpeakerAvatar";
import { RoleBadge } from "./RoleBadge";

// ─── RosterItem Props ──────────────────────────────────────────────────────────

interface RosterItemProps {
  speaker: Speaker;
  isActive: boolean;
  /** 0-based index — used for staggered entrance animation delay */
  index: number;
  onClick: () => void;
}

// ─── RosterItem ────────────────────────────────────────────────────────────────
// A single clickable row in the speaker roster (right panel).
// Features:
//   - Gold left-bar that scales in on hover / active
//   - Padding-left nudge on hover / active
//   - Name / title / org truncation
//   - Role badge (short variant) + session count
//   - Animated › arrow on hover / active

export function RosterItem({ speaker, isActive, index, onClick }: RosterItemProps) {
  // Staggered entrance delay per row (max 8 speakers * 0.05s)
  const delay = `${Math.min(index, 7) * 0.05 + 0.05}s`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      style={{ animationDelay: delay }}
      className={[
        // ── Layout ────────────────────────────────────────────────────────
        "group relative flex items-center gap-5 overflow-hidden cursor-pointer",
        // ── Border ────────────────────────────────────────────────────────
        "border-b border-[rgba(201,168,76,0.14)]",
        // ── Entrance animation ─────────────────────────────────────────────
        "animate-[rosterReveal_0.5s_ease_both]",
        // ── Padding — nudges right on hover/active ─────────────────────────
        "px-9 py-[22px]",
        "transition-[background,padding-left] duration-[250ms]",
        isActive
          ? "pl-[42px] bg-gradient-to-r from-[rgba(201,168,76,0.07)] to-transparent"
          : "hover:pl-[42px] hover:bg-[rgba(201,168,76,0.03)]",
        // mobile
        "max-sm:px-6 max-sm:py-[18px]",
        isActive ? "max-sm:pl-7" : "max-sm:hover:pl-7",
      ].join(" ")}
    >
      {/* Gold left-bar — scales in vertically on hover / active */}
      <span
        aria-hidden="true"
        className={[
          "absolute left-0 top-0 bottom-0 w-[3px]",
          "bg-gradient-to-b from-[#c9a84c] to-transparent",
          "origin-top transition-transform duration-300",
          isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100",
        ].join(" ")}
      />

      {/* Avatar */}
      <SpeakerAvatar initials={speaker.initials} size="sm" active={isActive} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div
          className={[
            "font-['Cormorant_Garamond',serif] font-normal text-[1.05rem]",
            "whitespace-nowrap overflow-hidden text-ellipsis mb-[3px]",
            "transition-colors duration-[250ms]",
            isActive
              ? "text-[#f5e6c0]"
              : "text-[#f0ede6] group-hover:text-[#f5e6c0]",
          ].join(" ")}
        >
          {speaker.name}
        </div>
        <div className="text-[0.68rem] text-[rgba(240,237,230,0.28)] font-light whitespace-nowrap overflow-hidden text-ellipsis tracking-[0.03em] mb-[2px]">
          {speaker.title}
        </div>
        <div
          className={[
            "text-[0.62rem] tracking-[0.12em] uppercase text-[#c9a84c]",
            "whitespace-nowrap overflow-hidden text-ellipsis",
            "transition-opacity duration-[250ms]",
            isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100",
          ].join(" ")}
        >
          {speaker.org}
        </div>
      </div>

      {/* Right meta */}
      <div className="flex flex-col items-end gap-[6px] flex-shrink-0">
        <RoleBadge role={speaker.role} variant="short" />
        <span className="text-[0.6rem] tracking-[0.1em] text-[rgba(240,237,230,0.28)] flex items-center gap-[5px]">
          {/* Diamond bullet */}
          <span aria-hidden="true" className="text-[#c9a84c] text-[0.55rem]">◈</span>
          {speaker.webinars} sessions
        </span>
      </div>

      {/* Animated arrow */}
      <span
        aria-hidden="true"
        className={[
          "text-[0.8rem] text-[#c9a84c] flex-shrink-0",
          "transition-[opacity,transform] duration-[200ms]",
          isActive
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-[6px] group-hover:opacity-100 group-hover:translate-x-0",
        ].join(" ")}
      >
        ›
      </span>
    </div>
  );
}
