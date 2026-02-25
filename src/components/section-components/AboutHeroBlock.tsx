'use client';

import { useScrollReveal } from './useScrollReveal';
import { MANIFESTO } from '@/components/data/data';

// ─── AboutHeroBlock ────────────────────────────────────────────────────────────
// Full-width dramatic header:
//   - LEFT: giant vertically-running Bebas "ABOUT" rotated sideways + eyebrow + heading
//   - RIGHT: word-by-word manifesto reveal + glowing coordinate terminal
// Layout: obsidian base, gold accents, strong typographic hierarchy

export function AboutHeroBlock() {
  const [leftRef, leftVis] = useScrollReveal<HTMLDivElement>(0.1);
  const [rightRef, rightVis] = useScrollReveal<HTMLDivElement>(0.1);

  let wordIndex = 0;

  return (
    <div className='relative border-b border-[rgba(201,168,76,0.14)] overflow-hidden'>
      {/* ── Top horizontal rule with gradient ────────────────────────── */}
      <div
        aria-hidden='true'
        className='absolute top-0 left-0 right-0 h-px'
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 50%, transparent)',
        }}
      />

      {/* ── Blueprint grid background ──────────────────────────────────── */}
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-grid opacity-40 pointer-events-none'
      />

      {/* ── Ambient gold orb top-right ─────────────────────────────────── */}
      <div
        aria-hidden='true'
        className='absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 65%)',
        }}
      />

      <div className='grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] min-h-[640px]'>
        {/* ── SPINE: Vertical Bebas text ────────────────────────────────── */}
        <div
          className={[
            'relative hidden lg:flex items-center justify-center',
            'w-[80px] border-r border-[rgba(201,168,76,0.14)]',
            'bg-gradient-to-b from-[rgba(201,168,76,0.04)] to-transparent',
          ].join(' ')}
          aria-hidden='true'
        >
          <span
            className="font-['Bebas_Neue',sans-serif] text-[4.5rem] tracking-[0.25em] text-[rgba(201,168,76,0.12)]"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
            }}
          >
            IEGS
          </span>
          {/* Tick marks */}
          {[20, 35, 50, 65, 80].map((p) => (
            <span
              key={p}
              className='absolute right-0 w-2 h-px bg-[rgba(201,168,76,0.3)]'
              style={{ top: `${p}%` }}
            />
          ))}
        </div>

        {/* ── LEFT: Identity + eyebrow + title ─────────────────────────── */}
        <div
          ref={leftRef}
          className={[
            'relative flex flex-col justify-center',
            'px-12 py-20 lg:py-28 max-md:px-6 max-md:py-14',
            'border-r border-[rgba(201,168,76,0.14)] max-lg:border-r-0 max-lg:border-b',
            'transition-[opacity,transform] duration-[900ms] ease-out',
            leftVis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10',
          ].join(' ')}
        >
          {/* Eyebrow */}
          <div className='flex items-center gap-3 mb-8'>
            <span
              className='w-8 h-px bg-gradient-to-r from-transparent to-[#c9a84c]'
              aria-hidden='true'
            />
            <span className="text-[0.62rem] tracking-[0.4em] uppercase text-[#c9a84c] font-['DM_Sans',sans-serif]">
              Who We Are
            </span>
          </div>

          {/* Giant title — three stacked lines */}
          <div className='mb-10 overflow-hidden'>
            {[
              {
                text: "Africa's",
                style: 'text-[rgba(240,237,230,0.5)] font-light',
              },
              { text: 'Geospatial', style: 'text-[#e8c97e] italic' },
              { text: 'Intelligence Hub.', style: 'text-[#f0ede6] font-light' },
            ].map(({ text, style }, i) => (
              <div
                key={text}
                className='overflow-hidden'
                style={{ transitionDelay: `${i * 120 + 100}ms` }}
              >
                <h2
                  className={[
                    "font-['Cormorant_Garamond',serif] leading-[0.95]",
                    'text-[clamp(2.6rem,5.5vw,5rem)]',
                    style,
                    'transition-[opacity,transform] duration-[800ms] ease-out',
                    leftVis
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-full',
                  ].join(' ')}
                  style={{ transitionDelay: `${i * 120 + 100}ms` }}
                >
                  {text}
                </h2>
              </div>
            ))}
          </div>

          {/* Body paragraph */}
          <p
            className={[
              "text-[0.83rem] leading-[1.8] text-[rgba(240,237,230,0.5)] font-['DM_Sans',sans-serif] font-light",
              'max-w-[380px] mb-10',
              'transition-[opacity,transform] duration-[800ms] delay-[400ms] ease-out',
              leftVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            ].join(' ')}
          >
            The Institute for Emerging Geospatial Sciences connects Africa's
            practitioners, governments, energy companies and universities
            through world-class webinar education — built for Africa, by
            Africans, with purpose.
          </p>

          {/* Terminal-style metadata block */}
          <div
            className={[
              "font-['DM_Sans',sans-serif] text-[0.65rem] leading-[1.8]",
              'border border-[rgba(201,168,76,0.16)] bg-[rgba(8,10,15,0.7)]',
              'px-5 py-4 max-w-[300px]',
              'transition-[opacity,transform] duration-[800ms] delay-[500ms]',
              leftVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            ].join(' ')}
          >
            {[
              ['ENTITY', 'IEGS — Institute for Emerging Geospatial Sciences'],
              ['HQ', 'Port Harcourt, Rivers State, Nigeria'],
              ['COORDS', '4.8156°N · 7.0498°E'],
              ['FOUNDED', '2021'],
              ['STATUS', '● ACTIVE — PAN-AFRICAN'],
            ].map(([k, v]) => (
              <div key={k} className='flex gap-3'>
                <span className='text-[rgba(201,168,76,0.5)] w-[60px] flex-shrink-0'>
                  {k}
                </span>
                <span
                  className={
                    v.startsWith('●')
                      ? 'text-[#00e5a0]'
                      : 'text-[rgba(240,237,230,0.45)]'
                  }
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Manifesto + decorative SVG ────────────────────────── */}
        <div
          ref={rightRef}
          className={[
            'relative flex flex-col justify-center overflow-hidden',
            'px-12 py-20 lg:py-28 max-md:px-6 max-md:py-14',
            'bg-gradient-to-br from-[#0a0d14] to-[#080a0f]',
            'transition-[opacity] duration-[900ms] delay-200',
            rightVis ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        >
          {/* Background: large faint quote mark */}
          <span
            aria-hidden='true'
            className="absolute -top-8 -left-2 font-['Cormorant_Garamond',serif] text-[20rem] leading-none text-[rgba(201,168,76,0.025)] select-none pointer-events-none"
          >
            "
          </span>

          {/* Manifesto label */}
          <div
            className={[
              'flex items-center gap-3 mb-8',
              'transition-[opacity,transform] duration-700',
              rightVis
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-6',
            ].join(' ')}
          >
            <span className='w-6 h-px bg-[#c9a84c]' aria-hidden='true' />
            <span className="text-[0.6rem] tracking-[0.4em] uppercase text-[#c9a84c] font-['DM_Sans',sans-serif]">
              Mission Manifesto
            </span>
          </div>

          {/* Word-by-word manifesto */}
          <blockquote className='mb-10'>
            {MANIFESTO.map((line, li) => {
              const words = line.split(' ');
              return (
                <p
                  key={li}
                  className={[
                    "font-['Cormorant_Garamond',serif] italic font-light leading-[1.3]",
                    'text-[clamp(1.4rem,2.8vw,2rem)]',
                    li % 2 === 0
                      ? 'text-[rgba(240,237,230,0.85)]'
                      : 'text-[rgba(240,237,230,0.5)]',
                    li < MANIFESTO.length - 1 ? 'mb-1' : '',
                  ].join(' ')}
                >
                  {words.map((word) => {
                    const delay = wordIndex++ * 55 + 300;
                    return (
                      <span
                        key={`${li}-${word}`}
                        className='inline-block mr-[0.25em]'
                        style={{
                          opacity: rightVis ? 1 : 0,
                          transform: rightVis
                            ? 'translateY(0)'
                            : 'translateY(12px)',
                          transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
                        }}
                      >
                        {word}
                      </span>
                    );
                  })}
                </p>
              );
            })}
          </blockquote>

          {/* Decorative map grid SVG */}
          <div
            aria-hidden='true'
            className={[
              'absolute bottom-0 right-0 w-[280px] h-[280px] opacity-[0.07]',
              'transition-[opacity] duration-[1200ms] delay-[600ms]',
              rightVis ? 'opacity-[0.07]' : 'opacity-0',
            ].join(' ')}
          >
            <svg viewBox='0 0 280 280' className='w-full h-full'>
              {Array.from({ length: 7 }, (_, i) => (
                <line
                  key={`h${i}`}
                  x1='0'
                  y1={i * 40}
                  x2='280'
                  y2={i * 40}
                  stroke='#c9a84c'
                  strokeWidth='0.6'
                  strokeDasharray='3 7'
                />
              ))}
              {Array.from({ length: 7 }, (_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * 40}
                  y1='0'
                  x2={i * 40}
                  y2='280'
                  stroke='#c9a84c'
                  strokeWidth='0.6'
                  strokeDasharray='3 7'
                />
              ))}
              <circle cx='180' cy='90' r='5' fill='#c9a84c' />
              <circle
                cx='180'
                cy='90'
                r='14'
                fill='none'
                stroke='#c9a84c'
                strokeWidth='0.8'
                opacity='0.4'
              />
              <circle
                cx='180'
                cy='90'
                r='26'
                fill='none'
                stroke='#c9a84c'
                strokeWidth='0.4'
                opacity='0.2'
              />
              {/* Crosshair */}
              <line
                x1='168'
                y1='90'
                x2='192'
                y2='90'
                stroke='#c9a84c'
                strokeWidth='0.8'
              />
              <line
                x1='180'
                y1='78'
                x2='180'
                y2='102'
                stroke='#c9a84c'
                strokeWidth='0.8'
              />
              {/* Bracket corners */}
              <path
                d='M 0 20 L 0 0 L 20 0'
                fill='none'
                stroke='#c9a84c'
                strokeWidth='1.5'
              />
              <path
                d='M 260 0 L 280 0 L 280 20'
                fill='none'
                stroke='#c9a84c'
                strokeWidth='1.5'
              />
              <path
                d='M 0 260 L 0 280 L 20 280'
                fill='none'
                stroke='#c9a84c'
                strokeWidth='1.5'
              />
              <path
                d='M 260 280 L 280 280 L 280 260'
                fill='none'
                stroke='#c9a84c'
                strokeWidth='1.5'
              />
            </svg>
          </div>

          {/* Closing attribution */}
          <div
            className={[
              'flex items-center gap-3',
              'transition-[opacity,transform] duration-700 delay-[900ms]',
              rightVis
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-4',
            ].join(' ')}
          >
            <span
              className='w-8 h-px bg-gradient-to-r from-[#c9a84c] to-transparent'
              aria-hidden='true'
            />
            <cite className="not-italic text-[0.6rem] tracking-[0.3em] uppercase text-[rgba(240,237,230,0.28)] font-['DM_Sans',sans-serif]">
              IEGS · Est. 2021 · Port Harcourt
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}
