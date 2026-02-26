'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Users, Clock, ArrowRight } from 'lucide-react';
import type { Webinar } from '@/components/sections/webinerDiscovery/types';
import { BannerPlaceholder } from '@/components/sections/webinerDiscovery/BannerPlaceholder';
import { CATEGORIES } from '@/components/sections/webinerDiscovery/data';

interface FeaturedSessionCardProps {
  webinar: Webinar;
  onClick?: (id: number) => void;
}

export function FeaturedSessionCard({
  webinar,
  onClick,
}: FeaturedSessionCardProps) {
  const [hovered, setHovered] = useState(false);
  const catLabel =
    CATEGORIES.find((c) => c.id === webinar.category)?.label ??
    webinar.category;
  const isLive = webinar.status === 'live';
  const isCompleted = webinar.status === 'completed';

  return (
    <motion.article
      className='relative overflow-hidden cursor-pointer group'
      onClick={() => onClick?.(webinar.id)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(webinar.id)}
    >
      {/* ── Outer glow ──────────────────────────────────────────────────── */}
      <motion.div
        className='absolute -inset-6 pointer-events-none'
        animate={{ opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.5 }}
        style={{
          background: isLive
            ? 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,229,160,0.12) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(201,168,76,0.1) 0%, transparent 70%)',
        }}
      />

      {/* ── Main card ───────────────────────────────────────────────────── */}
      <div
        className={[
          'relative border transition-all duration-400',
          'grid grid-cols-[1fr_1fr] max-[900px]:grid-cols-1',
          isLive
            ? 'border-[rgba(0,229,160,0.25)] group-hover:border-[rgba(0,229,160,0.45)]'
            : 'border-[rgba(201,168,76,0.18)] group-hover:border-[rgba(201,168,76,0.36)]',
        ].join(' ')}
        style={{
          background:
            'linear-gradient(145deg, #0d1118 0%, #12161f 60%, #181d28 100%)',
        }}
      >
        {/* Top accent rule */}
        <div
          className='absolute top-0 left-0 right-0 h-[2px] z-10'
          style={{
            background: isLive
              ? 'linear-gradient(90deg, #00e5a0 0%, rgba(0,229,160,0.5) 50%, transparent 100%)'
              : 'linear-gradient(90deg, #c9a84c 0%, rgba(201,168,76,0.5) 50%, transparent 100%)',
          }}
        />

        {/* Scan-line overlay */}
        <div
          className='absolute inset-0 pointer-events-none z-[1] opacity-30'
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 6px)',
          }}
        />

        {/* Corner reticles */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
          <span
            key={pos}
            className={[
              'absolute w-4 h-4 pointer-events-none z-10',
              'border-[rgba(201,168,76,0.5)]',
              pos === 'tl' && 'top-0 left-0 border-t border-l',
              pos === 'tr' && 'top-0 right-0 border-t border-r',
              pos === 'bl' && 'bottom-0 left-0 border-b border-l',
              pos === 'br' && 'bottom-0 right-0 border-b border-r',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        ))}

        {/* ── LEFT: Banner ────────────────────────────────────────────── */}
        <div className='relative overflow-hidden min-h-[320px] max-[900px]:min-h-[220px]'>
          {/* Banner artwork */}
          <motion.div
            className='absolute inset-0'
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <BannerPlaceholder index={webinar.banner} />
          </motion.div>

          {/* Right-side fade to content */}
          <div
            className='absolute inset-0 z-[2] max-[900px]:hidden'
            style={{
              background:
                'linear-gradient(90deg, transparent 40%, #0d1118 95%)',
            }}
          />
          {/* Bottom fade for mobile */}
          <div
            className='absolute inset-0 z-[2] hidden max-[900px]:block'
            style={{
              background:
                'linear-gradient(180deg, transparent 50%, #0d1118 100%)',
            }}
          />

          {/* Status badge */}
          <div className='absolute top-4 left-4 z-[3]'>
            {isLive ? (
              <div className='flex items-center gap-2 px-3 py-1.5 border border-[rgba(0,229,160,0.35)] bg-[rgba(0,229,160,0.1)]'>
                <span className='relative flex h-[6px] w-[6px]'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5a0] opacity-75' />
                  <span className='relative inline-flex rounded-full h-[6px] w-[6px] bg-[#00e5a0]' />
                </span>
                <span className='text-[0.58rem] tracking-[0.3em] uppercase text-[#00e5a0]'>
                  Live Now
                </span>
              </div>
            ) : isCompleted ? (
              <div className='flex items-center gap-2 px-3 py-1.5 border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.1)]'>
                <span className='text-[0.58rem] tracking-[0.3em] uppercase text-[#c9a84c]'>
                  Recording
                </span>
              </div>
            ) : (
              <div className='flex items-center gap-2 px-3 py-1.5 border border-[rgba(0,212,255,0.28)] bg-[rgba(0,212,255,0.08)]'>
                <span className='relative flex h-[5px] w-[5px]'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-60' />
                  <span className='relative inline-flex rounded-full h-[5px] w-[5px] bg-[#00d4ff]' />
                </span>
                <span className='text-[0.58rem] tracking-[0.3em] uppercase text-[#00d4ff]'>
                  Upcoming
                </span>
              </div>
            )}
          </div>

          {/* Category tag */}
          <div className='absolute bottom-4 left-4 z-[3]'>
            <span className='text-[0.58rem] tracking-[0.2em] uppercase px-[10px] py-1 bg-[rgba(8,10,15,0.8)] border border-[rgba(201,168,76,0.28)] text-[#e8c97e] backdrop-blur-sm'>
              {catLabel}
            </span>
          </div>
        </div>

        {/* ── RIGHT: Content ──────────────────────────────────────────── */}
        <div className='relative z-[3] flex flex-col justify-between p-8 max-[900px]:pt-6'>
          {/* Featured label */}
          <div>
            <div className='flex items-center gap-2.5 mb-6'>
              <span className='w-5 h-px bg-gradient-to-r from-transparent to-[#c9a84c]' />
              <span className='text-[0.58rem] tracking-[0.4em] uppercase text-[#c9a84c]'>
                Featured Session
              </span>
            </div>

            {/* Title */}
            <h3
              className='text-[clamp(1.45rem,2.4vw,2rem)] font-light leading-[1.22] text-[#f0ede6] mb-5 transition-colors duration-300 group-hover:text-[#f5e6c0]'
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {webinar.title}
            </h3>

            {/* Description */}
            <p className='text-[0.8rem] leading-[1.7] text-[rgba(240,237,230,0.42)] font-light mb-7 line-clamp-3'>
              {webinar.description}
            </p>

            {/* Meta */}
            <div className='flex flex-col gap-2.5 mb-7'>
              <div className='flex items-center gap-2 text-[0.7rem] text-[rgba(240,237,230,0.45)]'>
                <Clock size={12} className='text-[#c9a84c] shrink-0' />
                {webinar.date} · {webinar.time} · {webinar.duration}
              </div>
              <div className='flex items-center gap-2 text-[0.7rem] text-[rgba(240,237,230,0.45)]'>
                <Users size={12} className='text-[#c9a84c] shrink-0' />
                {webinar.registrations.toLocaleString()} registered
              </div>
            </div>

            {/* Speakers */}
            <div className='flex items-center gap-3 mb-8 pb-7 border-b border-[rgba(201,168,76,0.1)]'>
              <div className='flex -space-x-2'>
                {webinar.speakers.slice(0, 3).map((s, i) => (
                  <div
                    key={i}
                    className='w-9 h-9 rounded-full border-2 border-[#0d1118] bg-gradient-to-br from-[#181d28] to-[#12161f] flex items-center justify-center shrink-0'
                  >
                    <span
                      className='text-[0.55rem] font-semibold text-[#e8c97e]'
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {s.initials}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className='text-[0.7rem] text-[rgba(240,237,230,0.6)]'>
                  {webinar.speakers[0]?.name}
                </p>
                {webinar.speakers.length > 1 && (
                  <p className='text-[0.62rem] text-[rgba(240,237,230,0.28)]'>
                    +{webinar.speakers.length - 1} more speaker
                    {webinar.speakers.length > 2 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            className='flex items-center justify-between px-6 py-4 w-full text-left transition-all duration-300 relative overflow-hidden'
            style={{
              background: isLive
                ? 'linear-gradient(135deg, #00e5a0, #00c882)'
                : 'linear-gradient(135deg, #c9a84c, #e8c97e)',
              clipPath:
                'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              color: isLive ? '#001a10' : '#080a0f',
              fontFamily: "'DM Sans', sans-serif",
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(webinar.id);
            }}
          >
            {/* Shimmer */}
            <motion.span
              className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 pointer-events-none'
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            />
            <span className='relative flex items-center gap-2.5 text-[0.75rem] tracking-[0.2em] uppercase font-medium'>
              {isLive ? (
                <>
                  <Wifi size={14} /> Join Live Session
                </>
              ) : isCompleted ? (
                <>▶ Watch Recording</>
              ) : (
                <> Register Free</>
              )}
            </span>
            <ArrowRight size={15} className='relative' />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
