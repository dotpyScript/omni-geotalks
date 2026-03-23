'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import RegistrationForm from './RegistrationForm';
import SocialProofStrip from './SocialProofStrip';
import { DIAMONDS, TRUST_ITEMS } from './constants';

export default function CTASection() {
  return (
    <section
      className='relative overflow-hidden font-dm'
      style={{
        background:
          'linear-gradient(180deg, var(--obsidian-4) 0%, var(--obsidian-3) 50%, var(--obsidian-4) 100%)',
      }}
    >
      {/* Top gold rule */}
      <div
        className='w-full h-px opacity-30'
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--gold) 20%, var(--gold) 80%, transparent 100%)',
        }}
      />

      {/* Dramatic gradient flood — theme-aware via CSS vars */}
      <div
        className='absolute inset-0 z-0 pointer-events-none'
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 110%, var(--gold-glow) 0%, transparent 65%)',
            'radial-gradient(ellipse 50% 40% at 20% 50%, var(--cyan-dim) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 30% at 80% 30%, var(--gold-dim) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* Cross-hatch grid */}
      <div className='absolute inset-0 z-0 pointer-events-none bg-grid' />

      {/* Floating decorative diamonds */}
      {DIAMONDS.map((d, i) => (
        <div
          key={i}
          className='absolute z-1 pointer-events-none w-2 h-2 bg-(--gold) opacity-15 animate-diamond-float'
          style={{
            top: d.top,
            left: d.left,
            animationDelay: d.delay,
            transform: 'rotate(45deg)',
          }}
        />
      ))}

      {/* ── Inner grid ──────────────────────────────────────────────────── */}
      <div
        className={[
          'relative z-2',
          'pt-27.5 pb-25 px-15',
          'grid grid-cols-[1.1fr_1fr] gap-20 items-center',
          'max-[1100px]:grid-cols-1 max-[1100px]:gap-15 max-[1100px]:px-10 max-[1100px]:py-20',
          'max-md:pt-15 max-md:pb-15 max-md:px-6',
        ].join(' ')}
      >
        {/* ── Left copy ───────────────────────────────────────────────── */}
        <div>
          {/* Eyebrow */}
          <motion.div
            className='eyebrow mb-6'
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          >
            <span className='eyebrow-text'>Limited Seats Available</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className={[
              'font-cormorant font-light leading-[1.04] text-(--ivory)',
              'text-[clamp(2.8rem,5vw,5rem)] mb-2',
            ].join(' ')}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Secure Your
            <em className='italic text-(--gold-light) block'>Place Among</em>
            <strong className='font-semibold block text-gold-gradient'>
              the Elite.
            </strong>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className='text-[0.9rem] leading-[1.7] text-(--ivory-dim) font-light max-w-115 mt-7 mb-11'
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          >
            IEGS webinars are not open to the general public. Each session is
            curated for professionals who shape policy, lead organisations, and
            drive geospatial innovation across Africa and beyond. Your seat
            matters — reserve it before it&apos;s gone.
          </motion.p>

          {/* Actions */}
          <motion.div
            className='flex items-center gap-4.5 flex-wrap'
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48, ease: 'easeOut' }}
          >
            {/* Primary CTA — fixed dark text on gold */}

            <Link
              href='/webinars'
              className={[
                'group/primary',
                'inline-flex items-center gap-3',
                'text-[0.8rem] tracking-[0.2em] uppercase',
                'text-obsidian bg-linear-to-br from-(--gold) to-(--gold-light)',
                'border-none px-10 py-4.5 cursor-pointer',
                'font-dm font-medium clip-bevel-lg',
                'relative overflow-hidden',
                'transition-all duration-300',
                'hover:-translate-y-0.5 hover:shadow-[0_14px_40px_var(--gold-glow)]',
              ].join(' ')}
            >
              <span
                className={[
                  'absolute inset-0 pointer-events-none',
                  'bg-linear-to-br from-white/20 to-transparent',
                  'opacity-0 transition-opacity duration-300',
                  'group-hover/primary:opacity-100',
                ].join(' ')}
              />
              Browse All Webinars
              <span className='transition-transform duration-250 group-hover/primary:translate-x-1'>
                →
              </span>
            </Link>

            {/* Ghost button */}
            {/* <button
              className={[
                "inline-flex items-center gap-2.5",
                "text-[0.75rem] tracking-[0.15em] uppercase",
                "text-(--ivory-dim) bg-transparent",
                "border border-(--border) px-7.5 py-4.25",
                "cursor-pointer font-dm",
                "transition-all duration-300",
                "hover:border-(--border-mid) hover:text-(--ivory) hover:bg-(--gold-dim)",
              ].join(" ")}
            >
              Browse All Webinars
            </button> */}
          </motion.div>

          {/* Trust signals */}
          <motion.div
            className={[
              'flex items-center gap-6 flex-wrap',
              'mt-10 pt-8 border-t border-(--border)',
              'max-md:flex-col max-md:items-start max-md:gap-3',
            ].join(' ')}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            {TRUST_ITEMS.map((t) => (
              <div
                key={t}
                className='flex items-center gap-2 text-[0.68rem] tracking-widest text-(--ivory-muted)'
              >
                <span
                  className={[
                    'inline-flex items-center justify-center',
                    'w-4 h-4 shrink-0',
                    'bg-(--gold-dim) border border-(--border-mid)',
                    'text-(--gold) text-[0.55rem]',
                  ].join(' ')}
                >
                  ✓
                </span>
                {t}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: registration card ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
        >
          <RegistrationForm />
        </motion.div>
      </div>

      {/* Social proof strip */}
      <SocialProofStrip />
    </section>
  );
}
