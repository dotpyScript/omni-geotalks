'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tag,
  Users,
  Video,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/components/sections/webinerDiscovery/data';
import type { Webinar, WebinarStatus } from '@/components/sections/webinerDiscovery/types';

// ─── Animation ────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Status config ─────────────────────────────────────────────────────────
const STATUS_META: Record<
  WebinarStatus,
  { label: string; dot: string; text: string; bg: string; border: string }
> = {
  live: {
    label: 'Live',
    dot: 'bg-[#6fa088] animate-pulse',
    text: 'text-[#6fa088]',
    bg: 'bg-[rgba(13,108,74,0.12)]',
    border: 'border-[rgba(13,108,74,0.3)]',
  },
  upcoming: {
    label: 'Upcoming',
    dot: 'bg-[#7d9bc0]',
    text: 'text-[#7d9bc0]',
    bg: 'bg-[rgba(24,61,110,0.12)]',
    border: 'border-[rgba(50,97,149,0.3)]',
  },
  completed: {
    label: 'Recorded',
    dot: 'bg-[rgba(240,237,230,0.3)]',
    text: 'text-[rgba(240,237,230,0.45)]',
    bg: 'bg-[rgba(255,255,255,0.04)]',
    border: 'border-[rgba(255,255,255,0.08)]',
  },
};

// ─── Row action dropdown ────────────────────────────────────────────────────
function RowActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setOpen((v) => !v)}
        className='w-7 h-7 flex items-center justify-center transition-colors duration-150 hover:text-(--ivory)'
        style={{ color: 'var(--ivory-muted)' }}
      >
        <MoreVertical size={14} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className='fixed inset-0 z-10' onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -4 }}
              transition={{ duration: 0.15, ease: EASE }}
              className='absolute right-0 top-8 z-20 w-36 py-1 overflow-hidden'
              style={{
                background: 'var(--obsidian-4)',
                border: '1px solid var(--border-mid)',
                clipPath:
                  'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              }}
            >
              {[
                { label: 'View',   icon: Eye,    color: 'var(--ivory-dim)' },
                { label: 'Edit',   icon: Edit2,  color: '#7d9bc0' },
                { label: 'Delete', icon: Trash2, color: '#f87171' },
              ].map(({ label, icon: Icon, color }) => (
                <button
                  key={label}
                  type='button'
                  onClick={() => setOpen(false)}
                  className='w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors duration-100 hover:bg-white/5'
                >
                  <Icon size={12} style={{ color }} />
                  <span
                    className='text-[0.68rem] tracking-[0.06em] uppercase'
                    style={{ color, fontFamily: 'var(--font-body)' }}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Table row ──────────────────────────────────────────────────────────────
function WebinarRow({ webinar, index }: { webinar: Webinar; index: number }) {
  const s = STATUS_META[webinar.status];
  const catLabel =
    CATEGORIES.find((c) => c.id === webinar.category)?.label ?? webinar.category;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: EASE }}
      className='group hover:bg-white/[0.025] transition-colors duration-150'
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      {/* Row number */}
      <td className='px-4 py-3.5 w-10'>
        <span
          className='text-[0.6rem]'
          style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
        >
          {webinar.id}
        </span>
      </td>

      {/* Title + category */}
      <td className='px-4 py-3.5 min-w-0'>
        <p
          className='text-[0.75rem] leading-snug mb-1 line-clamp-1'
          style={{ color: 'var(--ivory-dim)', fontFamily: 'var(--font-body)' }}
        >
          {webinar.title}
        </p>
        <div className='flex items-center gap-1.5'>
          <Tag size={9} style={{ color: 'var(--ivory-muted)' }} />
          <span
            className='text-[0.58rem] tracking-[0.06em]'
            style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
          >
            {catLabel}
          </span>
        </div>
      </td>

      {/* Speakers */}
      <td className='px-4 py-3.5 w-40'>
        <div className='flex items-center gap-1.5 flex-wrap'>
          {webinar.speakers.map((sp) => (
            <span
              key={sp.initials}
              title={sp.name}
              className='inline-flex items-center justify-center w-6 h-6 text-[0.56rem] font-medium shrink-0'
              style={{
                background: 'rgba(24,61,110,0.25)',
                color: 'var(--gold-light)',
                clipPath:
                  'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                fontFamily: 'var(--font-body)',
              }}
            >
              {sp.initials}
            </span>
          ))}
        </div>
      </td>

      {/* Date & time */}
      <td className='px-4 py-3.5 w-36'>
        <p
          className='text-[0.7rem]'
          style={{ color: 'var(--ivory-dim)', fontFamily: 'var(--font-body)' }}
        >
          {new Date(webinar.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <p
          className='text-[0.58rem] mt-0.5'
          style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
        >
          {webinar.time} · {webinar.duration}
        </p>
      </td>

      {/* Registrations */}
      <td className='px-4 py-3.5 w-28'>
        <div className='flex items-center gap-1.5'>
          <Users size={10} style={{ color: 'var(--ivory-muted)' }} />
          <span
            className='text-[0.72rem]'
            style={{ color: 'var(--ivory-dim)', fontFamily: 'var(--font-body)' }}
          >
            {webinar.registrations.toLocaleString()}
          </span>
        </div>
      </td>

      {/* Status badge */}
      <td className='px-4 py-3.5 w-28'>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.58rem] tracking-[0.1em] uppercase border',
            s.text, s.bg, s.border,
          )}
          style={{
            clipPath:
              'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
            fontFamily: 'var(--font-body)',
          }}
        >
          <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', s.dot)} />
          {s.label}
        </span>
      </td>

      {/* Actions */}
      <td className='px-4 py-3.5 w-12'>
        <RowActions />
      </td>
    </motion.tr>
  );
}

// ─── Table component ────────────────────────────────────────────────────────
export interface WebinarTableProps {
  webinars: Webinar[];
}

export function WebinarTable({ webinars }: WebinarTableProps) {
  return (
    <div
      className='overflow-x-auto'
      style={{
        background: 'linear-gradient(145deg, var(--obsidian-3) 0%, var(--obsidian-2) 100%)',
        border: '1px solid var(--border)',
        clipPath:
          'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
      }}
    >
      <table className='w-full min-w-[700px] border-collapse'>
        {/* Head */}
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-mid)' }}>
            {['#', 'Title / Category', 'Speakers', 'Date & Time', 'Registrations', 'Status', ''].map(
              (h) => (
                <th
                  key={h}
                  className='px-4 py-3 text-left text-[0.56rem] tracking-[0.2em] uppercase'
                  style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          <AnimatePresence mode='popLayout'>
            {webinars.length > 0 ? (
              webinars.map((w, i) => (
                <WebinarRow key={w.id} webinar={w} index={i} />
              ))
            ) : (
              <motion.tr
                key='empty'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <td colSpan={7} className='px-4 py-14 text-center'>
                  <Video
                    size={22}
                    className='mx-auto mb-3'
                    style={{ color: 'var(--ivory-muted)' }}
                  />
                  <p
                    className='text-[0.7rem] tracking-[0.1em] uppercase'
                    style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    No webinars match your filters
                  </p>
                </td>
              </motion.tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
