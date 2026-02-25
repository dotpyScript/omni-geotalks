// components/sections/WebinarDiscovery.tsx
'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionsHeaders';
import {
  SearchInput,
  FilterPill,
  Select,
  ViewToggle,
  type ViewMode,
} from '@/components/ui/Input';
import { WebinarGrid, type WebinarCardData } from '@/components/ui/WebinarCard';
import { Pagination } from '@/components/ui/Pagination';
import { cn } from '@/lib/utils';

// SearchInput, FilterPill, ViewToggle, Select, type ViewMode

// ─── Types ────────────────────────────────────────────────────────────────────
export type SortOption = 'date-asc' | 'date-desc' | 'popular';

export interface DiscoveryCategory {
  id: string;
  label: string;
  count?: number;
}

export interface WebinarDiscoveryProps {
  webinars?: WebinarCardData[];
  categories?: DiscoveryCategory[];
  itemsPerPage?: number;
  className?: string;
}

// ─── Static data (exact from original) ───────────────────────────────────────
const DEFAULT_CATEGORIES: DiscoveryCategory[] = [
  { id: 'all', label: 'All Topics' },
  { id: 'gis', label: 'GIS & Mapping' },
  { id: 'drones', label: 'Drone Surveys' },
  { id: 'agriculture', label: 'Precision Agric' },
  { id: 'oil-gas', label: 'Oil & Gas' },
  { id: 'remote', label: 'Remote Sensing' },
];

// Category id → categoryLabel mapping
const CAT_ID_TO_LABEL: Record<string, string> = {
  gis: 'GIS & Mapping',
  drones: 'Drone Surveys',
  agriculture: 'Precision Agric',
  'oil-gas': 'Oil & Gas',
  remote: 'Remote Sensing',
};

const DEFAULT_WEBINARS: WebinarCardData[] = [
  {
    id: 1,
    category: 'gis',
    categoryLabel: 'GIS & Mapping',
    status: 'live',
    platform: 'Zoom',
    title: 'Advanced GIS Techniques for Urban Infrastructure Mapping',
    description:
      'Deep dive into cutting-edge GIS methodologies transforming how cities plan and manage critical infrastructure assets.',
    date: 'Thu, 15 May 2025',
    time: '10:00 AM WAT',
    duration: '90 min',
    speakers: [
      { initials: 'AK', name: 'Dr. A. Kalu' },
      { initials: 'SM', name: 'S. Musa' },
    ],
    registrations: 214,
    bannerIndex: 0,
  },
  {
    id: 2,
    category: 'drones',
    categoryLabel: 'Drone Surveys',
    status: 'upcoming',
    platform: 'Google Meet',
    title: 'Drone-Based Pipeline Surveillance & Leak Detection',
    description:
      'How UAV technology is revolutionising real-time monitoring of oil and gas pipelines across the Niger Delta region.',
    date: 'Thu, 22 May 2025',
    time: '2:00 PM WAT',
    duration: '75 min',
    speakers: [
      { initials: 'RO', name: 'R. Okonkwo' },
      { initials: 'LB', name: 'L. Bello' },
    ],
    registrations: 187,
    bannerIndex: 1,
  },
  {
    id: 3,
    category: 'agriculture',
    categoryLabel: 'Precision Agric',
    status: 'upcoming',
    platform: 'Zoom',
    title: 'Precision Farming: Satellite Imagery & Crop Yield Analytics',
    description:
      'Leveraging multispectral satellite data and AI-driven analytics to predict and improve crop yields across West Africa.',
    date: 'Tue, 3 Jun 2025',
    time: '11:00 AM WAT',
    duration: '60 min',
    speakers: [{ initials: 'FN', name: 'F. Nwosu' }],
    registrations: 143,
    bannerIndex: 2,
  },
  {
    id: 4,
    category: 'oil-gas',
    categoryLabel: 'Oil & Gas',
    status: 'upcoming',
    platform: 'Zoom',
    title: 'Geospatial Intelligence for Offshore Asset Management',
    description:
      'Integrating GIS and remote sensing for comprehensive offshore facility monitoring, risk assessment and regulatory compliance.',
    date: 'Wed, 18 Jun 2025',
    time: '10:00 AM WAT',
    duration: '90 min',
    speakers: [
      { initials: 'CE', name: 'C. Effiong' },
      { initials: 'OA', name: 'O. Adeyemi' },
      { initials: 'MJ', name: 'M. James' },
    ],
    registrations: 98,
    bannerIndex: 3,
  },
  {
    id: 5,
    category: 'remote',
    categoryLabel: 'Remote Sensing',
    status: 'upcoming',
    platform: 'Google Meet',
    title: 'SAR & Multispectral Remote Sensing for Environmental Monitoring',
    description:
      'Practical applications of Synthetic Aperture Radar in tracking deforestation, flooding and coastal erosion dynamics.',
    date: 'Wed, 2 Jul 2025',
    time: '2:00 PM WAT',
    duration: '90 min',
    speakers: [{ initials: 'BB', name: 'B. Bassey' }],
    registrations: 76,
    bannerIndex: 4,
  },
  {
    id: 6,
    category: 'gis',
    categoryLabel: 'GIS & Mapping',
    status: 'completed',
    platform: 'Zoom',
    title: 'Land Administration & Cadastral Mapping in Emerging Markets',
    description:
      'Exploring best practices for digital land registration and dispute resolution using geospatial technologies.',
    date: 'Thu, 10 Apr 2025',
    time: '10:00 AM WAT',
    duration: '75 min',
    speakers: [
      { initials: 'HI', name: 'H. Ibrahim' },
      { initials: 'PO', name: 'P. Ojo' },
    ],
    registrations: 302,
    bannerIndex: 5,
  },
  {
    id: 7,
    category: 'drones',
    categoryLabel: 'Drone Surveys',
    status: 'completed',
    platform: 'Zoom',
    title: 'LiDAR Point Cloud Processing for Topographic Surveys',
    description:
      'End-to-end workflow for acquiring, processing and delivering LiDAR-derived products for engineering and construction.',
    date: 'Tue, 25 Mar 2025',
    time: '11:00 AM WAT',
    duration: '90 min',
    speakers: [{ initials: 'TW', name: 'T. Williams' }],
    registrations: 258,
    bannerIndex: 6,
  },
  {
    id: 8,
    category: 'oil-gas',
    categoryLabel: 'Oil & Gas',
    status: 'upcoming',
    platform: 'Zoho',
    title: 'Digital Twin Technology in Oil Field Development Planning',
    description:
      'How geospatial digital twins are reducing exploration risk and accelerating field development decisions.',
    date: 'Tue, 15 Jul 2025',
    time: '1:00 PM WAT',
    duration: '60 min',
    speakers: [
      { initials: 'JE', name: 'J. Ezeh' },
      { initials: 'NK', name: 'N. Kanu' },
    ],
    registrations: 54,
    bannerIndex: 7,
  },
];

