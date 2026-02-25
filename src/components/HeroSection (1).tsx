// "use client";

// import { useEffect, useRef, useState } from "react";

// // ─── Ticker items — IEGS disciplines ──────────────────────────────────────────
// const TICKER_ITEMS = [
//   "GIS & Spatial Mapping",
//   "Drone Surveys",
//   "Precision Agriculture",
//   "Oil & Gas Intelligence",
//   "Remote Sensing & SAR",
//   "Land Administration",
//   "LiDAR Processing",
//   "Cadastral Systems",
//   "Environmental Monitoring",
//   "Register Free · No Account Needed",
// ];

// // ─── Upcoming webinars (PRD: published & live statuses) ───────────────────────
// const FEATURED_WEBINARS = [
//   {
//     id: 1,
//     status: "live",
//     cat: "GIS & Mapping",
//     title: "Advanced GIS for Urban Infrastructure Planning in Rivers State",
//     date: "Today · 10:00 AM WAT",
//     duration: "90 min",
//     platform: "Zoom",
//     speakers: ["AK", "SM", "RO"],
//     speakerLabel: "Dr. A. Kalu",
//     speakerCount: 3,
//     registrations: 214,
//   },
//   {
//     id: 2,
//     status: "published",
//     cat: "Drone Surveys",
//     title: "UAV Pipeline Surveillance & Leak Detection Across the Niger Delta",
//     date: "Thu, 22 May 2025 · 2:00 PM WAT",
//     duration: "75 min",
//     platform: "Google Meet",
//     speakers: ["RO", "LB"],
//     speakerLabel: "Engr. R. Okonkwo",
//     speakerCount: 2,
//     registrations: 187,
//   },
//   {
//     id: 3,
//     status: "published",
//     cat: "Precision Agric",
//     title: "Satellite Crop Monitoring & Yield Analytics for West African Farms",
//     date: "Tue, 3 Jun 2025 · 11:00 AM WAT",
//     duration: "60 min",
//     platform: "Zoom",
//     speakers: ["FN"],
//     speakerLabel: "Dr. F. Nwosu",
//     speakerCount: 1,
//     registrations: 143,
//   },
// ];

// // ─── Countdown hook ───────────────────────────────────────────────────────────
// function useCountdown(target) {
//   const calc = () => {
//     const diff = new Date(target) - Date.now();
//     if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
//     return {
//       days:    Math.floor(diff / 86400000),
//       hours:   Math.floor((diff % 86400000) / 3600000),
//       minutes: Math.floor((diff % 3600000) / 60000),
//       seconds: Math.floor((diff % 60000) / 1000),
//     };
//   };
//   const [time, setTime] = useState(calc);
//   useEffect(() => {
//     const t = setInterval(() => setTime(calc()), 1000);
//     return () => clearInterval(t);
//   }, [target]);
//   return time;
// }

// // ─── Animated number ──────────────────────────────────────────────────────────
// function AnimNum({ value }) {
//   const [n, setN] = useState(0);
//   useEffect(() => {
//     const dur = 1800; const t0 = performance.now();
//     const tick = (ts) => {
//       const p = Math.min((ts - t0) / dur, 1);
//       const e = 1 - Math.pow(1 - p, 3);
//       setN(Math.floor(e * value));
//       if (p < 1) requestAnimationFrame(tick); else setN(value);
//     };
//     requestAnimationFrame(tick);
//   }, [value]);
//   return <>{n}</>;
// }

// // ─── Particle canvas ──────────────────────────────────────────────────────────
// function ParticleCanvas() {
//   const ref = useRef(null);
//   useEffect(() => {
//     const canvas = ref.current;
//     const ctx = canvas.getContext("2d");
//     let W, H, particles, raf;
//     const resize = () => {
//       W = canvas.width  = canvas.offsetWidth;
//       H = canvas.height = canvas.offsetHeight;
//     };
//     resize();
//     window.addEventListener("resize", resize);
//     particles = Array.from({ length: 55 }, () => ({
//       x: Math.random() * (W || 800),
//       y: Math.random() * (H || 600),
//       r: Math.random() * 1.1 + 0.3,
//       vx: (Math.random() - 0.5) * 0.28,
//       vy: (Math.random() - 0.5) * 0.28,
//       alpha: Math.random() * 0.45 + 0.1,
//       gold: Math.random() > 0.5,
//     }));
//     const draw = () => {
//       ctx.clearRect(0, 0, W, H);
//       particles.forEach(p => {
//         p.x = (p.x + p.vx + W) % W;
//         p.y = (p.y + p.vy + H) % H;
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = p.gold
//           ? `rgba(201,168,76,${p.alpha})`
//           : `rgba(0,212,255,${p.alpha * 0.55})`;
//         ctx.fill();
//       });
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const d = Math.sqrt(dx * dx + dy * dy);
//           if (d < 95) {
//             ctx.beginPath();
//             ctx.strokeStyle = `rgba(201,168,76,${0.035 * (1 - d / 95)})`;
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
//     return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
//   }, []);
//   return (
//     <canvas
//       ref={ref}
//       className="absolute inset-0 pointer-events-none z-0"
//       style={{ width: "100%", height: "100%" }}
//     />
//   );
// }

