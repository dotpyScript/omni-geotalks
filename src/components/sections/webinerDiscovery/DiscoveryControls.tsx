"use client";

import type { ViewMode, SortOption } from "./types";
import { CATEGORIES } from "./data";

interface DiscoveryControlsProps {
  searchQuery: string;
  activeCategory: string;
  sortBy: SortOption;
  viewMode: ViewMode;
  filteredCount: number;
  totalCount: number;
  onSearchChange: (value: string) => void;
  onCategoryChange: (id: string) => void;
  onSortChange: (value: SortOption) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export function DiscoveryControls({
  searchQuery,
  activeCategory,
  sortBy,
  viewMode,
  filteredCount,
  totalCount,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onViewModeChange,
}: DiscoveryControlsProps) {
  const isFiltered = filteredCount !== totalCount;

  return (
    <div
      className="sticky top-0 z-20"
      style={{
        background: 'color-mix(in srgb, var(--obsidian-2) 92%, transparent)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* ── Top row: search + count + sort + view toggle ─────────────────── */}
      <div className="flex items-center gap-3 px-6 sm:px-10 lg:px-16 pt-4 pb-3 flex-wrap">

        {/* Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-[380px]">
          <span
            aria-hidden
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[0.9rem]"
            style={{ color: 'var(--ivory-muted)' }}
          >
            ⌕
          </span>
          <input
            type="search"
            placeholder="Search sessions…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-[0.78rem] tracking-[0.02em] outline-none transition-all duration-250 font-dm"
            style={{
              background: 'var(--obsidian-3)',
              border: '1px solid var(--border)',
              color: 'var(--ivory)',
              caretColor: 'var(--gold)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-mid)';
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--gold-dim)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Live result count badge */}
        <span
          className="text-[0.6rem] tracking-[0.12em] uppercase px-3 py-2 flex items-center gap-1.5"
          style={{
            background: isFiltered ? 'var(--gold-dim)' : 'var(--obsidian-3)',
            border: `1px solid ${isFiltered ? 'var(--border-mid)' : 'var(--border)'}`,
            color: 'var(--ivory-muted)',
          }}
        >
          <strong
            className="font-bebas tracking-[0.04em]"
            style={{ fontSize: '1rem', color: isFiltered ? 'var(--gold-light)' : 'var(--ivory-dim)' }}
          >
            {filteredCount}
          </strong>
          {isFiltered ? 'results' : 'sessions'}
        </span>

        <div className="flex-1" />

        {/* Sort select */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none pl-4 pr-9 py-3 text-[0.68rem] tracking-[0.1em] uppercase cursor-pointer outline-none transition-all duration-250 font-dm"
            style={{
              background: 'var(--obsidian-3)',
              border: '1px solid var(--border)',
              color: 'var(--ivory-dim)',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--border-mid)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <option value="date-asc">Soonest First</option>
            <option value="date-desc">Latest First</option>
            <option value="popular">Most Popular</option>
          </select>
          <span
            aria-hidden
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[0.7rem]"
            style={{ color: 'var(--gold)' }}
          >
            ▾
          </span>
        </div>

        {/* View toggle */}
        <div className="flex overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {([
            { mode: 'grid' as ViewMode, icon: '⊞', label: 'Grid view' },
            { mode: 'list' as ViewMode, icon: '≡', label: 'List view' },
          ] as const).map(({ mode, icon, label }) => (
            <button
              key={mode}
              type="button"
              title={label}
              onClick={() => onViewModeChange(mode)}
              className="w-10 h-10 flex items-center justify-center text-[0.85rem] transition-all duration-200 border-none cursor-pointer"
              style={{
                background: viewMode === mode ? 'var(--gold-dim)' : 'transparent',
                color: viewMode === mode ? 'var(--gold)' : 'var(--ivory-muted)',
                borderLeft: mode === 'list' ? '1px solid var(--border)' : 'none',
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* ── Bottom row: category pills ────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap items-center px-6 sm:px-10 lg:px-16 pb-4 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className="inline-flex items-center gap-2 text-[0.62rem] tracking-[0.16em] uppercase px-4 py-2 whitespace-nowrap cursor-pointer clip-bevel-xs transition-all duration-200 font-dm border-none"
              style={{
                background: isActive ? 'var(--gold-dim)' : 'var(--obsidian-3)',
                border: `1px solid ${isActive ? 'var(--border-hi)' : 'var(--border)'}`,
                color: isActive ? 'var(--gold-light)' : 'var(--ivory-muted)',
                boxShadow: isActive ? '0 0 16px var(--gold-glow)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--ivory)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--ivory-muted)';
                }
              }}
            >
              {isActive && (
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--gold)' }}
                />
              )}
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
