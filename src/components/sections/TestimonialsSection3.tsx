'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────
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
      "I've attended geospatial conferences across three continents and IEGS delivers practitioner-led insight that rivals any of them — completely free. The drone survey session gave our field team six months of operational improvements in two hours.",
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
      'As someone working in precision agriculture across the Sahel, the contextual relevance of IEGS sessions is what sets them apart. This is genuine African geospatial intelligence built for our realities — not imported curriculum.',
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
      'The oil and gas geospatial session gave our compliance team a framework we immediately adopted. Chief Effiong presented live pipeline surveillance data I had never seen made accessible before. Invaluable for the Niger Delta energy corridor.',
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
      'I registered expecting a standard seminar. What I got was a masterclass in SAR interpretation that would cost thousands at any European institution. IEGS is quietly building the most important geospatial knowledge network in Africa.',
    name: 'Dr. Kwame Mensah',
    role: 'Environmental Monitoring Specialist',
    organisation: 'University of Ghana, Legon',
    country: 'Ghana',
    initials: 'KM',
    discipline: 'Remote Sensing & SAR',
    sessionAttended: 'SAR & LiDAR for Environmental Monitoring',
  },
  {
    id: 6,
    quote:
      'Attending the land administration webinar reshaped how I think about cadastral systems entirely. The speakers brought lived experience from the field — not just theory. I walked away with practical tools I used the very next day.',
    name: 'Aïssatou Diallo',
    role: 'Land Registry Officer',
    organisation: 'Direction Nationale des Domaines',
    country: 'Guinea',
    initials: 'AD',
    discipline: 'Land Administration',
    sessionAttended: 'Digital Cadastral Systems in Africa',
  },
  {
    id: 7,
    quote:
      'IEGS is the most democratising force in African geospatial education today. Free, expert-led, contextually grounded — every session feels like it was built specifically for the problems we solve on the ground in East Africa.',
    name: 'James Mwangi Kariuki',
    role: 'GIS Officer',
    organisation: 'Kenya National Highways Authority',
    country: 'Kenya',
    initials: 'JK',
    discipline: 'GIS & Spatial Mapping',
    sessionAttended: 'Advanced GIS for Urban Infrastructure',
  },
] as const;

type T = (typeof TESTIMONIALS)[number];

const DISC_COLOR: Record<string, string> = {
  'GIS & Spatial Mapping': 'var(--navy-light)',
  'UAV & Drone Surveys':   'var(--teal-light)',
  'Precision Agriculture': '#8fc97e',
  'Oil & Gas Geospatial':  '#c9a850',
  'Remote Sensing & SAR':  'var(--navy-pale)',
  'Land Administration':   '#b89fd4',
};

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ color }: { color: string }) {
  return (
    <div className='flex gap-0.5'>
      {[0,1,2,3,4].map((i) => (
        <span key={i} style={{ color, fontSize: '0.55rem' }}>★</span>
      ))}
    </div>
  );
}

