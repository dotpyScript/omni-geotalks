'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Users, Radio } from 'lucide-react';
import type { Webinar } from '@/components/sections/webinerDiscovery/types';
import { BannerPlaceholder } from '@/components/sections/webinerDiscovery/BannerPlaceholder';
import { WebinarCard } from '@/components/sections/webinerDiscovery/WebinarCard';
import {
  WEBINARS,
  CATEGORIES,
} from '@/components/sections/webinerDiscovery/data';

// ─── Unsplash image map (banner index → topic-matched URL) ───────────────────
//
// Uses Unsplash Source API: https://source.unsplash.com/featured/?{keyword}
// Each URL is deterministic and serves a high-quality, free-to-use photo.
// Falls back to <BannerPlaceholder> if the image fails to load.
//
// Banner indices from data.ts:
//   0 → GIS / Urban Infrastructure Mapping    (satellite city aerial)
//   1 → Drone Pipeline Surveillance            (drone aerial industrial)
//   2 → Precision Farming / Crop Analytics     (farm field crop aerial)
//   3 → Offshore Asset / Oil & Gas             (offshore oil rig ocean)
//   4 → SAR / Remote Sensing / Environment     (forest deforestation satellite)
//   5 → Land Administration / Cadastral        (land survey map terrain)
//   6 → LiDAR / Topographic Survey             (topography terrain mountains)
//   7 → Digital Twin / Oil Field Development   (technology data energy)

const BANNER_IMAGES: Record<number, string> = {
  0: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80&fit=crop', // city aerial night
  1: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80&fit=crop', // drone flying aerial
  2: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80&fit=crop', // farm field golden crops
  3: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80&fit=crop', // oil rig offshore ocean
  4: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80&fit=crop', // forest aerial green
  5: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=80&fit=crop', // map terrain topographic
  6: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80&fit=crop', // mountain topography terrain
  7: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&fit=crop', // technology circuit data
};

// ─── Smart Banner component — real image with BannerPlaceholder fallback ─────

interface SmartBannerProps {
  index: number;
}

