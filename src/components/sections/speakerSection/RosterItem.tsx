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

export function RosterItem({ speaker, isActive, index, onClick }: RosterItemProps) {
  const delay = `${Math.min(index, 7) * 0.05 + 0.05}s`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      style={{
        animationDelay: delay,
        // Theme-aware active gradient using CSS vars
        background: isActive
          ? "linear-gradient(to right, var(--gold-dim), transparent)"
          : undefined,
      }}
      className={[
        "group relative flex items-center gap-5 overflow-hidden cursor-pointer",
        "border-b border-(--border)",
        "animate-[rosterReveal_0.5s_ease_both]",
        "px-9 py-[22px]",
        "transition-[background,padding-left,box-shadow] duration-250",
        isActive
          ? "pl-[42px]"
          : "hover:pl-[42px] hover:bg-(--gold-dim)/30",
        "hover:shadow-[0_4px_24px_var(--gold-dim)]",
        "max-sm:px-6 max-sm:py-[18px]",
        isActive ? "max-sm:pl-7" : "max-sm:hover:pl-7",
      ].join(" ")}
    >
      {/* Gold left-bar */}
      <span
        aria-hidden="true"
        className={[
          "absolute left-0 top-0 bottom-0 w-[3px]",
          "bg-linear-to-b from-(--gold) to-transparent",
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
            "font-cormorant font-normal text-[1.05rem]",
            "whitespace-nowrap overflow-hidden text-ellipsis mb-[3px]",
            "transition-colors duration-250",
            isActive
              ? "text-(--gold-pale)"
              : "text-(--ivory) group-hover:text-(--gold-pale)",
          ].join(" ")}
        >
          {speaker.name}
        </div>
        <div className="text-[0.68rem] text-(--ivory-muted) font-light whitespace-nowrap overflow-hidden text-ellipsis tracking-[0.03em] mb-[2px]">
          {speaker.title}
        </div>
        <div
          className={[
            "text-[0.62rem] tracking-[0.12em] uppercase text-(--gold)",
            "whitespace-nowrap overflow-hidden text-ellipsis",
            "transition-opacity duration-250",
            isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100",
          ].join(" ")}
        >
          {speaker.org}
        </div>
      </div>

      {/* Right meta */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <RoleBadge role={speaker.role} variant="short" />
        <span className="text-[0.6rem] tracking-[0.1em] text-(--ivory-muted) flex items-center gap-[5px]">
          <span aria-hidden="true" className="text-(--gold) text-[0.55rem]">◈</span>
          {speaker.webinars} sessions
        </span>
      </div>

      {/* Animated arrow */}
      <span
        aria-hidden="true"
        className={[
          "text-[0.8rem] text-(--gold) flex-shrink-0",
          "transition-[opacity,transform] duration-200",
          isActive
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0",
        ].join(" ")}
      >
        ›
      </span>
    </div>
  );
}
