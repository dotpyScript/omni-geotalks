'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FeaturedSessionCard } from './FeaturedSessionCard';
import { SessionCard } from './SessionCard';
import { CategoryFilter } from './CategoryFilter';
import {
  WEBINARS,
  CATEGORIES,
} from '@/components/sections/webinerDiscovery/data';

// ─── Props ────────────────────────────────────────────────────────────────────
interface WebinarShowcaseProps {
  onWebinarSelect?: (id: number) => void;
}

// ─── Section header ───────────────────────────────────────────────────────────
function ShowcaseHeader({
  filteredCount,
  totalCount,
}: {
  filteredCount: number;
  totalCount: number;
}) {
  return (
    <div
      className={[
        'relative z-[2]',
        'px-[60px] pt-[100px] pb-[56px]',
        'flex items-end justify-between gap-10',
        'max-md:px-6 max-md:pt-[60px] max-md:pb-10',
        'max-md:flex-col max-md:items-start max-md:gap-5',
      ].join(' ')}
    >
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Eyebrow */}
        <div className='flex items-center gap-3.5 mb-5'>
          <span className='w-8 h-px bg-gradient-to-r from-transparent to-[#c9a84c]' />
          <span className='text-[0.68rem] tracking-[0.35em] uppercase text-[#c9a84c]'>
            Expert-Led Sessions
          </span>
        </div>

        {/* Title */}
        <h2
          className='font-light leading-[1.08] text-[#f0ede6] text-[clamp(2.4rem,4vw,3.8rem)]'
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Discover <em className='italic text-[#e8c97e]'>Webinars</em>
        </h2>
      </motion.div>

      {/* Right: live counter + count */}
      <motion.div
        className='flex items-center gap-5 flex-shrink-0'
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Live dot */}
        <div className='flex items-center gap-2.5 px-4 py-2 border border-[rgba(0,229,160,0.2)] bg-[rgba(0,229,160,0.05)]'>
          <span className='relative flex h-[6px] w-[6px]'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5a0] opacity-75' />
            <span className='relative inline-flex rounded-full h-[6px] w-[6px] bg-[#00e5a0]' />
          </span>
          <span className='text-[0.6rem] tracking-[0.25em] uppercase text-[#00e5a0]'>
            1 Session Live
          </span>
        </div>

        {/* Total count */}
        <div className='text-right'>
          <div
            className='text-[2rem] tracking-[0.04em] leading-none text-[#e8c97e]'
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {filteredCount}
          </div>
          <div className='text-[0.6rem] tracking-[0.2em] uppercase text-[rgba(240,237,230,0.28)] mt-0.5'>
            {filteredCount === totalCount ? 'Total Events' : 'Results Found'}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Stats strip ──────────────────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { value: '8', label: 'Scheduled Sessions', suffix: '' },
    { value: '38', label: 'Countries', suffix: '+' },
    { value: '2,800', label: 'Professionals', suffix: '+' },
    { value: '97', label: 'Satisfaction Rate', suffix: '%' },
  ] as const;

  return (
    <motion.div
      className={[
        'relative z-[2] mx-[60px] mb-10',
        'grid grid-cols-4 border border-[rgba(201,168,76,0.12)]',
        'max-md:mx-6 max-[700px]:grid-cols-2',
      ].join(' ')}
      style={{
        background:
          'linear-gradient(90deg, rgba(201,168,76,0.04), transparent 50%, rgba(0,212,255,0.02))',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={[
            'flex flex-col items-center justify-center py-4 px-3 text-center',
            i < stats.length - 1
              ? 'border-r border-[rgba(201,168,76,0.1)]'
              : '',
            'max-[700px]:even:border-r-0 max-[700px]:last:border-t max-[700px]:nth-[3]:border-t',
          ].join(' ')}
        >
          <span
            className='text-[1.9rem] tracking-[0.03em] leading-none text-[#e8c97e]'
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {s.value}
            {s.suffix}
          </span>
          <span className='text-[0.58rem] tracking-[0.18em] uppercase text-[rgba(240,237,230,0.28)] mt-1'>
            {s.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <motion.div
      className={[
        'relative z-[2]',
        'mx-[60px] mt-14',
        'flex items-center justify-between gap-8 flex-wrap',
        'pt-10 border-t border-[rgba(201,168,76,0.12)]',
        'max-md:mx-6 max-md:flex-col max-md:items-start',
      ].join(' ')}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left copy */}
      <div>
        <h3
          className='text-[1.45rem] font-light leading-[1.2] text-[#f0ede6] mb-1'
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          More sessions <em className='italic text-[#e8c97e]'>coming soon.</em>
        </h3>
        <p className='text-[0.76rem] text-[rgba(240,237,230,0.38)] font-light'>
          New webinars added every month across all disciplines.
        </p>
      </div>

      {/* Buttons */}
      <div className='flex items-center gap-3 flex-wrap'>
        {/* Primary CTA */}
        <motion.button
          className='inline-flex items-center gap-2.5 px-7 py-3.5 text-[0.74rem] tracking-[0.2em] uppercase text-[#080a0f] font-medium cursor-pointer border-none overflow-hidden relative'
          style={{
            background: 'linear-gradient(135deg, #c9a84c, #e8c97e)',
            clipPath:
              'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            fontFamily: "'DM Sans', sans-serif",
          }}
          whileHover={{
            scale: 1.01,
            boxShadow: '0 8px 32px rgba(201,168,76,0.35)',
          }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <motion.span
            className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/18 to-white/0 pointer-events-none'
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
          />
          <span className='relative'>Browse All Sessions</span>
          <ArrowRight size={14} className='relative' />
        </motion.button>

        {/* Ghost CTA */}
        <motion.button
          className='inline-flex items-center gap-2 px-6 py-3.5 text-[0.72rem] tracking-[0.15em] uppercase text-[rgba(240,237,230,0.5)] border border-[rgba(201,168,76,0.16)] bg-transparent cursor-pointer transition-all duration-300 hover:border-[rgba(201,168,76,0.36)] hover:text-[#f0ede6] hover:bg-[rgba(201,168,76,0.05)]'
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          whileTap={{ scale: 0.99 }}
        >
          Get Notified
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      className='col-span-full flex flex-col items-center text-center py-20 gap-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className='text-[2.5rem] opacity-20 mb-2'>◎</div>
      <h3
        className='text-[1.6rem] font-light text-[rgba(240,237,230,0.55)]'
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        No sessions found
      </h3>
      <p className='text-[0.8rem] text-[rgba(240,237,230,0.28)]'>
        Try selecting a different category
      </p>
      <button
        type='button'
        className='mt-2 text-[0.68rem] tracking-[0.18em] uppercase text-[#c9a84c] border border-[rgba(201,168,76,0.28)] px-5 py-2 hover:bg-[rgba(201,168,76,0.08)] transition-colors duration-200'
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        onClick={onReset}
      >
        Show All
      </button>
    </motion.div>
  );
}

// ─── WebinarShowcase ──────────────────────────────────────────────────────────
export default function WebinarShowcase({
  onWebinarSelect,
}: WebinarShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  // ── Derived: category counts ───────────────────────────────────────────────
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: WEBINARS.length };
    for (const w of WEBINARS) {
      c[w.category] = (c[w.category] ?? 0) + 1;
    }
    return c;
  }, []);

  // ── Derived: filtered list ─────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (activeCategory === 'all') return WEBINARS;
    return WEBINARS.filter((w) => w.category === activeCategory);
  }, [activeCategory]);

  // ── Split: featured (first live or first in list) + rest ──────────────────
  const featuredIndex = filtered.findIndex((w) => w.status === 'live');
  const featured = filtered[featuredIndex !== -1 ? featuredIndex : 0];
  const rest = filtered.filter((w) => w.id !== featured?.id);

  const handleCategoryChange = (id: string) => setActiveCategory(id);

  return (
    <section
      className='relative overflow-hidden bg-[#080a0f] text-[#f0ede6] pb-[120px]'
      aria-label='Webinar showcase'
    >
      {/* ── Blueprint grid background ──────────────────────────────────── */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-0 bg-grid'
      />

      {/* ── Gold ambient glow ──────────────────────────────────────────── */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute top-0 left-[10%] w-[600px] h-[300px] z-0'
        style={{
          background:
            'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── 1. Section header ──────────────────────────────────────────── */}
      <ShowcaseHeader
        filteredCount={filtered.length}
        totalCount={WEBINARS.length}
      />

      {/* ── 2. Stats strip ────────────────────────────────────────────── */}
      <StatsStrip />

      {/* ── 3. Category filter ────────────────────────────────────────── */}
      <motion.div
        className={['relative z-[2]', 'px-[60px] pb-10', 'max-md:px-6'].join(
          ' ',
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <CategoryFilter
          activeCategory={activeCategory}
          counts={counts}
          onChange={handleCategoryChange}
        />
      </motion.div>

      {/* ── Divider rule ──────────────────────────────────────────────── */}
      <div
        className='mx-[60px] mb-10 h-px max-md:mx-6'
        style={{
          background:
            'linear-gradient(90deg, rgba(201,168,76,0.2), rgba(201,168,76,0.06) 60%, transparent)',
        }}
      />

      {/* ── 4. Content grid ───────────────────────────────────────────── */}
      <div className='relative z-[2] px-[60px] max-md:px-6'>
        {filtered.length === 0 ? (
          <div className='grid'>
            <EmptyState onReset={() => setActiveCategory('all')} />
          </div>
        ) : (
          <div className='flex flex-col gap-8'>
            {/* Featured card — full width */}
            {featured && (
              <FeaturedSessionCard
                webinar={featured}
                onClick={onWebinarSelect}
              />
            )}

            {/* Rest — 3-col grid */}
            {rest.length > 0 && (
              <>
                {/* "More Sessions" sub-label */}
                <motion.div
                  className='flex items-center gap-3 mt-2'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className='w-5 h-px bg-gradient-to-r from-transparent to-[rgba(201,168,76,0.4)]' />
                  <span className='text-[0.6rem] tracking-[0.32em] uppercase text-[rgba(201,168,76,0.5)]'>
                    More Sessions
                  </span>
                  <span
                    className='flex-1 h-px'
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(201,168,76,0.15), transparent)',
                    }}
                  />
                </motion.div>

                <div
                  className={[
                    'grid gap-6',
                    'grid-cols-3',
                    'max-[1100px]:grid-cols-2',
                    'max-md:grid-cols-1',
                  ].join(' ')}
                >
                  {rest.map((webinar, i) => (
                    <SessionCard
                      key={webinar.id}
                      webinar={webinar}
                      index={i}
                      onClick={onWebinarSelect}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* ── 5. Bottom CTA ─────────────────────────────────────────────── */}
      <BottomCTA />
    </section>
  );
}
