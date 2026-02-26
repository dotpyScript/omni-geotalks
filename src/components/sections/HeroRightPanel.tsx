'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import {
  Check,
  Copy,
  Calendar,
  Video,
  Clock,
  Users,
  Globe,
  Mail,
} from 'lucide-react';
import { cn, FONTS, EASE_OUT_EXPO } from '@/lib/utils';
import { Countdown } from '@/components/sections/heroSection/Countdown';
import type { EventCardProps } from '@/components/sections/heroSection/Card';

// ─── Types ────────────────────────────────────────────────────────────────────
interface HeroRightPanelProps {
  webinars: Omit<EventCardProps, 'onAction'>[];
  nextWebinarDate: string;
  countdownLabel: string;
}

// ─── Floating wrapper ─────────────────────────────────────────────────────────
// Plays an entrance (fade + rise) then seamlessly transitions to a continuous
// gentle float loop — giving badges a natural, breathing feel.
function FloatingCard({
  children,
  className,
  delay = 0,
  floatY = 7,
  floatDuration = 4,
  float = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  floatY?: number;
  floatDuration?: number;
  float?: boolean;
}) {
  const controls = useAnimation();

  useEffect(() => {
    const run = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay, duration: 0.85, ease: [0.16, 1, 0.3, 1] },
      });
      if (float) {
        controls.start({
          y: [0, -floatY, 0],
          transition: {
            duration: floatDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        });
      }
    };
    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Email Confirmation Card ──────────────────────────────────────────────────
