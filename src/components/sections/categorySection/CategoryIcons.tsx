'use client';

import type { IconKey } from './types';
import type { ReactElement } from 'react';

// ─── Base icon props ───────────────────────────────────────────────────────────
interface IconProps {
  /** Tailwind size class applied to the wrapping svg, e.g. "w-6 h-6" */
  className?: string;
}

// ─── Individual Icons ──────────────────────────────────────────────────────────

export function GisIcon({ className = 'w-[26px] h-[26px]' }: IconProps) {
  return (
    <svg
      viewBox='0 0 32 32'
      fill='none'
      stroke='#c9a84c'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <circle cx='16' cy='16' r='12' />
      <ellipse cx='16' cy='16' rx='5' ry='12' />
      <line x1='4' y1='16' x2='28' y2='16' />
      <line x1='6' y1='10' x2='26' y2='10' />
      <line x1='6' y1='22' x2='26' y2='22' />
    </svg>
  );
}

export function DronesIcon({ className = 'w-[26px] h-[26px]' }: IconProps) {
  return (
    <svg
      viewBox='0 0 32 32'
      fill='none'
      stroke='#c9a84c'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <circle cx='16' cy='16' r='3' />
      <line x1='16' y1='13' x2='16' y2='5' />
      <circle cx='16' cy='4' r='2' />
      <line x1='16' y1='19' x2='16' y2='27' />
      <circle cx='16' cy='28' r='2' />
      <line x1='13' y1='16' x2='5' y2='16' />
      <circle cx='4' cy='16' r='2' />
      <line x1='19' y1='16' x2='27' y2='16' />
      <circle cx='28' cy='16' r='2' />
      <line x1='14' y1='14' x2='8' y2='8' />
      <line x1='18' y1='14' x2='24' y2='8' />
      <line x1='14' y1='18' x2='8' y2='24' />
      <line x1='18' y1='18' x2='24' y2='24' />
    </svg>
  );
}

export function AgricultureIcon({
  className = 'w-[26px] h-[26px]',
}: IconProps) {
  return (
    <svg
      viewBox='0 0 32 32'
      fill='none'
      stroke='#c9a84c'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M16 28 C16 28 6 20 6 13 C6 8 10 5 16 5 C22 5 26 8 26 13 C26 20 16 28 16 28Z' />
      <line x1='16' y1='28' x2='16' y2='16' />
      <path d='M16 18 C14 15 10 14 8 16' />
      <path d='M16 22 C18 19 22 18 24 20' />
    </svg>
  );
}

export function OilGasIcon({ className = 'w-[26px] h-[26px]' }: IconProps) {
  return (
    <svg
      viewBox='0 0 32 32'
      fill='none'
      stroke='#c9a84c'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <rect x='12' y='4' width='8' height='5' rx='1' />
      <line x1='16' y1='9' x2='16' y2='14' />
      <path d='M9 14 L23 14 L26 28 L6 28 Z' />
      <line x1='12' y1='18' x2='20' y2='18' />
      <line x1='11' y1='22' x2='21' y2='22' />
      <line x1='16' y1='14' x2='16' y2='28' />
    </svg>
  );
}

export function RemoteIcon({ className = 'w-[26px] h-[26px]' }: IconProps) {
  return (
    <svg
      viewBox='0 0 32 32'
      fill='none'
      stroke='#c9a84c'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <rect x='10' y='12' width='12' height='10' rx='1' />
      <path d='M7 9 C9 6 13 4 16 4 C19 4 23 6 25 9' />
      <path d='M4 6 C7 2 11 0 16 0 C21 0 25 2 28 6' strokeOpacity='0.4' />
      <line x1='16' y1='22' x2='16' y2='28' />
      <line x1='10' y1='28' x2='22' y2='28' />
      <circle cx='16' cy='17' r='2' fill='rgba(201,168,76,0.2)' />
    </svg>
  );
}

export function CadastralIcon({ className = 'w-[26px] h-[26px]' }: IconProps) {
  return (
    <svg
      viewBox='0 0 32 32'
      fill='none'
      stroke='#c9a84c'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <rect x='4' y='4' width='11' height='11' />
      <rect x='17' y='4' width='11' height='11' />
      <rect x='4' y='17' width='11' height='11' />
      <path d='M17 22 L22 17 L28 28 Z' fill='rgba(201,168,76,0.08)' />
      <circle cx='22' cy='22' r='2' fill='rgba(201,168,76,0.2)' />
    </svg>
  );
}

// ─── Icon resolver ─────────────────────────────────────────────────────────────

const iconMap: Record<IconKey, (props: IconProps) => ReactElement> = {
  gis: GisIcon,
  drones: DronesIcon,
  agriculture: AgricultureIcon,
  oilgas: OilGasIcon,
  remote: RemoteIcon,
  cadastral: CadastralIcon,
};

interface CategoryIconProps extends IconProps {
  id: IconKey;
}

export function CategoryIcon({ id, className }: CategoryIconProps) {
  const Icon = iconMap[id];
  return <Icon className={className} />;
}
