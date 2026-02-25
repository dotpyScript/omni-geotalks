// "use client";

// import { useEffect, useRef, useState } from "react";

// // ─── Inline styles (no Tailwind dependency for portability) ───────────────────
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   :root {
//     --obsidian: #080a0f;
//     --obsidian-2: #0d1118;
//     --obsidian-3: #12161f;
//     --gold: #c9a84c;
//     --gold-light: #e8c97e;
//     --gold-pale: #f5e6c0;
//     --cyan: #00d4ff;
//     --cyan-dim: rgba(0,212,255,0.12);
//     --ivory: #f0ede6;
//     --ivory-dim: rgba(240,237,230,0.55);
//     --ivory-muted: rgba(240,237,230,0.3);
//     --border: rgba(201,168,76,0.18);
//     --border-bright: rgba(201,168,76,0.45);
//   }

//   .iegs-hero {
//     position: relative;
//     min-height: 100vh;
//     background: var(--obsidian);
//     overflow: hidden;
//     font-family: 'DM Sans', sans-serif;
//     color: var(--ivory);
//   }

//   /* ── Animated Background Canvas ── */
//   .iegs-hero__canvas {
//     position: absolute;
//     inset: 0;
//     pointer-events: none;
//     z-index: 0;
//   }

//   /* ── Noise grain overlay ── */
//   .iegs-hero::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
//     background-size: 180px;
//     opacity: 0.4;
//     z-index: 1;
//     pointer-events: none;
//   }

//   /* ── Gold horizontal rule lines ── */
//   .iegs-hero__lines {
//     position: absolute;
//     inset: 0;
//     z-index: 1;
//     pointer-events: none;
//     overflow: hidden;
//   }
//   .iegs-hero__lines::before,
//   .iegs-hero__lines::after {
//     content: '';
//     position: absolute;
//     left: 0; right: 0;
//     height: 1px;
//     background: linear-gradient(90deg, transparent, var(--gold), transparent);
//     opacity: 0.25;
//   }
//   .iegs-hero__lines::before { top: 88px; }
//   .iegs-hero__lines::after { bottom: 120px; }

//   /* ── Glowing orbs ── */
//   .orb {
//     position: absolute;
//     border-radius: 50%;
//     filter: blur(80px);
//     pointer-events: none;
//     animation: orbFloat 12s ease-in-out infinite;
//   }
//   .orb--gold {
//     width: 520px; height: 520px;
//     background: radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%);
//     top: -120px; right: -80px;
//     animation-delay: 0s;
//   }
//   .orb--cyan {
//     width: 380px; height: 380px;
//     background: radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%);
//     bottom: 80px; left: -60px;
//     animation-delay: -5s;
//   }
//   .orb--mid {
//     width: 260px; height: 260px;
//     background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
//     top: 50%; left: 40%;
//     animation-delay: -8s;
//   }
//   @keyframes orbFloat {
//     0%, 100% { transform: translateY(0px) scale(1); }
//     50% { transform: translateY(-40px) scale(1.05); }
//   }

//   /* ── NAV ── */
//   .iegs-nav {
//     position: relative;
//     z-index: 10;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 28px 60px;
//     border-bottom: 1px solid var(--border);
//     animation: fadeDown 0.8s ease both;
//   }
//   @keyframes fadeDown {
//     from { opacity: 0; transform: translateY(-16px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .iegs-nav__logo {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 1.5rem;
//     letter-spacing: 0.18em;
//     color: var(--gold-light);
//     text-decoration: none;
//   }
//   .iegs-nav__logo span {
//     color: var(--ivory-dim);
//     font-family: 'DM Sans', sans-serif;
//     font-size: 0.65rem;
//     font-weight: 300;
//     letter-spacing: 0.3em;
//     display: block;
//     margin-top: -2px;
//   }

//   .iegs-nav__links {
//     display: flex;
//     gap: 40px;
//     list-style: none;
//   }
//   .iegs-nav__links a {
//     font-size: 0.78rem;
//     letter-spacing: 0.15em;
//     text-transform: uppercase;
//     color: var(--ivory-dim);
//     text-decoration: none;
//     transition: color 0.3s;
//     position: relative;
//   }
//   .iegs-nav__links a::after {
//     content: '';
//     position: absolute;
//     bottom: -3px; left: 0;
//     width: 0; height: 1px;
//     background: var(--gold);
//     transition: width 0.3s ease;
//   }
//   .iegs-nav__links a:hover { color: var(--gold-light); }
//   .iegs-nav__links a:hover::after { width: 100%; }

//   .iegs-nav__cta {
//     font-size: 0.75rem;
//     letter-spacing: 0.18em;
//     text-transform: uppercase;
//     color: var(--obsidian);
//     background: linear-gradient(135deg, var(--gold), var(--gold-light));
//     border: none;
//     padding: 12px 28px;
//     cursor: pointer;
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 500;
//     clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
//     transition: all 0.3s ease;
//     position: relative;
//   }
//   .iegs-nav__cta:hover {
//     background: linear-gradient(135deg, var(--gold-light), var(--gold-pale));
//     transform: translateY(-1px);
//     box-shadow: 0 8px 28px rgba(201,168,76,0.35);
//   }

//   /* ── HERO CONTENT ── */
//   .iegs-hero__inner {
//     position: relative;
//     z-index: 5;
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 0;
//     align-items: center;
//     min-height: calc(100vh - 89px);
//     padding: 0 60px;
//   }

//   /* ── Left column ── */
//   .iegs-hero__left {
//     padding: 80px 60px 80px 0;
//   }

//   .iegs-hero__eyebrow {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     margin-bottom: 32px;
//     animation: fadeUp 0.9s ease 0.2s both;
//   }
//   .iegs-hero__eyebrow-line {
//     width: 40px; height: 1px;
//     background: linear-gradient(90deg, transparent, var(--gold));
//   }
//   .iegs-hero__eyebrow-text {
//     font-size: 0.7rem;
//     letter-spacing: 0.35em;
//     text-transform: uppercase;
//     color: var(--gold);
//     font-weight: 400;
//   }

//   .iegs-hero__title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: clamp(3.2rem, 5.5vw, 5.5rem);
//     font-weight: 300;
//     line-height: 1.06;
//     letter-spacing: -0.01em;
//     color: var(--ivory);
//     margin-bottom: 10px;
//     animation: fadeUp 0.9s ease 0.35s both;
//   }
//   .iegs-hero__title em {
//     font-style: italic;
//     color: var(--gold-light);
//     display: block;
//   }
//   .iegs-hero__title strong {
//     font-weight: 600;
//     display: block;
//   }

//   .iegs-hero__subtitle {
//     font-size: clamp(1rem, 1.6vw, 1.25rem);
//     font-weight: 300;
//     color: var(--ivory-dim);
//     line-height: 1.6;
//     max-width: 460px;
//     margin: 28px 0 48px;
//     animation: fadeUp 0.9s ease 0.5s both;
//   }

//   .iegs-hero__actions {
//     display: flex;
//     align-items: center;
//     gap: 24px;
//     animation: fadeUp 0.9s ease 0.65s both;
//   }

//   .btn-primary {
//     display: inline-flex;
//     align-items: center;
//     gap: 12px;
//     font-size: 0.8rem;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     color: var(--obsidian);
//     background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
//     padding: 18px 38px;
//     border: none;
//     cursor: pointer;
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 500;
//     clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
//     transition: all 0.35s ease;
//     position: relative;
//     overflow: hidden;
//   }
//   .btn-primary::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(135deg, rgba(255,255,255,0.25), transparent);
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .btn-primary:hover::before { opacity: 1; }
//   .btn-primary:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 14px 40px rgba(201,168,76,0.4);
//   }
//   .btn-primary .arrow {
//     font-size: 1rem;
//     transition: transform 0.3s ease;
//   }
//   .btn-primary:hover .arrow { transform: translateX(4px); }

//   .btn-ghost {
//     display: inline-flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 0.78rem;
//     letter-spacing: 0.15em;
//     text-transform: uppercase;
//     color: var(--ivory-dim);
//     background: transparent;
//     border: 1px solid var(--border);
//     padding: 17px 32px;
//     cursor: pointer;
//     font-family: 'DM Sans', sans-serif;
//     transition: all 0.3s ease;
//   }
//   .btn-ghost:hover {
//     border-color: var(--border-bright);
//     color: var(--ivory);
//     background: rgba(201,168,76,0.05);
//   }

//   /* ── Stats bar ── */
//   .iegs-hero__stats {
//     display: flex;
//     gap: 0;
//     margin-top: 64px;
//     border-top: 1px solid var(--border);
//     padding-top: 32px;
//     animation: fadeUp 0.9s ease 0.8s both;
//   }
//   .stat-item {
//     flex: 1;
//     padding-right: 32px;
//     border-right: 1px solid var(--border);
//   }
//   .stat-item:last-child { border-right: none; padding-right: 0; padding-left: 32px; }
//   .stat-item:not(:first-child) { padding-left: 32px; }
//   .stat-number {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 2.4rem;
//     letter-spacing: 0.05em;
//     color: var(--gold-light);
//     line-height: 1;
//   }
//   .stat-label {
//     font-size: 0.68rem;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     color: var(--ivory-muted);
//     margin-top: 6px;
//     font-weight: 300;
//   }

//   /* ── Right column ── */
//   .iegs-hero__right {
//     position: relative;
//     padding: 80px 0 80px 60px;
//     border-left: 1px solid var(--border);
//     display: flex;
//     flex-direction: column;
//     gap: 24px;
//     animation: fadeLeft 1s ease 0.4s both;
//   }
//   @keyframes fadeLeft {
//     from { opacity: 0; transform: translateX(40px); }
//     to   { opacity: 1; transform: translateX(0); }
//   }
//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(24px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   /* ── Event card ── */
//   .event-card {
//     background: linear-gradient(135deg, var(--obsidian-2) 0%, var(--obsidian-3) 100%);
//     border: 1px solid var(--border);
//     padding: 32px;
//     position: relative;
//     overflow: hidden;
//     transition: border-color 0.3s, transform 0.3s;
//   }
//   .event-card::before {
//     content: '';
//     position: absolute;
//     top: 0; left: 0;
//     width: 3px; height: 100%;
//     background: linear-gradient(180deg, var(--gold), transparent);
//   }
//   .event-card:hover {
//     border-color: var(--border-bright);
//     transform: translateX(4px);
//   }

//   .event-card__badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     font-size: 0.65rem;
//     letter-spacing: 0.25em;
//     text-transform: uppercase;
//     color: var(--cyan);
//     border: 1px solid rgba(0,212,255,0.25);
//     padding: 5px 12px;
//     margin-bottom: 18px;
//     background: var(--cyan-dim);
//   }
//   .event-card__badge .dot {
//     width: 5px; height: 5px;
//     background: var(--cyan);
//     border-radius: 50%;
//     animation: pulse 2s infinite;
//   }
//   @keyframes pulse {
//     0%, 100% { opacity: 1; transform: scale(1); }
//     50% { opacity: 0.4; transform: scale(0.8); }
//   }

//   .event-card__title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.55rem;
//     font-weight: 400;
//     color: var(--ivory);
//     line-height: 1.25;
//     margin-bottom: 12px;
//   }

//   .event-card__meta {
//     font-size: 0.72rem;
//     color: var(--ivory-dim);
//     letter-spacing: 0.08em;
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//   }
//   .event-card__meta-row {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }
//   .event-card__meta-icon { color: var(--gold); font-size: 0.85rem; }

//   .event-card__speakers {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     margin-top: 22px;
//     padding-top: 22px;
//     border-top: 1px solid var(--border);
//   }
//   .speaker-avatars {
//     display: flex;
//   }
//   .speaker-avatar {
//     width: 36px; height: 36px;
//     border-radius: 50%;
//     border: 2px solid var(--obsidian);
//     background: linear-gradient(135deg, var(--obsidian-3), var(--obsidian-2));
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 0.7rem;
//     color: var(--gold-light);
//     font-family: 'Cormorant Garamond', serif;
//     font-weight: 600;
//     margin-left: -8px;
//     position: relative;
//     overflow: hidden;
//   }
//   .speaker-avatar:first-child { margin-left: 0; }
//   .speaker-avatar img {
//     width: 100%; height: 100%;
//     object-fit: cover;
//     border-radius: 50%;
//   }
//   .speaker-info {
//     font-size: 0.68rem;
//     color: var(--ivory-muted);
//     letter-spacing: 0.05em;
//   }
//   .speaker-info strong {
//     display: block;
//     color: var(--ivory-dim);
//     font-weight: 400;
//     margin-bottom: 2px;
//   }

//   /* ── Countdown ── */
//   .countdown-card {
//     background: linear-gradient(135deg, rgba(201,168,76,0.06), rgba(201,168,76,0.02));
//     border: 1px solid var(--border);
//     padding: 26px 32px;
//   }
//   .countdown-label {
//     font-size: 0.65rem;
//     letter-spacing: 0.28em;
//     text-transform: uppercase;
//     color: var(--gold);
//     margin-bottom: 18px;
//   }
//   .countdown-units {
//     display: flex;
//     gap: 0;
//   }
//   .countdown-unit {
//     flex: 1;
//     text-align: center;
//     border-right: 1px solid var(--border);
//     padding: 0 12px;
//   }
//   .countdown-unit:first-child { padding-left: 0; }
//   .countdown-unit:last-child { border-right: none; }
//   .countdown-num {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 2.8rem;
//     letter-spacing: 0.05em;
//     color: var(--ivory);
//     line-height: 1;
//     display: block;
//   }
//   .countdown-unit-label {
//     font-size: 0.6rem;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     color: var(--ivory-muted);
//     margin-top: 6px;
//     display: block;
//   }

//   /* ── Marquee ticker ── */
//   .iegs-ticker {
//     position: relative;
//     z-index: 5;
//     background: linear-gradient(90deg, var(--obsidian), var(--obsidian-2), var(--obsidian));
//     border-top: 1px solid var(--border);
//     border-bottom: 1px solid var(--border);
//     padding: 14px 0;
//     overflow: hidden;
//   }
//   .iegs-ticker__track {
//     display: flex;
//     gap: 0;
//     animation: marquee 28s linear infinite;
//     white-space: nowrap;
//   }
//   .iegs-ticker__item {
//     display: inline-flex;
//     align-items: center;
//     gap: 16px;
//     padding: 0 32px;
//     font-size: 0.7rem;
//     letter-spacing: 0.22em;
//     text-transform: uppercase;
//     color: var(--ivory-muted);
//   }
//   .iegs-ticker__item .sep {
//     color: var(--gold);
//     font-size: 1rem;
//   }
//   @keyframes marquee {
//     from { transform: translateX(0); }
//     to   { transform: translateX(-50%); }
//   }

//   /* ── Responsive ── */
//   @media (max-width: 960px) {
//     .iegs-nav { padding: 22px 28px; }
//     .iegs-nav__links { display: none; }
//     .iegs-hero__inner {
//       grid-template-columns: 1fr;
//       padding: 0 28px;
//     }
//     .iegs-hero__left { padding: 60px 0 40px; }
//     .iegs-hero__right {
//       padding: 0 0 60px;
//       border-left: none;
//       border-top: 1px solid var(--border);
//     }
//     .iegs-hero__stats { gap: 16px; }
//   }
// `;

// // ─── Countdown hook ────────────────────────────────────────────────────────────
// function useCountdown(targetDate) {
//   const calculate = () => {
//     const diff = new Date(targetDate) - new Date();
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
//   }, []);
//   return time;
// }

// // ─── Animated number ───────────────────────────────────────────────────────────
// function AnimatedNum({ value }) {
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
//     const ctx = canvas.getContext("2d");
//     let W, H, particles, raf;

//     const resize = () => {
//       W = canvas.width = canvas.offsetWidth;
//       H = canvas.height = canvas.offsetHeight;
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     particles = Array.from({ length: 60 }, () => ({
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
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={ref}
//       className="iegs-hero__canvas"
//       style={{ width: "100%", height: "100%" }}
//     />
//   );
// }

// // ─── Ticker data ──────────────────────────────────────────────────────────────
// const TICKER_ITEMS = [
//   "Global Leaders Summit",
//   "Innovation & Impact",
//   "Executive Roundtables",
//   "Private Networking",
//   "Strategic Insights",
//   "World-Class Speakers",
//   "Exclusive Access",
//   "Limited Seats Available",
// ];

// // ─── Main Hero ────────────────────────────────────────────────────────────────
// export default function IEGSHero() {
//   // Target: 60 days from "now" at render time
//   const target = new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString();
//   const countdown = useCountdown(target);
//   const pad = (n) => String(n).padStart(2, "0");

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: styles }} />

//       <section className="iegs-hero">
//         <ParticleCanvas />
//         <div className="orb orb--gold" />
//         <div className="orb orb--cyan" />
//         <div className="orb orb--mid" />
//         <div className="iegs-hero__lines" />

//         {/* ── Navigation ── */}
//         <nav className="iegs-nav">
//           <a href="#" className="iegs-nav__logo">
//             IEGS
//             <span>International Executive Global Summit</span>
//           </a>
//           <ul className="iegs-nav__links">
//             <li><a href="#">Agenda</a></li>
//             <li><a href="#">Speakers</a></li>
//             <li><a href="#">Experience</a></li>
//             <li><a href="#">Partners</a></li>
//           </ul>
//           <button className="iegs-nav__cta">Apply for Access</button>
//         </nav>

//         {/* ── Hero grid ── */}
//         <div className="iegs-hero__inner">

//           {/* Left */}
//           <div className="iegs-hero__left">
//             <div className="iegs-hero__eyebrow">
//               <div className="iegs-hero__eyebrow-line" />
//               <span className="iegs-hero__eyebrow-text">
//                 Exclusive Webinar Series · 2025
//               </span>
//             </div>

//             <h1 className="iegs-hero__title">
//               Where the
//               <em>World's Elite</em>
//               <strong>Shape Tomorrow.</strong>
//             </h1>

//             <p className="iegs-hero__subtitle">
//               An invitation-only gathering of global executives, policymakers,
//               and visionaries — converging to redefine the boundaries of leadership,
//               innovation, and lasting impact.
//             </p>

//             <div className="iegs-hero__actions">
//               <button className="btn-primary">
//                 Reserve Your Seat
//                 <span className="arrow">→</span>
//               </button>
//               <button className="btn-ghost">
//                 ▶ &nbsp;Watch Highlights
//               </button>
//             </div>

//             <div className="iegs-hero__stats">
//               <div className="stat-item">
//                 <div className="stat-number">
//                   <AnimatedNum value={120} />+
//                 </div>
//                 <div className="stat-label">Global Leaders</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-number">
//                   <AnimatedNum value={38} />
//                 </div>
//                 <div className="stat-label">Countries</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-number">
//                   <AnimatedNum value={6} />
//                 </div>
//                 <div className="stat-label">Keynote Sessions</div>
//               </div>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="iegs-hero__right">

//             {/* Featured Event */}
//             <div className="event-card">
//               <div className="event-card__badge">
//                 <span className="dot" />
//                 Now Open · Registration
//               </div>
//               <div className="event-card__title">
//                 The Future of Global Leadership &amp; Strategic Innovation
//               </div>
//               <div className="event-card__meta">
//                 <div className="event-card__meta-row">
//                   <span className="event-card__meta-icon">◷</span>
//                   Thursday, 15 May 2025 &nbsp;·&nbsp; 10:00 AM GMT
//                 </div>
//                 <div className="event-card__meta-row">
//                   <span className="event-card__meta-icon">◈</span>
//                   Live Webinar + Private Breakout Rooms
//                 </div>
//                 <div className="event-card__meta-row">
//                   <span className="event-card__meta-icon">◆</span>
//                   By Invitation &amp; Application Only
//                 </div>
//               </div>
//               <div className="event-card__speakers">
//                 <div className="speaker-avatars">
//                   {["AK", "SM", "RO", "LB"].map((init, i) => (
//                     <div key={i} className="speaker-avatar">{init}</div>
//                   ))}
//                 </div>
//                 <div className="speaker-info">
//                   <strong>12 Featured Speakers</strong>
//                   C-Suite Executives, Ministers &amp; Global Innovators
//                 </div>
//               </div>
//             </div>

//             {/* Countdown */}
//             <div className="countdown-card">
//               <div className="countdown-label">⬡ &nbsp;Event Begins In</div>
//               <div className="countdown-units">
//                 {[
//                   ["days", countdown.days],
//                   ["hours", countdown.hours],
//                   ["minutes", countdown.minutes],
//                   ["seconds", countdown.seconds],
//                 ].map(([label, val]) => (
//                   <div key={label} className="countdown-unit">
//                     <span className="countdown-num">{pad(val)}</span>
//                     <span className="countdown-unit-label">{label}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Second event teaser */}
//             <div className="event-card">
//               <div className="event-card__badge" style={{ color: "var(--gold)", borderColor: "rgba(201,168,76,0.25)", background: "rgba(201,168,76,0.06)" }}>
//                 <span className="dot" style={{ background: "var(--gold)" }} />
//                 Upcoming · June Series
//               </div>
//               <div className="event-card__title">
//                 Geopolitics, Capital &amp; the New Economic Order
//               </div>
//               <div className="event-card__meta">
//                 <div className="event-card__meta-row">
//                   <span className="event-card__meta-icon">◷</span>
//                   Wednesday, 18 June 2025 &nbsp;·&nbsp; 2:00 PM GMT
//                 </div>
//                 <div className="event-card__meta-row">
//                   <span className="event-card__meta-icon">◈</span>
//                   Executive Panel + Q&amp;A
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* Ticker */}
//         <div className="iegs-ticker">
//           <div className="iegs-ticker__track">
//             {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
//               <span key={i} className="iegs-ticker__item">
//                 {item}
//                 <span className="sep">◆</span>
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
