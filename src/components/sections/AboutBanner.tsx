'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Globe } from 'lucide-react';
import Link from 'next/link';

/**
 * AboutBanner — slim strip linking to Indepth Earth (indepthearth.com)
 * The company behind IEGS. Clean identity strip, no heavy copy.
 */
export function AboutBanner() {
  return (
    <section
      className='relative overflow-hidden'
      style={{
        background: 'var(--obsidian-2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Blueprint grid */}
      <div className='absolute inset-0 bg-grid opacity-50 pointer-events-none' aria-hidden />

      {/* Teal left-edge accent */}
      <div
        className='absolute left-0 top-0 bottom-0 w-0.5 pointer-events-none'
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--teal), transparent)',
        }}
        aria-hidden
      />

      {/* Navy glow right */}
      <div
        className='absolute -right-24 top-1/2 -translate-y-1/2 w-[300px] h-[160px] rounded-full blur-[80px] pointer-events-none'
        style={{
          background: 'radial-gradient(ellipse, var(--navy-glow) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-5'>

        {/* Left — "powered by" label + brand name */}
        <motion.div
          className='flex items-center gap-5'
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {/* Vertical rule + eyebrow */}
          <div className='flex items-center gap-3'>
            <span
              className='hidden sm:block w-px h-8 shrink-0'
              style={{
                background: 'linear-gradient(to bottom, transparent, var(--teal), transparent)',
              }}
            />
            <div className='flex flex-col gap-0.5'>
              <span
                className='text-[0.52rem] tracking-[0.36em] uppercase'
                style={{ color: 'var(--teal-light)' }}
              >
                Powered & Organised By
              </span>
              <div className='flex items-center gap-2'>
                {/* IE monogram badge */}
                <span
                  className='inline-flex items-center justify-center w-6 h-6 text-[0.55rem] font-semibold tracking-widest shrink-0'
                  style={{
                    background: 'var(--navy-dim)',
                    border: '1px solid var(--border-mid)',
                    color: 'var(--navy-light)',
                    fontFamily: 'var(--font-bebas)',
                    letterSpacing: '0.05em',
                  }}
                >
                  IE
                </span>
                <span
                  className='font-display text-xl tracking-tight leading-none'
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 600,
                    color: 'var(--ivory)',
                  }}
                >
                  Indepth Earth
                </span>
                <span
                  className='hidden md:inline text-[0.58rem] tracking-[0.2em] uppercase px-2 py-0.5'
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--ivory-muted)',
                    background: 'var(--navy-dim)',
                  }}
                >
                  Geospatial Services
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center — thin divider line (desktop only) */}
        <motion.div
          className='hidden lg:block flex-1 mx-6'
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          style={{ transformOrigin: 'left' }}
        >
          <div
            className='h-px w-full'
            style={{
              background: 'linear-gradient(to right, var(--border), var(--border-mid), transparent)',
            }}
          />
        </motion.div>

        {/* Right — short copy + CTA */}
        <motion.div
          className='flex items-center gap-6'
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
        >
          <p
            className='hidden md:block text-[0.72rem] leading-[1.6] text-right max-w-[260px]'
            style={{ color: 'var(--ivory-dim)' }}
          >
            Africa&rsquo;s premier geospatial services firm — the minds and
            infrastructure behind every IEGS session.
          </p>

          <Link
            href='https://indepthearth.com'
            target='_blank'
            rel='noopener noreferrer'
            className='group flex items-center gap-2.5 shrink-0 transition-all duration-200'
            style={{ textDecoration: 'none' }}
          >
            <span
              className='flex items-center gap-2 px-4 py-2 text-[0.62rem] tracking-[0.2em] uppercase font-medium transition-all duration-200 group-hover:border-opacity-80'
              style={{
                border: '1px solid var(--border-mid)',
                background: 'var(--navy-dim)',
                color: 'var(--navy-light)',
                fontFamily: 'var(--font-dm)',
              }}
            >
              <Globe size={10} />
              More About Us
            </span>
            <span
              className='flex items-center justify-center w-7 h-7 transition-all duration-200 group-hover:scale-110'
              style={{
                border: '1px solid var(--border-mid)',
                background: 'var(--teal-dim)',
                color: 'var(--teal-light)',
              }}
            >
              <ArrowUpRight size={13} />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom scan line */}
      <motion.div
        className='absolute bottom-0 left-0 h-px pointer-events-none'
        style={{
          background: 'linear-gradient(to right, var(--teal-dim), var(--teal), transparent)',
        }}
        initial={{ width: '0%' }}
        whileInView={{ width: '60%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        aria-hidden
      />
    </section>
  );
}

export default AboutBanner;
