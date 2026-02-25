'use client';

import { useScrollReveal } from './useScrollReveal';
import { PILLARS } from '@/components/data/data';
import type { PillarItem } from '@/components/types/types';

interface PillarsGridProps {
  pillars?: PillarItem[];
}

// ─── PillarIcon ────────────────────────────────────────────────────────────────

function PillarIcon({ num }: { num: string }) {
  const icons: Record<string, React.ReactNode> = {
    I: (
      <svg
        viewBox='0 0 40 40'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
        className='w-8 h-8'
      >
        <circle cx='20' cy='20' r='14' />
        <ellipse cx='20' cy='20' rx='6' ry='14' />
        <line x1='6' y1='20' x2='34' y2='20' />
        <line x1='8' y1='13' x2='32' y2='13' />
        <line x1='8' y1='27' x2='32' y2='27' />
      </svg>
    ),
    II: (
      <svg
        viewBox='0 0 40 40'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
        className='w-8 h-8'
      >
        <rect x='5' y='5' width='13' height='13' />
        <rect x='22' y='5' width='13' height='13' />
        <rect x='5' y='22' width='13' height='13' />
        <rect x='22' y='22' width='13' height='13' />
        <line x1='18' y1='11.5' x2='22' y2='11.5' strokeOpacity='0.4' />
        <line x1='11.5' y1='18' x2='11.5' y2='22' strokeOpacity='0.4' />
        <circle cx='28.5' cy='28.5' r='3' fill='rgba(201,168,76,0.2)' />
      </svg>
    ),
    III: (
      <svg
        viewBox='0 0 40 40'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
        className='w-8 h-8'
      >
        <circle cx='12' cy='13' r='5' />
        <circle cx='28' cy='13' r='5' />
        <circle cx='20' cy='28' r='5' />
        <line x1='16' y1='16' x2='19' y2='23.5' />
        <line x1='24' y1='16' x2='21' y2='23.5' />
        <line x1='17' y1='13' x2='23' y2='13' />
      </svg>
    ),
  };
  return <>{icons[num] ?? null}</>;
}

// ─── PillarsGrid ───────────────────────────────────────────────────────────────
// Three pillars in a 3-column layout with Roman numeral icons and
// a large faint index watermark. Hover shows an inner glow matching
// the brand palette and reveals bottom accent line.

export function PillarsGrid({ pillars = PILLARS }: PillarsGridProps) {
  const [ref, vis] = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <div ref={ref}>
      {/* Section header */}
      <div
        className={[
          'flex items-center gap-4 mb-12',
          'transition-[opacity,transform] duration-700',
          vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ].join(' ')}
      >
        <span
          aria-hidden='true'
          className='w-8 h-px bg-gradient-to-r from-transparent to-[#c9a84c]'
        />
        <span className="text-[0.68rem] tracking-[0.4em] uppercase text-[#c9a84c] font-['DM_Sans',sans-serif]">
          What Drives Us
        </span>
        <span
          aria-hidden='true'
          className='flex-1 h-px bg-gradient-to-r from-[rgba(201,168,76,0.3)] to-transparent'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(201,168,76,0.08)]'>
        {pillars.map((p, i) => (
          <div
            key={p.num}
            style={{ transitionDelay: `${i * 130}ms` }}
            className={[
              'group relative flex flex-col overflow-hidden',
              'bg-[#080a0f] p-8 lg:p-10',
              'cursor-default',
              'transition-[opacity,transform] duration-700 ease-out',
              vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            ].join(' ')}
          >
            {/* Hover background glow */}
            <div
              aria-hidden='true'
              className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
              style={{
                background:
                  'radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.06) 0%, transparent 65%)',
              }}
            />

            {/* Large faint Roman numeral watermark */}
            <span
              aria-hidden='true'
              className="absolute top-4 right-5 font-['Bebas_Neue',sans-serif] text-[5rem] leading-none text-[rgba(201,168,76,0.06)] select-none tracking-[0.05em]"
            >
              {p.num}
            </span>

            {/* Icon box */}
            <div
              className={[
                'relative z-[1] inline-flex items-center justify-center',
                'w-14 h-14 mb-6 flex-shrink-0',
                'border border-[rgba(201,168,76,0.16)] bg-[rgba(8,10,15,0.8)]',
                'text-[#c9a84c]',
                'transition-[border-color,background,color] duration-300',
                'group-hover:border-[rgba(201,168,76,0.4)] group-hover:bg-[rgba(201,168,76,0.07)] group-hover:text-[#e8c97e]',
              ].join(' ')}
            >
              <PillarIcon num={p.num} />
            </div>

            {/* Tag pill */}
            <div className='relative z-[1] mb-4'>
              <span className="text-[0.58rem] tracking-[0.25em] uppercase text-[rgba(201,168,76,0.5)] font-['DM_Sans',sans-serif] border border-[rgba(201,168,76,0.14)] px-2.5 py-1">
                {p.tag}
              </span>
            </div>

            {/* Heading */}
            <h3
              className={[
                "relative z-[1] font-['Cormorant_Garamond',serif] font-normal leading-[1.2]",
                'text-[1.35rem] text-[#f0ede6] mb-4',
                'transition-colors duration-300 group-hover:text-[#f5e6c0]',
              ].join(' ')}
            >
              {p.heading}
            </h3>

            {/* Body */}
            <p className="relative z-[1] text-[0.77rem] leading-[1.75] text-[rgba(240,237,230,0.4)] font-['DM_Sans',sans-serif] font-light">
              {p.body}
            </p>

            {/* Bottom accent bar — slides in on hover */}
            <span
              aria-hidden='true'
              className='absolute bottom-0 left-0 right-0 h-[2px] origin-left
                bg-gradient-to-r from-[#c9a84c] to-transparent
                scale-x-0 group-hover:scale-x-100
                transition-transform duration-500 ease-out'
            />

            {/* Corner bracket top-right */}
            <span
              aria-hidden='true'
              className='absolute top-4 right-4 w-4 h-4 border-t border-r border-[rgba(201,168,76,0.25)]
                opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-300
                translate-y-1 group-hover:translate-y-0'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
