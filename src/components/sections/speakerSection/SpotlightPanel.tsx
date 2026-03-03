"use client";

import type { Speaker } from "./types";
import { SpotlightPortrait } from "./SpotlightPortrait";
import { RoleBadge } from "./RoleBadge";

// ─── SpotlightPanel Props ──────────────────────────────────────────────────────

interface SpotlightPanelProps {
  speaker: Speaker;
  switching: boolean;
}

// ─── SpotlightPanel ────────────────────────────────────────────────────────────

export function SpotlightPanel({ speaker, switching }: SpotlightPanelProps) {
  return (
    <div
      className={[
        "relative flex flex-col justify-end overflow-hidden",
        "min-h-175",
        "border-r border-(--border)",
        "max-lg:border-r-0 max-lg:border-b max-lg:border-(--border) max-lg:min-h-125",
      ].join(" ")}
    >
      {/* ── Large monogram background text ──────────────────────────────── */}
      <span
        aria-hidden="true"
        className={[
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "font-bebas leading-none tracking-[-0.05em]",
          "text-[clamp(14rem,22vw,22rem)]",
          "text-(--gold)/[0.035]",
          "select-none pointer-events-none whitespace-nowrap",
          "transition-[opacity,color] duration-500",
        ].join(" ")}
      >
        {speaker.initials}
      </span>

      {/* ── Per-speaker ambient glow ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 transition-[background] duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${speaker.accentColor} 0%, transparent 65%)`,
        }}
      />

      {/* ── Spinning orbital portrait ────────────────────────────────────── */}
      <SpotlightPortrait initials={speaker.initials} />

      {/* ── Scan-line texture overlay ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* ── Content lower panel ──────────────────────────────────────────── */}
      <div
        className={[
          "relative z-3 px-12 py-10",
          "transition-[opacity,transform] duration-350 ease-out",
          switching ? "opacity-0 translate-y-2.5" : "opacity-100 translate-y-0",
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
            "font-cormorant font-light leading-[1.1]",
            "text-(--ivory) mb-1.5",
            "text-[clamp(2rem,3.5vw,3.2rem)]",
            "transition-colors duration-400",
          ].join(" ")}
        >
          {speaker.name}
        </h3>

        {/* Title */}
        <div className="text-[0.8rem] text-(--gold-light) font-normal tracking-[0.05em] mb-1">
          {speaker.title}
        </div>

        {/* Organisation */}
        <div className="text-[0.72rem] text-(--ivory-muted) font-light tracking-[0.06em] mb-5">
          {speaker.org}
        </div>

        {/* Bio — clamped to 3 lines */}
        <p className="text-[0.8rem] leading-[1.7] text-(--ivory-dim) font-light mb-6 line-clamp-3">
          {speaker.bio}
        </p>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {speaker.expertise.map((tag) => (
            <span
              key={tag}
              className={[
                "text-[0.6rem] tracking-[0.14em] uppercase",
                "px-2.5 py-1",
                "border border-(--border)",
                "text-(--ivory-dim)",
                "bg-(--gold-dim)",
              ].join(" ")}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3.5 flex-wrap">
          {/* Primary CTA — intentionally fixed dark text on gold */}
          <button
            type="button"
            className={[
              "inline-flex items-center gap-2.5",
              "text-[0.7rem] tracking-[0.18em] uppercase font-medium font-dm",
              "text-[#1c1a14]",
              "bg-linear-to-br from-(--gold) to-(--gold-light)",
              "px-6 py-3 clip-bevel-sm",
              "transition-all duration-250",
              "hover:from-(--gold-light) hover:to-(--gold-pale)",
              "hover:shadow-[0_8px_24px_var(--gold-glow)]",
              "hover:-translate-y-px cursor-pointer border-none",
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
              "text-(--ivory-dim)",
              "border border-(--border)",
              "px-5 py-3",
              "transition-all duration-250",
              "hover:border-(--border-mid) hover:text-(--ivory) hover:bg-(--gold-dim)",
              "hover:shadow-[0_4px_16px_var(--gold-dim)]",
              "cursor-pointer",
            ].join(" ")}
            aria-label={`View ${speaker.name} on LinkedIn`}
          >
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
            "flex items-center gap-2 mt-4.5 pt-4.5",
            "border-t border-(--border)",
            "text-[0.65rem] tracking-[0.12em] uppercase text-(--ivory-muted)",
          ].join(" ")}
        >
          <strong className="font-bebas text-[1.1rem] text-(--gold-light) tracking-[0.05em] mr-0.5">
            {speaker.webinars}
          </strong>
          webinars hosted &nbsp;·&nbsp; {speaker.category}
        </div>
      </div>
    </div>
  );
}
