'use client';

import { useState } from 'react';

// ── Sub-components ────────────────────────────────────────────────────────────
import { SpeakersSectionHeader } from './SpeakersSectionHeader';
import { SpotlightPanel } from './SpotlightPanel';
import { SpeakerRoster } from './SpeakerRoster';
import { ExpertiseMarquee } from './ExpertiseMarquee';

// ── Data ──────────────────────────────────────────────────────────────────────
import { SPEAKERS, EXPERTISE_TAGS } from './data';

// ─── SpeakersSection Props ─────────────────────────────────────────────────────

interface SpeakersSectionProps {
  /** Override eyebrow label */
  eyebrow?: string;
  /** Override section title (supports JSX for italic spans) */
  title?: React.ReactNode;
  /** Callback when a speaker is selected, receives speaker id */
  onSpeakerSelect?: (id: number) => void;
}

export default function SpeakersSection({
  eyebrow,
  title,
  onSpeakerSelect,
}: SpeakersSectionProps) {
  const [activeId, setActiveId] = useState<number>(SPEAKERS[0].id);
  const [switching, setSwitching] = useState(false);

  const activeSpeaker = SPEAKERS.find((s) => s.id === activeId)!;

  const handleSelect = (id: number) => {
    if (id === activeId) return;
    // Fade out → swap → fade in
    setSwitching(true);
    setTimeout(() => {
      setActiveId(id);
      setSwitching(false);
      onSpeakerSelect?.(id);
    }, 220);
  };

  return (
    <section
      id='speakers'
      className="relative overflow-hidden font-['DM_Sans',sans-serif]"
      style={{
        background:
          'linear-gradient(180deg, var(--obsidian-3) 0%, var(--obsidian-4) 50%, var(--obsidian-3) 100%)',
        color: 'var(--ivory)',
      }}
      aria-label='Speakers'
    >
      {/* ── Top gold rule ───────────────────────────────────────────────────── */}
      <div
        aria-hidden='true'
        className='w-full h-px opacity-20'
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold) 70%, transparent 100%)',
        }}
      />

      {/* ── Ambient glow orbs ───────────────────────────────────────────────── */}
      <div
        aria-hidden='true'
        className={[
          'absolute -top-[100px] -left-[150px] w-[600px] h-[600px] rounded-full',
          'pointer-events-none filter blur-[90px]',
          'bg-[radial-gradient(circle,var(--gold-dim)_0%,transparent_70%)]',
        ].join(' ')}
      />
      <div
        aria-hidden='true'
        className={[
          'absolute bottom-0 -right-[100px] w-[400px] h-[400px] rounded-full',
          'pointer-events-none filter blur-[90px]',
          'bg-[radial-gradient(circle,var(--cyan-dim)_0%,transparent_70%)]',
        ].join(' ')}
      />

      {/* ── 1. Section header ───────────────────────────────────────────────── */}
      {/*
        To use your shared Header.tsx:
        1. Remove <SpeakersSectionHeader ... /> below
        2. import { Header } from "@/components/Header";
        3. Replace with: <Header eyebrow={eyebrow} title={title} ... />
      */}
      <SpeakersSectionHeader
        eyebrow={eyebrow}
        title={title}
        speakerCount={SPEAKERS.length}
      />

      {/* ── 2+3. Body: spotlight + roster ──────────────────────────────────── */}
      <div
        className={[
          'relative z-[2]',
          'grid grid-cols-[1.1fr_1fr] min-h-[700px]',
          // tablet: single column
          'max-lg:grid-cols-1',
        ].join(' ')}
      >
        {/* Left: Spotlight */}
        <SpotlightPanel speaker={activeSpeaker} switching={switching} />

        {/* Right: Roster */}
        <SpeakerRoster
          speakers={SPEAKERS}
          activeId={activeId}
          onSelect={handleSelect}
        />
      </div>

      {/* ── 4. Expertise marquee ────────────────────────────────────────────── */}
      <ExpertiseMarquee tags={EXPERTISE_TAGS} duration={30} />
    </section>
  );
}
