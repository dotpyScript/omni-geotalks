"use client";

// ── Sub-components ────────────────────────────────────────────────────────────
import { AboutHero } from "./AboutHero";
import { AboutStats } from "./AboutStats";
import { MilestoneTimeline } from "./MilestoneTimeline";
import { AboutPillars } from "./AboutPillars";
import { AboutCTA } from "./AboutCTA";

// ─── AboutSection Props ────────────────────────────────────────────────────────

interface AboutSectionProps {
  /** Optional callback when primary CTA is clicked */
  onExploreClick?: () => void;
  /** Optional callback when secondary CTA is clicked */
  onSpeakersClick?: () => void;
}

// ─── AboutSection ──────────────────────────────────────────────────────────────
//
// Composition:
//   1. AboutHero           — split panel: title + manifesto / geo map + identity card
//   2. AboutStats          — four animated counter stats strip
//   3. MilestoneTimeline   — horizontal founding story timeline
//   4. AboutPillars        — three core value pillars with hover animations
//   5. AboutCTA            — full-width call-to-action strip
//
// All scroll-triggered animations use IntersectionObserver (no framer-motion dep).
// Framer Motion can be layered in later if desired — the useInView hook can be
// replaced with useInView from @framer-motion/react for more control.
//
// ── Tailwind v4 additions required in globals.css @theme ──────────────────────
// No new keyframes needed — this section uses only:
//   - transition-based scroll reveals (opacity + transform)
//   - The existing `--animate-spin-slow` (GeoMapDecoration scan line is inline CSS)
//   - The existing `bg-grid` utility class
//   - The existing `text-gold-gradient`, `clip-bevel-sm` utilities

export default function AboutSection({
  onExploreClick,
  onSpeakersClick,
}: AboutSectionProps) {
  return (
    <section
      className={[
        "relative overflow-hidden",
        "bg-[#080a0f] text-[#f0ede6]",
        "font-['DM_Sans',sans-serif]",
      ].join(" ")}
      aria-labelledby="about-heading"
    >
      {/* ── Ambient background orbs ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-[-10%] w-[700px] h-[700px] rounded-full
          bg-[radial-gradient(ellipse,rgba(201,168,76,0.05)_0%,transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] rounded-full
          bg-[radial-gradient(ellipse,rgba(0,212,255,0.04)_0%,transparent_65%)]"
      />

      {/* ── Top gold rule ────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="w-full h-px opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #c9a84c 30%, #c9a84c 70%, transparent 100%)",
        }}
      />

      {/* ── 1. Hero split panel ──────────────────────────────────────────── */}
      <AboutHero />

      {/* ── 2. Stats counter strip ───────────────────────────────────────── */}
      <AboutStats />

      {/* ── Interior body ────────────────────────────────────────────────── */}
      <div className="relative z-[2] px-[60px] py-20 max-md:px-6 max-md:py-14 space-y-20">

        {/* ── 3. Founding timeline ─────────────────────────────────────── */}
        <MilestoneTimeline />

        {/* ── Diagonal gold divider ────────────────────────────────────── */}
        <div
          aria-hidden="true"
          className="relative w-full h-px overflow-visible"
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.25) 70%, transparent 100%)",
            }}
          />
          {/* Small gold diamond in the centre */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[8px] h-[8px] bg-[#c9a84c] rotate-45"
          />
        </div>

        {/* ── 4. Core pillars ──────────────────────────────────────────── */}
        <AboutPillars />

        {/* ── 5. CTA strip ─────────────────────────────────────────────── */}
        <AboutCTA />
      </div>

      {/* ── Bottom decorative line ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="w-full h-px opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #c9a84c 30%, #c9a84c 70%, transparent 100%)",
        }}
      />
    </section>
  );
}
