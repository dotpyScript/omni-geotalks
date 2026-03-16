'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, Download } from 'lucide-react';
import type { Webinar } from './types';
import { CATEGORIES } from './data';
import { BannerPlaceholder } from './BannerPlaceholder';
import { SharePopup } from '@/components/ui/SharePopup';

// ─── Shared copy-to-clipboard hook ───────────────────────────────────────────

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('input');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);
  return { copied, copy };
}

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
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { copied, copy } = useCopy();
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const webinarUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/webinars/${webinar.id}`
    : `/webinars/${webinar.id}`;
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
      onClick={() => { router.push('/webinars/' + webinar.id); onClick?.(webinar.id); }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') { router.push('/webinars/' + webinar.id); onClick?.(webinar.id); } }}
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
        <div className='flex items-center gap-2'>
          <button
            type='button'
            className='font-dm flex-1 flex items-center justify-between px-4 py-2.5 text-[0.62rem] tracking-[0.18em] uppercase'
            style={{
              background: isLive
                ? 'linear-gradient(135deg, var(--green-dim), color-mix(in srgb, var(--green) 6%, transparent))'
                : 'linear-gradient(135deg, var(--gold-dim), color-mix(in srgb, var(--gold) 5%, transparent))',
              border: isLive
                ? '1px solid color-mix(in srgb, var(--green) 28%, transparent)'
                : '1px solid var(--border-mid)',
              color: isLive ? 'var(--green)' : 'var(--gold-light)',
            }}
            onClick={(e) => { e.stopPropagation(); router.push('/webinars/' + webinar.id); }}
          >
            <span>
              {isLive ? 'Join Live Session' : isCompleted ? 'Watch Recording' : 'Register Free'}
            </span>
            <span aria-hidden>↗</span>
          </button>

          {/* Share */}
          <div className='relative'>
            <button
              ref={shareButtonRef}
              type='button'
              className='flex items-center justify-center w-8 h-8 transition-colors duration-150'
              style={{
                background: 'var(--obsidian-3)',
                border: '1px solid var(--border-mid)',
                color: 'var(--ivory-dim)',
              }}
              onClick={(e) => { e.stopPropagation(); setShareOpen((v) => !v); }}
              aria-label='Share webinar'
            >
              <Share2 size={13} />
            </button>
            {shareOpen && (
              <SharePopup url={webinarUrl} title={webinar.title} anchorRef={shareButtonRef} onClose={() => setShareOpen(false)} />
            )}
          </div>

          {/* Copy link */}
          <button
            type='button'
            className='flex items-center justify-center w-8 h-8 transition-colors duration-150'
            style={{
              background: copied ? 'var(--gold-dim)' : 'var(--obsidian-3)',
              border: '1px solid var(--border-mid)',
              color: copied ? 'var(--gold-light)' : 'var(--ivory-dim)',
            }}
            onClick={(e) => { e.stopPropagation(); copy(webinarUrl); }}
            aria-label='Copy link'
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>

          {/* Download (completed only) */}
          {isCompleted && (
            <button
              type='button'
              className='flex items-center justify-center w-8 h-8 transition-colors duration-150'
              style={{
                background: 'var(--obsidian-3)',
                border: '1px solid var(--border-mid)',
                color: 'var(--ivory-dim)',
              }}
              onClick={(e) => e.stopPropagation()}
              aria-label='Download recording'
            >
              <Download size={13} />
            </button>
          )}
        </div>
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
// Matches the FeaturedCard layout from WebinarShowcase — full-width split grid.

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
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { copied, copy } = useCopy();
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const webinarUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/webinars/${webinar.id}`
    : `/webinars/${webinar.id}`;

  return (
    <motion.article
      className='relative overflow-hidden cursor-pointer'
      style={{
        background:
          'linear-gradient(145deg, var(--obsidian-2) 0%, var(--obsidian-3) 100%)',
        border: isLive
          ? '1px solid color-mix(in srgb, var(--green) 20%, transparent)'
          : `1px solid ${hovered ? 'var(--border-mid)' : 'var(--border)'}`,
        transition: 'border-color 0.3s ease',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => { router.push('/webinars/' + webinar.id); onClick?.(webinar.id); }}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') { router.push('/webinars/' + webinar.id); onClick?.(webinar.id); } }}
    >
      {/* Top accent line */}
      <div
        className='absolute top-0 left-0 right-0 h-0.5 z-10'
        style={{
          background: isLive
            ? 'linear-gradient(90deg, var(--green), color-mix(in srgb, var(--green) 30%, transparent), transparent)'
            : 'linear-gradient(90deg, var(--gold), color-mix(in srgb, var(--gold) 40%, transparent), transparent)',
        }}
      />

      <div className='grid grid-cols-[1fr_1fr] max-[900px]:grid-cols-1'>
        {/* ── Left: Banner ─────────────────────────────────────────────── */}
        <div className='relative overflow-hidden min-h-72 max-[900px]:min-h-52'>
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

          {/* Seam fade into content panel */}
          <div
            className='absolute inset-0 z-[2] max-[900px]:hidden'
            style={{
              background:
                'linear-gradient(90deg, transparent 78%, color-mix(in srgb, var(--obsidian-2) 95%, transparent) 100%)',
            }}
          />
          {/* Mobile bottom fade */}
          <div
            className='absolute inset-0 z-[2] hidden max-[900px]:block'
            style={{
              background:
                'linear-gradient(180deg, transparent 55%, var(--obsidian-2) 100%)',
            }}
          />

          {/* Status badge */}
          <div
            className='absolute top-4 left-4 z-[3] flex items-center gap-2 px-3 py-1.5'
            style={{
              background: `color-mix(in srgb, ${statusColor} 10%, transparent)`,
              backdropFilter: 'blur(10px)',
              border: `1px solid color-mix(in srgb, ${statusColor} 30%, transparent)`,
            }}
          >
            {isLive ? (
              <span className='relative flex h-1.25 w-1.25'>
                <span
                  className='animate-ping absolute inline-flex h-full w-full rounded-full opacity-75'
                  style={{ background: statusColor }}
                />
                <span
                  className='relative inline-flex rounded-full h-1.25 w-1.25'
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
              className='text-[0.56rem] tracking-[0.3em] uppercase'
              style={{ color: statusColor }}
            >
              {statusLabel}
            </span>
          </div>

          {/* Category tag */}
          <div className='absolute bottom-4 left-4 z-[3]'>
            <span
              className='text-[0.54rem] tracking-[0.18em] uppercase px-2.5 py-1'
              style={{
                background:
                  'color-mix(in srgb, var(--obsidian) 60%, transparent)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-mid)',
                color: 'var(--gold-light)',
              }}
            >
              {catLabel}
            </span>
          </div>
        </div>

        {/* ── Right: Content ───────────────────────────────────────────── */}
        <div className='relative z-[3] flex flex-col justify-between p-8 max-[900px]:pt-5 max-[900px]:px-5 max-[900px]:pb-6'>
          <div>
            <h3
              className='font-cormorant font-light leading-[1.2] mb-4 transition-colors duration-300'
              style={{
                fontSize: 'clamp(1.4rem, 2vw, 1.9rem)',
                color: hovered ? 'var(--gold-pale)' : 'var(--ivory)',
              }}
            >
              {webinar.title}
            </h3>

            <p
              className='text-[0.78rem] leading-[1.7] mb-5 font-light line-clamp-3'
              style={{ color: 'var(--ivory-muted)' }}
            >
              {webinar.description}
            </p>

            {/* Meta */}
            <div className='flex flex-col gap-1.5 mb-5'>
              <div
                className='flex items-center gap-2 text-[0.68rem]'
                style={{ color: 'var(--ivory-muted)' }}
              >
                <span style={{ color: 'var(--gold)' }}>◷</span>
                {webinar.date} · {webinar.time} · {webinar.duration}
              </div>
              <div
                className='flex items-center gap-2 text-[0.68rem]'
                style={{ color: 'var(--ivory-muted)' }}
              >
                <span style={{ color: 'var(--gold)', fontSize: '0.58rem' }}>◈</span>
                {webinar.registrations.toLocaleString()} registered
              </div>
            </div>

            {/* Speakers */}
            <div
              className='flex items-center gap-3 pb-5 mb-5'
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div className='flex -space-x-2'>
                {webinar.speakers.slice(0, 3).map((s, i) => (
                  <div
                    key={i}
                    className='w-8 h-8 rounded-full flex items-center justify-center'
                    style={{
                      background:
                        'linear-gradient(135deg, var(--obsidian-4), var(--obsidian-3))',
                      border: '2px solid var(--obsidian-2)',
                      boxShadow:
                        '0 0 0 1px color-mix(in srgb, var(--gold) 18%, transparent)',
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

          {/* CTA row */}
          <div className='flex items-center gap-2'>
            <button
              type='button'
              className='font-dm flex-1 flex items-center justify-between px-5 py-3.5 text-left transition-all duration-300'
              style={{
                background: isLive
                  ? 'linear-gradient(135deg, var(--green), color-mix(in srgb, var(--green) 85%, #000))'
                  : 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                color: isLive ? '#001a10' : '#080a0f',
                clipPath:
                  'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
              onClick={(e) => { e.stopPropagation(); router.push('/webinars/' + webinar.id); }}
            >
              <span className='text-[0.68rem] tracking-[0.2em] uppercase font-medium'>
                {isLive ? 'Join Live Session' : isCompleted ? '▶ Watch Recording' : 'Register Free'}
              </span>
              <span aria-hidden className='text-[0.9rem]'>→</span>
            </button>

            {/* Share */}
            <div className='relative'>
              <button
                ref={shareButtonRef}
                type='button'
                className='flex items-center justify-center w-10 h-10 transition-colors duration-150'
                style={{
                  background: 'var(--obsidian-3)',
                  border: '1px solid var(--border-mid)',
                  color: 'var(--ivory-dim)',
                }}
                onClick={(e) => { e.stopPropagation(); setShareOpen((v) => !v); }}
                aria-label='Share webinar'
              >
                <Share2 size={15} />
              </button>
              {shareOpen && (
                <SharePopup url={webinarUrl} title={webinar.title} anchorRef={shareButtonRef} onClose={() => setShareOpen(false)} />
              )}
            </div>

            {/* Copy link */}
            <button
              type='button'
              className='flex items-center justify-center w-10 h-10 transition-colors duration-150'
              style={{
                background: copied ? 'var(--gold-dim)' : 'var(--obsidian-3)',
                border: '1px solid var(--border-mid)',
                color: copied ? 'var(--gold-light)' : 'var(--ivory-dim)',
              }}
              onClick={(e) => { e.stopPropagation(); copy(webinarUrl); }}
              aria-label='Copy link'
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>

            {/* Download (completed only) */}
            {isCompleted && (
              <button
                type='button'
                className='flex items-center justify-center w-10 h-10 transition-colors duration-150'
                style={{
                  background: 'var(--obsidian-3)',
                  border: '1px solid var(--border-mid)',
                  color: 'var(--ivory-dim)',
                }}
                onClick={(e) => e.stopPropagation()}
                aria-label='Download recording'
              >
                <Download size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
