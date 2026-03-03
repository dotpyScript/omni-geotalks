'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock, Users, Radio } from 'lucide-react';
import type { Webinar } from '@/components/sections/webinerDiscovery/types';
import { BannerPlaceholder } from '@/components/sections/webinerDiscovery/BannerPlaceholder';
import {
  WEBINARS,
  CATEGORIES,
} from '@/components/sections/webinerDiscovery/data';
// 'use client';

// import { useState, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowRight, ArrowUpRight, Clock, Users, Radio } from 'lucide-react';
// import type { Webinar } from '@/components/sections/webinerDiscovery/types';
// import { BannerPlaceholder } from '@/components/sections/webinerDiscovery/BannerPlaceholder';
// import { WEBINARS, CATEGORIES } from '@/components/sections/webinerDiscovery/data';

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

// ─── Session Card ─────────────────────────────────────────────────────────────

interface SessionCardProps {
  webinar: Webinar;
  index: number;
  onClick?: (id: number) => void;
}

function SessionCard({ webinar, index, onClick }: SessionCardProps) {
  const [hovered, setHovered] = useState(false);
  const isLive = webinar.status === 'live';
  const isCompleted = webinar.status === 'completed';
  const catLabel = getCatLabel(webinar.category);

  const statusColor = isLive ? '#00e5a0' : isCompleted ? '#c9a84c' : '#00d4ff';
  const statusLabel = isLive ? 'Live' : isCompleted ? 'Recorded' : 'Upcoming';

  return (
    <motion.article
      className='relative cursor-pointer overflow-hidden flex flex-col'
      style={{
        background: 'linear-gradient(160deg, var(--obsidian-2) 0%, var(--obsidian-3) 100%)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.28)' : 'rgba(201,168,76,0.1)'}`,
        transition: 'border-color 0.3s ease',
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => onClick?.(webinar.id)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(webinar.id)}
      whileHover={{ y: -4 }}
    >
      {/* Top accent line */}
      <motion.div
        className='absolute top-0 left-0 right-0 h-[1.5px] z-10 origin-left'
        style={{ background: statusColor }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{
          duration: 0.7,
          delay: index * 0.07 + 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* ── Thumbnail ── */}
      <div
        className='relative w-full overflow-hidden flex-shrink-0'
        style={{ height: 180 }}
      >
        <motion.div
          className='absolute inset-0'
          animate={{
            scale: hovered ? 1.06 : 1,
            filter: hovered
              ? 'brightness(1.15) saturate(1.1)'
              : 'brightness(0.88) saturate(0.95)',
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <SmartBanner index={webinar.banner} />
        </motion.div>

        {/* Bottom vignette — just enough for overlaid text */}
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            background:
              'linear-gradient(180deg, transparent 50%, rgba(13,17,24,0.78) 100%)',
          }}
        />

        {/* Status pill */}
        <div
          className='absolute top-3 left-3 z-[3] flex items-center gap-1.5 px-2.5 py-1'
          style={{
            background: 'rgba(8,10,15,0.55)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${statusColor}40`,
          }}
        >
          {isLive ? (
            <span className='relative flex h-[5px] w-[5px]'>
              <span
                className='animate-ping absolute inline-flex h-full w-full rounded-full opacity-75'
                style={{ backgroundColor: statusColor }}
              />
              <span
                className='relative inline-flex rounded-full h-[5px] w-[5px]'
                style={{ backgroundColor: statusColor }}
              />
            </span>
          ) : (
            <span
              className='inline-flex rounded-full h-[5px] w-[5px]'
              style={{ backgroundColor: statusColor }}
            />
          )}
          <span
            className='text-[0.54rem] tracking-[0.25em] uppercase'
            style={{ color: statusColor }}
          >
            {statusLabel}
          </span>
        </div>

        {/* Category tag */}
        <div className='absolute bottom-3 left-3 z-[3]'>
          <span
            className='text-[0.52rem] tracking-[0.18em] uppercase px-2 py-0.5'
            style={{
              background: 'rgba(8,10,15,0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(201,168,76,0.22)',
              color: '#e8c97e',
            }}
          >
            {catLabel}
          </span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className='flex flex-col flex-1 px-5 pt-4 pb-5'>
        {/* Date + duration */}
        <div className='flex items-center gap-3 mb-3'>
          <span
            className='flex items-center gap-1.5 text-[0.62rem] tracking-wide'
            style={{ color: 'rgba(240,237,230,0.35)' }}
          >
            <Clock size={9} className='shrink-0' style={{ color: '#c9a84c' }} />
            {webinar.date} · {webinar.time}
          </span>
          <span
            className='ml-auto text-[0.56rem] tracking-[0.1em] px-1.5 py-0.5'
            style={{
              background: 'rgba(201,168,76,0.07)',
              border: '1px solid rgba(201,168,76,0.13)',
              color: 'rgba(232,201,126,0.5)',
            }}
          >
            {webinar.duration}
          </span>
        </div>

        {/* Title */}
        <h3
          className='text-[1.05rem] font-light leading-[1.3] mb-3 transition-colors duration-300'
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: hovered ? '#f5e6c0' : '#f0ede6',
          }}
        >
          {webinar.title}
        </h3>

        {/* Description — always visible, 2 lines */}
        <p
          className='text-[0.72rem] leading-[1.6] mb-4 line-clamp-2 font-light flex-1'
          style={{ color: 'rgba(240,237,230,0.38)' }}
        >
          {webinar.description}
        </p>

        {/* Speaker + registrations */}
        <div
          className='flex items-center gap-3 pt-3'
          style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}
        >
          <div className='flex -space-x-1.5'>
            {webinar.speakers.slice(0, 2).map((s, i) => (
              <div
                key={i}
                className='w-6 h-6 rounded-full flex items-center justify-center'
                style={{
                  background: 'linear-gradient(135deg, var(--obsidian-4), var(--obsidian-3))',
                  border: '1.5px solid #0d1118',
                  boxShadow: '0 0 0 1px rgba(201,168,76,0.15)',
                }}
              >
                <span
                  className='text-[0.46rem] font-semibold'
                  style={{
                    color: '#e8c97e',
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  {s.initials}
                </span>
              </div>
            ))}
          </div>
          <span
            className='text-[0.62rem] flex-1 truncate'
            style={{ color: 'rgba(240,237,230,0.38)' }}
          >
            {webinar.speakers[0]?.name}
            {webinar.speakers.length > 1 && (
              <span style={{ color: 'rgba(240,237,230,0.22)' }}>
                {' '}
                +{webinar.speakers.length - 1}
              </span>
            )}
          </span>
          <div
            className='flex items-center gap-1 text-[0.6rem]'
            style={{ color: 'rgba(240,237,230,0.28)' }}
          >
            <Users size={9} style={{ color: '#c9a84c' }} />
            {webinar.registrations.toLocaleString()}
          </div>
        </div>
      </div>

      {/* ── CTA — slides in on hover ── */}
      <motion.div
        className='px-5 overflow-hidden'
        animate={{
          opacity: hovered ? 1 : 0,
          height: hovered ? 'auto' : 0,
          paddingBottom: hovered ? 20 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: hovered ? 'auto' : 'none' }}
      >
        <button
          type='button'
          className='w-full flex items-center justify-between px-4 py-2.5 text-[0.62rem] tracking-[0.18em] uppercase'
          style={{
            background: isLive
              ? 'linear-gradient(135deg, rgba(0,229,160,0.12), rgba(0,229,160,0.06))'
              : 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.05))',
            border: isLive
              ? '1px solid rgba(0,229,160,0.28)'
              : '1px solid rgba(201,168,76,0.26)',
            color: isLive ? '#00e5a0' : '#e8c97e',
            fontFamily: "'DM Sans', sans-serif",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(webinar.id);
          }}
        >
          <span>
            {isLive
              ? 'Join Live'
              : isCompleted
                ? 'Watch Recording'
                : 'Register Free'}
          </span>
          <ArrowUpRight size={13} />
        </button>
      </motion.div>

      {/* Corner reticle */}
      <span
        className='absolute bottom-0 right-0 w-3 h-3 pointer-events-none'
        style={{
          borderBottom: '1px solid rgba(201,168,76,0.28)',
          borderRight: '1px solid rgba(201,168,76,0.28)',
        }}
      />
    </motion.article>
  );
}

