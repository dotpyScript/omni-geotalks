'use client';

import { motion } from 'framer-motion';
import { Radio, Clock, CheckCircle2, Video } from 'lucide-react';
import type { WebinarStatus } from '@/components/sections/webinerDiscovery/types';

// ─── Types ─────────────────────────────────────────────────────────────────
export interface WebinarCounts {
  all: number;
  live: number;
  upcoming: number;
  completed: number;
}

export interface WebinarSummaryPillsProps {
  counts: WebinarCounts;
  active: WebinarStatus | 'all';
  onChange: (status: WebinarStatus | 'all') => void;
}

// ─── Single pill ───────────────────────────────────────────────────────────
function Pill({
  label,
  count,
  icon: Icon,
  accent,
  active,
  onClick,
}: {
  label: string;
  count: number;
  icon: React.ElementType;
  accent: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type='button'
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className='flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 w-full'
      style={{
        background: active
          ? `linear-gradient(135deg, ${accent}22 0%, ${accent}11 100%)`
          : 'linear-gradient(145deg, var(--obsidian-3) 0%, var(--obsidian-2) 100%)',
        border: `1px solid ${active ? accent + '55' : 'var(--border)'}`,
        clipPath:
          'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
      }}
    >
      <Icon size={14} style={{ color: active ? accent : 'var(--ivory-muted)' }} />
      <div>
        <p
          className='text-[1.1rem] font-light leading-none'
          style={{
            fontFamily: 'var(--font-display)',
            color: active ? 'var(--ivory)' : 'var(--ivory-dim)',
          }}
        >
          {count}
        </p>
        <p
          className='text-[0.58rem] tracking-[0.14em] uppercase mt-0.5'
          style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
        >
          {label}
        </p>
      </div>
    </motion.button>
  );
}

// ─── Export ─────────────────────────────────────────────────────────────────
export function WebinarSummaryPills({
  counts,
  active,
  onChange,
}: WebinarSummaryPillsProps) {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
      <Pill label='Total'    count={counts.all}       icon={Video}         accent='#326195'               active={active === 'all'}       onClick={() => onChange('all')} />
      <Pill label='Live Now' count={counts.live}      icon={Radio}         accent='#6fa088'               active={active === 'live'}      onClick={() => onChange('live')} />
      <Pill label='Upcoming' count={counts.upcoming}  icon={Clock}         accent='#7d9bc0'               active={active === 'upcoming'}  onClick={() => onChange('upcoming')} />
      <Pill label='Recorded' count={counts.completed} icon={CheckCircle2}  accent='rgba(240,237,230,0.4)' active={active === 'completed'} onClick={() => onChange('completed')} />
    </div>
  );
}
