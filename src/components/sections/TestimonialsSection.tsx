'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// ─── Placeholder testimonials ─────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'The IEGS webinar on Advanced GIS Techniques completely transformed how our team approaches urban infrastructure projects. The depth of knowledge shared by the speakers was unmatched — directly applicable to real challenges we face in Port Harcourt.',
    name: 'Chukwuemeka Adeyemi',
    role: 'Senior GIS Analyst',
    organisation: 'Rivers State Ministry of Works',
    country: 'Nigeria',
    initials: 'CA',
    discipline: 'GIS & Spatial Mapping',
    sessionAttended: 'Advanced GIS for Urban Infrastructure',
  },
  {
    id: 2,
    quote:
      "I've attended geospatial conferences across three continents and IEGS delivers a quality of practitioner-led insight that rivals any of them — completely free. The drone survey session gave our field team six months of operational improvements in two hours.",
    name: 'Dr. Amara Sesay',
    role: 'Remote Sensing Lead',
    organisation: 'Sierra Leone Lands & Surveys',
    country: 'Sierra Leone',
    initials: 'AS',
    discipline: 'UAV & Drone Surveys',
    sessionAttended: 'Drone-Based Pipeline Surveillance',
  },
  {
    id: 3,
    quote:
      'As someone working in precision agriculture across the Sahel, the contextual relevance of IEGS sessions is what sets them apart. This is not Western curriculum repackaged — it is genuine African geospatial intelligence built for our realities.',
    name: 'Fatimata Kouyaté',
    role: 'Agronomist & Spatial Analyst',
    organisation: 'CILSS — Sahel Institute',
    country: 'Burkina Faso',
    initials: 'FK',
    discipline: 'Precision Agriculture',
    sessionAttended: 'Satellite Imagery & Crop Yield Analytics',
  },
  {
    id: 4,
    quote:
      'The oil and gas geospatial session gave our compliance team a framework we immediately adopted. Chief Effiong presented live pipeline surveillance data I had never seen made accessible before. Invaluable for anyone in the Niger Delta energy corridor.',
    name: 'Engr. Tomiwa Bankole',
    role: 'Pipeline Integrity Engineer',
    organisation: 'Seplat Energy Plc',
    country: 'Nigeria',
    initials: 'TB',
    discipline: 'Oil & Gas Geospatial',
    sessionAttended: 'Geospatial Intelligence for Offshore Assets',
  },
  {
    id: 5,
    quote:
      'I registered expecting a standard online seminar. What I got was a masterclass in SAR interpretation that would cost thousands at any European institution. IEGS is quietly building the most important geospatial knowledge network in Africa.',
    name: 'Dr. Kwame Mensah',
    role: 'Environmental Monitoring Specialist',
    organisation: 'University of Ghana, Legon',
    country: 'Ghana',
    initials: 'KM',
    discipline: 'Remote Sensing & SAR',
    sessionAttended: 'SAR & LiDAR for Environmental Monitoring',
  },
] as const;

// ─── Discipline colour map ────────────────────────────────────────────────────
const DISC_COLOR: Record<string, string> = {
  'GIS & Spatial Mapping':  'var(--navy-light)',
  'UAV & Drone Surveys':    'var(--teal-light)',
  'Precision Agriculture':  '#8fc97e',
  'Oil & Gas Geospatial':   '#c9a850',
  'Remote Sensing & SAR':   'var(--navy-pale)',
};

// ─── Small star rating ────────────────────────────────────────────────────────
function Stars() {
  return (
    <div className='flex gap-0.5'>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: 'var(--navy-light)', fontSize: '0.55rem' }}>
          ★
        </span>
      ))}
    </div>
  );
}

