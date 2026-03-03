// components/ui/Marquee.tsx
'use client';

import { useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export type MarqueeVariant = 'default' | 'ticker' | 'tags';
export type MarqueeDirection = 'left' | 'right';

export interface MarqueeItem {
  text: string;
  highlight?: boolean; // renders in gold
}

export interface MarqueeProps {
  items: MarqueeItem[];
  variant?: MarqueeVariant;
  direction?: MarqueeDirection;
  speed?: number; // seconds for one full cycle (lower = faster)
  gap?: number; // px gap between items
  separator?: string; // separator between items e.g. "◆"
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}

// ─── Variant styles ───────────────────────────────────────────────────────────
const variantStyles: Record<
  MarqueeVariant,
  {
    section: string;
    item: string;
    separator: string;
  }
> = {
  default: {
    section:
      'border-t border-(--border) bg-gradient-to-r from-(--obsidian) via-(--obsidian-2) to-(--obsidian) py-3',
    item: 'text-[0.67rem] tracking-[0.22em] uppercase text-(--ivory-muted) hover:text-(--ivory-dim) transition-colors duration-200',
    separator: 'text-(--gold) opacity-40 text-[0.5rem]',
  },
  ticker: {
    section: 'border-y border-(--border) bg-(--obsidian) py-3.5',
    item: 'text-[0.65rem] tracking-[0.2em] uppercase text-(--ivory-muted) font-light',
    separator: 'text-(--gold) opacity-50 text-[0.55rem]',
  },
  tags: {
    section: 'border-t border-(--border) bg-(--obsidian-2) py-4',
    item: 'text-[0.68rem] tracking-[0.18em] uppercase text-(--ivory-dim) hover:text-(--gold-light) transition-colors duration-200 cursor-default',
    separator: 'text-(--gold) opacity-35 text-[0.5rem]',
  },
};

// ─── Single marquee track ─────────────────────────────────────────────────────
function MarqueeTrack({
  items,
  speed,
  direction,
  gap,
  separator,
  pauseOnHover,
  styles,
  itemClassName,
}: {
  items: MarqueeItem[];
  speed: number;
  direction: MarqueeDirection;
  gap: number;
  separator: string;
  pauseOnHover: boolean;
  styles: (typeof variantStyles)[MarqueeVariant];
  itemClassName?: string;
}) {
  const controls = useAnimationControls();

  const handleHoverStart = () => {
    if (pauseOnHover) controls.stop();
  };

  const handleHoverEnd = () => {
    if (pauseOnHover) {
      controls.start({
        x: direction === 'left' ? [null, '-50%'] : [null, '0%'],
        transition: {
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    }
  };

  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className='overflow-hidden'>
      <motion.div
        className='flex whitespace-nowrap will-change-transform'
        style={{ gap: `${gap}px` }}
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className='inline-flex items-center shrink-0'
            style={{ gap: `${gap}px` }}
          >
            <span
              className={cn(
                styles.item,
                item.highlight && 'text-(--gold)!',
                itemClassName,
              )}
            >
              {item.text}
            </span>
            {/* Separator after every item */}
            <span className={cn(styles.separator, 'mx-1 shrink-0')}>
              {separator}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main Marquee ─────────────────────────────────────────────────────────────
export function Marquee({
  items,
  variant = 'default',
  direction = 'left',
  speed = 30,
  gap = 0,
  separator = '◆',
  pauseOnHover = true,
  className,
  itemClassName,
}: MarqueeProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'relative overflow-hidden select-none',
        styles.section,
        className,
      )}
    >
      {/* Fade masks on edges */}
      <div className='pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-(--obsidian) to-transparent' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-(--obsidian) to-transparent' />

      <MarqueeTrack
        items={items}
        speed={speed}
        direction={direction}
        gap={gap}
        separator={separator}
        pauseOnHover={pauseOnHover}
        styles={styles}
        itemClassName={itemClassName}
      />
    </div>
  );
}

// ─── Pre-configured IEGS hero ticker ─────────────────────────────────────────
export const IEGS_TICKER_ITEMS: MarqueeItem[] = [
  { text: 'GIS & Spatial Mapping' },
  { text: 'Drone Surveys' },
  { text: 'Precision Agriculture' },
  { text: 'Oil & Gas Intelligence' },
  { text: 'Remote Sensing & SAR' },
  { text: 'Land Administration' },
  { text: 'LiDAR Processing' },
  { text: 'Cadastral Systems' },
  { text: 'Environmental Monitoring' },
  { text: 'Register Free · No Account Needed', highlight: true },
];
