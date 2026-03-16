'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Webinar } from '@/components/sections/webinerDiscovery/types';
import { CATEGORIES } from '@/components/sections/webinerDiscovery/data';
import { BannerPlaceholder } from '@/components/sections/webinerDiscovery/BannerPlaceholder';
import { SharePopup } from '@/components/ui/SharePopup';

// ─── Banner image map ─────────────────────────────────────────────────────────

const BANNER_IMAGES: Record<number, string> = {
  0: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=85&fit=crop',
  1: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1400&q=85&fit=crop',
  2: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=85&fit=crop',
  3: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1400&q=85&fit=crop',
  4: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85&fit=crop',
  5: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=85&fit=crop',
  6: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85&fit=crop',
  7: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=85&fit=crop',
};

function HeroBanner({ index }: { index: number }) {
  const [imgError, setImgError] = useState(false);
  const src = BANNER_IMAGES[index];
  if (!src || imgError) return <BannerPlaceholder index={index} />;
  return (
    <img
      src={src}
      alt=''
      aria-hidden='true'
      className='absolute inset-0 w-full h-full object-cover'
      onError={() => setImgError(true)}
    />
  );
}

// ─── Copy URL button ──────────────────────────────────────────────────────────

function CopyButton({ url, compact = false }: { url: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement('input');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  if (compact) {
    return (
      <button
        type='button'
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy link'}
        className='w-9 h-9 flex items-center justify-center transition-all duration-200'
        style={{
          background: copied ? 'var(--green-dim)' : 'var(--obsidian-3)',
          border: `1px solid ${copied ? 'color-mix(in srgb, var(--green) 30%, transparent)' : 'var(--border)'}`,
          color: copied ? 'var(--green)' : 'var(--ivory-muted)',
        }}
      >
        {copied ? '✓' : '⎘'}
      </button>
    );
  }

  return (
    <button
      type='button'
      onClick={handleCopy}
      className='flex items-center gap-2.5 px-4 py-2.5 text-[0.62rem] tracking-[0.14em] uppercase transition-all duration-200 w-full'
      style={{
        background: copied ? 'var(--green-dim)' : 'var(--obsidian-4)',
        border: `1px solid ${copied ? 'color-mix(in srgb, var(--green) 30%, transparent)' : 'var(--border)'}`,
        color: copied ? 'var(--green)' : 'var(--ivory-muted)',
      }}
    >
      <span className='text-[0.8rem]'>{copied ? '✓' : '⎘'}</span>
      <span className='flex-1 text-left font-mono text-[0.6rem] truncate' style={{ color: 'var(--ivory-muted)' }}>
        {copied ? 'Copied!' : url.replace('https://', '')}
      </span>
    </button>
  );
}

// ─── Suggestion Card (mini) ───────────────────────────────────────────────────

function SuggestionCard({ webinar, index }: { webinar: Webinar; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const router = useRouter();
  const isLive = webinar.status === 'live';
  const isCompleted = webinar.status === 'completed';
  const catLabel = CATEGORIES.find((c) => c.id === webinar.category)?.label ?? webinar.category;
  const statusColor = isLive ? 'var(--green)' : isCompleted ? 'var(--gold)' : 'var(--cyan)';
  const src = BANNER_IMAGES[webinar.banner];

  return (
    <motion.article
      className='relative cursor-pointer overflow-hidden flex flex-col'
      style={{
        background: 'linear-gradient(160deg, var(--obsidian-2) 0%, var(--obsidian-3) 100%)',
        border: `1px solid ${hovered ? 'var(--border-mid)' : 'var(--border)'}`,
        transition: 'border-color 0.3s ease',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => router.push(`/webinars/${webinar.id}`)}
      whileHover={{ y: -3 }}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && router.push(`/webinars/${webinar.id}`)}
    >
      {/* Banner */}
      <div className='relative w-full overflow-hidden shrink-0 h-40'>
        <motion.div
          className='absolute inset-0'
          animate={{
            scale: hovered ? 1.05 : 1,
            filter: hovered ? 'brightness(1.1) saturate(1.05)' : 'brightness(0.88) saturate(0.95)',
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {src && !imgError ? (
            <img
              src={src}
              alt=''
              aria-hidden='true'
              className='absolute inset-0 w-full h-full object-cover'
              onError={() => setImgError(true)}
              loading='lazy'
            />
          ) : (
            <BannerPlaceholder index={webinar.banner} />
          )}
        </motion.div>
        <div
          className='absolute inset-0 pointer-events-none'
          style={{ background: 'linear-gradient(180deg, transparent 50%, color-mix(in srgb, var(--obsidian-2) 75%, transparent) 100%)' }}
        />
        {/* Status dot */}
        <div className='absolute top-2.5 left-2.5 z-[3] flex items-center gap-1.5 px-2 py-0.5'
          style={{
            background: 'color-mix(in srgb, var(--obsidian) 55%, transparent)',
            backdropFilter: 'blur(8px)',
            border: `1px solid color-mix(in srgb, ${statusColor} 25%, transparent)`,
          }}>
          <span className='inline-flex rounded-full h-[5px] w-[5px]' style={{ background: statusColor }} />
          <span className='text-[0.5rem] tracking-[0.2em] uppercase' style={{ color: statusColor }}>
            {isLive ? 'Live' : isCompleted ? 'Recorded' : 'Upcoming'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className='flex flex-col flex-1 px-4 pt-3 pb-4'>
        <span className='text-[0.52rem] tracking-[0.16em] uppercase mb-1.5' style={{ color: 'var(--gold)' }}>
          {catLabel}
        </span>
        <h4
          className='font-cormorant font-light leading-[1.3] text-[0.95rem] mb-2 flex-1 transition-colors duration-250'
          style={{ color: hovered ? 'var(--gold-pale)' : 'var(--ivory)' }}
        >
          {webinar.title}
        </h4>
        <div className='flex items-center justify-between mt-auto pt-2.5' style={{ borderTop: '1px solid var(--border)' }}>
          <span className='text-[0.6rem]' style={{ color: 'var(--ivory-muted)' }}>
            {webinar.date} · {webinar.duration}
          </span>
          <button
            type='button'
            onClick={(e) => { e.stopPropagation(); router.push(`/webinars/${webinar.id}`); }}
            className='text-[0.58rem] tracking-[0.14em] uppercase px-2.5 py-1 transition-all duration-200 font-dm'
            style={{
              background: isLive ? 'linear-gradient(135deg, var(--green), color-mix(in srgb, var(--green) 80%, #000))' :
                isCompleted ? 'transparent' :
                'linear-gradient(135deg, var(--gold), var(--gold-light))',
              border: isCompleted ? '1px solid var(--border-mid)' : 'none',
              color: isCompleted ? 'var(--gold)' : '#080a0f',
            }}
          >
            {isLive ? 'Join Live' : isCompleted ? '▶ Watch' : 'Register'}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// ─── WebinarProfilePage ───────────────────────────────────────────────────────

interface WebinarProfilePageProps {
  webinar: Webinar;
  allWebinars: Webinar[];
}

export default function WebinarProfilePage({ webinar, allWebinars }: WebinarProfilePageProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const [registerState, setRegisterState] = useState<'idle' | 'success'>('idle');
  const catLabel = CATEGORIES.find((c) => c.id === webinar.category)?.label ?? webinar.category;
  const isLive = webinar.status === 'live';
  const isCompleted = webinar.status === 'completed';
  const statusColor = isLive ? 'var(--green)' : isCompleted ? 'var(--gold)' : 'var(--cyan)';
  const statusLabel = isLive ? 'Live Now' : isCompleted ? 'Recorded' : 'Upcoming';

  // Build the canonical URL (works both SSR and client)
  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/webinars/${webinar.id}`
    : `https://iegs.org/webinars/${webinar.id}`;

  // Suggestions: other webinars, same category first, then others, max 3
  const suggestions = [
    ...allWebinars.filter((w) => w.id !== webinar.id && w.category === webinar.category),
    ...allWebinars.filter((w) => w.id !== webinar.id && w.category !== webinar.category),
  ].slice(0, 3);

  const handleRegister = () => {
    setRegisterState('success');
    setTimeout(() => setRegisterState('idle'), 3000);
  };

  return (
    <div
      className='relative min-h-screen font-dm'
      style={{ background: 'var(--obsidian)', color: 'var(--ivory)' }}
    >
      {/* Blueprint grid bg */}
      <div aria-hidden className='pointer-events-none absolute inset-0 z-0 bg-grid opacity-50' />

      {/* ── Back nav ────────────────────────────────────────────────────────── */}
      <nav
        className='sticky top-0 z-30 px-6 sm:px-10 lg:px-16 py-3 flex items-center gap-4'
        style={{
          background: 'color-mix(in srgb, var(--obsidian) 88%, transparent)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Link
          href='/webinars'
          className='flex items-center gap-2 text-[0.64rem] tracking-[0.12em] uppercase transition-colors duration-200 font-dm'
          style={{ color: 'var(--ivory-muted)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ivory-muted)')}
        >
          ← Explore Webinars
        </Link>
        <span style={{ color: 'var(--border)', fontSize: '0.7rem' }}>·</span>
        <span className='text-[0.62rem] truncate max-w-[300px]' style={{ color: 'var(--ivory-muted)' }}>
          {webinar.title}
        </span>
      </nav>

      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
      <div className='relative w-full overflow-hidden' style={{ height: 'clamp(260px, 40vw, 480px)' }}>
        <HeroBanner index={webinar.banner} />

        {/* Overlays */}
        <div
          className='absolute inset-0 z-[1]'
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)' }}
        />
        <div
          className='absolute inset-0 z-[1]'
          style={{ background: 'linear-gradient(180deg, transparent 40%, var(--obsidian) 100%)' }}
        />

        {/* Hero text overlay */}
        <div className='absolute bottom-0 left-0 right-0 z-[2] px-6 sm:px-10 lg:px-16 pb-8 pt-4'>
          <div className='flex items-center gap-3 mb-3'>
            {/* Status badge */}
            <div
              className='inline-flex items-center gap-2 px-3 py-1.5'
              style={{
                background: `color-mix(in srgb, ${statusColor} 12%, transparent)`,
                backdropFilter: 'blur(10px)',
                border: `1px solid color-mix(in srgb, ${statusColor} 30%, transparent)`,
              }}
            >
              {isLive && (
                <span className='relative flex h-[5px] w-[5px]'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full opacity-75' style={{ background: statusColor }} />
                  <span className='relative inline-flex rounded-full h-[5px] w-[5px]' style={{ background: statusColor }} />
                </span>
              )}
              <span className='text-[0.54rem] tracking-[0.28em] uppercase font-medium' style={{ color: statusColor }}>
                {statusLabel}
              </span>
            </div>
            <span
              className='text-[0.52rem] tracking-[0.18em] uppercase px-2.5 py-1.5'
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

          <h1
            className='font-cormorant font-light leading-[1.1] max-w-[720px]'
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', color: 'var(--ivory)' }}
          >
            {webinar.title}
          </h1>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div className='relative z-10 px-6 sm:px-10 lg:px-16 py-10'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 max-w-[1280px]'>

          {/* ── Left column ─────────────────────────────────────────────────── */}
          <div>
            {/* Meta row */}
            <div className='flex flex-wrap items-center gap-4 mb-8 pb-6' style={{ borderBottom: '1px solid var(--border)' }}>
              <div className='flex items-center gap-2 text-[0.72rem]' style={{ color: 'var(--ivory-muted)' }}>
                <span style={{ color: 'var(--gold)' }}>◷</span>
                {webinar.date} · {webinar.time}
              </div>
              <div className='flex items-center gap-2 text-[0.72rem]' style={{ color: 'var(--ivory-muted)' }}>
                <span style={{ color: 'var(--gold)' }}>⏱</span>
                {webinar.duration}
              </div>
              <div className='flex items-center gap-2 text-[0.72rem]' style={{ color: 'var(--ivory-muted)' }}>
                <span style={{ color: 'var(--gold)', fontSize: '0.62rem' }}>◈</span>
                {webinar.registrations.toLocaleString()} registered
              </div>
            </div>

            {/* Description */}
            <div className='mb-8'>
              <h2 className='font-cormorant font-light text-[1.4rem] mb-3' style={{ color: 'var(--ivory)' }}>
                About this Session
              </h2>
              <p className='text-[0.82rem] leading-[1.8] font-light' style={{ color: 'var(--ivory-dim)' }}>
                {webinar.description}
              </p>
            </div>

            {/* Speakers */}
            <div className='mb-8'>
              <h2 className='font-cormorant font-light text-[1.4rem] mb-5' style={{ color: 'var(--ivory)' }}>
                {webinar.speakers.length === 1 ? 'Speaker' : 'Speakers'}
              </h2>
              <div className='flex flex-col gap-4'>
                {webinar.speakers.map((s, i) => (
                  <div
                    key={i}
                    className='flex items-center gap-4 p-4'
                    style={{ background: 'var(--obsidian-2)', border: '1px solid var(--border)' }}
                  >
                    <div
                      className='w-14 h-14 rounded-full flex items-center justify-center shrink-0'
                      style={{
                        background: 'linear-gradient(135deg, var(--obsidian-4), var(--obsidian-3))',
                        border: '2px solid var(--obsidian-2)',
                        boxShadow: '0 0 0 2px color-mix(in srgb, var(--gold) 20%, transparent)',
                      }}
                    >
                      <span className='font-cormorant text-[0.8rem] font-semibold' style={{ color: 'var(--gold-light)' }}>
                        {s.initials}
                      </span>
                    </div>
                    <div>
                      <p className='text-[0.84rem] font-medium' style={{ color: 'var(--ivory)' }}>{s.name}</p>
                      <p className='text-[0.68rem] mt-0.5' style={{ color: 'var(--ivory-muted)' }}>
                        {catLabel} Expert · IEGS Faculty
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div>
              <h2 className='font-cormorant font-light text-[1.4rem] mb-4' style={{ color: 'var(--ivory)' }}>
                Key Topics
              </h2>
              <div className='flex flex-wrap gap-2'>
                {[catLabel, 'Geospatial Analysis', 'Practical Workshop', 'Q&A Session', 'Certificate'].map((t) => (
                  <span
                    key={t}
                    className='text-[0.62rem] tracking-[0.12em] uppercase px-3 py-1.5'
                    style={{
                      background: 'var(--obsidian-3)',
                      border: '1px solid var(--border)',
                      color: 'var(--ivory-muted)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column: action card ────────────────────────────────────── */}
          <div className='lg:sticky lg:top-[60px] self-start'>
            <div
              className='overflow-hidden'
              style={{ background: 'var(--obsidian-2)', border: '1px solid var(--border)' }}
            >
              {/* Card header accent */}
              <div
                className='h-0.5 w-full'
                style={{
                  background: isLive
                    ? 'linear-gradient(90deg, var(--green), transparent)'
                    : isCompleted
                      ? 'linear-gradient(90deg, var(--gold), transparent)'
                      : 'linear-gradient(90deg, var(--cyan), transparent)',
                }}
              />

              <div className='p-6'>
                {/* Status */}
                <div className='flex items-center gap-2 mb-5'>
                  <span className='inline-flex rounded-full h-[5px] w-[5px]' style={{ background: statusColor }} />
                  <span className='text-[0.62rem] tracking-[0.2em] uppercase' style={{ color: statusColor }}>
                    {statusLabel}
                  </span>
                  <span className='ml-auto text-[0.6rem]' style={{ color: 'var(--ivory-muted)' }}>
                    {webinar.date}
                  </span>
                </div>

                {/* Main CTA */}
                {isCompleted ? (
                  <button
                    type='button'
                    onClick={handleRegister}
                    className='font-dm w-full flex items-center justify-between px-5 py-4 mb-3 text-[0.7rem] tracking-[0.2em] uppercase font-medium transition-all duration-300'
                    style={{
                      background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                      color: '#080a0f',
                      clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                    }}
                  >
                    <span>▶ Watch Recording</span>
                    <span aria-hidden>→</span>
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={handleRegister}
                    className='font-dm w-full flex items-center justify-between px-5 py-4 mb-3 text-[0.7rem] tracking-[0.2em] uppercase font-medium transition-all duration-300'
                    style={{
                      background: registerState === 'success'
                        ? 'linear-gradient(135deg, var(--green), color-mix(in srgb, var(--green) 80%, #000))'
                        : isLive
                          ? 'linear-gradient(135deg, var(--green), color-mix(in srgb, var(--green) 80%, #000))'
                          : 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                      color: registerState === 'success' ? '#001a10' : isLive ? '#001a10' : '#080a0f',
                      clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                    }}
                  >
                    <span>
                      {registerState === 'success' ? '✓ Registered!' : isLive ? 'Join Live Session' : 'Register Free'}
                    </span>
                    <span aria-hidden>→</span>
                  </button>
                )}

                {/* Download (recordings only) */}
                {isCompleted && (
                  <button
                    type='button'
                    className='font-dm w-full flex items-center justify-between px-5 py-3 mb-3 text-[0.64rem] tracking-[0.16em] uppercase transition-all duration-200'
                    style={{
                      background: 'var(--obsidian-3)',
                      border: '1px solid var(--border-mid)',
                      color: 'var(--ivory-dim)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)'; (e.currentTarget as HTMLElement).style.color = 'var(--ivory-dim)'; }}
                  >
                    <span>⬇ Download Recording</span>
                    <span className='text-[0.56rem] tracking-widest' style={{ color: 'var(--ivory-muted)' }}>MP4</span>
                  </button>
                )}

                {/* Divider */}
                <div className='my-4' style={{ borderTop: '1px solid var(--border)' }} />

                {/* Copy URL */}
                <CopyButton url={profileUrl} />

                {/* Share */}
                <div className='mt-3'>
                  <button
                    ref={shareButtonRef}
                    type='button'
                    onClick={() => setShareOpen((o) => !o)}
                    className='font-dm w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[0.62rem] tracking-[0.16em] uppercase transition-all duration-200'
                    style={{
                      background: shareOpen ? 'var(--gold-dim)' : 'transparent',
                      border: `1px solid ${shareOpen ? 'var(--border-mid)' : 'var(--border)'}`,
                      color: shareOpen ? 'var(--gold-light)' : 'var(--ivory-muted)',
                    }}
                  >
                    <span>↗</span>
                    Share this webinar
                  </button>

                  {shareOpen && (
                    <SharePopup
                      url={profileUrl}
                      title={webinar.title}
                      anchorRef={shareButtonRef}
                      onClose={() => setShareOpen(false)}
                    />
                  )}
                </div>

                {/* Registrations count */}
                <p className='mt-4 text-center text-[0.6rem]' style={{ color: 'var(--ivory-muted)' }}>
                  <span style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-bebas)', fontSize: '1.1rem', letterSpacing: '0.04em' }}>
                    {webinar.registrations.toLocaleString()}
                  </span>
                  {' '}people registered
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Suggestions ─────────────────────────────────────────────────────── */}
      {suggestions.length > 0 && (
        <section
          className='relative z-10 px-6 sm:px-10 lg:px-16 py-12'
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {/* Section label */}
          <div className='flex items-center gap-4 mb-8'>
            <div className='w-6 h-px' style={{ background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
            <h2 className='font-cormorant font-light text-[1.6rem]' style={{ color: 'var(--ivory)' }}>
              You Might Also Like
            </h2>
            <div className='flex-1 h-px' style={{ background: 'linear-gradient(90deg, var(--border), transparent)' }} />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {suggestions.map((s, i) => (
              <SuggestionCard key={s.id} webinar={s} index={i} />
            ))}
          </div>

          <div className='mt-8 text-center'>
            <Link
              href='/webinars'
              className='font-dm inline-flex items-center gap-2.5 px-6 py-3 text-[0.64rem] tracking-[0.22em] uppercase transition-all duration-200'
              style={{ border: '1px solid var(--border)', color: 'var(--ivory-muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--ivory-muted)'; }}
            >
              Browse All Sessions →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
