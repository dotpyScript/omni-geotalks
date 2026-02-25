// "use client";

// import { useState, useEffect, useRef } from "react";

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Bebas+Neue&display=swap');

//   :root {
//     --obsidian:    #080a0f;
//     --obsidian-2:  #0d1118;
//     --obsidian-3:  #12161f;
//     --obsidian-4:  #181d28;
//     --gold:        #c9a84c;
//     --gold-light:  #e8c97e;
//     --gold-pale:   #f5e6c0;
//     --gold-dim:    rgba(201,168,76,0.10);
//     --gold-glow:   rgba(201,168,76,0.22);
//     --cyan:        #00d4ff;
//     --cyan-dim:    rgba(0,212,255,0.08);
//     --ivory:       #f0ede6;
//     --ivory-dim:   rgba(240,237,230,0.55);
//     --ivory-muted: rgba(240,237,230,0.28);
//     --border:      rgba(201,168,76,0.14);
//     --border-mid:  rgba(201,168,76,0.30);
//     --border-hi:   rgba(201,168,76,0.55);
//   }

//   .cat-section {
//     position: relative;
//     background: var(--obsidian-2);
//     font-family: 'DM Sans', sans-serif;
//     color: var(--ivory);
//     padding: 120px 60px 130px;
//     overflow: hidden;
//   }
//   .cat-section::before {
//     content: '';
//     position: absolute;
//     top: -200px; right: -300px;
//     width: 700px; height: 700px;
//     background: radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 65%);
//     pointer-events: none; z-index: 0;
//   }
//   .cat-section::after {
//     content: '';
//     position: absolute;
//     bottom: -100px; left: -200px;
//     width: 500px; height: 500px;
//     background: radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 65%);
//     pointer-events: none; z-index: 0;
//   }

//   .cat-bg-lines {
//     position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
//   }
//   .cat-bg-lines span {
//     position: absolute; top: 0; bottom: 0; width: 1px;
//     background: linear-gradient(180deg, transparent, rgba(201,168,76,0.06), transparent);
//   }

//   /* ── Header ── */
//   .cat-header {
//     position: relative; z-index: 2;
//     display: grid; grid-template-columns: 1fr 1fr;
//     gap: 40px; align-items: end; margin-bottom: 70px;
//   }
//   .cat-eyebrow { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
//   .cat-eyebrow__line { width: 32px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold)); }
//   .cat-eyebrow__text { font-size: 0.68rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); }
//   .cat-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: clamp(2.4rem, 4vw, 3.8rem);
//     font-weight: 300; line-height: 1.06; color: var(--ivory);
//   }
//   .cat-title em { font-style: italic; color: var(--gold-light); }
//   .cat-subtitle {
//     font-size: 0.88rem; line-height: 1.7;
//     color: var(--ivory-dim); font-weight: 300; max-width: 400px;
//   }

//   /* ── Main grid ── */
//   .cat-grid {
//     position: relative; z-index: 2;
//     display: grid;
//     grid-template-columns: 1.6fr 1fr 1fr;
//     grid-template-rows: auto auto;
//     gap: 2px;
//   }

//   /* ── Card base ── */
//   .cat-card {
//     position: relative; overflow: hidden; cursor: pointer;
//     background: var(--obsidian-3); border: 1px solid var(--border);
//     transition: border-color 0.35s, box-shadow 0.35s;
//     display: flex; flex-direction: column; justify-content: flex-end;
//     min-height: 280px;
//     animation: catReveal 0.6s ease both;
//   }
//   .cat-card:hover {
//     border-color: var(--border-mid);
//     box-shadow: inset 0 0 60px rgba(201,168,76,0.05), 0 0 0 1px var(--border-mid);
//     z-index: 3;
//   }
//   .cat-card--featured { grid-row: 1 / 3; min-height: 580px; }
//   .cat-card:nth-child(2) { animation-delay: 0.08s; }
//   .cat-card:nth-child(3) { animation-delay: 0.14s; }
//   .cat-card:nth-child(4) { animation-delay: 0.18s; }
//   .cat-card:nth-child(5) { animation-delay: 0.22s; }
//   .cat-card:nth-child(6) { animation-delay: 0.26s; }

