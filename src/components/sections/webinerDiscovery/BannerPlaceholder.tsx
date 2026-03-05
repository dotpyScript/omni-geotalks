'use client';

import { BANNERS } from './data';

// ─── BannerPlaceholder Props ───────────────────────────────────────────────────

interface BannerPlaceholderProps {
  /** Index into the BANNERS config array */
  index: number;
}

// ─── BannerPlaceholder ─────────────────────────────────────────────────────────
// Renders a styled gradient banner with an icon, decorative SVG grid,
// and corner bracket marks. Used when no real image is available.

export function BannerPlaceholder({ index }: BannerPlaceholderProps) {
  const b = BANNERS[index % BANNERS.length];

  return (
    <div
      className='absolute inset-0 flex items-center justify-center'
      style={{ background: b.bg }}
      aria-hidden='true'
    >
      {/* Central emoji icon */}
      <span className='text-[3rem] opacity-[0.35] select-none pointer-events-none'>
        {b.icon}
      </span>

      {/* Decorative gold grid lines */}
      <svg
        className='absolute inset-0 w-full h-full opacity-[0.07]'
        viewBox='0 0 220 115'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        style={{ color: 'var(--gold)' }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={`v${i}`}
            x1={i * 44}
            y1='0'
            x2={i * 44}
            y2='115'
            stroke='currentColor'
            strokeWidth='0.5'
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`h${i}`}
            x1='0'
            y1={i * 38}
            x2='220'
            y2={i * 38}
            stroke='currentColor'
            strokeWidth='0.5'
          />
        ))}
      </svg>

      {/* Top-left corner bracket */}
      <span
        className='absolute top-[10px] left-[10px] w-[18px] h-[18px] border-t border-l'
        style={{
          borderColor: 'color-mix(in srgb, var(--gold) 40%, transparent)',
        }}
        aria-hidden='true'
      />

      {/* Bottom-right corner bracket */}
      <span
        className='absolute bottom-[10px] right-[10px] w-[18px] h-[18px] border-b border-r'
        style={{
          borderColor: 'color-mix(in srgb, var(--gold) 40%, transparent)',
        }}
        aria-hidden='true'
      />
    </div>
  );
}
