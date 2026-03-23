// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Quote } from 'lucide-react';

// // ─── Testimonial data ─────────────────────────────────────────────────────────
// const TESTIMONIALS = [
//   {
//     id: 1,
//     quote:
//       'The IEGS webinar on Advanced GIS Techniques completely transformed how our team approaches urban infrastructure projects. The depth of knowledge shared by the speakers was unmatched — directly applicable to real challenges we face in Port Harcourt.',
//     name: 'Chukwuemeka Adeyemi',
//     role: 'Senior GIS Analyst',
//     organisation: 'Rivers State Ministry of Works',
//     country: 'Nigeria',
//     initials: 'CA',
//     discipline: 'GIS & Spatial Mapping',
//     sessionAttended: 'Advanced GIS for Urban Infrastructure',
//   },
//   {
//     id: 2,
//     quote:
//       "I've attended geospatial conferences across three continents and IEGS delivers a quality of practitioner-led insight that rivals any of them — completely free. The drone survey session gave our field team six months of operational improvements in two hours.",
//     name: 'Dr. Amara Sesay',
//     role: 'Remote Sensing Lead',
//     organisation: 'Sierra Leone Lands & Surveys',
//     country: 'Sierra Leone',
//     initials: 'AS',
//     discipline: 'UAV & Drone Surveys',
//     sessionAttended: 'Drone-Based Pipeline Surveillance',
//   },
//   {
//     id: 3,
//     quote:
//       'As someone working in precision agriculture across the Sahel, the contextual relevance of IEGS sessions is what sets them apart. This is not Western curriculum repackaged — it is genuine African geospatial intelligence built for our realities.',
//     name: 'Fatimata Kouyaté',
//     role: 'Agronomist & Spatial Analyst',
//     organisation: 'CILSS — Sahel Institute',
//     country: 'Burkina Faso',
//     initials: 'FK',
//     discipline: 'Precision Agriculture',
//     sessionAttended: 'Satellite Imagery & Crop Yield Analytics',
//   },
//   {
//     id: 4,
//     quote:
//       'The oil and gas geospatial session gave our compliance team a framework we immediately adopted. Chief Effiong presented live pipeline surveillance data I had never seen made accessible before. Invaluable for anyone in the Niger Delta energy corridor.',
//     name: 'Engr. Tomiwa Bankole',
//     role: 'Pipeline Integrity Engineer',
//     organisation: 'Seplat Energy Plc',
//     country: 'Nigeria',
//     initials: 'TB',
//     discipline: 'Oil & Gas Geospatial',
//     sessionAttended: 'Geospatial Intelligence for Offshore Assets',
//   },
//   {
//     id: 5,
//     quote:
//       'I registered expecting a standard online seminar. What I got was a masterclass in SAR interpretation that would cost thousands at any European institution. IEGS is quietly building the most important geospatial knowledge network in Africa.',
//     name: 'Dr. Kwame Mensah',
//     role: 'Environmental Monitoring Specialist',
//     organisation: 'University of Ghana, Legon',
//     country: 'Ghana',
//     initials: 'KM',
//     discipline: 'Remote Sensing & SAR',
//     sessionAttended: 'SAR & LiDAR for Environmental Monitoring',
//   },
//   {
//     id: 6,
//     quote:
//       'Attending the land administration webinar reshaped how I think about cadastral systems entirely. The speakers brought lived experience from the field — not just academic theory. I walked away with practical tools I could use the very next day.',
//     name: 'Aïssatou Diallo',
//     role: 'Land Registry Officer',
//     organisation: 'Direction Nationale des Domaines',
//     country: 'Guinea',
//     initials: 'AD',
//     discipline: 'Land Administration',
//     sessionAttended: 'Digital Cadastral Systems in Africa',
//   },
//   {
//     id: 7,
//     quote:
//       'IEGS is the most democratising force in African geospatial education today. Free, expert-led, contextually grounded — every session feels like it was built specifically for the problems we are solving on the ground in East Africa.',
//     name: 'James Mwangi Kariuki',
//     role: 'GIS Officer',
//     organisation: 'Kenya National Highways Authority',
//     country: 'Kenya',
//     initials: 'JK',
//     discipline: 'GIS & Spatial Mapping',
//     sessionAttended: 'Advanced GIS for Urban Infrastructure',
//   },
// ] as const;

// type Testimonial = (typeof TESTIMONIALS)[number];

