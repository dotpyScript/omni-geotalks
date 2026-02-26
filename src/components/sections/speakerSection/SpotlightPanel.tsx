"use client";

import type { Speaker } from "./types";
import { SpotlightPortrait } from "./SpotlightPortrait";
import { RoleBadge } from "./RoleBadge";

// ─── SpotlightPanel Props ──────────────────────────────────────────────────────

interface SpotlightPanelProps {
  speaker: Speaker;
  /**
   * When true, hides content (opacity 0 + slide down) while the
   * active speaker is being swapped — mimics the original CSS transition.
   */
  switching: boolean;
}

// ─── SpotlightPanel ────────────────────────────────────────────────────────────
// The large left-side panel showing the active speaker's portrait,
// bio, expertise tags, and action buttons.

export function SpotlightPanel({ speaker, switching }: SpotlightPanelProps) {
  return (
    <div
      className={[
        "relative flex flex-col justify-end overflow-hidden",
        "min-h-[700px]",
        "border-r border-[rgba(201,168,76,0.14)]",
        // tablet: no right border, bottom border instead
        "max-lg:border-r-0 max-lg:border-b max-lg:border-[rgba(201,168,76,0.14)] max-lg:min-h-[500px]",
      ].join(" ")}
    >
      {/* ── Large monogram background text ──────────────────────────────── */}
      <span
        aria-hidden="true"
        className={[
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "font-['Bebas_Neue',sans-serif] leading-none tracking-[-0.05em]",
          "text-[clamp(14rem,22vw,22rem)]",
          "text-[rgba(201,168,76,0.035)]",
          "select-none pointer-events-none whitespace-nowrap",
          "transition-[opacity,color] duration-[500ms]",
        ].join(" ")}
      >
        {speaker.initials}
      </span>

      {/* ── Per-speaker ambient glow ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 transition-[background] duration-[500ms]"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${speaker.accentColor} 0%, transparent 65%)`,
        }}
      />

      {/* ── Spinning orbital portrait ────────────────────────────────────── */}
      <SpotlightPortrait initials={speaker.initials} />

      {/* ── Scan-line texture overlay ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* ── Content lower panel ──────────────────────────────────────────── */}
      <div
        className={[
          "relative z-[3] px-12 py-10",
          // fade-slide transition on speaker swap
          "transition-[opacity,transform] duration-[350ms] ease-out",
          switching
            ? "opacity-0 translate-y-[10px]"
            : "opacity-100 translate-y-0",
          // gradient fade-in from below
          "bg-gradient-to-t from-[#080a0f] via-[rgba(8,10,15,0.95)] to-transparent",
          // mobile padding
          "max-sm:px-6 max-sm:py-7",
        ].join(" ")}
      >
        {/* Role badge */}
        <div className="mb-4">
          <RoleBadge role={speaker.role} variant="full" />
        </div>

        {/* Name */}
        <h3
          className={[
            "font-['Cormorant_Garamond',serif] font-light leading-[1.1]",
            "text-[#f0ede6] mb-[6px]",
            "text-[clamp(2rem,3.5vw,3.2rem)]",
            "transition-colors duration-[400ms]",
          ].join(" ")}
        >
          {speaker.name}
        </h3>

        {/* Title */}
        <div className="text-[0.8rem] text-[#e8c97e] font-normal tracking-[0.05em] mb-1">
          {speaker.title}
        </div>

        {/* Organisation */}
        <div className="text-[0.72rem] text-[rgba(240,237,230,0.28)] font-light tracking-[0.06em] mb-5">
          {speaker.org}
        </div>

        {/* Bio — clamped to 3 lines */}
        <p
          className={[
            "text-[0.8rem] leading-[1.7] text-[rgba(240,237,230,0.55)] font-light",
            "mb-6",
            "line-clamp-3",
          ].join(" ")}
        >
          {speaker.bio}
        </p>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {speaker.expertise.map((tag) => (
            <span
              key={tag}
              className={[
                "text-[0.6rem] tracking-[0.14em] uppercase",
                "px-[10px] py-1",
                "border border-[rgba(201,168,76,0.2)]",
                "text-[rgba(240,237,230,0.45)]",
                "bg-[rgba(201,168,76,0.05)]",
              ].join(" ")}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-[14px] flex-wrap">
          {/* Primary CTA */}
          <button
            type="button"
            className={[
              "inline-flex items-center gap-[10px]",
              "text-[0.7rem] tracking-[0.18em] uppercase font-medium",
              "font-['DM_Sans',sans-serif]",
              "text-[#080a0f]",
              "bg-gradient-to-br from-[#c9a84c] to-[#e8c97e]",
              "px-6 py-3",
              "clip-bevel-sm",
              "transition-all duration-[250ms]",
              "hover:from-[#e8c97e] hover:to-[#f5e6c0]",
              "hover:shadow-[0_8px_24px_rgba(201,168,76,0.3)]",
              "hover:-translate-y-px",
              "cursor-pointer border-none",
            ].join(" ")}
          >
            View Profile →
          </button>

          {/* Ghost LinkedIn button */}
          <a
            href={speaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "inline-flex items-center gap-2",
              "text-[0.68rem] tracking-[0.15em] uppercase",
              "text-[rgba(240,237,230,0.55)]",
              "border border-[rgba(201,168,76,0.14)]",
              "px-5 py-3",
              "transition-all duration-[250ms]",
              "hover:border-[rgba(201,168,76,0.30)] hover:text-[#f0ede6] hover:bg-[rgba(201,168,76,0.10)]",
              "cursor-pointer",
            ].join(" ")}
            aria-label={`View ${speaker.name} on LinkedIn`}
          >
            {/* LinkedIn icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        </div>

        {/* Webinar count */}
        <div
          className={[
            "flex items-center gap-2 mt-[18px] pt-[18px]",
            "border-t border-[rgba(201,168,76,0.14)]",
            "text-[0.65rem] tracking-[0.12em] uppercase text-[rgba(240,237,230,0.28)]",
          ].join(" ")}
        >
          <strong className="font-['Bebas_Neue',sans-serif] text-[1.1rem] text-[#e8c97e] tracking-[0.05em] mr-[2px]">
            {speaker.webinars}
          </strong>
          webinars hosted &nbsp;·&nbsp; {speaker.category}
        </div>
      </div>
    </div>
  );
}
