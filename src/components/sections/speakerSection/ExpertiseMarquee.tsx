"use client";

// ─── ExpertiseMarquee Props ────────────────────────────────────────────────────

interface ExpertiseMarqueeProps {
  tags: string[];
  duration?: number;
}

// ─── ExpertiseMarquee ──────────────────────────────────────────────────────────
// Horizontally scrolling bar of expertise keyword tags.
// Pauses on hover.

export function ExpertiseMarquee({ tags, duration = 30 }: ExpertiseMarqueeProps) {
  const doubledTags = [...tags, ...tags];

  return (
    <div
      className={[
        "relative z-2",
        "border-t border-(--border)",
        "py-5 overflow-hidden",
        "bg-(--obsidian-2)",
        "group",
      ].join(" ")}
      aria-label="Expertise areas"
    >
      {/* Scrolling track */}
      <div
        className={[
          "flex gap-0 whitespace-nowrap",
          "animate-tag-marquee",
          "group-hover:[animation-play-state:paused]",
        ].join(" ")}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubledTags.map((tag, i) => (
          <span
            key={i}
            className={[
              "inline-flex items-center gap-2.5 px-7",
              "text-[0.68rem] tracking-[0.2em] uppercase",
              "text-(--ivory-muted)",
              "cursor-default",
              "transition-colors duration-200 hover:text-(--gold-light)",
            ].join(" ")}
          >
            {tag}
            {/* Diamond separator */}
            <span
              aria-hidden="true"
              className="text-(--gold) opacity-50 text-[0.5rem]"
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