// // ─── Discipline colour map ────────────────────────────────────────────────────
// const DISC_COLOR: Record<string, string> = {
//   'GIS & Spatial Mapping': 'var(--navy-light)',
//   'UAV & Drone Surveys':   'var(--teal-light)',
//   'Precision Agriculture': '#8fc97e',
//   'Oil & Gas Geospatial':  '#c9a850',
//   'Remote Sensing & SAR':  'var(--navy-pale)',
//   'Land Administration':   '#b89fd4',
// };

// // ─── Stars ────────────────────────────────────────────────────────────────────
// function Stars({ color }: { color: string }) {
//   return (
//     <div className='flex gap-0.5'>
//       {Array.from({ length: 5 }).map((_, i) => (
//         <span key={i} style={{ color, fontSize: '0.55rem' }}>★</span>
//       ))}
//     </div>
//   );
// }

// // ─── Scroll card (right panel) ────────────────────────────────────────────────
// function ScrollCard({
//   t,
//   isActive,
//   onClick,
// }: {
//   t: Testimonial;
//   isActive: boolean;
//   onClick: () => void;
// }) {
//   const color = DISC_COLOR[t.discipline] ?? 'var(--navy-light)';

//   return (
//     <button
//       onClick={onClick}
//       className='w-full text-left flex items-start gap-3 p-4 outline-none'
//       style={{
//         border: `1px solid ${isActive ? color + '66' : 'var(--border)'}`,
//         background: isActive ? 'var(--obsidian-3)' : 'var(--obsidian-2)',
//         boxShadow: isActive ? `0 0 20px ${color}1a` : 'none',
//         cursor: 'pointer',
//         transition: 'border-color 0.45s ease, background 0.45s ease, box-shadow 0.45s ease',
//         flexShrink: 0,
//       }}
//     >
//       {/* Left active bar */}
//       <span
//         className='mt-1 shrink-0 w-0.5 self-stretch rounded-full'
//         style={{
//           background: color,
//           opacity: isActive ? 1 : 0.2,
//           transition: 'opacity 0.45s ease',
//         }}
//       />

//       <div className='flex flex-col gap-1 min-w-0 flex-1'>
//         {/* Initials + name row */}
//         <div className='flex items-center gap-2'>
//           <span
//             className='inline-flex items-center justify-center w-6 h-6 shrink-0 text-[0.5rem]'
//             style={{
//               fontFamily: 'var(--font-bebas)',
//               letterSpacing: '0.06em',
//               background: isActive ? `${color}18` : 'var(--obsidian-4)',
//               border: `1px solid ${isActive ? color + '55' : 'var(--border)'}`,
//               color: isActive ? color : 'var(--ivory-muted)',
//               transition: 'all 0.45s ease',
//             }}
//           >
//             {t.initials}
//           </span>
//           <p
//             className='text-[0.68rem] font-medium truncate leading-tight'
//             style={{
//               fontFamily: 'var(--font-dm)',
//               color: isActive ? 'var(--ivory)' : 'var(--ivory-dim)',
//               transition: 'color 0.45s ease',
//             }}
//           >
//             {t.name}
//           </p>
//         </div>

//         {/* Discipline chip */}
//         <span
//           className='text-[0.47rem] tracking-[0.22em] uppercase px-1.5 py-0.5 self-start'
//           style={{
//             border: `1px solid ${isActive ? color + '44' : 'var(--border)'}`,
//             color: isActive ? color : 'var(--ivory-muted)',
//             background: isActive ? `${color}0d` : 'transparent',
//             transition: 'all 0.45s ease',
//           }}
//         >
//           {t.discipline}
//         </span>

//         {/* Short preview quote */}
//         <p
//           className='text-[0.57rem] leading-[1.5] line-clamp-2'
//           style={{
//             fontStyle: 'italic',
//             color: 'var(--ivory-muted)',
//             opacity: isActive ? 0.75 : 0.38,
//             transition: 'opacity 0.45s ease',
//           }}
//         >
//           &ldquo;{t.quote.slice(0, 70)}…&rdquo;
//         </p>
//       </div>
//     </button>
//   );
// }

// // ─── Main TestimonialsSection ─────────────────────────────────────────────────
// export function TestimonialsSection() {
//   const COUNT = TESTIMONIALS.length;
//   // Triple the list so we always have content above + below for seamless loop
//   const TRIPLED: Testimonial[] = [
//     ...TESTIMONIALS,
//     ...TESTIMONIALS,
//     ...TESTIMONIALS,
//   ];

//   const CARD_H = 112; // approximate px height of each card
//   const GAP     = 8;
//   const UNIT    = CARD_H + GAP;

