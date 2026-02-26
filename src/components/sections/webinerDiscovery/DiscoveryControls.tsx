"use client";

import type { ViewMode, SortOption } from "./types";
import { CATEGORIES } from "./data";

// ─── DiscoveryControls Props ───────────────────────────────────────────────────

interface DiscoveryControlsProps {
  searchQuery: string;
  activeCategory: string;
  sortBy: SortOption;
  viewMode: ViewMode;
  onSearchChange: (value: string) => void;
  onCategoryChange: (id: string) => void;
  onSortChange: (value: SortOption) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

// ─── DiscoveryControls ─────────────────────────────────────────────────────────
// The full filter/search/sort/view-toggle bar.
// Composed of four independent sub-sections:
//   1. SearchBox        — text search input
//   2. CategoryPills    — filter pill buttons
//   3. SortSelect       — dropdown sort
//   4. ViewToggle       — grid / list icon buttons

export function DiscoveryControls({
  searchQuery,
  activeCategory,
  sortBy,
  viewMode,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onViewModeChange,
}: DiscoveryControlsProps) {
  return (
    <div
      className={[
        "relative z-[2]",
        "px-[60px] py-8",
        "flex items-center gap-4 flex-wrap",
        "border-b border-[rgba(201,168,76,0.14)]",
        "bg-gradient-to-b from-[rgba(13,17,24,0.6)] to-transparent",
        // mobile
        "max-md:px-6",
      ].join(" ")}
    >
      {/* ── 1. Search box ───────────────────────────────────────────────── */}
      <div className="relative flex-1 min-w-[220px] max-w-[340px]">
        {/* Search icon */}
        <span
          aria-hidden="true"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(240,237,230,0.28)] text-[0.85rem] pointer-events-none"
        >
          ⌕
        </span>
        <input
          type="search"
          placeholder="Search webinars…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={[
            "w-full bg-[#12161f] border border-[rgba(201,168,76,0.14)]",
            "text-[#f0ede6] font-['DM_Sans',sans-serif] text-[0.8rem]",
            "pl-[42px] pr-4 py-[13px]",
            "outline-none tracking-[0.03em]",
            "placeholder:text-[rgba(240,237,230,0.28)]",
            "transition-[border-color,box-shadow] duration-[250ms]",
            "focus:border-[rgba(201,168,76,0.28)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.06)]",
          ].join(" ")}
        />
      </div>

      {/* ── 2. Category filter pills ─────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap items-center">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={[
                "inline-flex items-center gap-[7px]",
                "text-[0.7rem] tracking-[0.12em] uppercase",
                "font-['DM_Sans',sans-serif]",
                "px-[18px] py-[10px]",
                "border transition-all duration-[220ms] ease-in-out",
                "whitespace-nowrap cursor-pointer",
                "clip-bevel-xs",
                isActive
                  ? [
                      "border-[#c9a84c] text-[#e8c97e]",
                      "bg-gradient-to-br from-[rgba(201,168,76,0.18)] to-[rgba(201,168,76,0.08)]",
                      "shadow-[0_0_18px_rgba(201,168,76,0.12)]",
                    ].join(" ")
                  : [
                      "border-[rgba(201,168,76,0.14)] text-[rgba(240,237,230,0.55)]",
                      "bg-transparent",
                      "hover:border-[rgba(201,168,76,0.28)] hover:text-[#f0ede6] hover:bg-[rgba(201,168,76,0.12)]",
                    ].join(" "),
              ].join(" ")}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="w-[5px] h-[5px] rounded-full bg-current opacity-60"
                />
              )}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ── 3. Sort select ──────────────────────────────────────────────── */}
      <div className="relative ml-auto max-md:ml-0">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className={[
            "appearance-none",
            "bg-[#12161f] border border-[rgba(201,168,76,0.14)]",
            "text-[rgba(240,237,230,0.55)] font-['DM_Sans',sans-serif]",
            "text-[0.72rem] tracking-[0.1em] uppercase",
            "pl-4 pr-[38px] py-3",
            "cursor-pointer outline-none",
            "transition-[border-color] duration-[250ms]",
            "focus:border-[rgba(201,168,76,0.28)]",
          ].join(" ")}
        >
          <option value="date-asc">Date: Soonest First</option>
          <option value="date-desc">Date: Latest First</option>
          <option value="popular">Most Popular</option>
        </select>
        {/* Custom chevron */}
        <span
          aria-hidden="true"
          className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#c9a84c] pointer-events-none text-[0.7rem]"
        >
          ▾
        </span>
      </div>

      {/* ── 4. View mode toggle ──────────────────────────────────────────── */}
      <div className="flex border border-[rgba(201,168,76,0.14)] overflow-hidden">
        <ViewToggleBtn
          icon="⊞"
          title="Grid view"
          active={viewMode === "grid"}
          onClick={() => onViewModeChange("grid")}
        />
        <ViewToggleBtn
          icon="≡"
          title="List view"
          active={viewMode === "list"}
          onClick={() => onViewModeChange("list")}
        />
      </div>
    </div>
  );
}

// ─── ViewToggleBtn ─────────────────────────────────────────────────────────────

interface ViewToggleBtnProps {
  icon: string;
  title: string;
  active: boolean;
  onClick: () => void;
}

function ViewToggleBtn({ icon, title, active, onClick }: ViewToggleBtnProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={[
        "w-10 h-10 flex items-center justify-center border-none cursor-pointer",
        "text-[0.9rem] transition-all duration-[200ms]",
        active
          ? "bg-[rgba(201,168,76,0.10)] text-[#c9a84c]"
          : "bg-transparent text-[rgba(240,237,230,0.28)] hover:bg-[#12161f] hover:text-[rgba(240,237,230,0.55)]",
      ].join(" ")}
    >
      {icon}
    </button>
  );
}