const SORT_OPTIONS = [
  { value: 'date-asc', label: 'Date: Soonest First' },
  { value: 'date-desc', label: 'Date: Latest First' },
  { value: 'popular', label: 'Most Popular' },
];

const PER_PAGE_DEFAULT = 6;

// ─── Controls bar ─────────────────────────────────────────────────────────────
// Exact .disc-controls layout:
//   py-8 px-[60px], flex wrap gap-4, border-bottom, gradient top bg,
//   search (flex 1 min 220px max 340px) | filter pills | sort (ml-auto) | view toggle
interface ControlsBarProps {
  search: string;
  onSearch: (v: string) => void;
  onClearSearch: () => void;
  category: string;
  categories: DiscoveryCategory[];
  onCategory: (id: string) => void;
  sort: string;
  onSort: (v: string) => void;
  view: ViewMode;
  onView: (v: ViewMode) => void;
}

function ControlsBar({
  search,
  onSearch,
  onClearSearch,
  category,
  categories,
  onCategory,
  sort,
  onSort,
  view,
  onView,
}: ControlsBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative z-[2]',
        'flex items-center gap-4 flex-wrap',
        // .disc-controls padding and borders
        'px-[60px] py-8',
        'border-b border-[rgba(201,168,76,0.14)]',
        // gradient top
        'bg-gradient-to-b from-[rgba(13,17,24,0.6)] to-transparent',
        // responsive
        'max-md:px-6',
      )}
    >
      {/* Search — .disc-search: flex 1, min 220, max 340 */}
      <SearchInput
        size='md'
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        onClear={onClearSearch}
        placeholder='Search webinars…'
        wrapperClass='flex-1 min-w-[220px] max-w-[340px]'
      />

      {/* Category filter pills — .disc-filters */}
      <div className='flex items-center gap-2 flex-wrap'>
        {categories.map((cat) => (
          <FilterPill
            key={cat.id}
            label={cat.label}
            count={cat.count}
            active={category === cat.id}
            onClick={() => onCategory(cat.id)}
          />
        ))}
      </div>

      {/* Sort — .disc-sort: ml-auto */}
      <div className='ml-auto flex items-center gap-3 flex-wrap'>
        <Select
          size='md'
          options={SORT_OPTIONS}
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          wrapperClass='w-[210px]'
        />

        {/* View toggle — .disc-view-toggle */}
        <ViewToggle value={view} onChange={onView} />
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function WebinarDiscovery({
  webinars = DEFAULT_WEBINARS,
  categories = DEFAULT_CATEGORIES,
  itemsPerPage = PER_PAGE_DEFAULT,
  className,
}: WebinarDiscoveryProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<SortOption>('date-asc');
  const [view, setView] = useState<ViewMode>('grid');
  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  // Reset page + trigger re-stagger on every filter change
  const triggerReveal = useCallback(() => {
    setAnimKey((k) => k + 1);
    setPage(1);
  }, []);

  const handleSearch = (v: string) => {
    setSearch(v);
    triggerReveal();
  };
  const handleCategory = (id: string) => {
    setCategory(id);
    triggerReveal();
  };
  const handleSort = (v: string) => {
    setSort(v as SortOption);
    triggerReveal();
  };

  // ── Filter + sort (memo) ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...webinars];

    // Category filter
    if (category !== 'all') {
      const label = CAT_ID_TO_LABEL[category] ?? category;
      list = list.filter(
        (w) => w.categoryLabel === label || w.category === category,
      );
    }

    // Text search: title + description
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          (w.description ?? '').toLowerCase().includes(q),
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sort === 'popular') return b.registrations - a.registrations;
      // id as proxy for date order
      const ai = Number(a.id),
        bi = Number(b.id);
      return sort === 'date-asc' ? ai - bi : bi - ai;
    });

    return list;
  }, [webinars, category, search, sort]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  // Live result count label (matches original: "Total Events" | "Results Found")
  const countLabel =
    filtered.length === webinars.length ? 'Total Events' : 'Results Found';

  return (
    // .disc-section
    <section
      className={cn(
        'relative bg-[#080a0f] text-[#f0ede6] overflow-hidden',
        'pb-[120px]',
        className,
      )}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* .disc-section::before — blueprint grid 80×80px */}
      <div
        className='absolute inset-0 pointer-events-none z-0'
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden
      />

      {/* ── Section header — .disc-header ── */}
      {/* split layout: eyebrow + title left, result count right */}
      <SectionHeader
        eyebrow='Expert-Led Sessions'
        title={
          <>
            Discover <em>Webinars</em>
          </>
        }
        layout='split'
        bordered
        padding='px-[60px] pt-[100px] pb-[60px] max-md:px-6 max-md:pt-[72px] max-md:pb-[40px]'
        rightSlot={
          // .disc-count — Bebas number + label
          <div
            className='flex flex-col items-end shrink-0 max-sm:items-start'
            aria-live='polite'
          >
            <span
              className='leading-none tracking-[0.05em] text-[#e8c97e]'
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '3rem',
              }}
            >
              {filtered.length}
            </span>
            <span
              className='text-[0.62rem] tracking-[0.15em] uppercase text-[rgba(240,237,230,0.28)] mt-0.5'
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {countLabel}
            </span>
          </div>
        }
      />

      {/* ── Controls bar ── */}
      <ControlsBar
        search={search}
        onSearch={handleSearch}
        onClearSearch={() => handleSearch('')}
        category={category}
        categories={categories}
        onCategory={handleCategory}
        sort={sort}
        onSort={handleSort}
        view={view}
        onView={(v) => setView(v)}
      />

      {/* ── Grid wrap — .disc-grid-wrap padding 48px 60px ── */}
      <div className='relative z-[2] px-[60px] pt-12 max-md:px-6'>
        <WebinarGrid
          webinars={paginated}
          view={view}
          animKey={animKey}
          onAction={(id) => {
            // TODO: router.push(`/webinars/${id}`)
            console.log('Navigate to webinar:', id);
          }}
        />
      </div>

      {/* ── Pagination — .disc-pagination padding 0 60px ── */}
      {totalPages > 1 && (
        <div className='relative z-[2] px-[60px] mt-12 max-md:px-6'>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={filtered.length}
            itemsPerPage={itemsPerPage}
            onChange={(p) => {
              setPage(p);
              setAnimKey((k) => k + 1);
              // Scroll to top of section
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            showInfo
            itemLabel='webinars'
          />
        </div>
      )}
    </section>
  );
}

export default WebinarDiscovery;
