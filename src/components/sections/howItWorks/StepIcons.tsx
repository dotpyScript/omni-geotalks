'use client';
import { JSX } from 'react';

// ─── SVG Icons per step ───────────────────────────────────────────────────────
// All stroke/fill colors reference CSS vars so they update automatically
// when the data-theme toggles between dark and light.
export const StepIcons: Record<string, JSX.Element> = {
  browse: (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      strokeWidth='1.3'
      strokeLinecap='round'
      strokeLinejoin='round'
      style={{ stroke: 'var(--gold)' }}
    >
      <circle cx='14' cy='14' r='9' />
      <line x1='21' y1='21' x2='28' y2='28' />
      <line x1='10' y1='14' x2='18' y2='14' />
      <line x1='14' y1='10' x2='14' y2='18' />
    </svg>
  ),

  filter: (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      strokeWidth='1.3'
      strokeLinecap='round'
      strokeLinejoin='round'
      style={{ stroke: 'var(--gold)' }}
    >
      <line x1='4' y1='8' x2='28' y2='8' />
      <line x1='8' y1='16' x2='24' y2='16' />
      <line x1='12' y1='24' x2='20' y2='24' />
    </svg>
  ),

  register: (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      strokeWidth='1.3'
      strokeLinecap='round'
      strokeLinejoin='round'
      style={{ stroke: 'var(--gold)' }}
    >
      <rect x='5' y='4' width='22' height='28' rx='1' />
      <line x1='10' y1='12' x2='22' y2='12' />
      <line x1='10' y1='17' x2='22' y2='17' />
      <line x1='10' y1='22' x2='16' y2='22' />
      {/* Green confirmation badge — own color token */}
      <circle
        cx='24'
        cy='24'
        r='5'
        style={{ fill: 'var(--green-dim)', stroke: 'var(--green)' }}
        strokeWidth='1.3'
      />
      <polyline
        points='21.5,24 23,25.5 26.5,22'
        style={{ stroke: 'var(--green)' }}
        strokeWidth='1.3'
      />
    </svg>
  ),

  email: (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      strokeWidth='1.3'
      strokeLinecap='round'
      strokeLinejoin='round'
      style={{ stroke: 'var(--gold)' }}
    >
      <rect x='3' y='7' width='26' height='18' rx='1' />
      <polyline points='3,7 16,18 29,7' />
      <line x1='3' y1='25' x2='11' y2='17' />
      <line x1='29' y1='25' x2='21' y2='17' />
    </svg>
  ),

  join: (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      strokeWidth='1.3'
      strokeLinecap='round'
      strokeLinejoin='round'
      style={{ stroke: 'var(--green)' }}
    >
      <circle cx='16' cy='16' r='12' />
      <polygon
        points='13,11 23,16 13,21'
        style={{ fill: 'var(--green-dim)', stroke: 'var(--green)' }}
        strokeWidth='1.3'
      />
    </svg>
  ),
};
