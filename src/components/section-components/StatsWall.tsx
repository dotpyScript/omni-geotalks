'use client';

import { CountUp } from './CountUp';
import { useScrollReveal } from './useScrollReveal';
import { STATS } from '@/components/data/data';
import type { StatItem } from '@/components/types/types';

interface StatsWallProps {
  stats?: StatItem[];
}

// ─── StatsWall ─────────────────────────────────────────────────────────────────
// Four dramatic stat blocks. Each has:
//   - A huge Bebas counter (counts up on scroll entry)
//   - A thin coloured accent line matching the stat's accent color
//   - A label + caption below
//   - Hover: entire cell lifts with gold border + inner glow
// Layout: 2×2 grid on mobile, 4 across on desktop
// Separator: a thin gold diagonal diamond midpoint separator between each cell

export function StatsWall({ stats = STATS }: StatsWallProps) {
  const [ref, vis] = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className={[
        'relative border-b border-[rgba(201,168,76,0.14)] overflow-hidden',
        'transition-[opacity] duration-700',
        vis ? 'opacity-100' : 'opacity-0',
      ].join(' ')}
    >
      {/* Large faint background number — purely decorative */}
      <div
        aria-hidden='true'
        className='absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden'
      >
        <span className="font-['Bebas_Neue',sans-serif] text-[28vw] leading-none text-[rgba(201,168,76,0.018)] select-none tracking-[0.05em]">
          IMPACT
        </span>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat, i) => (
          <div
            key={stat.id}
            style={{ transitionDelay: `${i * 100}ms` }}
            className={[
              'group relative flex flex-col',
              'px-8 py-12 lg:px-10 lg:py-14',
              // Borders
              'border-r border-[rgba(201,168,76,0.14)]',
              'even:border-r-0 lg:even:border-r lg:[&:last-child]:border-r-0',
              // Bottom border for top row on mobile
              i < 2
                ? 'border-b border-[rgba(201,168,76,0.14)] lg:border-b-0'
                : '',
              // Hover
              'cursor-default',
              'transition-[background,transform] duration-300',
              'hover:bg-[rgba(201,168,76,0.03)]',
              // Reveal
              'transition-[opacity,transform] duration-700 ease-out',
              vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            ].join(' ')}
          >
            {/* Accent top-line (stat's own color) */}
            <div
              className='absolute top-0 left-0 right-0 h-[2px] origin-left transition-transform duration-500'
              style={{
                background: `linear-gradient(90deg, ${stat.accentColor ?? '#c9a84c'}, transparent)`,
                transform: vis ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: `${i * 100 + 300}ms`,
              }}
              aria-hidden='true'
            />

            {/* Corner brackets on hover */}
            <span
              aria-hidden='true'
              className='absolute top-3 left-3 w-4 h-4 border-t border-l border-[rgba(201,168,76,0.3)]
                opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            />
            <span
              aria-hidden='true'
              className='absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[rgba(201,168,76,0.3)]
                opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            />

            {/* The counter */}
            <div className='mb-4 leading-none'>
              <CountUp
                to={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                duration={2000}
                className={[
                  "font-['Bebas_Neue',sans-serif]",
                  'text-[clamp(3.5rem,7vw,6rem)]',
                  'tracking-[0.02em] leading-none',
                  'transition-colors duration-300',
                ].join(' ')}
              />
            </div>

            {/* Thin divider */}
            <div
              className='w-8 h-px mb-4'
              style={{ background: stat.accentColor ?? '#c9a84c' }}
              aria-hidden='true'
            />

            {/* Label */}
            <div className="text-[0.78rem] tracking-[0.15em] uppercase text-[#f0ede6] font-['DM_Sans',sans-serif] mb-1.5">
              {stat.label}
            </div>
            {/* Caption */}
            <div className="text-[0.64rem] tracking-[0.08em] text-[rgba(240,237,230,0.28)] font-['DM_Sans',sans-serif] font-light">
              {stat.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