// ─── Main TestimonialsSection ─────────────────────────────────────────────────
export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const current = TESTIMONIALS[active]!;
  const accentColor = DISC_COLOR[current.discipline] ?? 'var(--navy-light)';

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const variants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d > 0 ? 40 : -40,
      filter: 'blur(6px)',
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.45, ease: 'easeOut' },
    },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -40 : 40,
      filter: 'blur(4px)',
      transition: { duration: 0.28, ease: 'easeIn' },
    }),
  };

  return (
    <section
      className='relative overflow-hidden py-28'
      style={{ background: 'var(--obsidian-2)' }}
    >
      {/* Background effects */}
      <div className='absolute inset-0 bg-grid opacity-40 pointer-events-none' aria-hidden />

      {/* Ghost watermark */}
      <div
        className='absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0'
        aria-hidden
      >
        <span
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(5rem, 16vw, 13rem)',
            letterSpacing: '0.06em',
            color: 'color-mix(in srgb, var(--navy) 3.5%, transparent)',
            userSelect: 'none',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          TESTIMONIALS
        </span>
      </div>

      <div
        className='absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[100px] pointer-events-none z-0'
        style={{ background: 'radial-gradient(ellipse, var(--navy-glow) 0%, transparent 70%)' }}
        aria-hidden
      />

      {/* Top/bottom fade */}
      <div className='absolute inset-x-0 top-0 h-20 pointer-events-none z-2' style={{ background: 'linear-gradient(to bottom, var(--obsidian-2), transparent)' }} aria-hidden />
      <div className='absolute inset-x-0 bottom-0 h-20 pointer-events-none z-2' style={{ background: 'linear-gradient(to top, var(--obsidian-2), transparent)' }} aria-hidden />

      <div className='relative z-10 max-w-6xl mx-auto px-6 lg:px-16'>

        {/* Header */}
        <motion.div
          className='flex flex-col items-center text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='eyebrow mb-4'>
            <span className='eyebrow-text'>From The Community</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 300,
              color: 'var(--ivory)',
              lineHeight: 1.05,
            }}
          >
            Professionals Who{' '}
            <em className='italic' style={{ color: 'var(--teal-light)' }}>
              Showed Up
            </em>
            <br className='hidden sm:block' />
            &amp; Walked Away Transformed.
          </h2>
        </motion.div>

        {/* ── Main testimonial card ─────────────────────────────────── */}
        <div className='grid lg:grid-cols-[1fr_300px] gap-8 items-start'>

          {/* Left — quote card */}
          <div
            className='relative'
            style={{
              border: '1px solid var(--border)',
              background: 'var(--obsidian-3)',
            }}
          >
            {/* Accent top border */}
            <div
              className='absolute top-0 left-0 right-0 h-px'
              style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
            />

            {/* Corner reticles */}
            {[
              'top-0 left-0 border-t border-l',
              'top-0 right-0 border-t border-r',
              'bottom-0 left-0 border-b border-l',
              'bottom-0 right-0 border-b border-r',
            ].map((cls, i) => (
              <span
                key={i}
                className={`absolute w-4 h-4 pointer-events-none ${cls}`}
                style={{ borderColor: accentColor, opacity: 0.5, transition: 'border-color 0.4s ease' }}
              />
            ))}

            <div className='p-8 lg:p-10'>
              {/* Quote icon */}
              <div className='mb-6'>
                <Quote
                  size={28}
                  style={{ color: accentColor, opacity: 0.5 }}
                />
              </div>

              {/* Animated quote text */}
              <div className='relative min-h-[140px] mb-8'>
                <AnimatePresence custom={direction} mode='wait'>
                  <motion.blockquote
                    key={current.id}
                    custom={direction}
                    variants={variants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    className='font-display leading-[1.75]'
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: 'var(--ivory)',
                    }}
                  >
                    &ldquo;{current.quote}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Session tag */}
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`tag-${current.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='flex items-center gap-2 mb-6'
                >
                  <span
                    className='text-[0.5rem] tracking-[0.28em] uppercase px-2.5 py-1'
                    style={{
                      border: `1px solid ${accentColor}44`,
                      color: accentColor,
                      background: `${accentColor}0d`,
                    }}
                  >
                    {current.discipline}
                  </span>
                  <span
                    className='text-[0.58rem] tracking-[0.1em]'
                    style={{ color: 'var(--ivory-muted)' }}
                  >
                    · {current.sessionAttended}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Author row */}
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`auth-${current.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-3'>
                    {/* Initials avatar */}
                    <div
                      className='flex items-center justify-center w-10 h-10 shrink-0'
                      style={{
                        background: 'var(--navy-dim)',
                        border: `1px solid ${accentColor}44`,
                        color: accentColor,
                        fontFamily: 'var(--font-bebas)',
                        fontSize: '0.85rem',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {current.initials}
                    </div>
                    <div>
                      <p
                        className='text-[0.78rem] font-medium leading-tight'
                        style={{ color: 'var(--ivory)', fontFamily: 'var(--font-dm)' }}
                      >
                        {current.name}
                      </p>
                      <p
                        className='text-[0.6rem] leading-tight mt-0.5'
                        style={{ color: 'var(--ivory-muted)' }}
                      >
                        {current.role} · {current.organisation}
                      </p>
                      <p
                        className='text-[0.55rem] tracking-[0.15em] uppercase mt-0.5'
                        style={{ color: 'var(--ivory-muted)', opacity: 0.6 }}
                      >
                        {current.country}
                      </p>
                    </div>
                  </div>
                  <Stars />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation row */}
            <div
              className='flex items-center justify-between px-8 lg:px-10 py-4'
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <span
                className='text-[0.55rem] tracking-[0.25em] uppercase tabular'
                style={{ color: 'var(--ivory-muted)' }}
              >
                {String(active + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => go(-1)}
                  className='flex items-center justify-center w-8 h-8 transition-all duration-200 hover:scale-105'
                  style={{
                    border: '1px solid var(--border)',
                    background: 'var(--obsidian-2)',
                    color: 'var(--ivory-dim)',
                    cursor: 'pointer',
                  }}
                  aria-label='Previous testimonial'
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => go(1)}
                  className='flex items-center justify-center w-8 h-8 transition-all duration-200 hover:scale-105'
                  style={{
                    border: '1px solid var(--border-mid)',
                    background: 'var(--navy-dim)',
                    color: 'var(--navy-light)',
                    cursor: 'pointer',
                  }}
                  aria-label='Next testimonial'
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right — index list of testimonials */}
          <div className='hidden lg:flex flex-col gap-2'>
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === active;
              const color = DISC_COLOR[t.discipline] ?? 'var(--navy-light)';
              return (
                <button
                  key={t.id}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                  className='text-left flex items-start gap-3 p-3 transition-all duration-200'
                  style={{
                    border: `1px solid ${isActive ? color + '55' : 'var(--border)'}`,
                    background: isActive ? 'var(--obsidian-3)' : 'var(--obsidian-2)',
                    cursor: 'pointer',
                  }}
                >
                  {/* Active indicator */}
                  <span
                    className='mt-1.5 shrink-0 w-1 h-1 rounded-full transition-all duration-300'
                    style={{ background: isActive ? color : 'var(--border-mid)' }}
                  />
                  <div>
                    <p
                      className='text-[0.65rem] font-medium leading-tight'
                      style={{
                        color: isActive ? 'var(--ivory)' : 'var(--ivory-dim)',
                        fontFamily: 'var(--font-dm)',
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      className='text-[0.55rem] tracking-[0.1em] uppercase mt-0.5'
                      style={{ color: isActive ? color : 'var(--ivory-muted)', opacity: isActive ? 0.9 : 0.5 }}
                    >
                      {t.discipline}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Placeholder note */}
            <p
              className='text-[0.52rem] tracking-[0.15em] uppercase mt-3 text-center'
              style={{ color: 'var(--ivory-muted)', opacity: 0.4 }}
            >
              Placeholder · Replace with real testimonials
            </p>
          </div>
        </div>

        {/* Dot indicators (mobile) */}
        <div className='flex justify-center gap-1.5 mt-6 lg:hidden'>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
              className='transition-all duration-300'
              style={{
                width: i === active ? 20 : 6,
                height: 4,
                background: i === active ? 'var(--navy-light)' : 'var(--border-mid)',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