//   @keyframes catReveal {
//     from { opacity: 0; transform: translateY(28px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .cat-card__bg {
//     position: absolute; inset: 0; z-index: 0;
//     transition: transform 0.6s ease, opacity 0.4s ease;
//   }
//   .cat-card:hover .cat-card__bg { transform: scale(1.06); opacity: 0.85; }

//   .cat-card__overlay {
//     position: absolute; inset: 0; z-index: 1;
//     background: linear-gradient(180deg, rgba(8,10,15,0.1) 0%, rgba(8,10,15,0.35) 40%, rgba(8,10,15,0.88) 80%, rgba(8,10,15,0.97) 100%);
//     transition: background 0.35s;
//   }
//   .cat-card:hover .cat-card__overlay {
//     background: linear-gradient(180deg, rgba(8,10,15,0.05) 0%, rgba(8,10,15,0.2) 35%, rgba(8,10,15,0.82) 75%, rgba(8,10,15,0.96) 100%);
//   }

//   .cat-card__corner {
//     position: absolute; top: 18px; right: 18px; z-index: 3;
//     width: 22px; height: 22px;
//     border-top: 1px solid var(--border-mid); border-right: 1px solid var(--border-mid);
//     opacity: 0; transform: scale(0.7);
//     transition: opacity 0.3s, transform 0.3s;
//   }
//   .cat-card__corner-bl {
//     position: absolute; bottom: 0; left: 0; z-index: 3;
//     width: 22px; height: 22px;
//     border-bottom: 1px solid var(--border-mid); border-left: 1px solid var(--border-mid);
//     opacity: 0; transform: scale(0.7);
//     transition: opacity 0.3s 0.05s, transform 0.3s 0.05s;
//   }
//   .cat-card:hover .cat-card__corner,
//   .cat-card:hover .cat-card__corner-bl { opacity: 1; transform: scale(1); }

//   .cat-card__icon-wrap {
//     position: absolute; top: 28px; left: 28px; z-index: 3;
//     width: 52px; height: 52px;
//     display: flex; align-items: center; justify-content: center;
//     border: 1px solid var(--border);
//     background: rgba(8,10,15,0.6); backdrop-filter: blur(8px);
//     transition: border-color 0.3s, background 0.3s, transform 0.3s;
//   }
//   .cat-card--featured .cat-card__icon-wrap { width: 64px; height: 64px; top: 36px; left: 36px; }
//   .cat-card:hover .cat-card__icon-wrap {
//     border-color: var(--border-mid); background: rgba(201,168,76,0.08); transform: scale(1.08);
//   }
//   .cat-card__icon-wrap svg { width: 26px; height: 26px; transition: stroke 0.3s; }
//   .cat-card--featured .cat-card__icon-wrap svg { width: 32px; height: 32px; }
//   .cat-card:hover .cat-card__icon-wrap svg { stroke: var(--gold-light) !important; }

//   .cat-card__num {
//     position: absolute; top: 28px; right: 28px; z-index: 3;
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 1rem; letter-spacing: 0.1em; color: var(--ivory-muted);
//     transition: color 0.3s;
//   }
//   .cat-card:hover .cat-card__num { color: var(--gold); }

//   .cat-card__content { position: relative; z-index: 3; padding: 28px; }
//   .cat-card--featured .cat-card__content { padding: 36px; }

//   .cat-card__tag {
//     display: inline-block; font-size: 0.6rem; letter-spacing: 0.25em;
//     text-transform: uppercase; color: var(--gold);
//     border: 1px solid var(--border); padding: 4px 10px; margin-bottom: 14px;
//     background: rgba(8,10,15,0.5); backdrop-filter: blur(6px);
//   }

