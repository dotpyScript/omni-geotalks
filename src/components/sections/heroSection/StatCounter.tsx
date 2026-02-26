// components/ui/StatCounter.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export type StatVariant = 'default' | 'compact' | 'large' | 'inline';

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  icon?: LucideIcon;
}

export interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // ms
  delay?: number; // ms before counting starts
  decimals?: number;
  className?: string;
  onComplete?: () => void;
}

export interface StatsGridProps {
  stats: StatItem[];
  variant?: StatVariant;
  columns?: 2 | 3 | 4;
  dividers?: boolean;
  className?: string;
  animated?: boolean;
}

// ─── Easing ───────────────────────────────────────────────────────────────────
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// ─── Core counter hook ────────────────────────────────────────────────────────
function useCountUp(
  value: number,
  duration: number = 1800,
  delay: number = 0,
  decimals: number = 0,
  enabled: boolean = true,
) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const started = useRef(false);

  useEffect(() => {
    if (!enabled || started.current) return;
    started.current = true;

    const timer = setTimeout(() => {
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = eased * value;

        setDisplay(
          decimals > 0
            ? Math.round(current * 10 ** decimals) / 10 ** decimals
            : Math.floor(current),
        );

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(value);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, delay, decimals, enabled]);

  return display;
}

// ─── Single animated counter ──────────────────────────────────────────────────
export function StatCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1800,
  delay = 0,
  decimals = 0,
  className,
  onComplete,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(value, duration, delay, decimals, inView);

  const formatted =
    decimals > 0 ? count.toFixed(decimals) : count.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// ─── Stat card variants ───────────────────────────────────────────────────────
const variantStyles: Record<
  StatVariant,
  {
    wrapper: string;
    number: string;
    label: string;
    sublabel: string;
  }
> = {
  default: {
    wrapper: 'flex flex-col gap-1',
    number:
      "font-['Bebas_Neue'] text-[2.2rem] tracking-[0.04em] leading-none text-[#e8c97e]",
    label:
      'text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(240,237,230,0.3)]',
    sublabel: 'text-[0.58rem] text-[rgba(240,237,230,0.2)] mt-0.5',
  },
  compact: {
    wrapper: 'flex flex-col gap-0.5',
    number:
      "font-['Bebas_Neue'] text-[1.6rem] tracking-[0.04em] leading-none text-[#e8c97e]",
    label:
      'text-[0.58rem] tracking-[0.16em] uppercase text-[rgba(240,237,230,0.3)]',
    sublabel: 'text-[0.54rem] text-[rgba(240,237,230,0.2)]',
  },
  large: {
    wrapper: 'flex flex-col gap-2',
    number:
      "font-['Bebas_Neue'] text-[4rem] tracking-[0.04em] leading-none text-[#e8c97e]",
    label:
      'text-[0.68rem] tracking-[0.22em] uppercase text-[rgba(240,237,230,0.3)]',
    sublabel: 'text-[0.62rem] text-[rgba(240,237,230,0.2)] mt-1',
  },
  inline: {
    wrapper: 'flex items-baseline gap-2',
    number:
      "font-['Bebas_Neue'] text-[1.8rem] tracking-[0.04em] leading-none text-[#e8c97e]",
    label:
      'text-[0.65rem] tracking-[0.12em] uppercase text-[rgba(240,237,230,0.35)]',
    sublabel: '',
  },
};

// ─── Individual stat item ─────────────────────────────────────────────────────
interface StatItemComponentProps extends StatItem {
  variant: StatVariant;
  index: number;
  animated: boolean;
}

function StatItemComponent({
  value,
  suffix,
  prefix,
  label,
  sublabel,
  icon: Icon,
  variant,
  index,
  animated,
}: StatItemComponentProps) {
  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={styles.wrapper}
    >
      {Icon && variant !== 'inline' && (
        <Icon size={16} className='text-[#c9a84c] mb-1 opacity-70' />
      )}

      <div className={styles.number}>
        {animated ? (
          <StatCounter
            value={value}
            suffix={suffix}
            prefix={prefix}
            delay={index * 120}
          />
        ) : (
          <>
            {prefix}
            {value.toLocaleString()}
            {suffix}
          </>
        )}
      </div>

      <div className={styles.label}>{label}</div>
      {sublabel && variant !== 'inline' && (
        <div className={styles.sublabel}>{sublabel}</div>
      )}
    </motion.div>
  );
}

// ─── Stats grid ───────────────────────────────────────────────────────────────
const colClass: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

export function StatsGrid({
  stats,
  variant = 'default',
  columns = 3,
  dividers = true,
  className,
  animated = true,
}: StatsGridProps) {
  return (
    <div className={cn('grid', colClass[columns], className)}>
      {stats.map((stat, i) => (
        <div
          key={i}
          className={cn(
            'relative',
            dividers &&
              i < stats.length - 1 && [
                'pr-6 sm:pr-8',
                'border-r border-[rgba(201,168,76,0.14)]',
              ],
            dividers && i > 0 && 'pl-6 sm:pl-8',
          )}
        >
          <StatItemComponent
            {...stat}
            variant={variant}
            index={i}
            animated={animated}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Hero stats bar (horizontal strip with dividers) ─────────────────────────
export interface HeroStatsProps {
  stats: StatItem[];
  className?: string;
}

export function HeroStats({ stats, className }: HeroStatsProps) {
  return (
    <div
      className={cn(
        'flex items-stretch',
        'border-t border-[rgba(201,168,76,0.14)]',
        'pt-7 mt-8',
        className,
      )}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
          className={cn(
            'flex flex-col gap-1.5',
            i < stats.length - 1 &&
              'pr-7 border-r border-[rgba(201,168,76,0.14)] mr-7',
          )}
        >
          <div className="font-['Bebas_Neue'] text-[2.1rem] tracking-[0.04em] leading-none text-[#e8c97e]">
            <StatCounter
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              delay={800 + i * 120}
            />
          </div>
          <div className='text-[0.6rem] tracking-[0.2em] uppercase text-[rgba(240,237,230,0.3)]'>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