// // ─── Webinar Card ─────────────────────────────────────────────────────────────
// function WebinarCard({ w }) {
//   const isLive      = w.status === "live";
//   const isPublished = w.status === "published";
//   const isCompleted = w.status === "completed";

//   const statusColors = isLive
//     ? "text-[#00e5a0] border border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.10)]"
//     : isPublished
//     ? "text-[#00d4ff] border border-[rgba(0,212,255,0.25)] bg-[rgba(0,212,255,0.12)]"
//     : "text-[#c9a84c] border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.10)]";

//   return (
//     <div className="wcard bg-gradient-to-br from-[#0d1118] to-[#12161f] border border-[rgba(201,168,76,0.16)] px-7 pt-[26px] pb-[22px] relative overflow-hidden transition-[border-color,transform,box-shadow] duration-300 cursor-pointer hover:border-[rgba(201,168,76,0.35)] hover:translate-x-1 hover:shadow-[-4px_0_24px_rgba(201,168,76,0.1)]">

//       {/* Status badge */}
//       <div className={`inline-flex items-center gap-[7px] text-[0.6rem] tracking-[0.22em] uppercase px-[11px] py-1 mb-[14px] font-['DM_Sans',sans-serif] font-medium ${statusColors}`}>
//         {(isLive || isPublished) && (
//           <span className="w-[5px] h-[5px] rounded-full bg-current [animation:pulse_2s_infinite]" />
//         )}
//         {isLive ? "Live Now" : isPublished ? "Registration Open" : "Recording Available"}
//       </div>

//       {/* Category tag */}
//       <div className="absolute top-[18px] right-[18px] text-[0.58rem] tracking-[0.16em] uppercase text-[#c9a84c] opacity-70">
//         {w.cat}
//       </div>

//       {/* Title */}
//       <h3 className="wcard__title font-['Cormorant_Garamond',serif] text-[1.18rem] font-normal leading-[1.28] text-[#f0ede6] mb-[14px] transition-colors duration-[250ms]">
//         {w.title}
//       </h3>

//       {/* Meta rows */}
//       <div className="flex flex-col gap-[6px] mb-[18px]">
//         <div className="flex items-center gap-[9px] text-[0.7rem] text-[rgba(240,237,230,0.30)] tracking-[0.04em]">
//           <span className="text-[#c9a84c] text-[0.78rem] shrink-0">◷</span>
//           {w.date} &nbsp;·&nbsp; {w.duration}
//         </div>
//         <div className="flex items-center gap-[9px] text-[0.7rem] text-[rgba(240,237,230,0.30)] tracking-[0.04em]">
//           <span className="text-[#c9a84c] text-[0.78rem] shrink-0">◈</span>
//           Live Webinar via
//           <span className="inline-flex items-center gap-[5px] text-[0.58rem] tracking-[0.14em] uppercase px-2 py-[3px] border border-[rgba(0,212,255,0.2)] text-[#00d4ff] bg-[rgba(0,212,255,0.12)] ml-1">
//             {w.platform}
//           </span>
//         </div>
//         <div className="flex items-center gap-[9px] text-[0.7rem] text-[rgba(240,237,230,0.30)] tracking-[0.04em]">
//           <span className="text-[#c9a84c] text-[0.78rem] shrink-0">◆</span>
//           Free · No account required
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="flex items-center justify-between pt-4 border-t border-[rgba(201,168,76,0.16)]">
//         {/* Speakers */}
//         <div className="flex items-center gap-[10px]">
//           <div className="flex">
//             {w.speakers.slice(0, 3).map((s, i) => (
//               <div
//                 key={i}
//                 className={`w-7 h-7 rounded-full border-2 border-[#0d1118] bg-gradient-to-br from-[#181d28] to-[#12161f] flex items-center justify-center font-['Cormorant_Garamond',serif] text-[0.55rem] font-semibold text-[#e8c97e] ${i === 0 ? "ml-0" : "-ml-[6px]"}`}
//               >
//                 {s}
//               </div>
//             ))}
//           </div>
//           <div className="wcard__speaker-text text-[0.65rem] text-[rgba(240,237,230,0.30)]">
//             <strong>{w.speakerLabel}</strong>
//             {w.speakerCount > 1
//               ? `+${w.speakerCount - 1} speaker${w.speakerCount > 2 ? "s" : ""}`
//               : "Lead Speaker"}
//           </div>
//         </div>

