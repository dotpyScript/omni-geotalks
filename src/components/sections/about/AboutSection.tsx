'use client';

// ── Sub-components ─────────────────────────────────────────────────────────────
import { AboutHeroBlock } from '@/components/section-components/AboutHeroBlock';
import { StatsWall } from '@/components/section-components/StatsWall';
import { TimelineRail } from '@/components/section-components/TimelineRail';
import { PillarsGrid } from '@/components/section-components/PillarsGrid';
import { AboutCTAStrip } from '@/components/section-components/AboutCTAStrip';

// ─── AboutSection Props ────────────────────────────────────────────────────────

interface AboutSectionProps {
  onExploreClick?: () => void;
  onSpeakersClick?: () => void;
}

// ─── AboutSection ──────────────────────────────────────────────────────────────
//
// Section composition — scroll order:
//
//   1. AboutHeroBlock   — spine + editorial title split / manifesto reveal
//   2. StatsWall        — 4 dramatic animated counter cells
//   3. ──── Interior body (padded) ────
//   4. TimelineRail     — vertical founding timeline with animated drawing rail
//   5. Gold diamond divider
//   6. PillarsGrid      — 3 core principle cards with Roman numerals
//   7. AboutCTAStrip    — full-width CTA strip
//
// ── globals.css additions ─────────────────────────────────────────────────────
// No new keyframes needed. This section uses only:
//   • transition-based scroll reveals via useScrollReveal (IntersectionObserver)
//   • The existing `bg-grid` utility (.bg-grid defined in globals.css)
//   • The existing `clip-bevel-sm` utility class
//   • Inline CSS animation for the decorative scan line in AboutHeroBlock

export default function AboutSection({
  onExploreClick,
  onSpeakersClick,
}: AboutSectionProps) {
  return (
    <section
      className='relative overflow-hidden bg-[#080a0f] text-[#f0ede6]'
      aria-labelledby='about-section-heading'
    >
      {/* Screen-reader section label */}
      <h2 id='about-section-heading' className='sr-only'>
        About IEGS
      </h2>

      {/* ── Global ambient orbs ─────────────────────────────────────────── */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute top-0 right-[-15%] w-[800px] h-[800px] rounded-full'
        style={{
          background:
            'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute bottom-[25%] left-[-8%] w-[600px] h-[600px] rounded-full'
        style={{
          background:
            'radial-gradient(ellipse, rgba(0,212,255,0.03) 0%, transparent 60%)',
        }}
      />

      {/* ── Top gold rule ────────────────────────────────────────────────── */}
      <div
        aria-hidden='true'
        className='w-full h-px'
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(201,168,76,0.35) 30%, rgba(201,168,76,0.35) 70%, transparent)',
        }}
      />

      {/* 1. Hero Block */}
      <AboutHeroBlock />

      {/* 2. Stats Wall */}
      <StatsWall />

      {/* ── Interior body ────────────────────────────────────────────────── */}
      <div className='relative z-[2] px-[60px] py-20 max-md:px-6 max-md:py-14 flex flex-col gap-20'>
        {/* 3. Timeline */}
        <TimelineRail />

        {/* Divider — gold diamond */}
        <div
          aria-hidden='true'
          className='relative w-full flex items-center gap-4'
        >
          <div
            className='flex-1 h-px'
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(201,168,76,0.2))',
            }}
          />
          <div className='w-[10px] h-[10px] rotate-45 bg-[#c9a84c] opacity-70 flex-shrink-0' />
          <div
            className='flex-1 h-px'
            style={{
              background:
                'linear-gradient(90deg, rgba(201,168,76,0.2), transparent)',
            }}
          />
        </div>

        {/* 4. Pillars */}
        <PillarsGrid />

        {/* 5. CTA */}
        <AboutCTAStrip
          onExplore={onExploreClick}
          onSpeakers={onSpeakersClick}
        />
      </div>

      {/* ── Bottom gold rule ─────────────────────────────────────────────── */}
      <div
        aria-hidden='true'
        className='w-full h-px'
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(201,168,76,0.35) 30%, rgba(201,168,76,0.35) 70%, transparent)',
        }}
      />
    </section>
  );
}
