'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SPEAKERS } from './data';
import { RoleBadge } from './RoleBadge';
import type { Speaker } from './types';

// ─── LinkedIn Icon ─────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      aria-hidden='true'
    >
      <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
      <rect x='2' y='9' width='4' height='12' />
      <circle cx='4' cy='4' r='2' />
    </svg>
  );
}

// ─── ArrowLeft Icon ────────────────────────────────────────────────────────────

function ArrowLeftIcon() {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      aria-hidden='true'
    >
      <path d='M19 12H5M5 12l7 7M5 12l7-7' />
    </svg>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  accent = 'gold',
}: {
  value: string | number;
  label: string;
  accent?: 'gold' | 'cyan';
}) {
  return (
    <div
      className={[
        'flex flex-col gap-1 px-6 py-5',
        'border border-(--border)',
        'transition-colors duration-300 hover:border-(--border-mid)',
      ].join(' ')}
      style={{ background: 'var(--gold-dim)' }}
    >
      <span
        className={[
          'font-bebas leading-none tracking-[0.04em]',
          'text-[2.6rem]',
          accent === 'gold' ? 'text-(--gold-light)' : 'text-(--cyan)',
        ].join(' ')}
      >
        {value}
      </span>
      <span className='text-[0.62rem] tracking-[0.22em] uppercase text-(--ivory-muted)'>
        {label}
      </span>
    </div>
  );
}

// ─── SpeakerProfilePage ────────────────────────────────────────────────────────

