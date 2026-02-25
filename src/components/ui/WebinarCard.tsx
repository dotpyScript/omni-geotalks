// components/ui/WebinarCard.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export type WebinarStatus =
  | 'live'
  | 'upcoming'
  | 'completed'
  | 'cancelled'
  | 'draft';
export type WebinarView = 'grid' | 'list';

export interface WebinarSpeaker {
  initials: string;
  name: string;
}

export interface WebinarBanner {
  /** CSS gradient string */
  bg: string;
  /** emoji or single character icon */
  icon: string;
}

export interface WebinarCardData {
  id: number | string;
  /** category id — e.g. "gis", "drones" */
  category: string;
  /** display label — e.g. "GIS & Mapping" */
  categoryLabel: string;
  status: WebinarStatus;
  title: string;
  description?: string;
  /** display string e.g. "Thu, 22 May 2025" */
  date: string;
  /** display string e.g. "2:00 PM WAT" */
  time: string;
  duration: string;
  platform: string;
  speakers: WebinarSpeaker[];
  registrations: number;
  /** explicit banner — if omitted bannerIndex or id is used to pick a preset */
  banner?: WebinarBanner;
  bannerIndex?: number;
}

export interface WebinarCardProps {
  webinar: WebinarCardData;
  view?: WebinarView;
  /** position index drives stagger delay */
  index?: number;
  onAction?: (id: WebinarCardData['id']) => void;
  className?: string;
}

// ─── 8 preset banner gradients (exact match from original) ───────────────────
export const BANNER_PRESETS: WebinarBanner[] = [
  {
    bg: 'linear-gradient(135deg, #0d1f35 0%, #0a1a2e 40%, #0d2535 100%)',
    icon: '🛰️',
  },
  {
    bg: 'linear-gradient(135deg, #1a1200 0%, #2a1f00 40%, #1a1500 100%)',
    icon: '🌍',
  },
  {
    bg: 'linear-gradient(135deg, #001a1a 0%, #002828 40%, #001f1f 100%)',
    icon: '✈️',
  },
  {
    bg: 'linear-gradient(135deg, #1a0d00 0%, #2a1800 40%, #1a1000 100%)',
    icon: '🌾',
  },
  {
    bg: 'linear-gradient(135deg, #0d0d1a 0%, #16162a 40%, #0d0d20 100%)',
    icon: '📡',
  },
  {
    bg: 'linear-gradient(135deg, #001a0d 0%, #002a18 40%, #001a10 100%)',
    icon: '🗺️',
  },
  {
    bg: 'linear-gradient(135deg, #1a0d1a 0%, #2a152a 40%, #1a0d1a 100%)',
    icon: '🔭',
  },
  {
    bg: 'linear-gradient(135deg, #1a1a00 0%, #2a2a00 40%, #1a1a00 100%)',
    icon: '⛽',
  },
];

// ─── Status badge config ──────────────────────────────────────────────────────
// Exactly matches .wcard__status-badge.live / .upcoming / .completed
const STATUS_CFG: Record<
  WebinarStatus,
  {
    label: string;
    text: string;
    bg: string;
    border: string;
    pulse: boolean;
  }
> = {
  live: {
    label: 'Live Now',
    text: 'text-[#00e5a0]',
    bg: 'bg-[rgba(0,229,160,0.15)]',
    border: 'border border-[rgba(0,229,160,0.35)]',
    pulse: true,
  },
  upcoming: {
    label: 'Upcoming',
    text: 'text-[#00d4ff]',
    bg: 'bg-[rgba(0,212,255,0.10)]',
    border: 'border border-[rgba(0,212,255,0.28)]',
    pulse: true,
  },
  completed: {
    label: 'Recording',
    text: 'text-[#c9a84c]',
    bg: 'bg-[rgba(201,168,76,0.10)]',
    border: 'border border-[rgba(201,168,76,0.22)]',
    pulse: false,
  },
  cancelled: {
    label: 'Cancelled',
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border border-red-500/25',
    pulse: false,
  },
  draft: {
    label: 'Draft',
    text: 'text-[rgba(240,237,230,0.4)]',
    bg: 'bg-[rgba(240,237,230,0.05)]',
    border: 'border border-[rgba(240,237,230,0.12)]',
    pulse: false,
  },
};

// ─── CTA label per status ─────────────────────────────────────────────────────
function ctaLabel(status: WebinarStatus): string {
  if (status === 'live') return 'Join Now →';
  if (status === 'completed') return '▶ Watch';
  return 'Register →';
}

