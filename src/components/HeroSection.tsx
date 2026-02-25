// 'use client';

// import { useEffect, useRef, useState } from 'react';

// // ─── Countdown hook ────────────────────────────────────────────────────────────
// function useCountdown(targetDate: string) {
//   const calculate = () => {
//     const diff = new Date(targetDate).getTime() - Date.now();
//     if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
//     return {
//       days: Math.floor(diff / 86400000),
//       hours: Math.floor((diff % 86400000) / 3600000),
//       minutes: Math.floor((diff % 3600000) / 60000),
//       seconds: Math.floor((diff % 60000) / 1000),
//     };
//   };
//   const [time, setTime] = useState(calculate);
//   useEffect(() => {
//     const t = setInterval(() => setTime(calculate()), 1000);
//     return () => clearInterval(t);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [targetDate]);
//   return time;
// }

// // ─── Animated number ───────────────────────────────────────────────────────────
// function AnimatedNum({ value }: { value: number }) {
//   const [display, setDisplay] = useState(0);
//   useEffect(() => {
//     const duration = 1800;
//     const start = performance.now();
//     const raf = (ts) => {
//       const p = Math.min((ts - start) / duration, 1);
//       const ease = 1 - Math.pow(1 - p, 3);
//       setDisplay(Math.floor(ease * value));
//       if (p < 1) requestAnimationFrame(raf);
//       else setDisplay(value);
//     };
//     const id = requestAnimationFrame(raf);
//     return () => cancelAnimationFrame(id);
//   }, [value]);
//   return <>{display}</>;
// }

// // ─── Canvas particle system ────────────────────────────────────────────────────
// function ParticleCanvas() {
//   const ref = useRef(null);
//   useEffect(() => {
//     const canvas = ref.current;
//     const ctx = canvas.getContext('2d');
//     let W: number, H: number, raf: number;

//     const resize = () => {
//       W = canvas.width = canvas.offsetWidth;
//       H = canvas.height = canvas.offsetHeight;
//     };
//     resize();
//     window.addEventListener('resize', resize);

//     const particles = Array.from({ length: 60 }, () => ({
//       x: Math.random() * W,
//       y: Math.random() * H,
//       r: Math.random() * 1.2 + 0.3,
//       vx: (Math.random() - 0.5) * 0.3,
//       vy: (Math.random() - 0.5) * 0.3,
//       alpha: Math.random() * 0.5 + 0.1,
//       gold: Math.random() > 0.55,
//     }));

//     const draw = () => {
//       ctx.clearRect(0, 0, W, H);
//       particles.forEach((p) => {
//         p.x += p.vx;
//         p.y += p.vy;
//         if (p.x < 0) p.x = W;
//         if (p.x > W) p.x = 0;
//         if (p.y < 0) p.y = H;
//         if (p.y > H) p.y = 0;

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = p.gold
//           ? `rgba(201,168,76,${p.alpha})`
//           : `rgba(0,212,255,${p.alpha * 0.6})`;
//         ctx.fill();
//       });