//   .cat-card__name {
//     font-family: 'Cormorant Garamond', serif; font-weight: 400;
//     line-height: 1.15; color: var(--ivory); margin-bottom: 10px;
//     transition: color 0.3s; font-size: 1.5rem;
//   }
//   .cat-card--featured .cat-card__name { font-size: 2.4rem; font-weight: 300; margin-bottom: 14px; }
//   .cat-card:hover .cat-card__name { color: var(--gold-pale); }

//   .cat-card__desc {
//     font-size: 0.76rem; line-height: 1.65; color: var(--ivory-muted); font-weight: 300;
//     max-height: 0; overflow: hidden; opacity: 0;
//     transition: max-height 0.4s ease, opacity 0.35s ease, margin 0.3s ease;
//   }
//   .cat-card--featured .cat-card__desc { max-height: none; opacity: 1; font-size: 0.82rem; }
//   .cat-card:hover .cat-card__desc { max-height: 120px; opacity: 1; margin-bottom: 4px; }

//   .cat-card__stats {
//     display: flex; align-items: center; gap: 20px;
//     margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--border);
//   }
//   .cat-stat { display: flex; flex-direction: column; gap: 3px; }
//   .cat-stat__num {
//     font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem;
//     letter-spacing: 0.05em; color: var(--gold-light); line-height: 1;
//   }
//   .cat-card--featured .cat-stat__num { font-size: 1.8rem; }
//   .cat-stat__label { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ivory-muted); }

//   .cat-card__arrow {
//     display: inline-flex; align-items: center; gap: 8px;
//     font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold);
//     margin-top: 20px; opacity: 0; transform: translateX(-10px);
//     transition: opacity 0.3s 0.05s, transform 0.3s 0.05s;
//   }
//   .cat-card--featured .cat-card__arrow { opacity: 1; transform: none; }
//   .cat-card:hover .cat-card__arrow { opacity: 1; transform: translateX(0); }
//   .cat-card__arrow .arr { transition: transform 0.25s; }
//   .cat-card:hover .cat-card__arrow .arr { transform: translateX(5px); }

//   /* ── Bottom strip ── */
//   .cat-strip {
//     position: relative; z-index: 2; margin-top: 2px;
//     display: grid; grid-template-columns: repeat(6, 1fr);
//     border: 1px solid var(--border); border-top: none;
//   }
//   .cat-strip__item {
//     display: flex; align-items: center; justify-content: center;
//     flex-direction: column; gap: 6px; padding: 22px 16px;
//     border-right: 1px solid var(--border); cursor: pointer;
//     transition: background 0.25s; position: relative; overflow: hidden;
//   }
//   .cat-strip__item:last-child { border-right: none; }
//   .cat-strip__item::before {
//     content: ''; position: absolute; bottom: 0; left: 0; right: 0;
//     height: 2px; background: var(--gold);
//     transform: scaleX(0); transition: transform 0.3s ease;
//   }
//   .cat-strip__item:hover { background: var(--gold-dim); }
//   .cat-strip__item:hover::before, .cat-strip__item.active::before { transform: scaleX(1); }
//   .cat-strip__item.active { background: var(--gold-dim); }
//   .cat-strip__count {
//     font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem;
//     letter-spacing: 0.05em; color: var(--ivory-dim); transition: color 0.25s;
//   }
//   .cat-strip__label {
//     font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase;
//     color: var(--ivory-muted); transition: color 0.25s; text-align: center;
//   }
//   .cat-strip__item:hover .cat-strip__count,
//   .cat-strip__item.active .cat-strip__count { color: var(--gold); }
//   .cat-strip__item:hover .cat-strip__label,
//   .cat-strip__item.active .cat-strip__label { color: var(--gold-light); }

