"use client";

import { useState, useMemo } from "react";

// ── Sub-components ────────────────────────────────────────────────────────────
import { DiscoverySectionHeader } from "./DiscoverySectionHeader";
import { DiscoveryControls } from "./DiscoveryControls";
import { WebinarGrid } from "./WebinarGrid";
import { DiscoveryPagination } from "./DiscoveryPagination";

// ── Data & types ──────────────────────────────────────────────────────────────
import { WEBINARS, PER_PAGE } from "./data";
import type { ViewMode, SortOption } from "./types";

// ─── WebinarDiscovery Props ────────────────────────────────────────────────────

interface WebinarDiscoveryProps {
  /** Override section eyebrow label */
  eyebrow?: string;
  /** Override section title (supports JSX for italic spans) */
  title?: React.ReactNode;
  /** Callback when a webinar card is clicked, receives webinar id */
  onWebinarSelect?: (id: number) => void;
}

// ─── WebinarDiscovery ──────────────────────────────────────────────────────────
//
// Composes:
//   1. DiscoverySectionHeader  — eyebrow / title / dynamic result count
//   2. DiscoveryControls       — search input + category pills + sort + view toggle
//   3. WebinarGrid             — responsive card grid (grid or list view)
//   4. DiscoveryPagination     — prev/next + numbered page buttons
//
// All filter/sort/pagination state lives here and is passed down as props.
//
// ── Tailwind v4 additions required in globals.css @theme ─────────────────────
//
//   Inside @theme { } add:
//
//   --animate-card-reveal: cardReveal 0.5s ease both;
//
//   @keyframes cardReveal {
//     from { opacity: 0; transform: translateY(20px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }
//
//   NOTE: This is the same as catReveal with a slightly shorter translateY.
//   If you already have catReveal, you can alias it instead:
//   --animate-card-reveal: catReveal 0.5s ease both;

export default function WebinarDiscovery({
  eyebrow,
  title,
  onWebinarSelect,
}: WebinarDiscoveryProps) {
  // ── Filter / UI state ──────────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date-asc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  // Incrementing this key forces WebinarGrid to remount → re-triggers animations
  const [animationKey, setAnimationKey] = useState(0);

  // Helper: reset to page 1 and re-trigger card animations on filter change
  const resetGrid = () => {
    setAnimationKey((k) => k + 1);
    setCurrentPage(1);
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    resetGrid();
  };
  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    resetGrid();
  };
  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    resetGrid();
  };
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll grid into view smoothly
    document.getElementById("webinar-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── Derived: filtered + sorted list ───────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...WEBINARS];

    if (activeCategory !== "all") {
      list = list.filter((w) => w.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      if (sortBy === "date-asc")  return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "date-desc") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "popular")   return b.registrations - a.registrations;
      return 0;
    });
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  // ── Derived: pagination ───────────────────────────────────────────────────
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  return (
    <section
      className={[
        "relative overflow-hidden",
        "bg-[#080a0f] text-[#f0ede6] font-['DM_Sans',sans-serif]",
        "pb-[120px]",
      ].join(" ")}
      aria-label="Webinar discovery"
    >
      {/* ── Background blueprint grid ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-grid"
      />

      {/* ── 1. Section header ─────────────────────────────────────────────── */}
      {/*
        To use your shared Header.tsx:
        1. Remove <DiscoverySectionHeader ... /> below
        2. import { Header } from "@/components/Header";
        3. Replace with <Header eyebrow={eyebrow} title={title} ... />
           and separately render the filteredCount badge if needed.
      */}
      <DiscoverySectionHeader
        eyebrow={eyebrow}
        title={title}
        filteredCount={filtered.length}
        totalCount={WEBINARS.length}
      />

      {/* ── 2. Controls bar ────────────────────────────────────────────────── */}
      <DiscoveryControls
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        sortBy={sortBy}
        viewMode={viewMode}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onViewModeChange={handleViewModeChange}
      />

      {/* ── 3. Card grid ──────────────────────────────────────────────────── */}
      <div id="webinar-grid" className="relative z-[2] px-[60px] py-12 max-md:px-6">
        <WebinarGrid
          webinars={paginated}
          viewMode={viewMode}
          animationKey={animationKey}
          onCardClick={onWebinarSelect}
        />
      </div>

      {/* ── 4. Pagination ─────────────────────────────────────────────────── */}
      <DiscoveryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={filtered.length}
        perPage={PER_PAGE}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
