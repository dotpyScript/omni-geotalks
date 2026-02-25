"use client";

// ─── ExpertiseMarquee Props ────────────────────────────────────────────────────

interface ExpertiseMarqueeProps {
  /** Array of tag strings to scroll. The list is duplicated internally for seamless loop. */
  tags: string[];
  /** Duration of one full scroll cycle in seconds (default: 30) */
  duration?: number;
}

// ─── ExpertiseMarquee ──────────────────────────────────────────────────────────
// Horizontally scrolling bar of expertise keyword tags.
// The track duplicates the tag list so the loop is seamless.
// Pauses on hover (original behaviour preserved via group-hover).

export function ExpertiseMarquee({ tags, duration = 30 }: ExpertiseMarqueeProps) {
  const doubledTags = [...tags, ...tags];

  return (
    <div
      className={[
        "relative z-[2]",
        "border-t border-[rgba(201,168,76,0.14)]",
        "py-5 overflow-hidden",
        "bg-[#0d1118]",
        // pause on hover via group
        "group",
      ].join(" ")}
      aria-label="Expertise areas"
    >
      {/* Scrolling track */}
      <div
        className={[
          "flex gap-0 whitespace-nowrap",
          "animate-[tagMarquee_var(--marquee-duration)_linear_infinite]",
          // pause on parent hover
          "group-hover:[animation-play-state:paused]",
        ].join(" ")}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {doubledTags.map((tag, i) => (
          <span
            key={i}
            className={[
              "inline-flex items-center gap-[10px] px-7",
              "text-[0.68rem] tracking-[0.2em] uppercase",
              "text-[rgba(240,237,230,0.28)]",
              "cursor-default",
              "transition-colors duration-[200ms] hover:text-[#e8c97e]",
            ].join(" ")}
          >
            {tag}
            {/* Diamond separator */}
            <span
              aria-hidden="true"
              className="text-[#c9a84c] opacity-50 text-[0.5rem]"
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