// Looks like a real desktop mail client — macOS chrome, full email body,
// session details panel, Zoom link with copy button, speaker avatars.
function EmailConfirmationCard({
  webinar,
}: {
  webinar: Omit<EventCardProps, 'onAction'>;
}) {
  const [copied, setCopied] = useState(false);
  const zoomLink = 'zoom.us/j/92847561834';

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <FloatingCard delay={0.5} floatY={5} floatDuration={6}>
      <div
        className='w-full rounded-2xl overflow-hidden'
        style={{
          background:
            'linear-gradient(160deg, rgba(15,19,30,0.98) 0%, rgba(8,10,16,1) 100%)',
          border: '1px solid rgba(201,168,76,0.18)',
          backdropFilter: 'blur(20px)',
          boxShadow:
            '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.06), 0 0 80px rgba(201,168,76,0.04)',
        }}
      >
        {/* ── Window chrome ──────────────────────────────────────────────── */}
        <div
          className='flex items-center gap-3 px-4 py-3 border-b'
          style={{
            borderColor: 'rgba(201,168,76,0.1)',
            background: 'rgba(201,168,76,0.025)',
          }}
        >
          {/* macOS traffic-light dots */}
          <div className='flex items-center gap-[5px]'>
            {[
              'rgba(255,96,91,0.7)',
              'rgba(255,189,46,0.7)',
              'rgba(39,201,63,0.7)',
            ].map((bg, i) => (
              <div
                key={i}
                className='w-[9px] h-[9px] rounded-full'
                style={{ background: bg }}
              />
            ))}
          </div>

          {/* Fake address / from bar */}
          <div className='flex-1 flex justify-center'>
            <div
              className='flex items-center gap-1.5 px-3 py-[3px] rounded-full'
              style={{
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.1)',
              }}
            >
              <Mail size={8} style={{ color: 'rgba(201,168,76,0.4)' }} />
              <span
                className='text-[0.44rem] tracking-[0.06em]'
                style={{ color: 'rgba(240,237,230,0.28)', fontFamily: FONTS.body }}
              >
                no-reply@iegs.africa
              </span>
            </div>
          </div>
          <div className='w-10' />
        </div>

        {/* ── Email body ──────────────────────────────────────────────────── */}
        <div className='px-5 pt-4 pb-5 space-y-4'>

          {/* Sender + confirmed badge */}
          <div className='flex items-center gap-2.5'>
            <div
              className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
              style={{
                background:
                  'linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.05))',
                border: '1px solid rgba(201,168,76,0.22)',
              }}
            >
              <span
                style={{
                  color: '#c9a84c',
                  fontSize: 9,
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                }}
              >
                IE
              </span>
            </div>
            <div className='flex-1 min-w-0'>
              <p
                className='text-[0.6rem] font-medium leading-none mb-[3px]'
                style={{ color: 'rgba(240,237,230,0.65)', fontFamily: FONTS.body }}
              >
                IEGS Geospatial Series
              </p>
              <p
                className='text-[0.46rem] leading-none'
                style={{ color: 'rgba(240,237,230,0.25)', fontFamily: FONTS.body }}
              >
                Webinar Registration
              </p>
            </div>
            {/* Confirmed pill */}
            <div
              className='flex items-center gap-1.5 px-2.5 py-1 rounded-full shrink-0'
              style={{
                background: 'rgba(0,229,160,0.08)',
                border: '1px solid rgba(0,229,160,0.2)',
              }}
            >
              <Check size={8} style={{ color: '#00e5a0' }} />
              <span
                className='text-[0.44rem] tracking-[0.14em] uppercase'
                style={{ color: '#00e5a0', fontFamily: FONTS.body }}
              >
                Confirmed
              </span>
            </div>
          </div>

          {/* Greeting */}
          <div
            className='pb-4 border-b'
            style={{ borderColor: 'rgba(201,168,76,0.08)' }}
          >
            <p
              className='text-[0.88rem] font-light mb-1'
              style={{ color: '#f0ede6', fontFamily: FONTS.display }}
            >
              You&apos;re registered!
            </p>
            <p
              className='text-[0.56rem] leading-relaxed'
              style={{ color: 'rgba(240,237,230,0.35)', fontFamily: FONTS.body }}
            >
              Your spot is confirmed. Your session details and access link are
              below.
            </p>
          </div>

          {/* Session details card */}
          <div
            className='rounded-xl p-3.5'
            style={{
              background: 'rgba(201,168,76,0.03)',
              border: '1px solid rgba(201,168,76,0.1)',
            }}
          >
            <p
              className='text-[0.44rem] tracking-[0.22em] uppercase mb-1.5'
              style={{ color: 'rgba(201,168,76,0.5)', fontFamily: FONTS.body }}
            >
              {webinar.category}
            </p>
            <p
              className='text-[0.84rem] font-light leading-snug mb-3'
              style={{ color: '#f0ede6', fontFamily: FONTS.display }}
            >
              {webinar.title}
            </p>
            <div className='flex flex-col gap-1.5'>
              <div className='flex items-center gap-2'>
                <Clock
                  size={9}
                  style={{ color: 'rgba(201,168,76,0.45)', flexShrink: 0 }}
                />
                <span
                  className='text-[0.54rem]'
                  style={{ color: 'rgba(240,237,230,0.38)', fontFamily: FONTS.body }}
                >
                  {webinar.date} &middot; {webinar.duration}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Users
                  size={9}
                  style={{ color: 'rgba(201,168,76,0.45)', flexShrink: 0 }}
                />
                <span
                  className='text-[0.54rem]'
                  style={{ color: 'rgba(240,237,230,0.38)', fontFamily: FONTS.body }}
                >
                  {webinar.registrations?.toLocaleString()} professionals registered
                </span>
              </div>
            </div>
          </div>

          {/* Zoom link row */}
          <div
            className='rounded-xl p-3.5'
            style={{
              background: 'rgba(0,212,255,0.03)',
              border: '1px solid rgba(0,212,255,0.1)',
            }}
          >
            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center gap-1.5'>
                <Video size={10} style={{ color: '#00d4ff' }} />
                <span
                  className='text-[0.46rem] tracking-[0.18em] uppercase'
                  style={{ color: 'rgba(0,212,255,0.55)', fontFamily: FONTS.body }}
                >
                  Join via {webinar.platform}
                </span>
              </div>
              <motion.button
                onClick={handleCopy}
                className='flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.44rem] tracking-[0.1em] uppercase'
                style={{
                  background: copied
                    ? 'rgba(0,229,160,0.08)'
                    : 'rgba(0,212,255,0.07)',
                  border: `1px solid ${copied ? 'rgba(0,229,160,0.22)' : 'rgba(0,212,255,0.16)'}`,
                  color: copied ? '#00e5a0' : '#00d4ff',
                  fontFamily: FONTS.body,
                }}
                whileTap={{ scale: 0.93 }}
              >
                <AnimatePresence mode='wait'>
                  {copied ? (
                    <motion.span
                      key='check'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='flex items-center gap-1'
                    >
                      <Check size={8} /> Copied!
                    </motion.span>
                  ) : (
                    <motion.span
                      key='copy'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='flex items-center gap-1'
                    >
                      <Copy size={8} /> Copy Link
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            <code
              className='text-[0.58rem] block truncate'
              style={{
                color: 'rgba(0,212,255,0.65)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              https://{zoomLink}
            </code>
          </div>

          {/* Footer: speaker avatars + calendar button */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='flex'>
                {webinar.speakers.slice(0, 3).map((s, i) => (
                  <div
                    key={i}
                    className='w-6 h-6 rounded-full flex items-center justify-center text-[0.42rem] font-semibold'
                    style={{
                      background: 'linear-gradient(135deg, #181d28, #12161f)',
                      border: '1.5px solid rgba(8,10,15,0.9)',
                      color: '#e8c97e',
                      marginLeft: i === 0 ? 0 : -6,
                      fontFamily: FONTS.display,
                    }}
                  >
                    {s.initials}
                  </div>
                ))}
              </div>
              <span
                className='text-[0.52rem] ml-1'
                style={{ color: 'rgba(240,237,230,0.28)', fontFamily: FONTS.body }}
              >
                {webinar.speakers[0]?.name}
              </span>
            </div>
            <button
              className='flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[0.46rem] tracking-[0.1em] uppercase'
              style={{
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.16)',
                color: 'rgba(201,168,76,0.65)',
                fontFamily: FONTS.body,
              }}
            >
              <Calendar size={8} />
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}

// ─── Live Badge ───────────────────────────────────────────────────────────────
function LiveBadge() {
  return (
    <FloatingCard
      delay={1.0}
      floatY={6}
      floatDuration={4.5}
      className='absolute -top-5 left-2 z-20'
    >
      <div
        className='flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-xl'
        style={{
          background: 'rgba(6,9,20,0.94)',
          border: '1px solid rgba(0,229,160,0.24)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <div
          className='w-6 h-6 rounded-full flex items-center justify-center shrink-0'
          style={{ background: 'rgba(0,229,160,0.1)' }}
        >
          <span className='relative flex h-[6px] w-[6px]'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5a0] opacity-55' />
            <span className='relative inline-flex rounded-full h-[6px] w-[6px] bg-[#00e5a0]' />
          </span>
        </div>
        <div>
          <p
            className='text-[0.58rem] font-medium leading-none mb-[3px]'
            style={{ color: '#00e5a0', fontFamily: FONTS.body, letterSpacing: '0.06em' }}
          >
            Session Live
          </p>
          <p
            className='text-[0.46rem] leading-none'
            style={{ color: 'rgba(240,237,230,0.28)', fontFamily: FONTS.body }}
          >
            214 watching now
          </p>
        </div>
      </div>
    </FloatingCard>
  );
}

// ─── Stat Badge ───────────────────────────────────────────────────────────────
function StatBadge({
  icon,
  value,
  label,
  color,
  className,
  delay,
  floatY = 7,
  floatDuration = 4,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: 'gold' | 'cyan';
  className?: string;
  delay: number;
  floatY?: number;
  floatDuration?: number;
}) {
  const c =
    color === 'gold'
      ? { bg: 'rgba(201,168,76,0.1)', border: 'rgba(201,168,76,0.2)', text: '#e8c97e' }
      : { bg: 'rgba(0,212,255,0.08)', border: 'rgba(0,212,255,0.2)', text: '#00d4ff' };

  return (
    <FloatingCard
      delay={delay}
      floatY={floatY}
      floatDuration={floatDuration}
      className={className}
    >
      <div
        className='flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl'
        style={{
          background: 'rgba(6,9,20,0.92)',
          border: `1px solid ${c.border}`,
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        }}
      >
        <div
          className='w-7 h-7 rounded-full flex items-center justify-center shrink-0'
          style={{ background: c.bg }}
        >
          <span style={{ color: c.text }}>{icon}</span>
        </div>
        <div>
          <p
            className='text-[0.9rem] font-bold tabular-nums leading-none'
            style={{
              color: c.text,
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.04em',
            }}
          >
            {value}
          </p>
          <p
            className='text-[0.44rem] tracking-[0.18em] uppercase mt-0.5'
            style={{ color: 'rgba(240,237,230,0.28)', fontFamily: FONTS.body }}
          >
            {label}
          </p>
        </div>
      </div>
    </FloatingCard>
  );
}

// ─── Countdown Strip ──────────────────────────────────────────────────────────
function CountdownStrip({
  nextWebinarDate,
  countdownLabel,
}: {
  nextWebinarDate: string;
  countdownLabel: string;
}) {
  return (
    <motion.div
      className='relative overflow-hidden'
      style={{
        background:
          'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(201,168,76,0.02) 100%)',
        border: '1px solid rgba(201,168,76,0.14)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.65, ease: EASE_OUT_EXPO }}
    >
      {/* Gold top rule */}
      <div
        className='absolute top-0 left-0 right-0 h-[1px]'
        style={{ background: 'linear-gradient(90deg, #c9a84c, transparent)' }}
      />
      {/* Corner reticles */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
        <span
          key={pos}
          className={cn('absolute w-2 h-2 pointer-events-none', {
            'top-0 left-0 border-t border-l': pos === 'tl',
            'top-0 right-0 border-t border-r': pos === 'tr',
            'bottom-0 left-0 border-b border-l': pos === 'bl',
            'bottom-0 right-0 border-b border-r': pos === 'br',
          })}
          style={{ borderColor: 'rgba(201,168,76,0.4)' }}
        />
      ))}
      <div className='px-4 py-3'>
        <Countdown
          targetDate={nextWebinarDate}
          variant='card'
          label={countdownLabel}
          showSeconds
        />
      </div>
    </motion.div>
  );
}

// ─── Main HeroRightPanel ──────────────────────────────────────────────────────
export function HeroRightPanel({
  webinars,
  nextWebinarDate,
  countdownLabel,
}: HeroRightPanelProps) {
  const featuredWebinar = webinars.find((w) => w.status === 'live') ?? webinars[0]!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO }}
      className={cn(
        'relative flex flex-col gap-4',
        'py-[70px] pl-14 lg:pl-[56px]',
        'border-l border-[rgba(201,168,76,0.14)]',
      )}
    >
      {/* Vertical "BROADCAST" rule */}
      <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(50%+1px)]'>
        <div
          className='flex flex-col items-center gap-[6px]'
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          <span className='w-px h-8 bg-gradient-to-t from-[rgba(201,168,76,0.3)] to-transparent' />
          <span
            className='text-[0.48rem] tracking-[0.45em] uppercase text-[rgba(201,168,76,0.25)]'
            style={{ fontFamily: FONTS.body }}
          >
            Broadcast
          </span>
          <span className='w-px h-8 bg-gradient-to-b from-[rgba(201,168,76,0.3)] to-transparent' />
        </div>
      </div>

      {/* Section label */}
      <motion.div
        className='flex items-center gap-2 mb-1'
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.65, ease: EASE_OUT_EXPO }}
      >
        <span
          className='text-[0.56rem] tracking-[0.35em] uppercase text-[rgba(201,168,76,0.5)]'
          style={{ fontFamily: FONTS.body }}
        >
          Live Intelligence
        </span>
        <div className='flex-1 h-px bg-gradient-to-r from-[rgba(201,168,76,0.2)] to-transparent' />
      </motion.div>

      {/* ── Main card + floating badges ──────────────────────────────────── */}
      {/* Extra horizontal padding so badges that overflow don't clip */}
      <div className='relative pt-7 pb-6 pr-2'>

        {/* Badge: Live Now — top-left of card */}
        <LiveBadge />

        {/* Badge: Professionals — top-right */}
        <StatBadge
          icon={<Users size={13} />}
          value='2,800+'
          label='Professionals'
          color='gold'
          className='absolute -top-3 right-0 z-20'
          delay={1.1}
          floatY={6}
          floatDuration={5.2}
        />

        {/* Badge: Countries — bottom-right */}
        <StatBadge
          icon={<Globe size={13} />}
          value='38'
          label='Countries'
          color='cyan'
          className='absolute bottom-2 -right-2 z-20'
          delay={1.25}
          floatY={8}
          floatDuration={4.5}
        />

        {/* Central email confirmation card */}
        <EmailConfirmationCard webinar={featuredWebinar} />
      </div>

      {/* ── Countdown ─────────────────────────────────────────────────────── */}
      <CountdownStrip
        nextWebinarDate={nextWebinarDate}
        countdownLabel={countdownLabel}
      />

      {/* Free access note */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: EASE_OUT_EXPO }}
        className='flex items-center gap-2 text-[0.62rem] tracking-[0.06em] text-[rgba(240,237,230,0.22)]'
        style={{ fontFamily: FONTS.body }}
      >
        <span className='text-[#c9a84c] text-[0.65rem]'>◈</span>
        All webinars are free — no account or password required.
      </motion.p>
    </motion.div>
  );
}

export default HeroRightPanel;
