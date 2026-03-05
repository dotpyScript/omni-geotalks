'use client';

import { FOOTER_SOCIALS } from '@/components/sections/CTA/constants';

export default function FooterBrandCol() {
  return (
    /*
     * .footer-col (first) — padding-left 60px desktop, 24px mobile
     * border-right on all cols except last
     */
    <div
      className={[
        'pl-15 pr-10 py-16',
        'border-r border-(--border)',
        /* responsive */
        'max-[1100px]:border-r-0',
        'max-md:border-r-0 max-md:border-b max-md:border-(--border) max-md:px-6 max-md:py-10',
      ].join(' ')}
    >
      {/* Logo (.footer-brand__logo) */}
      <a
        href='#'
        className='font-bebas text-[1.8rem] tracking-[0.18em] text-(--gold-light) no-underline block mb-1.5'
      >
        IEGS
      </a>

      {/* Tagline (.footer-brand__tagline) */}
      <div className='text-[0.6rem] tracking-[0.28em] uppercase text-(--ivory-muted) mb-6'>
        Indepth Earth Geospatial Services
      </div>

      {/* Description (.footer-brand__desc) */}
      <p className='text-[0.78rem] leading-[1.7] text-(--ivory-muted) font-light mb-7 max-w-70'>
        Rivers State, Nigeria&apos;s leading geospatial services firm —
        delivering precision mapping, drone surveys, and expert-led knowledge
        transfer to professionals across Africa and beyond.
      </p>

      {/* Social icons (.footer-socials) */}
      <div className='flex gap-2.5 mb-8'>
        {FOOTER_SOCIALS.map((s) => (
          /*
           * .footer-social-btn — clip-corner-sm from globals.css
           * hover: gold border, gold color, gold-dim bg, glow shadow
           */
          <a
            key={s.label}
            href={s.href}
            title={s.label}
            aria-label={s.label}
            className={[
              'w-9 h-9',
              'flex items-center justify-center',
              'bg-(--obsidian-3) border border-(--border)',
              'text-(--ivory-muted) text-[0.75rem]',
              'no-underline cursor-pointer',
              'clip-corner-sm',
              'transition-all duration-250',
              'hover:border-(--gold) hover:text-(--gold) hover:bg-(--gold-dim)',
              'hover:shadow-[0_0_12px_var(--gold-dim)]',
            ].join(' ')}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Cert badge (.footer-cert) */}
      <div
        className={[
          'inline-flex items-center gap-2.5',
          'text-[0.62rem] tracking-[0.12em] text-(--ivory-muted)',
          'border border-(--border) px-3.5 py-2.5',
          'bg-(--gold-dim)',
        ].join(' ')}
      >
        <span className='text-(--gold) text-[1rem]'>◈</span>
        Registered with NiGOS · ISO 19100 Compliant
      </div>
    </div>
  );
}