//   const [active, setActive]   = useState(0);
//   const [direction, setDirection] = useState(1);
//   const [isPaused, setIsPaused]   = useState(false);

//   const scrollRef   = useRef<HTMLDivElement>(null);
//   const isScrolling = useRef(false); // true while a programmatic scroll is in flight
//   const isManual    = useRef(false); // true after user click, suppresses auto-advance briefly
//   const activeRef   = useRef(active);
//   activeRef.current = active;

//   // ── Place viewport so the "middle" copy of the list is visible ──────────────
//   const resetToMiddle = useCallback(() => {
//     const el = scrollRef.current;
//     if (!el) return;
//     el.scrollTop = COUNT * UNIT;
//   }, [COUNT, UNIT]);

//   // ── Smooth-scroll the middle copy of a given real index into view ────────────
//   const scrollToIndex = useCallback(
//     (realIdx: number) => {
//       const el = scrollRef.current;
//       if (!el) return;
//       isScrolling.current = true;
//       const target = (COUNT + realIdx) * UNIT;
//       el.scrollTo({ top: target, behavior: 'smooth' });
//       // Release lock after transition completes
//       setTimeout(() => { isScrolling.current = false; }, 600);
//     },
//     [COUNT, UNIT],
//   );

//   // ── Detect active card from scroll position ──────────────────────────────────
//   const handleScroll = useCallback(() => {
//     const el = scrollRef.current;
//     if (!el) return;

//     // Seamless loop guard — if we've drifted into first or third copy, jump silently
//     const single = COUNT * UNIT;
//     if (el.scrollTop < single * 0.3) {
//       el.scrollTop += single;
//       return;
//     }
//     if (el.scrollTop > single * 2.2) {
//       el.scrollTop -= single;
//       return;
//     }

//     // Which card is nearest the vertical centre?
//     const centre = el.scrollTop + el.clientHeight / 2;
//     const tripledIdx = Math.round((centre - UNIT / 2) / UNIT);
//     const realIdx = ((tripledIdx % COUNT) + COUNT) % COUNT;

//     if (realIdx !== activeRef.current) {
//       setDirection(realIdx > activeRef.current ? 1 : -1);
//       setActive(realIdx);
//     }
//   }, [COUNT, UNIT]);

//   // ── Auto-advance ─────────────────────────────────────────────────────────────
//   useEffect(() => {
//     resetToMiddle();
//   }, [resetToMiddle]);

//   useEffect(() => {
//     if (isPaused) return;
//     const id = setInterval(() => {
//       if (isManual.current) return;
//       const next = (activeRef.current + 1) % COUNT;
//       setDirection(1);
//       setActive(next);
//       scrollToIndex(next);
//     }, 3800);
//     return () => clearInterval(id);
//   }, [isPaused, COUNT, scrollToIndex]);

//   // ── User-initiated card click ────────────────────────────────────────────────
//   const handleCardClick = (realIdx: number) => {
//     isManual.current = true;
//     setDirection(realIdx > activeRef.current ? 1 : -1);
//     setActive(realIdx);
//     scrollToIndex(realIdx);
//     setTimeout(() => { isManual.current = false; }, 6000);
//   };

//   const current     = TESTIMONIALS[active]!;
//   const accentColor = DISC_COLOR[current.discipline] ?? 'var(--navy-light)';

//   const quoteVariants = {
//     enter:  (d: number) => ({ opacity: 0, y: d > 0 ? 24 : -24, filter: 'blur(6px)' }),
//     center: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] as const } },
//     exit:   (d: number) => ({ opacity: 0, y: d > 0 ? -16 : 16, filter: 'blur(3px)', transition: { duration: 0.28, ease: 'easeIn' as const } }),
//   };

//   return (
//     <section
//       className='relative overflow-hidden py-28'
//       style={{ background: 'var(--obsidian-2)' }}
//     >
//       {/* ── Backgrounds ─────────────────────────────────────────────── */}
//       <div className='absolute inset-0 bg-grid opacity-40 pointer-events-none' aria-hidden />

//       {/* Ghost watermark */}
//       <div
//         className='absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0'
//         aria-hidden
//       >
//         <span
//           style={{
//             fontFamily: 'var(--font-bebas)',
//             fontSize: 'clamp(5rem, 16vw, 13rem)',
//             letterSpacing: '0.06em',
//             color: 'color-mix(in srgb, var(--navy) 3.5%, transparent)',
//             userSelect: 'none',
//             lineHeight: 1,
//             whiteSpace: 'nowrap',
//           }}
//         >
//           TESTIMONIALS
//         </span>
//       </div>

