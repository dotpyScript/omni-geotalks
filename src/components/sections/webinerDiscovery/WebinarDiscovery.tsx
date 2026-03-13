'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

import { DiscoveryControls } from './DiscoveryControls';
import { WebinarGrid } from './WebinarGrid';
import { DiscoveryPagination } from './DiscoveryPagination';
import { WEBINARS, PER_PAGE } from './data';
import type { ViewMode, SortOption } from './types';

interface WebinarDiscoveryProps {
  onWebinarSelect?: (id: number) => void;
}

export default function WebinarDiscovery({ onWebinarSelect }: WebinarDiscoveryProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date-asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [animationKey, setAnimationKey] = useState(0);

  const resetGrid = () => { setAnimationKey((k) => k + 1); setCurrentPage(1); };
  const handleSearchChange = (v: string) => { setSearchQuery(v); resetGrid(); };
  const handleCategoryChange = (id: string) => { setActiveCategory(id); resetGrid(); };
  const handleSortChange = (v: SortOption) => { setSortBy(v); resetGrid(); };
  const handleViewModeChange = (m: ViewMode) => setViewMode(m);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('webinar-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filtered = useMemo(() => {
    let list = [...WEBINARS];
    if (activeCategory !== 'all') list = list.filter((w) => w.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((w) => w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'popular') return b.registrations - a.registrations;
      return 0;
    });
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const liveCount    = WEBINARS.filter((w) => w.status === 'live').length;
  const upcomingCount  = WEBINARS.filter((w) => w.status === 'upcoming').length;
  const completedCount = WEBINARS.filter((w) => w.status === 'completed').length;

  return (
    <div
      className="relative min-h-screen font-dm overflow-hidden"
      style={{ background: 'var(--obsidian)', color: 'var(--ivory)' }}
    >

      {/* Ambient orbs */}
      <div aria-hidden className="absolute -top-40 left-[8%] w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--gold-dim) 0%, transparent 65%)', filter: 'blur(90px)' }} />
      <div aria-hidden className="absolute top-[50%] -right-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--cyan-dim) 0%, transparent 65%)', filter: 'blur(90px)' }} />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative z-10 pt-32 pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        {/* Decorative diagonal slashes */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[18%] bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, transparent 0%, var(--border-mid) 50%, transparent 100%)', transform: 'rotate(7deg)' }} />
          <div className="absolute top-0 right-[38%] bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, transparent 20%, var(--border) 60%, transparent 100%)', transform: 'rotate(7deg)' }} />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20">

          {/* ── Left: title block ─────────────────────────────────────── */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-7 h-px"
                style={{ background: 'linear-gradient(to right, transparent, var(--gold))' }} />
              <span className="text-[0.6rem] tracking-[0.38em] uppercase" style={{ color: 'var(--gold)' }}>
                IEGS · Expert-Led Sessions
              </span>
              {liveCount > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 ml-1"
                  style={{ background: 'var(--green-dim)', border: '1px solid color-mix(in srgb, var(--green) 22%, transparent)' }}>
                  <span className="relative flex h-[5px] w-[5px]">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                      style={{ background: 'var(--green)' }} />
                    <span className="relative inline-flex rounded-full h-[5px] w-[5px]"
                      style={{ background: 'var(--green)' }} />
                  </span>
                  <span className="text-[0.5rem] tracking-[0.25em] uppercase" style={{ color: 'var(--green)' }}>
                    {liveCount} Live
                  </span>
                </span>
              )}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="font-cormorant font-light leading-[1.04] tracking-[-0.01em] mb-5"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.2rem)', color: 'var(--ivory)' }}
            >
              Discover{' '}
              <em className="italic" style={{ color: 'var(--gold-light)' }}>Geospatial</em>
              <br />
              <strong className="font-semibold">Knowledge Sessions</strong>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="font-light leading-[1.75] max-w-[520px]"
              style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', color: 'var(--ivory-dim)' }}
            >
              Free, expert-led webinars covering every frontier of geospatial science —
              GIS, drone surveys, precision agriculture, remote sensing and oil &amp; gas intelligence.
            </motion.p>
          </div>

          {/* ── Right: stat cluster ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="flex items-stretch flex-shrink-0"
            style={{ border: '1px solid var(--border)' }}
          >
            {[
              { value: WEBINARS.length, label: 'Total Sessions', accent: 'var(--gold-light)' },
              { value: upcomingCount,   label: 'Upcoming',       accent: 'var(--cyan)' },
              { value: completedCount,  label: 'Recorded',       accent: 'var(--ivory-dim)' },
            ].map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center px-8 py-6 gap-1"
                style={{
                  background: i === 0 ? 'var(--gold-dim)' : 'var(--obsidian-2)',
                  borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
                  minWidth: 96,
                }}
              >
                <span className="font-bebas text-[2.4rem] leading-none tracking-[0.04em]"
                  style={{ color: s.accent }}>
                  {s.value}
                </span>
                <span className="text-[0.56rem] tracking-[0.2em] uppercase text-center"
                  style={{ color: 'var(--ivory-muted)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <DiscoveryControls
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        sortBy={sortBy}
        viewMode={viewMode}
        filteredCount={filtered.length}
        totalCount={WEBINARS.length}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onViewModeChange={handleViewModeChange}
      />

      {/* Grid */}
      <div id="webinar-grid" className="relative z-10 px-6 sm:px-10 lg:px-16 py-12">
        <WebinarGrid
          webinars={paginated}
          viewMode={viewMode}
          animationKey={animationKey}
          onCardClick={onWebinarSelect}
        />
      </div>

      {/* Pagination */}
      <DiscoveryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={filtered.length}
        perPage={PER_PAGE}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