//   /* ── Responsive ── */
//   @media (max-width: 1024px) {
//     .cat-section { padding: 80px 32px 100px; }
//     .cat-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
//     .cat-card--featured { grid-row: auto; min-height: 380px; grid-column: 1 / 3; }
//     .cat-strip { grid-template-columns: repeat(3, 1fr); }
//   }
//   @media (max-width: 640px) {
//     .cat-section { padding: 60px 20px 80px; }
//     .cat-header { grid-template-columns: 1fr; }
//     .cat-grid { grid-template-columns: 1fr; }
//     .cat-card--featured { grid-column: auto; }
//     .cat-strip { grid-template-columns: repeat(2, 1fr); }
//     .cat-card { min-height: 240px; }
//   }
// `;

// // ─── SVG Icons ────────────────────────────────────────────────────────────────
// const Icons = {
//   gis: (
//     <svg viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
//       <circle cx="16" cy="16" r="12"/>
//       <ellipse cx="16" cy="16" rx="5" ry="12"/>
//       <line x1="4" y1="16" x2="28" y2="16"/>
//       <line x1="6" y1="10" x2="26" y2="10"/>
//       <line x1="6" y1="22" x2="26" y2="22"/>
//     </svg>
//   ),
//   drones: (
//     <svg viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
//       <circle cx="16" cy="16" r="3"/>
//       <line x1="16" y1="13" x2="16" y2="5"/><circle cx="16" cy="4" r="2"/>
//       <line x1="16" y1="19" x2="16" y2="27"/><circle cx="16" cy="28" r="2"/>
//       <line x1="13" y1="16" x2="5" y2="16"/><circle cx="4" cy="16" r="2"/>
//       <line x1="19" y1="16" x2="27" y2="16"/><circle cx="28" cy="16" r="2"/>
//       <line x1="14" y1="14" x2="8" y2="8"/>
//       <line x1="18" y1="14" x2="24" y2="8"/>
//       <line x1="14" y1="18" x2="8" y2="24"/>
//       <line x1="18" y1="18" x2="24" y2="24"/>
//     </svg>
//   ),
//   agriculture: (
//     <svg viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M16 28 C16 28 6 20 6 13 C6 8 10 5 16 5 C22 5 26 8 26 13 C26 20 16 28 16 28Z"/>
//       <line x1="16" y1="28" x2="16" y2="16"/>
//       <path d="M16 18 C14 15 10 14 8 16"/>
//       <path d="M16 22 C18 19 22 18 24 20"/>
//     </svg>
//   ),
//   oilgas: (
//     <svg viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="12" y="4" width="8" height="5" rx="1"/>
//       <line x1="16" y1="9" x2="16" y2="14"/>
//       <path d="M9 14 L23 14 L26 28 L6 28 Z"/>
//       <line x1="12" y1="18" x2="20" y2="18"/>
//       <line x1="11" y1="22" x2="21" y2="22"/>
//       <line x1="16" y1="14" x2="16" y2="28"/>
//     </svg>
//   ),
//   remote: (
//     <svg viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="10" y="12" width="12" height="10" rx="1"/>
//       <path d="M7 9 C9 6 13 4 16 4 C19 4 23 6 25 9"/>
//       <path d="M4 6 C7 2 11 0 16 0 C21 0 25 2 28 6" strokeOpacity="0.4"/>
//       <line x1="16" y1="22" x2="16" y2="28"/>
//       <line x1="10" y1="28" x2="22" y2="28"/>
//       <circle cx="16" cy="17" r="2" fill="rgba(201,168,76,0.2)"/>
//     </svg>
//   ),
//   cadastral: (
//     <svg viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="4" y="4" width="11" height="11"/>
//       <rect x="17" y="4" width="11" height="11"/>
//       <rect x="4" y="17" width="11" height="11"/>
//       <path d="M17 22 L22 17 L28 28 Z" fill="rgba(201,168,76,0.08)"/>
//       <circle cx="22" cy="22" r="2" fill="rgba(201,168,76,0.2)"/>
//     </svg>
//   ),
// };