//       <div
//         className='absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[280px] rounded-full blur-[100px] pointer-events-none z-0'
//         style={{ background: 'radial-gradient(ellipse, var(--navy-glow) 0%, transparent 70%)' }}
//         aria-hidden
//       />
//       <div className='absolute inset-x-0 top-0 h-20 z-2 pointer-events-none' style={{ background: 'linear-gradient(to bottom, var(--obsidian-2), transparent)' }} aria-hidden />
//       <div className='absolute inset-x-0 bottom-0 h-20 z-2 pointer-events-none' style={{ background: 'linear-gradient(to top, var(--obsidian-2), transparent)' }} aria-hidden />

//       {/* ── Content ─────────────────────────────────────────────────── */}
//       <div className='relative z-10 max-w-6xl mx-auto px-6 lg:px-16'>

//         {/* Header */}
//         <motion.div
//           className='flex flex-col items-center text-center mb-16'
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className='eyebrow mb-4'>
//             <span className='eyebrow-text'>From The Community</span>
//           </div>
//           <h2
//             style={{
//               fontFamily: 'var(--font-cormorant)',
//               fontSize: 'clamp(2.4rem, 5vw, 4rem)',
//               fontWeight: 300,
//               color: 'var(--ivory)',
//               lineHeight: 1.05,
//             }}
//           >
//             Professionals Who{' '}
//             <em className='italic' style={{ color: 'var(--teal-light)' }}>Showed Up</em>
//             <br className='hidden sm:block' />
//             {' '}&amp; Walked Away Transformed.
//           </h2>
//         </motion.div>

//         {/* ── Two-column layout ────────────────────────────────────── */}
//         <div className='grid lg:grid-cols-[1fr_300px] gap-6 items-stretch'>

//           {/* LEFT — quote card */}
//           <div
//             className='relative flex flex-col'
//             style={{
//               border: '1px solid var(--border)',
//               background: 'var(--obsidian-3)',
//               minHeight: 400,
//             }}
//           >
//             {/* Dynamic accent top border */}
//             <motion.div
//               className='absolute top-0 left-0 right-0 h-px pointer-events-none'
//               animate={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
//               transition={{ duration: 0.6 }}
//             />

//             {/* Corner reticles */}
//             {(
//               ['top-0 left-0 border-t border-l',
//                'top-0 right-0 border-t border-r',
//                'bottom-0 left-0 border-b border-l',
//                'bottom-0 right-0 border-b border-r'] as const
//             ).map((cls, i) => (
//               <motion.span
//                 key={i}
//                 className={`absolute w-4 h-4 pointer-events-none ${cls}`}
//                 animate={{ borderColor: accentColor }}
//                 transition={{ duration: 0.5 }}
//                 style={{ opacity: 0.5 }}
//               />
//             ))}

//             <div className='flex flex-col flex-1 p-8 lg:p-10'>
//               {/* Quote icon */}
//               <motion.div
//                 animate={{ color: accentColor }}
//                 transition={{ duration: 0.5 }}
//                 className='mb-6'
//                 style={{ opacity: 0.5 }}
//               >
//                 <Quote size={28} />
//               </motion.div>

//               {/* Animated quote */}
//               <div className='relative flex-1 mb-8' style={{ minHeight: 168 }}>
//                 <AnimatePresence custom={direction} mode='wait'>
//                   <motion.blockquote
//                     key={current.id}
//                     custom={direction}
//                     variants={quoteVariants}
//                     initial='enter'
//                     animate='center'
//                     exit='exit'
//                     style={{
//                       fontFamily: 'var(--font-cormorant)',
//                       fontSize: 'clamp(1.05rem, 1.6vw, 1.28rem)',
//                       fontWeight: 300,
//                       fontStyle: 'italic',
//                       color: 'var(--ivory)',
//                       lineHeight: 1.8,
//                     }}
//                   >
//                     &ldquo;{current.quote}&rdquo;
//                   </motion.blockquote>
//                 </AnimatePresence>
//               </div>

//               {/* Session tag */}
//               <AnimatePresence mode='wait'>
//                 <motion.div
//                   key={`tag-${current.id}`}
//                   initial={{ opacity: 0, x: -8 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.35 }}
//                   className='flex items-center gap-2 mb-6 flex-wrap'
//                 >
//                   <span
//                     className='text-[0.5rem] tracking-[0.28em] uppercase px-2.5 py-1'
//                     style={{
//                       border: `1px solid ${accentColor}44`,
//                       color: accentColor,
//                       background: `${accentColor}0d`,
//                     }}
//                   >
//                     {current.discipline}
//                   </span>
//                   <span className='text-[0.58rem]' style={{ color: 'var(--ivory-muted)' }}>
//                     · {current.sessionAttended}
//                   </span>
//                 </motion.div>
//               </AnimatePresence>

