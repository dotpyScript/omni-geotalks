'use client';

import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import type { Webinar } from '@/components/sections/webinerDiscovery/types';
import { BannerPlaceholder } from '@/components/sections/webinerDiscovery/BannerPlaceholder';
import { StatusBadge } from '@/components/sections/webinerDiscovery/StatusBadge';
import { CATEGORIES } from '@/components/sections/webinerDiscovery/data';

interface SessionCardProps {
  webinar: Webinar;
  index: number;
  onClick?: (id: number) => void;
}

export function SessionCard({ webinar, index, onClick }: SessionCardProps) {
  const catLabel =
    CATEGORIES.find((c) => c.id === webinar.category)?.label ??
    webinar.category;
  const isCompleted = webinar.status === 'completed';
  const isLive = webinar.status === 'live';

  return (
    <motion.article
      className='group relative overflow-hidden cursor-pointer flex flex-col border border-[rgba(201,168,76,0.14)] hover:border-[rgba(201,168,76,0.32)] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_12px_48px_rgba(201,168,76,0.14)]'
      style={{ background: 'linear-gradient(145deg, #0d1118, #12161f)' }}
      role='button'
      tabIndex={0}
      onClick={() => onClick?.(webinar.id)}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(webinar.id)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Top bar — appears on hover */}
      <div
        className='absolute top-0 left-0 right-0 h-[2px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
        style={{
          background:
            'linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.3), transparent)',
        }}
      />

      {/* ── Banner ────────────────────────────────────────────────────── */}
      <div className='relative overflow-hidden w-full pt-[52%] bg-[#181d28] flex-shrink-0'>
        <div className='absolute inset-0 transition-transform duration-[600ms] ease-in-out group-hover:scale-[1.05]'>
          <BannerPlaceholder index={webinar.banner} />
        </div>

        {/* Bottom gradient */}
        <div
          className='absolute inset-0 z-[1]'
          style={{
            background:
              'linear-gradient(180deg, transparent 35%, #0d1118 100%)',
          }}
        />

        <StatusBadge status={webinar.status} />

        {/* Category */}
        <div className='absolute bottom-3 left-4 z-[2]'>
          <span className='text-[0.56rem] tracking-[0.2em] uppercase px-[9px] py-0.5 bg-[rgba(8,10,15,0.8)] border border-[rgba(201,168,76,0.25)] text-[#e8c97e] backdrop-blur-sm'>
            {catLabel}
          </span>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className='flex flex-col flex-1 px-5 pt-5 pb-4'>
        {/* Date meta */}
        <div className='flex items-center gap-2 mb-3'>
          <span className='text-[#c9a84c] text-[0.65rem]'>
            {isCompleted ? '✓' : '◷'}
          </span>
          <span className='text-[0.64rem] tracking-[0.1em] text-[rgba(240,237,230,0.4)] uppercase'>
            {webinar.date} · {webinar.time}
          </span>
        </div>

        {/* Title */}
        <h3
          className='text-[1.1rem] font-light leading-[1.3] text-[#f0ede6] mb-3 group-hover:text-[#f5e6c0] transition-colors duration-250 line-clamp-2'
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {webinar.title}
        </h3>

        {/* Description */}
        <p className='text-[0.74rem] leading-[1.65] text-[rgba(240,237,230,0.3)] font-light line-clamp-2 mb-4 flex-1'>
          {webinar.description}
        </p>

        {/* Speaker + meta row */}
        <div className='flex items-center gap-3 pt-4 border-t border-[rgba(201,168,76,0.1)]'>
          {/* Avatar stack */}
          <div className='flex -space-x-1.5 shrink-0'>
            {webinar.speakers.slice(0, 2).map((s, i) => (
              <div
                key={i}
                className='w-7 h-7 rounded-full border-2 border-[#0d1118] bg-gradient-to-br from-[#181d28] to-[#12161f] flex items-center justify-center'
              >
                <span
                  className='text-[0.5rem] font-semibold text-[#e8c97e]'
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {s.initials}
                </span>
              </div>
            ))}
          </div>

          <div className='flex-1 min-w-0'>
            <p className='text-[0.64rem] text-[rgba(240,237,230,0.55)] truncate leading-tight'>
              {webinar.speakers[0]?.name}
            </p>
            {webinar.speakers.length > 1 && (
              <p className='text-[0.58rem] text-[rgba(240,237,230,0.28)]'>
                +{webinar.speakers.length - 1} more
              </p>
            )}
          </div>

          <div className='flex items-center gap-1.5 text-[0.62rem] text-[rgba(240,237,230,0.3)] shrink-0'>
            <Users size={10} className='text-[#c9a84c]' />
            {webinar.registrations.toLocaleString()}
          </div>
        </div>
      </div>

      {/* ── Footer CTA ────────────────────────────────────────────────── */}
      <div className='px-5 pb-5'>
        <button
          type='button'
          className={[
            'w-full py-2.5 text-[0.66rem] tracking-[0.18em] uppercase font-medium',
            'transition-all duration-[250ms] cursor-pointer border-none',
            "font-['DM_Sans',sans-serif]",
            isCompleted
              ? 'bg-transparent text-[#c9a84c] border border-[rgba(201,168,76,0.28)] hover:bg-[rgba(201,168,76,0.1)]'
              : [
                  'text-[#080a0f] bg-gradient-to-br from-[#c9a84c] to-[#e8c97e]',
                  'hover:from-[#e8c97e] hover:to-[#f5e6c0]',
                  'hover:shadow-[0_6px_20px_rgba(201,168,76,0.28)]',
                  'hover:-translate-y-px',
                ].join(' '),
          ].join(' ')}
          style={{
            clipPath: isCompleted
              ? undefined
              : 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(webinar.id);
          }}
        >
          {isLive
            ? 'Join Now →'
            : isCompleted
              ? '▶ Watch Recording'
              : 'Register Free →'}
        </button>
      </div>
    </motion.article>
  );
}