// // ─── Category data ─────────────────────────────────────────────────────────────
// const CATEGORIES = [
//   {
//     id: "gis", tag: "Foundational", name: "GIS & Spatial Mapping",
//     description: "Explore advanced geographic information systems methodologies — from urban infrastructure planning and land use analysis to real-time asset tracking and spatial data management across complex terrain.",
//     webinars: 14, speakers: 18, hours: 22, featured: true, icon: "gis",
//     gradient: "radial-gradient(ellipse at 30% 70%, rgba(0,80,160,0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.08) 0%, transparent 50%)",
//     patternColor: "rgba(0,100,200,0.07)",
//   },
//   {
//     id: "drones", tag: "High Demand", name: "UAV & Drone Surveys",
//     description: "Master aerial survey methodologies using fixed-wing and multi-rotor platforms for topographic, structural and environmental applications.",
//     webinars: 9, speakers: 11, hours: 14, icon: "drones",
//     gradient: "radial-gradient(ellipse at 60% 40%, rgba(0,180,120,0.2) 0%, transparent 65%)",
//     patternColor: "rgba(0,180,120,0.06)",
//   },
//   {
//     id: "agriculture", tag: "Emerging", name: "Precision Agriculture",
//     description: "Satellite and drone-derived insights for optimising crop yield, soil health and irrigation across West African farmlands.",
//     webinars: 7, speakers: 9, hours: 11, icon: "agriculture",
//     gradient: "radial-gradient(ellipse at 40% 60%, rgba(80,160,0,0.2) 0%, transparent 65%)",
//     patternColor: "rgba(80,160,0,0.06)",
//   },
//   {
//     id: "oilgas", tag: "Industry Focus", name: "Oil & Gas Geospatial",
//     description: "Pipeline surveillance, offshore asset management and regulatory compliance using geospatial intelligence for Nigeria's energy sector.",
//     webinars: 11, speakers: 14, hours: 18, icon: "oilgas",
//     gradient: "radial-gradient(ellipse at 70% 30%, rgba(200,80,0,0.18) 0%, transparent 65%)",
//     patternColor: "rgba(200,80,0,0.06)",
//   },
//   {
//     id: "remote", tag: "Advanced", name: "Remote Sensing & SAR",
//     description: "SAR, LiDAR and multispectral analysis for environmental monitoring, flood mapping and change detection.",
//     webinars: 8, speakers: 10, hours: 13, icon: "remote",
//     gradient: "radial-gradient(ellipse at 50% 50%, rgba(0,120,200,0.2) 0%, transparent 65%)",
//     patternColor: "rgba(0,120,200,0.06)",
//   },
//   {
//     id: "cadastral", tag: "Policy & Law", name: "Land Administration",
//     description: "Digital cadastral systems, land tenure security and dispute resolution in emerging African real estate markets.",
//     webinars: 5, speakers: 7, hours: 8, icon: "cadastral",
//     gradient: "radial-gradient(ellipse at 30% 70%, rgba(160,100,0,0.2) 0%, transparent 65%)",
//     patternColor: "rgba(160,100,0,0.06)",
//   },
// ];

// // ─── Animated counter (IntersectionObserver-triggered) ────────────────────────
// function Counter({ value, suffix = "" }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const started = useRef(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !started.current) {
//         started.current = true;
//         const duration = 1400;
//         const startTime = performance.now();
//         const animate = (ts) => {
//           const p = Math.min((ts - startTime) / duration, 1);
//           const ease = 1 - Math.pow(1 - p, 3);
//           setCount(Math.floor(ease * value));
//           if (p < 1) requestAnimationFrame(animate);
//           else setCount(value);
//         };
//         requestAnimationFrame(animate);
//       }
//     }, { threshold: 0.3 });
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [value]);

//   return <span ref={ref}>{count}{suffix}</span>;
// }

// // ─── Card background pattern SVG ─────────────────────────────────────────────
// function CardPattern({ color }) {
//   return (
//     <svg
//       style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }}
//       preserveAspectRatio="xMidYMid slice"
//     >
//       <defs>
//         <pattern id={`p-${color.replace(/[^a-z0-9]/gi, "")}`} width="36" height="36" patternUnits="userSpaceOnUse">
//           <path d="M 36 0 L 0 0 0 36" fill="none" stroke={color} strokeWidth="0.6"/>
//         </pattern>
//       </defs>
//       <rect width="100%" height="100%" fill={`url(#p-${color.replace(/[^a-z0-9]/gi, "")})`}/>
//     </svg>
//   );
// }