//         {/* Action button — clip-path + variants handled by globals.css */}
//         <button className={`wcard__action text-[0.62rem] tracking-[0.16em] uppercase border-none px-[18px] py-2 cursor-pointer font-['DM_Sans',sans-serif] font-medium shrink-0 ${
//           isLive
//             ? "join bg-gradient-to-br from-[#00e5a0] to-[#00c882] text-[#001a10]"
//             : isCompleted
//             ? "watch bg-transparent text-[#c9a84c] border border-[rgba(201,168,76,0.35)]"
//             : "bg-gradient-to-br from-[#c9a84c] to-[#e8c97e] text-[#080a0f]"
//         }`}>
//           {isLive ? "Join Now →" : isCompleted ? "▶ Watch" : "Register →"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Main Hero ─────────────────────────────────────────────────────────────────
// export default function HeroSection() {
//   // Countdown to next webinar (22 May 2025 14:00 WAT = UTC+1)
//   const nextWebinarTarget = "2025-05-22T13:00:00Z";
//   const countdown = useCountdown(nextWebinarTarget);
//   const pad = n => String(n).padStart(2, "0");

//   return (
//     <section className="hero relative min-h-screen bg-[#080a0f] overflow-hidden font-['DM_Sans',sans-serif] text-[#f0ede6] flex flex-col">
//       <ParticleCanvas />
//       <div className="hero-orb hero-orb--a" />
//       <div className="hero-orb hero-orb--b" />
//       <div className="hero-orb hero-orb--c" />
//       <div className="hero__rules absolute inset-0 z-[1] pointer-events-none" />

//       {/* ══ NAV ══ */}
//       <nav className="hero-nav relative z-10 flex items-center justify-between px-[60px] py-[26px] border-b border-[rgba(201,168,76,0.16)] [animation:fadeDown_0.8s_ease_both] shrink-0">

//         {/* Logo */}
//         <a href="#" className="no-underline flex flex-col gap-[1px]">
//           <span className="font-['Bebas_Neue',sans-serif] text-[1.55rem] tracking-[0.2em] text-[#e8c97e] leading-none">
//             IEGS
//           </span>
//           <span className="text-[0.58rem] tracking-[0.28em] uppercase text-[rgba(240,237,230,0.30)] font-light">
//             Indepth Earth Geospatial Services
//           </span>
//         </a>

//         {/* Nav links — ::after underline handled by globals.css */}
//         <ul className="hero-nav__links flex gap-[38px] list-none">
//           {[
//             ["#webinars",    "Webinars"],
//             ["#categories",  "Categories"],
//             ["#speakers",    "Speakers"],
//             ["#recordings",  "Recordings"],
//             ["#about",       "About"],
//           ].map(([href, label]) => (
//             <li key={href}>
//               <a
//                 href={href}
//                 className="text-[0.75rem] tracking-[0.14em] uppercase text-[rgba(240,237,230,0.55)] no-underline transition-colors duration-[250ms] relative hover:text-[#e8c97e]"
//               >
//                 {label}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Location badge */}
//         <div className="hero-nav__location flex items-center gap-2 text-[0.62rem] tracking-[0.14em] uppercase text-[rgba(240,237,230,0.30)] border border-[rgba(201,168,76,0.16)] px-[14px] py-[7px]">
//           <span className="w-[5px] h-[5px] rounded-full bg-[#c9a84c] [animation:pulse_2.5s_infinite]" />
//           Rivers State, Nigeria
//         </div>

