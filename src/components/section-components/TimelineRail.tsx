'use client';

import { useScrollReveal } from './useScrollReveal';
import { TIMELINE } from '@/components/data/data';
import type { TimelineItem } from '@/components/types/types';

interface TimelineRailProps {
  items?: TimelineItem[];
}

// ─── TimelineRail ──────────────────────────────────────────────────────────────
// A vertical timeline rail with:
//   - Left: giant Bebas year stamps
//   - Centre: animated connecting rail line that draws down
//   - Right: card content with subtle hover
// Accent items get gold treatment; others are muted.

export function TimelineRail({ items = TIMELINE }: TimelineRailProps) {
  const [ref, vis] = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <div ref={ref}>
      {/* Section header */}
      <div
        className={[
          'flex items-center gap-4 mb-14',
          'transition-[opacity,transform] duration-700',
          vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ].join(' ')}
      >
        <span
          aria-hidden='true'
          className='w-8 h-px bg-gradient-to-r from-transparent to-[#c9a84c]'
        />
        <span className="text-[0.68rem] tracking-[0.4em] uppercase text-[#c9a84c] font-['DM_Sans',sans-serif]">
          Our Journey
        </span>
        <span
          aria-hidden='true'
          className='flex-1 h-px bg-gradient-to-r from-[rgba(201,168,76,0.3)] to-transparent'
        />
      </div>

      {/* Timeline */}
      <div className='relative'>
        {/* The vertical rail line */}
        <div
          aria-hidden='true'
          className='absolute left-[140px] top-0 bottom-0 w-px max-md:left-[70px]'
          style={{ background: 'rgba(201,168,76,0.1)' }}
        >
          <div
            className='w-full bg-gradient-to-b from-[#c9a84c] via-[rgba(201,168,76,0.4)] to-transparent origin-top transition-[transform] duration-[1400ms] delay-200 ease-out'
            style={{
              height: '100%',
              transform: vis ? 'scaleY(1)' : 'scaleY(0)',
            }}
          />
        </div>

        {/* Items */}
        {items.map((item, i) => (
          <div
            key={item.year}
            style={{ transitionDelay: `${i * 160 + 100}ms` }}
            className={[
              'group relative flex items-start gap-0',
              'mb-0',
              i < items.length - 1 ? 'mb-0' : '',
              'transition-[opacity,transform] duration-700 ease-out',
              vis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6',
            ].join(' ')}
          >
            {/* Year column */}
            <div
              className={[
                'flex-shrink-0 w-[140px] max-md:w-[70px]',
                'flex flex-col items-end pr-6 pt-1',
              ].join(' ')}
            >
              <span
                className={[
                  "font-['Bebas_Neue',sans-serif] leading-none tracking-[0.03em]",
                  'text-[clamp(1.8rem,3.5vw,2.8rem)]',
                  'transition-colors duration-300',
                  item.isAccent
                    ? 'text-[#c9a84c] group-hover:text-[#e8c97e]'
                    : 'text-[rgba(201,168,76,0.25)] group-hover:text-[rgba(201,168,76,0.5)]',
                ].join(' ')}
              >
                {item.year}
              </span>
            </div>

            {/* Node on rail */}
            <div
              className='relative flex-shrink-0 flex flex-col items-center'
              style={{ width: '0px' }}
            >
              <div
                className={[
                  'w-[12px] h-[12px] rounded-full mt-[5px] -translate-x-1/2 z-10',
                  'border-2 transition-[background,border-color,box-shadow] duration-300',
                  item.isAccent
                    ? 'border-[#c9a84c] bg-[#080a0f] group-hover:bg-[#c9a84c] group-hover:shadow-[0_0_14px_rgba(201,168,76,0.6)]'
                    : 'border-[rgba(201,168,76,0.25)] bg-[#080a0f] group-hover:border-[rgba(201,168,76,0.5)]',
                ].join(' ')}
              />
            </div>

            {/* Content card */}
            <div
              className={[
                'flex-1 ml-8 mb-10 max-md:ml-5',
                'p-6 border',
                'transition-[border-color,background,box-shadow] duration-300',
                item.isAccent
                  ? 'border-[rgba(201,168,76,0.2)] bg-gradient-to-br from-[#0d1118] to-[#12161f] group-hover:border-[rgba(201,168,76,0.4)] group-hover:shadow-[0_0_30px_rgba(201,168,76,0.07)]'
                  : 'border-[rgba(201,168,76,0.08)] bg-[rgba(13,17,24,0.4)] group-hover:border-[rgba(201,168,76,0.2)]',
                'relative overflow-hidden',
              ].join(' ')}
            >
              {/* Accent items get a gold top rule */}
              {item.isAccent && (
                <span
                  aria-hidden='true'
                  className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#c9a84c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                />
              )}

              <h4
                className={[
                  "font-['Cormorant_Garamond',serif] font-normal leading-[1.2] mb-3",
                  'text-[1.15rem]',
                  item.isAccent
                    ? 'text-[#f0ede6] group-hover:text-[#f5e6c0]'
                    : 'text-[rgba(240,237,230,0.7)]',
                  'transition-colors duration-300',
                ].join(' ')}
              >
                {item.heading}
              </h4>
              <p className="text-[0.75rem] leading-[1.7] text-[rgba(240,237,230,0.38)] font-['DM_Sans',sans-serif] font-light">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