function SmartBanner({ index }: SmartBannerProps) {
  const [imgError, setImgError] = useState(false);
  const src = BANNER_IMAGES[index];

  if (!src || imgError) {
    return <BannerPlaceholder index={index} />;
  }

  return (
    <img
      src={src}
      alt=''
      aria-hidden='true'
      className='absolute inset-0 w-full h-full object-cover'
      onError={() => setImgError(true)}
      loading='lazy'
      decoding='async'
    />
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCatLabel(category: string) {
  return CATEGORIES.find((c) => c.id === category)?.label ?? category;
}

// ─── Featured Card ────────────────────────────────────────────────────────────

interface FeaturedCardProps {
  webinar: Webinar;
  onClick?: (id: number) => void;
}

function FeaturedCard({ webinar, onClick }: FeaturedCardProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const isLive = webinar.status === 'live';
  const isCompleted = webinar.status === 'completed';
  const catLabel = getCatLabel(webinar.category);

  return (
    <motion.article
      className='relative overflow-hidden cursor-pointer'
      style={{
        background: 'linear-gradient(145deg, var(--obsidian-2) 0%, var(--obsidian-3) 100%)',
        border: isLive
          ? '1px solid color-mix(in srgb, var(--green) 20%, transparent)'
          : '1px solid var(--border)',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => { router.push('/webinars/' + webinar.id); onClick?.(webinar.id); }}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') { router.push('/webinars/' + webinar.id); onClick?.(webinar.id); } }}
    >
      {/* Top accent */}
      <div
        className='absolute top-0 left-0 right-0 h-0.5 z-10'
        style={{
          background: isLive
            ? 'linear-gradient(90deg, var(--green), color-mix(in srgb, var(--green) 30%, transparent), transparent)'
            : 'linear-gradient(90deg, var(--gold), color-mix(in srgb, var(--gold) 40%, transparent), transparent)',
        }}
      />

      <div className='grid grid-cols-[1fr_1fr] max-[900px]:grid-cols-1'>
        {/* Left: Banner */}
        <div className='relative overflow-hidden min-h-95 max-[900px]:min-h-60'>
          <motion.div
            className='absolute inset-0'
            animate={{
              scale: hovered ? 1.05 : 1,
              filter: hovered
                ? 'brightness(1.12) saturate(1.08)'
                : 'brightness(0.88) saturate(0.95)',
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <SmartBanner index={webinar.banner} />
          </motion.div>

          {/* Seam fade — only the last 22% bleeds into content panel */}
          <div
            className='absolute inset-0 z-2 max-[900px]:hidden'
            style={{
              background:
                'linear-gradient(90deg, transparent 78%, color-mix(in srgb, var(--obsidian-2) 95%, transparent) 100%)',
            }}
          />
          {/* Mobile bottom fade */}
          <div
            className='absolute inset-0 z-2 hidden max-[900px]:block'
            style={{
              background:
                'linear-gradient(180deg, transparent 55%, var(--obsidian-2) 100%)',
            }}
          />

          {/* Status badge */}
          <div
            className='absolute top-4 left-4 z-3 flex items-center gap-2 px-3 py-1.5'
            style={{
              background: isLive ? 'var(--green-dim)' : 'var(--gold-dim)',
              backdropFilter: 'blur(10px)',
              border: isLive
                ? '1px solid color-mix(in srgb, var(--green) 30%, transparent)'
                : '1px solid var(--border-mid)',
            }}
          >
            {isLive && (
              <span className='relative flex h-1.25 w-1.25'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-(--green) opacity-75' />
                <span className='relative inline-flex rounded-full h-1.25 w-1.25 bg-(--green)' />
              </span>
            )}
            <span
              className='text-[0.56rem] tracking-[0.3em] uppercase'
              style={{ color: isLive ? 'var(--green)' : 'var(--gold)' }}
            >
              {isLive ? 'Live Now' : isCompleted ? 'Recording' : 'Upcoming'}
            </span>
          </div>

          {/* Category tag */}
          <div className='absolute bottom-4 left-4 z-3'>
            <span
              className='text-[0.54rem] tracking-[0.18em] uppercase px-2.5 py-1'
              style={{
                background: 'color-mix(in srgb, var(--obsidian) 60%, transparent)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-mid)',
                color: 'var(--gold-light)',
              }}
            >
              {catLabel}
            </span>
          </div>
        </div>

        {/* Right: Content */}
        <div className='relative z-3 flex flex-col justify-between p-8 max-[900px]:pt-5 max-[900px]:px-5 max-[900px]:pb-6'>
          <div>
            {/* Featured eyebrow */}
            <div className='flex items-center gap-2.5 mb-6'>
              <div
                className='w-6 h-px'
                style={{
                  background: 'linear-gradient(90deg, transparent, var(--gold))',
                }}
              />
              <span
                className='text-[0.56rem] tracking-[0.4em] uppercase'
                style={{ color: 'var(--gold)' }}
              >
                Featured Session
              </span>
            </div>

            <h3
              className='font-cormorant text-[clamp(1.5rem,2.5vw,2.1rem)] font-light leading-[1.2] mb-4 transition-colors duration-300'
              style={{ color: hovered ? 'var(--gold-pale)' : 'var(--ivory)' }}
            >
              {webinar.title}
            </h3>

            <p
              className='text-[0.78rem] leading-[1.7] mb-6 font-light line-clamp-3'
              style={{ color: 'var(--ivory-muted)' }}
            >
              {webinar.description}
            </p>

            {/* Meta */}
            <div className='flex flex-col gap-2 mb-6'>
              <div
                className='flex items-center gap-2 text-[0.68rem]'
                style={{ color: 'var(--ivory-muted)' }}
              >
                <Clock
                  size={11}
                  style={{ color: 'var(--gold)' }}
                  className='shrink-0'
                />
                {webinar.date} · {webinar.time} · {webinar.duration}
              </div>
              <div
                className='flex items-center gap-2 text-[0.68rem]'
                style={{ color: 'var(--ivory-muted)' }}
              >
                <Users
                  size={11}
                  style={{ color: 'var(--gold)' }}
                  className='shrink-0'
                />
                {webinar.registrations.toLocaleString()} registered
              </div>
            </div>

            {/* Speakers */}
            <div
              className='flex items-center gap-3 pb-6 mb-6'
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div className='flex -space-x-2'>
                {webinar.speakers.slice(0, 3).map((s, i) => (
                  <div
                    key={i}
                    className='w-8 h-8 rounded-full flex items-center justify-center'
                    style={{
                      background: 'linear-gradient(135deg, var(--obsidian-4), var(--obsidian-3))',
                      border: '2px solid var(--obsidian-2)',
                      boxShadow: '0 0 0 1px color-mix(in srgb, var(--gold) 18%, transparent)',
                    }}
                  >
                    <span
                      className='font-cormorant text-[0.5rem] font-semibold'
                      style={{ color: 'var(--gold-light)' }}
                    >
                      {s.initials}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p
                  className='text-[0.68rem]'
                  style={{ color: 'var(--ivory-dim)' }}
                >
                  {webinar.speakers[0]?.name}
                </p>
                {webinar.speakers.length > 1 && (
                  <p
                    className='text-[0.6rem]'
                    style={{ color: 'var(--ivory-muted)' }}
                  >
                    +{webinar.speakers.length - 1} more
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            type='button'
            className='font-dm flex items-center justify-between w-full px-5 py-3.5 text-left relative overflow-hidden transition-all duration-300'
            style={{
              background: isLive
                ? 'linear-gradient(135deg, var(--green), color-mix(in srgb, var(--green) 85%, #000))'
                : 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              color: isLive ? '#001a10' : '#080a0f',
              clipPath:
                'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            }}
            onClick={(e) => { e.stopPropagation(); router.push('/webinars/' + webinar.id); onClick?.(webinar.id); }}
          >
            <motion.span
              className='absolute inset-0 pointer-events-none'
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              }}
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.55 }}
            />
            <span className='relative text-[0.68rem] tracking-[0.2em] uppercase font-medium flex items-center gap-2'>
              {isLive && <Radio size={12} />}
              {isLive
                ? 'Join Live Session'
                : isCompleted
                  ? '▶ Watch Recording'
                  : 'Register Free'}
            </span>
            <ArrowRight size={14} className='relative' />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ liveCount }: { liveCount: number }) {
  return (
    <motion.div
      className='relative z-2 px-15 pt-22.5 pb-13 max-md:px-6 max-md:pt-14 max-md:pb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className='flex items-center gap-3 mb-5'>
        <div
          className='w-8 h-px'
          style={{ background: 'linear-gradient(90deg, transparent, var(--gold))' }}
        />
        <span
          className='text-[0.62rem] tracking-[0.38em] uppercase text-(--gold)'
        >
          Expert-Led Sessions
        </span>
        {liveCount > 0 && (
          <div
            className='flex items-center gap-1.5 ml-3 px-2.5 py-1'
            style={{
              background: 'var(--green-dim)',
              border: '1px solid color-mix(in srgb, var(--green) 18%, transparent)',
            }}
          >
            <span className='relative flex h-1.25 w-1.25'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-(--green) opacity-75' />
              <span className='relative inline-flex rounded-full h-1.25 w-1.25 bg-(--green)' />
            </span>
            <span className='text-[0.54rem] tracking-[0.22em] uppercase text-(--green)'>
              {liveCount} Live
            </span>
          </div>
        )}
      </div>

      <h2
        className='font-cormorant font-light leading-[1.05] text-[clamp(2.2rem,4vw,3.6rem)]'
        style={{ color: 'var(--ivory)' }}
      >
        Discover{' '}
        <em className='italic' style={{ color: 'var(--gold-light)' }}>
          Webinars
        </em>
      </h2>

      <p
        className='mt-3 text-[0.78rem] font-light max-w-120 leading-[1.6]'
        style={{ color: 'var(--ivory-muted)' }}
      >
        Hover any session to preview details. Click to open the full page.
      </p>
    </motion.div>
  );
}

// ─── View More Row ────────────────────────────────────────────────────────────

function ViewMoreRow({
  onClick,
  count,
}: {
  onClick: () => void;
  count: number;
}) {
  return (
    <motion.div
      className='flex items-center gap-6 pt-2'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div
        className='flex-1 h-px'
        style={{
          background:
            'linear-gradient(90deg, color-mix(in srgb, var(--gold) 15%, transparent), transparent)',
        }}
      />
      <button
        type='button'
        className='font-dm flex items-center gap-2.5 px-5 py-2.5 text-[0.65rem] tracking-[0.22em] uppercase transition-all duration-300 hover:bg-(--gold-dim)'
        style={{
          border: '1px solid var(--border)',
          color: 'var(--ivory-muted)',
        }}
        onClick={onClick}
      >
        View All Sessions
        <span
          className='tabular-nums text-[0.6rem] text-(--gold)'
        >
          ({count})
        </span>
        <ArrowRight size={12} style={{ color: 'var(--gold)' }} />
      </button>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      className='flex flex-col items-center text-center py-24 gap-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className='text-[2rem] opacity-15 mb-2'>◎</div>
      <h3
        className='font-cormorant text-[1.5rem] font-light'
        style={{ color: 'var(--ivory-muted)' }}
      >
        No sessions found
      </h3>
      <button
        type='button'
        className='font-dm mt-2 text-[0.66rem] tracking-[0.18em] uppercase px-5 py-2 transition-colors duration-200 hover:bg-(--gold-dim) text-(--gold)'
        style={{ border: '1px solid var(--border-mid)' }}
        onClick={onReset}
      >
        Show All
      </button>
    </motion.div>
  );
}

// ─── WebinarShowcase ──────────────────────────────────────────────────────────

interface WebinarShowcaseProps {
  onWebinarSelect?: (id: number) => void;
}

export default function WebinarShowcase({
  onWebinarSelect,
}: WebinarShowcaseProps) {
  const PREVIEW_COUNT = 3;

  const liveCount = useMemo(
    () => WEBINARS.filter((w) => w.status === 'live').length,
    [],
  );

  // Featured = first live session, fallback to first in list
  const featuredIndex = WEBINARS.findIndex((w) => w.status === 'live');
  const featured = WEBINARS[featuredIndex !== -1 ? featuredIndex : 0];
  const rest = WEBINARS.filter((w) => w.id !== featured?.id);
  const previewRest = rest.slice(0, PREVIEW_COUNT);

  return (
    <section
      className='relative overflow-hidden pb-25'
      style={{ background: 'linear-gradient(180deg, var(--obsidian) 0%, var(--obsidian-2) 50%, var(--obsidian) 100%)', color: 'var(--ivory)' }}
      aria-label='Webinar showcase'
    >

      {/* Ambient glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute top-0 left-[8%] z-0'
        style={{
          width: 500,
          height: 280,
          background:
            'radial-gradient(ellipse, color-mix(in srgb, var(--gold) 5%, transparent) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Header */}
      <SectionHeader liveCount={liveCount} />

      {/* Divider */}
      <div
        className='mx-15 mb-10 h-px max-md:mx-6'
        style={{
          background:
            'linear-gradient(90deg, var(--border-mid), color-mix(in srgb, var(--gold) 5%, transparent) 60%, transparent)',
        }}
      />

      {/* Content */}
      <div className='relative z-2 px-15 max-md:px-6'>
        <div className='flex flex-col gap-8'>
          {/* Featured card */}
          {featured && (
            <FeaturedCard webinar={featured} onClick={onWebinarSelect} />
          )}

          {/* Preview grid */}
          {previewRest.length > 0 && (
            <>
              {/* Sub-label */}
              <motion.div
                className='flex items-center gap-3'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div
                  className='w-4 h-px'
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, var(--border-mid))',
                  }}
                />
                <span
                  className='text-[0.56rem] tracking-[0.32em] uppercase'
                  style={{ color: 'color-mix(in srgb, var(--gold) 45%, transparent)' }}
                >
                  More Sessions
                </span>
                <div
                  className='flex-1 h-px'
                  style={{
                    background:
                      'linear-gradient(90deg, var(--border), transparent)',
                  }}
                />
              </motion.div>

              <div className='grid grid-cols-3 gap-5 max-[1100px]:grid-cols-2 max-md:grid-cols-1'>
                {previewRest.map((webinar, i) => (
                  <WebinarCard
                    key={webinar.id}
                    webinar={webinar}
                    index={i}
                    onClick={onWebinarSelect}
                  />
                ))}
              </div>

              {/* View more — only shown if there are hidden sessions */}
              {rest.length > PREVIEW_COUNT && (
                <ViewMoreRow
                  onClick={() => onWebinarSelect?.(-1)}
                  count={rest.length - PREVIEW_COUNT}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
