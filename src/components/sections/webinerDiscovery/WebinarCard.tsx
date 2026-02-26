"use client";

import type { Webinar } from "./types";
import { CATEGORIES } from "./data";
import { BannerPlaceholder } from "./BannerPlaceholder";
import { StatusBadge } from "./StatusBadge";

// ─── WebinarCard Props ─────────────────────────────────────────────────────────

interface WebinarCardProps {
  webinar: Webinar;
  /** When true, renders in horizontal list layout */
  listView?: boolean;
  /** 0-based position index — used for staggered entrance animation */
  index: number;
  /** Click handler */
  onClick?: (id: number) => void;
}

// ─── WebinarCard ───────────────────────────────────────────────────────────────
// Renders one webinar entry. Supports two visual variants:
//   - Grid view (default): vertical card with full banner + description
//   - List view: horizontal row, banner on left, no description shown
//
// Hover effects:
//   - Card lifts (-translateY-5px) with gold glow shadow
//   - Gold top-bar fades in (opacity 0 → 1)
//   - Banner image / placeholder scales up (scale-[1.04])
//   - Title colour shifts to gold-pale

export function WebinarCard({ webinar, listView = false, index, onClick }: WebinarCardProps) {
  const catLabel = CATEGORIES.find((c) => c.id === webinar.category)?.label ?? webinar.category;
  const isCompleted = webinar.status === "completed";
  const isLive = webinar.status === "live";

  // Stagger delay per card index (capped at 9 × 0.05s)
  const delay = `${Math.min(index, 8) * 0.05 + 0.05}s`;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(webinar.id)}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(webinar.id)}
      style={{ animationDelay: delay }}
      className={[
        // ── Base ─────────────────────────────────────────────────────────
        "group relative overflow-hidden cursor-pointer flex flex-col",
        "bg-gradient-to-br from-[#0d1118] to-[#12161f]",
        "border border-[rgba(201,168,76,0.14)]",
        // ── Hover ────────────────────────────────────────────────────────
        "hover:-translate-y-[5px] hover:border-[rgba(201,168,76,0.28)]",
        "hover:shadow-[0_8px_40px_rgba(201,168,76,0.18)]",
        // ── Transition ───────────────────────────────────────────────────
        "transition-[transform,border-color,box-shadow] duration-300 ease-in-out",
        // ── Entrance animation ────────────────────────────────────────────
        "animate-[cardReveal_0.5s_ease_both]",
        // ── List view layout overrides ────────────────────────────────────
        listView ? "flex-row max-h-[160px] max-md:flex-col max-md:max-h-none" : "",
      ].join(" ")}
    >
      {/* ── Gold top-bar (fades in on hover) ────────────────────────────── */}
      <span
        aria-hidden="true"
        className={[
          "absolute top-0 left-0 right-0 h-[2px] z-10",
          "bg-gradient-to-r from-[#c9a84c] to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        ].join(" ")}
      />

      {/* ── Banner area ──────────────────────────────────────────────────── */}
      <div
        className={[
          "relative overflow-hidden flex-shrink-0 bg-[#181d28]",
          listView
            ? "w-[220px] min-h-[160px] max-md:w-full max-md:min-h-0 max-md:pt-[50%]"
            : "w-full pt-[52%]",
        ].join(" ")}
      >
        {/* Placeholder artwork — scales on card hover */}
        <div className="absolute inset-0 transition-transform duration-[500ms] ease-in-out group-hover:scale-[1.04]">
          <BannerPlaceholder index={webinar.banner} />
        </div>

        {/* Bottom fade-to-card gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{
            background: "linear-gradient(180deg, transparent 40%, #0d1118 100%)",
          }}
        />

        {/* Status badge */}
        <StatusBadge status={webinar.status} />

        {/* Category badge */}
        <div
          className={[
            "absolute bottom-[14px] left-[14px] z-[2]",
            "text-[0.6rem] tracking-[0.2em] uppercase",
            "px-[10px] py-1",
            "font-['DM_Sans',sans-serif]",
            "bg-[rgba(8,10,15,0.75)] border border-[rgba(201,168,76,0.28)]",
            "text-[#e8c97e] backdrop-blur-[6px]",
          ].join(" ")}
        >
          {catLabel}
        </div>
      </div>

      {/* ── Card body ────────────────────────────────────────────────────── */}
      <div
        className={[
          "flex flex-col flex-1",
          "px-6 pt-6 pb-5",
          listView ? "flex-row items-center gap-6 max-md:flex-col" : "",
        ].join(" ")}
      >
        {/* Date + duration row */}
        <div className={["flex items-center gap-4 mb-[14px]", listView ? "hidden" : ""].join(" ")}>
          <span className="text-[0.68rem] tracking-[0.12em] uppercase text-[#c9a84c] font-normal">
            {isCompleted ? "✓ " : "◷ "}
            {webinar.date} · {webinar.time}
          </span>
          <span className="text-[0.65rem] text-[rgba(240,237,230,0.28)] tracking-[0.06em]">
            {webinar.duration}
          </span>
        </div>

        {/* Title */}
        <h3
          className={[
            "font-['Cormorant_Garamond',serif] font-normal leading-[1.3]",
            "text-[#f0ede6] mb-3 transition-colors duration-[250ms]",
            "group-hover:text-[#f5e6c0]",
            listView ? "text-[1.1rem] mb-0 flex-1" : "text-[1.25rem]",
          ].join(" ")}
        >
          {webinar.title}
        </h3>

        {/* Description — hidden in list view */}
        {!listView && (
          <p className="text-[0.78rem] leading-[1.6] text-[rgba(240,237,230,0.28)] font-light line-clamp-2 mb-5">
            {webinar.description}
          </p>
        )}

        {/* Speakers row */}
        <div
          className={[
            "flex items-center gap-[10px] mt-auto",
            listView ? "border-0 pt-0 mt-0" : "pt-[18px] border-t border-[rgba(201,168,76,0.14)]",
          ].join(" ")}
        >
          {/* Avatar stack */}
          <div className="flex">
            {webinar.speakers.slice(0, 3).map((s, i) => (
              <div
                key={i}
                className={[
                  "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
                  "border-2 border-[#0d1118]",
                  "bg-gradient-to-br from-[#181d28] to-[#12161f]",
                  "text-[0.55rem] text-[#e8c97e]",
                  "font-['Cormorant_Garamond',serif] font-semibold",
                  i > 0 ? "-ml-[6px]" : "",
                ].join(" ")}
              >
                {s.initials}
              </div>
            ))}
          </div>

          <div className="flex-1 text-[0.68rem] text-[rgba(240,237,230,0.28)] font-light tracking-[0.02em]">
            <strong className="block text-[rgba(240,237,230,0.55)] font-normal">
              {webinar.speakers[0].name}
            </strong>
            {webinar.speakers.length > 1 && `+${webinar.speakers.length - 1} more`}
          </div>
        </div>
      </div>

      {/* ── Card footer ──────────────────────────────────────────────────── */}
      <div
        className={[
          "flex items-center justify-between",
          "px-6 pb-[22px]",
          listView
            ? "flex-col items-end justify-center gap-[10px] pb-0 pr-6 min-w-[140px] flex-shrink-0"
            : "",
        ].join(" ")}
      >
        {/* Registration count */}
        <span
          className={[
            "text-[0.65rem] text-[rgba(240,237,230,0.28)] tracking-[0.08em]",
            "flex items-center gap-[6px]",
            "before:content-['◈'] before:text-[#c9a84c] before:text-[0.6rem]",
          ].join(" ")}
        >
          {webinar.registrations.toLocaleString()} registered
        </span>

        {/* CTA button */}
        <button
          type="button"
          className={[
            "text-[0.65rem] tracking-[0.18em] uppercase font-medium",
            "font-['DM_Sans',sans-serif]",
            "px-5 py-[9px]",
            "transition-all duration-[250ms]",
            "cursor-pointer border-none",
            isCompleted
              ? // Ghost "Watch" style
                "bg-transparent text-[#c9a84c] border border-[rgba(201,168,76,0.28)] hover:bg-[rgba(201,168,76,0.12)]"
              : // Gold fill CTA
                [
                  "text-[#080a0f] bg-gradient-to-br from-[#c9a84c] to-[#e8c97e]",
                  "clip-bevel-xs",
                  "hover:from-[#e8c97e] hover:to-[#f5e6c0]",
                  "hover:shadow-[0_6px_20px_rgba(201,168,76,0.3)]",
                  "hover:-translate-y-px",
                ].join(" "),
          ].join(" ")}
          onClick={(e) => e.stopPropagation()}
        >
          {isLive ? "Join Now →" : isCompleted ? "▶ Watch" : "Register →"}
        </button>
      </div>
    </article>
  );
}