// // ─── Single Category Card ─────────────────────────────────────────────────────
// function CategoryCard({ cat, index }) {
//   return (
//     <div
//       className={`cat-card ${cat.featured ? "cat-card--featured" : ""}`}
//       style={{ animationDelay: `${index * 0.07}s` }}
//     >
//       <div className="cat-card__bg" style={{ background: cat.gradient || "transparent" }}>
//         <CardPattern color={cat.patternColor} />
//       </div>
//       <div className="cat-card__overlay" />
//       <div className="cat-card__corner" />
//       <div className="cat-card__corner-bl" />

//       <div className="cat-card__icon-wrap">{Icons[cat.icon]}</div>
//       <div className="cat-card__num">{String(index + 1).padStart(2, "0")}</div>

//       <div className="cat-card__content">
//         <div className="cat-card__tag">{cat.tag}</div>
//         <h3 className="cat-card__name">{cat.name}</h3>
//         <p className="cat-card__desc">{cat.description}</p>

//         <div className="cat-card__stats">
//           <div className="cat-stat">
//             <span className="cat-stat__num"><Counter value={cat.webinars} /></span>
//             <span className="cat-stat__label">Webinars</span>
//           </div>
//           <div className="cat-stat">
//             <span className="cat-stat__num"><Counter value={cat.speakers} /></span>
//             <span className="cat-stat__label">Speakers</span>
//           </div>
//           <div className="cat-stat">
//             <span className="cat-stat__num"><Counter value={cat.hours} suffix="h" /></span>
//             <span className="cat-stat__label">Content</span>
//           </div>
//         </div>

//         <div className="cat-card__arrow">
//           Explore Sessions <span className="arr">→</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Main export ──────────────────────────────────────────────────────────────
// export default function CategoriesSection() {
//   const [activeStrip, setActiveStrip] = useState(null);
//   const featured = CATEGORIES.filter(c => c.featured);
//   const rest      = CATEGORIES.filter(c => !c.featured);
//   const ordered   = [...featured, ...rest];

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: styles }} />
//       <section className="cat-section">

//         {/* Vertical bg lines */}
//         <div className="cat-bg-lines">
//           {[15, 30, 50, 70, 85].map(p => (
//             <span key={p} style={{ left: `${p}%` }} />
//           ))}
//         </div>

//         {/* Header */}
//         <div className="cat-header">
//           <div>
//             <div className="cat-eyebrow">
//               <div className="cat-eyebrow__line" />
//               <span className="cat-eyebrow__text">Knowledge Domains</span>
//             </div>
//             <h2 className="cat-title">Explore by <em>Discipline</em></h2>
//           </div>
//           <p className="cat-subtitle">
//             IEGS webinars span the full spectrum of geospatial science — from
//             foundational mapping and remote sensing to cutting-edge drone
//             technology and petroleum geospatial intelligence.
//           </p>
//         </div>

//         {/* Asymmetric card grid */}
//         <div className="cat-grid">
//           {ordered.map((cat, i) => (
//             <CategoryCard key={cat.id} cat={cat} index={i} />
//           ))}
//         </div>

//         {/* Bottom strip */}
//         <div className="cat-strip">
//           {CATEGORIES.map(cat => (
//             <div
//               key={cat.id}
//               className={`cat-strip__item ${activeStrip === cat.id ? "active" : ""}`}
//               onClick={() => setActiveStrip(id => id === cat.id ? null : cat.id)}
//             >
//               <span className="cat-strip__count">{cat.webinars}</span>
//               <span className="cat-strip__label">{cat.name}</span>
//             </div>
//           ))}
//         </div>

//       </section>
//     </>
//   );
// }