//               {/* Author */}
//               <AnimatePresence mode='wait'>
//                 <motion.div
//                   key={`auth-${current.id}`}
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.38 }}
//                   className='flex items-center justify-between'
//                 >
//                   <div className='flex items-center gap-3'>
//                     <div
//                       className='flex items-center justify-center w-10 h-10 shrink-0'
//                       style={{
//                         background: `${accentColor}18`,
//                         border: `1px solid ${accentColor}44`,
//                         color: accentColor,
//                         fontFamily: 'var(--font-bebas)',
//                         fontSize: '0.85rem',
//                         letterSpacing: '0.08em',
//                       }}
//                     >
//                       {current.initials}
//                     </div>
//                     <div>
//                       <p
//                         className='text-[0.78rem] font-medium leading-tight'
//                         style={{ color: 'var(--ivory)', fontFamily: 'var(--font-dm)' }}
//                       >
//                         {current.name}
//                       </p>
//                       <p className='text-[0.6rem] leading-tight mt-0.5' style={{ color: 'var(--ivory-muted)' }}>
//                         {current.role} · {current.organisation}
//                       </p>
//                       <p
//                         className='text-[0.55rem] tracking-[0.15em] uppercase mt-0.5'
//                         style={{ color: 'var(--ivory-muted)', opacity: 0.6 }}
//                       >
//                         {current.country}
//                       </p>
//                     </div>
//                   </div>
//                   <Stars color={accentColor} />
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Progress bar */}
//             <div style={{ borderTop: '1px solid var(--border)', padding: '12px 2.5rem' }}>
//               <div className='flex items-center gap-3'>
//                 <span
//                   className='text-[0.5rem] tracking-[0.28em] uppercase tabular shrink-0'
//                   style={{ color: 'var(--ivory-muted)' }}
//                 >
//                   {String(active + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
//                 </span>
//                 <div className='flex-1 h-px relative' style={{ background: 'var(--border)' }}>
//                   <motion.div
//                     className='absolute left-0 top-0 h-full'
//                     animate={{
//                       width: `${((active + 1) / COUNT) * 100}%`,
//                       background: accentColor,
//                     }}
//                     transition={{ duration: 0.5, ease: 'easeOut' }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT — infinite seamless scroll list */}
//           <div
//             className='hidden lg:block relative'
//             style={{ height: 490 }}
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//           >
//             {/* Top fade mask */}
//             <div
//               className='absolute inset-x-0 top-0 h-14 pointer-events-none z-10'
//               style={{
//                 background: 'linear-gradient(to bottom, var(--obsidian-2) 10%, transparent)',
//               }}
//             />
//             {/* Bottom fade mask */}
//             <div
//               className='absolute inset-x-0 bottom-0 h-14 pointer-events-none z-10'
//               style={{
//                 background: 'linear-gradient(to top, var(--obsidian-2) 10%, transparent)',
//               }}
//             />

//             {/* The scrollable column */}
//             <div
//               ref={scrollRef}
//               onScroll={handleScroll}
//               className='h-full overflow-y-scroll no-scrollbar'
//             >
//               <div
//                 className='flex flex-col'
//                 style={{ gap: GAP, padding: `${GAP}px 0` }}
//               >
//                 {TRIPLED.map((t, i) => {
//                   const realIdx = i % COUNT;
//                   return (
//                     <ScrollCard
//                       key={`${t.id}-${Math.floor(i / COUNT)}`}
//                       t={t}
//                       isActive={realIdx === active}
//                       onClick={() => handleCardClick(realIdx)}
//                     />
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile dot indicators */}
//         <div className='flex justify-center gap-1.5 mt-6 lg:hidden'>
//           {TESTIMONIALS.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => handleCardClick(i)}
//               style={{
//                 width: i === active ? 20 : 6,
//                 height: 4,
//                 background: i === active ? 'var(--navy-light)' : 'var(--border-mid)',
//                 border: 'none',
//                 cursor: 'pointer',
//                 transition: 'width 0.3s ease, background 0.3s ease',
//               }}
//               aria-label={`Testimonial ${i + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default TestimonialsSection;
