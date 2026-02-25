"use client";

// ─── SectionHeader Props ───────────────────────────────────────────────────────

interface SectionHeaderProps {
  /** Small label above the title, e.g. "Knowledge Domains" */
  eyebrow?: string;
  /**
   * Main headline. Wrap the italic portion in <em> tags.
   * Example: <>Explore by <em>Discipline</em></>
   */
  title: React.ReactNode;
  /** Descriptive subtitle shown in the right column */
  subtitle?: string;
}

// ─── SectionHeader ─────────────────────────────────────────────────────────────
// NOTE: This is a placeholder wrapper.
// Header.tsx has already been generated — import and drop it in here,
// replacing the <header> block below, or compose it directly in CategoriesSection.
// The props interface above describes exactly what the generated Header accepts.

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    // ── 2-column grid, aligns to bottom ──────────────────────────────────
    <header
      className={[
        "relative z-[2]",
        "grid grid-cols-2 gap-10 items-end mb-[70px]",
        // ── Responsive ────────────────────────────────────────────────────
        "max-sm:grid-cols-1",
      ].join(" ")}
    >
      {/* ── Left column: eyebrow + title ──────────────────────────────── */}
      <div>
        {eyebrow && (
          <div className="flex items-center gap-[14px] mb-5">
            {/* Gold decorative line */}
            <span
              aria-hidden="true"
              className="w-8 h-px bg-gradient-to-r from-transparent to-[#c9a84c]"
            />
            <span className="text-[0.68rem] tracking-[0.35em] uppercase text-[#c9a84c]">
              {eyebrow}
            </span>
          </div>
        )}

        <h2
          className={[
            "font-['Cormorant_Garamond',serif] font-light leading-[1.06]",
            "text-[#f0ede6]",
            // clamp(2.4rem, 4vw, 3.8rem)
            "text-[clamp(2.4rem,4vw,3.8rem)]",
            // Italic parts styled gold via [&_em] selector
            "[&_em]:italic [&_em]:text-[#e8c97e] [&_em]:not-italic",
          ].join(" ")}
        >
          {title}
        </h2>
      </div>

      {/* ── Right column: subtitle ────────────────────────────────────── */}
      {subtitle && (
        <p className="text-[0.88rem] leading-[1.7] text-[rgba(240,237,230,0.55)] font-light max-w-[400px]">
          {subtitle}
        </p>
      )}
    </header>
  );
}

// ─── REPLACE WITH YOUR OWN Header.tsx ─────────────────────────────────────────
// When you're ready to swap in your generated Header:
//
//   import { Header } from "@/components/Header";
//
// Then inside CategoriesSection replace <SectionHeader ... /> with:
//
//   <Header
//     eyebrow="Knowledge Domains"
//     title={<>Explore by <em>Discipline</em></>}
//     subtitle="IEGS webinars span the full spectrum of geospatial science..."
//   />
