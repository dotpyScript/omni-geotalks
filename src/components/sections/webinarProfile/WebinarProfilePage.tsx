'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  ArrowRight,
  Loader2,
  Check,
  Copy,
  Share2,
  Download,
  Radio,
} from 'lucide-react';
import type { Webinar } from '@/components/sections/webinerDiscovery/types';
import { CATEGORIES } from '@/components/sections/webinerDiscovery/data';
import { BannerPlaceholder } from '@/components/sections/webinerDiscovery/BannerPlaceholder';
import { WebinarCard } from '@/components/sections/webinerDiscovery/WebinarCard';
import { SharePopup } from '@/components/ui/SharePopup';

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

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

// ─── Hero banner ──────────────────────────────────────────────────────────────
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

// ─── Upcoming registration panel ──────────────────────────────────────────────
// Eye-catching inline form: email → register button → copy/share strip

interface UpcomingRegisterPanelProps {
  profileUrl: string;
  title: string;
  registrations: number;
  date: string;
}

function UpcomingRegisterPanel({
  profileUrl,
  title,
  registrations,
  date,
}: UpcomingRegisterPanelProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.');
      inputRef.current?.focus();
      return;
    }
    setError('');
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(profileUrl); }
    catch {
      const el = document.createElement('input');
      el.value = profileUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='relative overflow-hidden' style={{ background: 'var(--obsidian-2)', border: '1px solid var(--border)' }}>
      {/* Top accent gradient strip */}
      <div
        className='h-[2px] w-full'
        style={{ background: 'linear-gradient(90deg, var(--gold), var(--navy-mid), transparent)' }}
      />

      {/* Ambient glow */}
      <div
        className='absolute top-0 left-0 right-0 h-28 pointer-events-none'
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(24,61,110,0.18) 0%, transparent 70%)' }}
      />

      <AnimatePresence mode='wait'>
        {done ? (
          /* ── Success ── */
          <motion.div
            key='success'
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className='relative z-10 flex flex-col items-center text-center px-6 py-8 gap-3'
          >
            <div
              className='w-12 h-12 flex items-center justify-center mb-1'
              style={{
                background: 'var(--teal-dim)',
                border: '1px solid var(--teal-glow)',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}
            >
              <Check size={20} style={{ color: 'var(--teal-light)' }} />
            </div>
            <p
              className='text-[0.62rem] tracking-[0.3em] uppercase'
              style={{ color: 'var(--teal-light)', fontFamily: 'var(--font-body)' }}
            >
              You&apos;re Registered!
            </p>
            <p
              className='text-[0.72rem] leading-[1.6]'
              style={{ color: 'var(--ivory-dim)', fontFamily: 'var(--font-body)' }}
            >
              We&apos;ll send your session link before{' '}
              <span style={{ color: 'var(--gold-light)' }}>{date}</span>. Check your inbox.
            </p>

            {/* Share strip after registration */}
            <div className='flex items-center gap-2 mt-3 w-full'>
              <button
                type='button'
                onClick={handleCopy}
                className='flex-1 flex items-center justify-center gap-2 py-2.5 text-[0.6rem] tracking-[0.14em] uppercase transition-all duration-200'
                style={{
                  background: copied ? 'var(--teal-dim)' : 'var(--obsidian-3)',
                  border: `1px solid ${copied ? 'var(--teal-glow)' : 'var(--border-mid)'}`,
                  color: copied ? 'var(--teal-light)' : 'var(--ivory-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <div className='relative'>
                <button
                  ref={shareRef}
                  type='button'
                  onClick={() => setShareOpen((v) => !v)}
                  className='flex items-center justify-center w-10 h-10 transition-colors duration-150'
                  style={{
                    background: shareOpen ? 'var(--navy-dim)' : 'var(--obsidian-3)',
                    border: '1px solid var(--border-mid)',
                    color: 'var(--ivory-muted)',
                  }}
                >
                  <Share2 size={14} />
                </button>
                {shareOpen && (
                  <SharePopup url={profileUrl} title={title} anchorRef={shareRef} onClose={() => setShareOpen(false)} />
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── Form ── */
          <motion.div
            key='form'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className='relative z-10 px-6 pt-6 pb-5'
          >
            {/* Eyebrow */}
            <div className='flex items-center gap-2.5 mb-4'>
              <div className='w-5 h-px' style={{ background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
              <span
                className='text-[0.54rem] tracking-[0.38em] uppercase'
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}
              >
                Free Registration
              </span>
            </div>

            {/* Headline */}
            <p
              className='text-[0.62rem] leading-[1.55] mb-5'
              style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
            >
              Join{' '}
              <span style={{ color: 'var(--gold-light)' }}>
                {registrations.toLocaleString()}
              </span>{' '}
              professionals already registered. Secure your spot for{' '}
              <span style={{ color: 'var(--ivory-dim)' }}>{date}</span>.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-3'>
              {/* Email field */}
              <div>
                <div className='relative'>
                  <Mail
                    size={13}
                    className='absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none'
                    style={{ color: 'var(--ivory-muted)' }}
                  />
                  <input
                    ref={inputRef}
                    type='email'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder='your@email.com'
                    autoComplete='email'
                    disabled={submitting}
                    className='w-full pl-10 pr-4 py-3 text-[0.72rem] outline-none transition-all duration-200 placeholder:text-[rgba(255,255,255,0.2)]'
                    style={{
                      background: 'var(--obsidian-3)',
                      border: `1px solid ${error ? '#f87171' : 'var(--border-mid)'}`,
                      color: 'var(--ivory-dim)',
                      fontFamily: 'var(--font-body)',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                    }}
                  />
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className='mt-1.5 text-[0.58rem]'
                      style={{ color: '#f87171', fontFamily: 'var(--font-body)' }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Register button */}
              <motion.button
                type='submit'
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.01 }}
                whileTap={{ scale: 0.98 }}
                className='relative w-full flex items-center justify-between px-5 py-3.5 text-[0.68rem] tracking-[0.2em] uppercase font-medium overflow-hidden transition-opacity duration-200 disabled:opacity-60'
                style={{
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                  color: 'var(--obsidian)',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                  fontFamily: 'var(--font-body)',
                  boxShadow: '0 4px 20px rgba(24,61,110,0.25)',
                }}
              >
                {/* Shimmer */}
                <motion.span
                  className='absolute inset-0 pointer-events-none'
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.55 }}
                />
                <span className='relative flex items-center gap-2'>
                  {submitting ? (
                    <Loader2 size={13} className='animate-spin' />
                  ) : null}
                  {submitting ? 'Registering…' : 'Confirm Registration'}
                </span>
                {!submitting && <ArrowRight size={14} className='relative' />}
              </motion.button>
            </form>

            {/* Divider */}
            <div
              className='my-4 flex items-center gap-3'
            >
              <div className='flex-1 h-px' style={{ background: 'var(--border)' }} />
              <span className='text-[0.52rem] tracking-[0.2em] uppercase' style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}>
                or share
              </span>
              <div className='flex-1 h-px' style={{ background: 'var(--border)' }} />
            </div>

            {/* Copy + Share strip */}
            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={handleCopy}
                className='flex-1 flex items-center gap-2.5 px-3 py-2.5 text-[0.6rem] tracking-[0.1em] uppercase transition-all duration-200 min-w-0'
                style={{
                  background: copied ? 'var(--navy-dim)' : 'var(--obsidian-3)',
                  border: `1px solid ${copied ? 'var(--border-mid)' : 'var(--border)'}`,
                  color: copied ? 'var(--gold-light)' : 'var(--ivory-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {copied ? <Check size={12} className='shrink-0' /> : <Copy size={12} className='shrink-0' />}
                <span className='truncate font-mono text-[0.56rem]' style={{ color: 'var(--ivory-muted)' }}>
                  {copied ? 'Copied!' : profileUrl.replace('https://', '')}
                </span>
              </button>

              {/* Share icon button */}
              <div className='relative'>
                <button
                  ref={shareRef}
                  type='button'
                  onClick={() => setShareOpen((v) => !v)}
                  title='Share webinar'
                  className='flex items-center justify-center w-10 h-10 transition-all duration-150'
                  style={{
                    background: shareOpen ? 'var(--navy-dim)' : 'var(--obsidian-3)',
                    border: `1px solid ${shareOpen ? 'var(--border-mid)' : 'var(--border)'}`,
                    color: shareOpen ? 'var(--gold-light)' : 'var(--ivory-muted)',
                  }}
                  aria-label='Share webinar'
                >
                  <Share2 size={14} />
                </button>
                {shareOpen && (
                  <SharePopup
                    url={profileUrl}
                    title={title}
                    anchorRef={shareRef}
                    onClose={() => setShareOpen(false)}
                  />
                )}
              </div>
            </div>

            {/* Tagline */}
            <p
              className='mt-4 text-center text-[0.56rem] tracking-[0.1em]'
              style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
            >
              No payment · No account required · 100% free
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Completed / Live action card ─────────────────────────────────────────────

interface ActionCardProps {
  isLive: boolean;
  isCompleted: boolean;
  statusColor: string;
  statusLabel: string;
  date: string;
  registrations: number;
  profileUrl: string;
  title: string;
}

function ActionCard({
  isLive,
  isCompleted,
  statusColor,
  statusLabel,
  date,
  registrations,
  profileUrl,
  title,
}: ActionCardProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLButtonElement>(null);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(profileUrl); }
    catch {
      const el = document.createElement('input');
      el.value = profileUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className='overflow-hidden'
      style={{ background: 'var(--obsidian-2)', border: '1px solid var(--border)' }}
    >
      {/* Top accent */}
      <div
        className='h-0.5 w-full'
        style={{
          background: isLive
            ? 'linear-gradient(90deg, var(--green), transparent)'
            : 'linear-gradient(90deg, var(--gold), transparent)',
        }}
      />

      <div className='p-6'>
        {/* Status row */}
        <div className='flex items-center gap-2 mb-5'>
          {isLive ? (
            <span className='relative flex h-[5px] w-[5px]'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full opacity-75' style={{ background: statusColor }} />
              <span className='relative inline-flex rounded-full h-[5px] w-[5px]' style={{ background: statusColor }} />
            </span>
          ) : (
            <span className='inline-flex rounded-full h-[5px] w-[5px]' style={{ background: statusColor }} />
          )}
          <span className='text-[0.62rem] tracking-[0.2em] uppercase' style={{ color: statusColor, fontFamily: 'var(--font-body)' }}>
            {statusLabel}
          </span>
          <span className='ml-auto text-[0.6rem]' style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}>
            {date}
          </span>
        </div>

        {/* Main CTA */}
        <button
          type='button'
          className='font-dm w-full flex items-center justify-between px-5 py-4 mb-3 text-[0.7rem] tracking-[0.2em] uppercase font-medium transition-all duration-300 relative overflow-hidden'
          style={{
            background: isLive
              ? 'linear-gradient(135deg, var(--green), color-mix(in srgb, var(--green) 80%, #000))'
              : 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            color: isLive ? '#001a10' : '#080a0f',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            fontFamily: 'var(--font-body)',
          }}
        >
          <span className='flex items-center gap-2'>
            {isLive && <Radio size={13} />}
            {isLive ? 'Join Live Session' : '▶ Watch Recording'}
          </span>
          <ArrowRight size={14} />
        </button>

        {/* Download for completed */}
        {isCompleted && (
          <button
            type='button'
            className='font-dm w-full flex items-center justify-between px-5 py-3 mb-4 text-[0.64rem] tracking-[0.16em] uppercase transition-all duration-200'
            style={{
              background: 'var(--obsidian-3)',
              border: '1px solid var(--border-mid)',
              color: 'var(--ivory-dim)',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hi)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)'; (e.currentTarget as HTMLElement).style.color = 'var(--ivory-dim)'; }}
          >
            <span className='flex items-center gap-2'><Download size={13} /> Download Recording</span>
            <span className='text-[0.56rem] tracking-widest' style={{ color: 'var(--ivory-muted)' }}>MP4</span>
          </button>
        )}

        {/* Divider */}
        <div className='mb-4' style={{ borderTop: '1px solid var(--border)' }} />

        {/* Copy + Share row */}
        <div className='flex items-center gap-2 mb-4'>
          <button
            type='button'
            onClick={handleCopy}
            className='flex-1 flex items-center gap-2 px-3 py-2.5 text-[0.6rem] tracking-[0.08em] uppercase transition-all duration-200 min-w-0'
            style={{
              background: copied ? 'var(--navy-dim)' : 'var(--obsidian-4)',
              border: `1px solid ${copied ? 'var(--border-mid)' : 'var(--border)'}`,
              color: copied ? 'var(--gold-light)' : 'var(--ivory-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {copied ? <Check size={12} className='shrink-0' /> : <Copy size={12} className='shrink-0' />}
            <span className='truncate font-mono text-[0.56rem]' style={{ color: 'var(--ivory-muted)' }}>
              {copied ? 'Copied!' : profileUrl.replace('https://', '')}
            </span>
          </button>
          <div className='relative'>
            <button
              ref={shareRef}
              type='button'
              onClick={() => setShareOpen((v) => !v)}
              className='flex items-center justify-center w-10 h-10 transition-all duration-150'
              style={{
                background: shareOpen ? 'var(--navy-dim)' : 'var(--obsidian-4)',
                border: `1px solid ${shareOpen ? 'var(--border-mid)' : 'var(--border)'}`,
                color: shareOpen ? 'var(--gold-light)' : 'var(--ivory-muted)',
              }}
              aria-label='Share webinar'
            >
              <Share2 size={14} />
            </button>
            {shareOpen && (
              <SharePopup url={profileUrl} title={title} anchorRef={shareRef} onClose={() => setShareOpen(false)} />
            )}
          </div>
        </div>

        {/* Registration count */}
        <p className='text-center text-[0.6rem]' style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}>
          <span style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-bebas)', fontSize: '1.1rem', letterSpacing: '0.04em' }}>
            {registrations.toLocaleString()}
          </span>
          {' '}people registered
        </p>
      </div>
    </div>
  );
}

// ─── WebinarProfilePage ───────────────────────────────────────────────────────

interface WebinarProfilePageProps {
  webinar: Webinar;
  allWebinars: Webinar[];
}

export default function WebinarProfilePage({ webinar, allWebinars }: WebinarProfilePageProps) {
  const catLabel = CATEGORIES.find((c) => c.id === webinar.category)?.label ?? webinar.category;
  const isLive = webinar.status === 'live';
  const isCompleted = webinar.status === 'completed';
  const isUpcoming = webinar.status === 'upcoming';

  const statusColor = isLive ? 'var(--green)' : isCompleted ? 'var(--gold)' : 'var(--cyan)';
  const statusLabel = isLive ? 'Live Now' : isCompleted ? 'Recorded' : 'Upcoming';

  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/webinars/${webinar.id}`
    : `https://iegs.org/webinars/${webinar.id}`;

  // Suggestions: same category first, max 3
  const suggestions = [
    ...allWebinars.filter((w) => w.id !== webinar.id && w.category === webinar.category),
    ...allWebinars.filter((w) => w.id !== webinar.id && w.category !== webinar.category),
  ].slice(0, 3);

  return (
    <div
      className='relative min-h-screen font-dm'
      style={{ background: 'var(--obsidian)', color: 'var(--ivory)' }}
    >
      {/* Blueprint grid bg */}
      <div aria-hidden className='pointer-events-none absolute inset-0 z-0 bg-grid opacity-50' />

      {/* ── Back nav ──────────────────────────────────────────────────────────── */}
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
          className='flex items-center gap-2 text-[0.64rem] tracking-[0.12em] uppercase transition-colors duration-200'
          style={{ color: 'var(--ivory-muted)' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--gold)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--ivory-muted)')}
        >
          ← Explore Webinars
        </Link>
        <span style={{ color: 'var(--border)', fontSize: '0.7rem' }}>·</span>
        <span className='text-[0.62rem] truncate max-w-[300px]' style={{ color: 'var(--ivory-muted)' }}>
          {webinar.title}
        </span>
      </nav>

      {/* ── Hero banner ───────────────────────────────────────────────────────── */}
      <div className='relative w-full overflow-hidden' style={{ height: 'clamp(260px, 40vw, 480px)' }}>
        <HeroBanner index={webinar.banner} />
        <div className='absolute inset-0 z-[1]' style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <div className='absolute inset-0 z-[1]' style={{ background: 'linear-gradient(180deg, transparent 40%, var(--obsidian) 100%)' }} />

        <div className='absolute bottom-0 left-0 right-0 z-[2] px-6 sm:px-10 lg:px-16 pb-8 pt-4'>
          <div className='flex items-center gap-3 mb-3'>
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

      {/* ── Main content ──────────────────────────────────────────────────────── */}
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

            {/* Key Topics */}
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

          {/* ── Right column: action card ──────────────────────────────────────── */}
          <motion.div
            className='lg:sticky lg:top-[60px] self-start'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          >
            {isUpcoming ? (
              <UpcomingRegisterPanel
                profileUrl={profileUrl}
                title={webinar.title}
                registrations={webinar.registrations}
                date={webinar.date}
              />
            ) : (
              <ActionCard
                isLive={isLive}
                isCompleted={isCompleted}
                statusColor={statusColor}
                statusLabel={statusLabel}
                date={webinar.date}
                registrations={webinar.registrations}
                profileUrl={profileUrl}
                title={webinar.title}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Suggestions ─────────────────────────────────────────────────────── */}
      {suggestions.length > 0 && (
        <section
          className='relative z-10 px-6 sm:px-10 lg:px-16 py-12'
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className='flex items-center gap-4 mb-8'>
            <div className='w-6 h-px' style={{ background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
            <h2 className='font-cormorant font-light text-[1.6rem]' style={{ color: 'var(--ivory)' }}>
              You Might Also Like
            </h2>
            <div className='flex-1 h-px' style={{ background: 'linear-gradient(90deg, var(--border), transparent)' }} />
          </div>

          {/* Uses WebinarCard — same component as discovery page, same email-overlay on "Register Free" */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {suggestions.map((s, i) => (
              <WebinarCard key={s.id} webinar={s} index={i} />
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
