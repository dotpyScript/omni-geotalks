// components/sections/HeroSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, MapPin } from 'lucide-react';

// ─── Sub-components ───────────────────────────────────────────────────────────
import { Button } from '@/components/ui/Button';
import {
  Marquee,
  IEGS_TICKER_ITEMS,
} from '@/components/sections/heroSection/Marquee';
import { cn, fadeUp, staggerContainer } from '@/lib/utils';
import Link from 'next/link';

// ─── Particle canvas (light-mode aware) ──────────────────────────────────────
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
      const isLight =
        document.documentElement.getAttribute('data-theme') === 'light';
      const goldRgb = isLight ? '168,117,30' : '201,168,76';
      const cyanRgb = isLight ? '0,119,170' : '0,212,255';

      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(${goldRgb},${p.alpha})`
          : `rgba(${cyanRgb},${p.alpha * 0.5})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i]!.x - particles[j]!.x;
          const dy = particles[i]!.y - particles[j]!.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${goldRgb},${0.032 * (1 - d / 90)})`;
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

// ─── Reticle corner marks ─────────────────────────────────────────────────────
function ReticleCorners({ opacity = 0.35 }: { opacity?: number }) {
  const base = 'absolute w-5 h-5 pointer-events-none';
  const s = { opacity };
  return (
    <>
      <span
        className={`${base} -top-px -left-px`}
        style={{
          ...s,
          borderTop: '1px solid var(--gold)',
          borderLeft: '1px solid var(--gold)',
        }}
      />
      <span
        className={`${base} -top-px -right-px`}
        style={{
          ...s,
          borderTop: '1px solid var(--gold)',
          borderRight: '1px solid var(--gold)',
        }}
      />
      <span
        className={`${base} -bottom-px -left-px`}
        style={{
          ...s,
          borderBottom: '1px solid var(--gold)',
          borderLeft: '1px solid var(--gold)',
        }}
      />
      <span
        className={`${base} -bottom-px -right-px`}
        style={{
          ...s,
          borderBottom: '1px solid var(--gold)',
          borderRight: '1px solid var(--gold)',
        }}
      />
    </>
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

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      className='relative min-h-screen overflow-hidden flex flex-col'
      style={{ background: 'var(--obsidian)', color: 'var(--ivory)' }}
    >
      {/* ── Background effects ─────────────────────────────────────────── */}
      <ParticleCanvas />

      {/* Blueprint grid */}
      <div
        className='absolute inset-0 z-0 pointer-events-none bg-grid'
        aria-hidden
      />

      {/* Noise grain */}
      <div
        className='absolute inset-0 z-1 pointer-events-none opacity-35'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
        aria-hidden
      />

      {/* Gold orb — centered top */}
      <div
        className='absolute -top-48 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none blur-[120px] z-0'
        style={{
          background:
            'radial-gradient(ellipse, var(--gold-glow) 0%, transparent 65%)',
        }}
        aria-hidden
      />
      {/* Cyan orb — bottom left */}
      <div
        className='absolute bottom-16 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none blur-[90px] z-0'
        style={{
          background:
            'radial-gradient(circle, var(--cyan-dim) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* Ghost IEGS watermark */}
      <div
        className='absolute inset-0 flex items-center justify-center pointer-events-none z-1 select-none'
        aria-hidden
      >
        <span
          className='font-bebas tracking-[0.08em] leading-none whitespace-nowrap'
          style={{
            fontSize: 'clamp(10rem,26vw,22rem)',
            color: 'color-mix(in srgb, var(--gold) 2.5%, transparent)',
          }}
        >
          IEGS
        </span>
      </div>

      {/* Animated scan line */}
      <motion.div
        className='absolute inset-x-0 h-px pointer-events-none z-2'
        style={{
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, var(--gold) 18%, transparent), transparent)',
        }}
        animate={{ top: ['-1%', '101%'] }}
        transition={{
          duration: 14,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 5,
        }}
        aria-hidden
      />

      {/* Horizontal rules */}
      <div
        className='absolute top-[86px] left-0 right-0 h-px pointer-events-none z-2'
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--border), transparent)',
        }}
        aria-hidden
      />
      <div
        className='absolute bottom-14 left-0 right-0 h-px pointer-events-none z-2'
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--border), transparent)',
        }}
        aria-hidden
      />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        animate='visible'
        className='relative z-5 flex-1 flex flex-col items-center justify-center text-center px-6 lg:px-15 py-32'
      >
        {/* Location badge */}
        <motion.div
          variants={fadeUp}
          custom={0.0}
          className='flex items-center gap-1.5 mb-6 px-3 py-1.5 border border-(--border) bg-(--gold-dim)'
        >
          <MapPin size={10} style={{ color: 'var(--gold)' }} />
          <span className='text-[0.52rem] tracking-[0.3em] uppercase text-(--ivory-muted)'>
            Port Harcourt · Rivers State · Nigeria
          </span>
        </motion.div>

        {/* Eyebrow — double ruled */}
        <motion.div
          variants={fadeUp}
          custom={0.08}
          className='flex items-center gap-4 mb-10 w-full max-w-lg'
        >
          <span
            className='flex-1 h-px'
            style={{
              background: 'linear-gradient(90deg, transparent, var(--gold))',
            }}
          />
          <span className='text-[0.6rem] tracking-[0.38em] uppercase shrink-0 text-(--gold)'>
            Geospatial Webinar Series · 2025
          </span>
          <span
            className='flex-1 h-px'
            style={{
              background: 'linear-gradient(90deg, var(--gold), transparent)',
            }}
          />
        </motion.div>

        {/* Headline — with reticle corners */}
        <motion.div
          variants={fadeUp}
          custom={0.18}
          className='relative px-8 py-4 mb-5'
        >
          <ReticleCorners opacity={0.32} />
          <h1
            className='font-cormorant leading-[1.0] tracking-[-0.015em]'
            style={{
              fontSize: 'clamp(3.6rem, 8vw, 8rem)',
              fontWeight: 300,
              color: 'var(--ivory)',
            }}
          >
            Expert Knowledge
            <em className='block italic' style={{ color: 'var(--gold-light)' }}>
              Across Every
            </em>
            <strong className='block font-semibold'>
              Geospatial Frontier.
            </strong>
          </h1>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          variants={fadeUp}
          custom={0.26}
          className='flex items-center justify-center gap-3 mb-7 w-full max-w-xs'
        >
          <span
            className='flex-1 h-px'
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--gold-light))',
            }}
          />
          <span className='text-[0.55rem] text-(--gold)'>◆</span>
          <span
            className='flex-1 h-px'
            style={{
              background:
                'linear-gradient(90deg, var(--gold-light), transparent)',
            }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          custom={0.34}
          className='font-light leading-[1.75] max-w-[600px] mb-8 text-(--ivory-dim)'
          style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.08rem)' }}
        >
          IEGS hosts free, expert-led webinars covering GIS, drone surveys,
          precision agriculture, oil &amp; gas intelligence, and remote sensing
          — built for geospatial professionals across Africa and beyond.
        </motion.p>

        {/* Category chips */}
        <motion.div
          variants={fadeUp}
          custom={0.4}
          className='flex flex-wrap justify-center gap-2 mb-10'
        >
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className={cn(
                'text-[0.58rem] tracking-[0.18em] uppercase',
                'px-2.5 py-1 border border-(--border)',
                'transition-all duration-200 cursor-pointer',
                'hover:border-(--border-mid) hover:text-(--gold-light)',
              )}
              style={{
                color: 'var(--ivory-muted)',
                background: 'var(--gold-dim)',
              }}
            >
              {cat}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          custom={0.48}
          className='flex items-center gap-4 flex-wrap justify-center mb-6'
        >
          <Link href='/webinars' passHref>
            <Button variant='primary' size='lg' rightIcon={ArrowRight} clipped>
              Browse Webinars
            </Button>
          </Link>
          <Link href='/webinars' passHref>
            <Button variant='ghost' size='lg' leftIcon={Play} clipped={false}>
              Watch Recordings
            </Button>
          </Link>
        </motion.div>

        {/* Platform badges */}
        <motion.div
          variants={fadeUp}
          custom={0.54}
          className='flex items-center justify-center gap-2.5 flex-wrap'
        >
          <span className='text-[0.6rem] tracking-[0.22em] uppercase text-(--ivory-muted)'>
            Hosted via
          </span>
          {(['Zoom', 'Google Meet', 'Zoho'] as const).map((p) => (
            <span
              key={p}
              className='text-[0.58rem] tracking-[0.14em] uppercase px-2.5 py-1 border'
              style={{
                borderColor: 'var(--cyan-dim)',
                color: 'var(--cyan)',
                background: 'var(--cyan-dim)',
              }}
            >
              {p}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Ticker ─────────────────────────────────────────────────────── */}
      <div className='relative z-5'>
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

export default HeroSection;
