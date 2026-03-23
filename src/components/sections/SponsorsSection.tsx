'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ─── Sponsor data — replace src with real logo paths ─────────────────────────
const SPONSORS = [
  { id: 1,  name: 'Esri',              tier: 'Platinum', abbr: 'ESRI',  tagline: 'GIS Software Leader'         },
  { id: 2,  name: 'Trimble',           tier: 'Platinum', abbr: 'TRBL',  tagline: 'Positioning Technology'      },
  { id: 3,  name: 'Hexagon AB',        tier: 'Gold',     abbr: 'HXG',   tagline: 'Spatial Intelligence'        },
  { id: 4,  name: 'Leica Geosystems',  tier: 'Gold',     abbr: 'LCA',   tagline: 'Precision Measurement'       },
  { id: 5,  name: 'DJI Enterprise',    tier: 'Gold',     abbr: 'DJI',   tagline: 'Drone & Aerial Solutions'    },
  { id: 6,  name: 'Planet Labs',       tier: 'Silver',   abbr: 'PLT',   tagline: 'Satellite Imagery'           },
  { id: 7,  name: 'Maxar',             tier: 'Silver',   abbr: 'MXR',   tagline: 'Earth Intelligence'          },
  { id: 8,  name: 'Bentley Systems',   tier: 'Silver',   abbr: 'BNLY',  tagline: 'Infrastructure Engineering'  },
  { id: 9,  name: 'Safe Software',     tier: 'Bronze',   abbr: 'SAFE',  tagline: 'Data Integration'            },
  { id: 10, name: 'Mapbox',            tier: 'Bronze',   abbr: 'MPBX',  tagline: 'Mapping Platform'            },
  { id: 11, name: 'HERE Technologies', tier: 'Bronze',   abbr: 'HERE',  tagline: 'Location Data & Services'    },
  { id: 12, name: 'SpatialAI',         tier: 'Bronze',   abbr: 'SAI',   tagline: 'AI-Powered Geospatial'       },
] as const;

const TIER_CONFIG = {
  Platinum: { color: '#a7bcd7', glow: 'rgba(167,188,215,0.18)', label: 'PLATINUM SPONSOR' },
  Gold:     { color: '#c9a850', glow: 'rgba(201,168,80,0.15)',  label: 'GOLD SPONSOR'     },
  Silver:   { color: '#9abdab', glow: 'rgba(154,189,171,0.14)', label: 'SILVER SPONSOR'   },
  Bronze:   { color: '#7d6a58', glow: 'rgba(125,106,88,0.12)', label: 'BRONZE SPONSOR'   },
} as const;

