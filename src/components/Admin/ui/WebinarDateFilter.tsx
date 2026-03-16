'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export interface WebinarDateFilterProps {
  visible: boolean;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
  onClear: () => void;
}

export function WebinarDateFilter({
  visible,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onClear,
}: WebinarDateFilterProps) {
  const inputStyle = {
    background: 'var(--obsidian-3)',
    border: '1px solid var(--border)',
    color: 'var(--ivory-dim)',
    fontFamily: 'var(--font-body)',
    colorScheme: 'dark' as const,
    clipPath:
      'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          className='overflow-hidden'
        >
          <div
            className='flex flex-wrap items-center gap-4 px-4 py-3'
            style={{
              background: 'var(--obsidian-2)',
              border: '1px solid var(--border)',
              borderTop: 'none',
            }}
          >
            <Filter size={12} style={{ color: 'var(--ivory-muted)' }} />

            <span
              className='text-[0.6rem] tracking-[0.16em] uppercase'
              style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
            >
              From
            </span>
            <input
              type='date'
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
              className='px-3 py-1.5 text-[0.7rem] outline-none'
              style={inputStyle}
            />

            <span
              className='text-[0.6rem] tracking-[0.16em] uppercase'
              style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
            >
              To
            </span>
            <input
              type='date'
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
              className='px-3 py-1.5 text-[0.7rem] outline-none'
              style={inputStyle}
            />

            {(dateFrom || dateTo) && (
              <button
                type='button'
                onClick={onClear}
                className='flex items-center gap-1 text-[0.6rem] tracking-[0.1em] uppercase transition-colors duration-150'
                style={{ color: '#f87171', fontFamily: 'var(--font-body)' }}
              >
                <X size={10} />
                Clear dates
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