// ─── Right-panel scroll card ──────────────────────────────────────────────────
function ScrollCard({ t, isActive, onClick }: { t: T; isActive: boolean; onClick: () => void }) {
  const color = DISC_COLOR[t.discipline] ?? 'var(--navy-light)';
  return (
    <button
      onClick={onClick}
      className='w-full text-left flex items-start gap-3 p-4 outline-none'
      style={{
        border:     `1px solid ${isActive ? color + '66' : 'var(--border)'}`,
        background: isActive ? 'var(--obsidian-3)' : 'var(--obsidian-2)',
        boxShadow:  isActive ? `0 0 20px ${color}1a` : 'none',
        cursor:     'pointer',
        flexShrink: 0,
        transition: 'border-color 0.45s ease, background 0.45s ease, box-shadow 0.45s ease',
      }}
    >
      {/* Active bar */}
      <span
        className='mt-1 shrink-0 w-0.5 self-stretch rounded-full'
        style={{
          background: color,
          opacity: isActive ? 1 : 0.2,
          transition: 'opacity 0.45s ease',
        }}
      />
      <div className='flex flex-col gap-1 min-w-0 flex-1'>
        {/* Initials + name */}
        <div className='flex items-center gap-2'>
          <span
            className='inline-flex items-center justify-center w-6 h-6 shrink-0 text-[0.5rem]'
            style={{
              fontFamily: 'var(--font-bebas)',
              letterSpacing: '0.06em',
              background:   isActive ? `${color}18` : 'var(--obsidian-4)',
              border:       `1px solid ${isActive ? color + '55' : 'var(--border)'}`,
              color:        isActive ? color : 'var(--ivory-muted)',
              transition:   'all 0.45s ease',
            }}
          >
            {t.initials}
          </span>
          <p
            className='text-[0.68rem] font-medium truncate leading-tight'
            style={{
              fontFamily: 'var(--font-dm)',
              color:      isActive ? 'var(--ivory)' : 'var(--ivory-dim)',
              transition: 'color 0.45s ease',
            }}
          >
            {t.name}
          </p>
        </div>
        {/* Discipline chip */}
        <span
          className='text-[0.47rem] tracking-[0.22em] uppercase px-1.5 py-0.5 self-start'
          style={{
            border:     `1px solid ${isActive ? color + '44' : 'var(--border)'}`,
            color:      isActive ? color : 'var(--ivory-muted)',
            background: isActive ? `${color}0d` : 'transparent',
            transition: 'all 0.45s ease',
          }}
        >
          {t.discipline}
        </span>
        {/* Short preview */}
        <p
          className='text-[0.57rem] leading-[1.5] line-clamp-2'
          style={{
            fontStyle: 'italic',
            color:     'var(--ivory-muted)',
            opacity:   isActive ? 0.75 : 0.38,
            transition:'opacity 0.45s ease',
          }}
        >
          &ldquo;{t.quote.slice(0, 70)}…&rdquo;
        </p>
      </div>
    </button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const COUNT = TESTIMONIALS.length;
  const CARD_H = 116; // px — approximate rendered card height
  const GAP    = 8;
  const UNIT   = CARD_H + GAP;

  // ── "cursor" is an ever-increasing integer — never wraps, never jumps ──────
  // realIndex = cursor % COUNT  gives the actual testimonial index.
  // The tripled list spans cursor values 0 .. 3*COUNT-1 mapped to indices 0..COUNT-1.
  // We initialise cursor at COUNT so the middle copy is shown on mount.
  const [cursor, setCursor]   = useState(COUNT);        // starts in middle copy
  const [isPaused, setIsPaused] = useState(false);

  const scrollRef  = useRef<HTMLDivElement>(null);
  const cursorRef  = useRef(cursor);
  cursorRef.current = cursor;

  const isManual   = useRef(false);
  const isJumping  = useRef(false); // true during a silent scroll-top reset

  // ── Derived real index ──────────────────────────────────────────────────────
  const realIndex = ((cursor % COUNT) + COUNT) % COUNT;
  const current   = TESTIMONIALS[realIndex]!;
  const accent    = DISC_COLOR[current.discipline] ?? 'var(--navy-light)';

  // ── Scroll the list so the card at `cur` (absolute cursor) is centred ──────
  const syncScroll = useCallback(
    (cur: number, smooth: boolean) => {
      const el = scrollRef.current;
      if (!el) return;
      const target = cur * UNIT + UNIT / 2 - el.clientHeight / 2;
      if (smooth) {
        el.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
      } else {
        el.scrollTop = Math.max(0, target);
      }
    },
    [UNIT],
  );

  // ── On mount: silence-position to middle copy ─────────────────────────────
  useEffect(() => {
    syncScroll(COUNT, false);
  }, [COUNT, syncScroll]);

  // ── Whenever cursor changes: scroll to match (smooth) ────────────────────
  // Also handle seamless loop: if cursor has drifted into first or last copy,
  // silently reset to middle copy (same real card, same visual position).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Check if we've drifted out of the safe middle range
    if (cursor < COUNT / 2) {
      // Too close to top — jump forward by one full set (no visual change)
      isJumping.current = true;
      const newCursor = cursor + COUNT;
      setCursor(newCursor);
      syncScroll(newCursor, false);
      setTimeout(() => { isJumping.current = false; }, 50);
      return;
    }
    if (cursor > COUNT * 2.5) {
      // Too close to bottom — jump back by one full set
      isJumping.current = true;
      const newCursor = cursor - COUNT;
      setCursor(newCursor);
      syncScroll(newCursor, false);
      setTimeout(() => { isJumping.current = false; }, 50);
      return;
    }

    // Normal case — smooth scroll to this cursor position
    if (!isJumping.current) {
      syncScroll(cursor, true);
    }
  }, [cursor, COUNT, syncScroll]);

  // ── Auto-advance: strictly +1 every 3.8 s ────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      if (isManual.current || isJumping.current) return;
      setCursor((c) => c + 1);  // always +1, serial, no skips
    }, 3800);
    return () => clearInterval(id);
  }, [isPaused]);

  // ── User clicks a card in the right panel ────────────────────────────────
  // Find the nearest copy of that real index relative to the current cursor,
  // always moving forward (+1 direction) for consistency.
  const handleCardClick = (clickedRealIdx: number) => {
    isManual.current = true;
    setCursor((c) => {
      const currentReal = ((c % COUNT) + COUNT) % COUNT;
      // How many steps forward to reach clickedRealIdx?
      let steps = (clickedRealIdx - currentReal + COUNT) % COUNT;
      if (steps === 0) steps = COUNT; // full loop if same card clicked
      return c + steps;
    });
    setTimeout(() => { isManual.current = false; }, 6000);
  };

  // ── Tripled list for the scroll panel ────────────────────────────────────
  // We render 3 full copies. Each item's "absolute cursor index" is i (0..3*COUNT-1).
  // isActive when that cursor index corresponds to the current real index AND
  // is in the "middle" zone near the current cursor.
  const TRIPLED = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  const quoteVariants = {
    enter:  { opacity: 0, y: 20, filter: 'blur(6px)' },
    center: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] as const } },
    exit:   { opacity: 0, y: -14, filter: 'blur(3px)', transition: { duration: 0.28, ease: 'easeIn' as const } },
  };

  return (
    <section
      className='relative overflow-hidden py-28'
      style={{ background: 'var(--obsidian-2)' }}
    >
      {/* Backgrounds */}
      <div className='absolute inset-0 bg-grid opacity-40 pointer-events-none' aria-hidden />
      <div
        className='absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0'
        aria-hidden
      >
        <span style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(5rem, 16vw, 13rem)',
          letterSpacing: '0.06em',
          color: 'color-mix(in srgb, var(--navy) 3.5%, transparent)',
          userSelect: 'none',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          TESTIMONIALS
        </span>
      </div>
      <div
        className='absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[280px] rounded-full blur-[100px] pointer-events-none z-0'
        style={{ background: 'radial-gradient(ellipse, var(--navy-glow) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div className='absolute inset-x-0 top-0 h-20 z-2 pointer-events-none' style={{ background: 'linear-gradient(to bottom, var(--obsidian-2), transparent)' }} aria-hidden />
      <div className='absolute inset-x-0 bottom-0 h-20 z-2 pointer-events-none' style={{ background: 'linear-gradient(to top, var(--obsidian-2), transparent)' }} aria-hidden />

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
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 300,
            color: 'var(--ivory)',
            lineHeight: 1.05,
          }}>
            Professionals Who{' '}
            <em className='italic' style={{ color: 'var(--teal-light)' }}>Showed Up</em>
            <br className='hidden sm:block' />
            {' '}&amp; Walked Away Transformed.
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className='grid lg:grid-cols-[1fr_300px] gap-6 items-stretch'>

          {/* LEFT — quote card */}
          <div
            className='relative flex flex-col'
            style={{
              border: '1px solid var(--border)',
              background: 'var(--obsidian-3)',
              minHeight: 400,
            }}
          >
            {/* Animated top accent line */}
            <motion.div
              className='absolute top-0 left-0 right-0 h-px pointer-events-none'
              animate={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
              transition={{ duration: 0.6 }}
            />

            {/* Corner reticles */}
            {(['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r','bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'] as const).map((cls, i) => (
              <motion.span
                key={i}
                className={`absolute w-4 h-4 pointer-events-none ${cls}`}
                animate={{ borderColor: accent }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.5 }}
              />
            ))}

            <div className='flex flex-col flex-1 p-8 lg:p-10'>
              {/* Quote icon */}
              <motion.div animate={{ color: accent }} transition={{ duration: 0.5 }} className='mb-6' style={{ opacity: 0.5 }}>
                <Quote size={28} />
              </motion.div>

              {/* Quote text — always exits upward, enters from below (serial feel) */}
              <div className='relative flex-1 mb-8' style={{ minHeight: 168 }}>
                <AnimatePresence mode='wait'>
                  <motion.blockquote
                    key={current.id + '-' + cursor}
                    variants={quoteVariants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 'clamp(1.05rem, 1.6vw, 1.28rem)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: 'var(--ivory)',
                      lineHeight: 1.8,
                    }}
                  >
                    &ldquo;{current.quote}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Session tag */}
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`tag-${cursor}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className='flex items-center gap-2 mb-6 flex-wrap'
                >
                  <span
                    className='text-[0.5rem] tracking-[0.28em] uppercase px-2.5 py-1'
                    style={{
                      border:     `1px solid ${accent}44`,
                      color:       accent,
                      background: `${accent}0d`,
                    }}
                  >
                    {current.discipline}
                  </span>
                  <span className='text-[0.58rem]' style={{ color: 'var(--ivory-muted)' }}>
                    · {current.sessionAttended}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Author */}
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`auth-${cursor}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.38 }}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className='flex items-center justify-center w-10 h-10 shrink-0'
                      style={{
                        background: `${accent}18`,
                        border:     `1px solid ${accent}44`,
                        color:       accent,
                        fontFamily: 'var(--font-bebas)',
                        fontSize:   '0.85rem',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {current.initials}
                    </div>
                    <div>
                      <p className='text-[0.78rem] font-medium leading-tight' style={{ color: 'var(--ivory)', fontFamily: 'var(--font-dm)' }}>
                        {current.name}
                      </p>
                      <p className='text-[0.6rem] leading-tight mt-0.5' style={{ color: 'var(--ivory-muted)' }}>
                        {current.role} · {current.organisation}
                      </p>
                      <p className='text-[0.55rem] tracking-[0.15em] uppercase mt-0.5' style={{ color: 'var(--ivory-muted)', opacity: 0.6 }}>
                        {current.country}
                      </p>
                    </div>
                  </div>
                  <Stars color={accent} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div style={{ borderTop: '1px solid var(--border)', padding: '12px 2.5rem' }}>
              <div className='flex items-center gap-3'>
                <span className='text-[0.5rem] tracking-[0.28em] uppercase tabular shrink-0' style={{ color: 'var(--ivory-muted)' }}>
                  {String(realIndex + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
                </span>
                <div className='flex-1 h-px relative' style={{ background: 'var(--border)' }}>
                  <motion.div
                    className='absolute left-0 top-0 h-full'
                    animate={{ width: `${((realIndex + 1) / COUNT) * 100}%`, background: accent }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — infinite scroll list */}
          <div
            className='hidden lg:block relative'
            style={{ height: 490 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top & bottom fade masks */}
            <div
              className='absolute inset-x-0 top-0 h-14 pointer-events-none z-10'
              style={{ background: 'linear-gradient(to bottom, var(--obsidian-2) 10%, transparent)' }}
            />
            <div
              className='absolute inset-x-0 bottom-0 h-14 pointer-events-none z-10'
              style={{ background: 'linear-gradient(to top, var(--obsidian-2) 10%, transparent)' }}
            />

            {/* Scroll container — no scrollbar, no onScroll handler */}
            <div
              ref={scrollRef}
              className='h-full overflow-y-scroll no-scrollbar'
              style={{ scrollBehavior: 'auto' }}
            >
              <div className='flex flex-col' style={{ gap: GAP, padding: `${GAP}px 0` }}>
                {TRIPLED.map((t, i) => {
                  // i is the absolute position in the tripled list (0..3*COUNT-1)
                  // We map this to a "virtual cursor" value to check if it matches current cursor
                  // The tripled list covers cursors COUNT-range, so:
                  // column index 0..COUNT-1 = copy A (cursors 0..COUNT-1)
                  // column index COUNT..2*COUNT-1 = copy B (cursors COUNT..2*COUNT-1) ← middle
                  // column index 2*COUNT..3*COUNT-1 = copy C (cursors 2*COUNT..3*COUNT-1)
                  const realIdx = i % COUNT;
                  // A card is "active" when its real index matches the current real index
                  // AND it is the copy nearest to the current cursor position
                  const nearestCursorForThisCard =
                    Math.round(cursor / COUNT) * COUNT + realIdx;
                  const distanceFromCurrent = Math.abs(i - nearestCursorForThisCard);
                  const isActive = realIdx === realIndex && distanceFromCurrent < COUNT;

                  return (
                    <ScrollCard
                      key={`${t.id}-copy${Math.floor(i / COUNT)}`}
                      t={t}
                      isActive={isActive}
                      onClick={() => handleCardClick(realIdx)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile dots */}
        <div className='flex justify-center gap-1.5 mt-6 lg:hidden'>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleCardClick(i)}
              style={{
                width:      i === realIndex ? 20 : 6,
                height:     4,
                background: i === realIndex ? 'var(--navy-light)' : 'var(--border-mid)',
                border:     'none',
                cursor:     'pointer',
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