// ─── Individual sponsor card with 3D tilt ────────────────────────────────────
function SponsorCard({
  sponsor,
  index,
}: {
  sponsor: (typeof SPONSORS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 24 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const tier = TIER_CONFIG[sponsor.tier];

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.055 }}
      className='relative cursor-pointer group'
    >
      {/* Card body */}
      <div
        className='relative flex flex-col items-center justify-center gap-3 p-6 transition-all duration-300'
        style={{
          background: hovered
            ? `linear-gradient(145deg, var(--obsidian-3), var(--obsidian-4))`
            : `var(--obsidian-3)`,
          border: `1px solid ${hovered ? tier.color + '55' : 'var(--border)'}`,
          boxShadow: hovered
            ? `0 0 32px ${tier.glow}, 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 ${tier.color}22`
            : '0 4px 20px rgba(0,0,0,0.3)',
          transform: 'translateZ(0)',
          minHeight: '120px',
        }}
      >
        {/* Top-left corner reticle */}
        <span
          className='absolute top-0 left-0 w-3 h-3 pointer-events-none transition-opacity duration-300'
          style={{
            borderTop: `1px solid ${tier.color}`,
            borderLeft: `1px solid ${tier.color}`,
            opacity: hovered ? 0.9 : 0.3,
          }}
        />
        {/* Bottom-right corner reticle */}
        <span
          className='absolute bottom-0 right-0 w-3 h-3 pointer-events-none transition-opacity duration-300'
          style={{
            borderBottom: `1px solid ${tier.color}`,
            borderRight: `1px solid ${tier.color}`,
            opacity: hovered ? 0.9 : 0.3,
          }}
        />

        {/* Tier badge — floats above (translateZ) */}
        <div
          className='absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 transition-opacity duration-300'
          style={{
            background: 'var(--obsidian-2)',
            border: `1px solid ${tier.color}44`,
            opacity: hovered ? 1 : 0,
            transform: 'translateX(-50%) translateZ(20px)',
          }}
        >
          <span
            className='text-[0.42rem] tracking-[0.35em] uppercase whitespace-nowrap'
            style={{ color: tier.color }}
          >
            {tier.label}
          </span>
        </div>

        {/* Logo placeholder — abbr monogram */}
        <div
          className='flex items-center justify-center transition-all duration-300'
          style={{
            width: 52,
            height: 52,
            background: hovered ? `${tier.glow}` : 'var(--obsidian-4)',
            border: `1px solid ${hovered ? tier.color + '44' : 'var(--border)'}`,
            transform: hovered ? 'translateZ(24px)' : 'translateZ(0px)',
            transition: 'transform 0.3s ease, background 0.3s ease, border 0.3s ease',
          }}
        >
          <span
            className='font-bebas tracking-widest'
            style={{
              fontSize: '0.85rem',
              color: hovered ? tier.color : 'var(--ivory-muted)',
              fontFamily: 'var(--font-bebas)',
              letterSpacing: '0.12em',
            }}
          >
            {sponsor.abbr}
          </span>
        </div>

        {/* Name + tagline */}
        <div
          className='text-center transition-all duration-300'
          style={{
            transform: hovered ? 'translateZ(14px)' : 'translateZ(0px)',
            transition: 'transform 0.3s ease',
          }}
        >
          <p
            className='text-[0.72rem] font-medium leading-tight mb-0.5'
            style={{
              color: hovered ? 'var(--ivory)' : 'var(--ivory-dim)',
              fontFamily: 'var(--font-dm)',
            }}
          >
            {sponsor.name}
          </p>
          <p
            className='text-[0.55rem] tracking-[0.15em] uppercase transition-opacity duration-300'
            style={{
              color: tier.color,
              opacity: hovered ? 0.9 : 0.45,
            }}
          >
            {sponsor.tagline}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main SponsorsSection ─────────────────────────────────────────────────────
export function SponsorsSection() {
  return (
    <section
      className='relative overflow-hidden py-28'
      style={{ background: 'var(--obsidian)' }}
    >
      {/* ── Deep background: ghost "SPONSORS" word ───────────────────── */}
      <div
        className='absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0'
        aria-hidden
      >
        <span
          className='font-bebas leading-none whitespace-nowrap'
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(7rem, 22vw, 18rem)',
            letterSpacing: '0.06em',
            color: 'color-mix(in srgb, var(--navy) 4%, transparent)',
            userSelect: 'none',
          }}
        >
          SPONSORS
        </span>
      </div>

      {/* Radial depth gradient — creates the cinematic "tunnel" depth */}
      <div
        className='absolute inset-0 pointer-events-none z-1'
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, var(--obsidian) 85%)',
        }}
        aria-hidden
      />

      {/* Top/bottom fade */}
      <div
        className='absolute inset-x-0 top-0 h-24 pointer-events-none z-2'
        style={{ background: 'linear-gradient(to bottom, var(--obsidian), transparent)' }}
        aria-hidden
      />
      <div
        className='absolute inset-x-0 bottom-0 h-24 pointer-events-none z-2'
        style={{ background: 'linear-gradient(to top, var(--obsidian), transparent)' }}
        aria-hidden
      />

      {/* Navy orb top-right */}
      <div
        className='absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none z-1'
        style={{ background: 'radial-gradient(circle, var(--navy-glow) 0%, transparent 70%)' }}
        aria-hidden
      />
      {/* Teal orb bottom-left */}
      <div
        className='absolute bottom-0 -left-16 w-[300px] h-[300px] rounded-full blur-[90px] pointer-events-none z-1'
        style={{ background: 'radial-gradient(circle, var(--teal-glow) 0%, transparent 70%)' }}
        aria-hidden
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-16'>

        {/* Header */}
        <motion.div
          className='flex flex-col items-center text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Eyebrow */}
          <div className='eyebrow mb-4'>
            <span className='eyebrow-text'>Knowledge Partners</span>
          </div>

          <h2
            className='leading-[1.05] tracking-tight mb-4'
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 300,
              color: 'var(--ivory)',
            }}
          >
            The Organisations{' '}
            <em className='italic' style={{ color: 'var(--navy-light)' }}>
              Powering
            </em>{' '}
            <br className='hidden sm:block' />
            Africa&rsquo;s Geospatial Future.
          </h2>

          <div
            className='flex items-center gap-3 mb-5 w-full max-w-xs'
          >
            <span className='flex-1 h-px' style={{ background: 'linear-gradient(90deg, transparent, var(--border-mid))' }} />
            <span style={{ color: 'var(--navy-mid)', fontSize: '0.5rem' }}>◆</span>
            <span className='flex-1 h-px' style={{ background: 'linear-gradient(90deg, var(--border-mid), transparent)' }} />
          </div>

          <p
            className='max-w-[520px] font-light leading-[1.8] text-[0.85rem]'
            style={{ color: 'var(--ivory-dim)' }}
          >
            These industry leaders fund the sessions, enable the technology,
            and help IEGS remain free for every geospatial professional across
            Africa and beyond.
          </p>
        </motion.div>

        {/* ── Sponsor grid ───────────────────────────────────────────── */}
        {/* Perspective wrapper for the whole grid */}
        <div style={{ perspective: '1200px' }}>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
            {SPONSORS.map((sponsor, i) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} index={i} />
            ))}
          </div>
        </div>

        {/* Become a sponsor CTA */}
        <motion.div
          className='flex flex-col items-center mt-16 gap-4'
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.2 }}
        >
          <div
            className='h-px w-24'
            style={{ background: 'linear-gradient(90deg, transparent, var(--border-mid), transparent)' }}
          />
          <p
            className='text-[0.62rem] tracking-[0.25em] uppercase'
            style={{ color: 'var(--ivory-muted)' }}
          >
            Interested in sponsoring a session?
          </p>
          <a
            href='mailto:webinars@iegs.com.ng'
            className='group flex items-center gap-2.5 transition-all duration-200'
            style={{ textDecoration: 'none' }}
          >
            <span
              className='text-[0.62rem] tracking-[0.22em] uppercase px-5 py-2.5 transition-all duration-200 group-hover:border-opacity-80'
              style={{
                border: '1px solid var(--border-mid)',
                background: 'var(--navy-dim)',
                color: 'var(--navy-light)',
                fontFamily: 'var(--font-dm)',
              }}
            >
              Become a Sponsor
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default SponsorsSection;