// ─── Banner Placeholder ───────────────────────────────────────────────────────
// Pixel-faithful reproduction of BannerPlaceholder from the original JSX:
//   gradient bg, 3rem emoji at 0.35 opacity, SVG blueprint grid (6 vertical × 4 horizontal
//   lines with #c9a84c 0.5px at 0.07 opacity), corner bracket marks (18×18px, 1px gold-40%)
export function BannerPlaceholder({
  banner,
  className,
}: {
  banner: WebinarBanner;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative w-full h-full flex items-center justify-center overflow-hidden',
        className,
      )}
      style={{ background: banner.bg }}
    >
      {/* Emoji icon */}
      <span
        className='select-none pointer-events-none'
        style={{ fontSize: '3rem', opacity: 0.35 }}
        aria-hidden
      >
        {banner.icon}
      </span>

      {/* Blueprint grid — SVG, opacity 0.07, exactly 6 vertical + 4 horizontal lines */}
      <svg
        className='absolute inset-0 w-full h-full pointer-events-none'
        style={{ opacity: 0.07 }}
        viewBox='0 0 220 115'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={`v${i}`}
            x1={i * 44}
            y1='0'
            x2={i * 44}
            y2='115'
            stroke='#c9a84c'
            strokeWidth='0.5'
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`h${i}`}
            x1='0'
            y1={i * 38}
            x2='220'
            y2={i * 38}
            stroke='#c9a84c'
            strokeWidth='0.5'
          />
        ))}
      </svg>

      {/* Top-left corner bracket */}
      <div
        className='absolute pointer-events-none'
        style={{
          top: 10,
          left: 10,
          width: 18,
          height: 18,
          borderTop: '1px solid rgba(201,168,76,0.4)',
          borderLeft: '1px solid rgba(201,168,76,0.4)',
        }}
        aria-hidden
      />

      {/* Bottom-right corner bracket */}
      <div
        className='absolute pointer-events-none'
        style={{
          bottom: 10,
          right: 10,
          width: 18,
          height: 18,
          borderBottom: '1px solid rgba(201,168,76,0.4)',
          borderRight: '1px solid rgba(201,168,76,0.4)',
        }}
        aria-hidden
      />
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
// .wcard__status-badge — absolute top-right on the banner
function StatusBadge({ status }: { status: WebinarStatus }) {
  const cfg = STATUS_CFG[status];
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5',
        'text-[0.6rem] tracking-[0.22em] uppercase font-medium',
        'px-[11px] py-[5px]',
        cfg.text,
        cfg.bg,
        cfg.border,
      )}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Pulse dot — .wcard__status-badge .pulse */}
      {cfg.pulse && (
        <span
          className='w-[5px] h-[5px] rounded-full bg-current shrink-0'
          style={{ animation: 'pulse 2s infinite' }}
        />
      )}
      {cfg.label}
    </div>
  );
}

// ─── Category Badge ───────────────────────────────────────────────────────────
// .wcard__cat-badge — absolute bottom-left on the banner
function CategoryBadge({ label }: { label: string }) {
  return (
    <div
      className={cn(
        'text-[0.6rem] tracking-[0.2em] uppercase',
        'px-[10px] py-1',
        'bg-[rgba(8,10,15,0.75)] border border-[rgba(201,168,76,0.3)]',
        'text-[#e8c97e] backdrop-blur-[6px]',
      )}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {label}
    </div>
  );
}

// ─── Speaker Avatars ──────────────────────────────────────────────────────────
// .wcard__avatars + .wcard__avatar — 28px circles, -6px overlap, gold-light initials
function SpeakerAvatars({
  speakers,
  max = 3,
}: {
  speakers: WebinarSpeaker[];
  max?: number;
}) {
  const shown = speakers.slice(0, max);
  const extras = speakers.length - max;

  return (
    <div className='flex items-center gap-2.5'>
      {/* Avatar stack */}
      <div className='flex'>
        {shown.map((s, i) => (
          <div
            key={i}
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center shrink-0',
              'border-2 border-[#0d1118]',
              'bg-gradient-to-br from-[#181d28] to-[#12161f]',
              'text-[0.55rem] text-[#e8c97e] font-semibold',
              i > 0 && '-ml-1.5',
            )}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {s.initials}
          </div>
        ))}
        {extras > 0 && (
          <div
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center shrink-0 -ml-1.5',
              'border-2 border-[#0d1118] bg-[#12161f]',
              'text-[0.5rem] text-[rgba(240,237,230,0.4)]',
            )}
          >
            +{extras}
          </div>
        )}
      </div>

      {/* Name text */}
      <div
        className='text-[0.68rem] leading-tight font-light flex-1 min-w-0'
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <strong className='block text-[rgba(240,237,230,0.55)] font-normal truncate'>
          {speakers[0]?.name}
        </strong>
        {speakers.length > 1 && (
          <span className='text-[rgba(240,237,230,0.28)]'>
            +{speakers.length - 1} more
          </span>
        )}
      </div>
    </div>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
