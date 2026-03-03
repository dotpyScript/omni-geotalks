"use client";

// ─── SpeakersSectionHeader Props ───────────────────────────────────────────────

interface SpeakersSectionHeaderProps {
  eyebrow?: string;
  title?: React.ReactNode;
  speakerCount: number;
  seasonLabel?: string;
}

// ─── SpeakersSectionHeader ─────────────────────────────────────────────────────
// The top header bar: eyebrow + title on the left, animated count + label on the right.
// Separated from SectionHeader in CategoriesSection so each section is independent.
//
// NOTE: If you want to use your shared Header.tsx component,
// replace <SpeakersSectionHeader /> in SpeakersSection.tsx with:
//   <Header eyebrow="World-Class Expertise" title={<>Meet the <em>Speakers</em></>} ... />

export function SpeakersSectionHeader({
  eyebrow = "World-Class Expertise",
  title = (
    <>
      Meet the{" "}
      <em className="not-italic" style={{ color: "var(--gold-light)" }}>
        Speakers
      </em>
    </>
  ),
  speakerCount,
  seasonLabel = "Expert Speakers\nThis Season",
}: SpeakersSectionHeaderProps) {
  return (
    <div
      className={[
        "relative z-[2]",
        "px-[60px] pt-[90px] pb-[60px]",
        "flex items-end justify-between gap-10",
        "border-b border-(--border)",
        // mobile
        "max-sm:px-6 max-sm:pt-[60px] max-sm:pb-10 max-sm:flex-col max-sm:items-start",
      ].join(" ")}
    >
      {/* Left: eyebrow + title */}
      <div>
        {/* Eyebrow */}
        <div className="flex items-center gap-[14px] mb-5">
          <span
            aria-hidden="true"
            className="w-8 h-px bg-gradient-to-r from-transparent to-(--gold)"
          />
          <span className="text-[0.68rem] tracking-[0.35em] uppercase text-(--gold)">
            {eyebrow}
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-['Cormorant_Garamond',serif] font-light leading-[1.06] text-[clamp(2.4rem,4vw,3.8rem)]"
          style={{ color: "var(--ivory)" }}
        >
          {title}
        </h2>
      </div>

      {/* Right: speaker count */}
      <div className="text-right flex-shrink-0">
        <span
          className="font-['Bebas_Neue',sans-serif] text-[3.5rem] tracking-[0.04em] leading-none block"
          style={{ color: "var(--gold-light)" }}
        >
          {speakerCount}
        </span>
        <span
          className="text-[0.65rem] tracking-[0.25em] uppercase whitespace-pre-line"
          style={{ color: "var(--ivory-muted)" }}
        >
          {seasonLabel}
        </span>
      </div>
    </div>
  );
}
