'use client';

import { useLayoutEffect, useState } from 'react';

// ─── useTheme ─────────────────────────────────────────────────────────────────
// Manages theme state, persists to localStorage, and reflects onto
// <html data-theme="light|dark"> so globals.css cascades automatically.
// Combines both state values into one setState call to avoid cascading renders.
export function useTheme() {
  const [{ isLight, mounted }, setTheme] = useState({
    isLight: false,
    mounted: false,
  });

  useLayoutEffect(() => {
    const saved = localStorage.getItem('theme') ?? 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    setTheme({ isLight: saved === 'light', mounted: true }); // single call — no cascade
  }, []);

  const toggle = () => {
    const next = !isLight;
    document.documentElement.setAttribute('data-theme', next ? 'light' : 'dark');
    localStorage.setItem('theme', next ? 'light' : 'dark');
    setTheme({ isLight: next, mounted: true });
  };

  return { isLight, toggle, mounted };
}

// ─── ThemeToggleButton ────────────────────────────────────────────────────────
// Pure presentational component — owns no state.
// Usage:
//   const { isLight, toggle, mounted } = useTheme();
//   {mounted && <ThemeToggleButton isLight={isLight} onToggle={toggle} />}
export function ThemeToggleButton({
  isLight,
  onToggle,
}: {
  isLight: boolean;
  onToggle: () => void;
}) {
  const ticks = [18, 27, 37, 46];

  return (
    <div className='inline-flex items-center gap-2.5'>
      {/* Mode label */}
      <span
        className='font-bebas text-[0.7rem] tracking-[0.24em] uppercase min-w-9 text-center select-none transition-colors duration-300'
        style={{ color: 'var(--gold-light)' }}
      >
        {isLight ? 'Light' : 'Dark'}
      </span>

      {/* Track */}
      <button
        role='switch'
        aria-checked={isLight}
        aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
        onClick={onToggle}
        className='relative w-14 h-7 rounded-full cursor-pointer outline-none transition-all duration-300'
        style={{
          background: isLight
            ? 'linear-gradient(135deg, var(--obsidian-3), var(--obsidian-4))'
            : 'linear-gradient(135deg, var(--obsidian-2), var(--obsidian-3))',
          border: '1px solid var(--border-mid)',
          boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.35)',
        }}
      >
        {/* Top sheen */}
        <span
          className='absolute inset-0 rounded-full pointer-events-none'
          style={{
            background: 'linear-gradient(180deg, var(--navy-glow) 0%, transparent 55%)',
            zIndex: 3,
          }}
        />

        {/* Glow halo behind thumb */}
        <span
          className='absolute top-1/2 left-0.75 w-5.5 h-5.5 rounded-full pointer-events-none'
          style={{
            transform: `translateY(-50%) translateX(${isLight ? '28px' : '0px'})`,
            transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            background: isLight
              ? 'radial-gradient(circle, var(--teal-glow) 0%, transparent 70%)'
              : 'radial-gradient(circle, var(--navy-glow) 0%, transparent 70%)',
            zIndex: 1,
          }}
        />

        {/* Tick marks */}
        {ticks.map((x) => (
          <span
            key={x}
            className='absolute top-1/2 -translate-y-1/2 w-px h-1.25 rounded-sm pointer-events-none transition-colors duration-300'
            style={{
              left: `${x}%`,
              background: 'var(--border-mid)',
              zIndex: 1,
            }}
          />
        ))}

        {/* Thumb */}
        <span
          className='absolute top-0.75 left-0.75 w-5.5 h-5.5 rounded-full flex items-center justify-center'
          style={{
            transform: `translateX(${isLight ? '28px' : '0px'})`,
            transition:
              'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease, box-shadow 0.3s ease',
            background: isLight
              ? 'linear-gradient(145deg, var(--teal), var(--teal-mid))'
              : 'linear-gradient(145deg, var(--navy-mid), var(--navy))',
            border: '1px solid var(--border-hi)',
            boxShadow: isLight
              ? '0 2px 8px var(--teal-glow), 0 0 10px var(--teal-glow)'
              : '0 2px 8px var(--navy-glow), 0 0 10px var(--navy-glow)',
            zIndex: 2,
          }}
        >
          {/* Moon icon — visible in dark mode */}
          <svg
            viewBox='0 0 24 24'
            fill='none'
            className='absolute w-3 h-3 transition-all duration-300'
            style={{
              opacity: isLight ? 0 : 1,
              transform: isLight ? 'rotate(50deg) scale(0.65)' : 'rotate(0deg) scale(1)',
              color: 'var(--navy-pale)',
            }}
          >
            <path
              d='M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z'
              fill='currentColor'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          {/* Sun icon — visible in light mode */}
          <svg
            viewBox='0 0 24 24'
            fill='none'
            className='absolute w-3 h-3 transition-all duration-300'
            style={{
              opacity: isLight ? 1 : 0,
              transform: isLight ? 'rotate(0deg) scale(1)' : 'rotate(-50deg) scale(0.65)',
              color: 'var(--teal-pale)',
            }}
          >
            <circle cx='12' cy='12' r='4' fill='currentColor' />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
              const rad = (a * Math.PI) / 180;
              return (
                <line
                  key={a}
                  x1={12 + 5.5 * Math.cos(rad)}
                  y1={12 + 5.5 * Math.sin(rad)}
                  x2={12 + 8.5 * Math.cos(rad)}
                  y2={12 + 8.5 * Math.sin(rad)}
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              );
            })}
          </svg>
        </span>
      </button>
    </div>
  );
}