// .wcard__cta — primary=gold, watch=ghost border gold, live=green
function CtaButton({
  status,
  onClick,
}: {
  status: WebinarStatus;
  onClick: () => void;
}) {
  const isLive = status === 'live';
  const isCompleted = status === 'completed';

  return (
    <motion.button
      type='button'
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        // Only apply clip-path on non-completed (completed uses ghost .wcard__cta.watch which has clip-path: none)
        clipPath: isCompleted
          ? undefined
          : 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))',
      }}
      className={cn(
        'text-[0.65rem] tracking-[0.18em] uppercase font-medium',
        'px-5 py-[9px] border cursor-pointer shrink-0',
        'transition-all duration-[250ms]',
        isLive
          ? [
              'bg-gradient-to-br from-[#00e5a0] to-[#00c882]',
              'text-[#001a10] border-transparent',
              'hover:shadow-[0_6px_20px_rgba(0,229,160,0.3)]',
            ]
          : isCompleted
            ? [
                // .wcard__cta.watch — transparent bg, gold border, no clip
                'bg-transparent border-[rgba(201,168,76,0.3)] text-[#c9a84c]',
                'hover:bg-[rgba(201,168,76,0.12)] hover:shadow-none',
              ]
            : [
                // primary — gold gradient
                'bg-gradient-to-br from-[#c9a84c] to-[#e8c97e]',
                'text-[#080a0f] border-transparent',
                'hover:from-[#e8c97e] hover:to-[#f5e6c0]',
                'hover:shadow-[0_6px_20px_rgba(201,168,76,0.3)]',
              ],
      )}
    >
      {ctaLabel(status)}
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GRID CARD
// Full faithful wcard grid layout:
//   banner 52% aspect, gradient overlay, status badge (top-right), cat badge (bottom-left),
//   body: date row + duration, Cormorant title, 2-line desc, speaker avatars (auto),
//   footer: reg count (◈ prefix) + CTA button.
// ═══════════════════════════════════════════════════════════════════════════════
function GridCard({
  webinar,
  index = 0,
  onAction,
  className,
}: WebinarCardProps) {
  const banner =
    webinar.banner ??
    BANNER_PRESETS[
      (webinar.bannerIndex ?? Number(webinar.id) - 1) % BANNER_PRESETS.length
    ]!;

  const isCompleted = webinar.status === 'completed';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => onAction?.(webinar.id)}
      className={cn(
        // .wcard
        'flex flex-col relative overflow-hidden cursor-pointer group',
        'bg-gradient-to-br from-[#0d1118] to-[#12161f]',
        'border border-[rgba(201,168,76,0.14)]',
        'transition-[transform,border-color,box-shadow] duration-300 ease-out',
        // .wcard:hover
        'hover:-translate-y-[5px]',
        'hover:border-[rgba(201,168,76,0.3)]',
        'hover:shadow-[0_8px_40px_rgba(201,168,76,0.18)]',
        className,
      )}
    >
      {/* Top gold shimmer line — .wcard::before opacity 0→1 on hover */}
      <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c9a84c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10' />

      {/* ── Banner ── .wcard__banner padding-top 52% */}
      <div
        className='relative w-full overflow-hidden'
        style={{ paddingTop: '52%' }}
      >
        <div className='absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]'>
          <BannerPlaceholder banner={banner} />
        </div>

        {/* .wcard__banner-overlay: transparent 40% → obsidian-2 100% */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent from-[40%] to-[#0d1118] z-[1]' />

        {/* .wcard__status-badge — top right */}
        <div className='absolute top-3.5 right-3.5 z-[2]'>
          <StatusBadge status={webinar.status} />
        </div>

        {/* .wcard__cat-badge — bottom left */}
        <div className='absolute bottom-3.5 left-3.5 z-[2]'>
          <CategoryBadge label={webinar.categoryLabel} />
        </div>
      </div>

      {/* ── Body ── .wcard__body padding 24px 24px 20px */}
      <div className='flex flex-col flex-1 px-6 pt-6 pb-5'>
        {/* .wcard__date-row */}
        <div className='flex items-center gap-4 mb-3.5'>
          <span
            className='text-[0.68rem] tracking-[0.12em] uppercase text-[#c9a84c]'
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {isCompleted ? '✓ ' : '◷ '}
            {webinar.date} · {webinar.time}
          </span>
          <span className='text-[0.65rem] text-[rgba(240,237,230,0.28)] tracking-[0.06em] ml-auto'>
            {webinar.duration}
          </span>
        </div>

        {/* .wcard__title — Cormorant 1.25rem weight 400, hover gold-pale */}
        <h3
          className={cn(
            'text-[1.25rem] font-normal leading-[1.3] text-[#f0ede6] mb-3',
            'transition-colors duration-[250ms]',
            'group-hover:text-[#f5e6c0]',
          )}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {webinar.title}
        </h3>

        {/* .wcard__desc — 2-line clamp, 0.78rem, ivory-muted */}
        {webinar.description && (
          <p
            className='text-[0.78rem] leading-[1.6] text-[rgba(240,237,230,0.28)] font-light mb-5 line-clamp-2'
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {webinar.description}
          </p>
        )}

        {/* .wcard__speakers — mt-auto, border-top gold-14 */}
        <div className='mt-auto pt-[18px] border-t border-[rgba(201,168,76,0.14)]'>
          <SpeakerAvatars speakers={webinar.speakers} />
        </div>
      </div>

      {/* ── Footer ── .wcard__footer padding 0 24px 22px */}
      <div className='flex items-center justify-between px-6 pb-[22px]'>
        {/* .wcard__reg-count — ◈ prefix via ::before */}
        <span
          className='text-[0.65rem] text-[rgba(240,237,230,0.28)] tracking-[0.08em] flex items-center gap-1.5'
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <span className='text-[#c9a84c] text-[0.6rem]'>◈</span>
          {webinar.registrations.toLocaleString()} registered
        </span>

        <CtaButton
          status={webinar.status}
          onClick={() => onAction?.(webinar.id)}
        />
      </div>
    </motion.article>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LIST CARD
// .disc-grid.list-view .wcard:
//   flex-direction row, max-height 160px
//   banner: 220px wide, min-height 160px, no padding-top
//   body: flex-row, items-center, gap 24px
//   title: 1.1rem, flex 1, mb 0
//   desc: display none
//   speakers: no border-top, no padding/margin
//   footer: column, items-end, gap 10, min-width 140px
// ═══════════════════════════════════════════════════════════════════════════════

function ListCard({
  webinar,
  index = 0,
  onAction,
  className,
}: WebinarCardProps) {
  const banner =
    webinar.banner ??
    BANNER_PRESETS[
      (webinar.bannerIndex ?? Number(webinar.id) - 1) % BANNER_PRESETS.length
    ]!;

  const isCompleted = webinar.status === 'completed';

  return (
    <motion.article
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.42,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => onAction?.(webinar.id)}
      className={cn(
        'flex cursor-pointer group relative overflow-hidden',
        'bg-gradient-to-br from-[#0d1118] to-[#12161f]',
        'border border-[rgba(201,168,76,0.14)]',
        'max-h-[160px]', // .disc-grid.list-view .wcard max-height: 160px
        'transition-[border-color,box-shadow,transform] duration-300 ease-out',
        'hover:border-[rgba(201,168,76,0.3)]',
        'hover:shadow-[0_4px_24px_rgba(201,168,76,0.14)]',
        'hover:translate-x-0.5',
        className,
      )}
    >
      {/* Left accent line on hover */}
      <div className='absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#c9a84c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10' />

      {/* .disc-grid.list-view .wcard__banner — 220px wide, min-h 160px */}
      <div
        className='relative flex-shrink-0 overflow-hidden'
        style={{ width: 220, minHeight: 160 }}
      >
        <div className='absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]'>
          <BannerPlaceholder banner={banner} />
        </div>
        <div className='absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(13,17,24,0.55)]' />

        {/* Status badge on thumbnail */}
        <div className='absolute top-3 left-3 z-[2]'>
          <StatusBadge status={webinar.status} />
        </div>
      </div>

      {/* .disc-grid.list-view .wcard__body — flex-row, items-center, gap 24, padding 20px 24px */}
      <div className='flex flex-1 items-center gap-6 px-6 py-5 min-w-0'>
        {/* Title + date meta — flex: 1 */}
        <div className='flex-1 min-w-0'>
          <span
            className='text-[0.65rem] tracking-[0.12em] uppercase text-[#c9a84c] block mb-1.5'
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {isCompleted ? '✓ ' : '◷ '}
            {webinar.date} · {webinar.time} · {webinar.duration}
          </span>
          {/* .disc-grid.list-view .wcard__title — 1.1rem, flex 1, mb 0 */}
          <h3
            className='text-[1.1rem] font-normal leading-[1.3] text-[#f0ede6] truncate group-hover:text-[#f5e6c0] transition-colors duration-[250ms]'
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {webinar.title}
          </h3>
          <span className='text-[0.6rem] tracking-[0.14em] uppercase text-[rgba(240,237,230,0.3)] mt-1 block'>
            {webinar.categoryLabel}
          </span>
        </div>

        {/* .disc-grid.list-view .wcard__speakers — no border, no pad/margin */}
        <div className='hidden md:block shrink-0'>
          <SpeakerAvatars speakers={webinar.speakers} max={2} />
        </div>

        {/* .disc-grid.list-view .wcard__footer — col, items-end, gap 10, min-w 140px, no left padding */}
        <div className='flex flex-col items-end gap-2.5 shrink-0 min-w-[140px]'>
          <CtaButton
            status={webinar.status}
            onClick={() => onAction?.(webinar.id)}
          />
          <span
            className='text-[0.62rem] text-[rgba(240,237,230,0.25)] tracking-[0.06em] flex items-center gap-1'
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className='text-[#c9a84c] text-[0.55rem]'>◈</span>
            {webinar.registrations.toLocaleString()} registered
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
// .disc-empty — centered in grid, ◎ icon, Cormorant title, muted subtext
export function WebinarEmptyState({
  title = 'No webinars found',
  message = 'Try adjusting your search or category filter',
  className,
}: {
  title?: string;
  message?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={cn(
        // grid-column: 1 / -1 — parent handles this
        'col-span-full flex flex-col items-center text-center',
        'py-20 px-10 gap-4',
        className,
      )}
    >
      {/* .disc-empty__icon */}
      <div className='text-[2.5rem] opacity-20 mb-2 select-none'>◎</div>

      {/* .disc-empty__title */}
      <h3
        className='text-[1.6rem] font-light text-[rgba(240,237,230,0.55)]'
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {title}
      </h3>

      {/* .disc-empty__sub */}
      <p
        className='text-[0.8rem] text-[rgba(240,237,230,0.28)]'
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {message}
      </p>
    </motion.div>
  );
}

// ─── Main dispatcher ──────────────────────────────────────────────────────────
export function WebinarCard(props: WebinarCardProps) {
  return props.view === 'list' ? (
    <ListCard {...props} />
  ) : (
    <GridCard {...props} />
  );
}

// ─── WebinarGrid container ────────────────────────────────────────────────────
// Handles grid vs list class switching and stagger via animKey
export interface WebinarGridProps {
  webinars: WebinarCardData[];
  view?: WebinarView;
  /** changing this value retriggers stagger animation */
  animKey?: number | string;
  onAction?: (id: WebinarCardData['id']) => void;
  className?: string;
}

export function WebinarGrid({
  webinars,
  view = 'grid',
  animKey,
  onAction,
  className,
}: WebinarGridProps) {
  if (!webinars.length) {
    return (
      <div className='grid grid-cols-1'>
        <WebinarEmptyState />
      </div>
    );
  }

  return (
    <div
      key={animKey}
      className={cn(
        view === 'grid'
          ? // .disc-grid: 3 cols, 24px gap; 2 cols @1100; 1 col @768
            'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
          : // .disc-grid.list-view: 1 col, 16px gap
            'flex flex-col gap-4',
        className,
      )}
    >
      {webinars.map((w, i) => (
        <WebinarCard
          key={w.id}
          webinar={w}
          view={view}
          index={i}
          onAction={onAction}
        />
      ))}
    </div>
  );
}
