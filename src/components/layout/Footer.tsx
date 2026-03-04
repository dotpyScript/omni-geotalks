'use client';

import FooterBrandCol from './FooterBrandCol';
import FooterNavCol from './FooterNavCol';
import FooterMidNewsletter from './FooterMidNewsletter';
import FooterBottom from './FooterBottom';
import {
  WEBINAR_LINKS,
  COMPANY_LINKS,
  CONTACT_ITEMS,
} from '@/components/sections/CTA/constants';

export default function Footer() {
  return (
    /*
     * .footer — bg-(--obsidian), border-top gold, overflow-hidden
     * .footer::before (gold gradient ceiling) → explicit div child
     */
    <footer className='relative bg-(--obsidian) border-t border-(--border) overflow-hidden font-dm text-(--ivory)'>
      {/* ── Gold gradient ceiling (.footer::before) ──────────────────── */}
      <div
        className='absolute top-0 left-0 right-0 h-50 pointer-events-none z-0'
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--gold) 4%, transparent) 0%, transparent 100%)',
        }}
      />

      {/* ── Large watermark (.footer-watermark) ──────────────────────── */}
      <div
        className={[
          'absolute -bottom-5 left-1/2 -translate-x-1/2',
          'font-bebas tracking-[0.12em] leading-none',
          'text-[clamp(5rem,14vw,12rem)]',
          'whitespace-nowrap select-none pointer-events-none z-1',
        ].join(' ')}
        style={{ color: 'color-mix(in srgb, var(--gold) 3%, transparent)' }}
      >
        IEGS
      </div>

      {/* ════════════════════════════════════════════════════════════════
          TOP COLUMNS (.footer-top)
          Desktop  : 4-col grid [1.6fr 1fr 1fr 1fr]
          ≤1100px  : 2-col
          ≤768px   : 1-col
         ════════════════════════════════════════════════════════════════ */}
      <div
        className={[
          'relative z-2',
          'grid grid-cols-[1.6fr_1fr_1fr_1fr]',
          'border-b border-(--border)',
          /* responsive */
          'max-[1100px]:grid-cols-2',
          'max-md:grid-cols-1',
        ].join(' ')}
      >
        {/* Col 1 — Brand */}
        <FooterBrandCol />

        {/* Col 2 — Webinars nav */}
        <FooterNavCol heading='Webinars' navLinks={WEBINAR_LINKS} />

        {/* Col 3 — Company nav */}
        <FooterNavCol heading='Company' navLinks={COMPANY_LINKS} />

        {/* Col 4 — Contact (last, no border-right) */}
        <FooterNavCol heading='Contact' contactItems={CONTACT_ITEMS} isLast />
      </div>

      {/* ── Mid newsletter strip ─────────────────────────────────────── */}
      <FooterMidNewsletter />

      {/* ── Bottom bar ───────────────────────────────────────────────── */}
      <FooterBottom />
    </footer>
  );
}