export function SpeakerProfilePage({ id }: { id: number }) {
  const speaker: Speaker | undefined = SPEAKERS.find((s) => s.id === id);
  if (!speaker) notFound();

  return (
    <main
      className="min-h-screen font-['DM_Sans',sans-serif]"
      style={{ background: 'var(--obsidian)', color: 'var(--ivory)' }}
    >
      {/* ── Top decorative rule ─────────────────────────────────────────────── */}
      <div
        aria-hidden='true'
        className='w-full h-px'
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold) 70%, transparent 100%)',
          opacity: 0.18,
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO PANEL
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className='relative overflow-hidden'
        style={{
          background:
            'linear-gradient(160deg, var(--obsidian-2) 0%, var(--obsidian-3) 60%, var(--obsidian-4) 100%)',
        }}
      >
        {/* Per-speaker ambient glow */}
        <div
          aria-hidden='true'
          className='absolute inset-0 pointer-events-none'
          style={{
            background: `radial-gradient(ellipse at 60% 0%, ${speaker.accentColor} 0%, transparent 60%)`,
          }}
        />

        {/* Gold ambient top-left */}
        <div
          aria-hidden='true'
          className='absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none'
          style={{
            background:
              'radial-gradient(circle, var(--gold-dim) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Large monogram watermark */}
        <span
          aria-hidden='true'
          className={[
            'absolute top-1/2 right-[-2%] -translate-y-1/2',
            'font-bebas leading-none tracking-[-0.04em] select-none pointer-events-none',
            'text-[clamp(12rem,20vw,20rem)]',
            'text-(--border)',
          ].join(' ')}
        >
          {speaker.initials}
        </span>

        {/* Grid overlay */}
        <div
          aria-hidden='true'
          className='absolute inset-0 pointer-events-none bg-grid opacity-30'
        />

        {/* ── Back navigation ─────────────────────────────────────────────── */}
        <div className='relative z-10 px-6 sm:px-10 lg:px-16 pt-8'>
          <Link
            href='/#speakers'
            className={[
              'inline-flex items-center gap-2',
              'text-[0.65rem] tracking-[0.2em] uppercase',
              'text-(--ivory-muted)',
              'transition-colors duration-200',
              'hover:text-(--gold)',
            ].join(' ')}
          >
            <ArrowLeftIcon />
            Back to Speakers
          </Link>
        </div>

        {/* ── Hero content ────────────────────────────────────────────────── */}
        <div
          className={[
            'relative z-10',
            'px-6 sm:px-10 lg:px-16',
            'pt-10 pb-16 sm:pb-20',
            'flex flex-col lg:flex-row items-start lg:items-end gap-10 lg:gap-16',
          ].join(' ')}
        >
          {/* Avatar */}
          <div className='flex-shrink-0'>
            <div
              className={[
                'relative w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64',
                'border border-(--border-mid)',
                'flex items-center justify-center overflow-hidden',
              ].join(' ')}
              style={
                speaker.image
                  ? undefined
                  : {
                      background: `radial-gradient(circle at 40% 35%, ${speaker.accentColor} 0%, var(--obsidian-3) 70%)`,
                    }
              }
            >
              {/* Corner accents — always shown */}
              <span
                aria-hidden='true'
                className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-(--gold) z-10'
                style={{ opacity: 0.8 }}
              />
              <span
                aria-hidden='true'
                className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-(--gold) z-10'
                style={{ opacity: 0.8 }}
              />

              {speaker.image ? (
                /* ── Real photo ─────────────────────────────────────── */
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={speaker.image}
                  alt={`Photo of ${speaker.name}`}
                  className='w-full h-full object-cover object-top'
                />
              ) : (
                /* ── Initials fallback ───────────────────────────────── */
                <span className='font-bebas tracking-[0.04em] leading-none select-none text-[3.2rem] sm:text-[4.5rem] lg:text-[5.5rem] text-(--gold-light)'>
                  {speaker.initials}
                </span>
              )}
            </div>
          </div>

          {/* Name + meta */}
          <div className='flex flex-col gap-4 flex-1'>
            <div>
              <RoleBadge role={speaker.role} variant='full' />
            </div>

            <h1
              className={[
                "font-['Cormorant_Garamond',serif] font-light leading-[1.05]",
                'text-[clamp(2.4rem,5vw,4.4rem)]',
                'text-(--ivory)',
              ].join(' ')}
            >
              {speaker.name}
            </h1>

            <div className='flex flex-col gap-1'>
              <p className='text-[0.85rem] tracking-[0.05em] text-(--gold-light) font-normal'>
                {speaker.title}
              </p>
              <p className='text-[0.75rem] tracking-[0.06em] text-(--ivory-muted) font-light'>
                {speaker.org}
              </p>
            </div>

            <div className='flex items-center gap-3 mt-1'>
              <span
                className={[
                  'text-[0.6rem] tracking-[0.22em] uppercase',
                  'px-3 py-[5px]',
                  'border border-(--border)',
                  'text-(--ivory-dim)',
                  'bg-(--gold-dim)',
                ].join(' ')}
              >
                {speaker.category}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className='flex flex-row lg:flex-col gap-3 flex-shrink-0 w-full lg:w-auto'>
            <StatCard
              value={speaker.webinars}
              label='Webinars hosted'
              accent='gold'
            />
            <StatCard
              value={speaker.expertise.length}
              label='Expertise areas'
              accent='cyan'
            />
          </div>
        </div>

        {/* Bottom border rule */}
        <div
          aria-hidden='true'
          className='w-full h-px'
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, var(--border-mid) 40%, var(--border-mid) 60%, transparent 100%)',
          }}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BODY — Bio + Expertise + Actions
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className={[
          'relative',
          'px-6 sm:px-10 lg:px-16',
          'py-16 sm:py-20',
          'grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14',
        ].join(' ')}
        style={{ background: 'var(--obsidian-2)' }}
      >
        {/* Subtle cyan glow bottom-right */}
        <div
          aria-hidden='true'
          className='absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none'
          style={{
            background:
              'radial-gradient(circle, var(--cyan-dim) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />

        {/* ── Left col: Bio + Expertise ──────────────────────────────────── */}
        <div className='flex flex-col gap-12'>
          {/* Bio */}
          <div>
            <div className='flex items-center gap-3 mb-5'>
              <span aria-hidden='true' className='w-5 h-px bg-(--gold)' />
              <span className='text-[0.62rem] tracking-[0.3em] uppercase text-(--gold)'>
                Biography
              </span>
            </div>
            <p
              className={[
                "font-['Cormorant_Garamond',serif] font-light italic",
                'text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.75]',
                'text-(--ivory-dim)',
              ].join(' ')}
            >
              &ldquo;{speaker.bio}&rdquo;
            </p>
          </div>

          {/* Divider */}
          <div
            aria-hidden='true'
            className='w-full h-px'
            style={{ background: 'var(--border)' }}
          />

          {/* Expertise */}
          <div>
            <div className='flex items-center gap-3 mb-6'>
              <span aria-hidden='true' className='w-5 h-px bg-(--gold)' />
              <span className='text-[0.62rem] tracking-[0.3em] uppercase text-(--gold)'>
                Areas of Expertise
              </span>
            </div>

            <div className='flex flex-wrap gap-3'>
              {speaker.expertise.map((tag, i) => (
                <span
                  key={tag}
                  className={[
                    'inline-flex items-center gap-2',
                    'text-[0.68rem] tracking-[0.16em] uppercase',
                    'px-4 py-2.5',
                    'border border-(--border)',
                    'text-(--ivory-dim)',
                    'transition-all duration-300',
                    'hover:border-(--border-mid) hover:text-(--ivory) hover:bg-(--gold-dim)',
                  ].join(' ')}
                >
                  <span
                    aria-hidden='true'
                    className={[
                      'w-1 h-1 rounded-full flex-shrink-0',
                      i % 2 === 0 ? 'bg-(--gold)' : 'bg-(--cyan)',
                    ].join(' ')}
                  />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right col: Action card ─────────────────────────────────────── */}
        <div className='flex flex-col gap-6'>
          {/* Action card */}
          <div
            className={[
              'relative overflow-hidden',
              'border border-(--border)',
              'p-7',
              'flex flex-col gap-5',
            ].join(' ')}
            style={{ background: 'var(--obsidian-3)' }}
          >
            {/* Corner accent */}
            <span
              aria-hidden='true'
              className='absolute top-0 right-0 w-10 h-10 pointer-events-none'
              style={{
                background:
                  'linear-gradient(225deg, var(--border-hi) 0%, transparent 60%)',
              }}
            />

            <div>
              <p className='text-[0.62rem] tracking-[0.28em] uppercase text-(--gold) mb-2'>
                Connect
              </p>
              <p className='text-[0.78rem] leading-[1.6] text-(--ivory-dim)'>
                Reach out to {speaker.name.split(' ')[0]} for collaborations,
                speaking invitations, or to register for their next session.
              </p>
            </div>

            {/* LinkedIn */}
            <a
              href={speaker.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              className={[
                'inline-flex items-center justify-center gap-2.5',
                'text-[0.7rem] tracking-[0.18em] uppercase font-medium',
                'text-[#1c1a14]',
                'bg-linear-to-br from-(--gold) to-(--gold-light)',
                'px-6 py-3.5',
                'clip-bevel-sm',
                'transition-all duration-250',
                'hover:from-(--gold-light) hover:to-(--gold-pale)',
                'hover:shadow-[0_8px_28px_var(--gold-glow)]',
                'hover:-translate-y-px',
              ].join(' ')}
              aria-label={`View ${speaker.name} on LinkedIn`}
            >
              <LinkedInIcon />
              View on LinkedIn
            </a>

            {/* Register CTA */}
            <Link
              href='/#cta'
              className={[
                'inline-flex items-center justify-center gap-2.5',
                'text-[0.7rem] tracking-[0.18em] uppercase',
                'text-(--ivory-dim)',
                'border border-(--border)',
                'px-6 py-3.5',
                'transition-all duration-250',
                'hover:border-(--border-mid) hover:text-(--ivory) hover:bg-(--gold-dim)',
              ].join(' ')}
            >
              Register for Next Webinar →
            </Link>
          </div>

          {/* Meta table */}
          <div
            className='flex flex-col gap-2 px-5 py-4 border border-(--border)'
            style={{ background: 'var(--obsidian-3)' }}
          >
            {[
              {
                label: 'Category',
                value: speaker.category,
                valueClass: 'text-(--ivory-dim)',
              },
              {
                label: 'Role',
                value:
                  speaker.role === 'host' ? 'Lead Speaker' : 'Guest Speaker',
                valueClass: 'text-(--ivory-dim)',
              },
              {
                label: 'Webinars',
                value: String(speaker.webinars),
                valueClass:
                  'text-(--gold-light) font-bebas text-[1rem] tracking-[0.04em]',
              },
            ].map((row, i, arr) => (
              <div key={row.label}>
                <div className='flex items-center justify-between py-0.5'>
                  <span className='text-[0.6rem] tracking-[0.18em] uppercase text-(--ivory-muted)'>
                    {row.label}
                  </span>
                  <span className={`text-[0.7rem] ${row.valueClass}`}>
                    {row.value}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div
                    aria-hidden='true'
                    className='w-full h-px mt-1.5'
                    style={{ background: 'var(--border)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BOTTOM CTA STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className='relative overflow-hidden'
        style={{ background: 'var(--obsidian-3)' }}
      >
        {/* Top border rule */}
        <div
          aria-hidden='true'
          className='w-full h-px'
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--border-mid), transparent)',
          }}
        />

        <div
          className={[
            'relative z-10',
            'px-6 sm:px-10 lg:px-16',
            'py-14 sm:py-16',
            'flex flex-col sm:flex-row items-center justify-between gap-8',
          ].join(' ')}
        >
          {/* Gold diagonal slash */}
          <div
            aria-hidden='true'
            className='absolute top-0 left-[30%] bottom-0 w-px pointer-events-none'
            style={{
              background:
                'linear-gradient(180deg, transparent, var(--border-mid), transparent)',
              transform: 'rotate(12deg)',
            }}
          />

          <div className='relative z-10'>
            <p className='text-[0.62rem] tracking-[0.3em] uppercase text-(--gold) mb-2'>
              Explore More
            </p>
            <h2
              className={[
                "font-['Cormorant_Garamond',serif] font-light",
                'text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.15]',
                'text-(--ivory)',
              ].join(' ')}
            >
              Discover all{' '}
              <em className='italic text-(--gold-light)'>IEGS speakers</em>
            </h2>
          </div>

          <div className='relative z-10 flex flex-wrap gap-4'>
            <Link
              href='/#speakers'
              className={[
                'inline-flex items-center gap-3',
                'text-[0.7rem] tracking-[0.18em] uppercase font-medium',
                'text-[#1c1a14]',
                'bg-linear-to-br from-(--gold) to-(--gold-light)',
                'px-7 py-3.5',
                'clip-bevel-sm',
                'transition-all duration-250',
                'hover:from-(--gold-light) hover:to-(--gold-pale)',
                'hover:shadow-[0_8px_28px_var(--gold-glow)]',
                'hover:-translate-y-px',
              ].join(' ')}
            >
              All Speakers
            </Link>
            <Link
              href='/webinars'
              className={[
                'inline-flex items-center gap-3',
                'text-[0.7rem] tracking-[0.18em] uppercase',
                'text-(--ivory-dim)',
                'border border-(--border)',
                'px-7 py-3.5',
                'transition-all duration-250',
                'hover:border-(--border-mid) hover:text-(--ivory) hover:bg-(--gold-dim)',
              ].join(' ')}
            >
              Browse Webinars →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
