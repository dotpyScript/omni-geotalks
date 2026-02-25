// components/ui/Countdown.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export type CountdownVariant = 'default' | 'compact' | 'card' | 'minimal';

export interface CountdownUnit {
  value: number;
  label: string;
}

export interface CountdownProps {
  targetDate: string | Date; // ISO string or Date object
  variant?: CountdownVariant;
  label?: string;
  expiredLabel?: string;
  showSeconds?: boolean;
  className?: string;
  onExpire?: () => void;
}

// ─── Time calculation ─────────────────────────────────────────────────────────
function calcTimeLeft(target: Date): CountdownUnit[] {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return [
      { value: 0, label: 'Days' },
      { value: 0, label: 'Hours' },
      { value: 0, label: 'Minutes' },
      { value: 0, label: 'Seconds' },
    ];
  }

  return [
    { value: Math.floor(diff / 86_400_000), label: 'Days' },
    { value: Math.floor((diff % 86_400_000) / 3_600_000), label: 'Hours' },
    { value: Math.floor((diff % 3_600_000) / 60_000), label: 'Minutes' },
    { value: Math.floor((diff % 60_000) / 1_000), label: 'Seconds' },
  ];
}

// ─── Pad helper ───────────────────────────────────────────────────────────────
const pad = (n: number): string => String(n).padStart(2, '0');

// ─── Flip digit animation ─────────────────────────────────────────────────────
function FlipDigit({ value }: { value: string }) {
  return (
    <AnimatePresence mode='popLayout' initial={false}>
      <motion.span
        key={value}
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 14, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className='inline-block'
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

// ─── Unit block (default/card variant) ───────────────────────────────────────
function UnitBlock({
  unit,
  isLast,
  variant,
}: {
  unit: CountdownUnit;
  isLast: boolean;
  variant: CountdownVariant;
}) {
  const padded = pad(unit.value);

  const numberClass = cn(
    "font-['Bebas_Neue'] leading-none tracking-[0.04em] tabular-nums",
    variant === 'card' && 'text-[3rem] text-[#f0ede6]',
    variant === 'default' && 'text-[2.5rem] text-[#f0ede6]',
    variant === 'compact' && 'text-[1.6rem] text-[#f0ede6]',
    variant === 'minimal' && 'text-[2rem] text-[#e8c97e]',
  );

  const labelClass = cn(
    'tracking-[0.2em] uppercase text-[rgba(240,237,230,0.3)]',
    variant === 'card' && 'text-[0.58rem] mt-1.5',
    variant === 'default' && 'text-[0.58rem] mt-1',
    variant === 'compact' && 'text-[0.5rem]  mt-0.5',
    variant === 'minimal' && 'text-[0.56rem] mt-0.5',
  );

  return (
    <div
      className={cn(
        'flex flex-col items-center',
        !isLast && 'border-r border-[rgba(201,168,76,0.14)]',
        variant === 'card' && 'flex-1 px-4 py-0',
        variant === 'default' && 'flex-1 px-3',
        variant === 'compact' && 'flex-1 px-2',
        variant === 'minimal' && 'flex-1 px-2',
      )}
    >
      <div className={numberClass}>
        <FlipDigit value={padded[0]!} />
        <FlipDigit value={padded[1]!} />
      </div>
      <div className={labelClass}>{unit.label}</div>
    </div>
  );
}

// ─── Separator colon (minimal variant) ───────────────────────────────────────
function Colon() {
  return (
    <span className="font-['Bebas_Neue'] text-[1.4rem] text-[rgba(201,168,76,0.4)] leading-none mb-2 shrink-0">
      :
    </span>
  );
}

// ─── Main Countdown ───────────────────────────────────────────────────────────
export function Countdown({
  targetDate,
  variant = 'default',
  label = 'Session Begins In',
  expiredLabel = 'Session is Live',
  showSeconds = true,
  className,
  onExpire,
}: CountdownProps) {
  const target = targetDate instanceof Date ? targetDate : new Date(targetDate);
  const [units, setUnits] = useState<CountdownUnit[]>(() =>
    calcTimeLeft(target),
  );
  const [expired, setExpired] = useState(false);

  const tick = useCallback(() => {
    const next = calcTimeLeft(target);
    setUnits(next);

    const isExpired = next.every((u) => u.value === 0);
    if (isExpired && !expired) {
      setExpired(true);
      onExpire?.();
    }
  }, [target, expired, onExpire]);

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  const displayUnits = showSeconds ? units : units.slice(0, 3);

  // ── Expired state ──────────────────────────────────────────────────────────
  if (expired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn('flex items-center justify-center gap-2 py-4', className)}
      >
        <span className='relative flex h-2.5 w-2.5'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5a0] opacity-75' />
          <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00e5a0]' />
        </span>
        <span className='text-[#00e5a0] text-sm tracking-[0.2em] uppercase font-medium'>
          {expiredLabel}
        </span>
      </motion.div>
    );
  }

  // ── Minimal variant: "HH:MM:SS" ────────────────────────────────────────────
  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-end gap-1', className)}>
        {displayUnits.map((unit, i) => (
          <div key={unit.label} className='flex items-end gap-1'>
            <div className='flex flex-col items-center'>
              <span className="font-['Bebas_Neue'] text-[2rem] leading-none tracking-[0.04em] text-[#e8c97e] tabular-nums">
                <FlipDigit value={pad(unit.value)[0]!} />
                <FlipDigit value={pad(unit.value)[1]!} />
              </span>
              <span className='text-[0.52rem] tracking-[0.18em] uppercase text-[rgba(240,237,230,0.3)] mt-0.5'>
                {unit.label}
              </span>
            </div>
            {i < displayUnits.length - 1 && <Colon />}
          </div>
        ))}
      </div>
    );
  }

  // ── Default / card / compact variants ──────────────────────────────────────
  return (
    <div className={cn('', className)}>
      {/* Label */}
      {label && (
        <div className='flex items-center gap-2 mb-4'>
          <span className='text-[0.6rem] tracking-[0.28em] uppercase text-[#c9a84c]'>
            ⬡ {label}
          </span>
          <div className='flex-1 h-px bg-gradient-to-r from-[rgba(201,168,76,0.2)] to-transparent' />
        </div>
      )}

      {/* Units */}
      <div
        className={cn(
          'flex',
          variant === 'card' && [
            'bg-gradient-to-br from-[rgba(201,168,76,0.05)] to-[rgba(201,168,76,0.02)]',
            'border border-[rgba(201,168,76,0.14)]',
            'py-4',
          ],
          variant === 'default' && 'gap-0',
          variant === 'compact' && 'gap-0',
        )}
      >
        {displayUnits.map((unit, i) => (
          <UnitBlock
            key={unit.label}
            unit={unit}
            isLast={i === displayUnits.length - 1}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