//         {/* CTA — clip-path handled by globals.css */}
//         <button className="hero-nav__cta text-[0.72rem] tracking-[0.18em] uppercase text-[#080a0f] bg-gradient-to-br from-[#c9a84c] to-[#e8c97e] border-none px-[26px] py-[11px] cursor-pointer font-['DM_Sans',sans-serif] font-medium transition-all duration-[280ms] ease-in-out hover:-translate-y-px hover:shadow-[0_8px_26px_rgba(201,168,76,0.35)]">
//           Register Free
//         </button>
//       </nav>

//       {/* ══ BODY ══ */}
//       <div className="hero__body relative z-[5] flex-1 grid grid-cols-2 items-center px-[60px] gap-0 min-h-[calc(100vh-86px-48px)]">

//         {/* ── LEFT ── */}
//         <div className="hero__left py-[70px] pr-[56px]">

//           {/* Eyebrow */}
//           <div className="flex items-center gap-[14px] mb-[28px] [animation:fadeUp_0.9s_ease_0.15s_both]">
//             <div className="w-9 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
//             <span className="text-[0.68rem] tracking-[0.35em] uppercase text-[#c9a84c]">
//               Geospatial Webinar Series · 2025
//             </span>
//           </div>

//           {/* Category chips */}
//           <div className="hero__cats flex gap-2 flex-wrap mb-8 [animation:fadeUp_0.9s_ease_0.22s_both]">
//             {["GIS & Mapping", "Drone Surveys", "Agric", "Oil & Gas", "Remote Sensing"].map(c => (
//               <span
//                 key={c}
//                 className="text-[0.58rem] tracking-[0.18em] uppercase px-[11px] py-1 border border-[rgba(201,168,76,0.16)] text-[rgba(240,237,230,0.30)] bg-[rgba(201,168,76,0.10)] transition-all duration-200 hover:border-[rgba(201,168,76,0.35)] hover:text-[#e8c97e] cursor-pointer"
//               >
//                 {c}
//               </span>
//             ))}
//           </div>

//           {/* Title */}
//           <h1 className="hero__title font-['Cormorant_Garamond',serif] text-[clamp(3rem,5.2vw,5.2rem)] font-light leading-[1.06] tracking-[-0.01em] text-[#f0ede6] mb-2 [animation:fadeUp_0.9s_ease_0.3s_both]">
//             Expert Knowledge
//             <em className="italic text-[#e8c97e] block">Across Every</em>
//             <strong className="font-semibold block">Geospatial Frontier.</strong>
//           </h1>

//           {/* Subtitle */}
//           <p className="text-[clamp(0.88rem,1.4vw,1.05rem)] font-light text-[rgba(240,237,230,0.55)] leading-[1.65] max-w-[460px] mt-6 mb-10 [animation:fadeUp_0.9s_ease_0.44s_both]">
//             IEGS hosts free, expert-led webinars covering GIS, drone surveys,
//             precision agriculture, oil &amp; gas intelligence, and remote sensing —
//             built for geospatial professionals across Africa and beyond.
//           </p>

//           {/* CTA buttons */}
//           <div className="flex items-center gap-4 flex-wrap [animation:fadeUp_0.9s_ease_0.56s_both]">
//             {/* clip-path + ::before shine handled by globals.css */}
//             <button className="hero__btn-primary inline-flex items-center gap-[10px] text-[0.78rem] tracking-[0.18em] uppercase text-[#080a0f] bg-gradient-to-br from-[#c9a84c] to-[#e8c97e] border-none py-4 px-9 cursor-pointer font-['DM_Sans',sans-serif] font-medium relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(201,168,76,0.4)]">
//               Browse Webinars
//               <span className="arr transition-transform duration-[250ms]">→</span>
//             </button>
//             <button className="inline-flex items-center gap-[9px] text-[0.73rem] tracking-[0.14em] uppercase text-[rgba(240,237,230,0.55)] bg-transparent border border-[rgba(201,168,76,0.16)] py-[15px] px-[26px] cursor-pointer font-['DM_Sans',sans-serif] transition-all duration-[280ms] hover:border-[rgba(201,168,76,0.35)] hover:text-[#f0ede6] hover:bg-[rgba(201,168,76,0.10)]">
//               ▶ &nbsp;Watch Recordings
//             </button>
//           </div>

