'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  SortAsc,
  SortDesc,
  CalendarDays,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/components/sections/webinerDiscovery/data';

// ─── Types ─────────────────────────────────────────────────────────────────
export type SortField = 'title' | 'date' | 'registrations';
export type SortDir = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  dir: SortDir;
}

export interface WebinarControlsBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  categoryFilter: string;
  onCategoryChange: (v: string) => void;
  sort: SortState;
  onSortChange: (field: SortField) => void;
  showDateFilter: boolean;
  onToggleDateFilter: () => void;
}

const SORT_LABELS: Record<SortField, string> = {
  title: 'Name',
  date: 'Date',
  registrations: 'Registrations',
};

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Sort button ────────────────────────────────────────────────────────────
function SortBtn({
  field,
  current,
  onClick,
}: {
  field: SortField;
  current: SortState;
  onClick: (f: SortField) => void;
}) {
  const isActive = current.field === field;
  return (
    <button
      type='button'
      onClick={() => onClick(field)}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 text-[0.62rem] tracking-[0.1em] uppercase transition-all duration-150',
        isActive ? 'text-(--ivory)' : 'text-(--ivory-muted) hover:text-(--ivory-dim)',
      )}
      style={{
        background: isActive ? 'rgba(50,97,149,0.15)' : 'transparent',
        border: `1px solid ${isActive ? 'rgba(50,97,149,0.35)' : 'var(--border)'}`,
        clipPath:
          'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
        fontFamily: 'var(--font-body)',
      }}
    >
      {SORT_LABELS[field]}
      {isActive ? (
        current.dir === 'asc' ? <SortAsc size={11} /> : <SortDesc size={11} />
      ) : (
        <ChevronDown size={10} style={{ opacity: 0.4 }} />
      )}
    </button>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export function WebinarControlsBar({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  sort,
  onSortChange,
  showDateFilter,
  onToggleDateFilter,
}: WebinarControlsBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className='flex flex-wrap items-center gap-3 p-4'
      style={{
        background: 'var(--obsidian-2)',
        border: '1px solid var(--border)',
        clipPath:
          'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
      }}
    >
      {/* ── Search ────────────────────────────────────────────────────────── */}
      <div className='relative flex-1 min-w-[200px]'>
        <Search
          size={13}
          className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'
          style={{ color: 'var(--ivory-muted)' }}
        />
        <input
          ref={inputRef}
          type='text'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder='Search webinars by title…'
          className='w-full pl-9 pr-8 py-2 text-[0.75rem] outline-none transition-all duration-200'
          style={{
            background: 'var(--obsidian-3)',
            border: '1px solid var(--border)',
            color: 'var(--ivory-dim)',
            fontFamily: 'var(--font-body)',
            clipPath:
              'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          }}
        />
        <AnimatePresence>
          {search && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15, ease: EASE }}
              type='button'
              onClick={() => { onSearchChange(''); inputRef.current?.focus(); }}
              className='absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-150 hover:text-(--ivory)'
              style={{ color: 'var(--ivory-muted)' }}
            >
              <X size={12} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className='w-px h-6 shrink-0' style={{ background: 'var(--border)' }} />

      {/* ── Category filter ────────────────────────────────────────────────── */}
      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className='px-3 py-2 text-[0.65rem] tracking-[0.08em] uppercase outline-none cursor-pointer transition-colors duration-150'
        style={{
          background: 'var(--obsidian-3)',
          border: '1px solid var(--border)',
          color: 'var(--ivory-dim)',
          fontFamily: 'var(--font-body)',
          clipPath:
            'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
        }}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.id} value={cat.id} style={{ background: 'var(--obsidian-4)' }}>
            {cat.label}
          </option>
        ))}
      </select>

      {/* ── Date range toggle ──────────────────────────────────────────────── */}
      <button
        type='button'
        onClick={onToggleDateFilter}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 text-[0.62rem] tracking-[0.1em] uppercase transition-all duration-150',
          showDateFilter ? 'text-(--ivory)' : 'text-(--ivory-muted) hover:text-(--ivory-dim)',
        )}
        style={{
          background: showDateFilter ? 'rgba(50,97,149,0.15)' : 'var(--obsidian-3)',
          border: `1px solid ${showDateFilter ? 'rgba(50,97,149,0.35)' : 'var(--border)'}`,
          clipPath:
            'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))',
          fontFamily: 'var(--font-body)',
        }}
      >
        <CalendarDays size={12} />
        Date Range
        {showDateFilter ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
      </button>

      {/* ── Sort buttons ───────────────────────────────────────────────────── */}
      <div className='flex items-center gap-1.5 ml-auto flex-wrap'>
        <span
          className='text-[0.58rem] tracking-[0.14em] uppercase shrink-0'
          style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
        >
          Sort:
        </span>
        {(['title', 'date', 'registrations'] as SortField[]).map((f) => (
          <SortBtn key={f} field={f} current={sort} onClick={onSortChange} />
        ))}
      </div>
    </div>
  );
}
