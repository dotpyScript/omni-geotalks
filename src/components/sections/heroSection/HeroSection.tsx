// components/sections/HeroSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

// ─── Sub-components ───────────────────────────────────────────────────────────
import { Button } from '@/components/ui/Button';
import {
  EventCard,
  type EventCardProps,
} from '@/components/sections/heroSection/Card';
import {
  HeroStats,
  type StatItem,
} from '@/components/sections/heroSection/StatCounter';
import { Countdown } from '@/components/sections/heroSection/Countdown';
import {
  Marquee,
  IEGS_TICKER_ITEMS,
} from '@/components/sections/heroSection/Marquee';
import { cn, fadeUp, fadeLeft, staggerContainer, FONTS } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface HeroSectionProps {
  /** Override the default stats */
  stats?: StatItem[];
  /** Override featured webinar cards */
  webinars?: Omit<EventCardProps, 'onAction'>[];
  /** ISO string for the countdown target */
  nextWebinarDate?: string;
  /** Countdown label */
  countdownLabel?: string;
}

// ─── Particle canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0,
      H = 0,
      raf = 0;

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
      gold: boolean;
    };

    let particles: Particle[] = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.1 + 0.3,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      alpha: Math.random() * 0.45 + 0.08,
      gold: Math.random() > 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(201,168,76,${p.alpha})`
          : `rgba(0,212,255,${p.alpha * 0.5})`;
        ctx.fill();
      }

      // Connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i]!.x - particles[j]!.x;
          const dy = particles[i]!.y - particles[j]!.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(201,168,76,${0.032 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i]!.x, particles[i]!.y);
            ctx.lineTo(particles[j]!.x, particles[j]!.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className='absolute inset-0 w-full h-full pointer-events-none z-0'
      aria-hidden
    />
  );
}

// ─── Category chips ───────────────────────────────────────────────────────────
const CATEGORIES = [
  'GIS & Mapping',
  'Drone Surveys',
  'Agriculture',
  'Oil & Gas',
  'Remote Sensing',
] as const;

// ─── Default data ─────────────────────────────────────────────────────────────
const DEFAULT_STATS: StatItem[] = [
  { value: 2800, suffix: '+', label: 'Registered Professionals' },
  { value: 54, label: 'Sessions Delivered' },
  { value: 38, label: 'Countries Reached' },
];

const DEFAULT_WEBINARS: Omit<EventCardProps, 'onAction'>[] = [
  {
    status: 'live',
    category: 'GIS & Mapping',
    title: 'Advanced GIS for Urban Infrastructure Planning in Rivers State',
    date: 'Today · 10:00 AM WAT',
    duration: '90 min',
    platform: 'Zoom',
    speakers: [
      { initials: 'AK', name: 'Dr. A. Kalu' },
      { initials: 'SM', name: 'S. Musa' },
      { initials: 'RO', name: 'Engr. R. Okonkwo' },
    ],
    registrations: 214,
    meta: 'Free · No account required',
  },
  {
    status: 'published',
    category: 'Drone Surveys',
    title: 'UAV Pipeline Surveillance & Leak Detection Across the Niger Delta',
    date: 'Thu, 22 May 2025 · 2:00 PM WAT',
    duration: '75 min',
    platform: 'Google Meet',
    speakers: [
      { initials: 'RO', name: 'Engr. R. Okonkwo' },
      { initials: 'LB', name: 'L. Bello' },
    ],
    registrations: 187,
    meta: 'Free · No account required',
  },
  {
    status: 'published',
    category: 'Precision Agric',
    title: 'Satellite Crop Monitoring & Yield Analytics for West African Farms',
    date: 'Tue, 3 Jun 2025 · 11:00 AM WAT',
    duration: '60 min',
    platform: 'Zoom',
    speakers: [{ initials: 'FN', name: 'Dr. F. Nwosu' }],
    registrations: 143,
    meta: 'Free · No account required',
  },
];

// ─── Hero left column ─────────────────────────────────────────────────────────
function HeroLeft({ stats }: { stats: StatItem[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial='hidden'
      animate='visible'
      className='flex flex-col py-[70px] pr-14 lg:pr-[56px]'
    >
      {/* Eyebrow */}
      <motion.div
        variants={fadeUp}
        custom={0.1}
        className='flex items-center gap-3.5 mb-7'
      >
        <span className='w-8 h-px bg-gradient-to-r from-transparent to-[#c9a84c]' />
        <span className='text-[0.68rem] tracking-[0.35em] uppercase text-[#c9a84c]'>
          Geospatial Webinar Series · 2025
        </span>
      </motion.div>

      {/* Category chips */}
      <motion.div
        variants={fadeUp}
        custom={0.18}
        className='flex flex-wrap gap-2 mb-8'
      >
        {CATEGORIES.map((cat) => (
          <span
            key={cat}
            className={cn(
              'text-[0.58rem] tracking-[0.18em] uppercase',
              'px-2.5 py-1 border border-[rgba(201,168,76,0.16)]',
              'text-[rgba(240,237,230,0.35)] bg-[rgba(201,168,76,0.06)]',
              'transition-all duration-200 cursor-pointer',
              'hover:border-[rgba(201,168,76,0.4)] hover:text-[#e8c97e]',
            )}
          >
            {cat}
          </span>
        ))}
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={fadeUp}
        custom={0.28}
        className='text-[#f0ede6] leading-[1.06] tracking-[-0.01em] mb-6'
        style={{
          fontFamily: FONTS.display,
          fontSize: 'clamp(3rem, 5.2vw, 5.2rem)',
          fontWeight: 300,
        }}
      >
        Expert Knowledge
        <em className='block italic text-[#e8c97e]'>Across Every</em>
        <strong className='block font-semibold'>Geospatial Frontier.</strong>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={fadeUp}
        custom={0.4}
        className='text-[rgba(240,237,230,0.55)] font-light leading-[1.7] max-w-[460px] mb-10'
        style={{ fontSize: 'clamp(0.88rem, 1.4vw, 1.05rem)' }}
      >
        IEGS hosts free, expert-led webinars covering GIS, drone surveys,
        precision agriculture, oil &amp; gas intelligence, and remote sensing —
        built for geospatial professionals across Africa and beyond.
      </motion.p>

      {/* Actions */}
      <motion.div
        variants={fadeUp}
        custom={0.52}
        className='flex items-center gap-4 flex-wrap'
      >
        <Button variant='primary' size='lg' rightIcon={ArrowRight} clipped>
          Browse Webinars
        </Button>

        <Button variant='ghost' size='lg' leftIcon={Play} clipped={false}>
          Watch Recordings
        </Button>
      </motion.div>

      {/* Platform badges */}
      <motion.div
        variants={fadeUp}
        custom={0.62}
        className={cn(
          'flex items-center gap-2.5 flex-wrap',
          'mt-8 pt-7 border-t border-[rgba(201,168,76,0.14)]',
        )}
      >
        <span className='text-[0.6rem] tracking-[0.22em] uppercase text-[rgba(240,237,230,0.28)]'>
          Hosted via
        </span>
        {['Zoom', 'Google Meet', 'Zoho'].map((p) => (
          <span
            key={p}
            className={cn(
              'text-[0.58rem] tracking-[0.14em] uppercase',
              'px-2.5 py-1 border border-[rgba(0,212,255,0.2)]',
              'text-[#00d4ff] bg-[rgba(0,212,255,0.06)]',
            )}
          >
            {p}
          </span>
        ))}
      </motion.div>

      {/* Stats */}
      <HeroStats stats={stats} className='mt-0' />
    </motion.div>
  );
}

// ─── Hero right column ────────────────────────────────────────────────────────
function HeroRight({
  webinars,
  nextWebinarDate,
  countdownLabel,
}: {
  webinars: Omit<EventCardProps, 'onAction'>[];
  nextWebinarDate: string;
  countdownLabel: string;
}) {
  return (
    <motion.div
      variants={fadeLeft}
      custom={0.3}
      initial='hidden'
      animate='visible'
      className={cn(
        'flex flex-col gap-4 py-[70px] pl-14 lg:pl-[56px]',
        'border-l border-[rgba(201,168,76,0.14)]',
      )}
    >
      {/* Webinar cards */}
      {webinars.map((w, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.4 + i * 0.12,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <EventCard
            {...w}
            onAction={() => {
              // navigate to webinar detail page
              console.log('Navigate to webinar:', w.title);
            }}
          />
        </motion.div>
      ))}

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Countdown
          targetDate={nextWebinarDate}
          variant='card'
          label={countdownLabel}
          showSeconds
        />
      </motion.div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className='flex items-center gap-2 text-[0.62rem] tracking-[0.06em] text-[rgba(240,237,230,0.25)]'
      >
        <span className='text-[#c9a84c] text-[0.65rem]'>◈</span>
        All webinars are free. Registration takes under 60 seconds — no account
        or password required.
      </motion.p>
    </motion.div>
  );
}

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export function HeroSection({
  stats = DEFAULT_STATS,
  webinars = DEFAULT_WEBINARS,
  nextWebinarDate = '2025-05-22T13:00:00Z', // UTC — next published webinar
  countdownLabel = 'Next Session Begins In',
}: HeroSectionProps) {
  return (
    <section className='relative min-h-screen bg-[#080a0f] overflow-hidden flex flex-col'>
      {/* ── Background effects ── */}
      <ParticleCanvas />

      {/* Noise grain */}
      <div
        className='absolute inset-0 z-[1] pointer-events-none opacity-40'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
        aria-hidden
      />

      {/* Gold orbs */}
      <div
        className='absolute -top-36 -right-24 w-[560px] h-[560px] rounded-full bg-radial-gold pointer-events-none blur-[90px] opacity-100 z-0'
        style={{
          background:
            'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className='absolute bottom-16 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none blur-[90px] z-0'
        style={{
          background:
            'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* Gold horizontal rules */}
      <div
        className='absolute top-[86px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.18)] to-transparent pointer-events-none z-[1]'
        aria-hidden
      />
      <div
        className='absolute bottom-[110px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.18)] to-transparent pointer-events-none z-[1]'
        aria-hidden
      />

      {/* ── Content ── */}
      <div className='relative z-[5] flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 px-6 lg:px-[60px]'>
        <HeroLeft stats={stats} />
        <HeroRight
          webinars={webinars}
          nextWebinarDate={nextWebinarDate}
          countdownLabel={countdownLabel}
        />
      </div>

      {/* ── Ticker ── */}
      <div className='relative z-[5]'>
        <Marquee
          items={IEGS_TICKER_ITEMS}
          variant='ticker'
          speed={34}
          separator='◆'
          pauseOnHover
        />
      </div>
    </section>
  );
}

// Default export for page-level use
export default HeroSection;
