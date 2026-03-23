'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { WEBINARS } from '@/components/sections/webinerDiscovery/data';
import type { WebinarStatus } from '@/components/sections/webinerDiscovery/types';
import { WebinarSummaryPills } from '@/components/Admin/ui/WebinarSummaryPills';
import { WebinarControlsBar } from '@/components/Admin/ui/WebinarControlsBar';
import type { SortField, SortState } from '@/components/Admin/ui/WebinarControlsBar';
import { WebinarDateFilter } from '@/components/Admin/ui/WebinarDateFilter';
import { WebinarTable } from '@/components/Admin/ui/WebinarTable';

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: EASE },
});

export default function AdminWebinarsPage() {
  // ── Filter state ──────────────────────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<WebinarStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sort, setSort] = useState<SortState>({ field: 'date', dir: 'desc' });
  const [showDateFilter, setShowDateFilter] = useState(false);

  // ── Counts for summary pills ──────────────────────────────────────────────
  const counts = useMemo(() => ({
    all:       WEBINARS.length,
    live:      WEBINARS.filter((w) => w.status === 'live').length,
    upcoming:  WEBINARS.filter((w) => w.status === 'upcoming').length,
    completed: WEBINARS.filter((w) => w.status === 'completed').length,
  }), []);

  // ── Toggle sort: same field → flip dir; new field → asc ──────────────────
  const handleSort = (field: SortField) => {
    setSort((prev) =>
      prev.field === field
        ? { field, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { field, dir: 'asc' },
    );
  };

  // ── Filtered + sorted webinar list ────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...WEBINARS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((w) => w.title.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all')   list = list.filter((w) => w.status === statusFilter);
    if (categoryFilter !== 'all') list = list.filter((w) => w.category === categoryFilter);
    if (dateFrom) list = list.filter((w) => new Date(w.date) >= new Date(dateFrom));
    if (dateTo)   list = list.filter((w) => new Date(w.date) <= new Date(dateTo));

    list.sort((a, b) => {
      let cmp = 0;
      if (sort.field === 'title')         cmp = a.title.localeCompare(b.title);
      if (sort.field === 'date')          cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sort.field === 'registrations') cmp = a.registrations - b.registrations;
      return sort.dir === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [search, statusFilter, categoryFilter, dateFrom, dateTo, sort]);

  const hasActiveFilters =
    search || statusFilter !== 'all' || categoryFilter !== 'all' || dateFrom || dateTo;

  const clearAllFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div
      className='min-h-screen p-6 lg:p-8'
      style={{ background: 'var(--obsidian)', color: 'var(--ivory)' }}
    >
      {/* Ambient glow */}
      <div
        className='fixed top-0 left-0 right-0 h-48 pointer-events-none z-0'
        style={{
          background: 'linear-gradient(180deg, rgba(24,61,110,0.1) 0%, transparent 100%)',
        }}
      />

      <div className='relative z-10 max-w-[1400px] mx-auto space-y-5'>

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0)}
          className='flex items-start justify-between flex-wrap gap-4'
        >
          <div>
            <p
              className='text-[0.58rem] tracking-[0.28em] uppercase mb-1.5'
              style={{ color: 'var(--teal-light)', fontFamily: 'var(--font-body)' }}
            >
              ── Platform Content
            </p>
            <h1
              className='text-[1.8rem] font-light leading-none'
              style={{ fontFamily: 'var(--font-display)', color: 'var(--ivory)' }}
            >
              All{' '}
              <em className='not-italic' style={{ color: 'var(--gold)' }}>
                Webinars
              </em>
            </h1>
            <p
              className='mt-1.5 text-[0.65rem] tracking-[0.05em]'
              style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
            >
              Manage, schedule and monitor every webinar session on the platform.
            </p>
          </div>

          <motion.button
            type='button'
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className='flex items-center gap-2 px-5 py-2.5 text-[0.65rem] tracking-[0.14em] uppercase font-medium transition-all duration-200'
            style={{
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              color: 'var(--obsidian)',
              clipPath:
                'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 4px 20px rgba(50,97,149,0.25)',
            }}
          >
            <Plus size={13} />
            Schedule Webinar
          </motion.button>
        </motion.div>

        {/* ── Summary pills ─────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.06)}>
          <WebinarSummaryPills
            counts={counts}
            active={statusFilter}
            onChange={setStatusFilter}
          />
        </motion.div>

        {/* ── Controls bar ──────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.1)}>
          <WebinarControlsBar
            search={search}
            onSearchChange={setSearch}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            sort={sort}
            onSortChange={handleSort}
            showDateFilter={showDateFilter}
            onToggleDateFilter={() => setShowDateFilter((v) => !v)}
          />
        </motion.div>

        {/* ── Date filter (collapsible) ─────────────────────────────────────── */}
        <WebinarDateFilter
          visible={showDateFilter}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onClear={() => { setDateFrom(''); setDateTo(''); }}
        />

        {/* ── Results count + clear ─────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.12)}
          className='flex items-center justify-between'
        >
          <p
            className='text-[0.62rem] tracking-[0.1em] uppercase'
            style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
          >
            Showing{' '}
            <span style={{ color: 'var(--ivory-dim)' }}>{filtered.length}</span>{' '}
            of {WEBINARS.length} webinars
          </p>

          <AnimatePresence>
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                type='button'
                onClick={clearAllFilters}
                className='flex items-center gap-1.5 text-[0.6rem] tracking-[0.1em] uppercase transition-colors duration-150 hover:opacity-80'
                style={{ color: '#f87171', fontFamily: 'var(--font-body)' }}
              >
                <X size={10} />
                Clear all filters
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Webinar table ──────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.15)}>
          <WebinarTable webinars={filtered} />
        </motion.div>

      </div>
    </div>
  );
}
