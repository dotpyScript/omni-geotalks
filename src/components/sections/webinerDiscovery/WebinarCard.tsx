'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Webinar } from './types';
import { CATEGORIES } from './data';
import { BannerPlaceholder } from './BannerPlaceholder';

// ─── Banner image map (topic-matched Unsplash photos) ─────────────────────────

const BANNER_IMAGES: Record<number, string> = {
  0: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80&fit=crop',
  1: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80&fit=crop',
  2: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80&fit=crop',
  3: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80&fit=crop',
  4: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80&fit=crop',
  5: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=80&fit=crop',
  6: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80&fit=crop',
  7: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&fit=crop',
};

// ─── SmartBanner — real photo with BannerPlaceholder fallback ─────────────────

function SmartBanner({ index }: { index: number }) {
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

// ─── WebinarCard ───────────────────────────────────────────────────────────────

interface WebinarCardProps {
  webinar: Webinar;
  listView?: boolean;
  index: number;
  onClick?: (id: number) => void;
}

export function WebinarCard({
  webinar,
  listView = false,
  index,
  onClick,
}: WebinarCardProps) {
  const [hovered, setHovered] = useState(false);
  const catLabel =
    CATEGORIES.find((c) => c.id === webinar.category)?.label ?? webinar.category;
  const isLive = webinar.status === 'live';
  const isCompleted = webinar.status === 'completed';

  const statusColor = isLive
    ? 'var(--green)'
    : isCompleted
      ? 'var(--gold)'
      : 'var(--cyan)';
  const statusBorderColor = isLive
    ? 'color-mix(in srgb, var(--green) 25%, transparent)'
    : isCompleted
      ? 'var(--border)'
      : 'color-mix(in srgb, var(--cyan) 25%, transparent)';
  const statusLabel = isLive ? 'Live Now' : isCompleted ? 'Recorded' : 'Upcoming';

  if (listView) {
    return (
      <ListCard
        webinar={webinar}
        catLabel={catLabel}
        isLive={isLive}
        isCompleted={isCompleted}
        statusColor={statusColor}
        statusLabel={statusLabel}
        index={index}
        onClick={onClick}
      />
    );
  }

  return (
    <motion.article
      className='relative cursor-pointer overflow-hidden flex flex-col'
      style={{
        background:
          'linear-gradient(160deg, var(--obsidian-2) 0%, var(--obsidian-3) 100%)',
        border: `1px solid ${hovered ? 'var(--border-mid)' : 'var(--border)'}`,
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
      {/* ── Thumbnail ──────────────────────────────────────────────────── */}
      <div className='relative w-full overflow-hidden shrink-0 h-48'>
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

        {/* Bottom vignette */}
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            background:
              'linear-gradient(180deg, transparent 50%, color-mix(in srgb, var(--obsidian-2) 78%, transparent) 100%)',
          }}
        />

        {/* Status pill */}
        <div
          className='absolute top-3 left-3 z-[3] flex items-center gap-1.5 px-2.5 py-1'
          style={{
            background: 'color-mix(in srgb, var(--obsidian) 55%, transparent)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${statusBorderColor}`,
          }}
        >
          {isLive ? (
            <span className='relative flex h-[5px] w-[5px]'>
              <span
                className='animate-ping absolute inline-flex h-full w-full rounded-full opacity-75'
                style={{ background: statusColor }}
              />
              <span
                className='relative inline-flex rounded-full h-[5px] w-[5px]'
                style={{ background: statusColor }}
              />
            </span>
          ) : (
            <span
              className='inline-flex rounded-full h-[5px] w-[5px]'
              style={{ background: statusColor }}
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

      {/* ── Card body ──────────────────────────────────────────────────── */}
      <div className='flex flex-col flex-1 px-5 pt-4 pb-5'>
        {/* Date + duration */}
        <div className='flex items-center gap-3 mb-3'>
          <span
            className='flex items-center gap-1.5 text-[0.62rem] tracking-wide'
            style={{ color: 'var(--ivory-muted)' }}
          >
            <span style={{ color: 'var(--gold)' }}>
              {isCompleted ? '✓' : '◷'}
            </span>
            {webinar.date} · {webinar.time}
          </span>
          <span
            className='ml-auto text-[0.56rem] tracking-widest px-1.5 py-0.5'
            style={{
              background: 'var(--gold-dim)',
              border: '1px solid var(--border)',
              color: 'var(--gold)',
            }}
          >
            {webinar.duration}
          </span>
        </div>

        {/* Title */}
        <h3
          className='font-cormorant text-[1.05rem] font-light leading-[1.3] mb-3 transition-colors duration-300'
          style={{ color: hovered ? 'var(--gold-pale)' : 'var(--ivory)' }}
        >
          {webinar.title}
        </h3>

        {/* Description */}
        <p
          className='text-[0.72rem] leading-[1.6] mb-4 line-clamp-2 font-light flex-1'
          style={{ color: 'var(--ivory-muted)' }}
        >
          {webinar.description}
        </p>

        {/* Speaker row */}
        <div
          className='flex items-center gap-3 pt-3'
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className='flex -space-x-1.5'>
            {webinar.speakers.slice(0, 3).map((s, i) => (
              <div
                key={i}
                className='w-7 h-7 rounded-full flex items-center justify-center'
                style={{
                  background:
                    'linear-gradient(135deg, var(--obsidian-4), var(--obsidian-3))',
                  border: '1.5px solid var(--obsidian-2)',
                  boxShadow:
                    '0 0 0 1px color-mix(in srgb, var(--gold) 18%, transparent)',
                }}
              >
                <span
                  className='font-cormorant text-[0.46rem] font-semibold'
                  style={{ color: 'var(--gold-light)' }}
                >
                  {s.initials}
                </span>
              </div>
            ))}
          </div>
          <span
            className='text-[0.62rem] flex-1 truncate'
            style={{ color: 'var(--ivory-muted)' }}
          >
            {webinar.speakers[0]?.name}
            {webinar.speakers.length > 1 && (
              <span style={{ color: 'var(--ivory-muted)' }}>
                {' '}+{webinar.speakers.length - 1}
              </span>
            )}
          </span>
          <span
            className='flex items-center gap-1 text-[0.6rem]'
            style={{ color: 'var(--ivory-muted)' }}
          >
            <span style={{ color: 'var(--gold)', fontSize: '0.58rem' }}>◈</span>
            {webinar.registrations.toLocaleString()}
          </span>
        </div>
      </div>

      {/* ── CTA — slides in on hover ────────────────────────────────────── */}
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
          className='font-dm w-full flex items-center justify-between px-4 py-2.5 text-[0.62rem] tracking-[0.18em] uppercase'
          style={{
            background: isLive
              ? 'linear-gradient(135deg, var(--green-dim), color-mix(in srgb, var(--green) 6%, transparent))'
              : 'linear-gradient(135deg, var(--gold-dim), color-mix(in srgb, var(--gold) 5%, transparent))',
            border: isLive
              ? '1px solid color-mix(in srgb, var(--green) 28%, transparent)'
              : '1px solid var(--border-mid)',
            color: isLive ? 'var(--green)' : 'var(--gold-light)',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(webinar.id);
          }}
        >
          <span>
            {isLive
              ? 'Join Live Session'
              : isCompleted
                ? 'Watch Recording'
                : 'Register Free'}
          </span>
          <span aria-hidden>↗</span>
        </button>
      </motion.div>

      {/* Corner reticle */}
      <span
        aria-hidden
        className='absolute bottom-0 right-0 w-3 h-3 pointer-events-none'
        style={{
          borderBottom: '1px solid var(--border-mid)',
          borderRight: '1px solid var(--border-mid)',
        }}
      />
    </motion.article>
  );
}

// ─── ListCard ─────────────────────────────────────────────────────────────────

function ListCard({
  webinar,
  catLabel,
  isLive,
  isCompleted,
  statusColor,
  statusLabel,
  index,
  onClick,
}: {
  webinar: Webinar;
  catLabel: string;
  isLive: boolean;
  isCompleted: boolean;
  statusColor: string;
  statusLabel: string;
  index: number;
  onClick?: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      role='button'
      tabIndex={0}
      onClick={() => onClick?.(webinar.id)}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(webinar.id)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? 'var(--border-mid)' : 'var(--border)'}`,
        background:
          'linear-gradient(90deg, var(--obsidian-2) 0%, var(--obsidian-3) 100%)',
        transition: 'border-color 0.25s ease',
      }}
      className='relative overflow-hidden cursor-pointer flex items-stretch'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ x: 4 }}
    >
      {/* Left status stripe */}
      <motion.div
        className='w-[3px] shrink-0 self-stretch'
        animate={{ background: hovered ? statusColor : 'var(--border)' }}
        transition={{ duration: 0.3 }}
      />

      {/* Banner thumbnail */}
      <div className='relative overflow-hidden shrink-0 w-[200px] max-sm:hidden'>
        <motion.div
          className='absolute inset-0'
          animate={{
            scale: hovered ? 1.05 : 1,
            filter: hovered
              ? 'brightness(1.1) saturate(1.05)'
              : 'brightness(0.85) saturate(0.9)',
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <SmartBanner index={webinar.banner} />
        </motion.div>
        <div
          aria-hidden
          className='absolute inset-0'
          style={{
            background:
              'linear-gradient(90deg, transparent 60%, color-mix(in srgb, var(--obsidian-2) 90%, transparent) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className='flex-1 flex items-center gap-6 px-6 py-5 min-w-0'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-2'>
            <span
              className='text-[0.5rem] tracking-[0.22em] uppercase'
              style={{ color: statusColor }}
            >
              {statusLabel}
            </span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span
              className='text-[0.5rem] tracking-[0.18em] uppercase'
              style={{ color: 'var(--gold)' }}
            >
              {catLabel}
            </span>
          </div>

          <h3
            className='font-cormorant font-light leading-[1.25] mb-1.5 transition-colors duration-250 text-[1.05rem]'
            style={{ color: hovered ? 'var(--gold-pale)' : 'var(--ivory)' }}
          >
            {webinar.title}
          </h3>

          <p
            className='text-[0.68rem] tracking-[0.06em]'
            style={{ color: 'var(--ivory-muted)' }}
          >
            {webinar.date} · {webinar.time} · {webinar.duration}
          </p>
        </div>

        {/* Speakers */}
        <div className='flex flex-col items-end gap-2 shrink-0'>
          <div className='flex -space-x-1.5'>
            {webinar.speakers.slice(0, 2).map((s, i) => (
              <div
                key={i}
                className='w-6 h-6 rounded-full flex items-center justify-center'
                style={{
                  background: 'var(--obsidian-4)',
                  border: '1.5px solid var(--obsidian-2)',
                  boxShadow:
                    '0 0 0 1px color-mix(in srgb, var(--gold) 15%, transparent)',
                }}
              >
                <span
                  className='font-cormorant text-[0.42rem] font-semibold'
                  style={{ color: 'var(--gold-light)' }}
                >
                  {s.initials}
                </span>
              </div>
            ))}
          </div>
          <span
            className='text-[0.58rem]'
            style={{ color: 'var(--ivory-muted)' }}
          >
            <span style={{ color: 'var(--gold)', marginRight: 3 }}>◈</span>
            {webinar.registrations.toLocaleString()}
          </span>
        </div>

        {/* CTA */}
        <button
          type='button'
          className='font-dm shrink-0 px-5 py-2.5 text-[0.6rem] tracking-[0.16em] uppercase transition-all duration-250'
          style={{
            background: isLive
              ? 'linear-gradient(135deg, var(--green), color-mix(in srgb, var(--green) 80%, #000))'
              : isCompleted
                ? 'transparent'
                : 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            border: isCompleted ? '1px solid var(--border-mid)' : 'none',
            color: isCompleted ? 'var(--gold)' : '#080a0f',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(webinar.id);
          }}
        >
          {isLive ? 'Join Live' : isCompleted ? '▶ Watch' : 'Register →'}
        </button>
      </div>
    </motion.article>
  );
}