//       // draw faint connecting lines
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist < 100) {
//             ctx.beginPath();
//             ctx.strokeStyle = `rgba(201,168,76,${0.04 * (1 - dist / 100)})`;
//             ctx.lineWidth = 0.5;
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.stroke();
//           }
//         }
//       }
//       raf = requestAnimationFrame(draw);
//     };
//     draw();
//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener('resize', resize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={ref}
//       className='iegs-hero__canvas'
//       style={{ width: '100%', height: '100%' }}
//     />
//   );
// }

// // ─── Ticker data ──────────────────────────────────────────────────────────────
// const TICKER_ITEMS = [
//   'Global Leaders Summit',
//   'Innovation & Impact',
//   'Executive Roundtables',
//   'Private Networking',
//   'Strategic Insights',
//   'World-Class Speakers',
//   'Exclusive Access',
//   'Limited Seats Available',
// ];

// // ─── Main Hero ────────────────────────────────────────────────────────────────
// export default function IEGSHero() {
//   // Target: 60 days from "now" — computed once on initial mount
//   const [target] = useState(() =>
//     new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString(),
//   );
//   const countdown = useCountdown(target);
//   const pad = (n: number) => String(n).padStart(2, '0');

//   return (
//     <>
//       <section className='iegs-hero'>
//         <ParticleCanvas />
//         <div className='orb orb--gold' />
//         <div className='orb orb--cyan' />
//         <div className='orb orb--mid' />
//         <div className='iegs-hero__lines' />

//         {/* ── Navigation ── */}
//         <nav className='iegs-nav'>
//           <a href='#' className='iegs-nav__logo'>
//             IEGS
//             <span>International Executive Global Summit</span>
//           </a>
//           <ul className='iegs-nav__links'>
//             <li>
//               <a href='#'>Agenda</a>
//             </li>
//             <li>
//               <a href='#'>Speakers</a>
//             </li>
//             <li>
//               <a href='#'>Experience</a>
//             </li>
//             <li>
//               <a href='#'>Partners</a>
//             </li>
//           </ul>
//           <button className='iegs-nav__cta'>Apply for Access</button>
//         </nav>

//         {/* ── Hero grid ── */}
//         <div className='iegs-hero__inner'>
//           {/* Left */}
//           <div className='iegs-hero__left'>
//             <div className='iegs-hero__eyebrow'>
//               <div className='iegs-hero__eyebrow-line' />
//               <span className='iegs-hero__eyebrow-text'>
//                 Exclusive Webinar Series · 2025
//               </span>
//             </div>

//             <h1 className='iegs-hero__title'>
//               Where the
//               <em>World&apos;s Elite</em>
//               <strong>Shape Tomorrow.</strong>
//             </h1>

//             <p className='iegs-hero__subtitle'>
//               An invitation-only gathering of global executives, policymakers,
//               and visionaries — converging to redefine the boundaries of
//               leadership, innovation, and lasting impact.
//             </p>

//             <div className='iegs-hero__actions'>
//               <button className='btn-primary'>
//                 Reserve Your Seat
//                 <span className='arrow'>→</span>
//               </button>
//               <button className='btn-ghost'>▶ &nbsp;Watch Highlights</button>
//             </div>

//             <div className='iegs-hero__stats'>
//               <div className='stat-item'>
//                 <div className='stat-number'>
//                   <AnimatedNum value={120} />+
//                 </div>
//                 <div className='stat-label'>Global Leaders</div>
//               </div>
//               <div className='stat-item'>
//                 <div className='stat-number'>
//                   <AnimatedNum value={38} />
//                 </div>
//                 <div className='stat-label'>Countries</div>
//               </div>
//               <div className='stat-item'>
//                 <div className='stat-number'>
//                   <AnimatedNum value={6} />
//                 </div>
//                 <div className='stat-label'>Keynote Sessions</div>
//               </div>
//             </div>
//           </div>

//           {/* Right */}
//           <div className='iegs-hero__right'>
//             {/* Featured Event */}
//             <div className='event-card'>
//               <div className='event-card__badge'>
//                 <span className='dot' />
//                 Now Open · Registration
//               </div>
//               <div className='event-card__title'>
//                 The Future of Global Leadership &amp; Strategic Innovation
//               </div>
//               <div className='event-card__meta'>
//                 <div className='event-card__meta-row'>
//                   <span className='event-card__meta-icon'>◷</span>
//                   Thursday, 15 May 2025 &nbsp;·&nbsp; 10:00 AM GMT
//                 </div>
//                 <div className='event-card__meta-row'>
//                   <span className='event-card__meta-icon'>◈</span>
//                   Live Webinar + Private Breakout Rooms
//                 </div>
//                 <div className='event-card__meta-row'>
//                   <span className='event-card__meta-icon'>◆</span>
//                   By Invitation &amp; Application Only
//                 </div>
//               </div>
//               <div className='event-card__speakers'>
//                 <div className='speaker-avatars'>
//                   {['AK', 'SM', 'RO', 'LB'].map((init, i) => (
//                     <div key={i} className='speaker-avatar'>
//                       {init}
//                     </div>
//                   ))}
//                 </div>
//                 <div className='speaker-info'>
//                   <strong>12 Featured Speakers</strong>
//                   C-Suite Executives, Ministers &amp; Global Innovators
//                 </div>
//               </div>
//             </div>

//             {/* Countdown */}
//             <div className='countdown-card'>
//               <div className='countdown-label'>⬡ &nbsp;Event Begins In</div>
//               <div className='countdown-units'>
//                 {[
//                   ['days', countdown.days] as const,
//                   ['hours', countdown.hours] as const,
//                   ['minutes', countdown.minutes] as const,
//                   ['seconds', countdown.seconds] as const,
//                 ].map(([label, val]) => (
//                   <div key={label} className='countdown-unit'>
//                     <span className='countdown-num'>{pad(val)}</span>
//                     <span className='countdown-unit-label'>{label}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Second event teaser */}
//             <div className='event-card'>
//               <div
//                 className='event-card__badge'
//                 style={{
//                   color: 'var(--gold)',
//                   borderColor: 'rgba(201,168,76,0.25)',
//                   background: 'rgba(201,168,76,0.06)',
//                 }}
//               >
//                 <span className='dot' style={{ background: 'var(--gold)' }} />
//                 Upcoming · June Series
//               </div>
//               <div className='event-card__title'>
//                 Geopolitics, Capital &amp; the New Economic Order
//               </div>
//               <div className='event-card__meta'>
//                 <div className='event-card__meta-row'>
//                   <span className='event-card__meta-icon'>◷</span>
//                   Wednesday, 18 June 2025 &nbsp;·&nbsp; 2:00 PM GMT
//                 </div>
//                 <div className='event-card__meta-row'>
//                   <span className='event-card__meta-icon'>◈</span>
//                   Executive Panel + Q&amp;A
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Ticker */}
//         <div className='iegs-ticker'>
//           <div className='iegs-ticker__track'>
//             {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
//               <span key={i} className='iegs-ticker__item'>
//                 {item}
//                 <span className='sep'>◆</span>
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