// ─── Featured Card ────────────────────────────────────────────────────────────

interface FeaturedCardProps {
  webinar: Webinar;
  onClick?: (id: number) => void;
}

function FeaturedCard({ webinar, onClick }: FeaturedCardProps) {
  const [hovered, setHovered] = useState(false);
  const isLive = webinar.status === 'live';
  const isCompleted = webinar.status === 'completed';
  const catLabel = getCatLabel(webinar.category);

  return (
    <motion.article
      className='relative overflow-hidden cursor-pointer'
      style={{
        background:
          'linear-gradient(145deg, #0d1118 0%, #10141d 60%, #141820 100%)',
        border: isLive
          ? '1px solid rgba(0,229,160,0.2)'
          : '1px solid rgba(201,168,76,0.16)',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onClick?.(webinar.id)}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(webinar.id)}
    >
      {/* Top accent */}
      <div
        className='absolute top-0 left-0 right-0 h-[2px] z-10'
        style={{
          background: isLive
            ? 'linear-gradient(90deg, #00e5a0, rgba(0,229,160,0.3), transparent)'
            : 'linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.4), transparent)',
        }}
      />

      <div className='grid grid-cols-[1fr_1fr] max-[900px]:grid-cols-1'>
        {/* Left: Banner */}
        <div className='relative overflow-hidden min-h-[380px] max-[900px]:min-h-[240px]'>
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
            className='absolute inset-0 z-[2] max-[900px]:hidden'
            style={{
              background:
                'linear-gradient(90deg, transparent 78%, rgba(13,17,24,0.95) 100%)',
            }}
          />
          {/* Mobile bottom fade */}
          <div
            className='absolute inset-0 z-[2] hidden max-[900px]:block'
            style={{
              background:
                'linear-gradient(180deg, transparent 55%, #0d1118 100%)',
            }}
          />

          {/* Status badge */}
          <div
            className='absolute top-4 left-4 z-[3] flex items-center gap-2 px-3 py-1.5'
            style={{
              background: isLive
                ? 'rgba(0,229,160,0.09)'
                : 'rgba(201,168,76,0.08)',
              backdropFilter: 'blur(10px)',
              border: isLive
                ? '1px solid rgba(0,229,160,0.3)'
                : '1px solid rgba(201,168,76,0.25)',
            }}
          >
            {isLive && (
              <span className='relative flex h-[5px] w-[5px]'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5a0] opacity-75' />
                <span className='relative inline-flex rounded-full h-[5px] w-[5px] bg-[#00e5a0]' />
              </span>
            )}
            <span
              className='text-[0.56rem] tracking-[0.3em] uppercase'
              style={{ color: isLive ? '#00e5a0' : '#c9a84c' }}
            >
              {isLive ? 'Live Now' : isCompleted ? 'Recording' : 'Upcoming'}
            </span>
          </div>

          {/* Category tag */}
          <div className='absolute bottom-4 left-4 z-[3]'>
            <span
              className='text-[0.54rem] tracking-[0.18em] uppercase px-2.5 py-1'
              style={{
                background: 'rgba(8,10,15,0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(201,168,76,0.22)',
                color: '#e8c97e',
              }}
            >
              {catLabel}
            </span>
          </div>
        </div>

        {/* Right: Content */}
        <div className='relative z-[3] flex flex-col justify-between p-8 max-[900px]:pt-5 max-[900px]:px-5 max-[900px]:pb-6'>
          <div>
            {/* Featured eyebrow */}
            <div className='flex items-center gap-2.5 mb-6'>
              <div
                className='w-6 h-px'
                style={{
                  background: 'linear-gradient(90deg, transparent, #c9a84c)',
                }}
              />
              <span
                className='text-[0.56rem] tracking-[0.4em] uppercase'
                style={{ color: '#c9a84c' }}
              >
                Featured Session
              </span>
            </div>

            <h3
              className='text-[clamp(1.5rem,2.5vw,2.1rem)] font-light leading-[1.2] mb-4 transition-colors duration-300'
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: hovered ? '#f5e6c0' : '#f0ede6',
              }}
            >
              {webinar.title}
            </h3>

            <p
              className='text-[0.78rem] leading-[1.7] mb-6 font-light line-clamp-3'
              style={{ color: 'rgba(240,237,230,0.38)' }}
            >
              {webinar.description}
            </p>

            {/* Meta */}
            <div className='flex flex-col gap-2 mb-6'>
              <div
                className='flex items-center gap-2 text-[0.68rem]'
                style={{ color: 'rgba(240,237,230,0.4)' }}
              >
                <Clock
                  size={11}
                  style={{ color: '#c9a84c' }}
                  className='shrink-0'
                />
                {webinar.date} · {webinar.time} · {webinar.duration}
              </div>
              <div
                className='flex items-center gap-2 text-[0.68rem]'
                style={{ color: 'rgba(240,237,230,0.4)' }}
              >
                <Users
                  size={11}
                  style={{ color: '#c9a84c' }}
                  className='shrink-0'
                />
                {webinar.registrations.toLocaleString()} registered
              </div>
            </div>

            {/* Speakers */}
            <div
              className='flex items-center gap-3 pb-6 mb-6'
              style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
            >
              <div className='flex -space-x-2'>
                {webinar.speakers.slice(0, 3).map((s, i) => (
                  <div
                    key={i}
                    className='w-8 h-8 rounded-full flex items-center justify-center'
                    style={{
                      background: 'linear-gradient(135deg, var(--obsidian-4), var(--obsidian-3))',
                      border: '2px solid #0d1118',
                      boxShadow: '0 0 0 1px rgba(201,168,76,0.18)',
                    }}
                  >
                    <span
                      className='text-[0.5rem] font-semibold'
                      style={{
                        color: '#e8c97e',
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      {s.initials}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p
                  className='text-[0.68rem]'
                  style={{ color: 'rgba(240,237,230,0.55)' }}
                >
                  {webinar.speakers[0]?.name}
                </p>
                {webinar.speakers.length > 1 && (
                  <p
                    className='text-[0.6rem]'
                    style={{ color: 'rgba(240,237,230,0.25)' }}
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
            className='flex items-center justify-between w-full px-5 py-3.5 text-left relative overflow-hidden transition-all duration-300'
            style={{
              background: isLive
                ? 'linear-gradient(135deg, #00e5a0, #00c882)'
                : 'linear-gradient(135deg, #c9a84c, #e8c97e)',
              color: isLive ? '#001a10' : '#080a0f',
              clipPath:
                'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              fontFamily: "'DM Sans', sans-serif",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(webinar.id);
            }}
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
      className='relative z-[2] px-[60px] pt-[90px] pb-[52px] max-md:px-6 max-md:pt-14 max-md:pb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className='flex items-center gap-3 mb-5'>
        <div
          className='w-8 h-px'
          style={{ background: 'linear-gradient(90deg, transparent, #c9a84c)' }}
        />
        <span
          className='text-[0.62rem] tracking-[0.38em] uppercase'
          style={{ color: '#c9a84c' }}
        >
          Expert-Led Sessions
        </span>
        {liveCount > 0 && (
          <div
            className='flex items-center gap-1.5 ml-3 px-2.5 py-1'
            style={{
              background: 'rgba(0,229,160,0.06)',
              border: '1px solid rgba(0,229,160,0.18)',
            }}
          >
            <span className='relative flex h-[5px] w-[5px]'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5a0] opacity-75' />
              <span className='relative inline-flex rounded-full h-[5px] w-[5px] bg-[#00e5a0]' />
            </span>
            <span className='text-[0.54rem] tracking-[0.22em] uppercase text-[#00e5a0]'>
              {liveCount} Live
            </span>
          </div>
        )}
      </div>

      <h2
        className='font-light leading-[1.05] text-[clamp(2.2rem,4vw,3.6rem)]'
        style={{ fontFamily: "'Cormorant Garamond', serif", color: '#f0ede6' }}
      >
        Discover{' '}
        <em className='italic' style={{ color: '#e8c97e' }}>
          Webinars
        </em>
      </h2>

      <p
        className='mt-3 text-[0.78rem] font-light max-w-[480px]'
        style={{ color: 'rgba(240,237,230,0.3)', lineHeight: 1.6 }}
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
            'linear-gradient(90deg, rgba(201,168,76,0.15), transparent)',
        }}
      />
      <button
        type='button'
        className='flex items-center gap-2.5 px-5 py-2.5 text-[0.65rem] tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[rgba(201,168,76,0.06)]'
        style={{
          border: '1px solid rgba(201,168,76,0.18)',
          color: 'rgba(240,237,230,0.42)',
          fontFamily: "'DM Sans', sans-serif",
        }}
        onClick={onClick}
      >
        View All Sessions
        <span
          className='tabular-nums'
          style={{ color: '#c9a84c', fontSize: '0.6rem' }}
        >
          ({count})
        </span>
        <ArrowRight size={12} style={{ color: '#c9a84c' }} />
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
        className='text-[1.5rem] font-light'
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: 'rgba(240,237,230,0.4)',
        }}
      >
        No sessions found
      </h3>
      <button
        type='button'
        className='mt-2 text-[0.66rem] tracking-[0.18em] uppercase px-5 py-2 transition-colors duration-200 hover:bg-[rgba(201,168,76,0.07)]'
        style={{
          color: '#c9a84c',
          border: '1px solid rgba(201,168,76,0.25)',
          fontFamily: "'DM Sans', sans-serif",
        }}
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
      className='relative overflow-hidden pb-[100px]'
      style={{ background: 'linear-gradient(180deg, var(--obsidian) 0%, var(--obsidian-2) 50%, var(--obsidian) 100%)', color: 'var(--ivory)' }}
      aria-label='Webinar showcase'
    >
      {/* Blueprint grid */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 z-0'
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute top-0 left-[8%] z-0'
        style={{
          width: 500,
          height: 280,
          background:
            'radial-gradient(ellipse, rgba(201,168,76,0.055) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Header */}
      <SectionHeader liveCount={liveCount} />

      {/* Divider */}
      <div
        className='mx-[60px] mb-10 h-px max-md:mx-6'
        style={{
          background:
            'linear-gradient(90deg, rgba(201,168,76,0.18), rgba(201,168,76,0.05) 60%, transparent)',
        }}
      />

      {/* Content */}
      <div className='relative z-[2] px-[60px] max-md:px-6'>
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
                      'linear-gradient(90deg, transparent, rgba(201,168,76,0.35))',
                  }}
                />
                <span
                  className='text-[0.56rem] tracking-[0.32em] uppercase'
                  style={{ color: 'rgba(201,168,76,0.45)' }}
                >
                  More Sessions
                </span>
                <div
                  className='flex-1 h-px'
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(201,168,76,0.12), transparent)',
                  }}
                />
              </motion.div>

              <div className='grid grid-cols-3 gap-5 max-[1100px]:grid-cols-2 max-md:grid-cols-1'>
                {previewRest.map((webinar, i) => (
                  <SessionCard
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
