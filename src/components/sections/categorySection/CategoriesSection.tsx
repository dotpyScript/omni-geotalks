'use client';

import { useState } from 'react';

// ── Sub-components ────────────────────────────────────────────────────────────
import { BackgroundDecor } from './BackgroundDecor';
import { SectionHeader } from './SectionHeader';
import { CategoryGrid } from './CategoryGrid';
import { CategoryStrip } from './CategoryStrip';

// ── Data ──────────────────────────────────────────────────────────────────────
import { CATEGORIES } from './data';

// ─── CategoriesSection Props ───────────────────────────────────────────────────

interface CategoriesSectionProps {
  /**
   * Override the default eyebrow label.
   * @default "Knowledge Domains"
   */
  eyebrow?: string;
  /**
   * Override the default section title.
   * Wrap italic words in <em>.
   */
  title?: React.ReactNode;
  /**
   * Override the default subtitle paragraph.
   */
  subtitle?: string;
  /**
   * Callback fired when a category card or strip item is clicked.
   * Receives the category id string.
   */
  onCategorySelect?: (id: string) => void;
}

// ─── CategoriesSection ────────────────────────────────────────────────────────
//
// This is the top-level section component.
// It wires together:
//   1. BackgroundDecor  — ambient glows + hairlines
//   2. SectionHeader    — eyebrow / title / subtitle
//      (swap for your own Header.tsx — see SectionHeader.tsx for instructions)
//   3. CategoryGrid     — asymmetric bento card grid
//   4. CategoryStrip    — bottom summary strip with active toggle
//
// NOTE: The @keyframes `catReveal` animation must be registered in your global
// Tailwind CSS config (or globals.css). Add this to tailwind.config.ts:
//
//   theme: {
//     extend: {
//       keyframes: {
//         catReveal: {
//           from: { opacity: "0", transform: "translateY(28px)" },
//           to:   { opacity: "1", transform: "translateY(0)" },
//         },
//       },
//       animation: {
//         catReveal: "catReveal 0.6s ease both",
//       },
//     },
//   }
//
// NOTE: Custom fonts (Cormorant Garamond, Bebas Neue) must be loaded.
// In app/layout.tsx (or globals.css) add:
//
//   import { Cormorant_Garamond, Bebas_Neue, DM_Sans } from "next/font/google";
//
//   const cormorant = Cormorant_Garamond({
//     subsets: ["latin"],
//     weight: ["300", "400", "600"],
//     style: ["normal", "italic"],
//     variable: "--font-cormorant",
//   });
//   const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });
//   const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300","400","500"], variable: "--font-dm-sans" });
//
// Then apply the variables on <body>:
//   className={`${cormorant.variable} ${bebas.variable} ${dmSans.variable}`}
//
// And reference them in tailwind.config.ts:
//   fontFamily: {
//     cormorant: ["var(--font-cormorant)", "serif"],
//     bebas:     ["var(--font-bebas)", "sans-serif"],
//     dm:        ["var(--font-dm-sans)", "sans-serif"],
//   }

export default function CategoriesSection({
  eyebrow = 'Knowledge Domains',
  title = (
    <>
      Explore by <em>Discipline</em>
    </>
  ),
  subtitle = 'IEGS webinars span the full spectrum of geospatial science — from foundational mapping and remote sensing to cutting-edge drone technology, AI-powered spatial analytics, Digital Twin city modelling, and petroleum geospatial intelligence.',
  onCategorySelect,
}: CategoriesSectionProps) {
  // ── Active strip item state ──────────────────────────────────────────────
  const [activeStripId, setActiveStripId] = useState<string | null>(null);

  const handleStripToggle = (id: string) => {
    setActiveStripId((prev) => (prev === id ? null : id));
    onCategorySelect?.(id);
  };

  const handleCardClick = (id: string) => {
    onCategorySelect?.(id);
  };

  return (
    <section
      className={[
        // ── Positioning ────────────────────────────────────────────────
        'relative overflow-hidden',
        // ── Colour & font ──────────────────────────────────────────────
        "text-ivory font-['DM_Sans',sans-serif]",
        // ── Spacing ────────────────────────────────────────────────────
        'px-[60px] py-[120px] pb-[130px]',
        // ── Responsive padding ─────────────────────────────────────────
        'max-lg:px-8 max-lg:py-20 max-lg:pb-[100px]',
        'max-sm:px-5 max-sm:py-[60px] max-sm:pb-20 bg-[#171818]', // --- IGNORE --- (fallback background color if gradient fails to load)
      ].join(' ')}
      //style={{ background: '#07101a' }} //linear-gradient(180deg, #07101a 0%, #08121e 50%, #07101a 100%)
      aria-label='Webinar categories'
    >
      {/* ── 1. Ambient background decorations ────────────────────────────── */}
      <BackgroundDecor linePositions={[15, 30, 50, 70, 85]} />

      {/* ── 2. Section header ─────────────────────────────────────────────── */}
      {/*
        TO USE YOUR OWN Header.tsx:
        1. Remove <SectionHeader ... /> below
        2. Import your Header component:
              import { Header } from "@/components/Header";
        3. Replace with:
              <Header eyebrow={eyebrow} title={title} subtitle={subtitle} />
      */}
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      {/* ── 3. Asymmetric card grid ────────────────────────────────────────── */}
      <CategoryGrid categories={CATEGORIES} onCardClick={handleCardClick} />

      {/* ── 4. Bottom summary strip ────────────────────────────────────────── */}
      <CategoryStrip
        categories={CATEGORIES}
        activeId={activeStripId}
        onToggle={handleStripToggle}
      />
    </section>
  );
}