//           {/* Platform indicators */}
//           <div className="flex items-center gap-[10px] mt-8 pt-7 border-t border-[rgba(201,168,76,0.16)] [animation:fadeUp_0.9s_ease_0.68s_both]">
//             <span className="text-[0.6rem] tracking-[0.22em] uppercase text-[rgba(240,237,230,0.30)]">
//               Hosted via
//             </span>
//             {["Zoom", "Google Meet", "Zoho"].map(p => (
//               <span
//                 key={p}
//                 className="text-[0.6rem] tracking-[0.14em] uppercase px-[10px] py-1 border border-[rgba(201,168,76,0.16)] text-[#00d4ff] bg-[rgba(0,212,255,0.12)]"
//               >
//                 {p}
//               </span>
//             ))}
//           </div>

//           {/* Stats bar */}
//           <div className="hero__stats flex mt-9 pt-7 border-t border-[rgba(201,168,76,0.16)] [animation:fadeUp_0.9s_ease_0.78s_both]">
//             {[
//               { value: 2800, suffix: "+", label: "Registered Professionals" },
//               { value: 54,   suffix: "",  label: "Sessions Delivered" },
//               { value: 38,   suffix: "",  label: "Countries Reached" },
//             ].map((stat, i) => (
//               <div
//                 key={i}
//                 className={`flex-1 ${i < 2 ? "pr-7 border-r border-[rgba(201,168,76,0.16)]" : ""} ${i > 0 ? "pl-7" : ""}`}
//               >
//                 <div className="font-['Bebas_Neue',sans-serif] text-[2.2rem] tracking-[0.05em] text-[#e8c97e] leading-none">
//                   <AnimNum value={stat.value} />{stat.suffix}
//                 </div>
//                 <div className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(240,237,230,0.30)] mt-[5px]">
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ── RIGHT ── */}
//         <div className="hero__right py-[70px] pl-[56px] border-l border-[rgba(201,168,76,0.16)] flex flex-col gap-4 [animation:fadeLeft_0.9s_ease_0.35s_both]">

//           {/* Featured webinar cards */}
//           {FEATURED_WEBINARS.map(w => (
//             <WebinarCard key={w.id} w={w} />
//           ))}

//           {/* Countdown to next published webinar */}
//           <div className="bg-gradient-to-br from-[rgba(201,168,76,0.05)] to-[rgba(201,168,76,0.02)] border border-[rgba(201,168,76,0.16)] px-7 py-[22px]">
//             <div className="cdown-card__label text-[0.6rem] tracking-[0.28em] uppercase text-[#c9a84c] mb-4 flex items-center gap-2">
//               Next Session Begins In
//             </div>
//             <div className="flex">
//               {[
//                 ["days",  countdown.days],
//                 ["hours", countdown.hours],
//                 ["mins",  countdown.minutes],
//                 ["secs",  countdown.seconds],
//               ].map(([label, val], i) => (
//                 <div
//                   key={label}
//                   className={`flex-1 text-center px-[10px] ${i === 0 ? "pl-0" : ""} ${i < 3 ? "border-r border-[rgba(201,168,76,0.16)]" : ""}`}
//                 >
//                   <span className="font-['Bebas_Neue',sans-serif] text-[2.6rem] tracking-[0.04em] text-[#f0ede6] leading-none block">
//                     {pad(val)}
//                   </span>
//                   <span className="text-[0.58rem] tracking-[0.2em] uppercase text-[rgba(240,237,230,0.30)] mt-1 block">
//                     {label}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ::before diamond handled by globals.css */}
//           <p className="hero__reg-note flex items-center gap-[10px] pt-3 text-[0.64rem] text-[rgba(240,237,230,0.30)] tracking-[0.06em]">
//             All webinars are free. Registration takes under 60 seconds —
//             no account or password required.
//           </p>
//         </div>
//       </div>

//       {/* ══ TICKER ══ */}
//       <div className="relative z-[5] border-t border-[rgba(201,168,76,0.16)] py-[13px] overflow-hidden bg-gradient-to-r from-[#080a0f] via-[#0d1118] to-[#080a0f] shrink-0">
//         {/* hover:pause handled by globals.css */}
//         <div className="hero-ticker__track flex [animation:tickerScroll_32s_linear_infinite] whitespace-nowrap">
//           {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
//             <span
//               key={i}
//               className="inline-flex items-center gap-[14px] px-7 text-[0.67rem] tracking-[0.22em] uppercase text-[rgba(240,237,230,0.30)]"
//             >
//               {item}
//               <span className="text-[#c9a84c] opacity-50 text-[0.5rem]">◆</span>
//             </span>
//           ))}
//         </div>
//       </div>

//     </section>
//   );
// }
