// "use client";

// import { useState, useMemo, useRef, useEffect } from "react";

// // ─── Shared design tokens (mirrors HeroSection) ───────────────────────────────
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Bebas+Neue&display=swap');

//   :root {
//     --obsidian:     #080a0f;
//     --obsidian-2:   #0d1118;
//     --obsidian-3:   #12161f;
//     --obsidian-4:   #181d28;
//     --gold:         #c9a84c;
//     --gold-light:   #e8c97e;
//     --gold-pale:    #f5e6c0;
//     --gold-dim:     rgba(201,168,76,0.12);
//     --cyan:         #00d4ff;
//     --cyan-dim:     rgba(0,212,255,0.10);
//     --green:        #00e5a0;
//     --green-dim:    rgba(0,229,160,0.10);
//     --ivory:        #f0ede6;
//     --ivory-dim:    rgba(240,237,230,0.55);
//     --ivory-muted:  rgba(240,237,230,0.28);
//     --border:       rgba(201,168,76,0.14);
//     --border-mid:   rgba(201,168,76,0.28);
//     --border-hi:    rgba(201,168,76,0.50);
//     --shadow-gold:  0 8px 40px rgba(201,168,76,0.18);
//     --shadow-deep:  0 24px 64px rgba(0,0,0,0.55);
//     --radius-sm:    4px;
//   }

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   /* ── Section wrapper ── */
//   .disc-section {
//     position: relative;
//     background: var(--obsidian);
//     font-family: 'DM Sans', sans-serif;
//     color: var(--ivory);
//     padding: 0 0 120px;
//     overflow: hidden;
//   }

//   /* subtle background grid lines */
//   .disc-section::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background-image:
//       linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
//       linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
//     background-size: 80px 80px;
//     pointer-events: none;
//     z-index: 0;
//   }

//   /* ── Section header ── */
//   .disc-header {
//     position: relative;
//     z-index: 2;
//     padding: 100px 60px 60px;
//     display: flex;
//     align-items: flex-end;
//     justify-content: space-between;
//     gap: 40px;
//     border-bottom: 1px solid var(--border);
//   }

//   .disc-header__left {}

//   .disc-eyebrow {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     margin-bottom: 20px;
//   }
//   .disc-eyebrow__line {
//     width: 32px; height: 1px;
//     background: linear-gradient(90deg, transparent, var(--gold));
//   }
//   .disc-eyebrow__text {
//     font-size: 0.68rem;
//     letter-spacing: 0.35em;
//     text-transform: uppercase;
//     color: var(--gold);
//     font-weight: 400;
//   }

//   .disc-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: clamp(2.4rem, 4vw, 3.8rem);
//     font-weight: 300;
//     line-height: 1.08;
//     color: var(--ivory);
//   }
//   .disc-title em {
//     font-style: italic;
//     color: var(--gold-light);
//   }

//   .disc-header__right {
//     display: flex;
//     align-items: center;
//     gap: 20px;
//     flex-shrink: 0;
//   }
//   .disc-count {
//     font-size: 0.72rem;
//     letter-spacing: 0.15em;
//     text-transform: uppercase;
//     color: var(--ivory-muted);
//   }
//   .disc-count strong {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 1.5rem;
//     letter-spacing: 0.05em;
//     color: var(--gold-light);
//     margin-right: 6px;
//   }

//   /* ── Controls bar ── */
//   .disc-controls {
//     position: relative;
//     z-index: 2;
//     padding: 32px 60px;
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     flex-wrap: wrap;
//     border-bottom: 1px solid var(--border);
//     background: linear-gradient(180deg, rgba(13,17,24,0.6) 0%, transparent 100%);
//   }

//   /* Search */
//   .disc-search {
//     position: relative;
//     flex: 1;
//     min-width: 220px;
//     max-width: 340px;
//   }
//   .disc-search__icon {
//     position: absolute;
//     left: 16px; top: 50%;
//     transform: translateY(-50%);
//     color: var(--ivory-muted);
//     font-size: 0.85rem;
//     pointer-events: none;
//   }
//   .disc-search input {
//     width: 100%;
//     background: var(--obsidian-3);
//     border: 1px solid var(--border);
//     color: var(--ivory);
//     font-family: 'DM Sans', sans-serif;
//     font-size: 0.8rem;
//     padding: 13px 16px 13px 42px;
//     outline: none;
//     transition: border-color 0.25s, box-shadow 0.25s;
//     letter-spacing: 0.03em;
//   }
//   .disc-search input::placeholder { color: var(--ivory-muted); }
//   .disc-search input:focus {
//     border-color: var(--border-mid);
//     box-shadow: 0 0 0 3px rgba(201,168,76,0.06);
//   }

//   /* Category pill filters */
//   .disc-filters {
//     display: flex;
//     gap: 8px;
//     flex-wrap: wrap;
//     align-items: center;
//   }
//   .filter-pill {
//     display: inline-flex;
//     align-items: center;
//     gap: 7px;
//     font-size: 0.7rem;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     font-family: 'DM Sans', sans-serif;
//     padding: 10px 18px;
//     border: 1px solid var(--border);
//     background: transparent;
//     color: var(--ivory-dim);
//     cursor: pointer;
//     transition: all 0.22s ease;
//     white-space: nowrap;
//     clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
//   }
//   .filter-pill:hover {
//     border-color: var(--border-mid);
//     color: var(--ivory);
//     background: var(--gold-dim);
//   }
//   .filter-pill.active {
//     border-color: var(--gold);
//     background: linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08));
//     color: var(--gold-light);
//     box-shadow: 0 0 18px rgba(201,168,76,0.12);
//   }
//   .filter-pill__dot {
//     width: 5px; height: 5px;
//     border-radius: 50%;
//     background: currentColor;
//     opacity: 0.6;
//   }

//   /* Sort select */
//   .disc-sort {
//     margin-left: auto;
//     position: relative;
//   }
//   .disc-sort select {
//     appearance: none;
//     background: var(--obsidian-3);
//     border: 1px solid var(--border);
//     color: var(--ivory-dim);
//     font-family: 'DM Sans', sans-serif;
//     font-size: 0.72rem;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     padding: 12px 38px 12px 16px;
//     cursor: pointer;
//     outline: none;
//     transition: border-color 0.25s;
//   }
//   .disc-sort select:focus { border-color: var(--border-mid); }
//   .disc-sort__chevron {
//     position: absolute;
//     right: 14px; top: 50%;
//     transform: translateY(-50%);
//     color: var(--gold);
//     pointer-events: none;
//     font-size: 0.7rem;
//   }

//   /* View toggles */
//   .disc-view-toggle {
//     display: flex;
//     border: 1px solid var(--border);
//     overflow: hidden;
//   }
//   .view-btn {
//     width: 40px; height: 40px;
//     display: flex; align-items: center; justify-content: center;
//     background: transparent;
//     border: none;
//     color: var(--ivory-muted);
//     cursor: pointer;
//     font-size: 0.9rem;
//     transition: all 0.2s;
//   }
//   .view-btn.active {
//     background: var(--gold-dim);
//     color: var(--gold);
//   }
//   .view-btn:hover:not(.active) { background: var(--obsidian-3); color: var(--ivory-dim); }

//   /* ── Webinar Grid ── */
//   .disc-grid-wrap {
//     position: relative;
//     z-index: 2;
//     padding: 48px 60px;
//   }

//   .disc-grid {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 24px;
//     transition: all 0.3s ease;
//   }
//   .disc-grid.list-view {
//     grid-template-columns: 1fr;
//     gap: 16px;
//   }

//   /* ── Webinar Card ── */
//   .wcard {
//     background: linear-gradient(145deg, var(--obsidian-2), var(--obsidian-3));
//     border: 1px solid var(--border);
//     display: flex;
//     flex-direction: column;
//     position: relative;
//     overflow: hidden;
//     cursor: pointer;
//     transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
//     animation: cardReveal 0.5s ease both;
//   }
//   @keyframes cardReveal {
//     from { opacity: 0; transform: translateY(20px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }
//   .wcard:hover {
//     transform: translateY(-5px);
//     border-color: var(--border-mid);
//     box-shadow: var(--shadow-gold);
//   }
//   /* Left accent line */
//   .wcard::before {
//     content: '';
//     position: absolute;
//     top: 0; left: 0;
//     width: 100%; height: 2px;
//     background: linear-gradient(90deg, var(--gold), transparent);
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .wcard:hover::before { opacity: 1; }

//   /* Banner */
//   .wcard__banner {
//     position: relative;
//     width: 100%;
//     padding-top: 52%;
//     background: var(--obsidian-4);
//     overflow: hidden;
//     flex-shrink: 0;
//   }
//   .wcard__banner-img {
//     position: absolute;
//     inset: 0;
//     width: 100%; height: 100%;
//     object-fit: cover;
//     transition: transform 0.5s ease;
//   }
//   .wcard:hover .wcard__banner-img { transform: scale(1.04); }

//   /* Placeholder banner gradient (no image) */
//   .wcard__banner-placeholder {
//     position: absolute;
//     inset: 0;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .wcard__banner-overlay {
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(180deg, transparent 40%, var(--obsidian-2) 100%);
//     z-index: 1;
//   }

//   .wcard__status-badge {
//     position: absolute;
//     top: 14px; right: 14px;
//     z-index: 2;
//     font-size: 0.6rem;
//     letter-spacing: 0.22em;
//     text-transform: uppercase;
//     padding: 5px 11px;
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 500;
//     display: flex;
//     align-items: center;
//     gap: 6px;
//   }
//   .wcard__status-badge.live {
//     background: rgba(0,229,160,0.15);
//     border: 1px solid rgba(0,229,160,0.35);
//     color: var(--green);
//   }
//   .wcard__status-badge.upcoming {
//     background: var(--cyan-dim);
//     border: 1px solid rgba(0,212,255,0.28);
//     color: var(--cyan);
//   }
//   .wcard__status-badge.completed {
//     background: rgba(201,168,76,0.1);
//     border: 1px solid rgba(201,168,76,0.22);
//     color: var(--gold);
//   }
//   .wcard__status-badge .pulse {
//     width: 5px; height: 5px;
//     border-radius: 50%;
//     background: currentColor;
//     animation: pulse 2s infinite;
//   }
//   @keyframes pulse {
//     0%,100% { opacity:1; transform:scale(1); }
//     50% { opacity:0.4; transform:scale(0.75); }
//   }

//   .wcard__cat-badge {
//     position: absolute;
//     bottom: 14px; left: 14px;
//     z-index: 2;
//     font-size: 0.6rem;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     padding: 4px 10px;
//     font-family: 'DM Sans', sans-serif;
//     background: rgba(8,10,15,0.75);
//     border: 1px solid var(--border-mid);
//     color: var(--gold-light);
//     backdrop-filter: blur(6px);
//   }

//   /* Body */
//   .wcard__body {
//     padding: 24px 24px 20px;
//     display: flex;
//     flex-direction: column;
//     flex: 1;
//   }

//   .wcard__date-row {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     margin-bottom: 14px;
//   }
//   .wcard__date {
//     font-size: 0.68rem;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     color: var(--gold);
//     font-weight: 400;
//   }
//   .wcard__duration {
//     font-size: 0.65rem;
//     color: var(--ivory-muted);
//     letter-spacing: 0.06em;
//   }

//   .wcard__title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.25rem;
//     font-weight: 400;
//     line-height: 1.3;
//     color: var(--ivory);
//     margin-bottom: 12px;
//     transition: color 0.25s;
//   }
//   .wcard:hover .wcard__title { color: var(--gold-pale); }

//   .wcard__desc {
//     font-size: 0.78rem;
//     line-height: 1.6;
//     color: var(--ivory-muted);
//     font-weight: 300;
//     display: -webkit-box;
//     -webkit-line-clamp: 2;
//     -webkit-box-orient: vertical;
//     overflow: hidden;
//     margin-bottom: 20px;
//   }

//   /* Speakers row */
//   .wcard__speakers {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-top: auto;
//     padding-top: 18px;
//     border-top: 1px solid var(--border);
//   }
//   .wcard__avatars { display: flex; }
//   .wcard__avatar {
//     width: 28px; height: 28px;
//     border-radius: 50%;
//     border: 2px solid var(--obsidian-2);
//     background: linear-gradient(135deg, var(--obsidian-4), var(--obsidian-3));
//     display: flex; align-items: center; justify-content: center;
//     font-size: 0.55rem;
//     color: var(--gold-light);
//     font-family: 'Cormorant Garamond', serif;
//     font-weight: 600;
//     margin-left: -6px;
//   }
//   .wcard__avatar:first-child { margin-left: 0; }
//   .wcard__speaker-names {
//     font-size: 0.68rem;
//     color: var(--ivory-muted);
//     font-weight: 300;
//     flex: 1;
//     letter-spacing: 0.02em;
//   }
//   .wcard__speaker-names strong {
//     color: var(--ivory-dim);
//     font-weight: 400;
//     display: block;
//   }

//   /* Footer action */
//   .wcard__footer {
//     padding: 0 24px 22px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }
//   .wcard__reg-count {
//     font-size: 0.65rem;
//     color: var(--ivory-muted);
//     letter-spacing: 0.08em;
//     display: flex;
//     align-items: center;
//     gap: 6px;
//   }
//   .wcard__reg-count::before {
//     content: '◈';
//     color: var(--gold);
//     font-size: 0.6rem;
//   }

//   .wcard__cta {
//     font-size: 0.65rem;
//     letter-spacing: 0.18em;
//     text-transform: uppercase;
//     color: var(--obsidian);
//     background: linear-gradient(135deg, var(--gold), var(--gold-light));
//     border: none;
//     padding: 9px 20px;
//     cursor: pointer;
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 500;
//     clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px));
//     transition: all 0.25s;
//   }
//   .wcard__cta:hover {
//     background: linear-gradient(135deg, var(--gold-light), var(--gold-pale));
//     box-shadow: 0 6px 20px rgba(201,168,76,0.3);
//     transform: translateY(-1px);
//   }
//   .wcard__cta.watch {
//     background: transparent;
//     color: var(--gold);
//     border: 1px solid var(--border-mid);
//     clip-path: none;
//   }
//   .wcard__cta.watch:hover {
//     background: var(--gold-dim);
//     box-shadow: none;
//   }

//   /* ── LIST VIEW overrides ── */
//   .disc-grid.list-view .wcard {
//     flex-direction: row;
//     max-height: 160px;
//   }
//   .disc-grid.list-view .wcard__banner {
//     width: 220px;
//     padding-top: 0;
//     min-height: 160px;
//     flex-shrink: 0;
//   }
//   .disc-grid.list-view .wcard__body {
//     flex-direction: row;
//     align-items: center;
//     gap: 24px;
//     padding: 20px 24px;
//   }
//   .disc-grid.list-view .wcard__title { font-size: 1.1rem; margin-bottom: 0; flex: 1; }
//   .disc-grid.list-view .wcard__desc { display: none; }
//   .disc-grid.list-view .wcard__speakers { border-top: none; padding-top: 0; margin-top: 0; }
//   .disc-grid.list-view .wcard__footer {
//     padding: 0 24px 0 0;
//     flex-direction: column;
//     align-items: flex-end;
//     gap: 10px;
//     justify-content: center;
//     min-width: 140px;
//     flex-shrink: 0;
//   }

//   /* ── Empty state ── */
//   .disc-empty {
//     grid-column: 1 / -1;
//     text-align: center;
//     padding: 80px 40px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 16px;
//   }
//   .disc-empty__icon {
//     font-size: 2.5rem;
//     opacity: 0.2;
//     margin-bottom: 8px;
//   }
//   .disc-empty__title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.6rem;
//     font-weight: 300;
//     color: var(--ivory-dim);
//   }
//   .disc-empty__sub {
//     font-size: 0.8rem;
//     color: var(--ivory-muted);
//   }

//   /* ── Pagination ── */
//   .disc-pagination {
//     position: relative;
//     z-index: 2;
//     padding: 0 60px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }
//   .disc-pagination__info {
//     font-size: 0.72rem;
//     color: var(--ivory-muted);
//     letter-spacing: 0.08em;
//   }
//   .disc-pagination__controls {
//     display: flex;
//     gap: 6px;
//     align-items: center;
//   }
//   .page-btn {
//     width: 38px; height: 38px;
//     display: flex; align-items: center; justify-content: center;
//     background: var(--obsidian-3);
//     border: 1px solid var(--border);
//     color: var(--ivory-dim);
//     cursor: pointer;
//     font-size: 0.78rem;
//     font-family: 'DM Sans', sans-serif;
//     transition: all 0.2s;
//     clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
//   }
//   .page-btn:hover:not(:disabled):not(.active) {
//     border-color: var(--border-mid);
//     color: var(--ivory);
//     background: var(--obsidian-4);
//   }
//   .page-btn.active {
//     background: linear-gradient(135deg, var(--gold), var(--gold-light));
//     border-color: var(--gold);
//     color: var(--obsidian);
//     font-weight: 500;
//   }
//   .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

//   /* ── Staggered card reveal ── */
//   .wcard:nth-child(1) { animation-delay: 0.05s; }
//   .wcard:nth-child(2) { animation-delay: 0.10s; }
//   .wcard:nth-child(3) { animation-delay: 0.15s; }
//   .wcard:nth-child(4) { animation-delay: 0.20s; }
//   .wcard:nth-child(5) { animation-delay: 0.25s; }
//   .wcard:nth-child(6) { animation-delay: 0.30s; }
//   .wcard:nth-child(7) { animation-delay: 0.35s; }
//   .wcard:nth-child(8) { animation-delay: 0.40s; }
//   .wcard:nth-child(9) { animation-delay: 0.45s; }

//   /* ── Responsive ── */
//   @media (max-width: 1100px) {
//     .disc-grid:not(.list-view) { grid-template-columns: repeat(2, 1fr); }
//   }
//   @media (max-width: 768px) {
//     .disc-header, .disc-controls, .disc-grid-wrap, .disc-pagination {
//       padding-left: 24px; padding-right: 24px;
//     }
//     .disc-header { flex-direction: column; align-items: flex-start; gap: 16px; }
//     .disc-grid:not(.list-view) { grid-template-columns: 1fr; }
//     .disc-grid.list-view .wcard { flex-direction: column; max-height: none; }
//     .disc-grid.list-view .wcard__banner { width: 100%; min-height: 0; padding-top: 50%; }
//     .disc-grid.list-view .wcard__body { flex-direction: column; }
//     .disc-sort { margin-left: 0; }
//   }
// `;

// // ─── Mock data ────────────────────────────────────────────────────────────────
// const CATEGORIES = [
//   { id: "all",         label: "All Topics" },
//   { id: "gis",         label: "GIS & Mapping" },
//   { id: "drones",      label: "Drone Surveys" },
//   { id: "agriculture", label: "Precision Agric" },
//   { id: "oil-gas",     label: "Oil & Gas" },
//   { id: "remote",      label: "Remote Sensing" },
// ];

// const BANNERS = [
//   { bg: "linear-gradient(135deg, #0d1f35 0%, #0a1a2e 40%, #0d2535 100%)", icon: "🛰️" },
//   { bg: "linear-gradient(135deg, #1a1200 0%, #2a1f00 40%, #1a1500 100%)", icon: "🌍" },
//   { bg: "linear-gradient(135deg, #001a1a 0%, #002828 40%, #001f1f 100%)", icon: "✈️" },
//   { bg: "linear-gradient(135deg, #1a0d00 0%, #2a1800 40%, #1a1000 100%)", icon: "🌾" },
//   { bg: "linear-gradient(135deg, #0d0d1a 0%, #16162a 40%, #0d0d20 100%)", icon: "📡" },
//   { bg: "linear-gradient(135deg, #001a0d 0%, #002a18 40%, #001a10 100%)", icon: "🗺️" },
//   { bg: "linear-gradient(135deg, #1a0d1a 0%, #2a152a 40%, #1a0d1a 100%)", icon: "🔭" },
//   { bg: "linear-gradient(135deg, #1a1a00 0%, #2a2a00 40%, #1a1a00 100%)", icon: "⛽" },
// ];

// const WEBINARS = [
//   {
//     id: 1, category: "gis", status: "live",
//     title: "Advanced GIS Techniques for Urban Infrastructure Mapping",
//     description: "Deep dive into cutting-edge GIS methodologies transforming how cities plan and manage critical infrastructure assets.",
//     date: "2025-05-15", time: "10:00 AM GMT", duration: "90 min",
//     speakers: [{ initials: "AK", name: "Dr. A. Kalu" }, { initials: "SM", name: "S. Musa" }],
//     registrations: 214, banner: 0,
//   },
//   {
//     id: 2, category: "drones", status: "upcoming",
//     title: "Drone-Based Pipeline Surveillance & Leak Detection",
//     description: "How UAV technology is revolutionising real-time monitoring of oil and gas pipelines across the Niger Delta region.",
//     date: "2025-05-22", time: "2:00 PM GMT", duration: "75 min",
//     speakers: [{ initials: "RO", name: "R. Okonkwo" }, { initials: "LB", name: "L. Bello" }],
//     registrations: 187, banner: 1,
//   },
//   {
//     id: 3, category: "agriculture", status: "upcoming",
//     title: "Precision Farming: Satellite Imagery & Crop Yield Analytics",
//     description: "Leveraging multispectral satellite data and AI-driven analytics to predict and improve crop yields across West Africa.",
//     date: "2025-06-03", time: "11:00 AM GMT", duration: "60 min",
//     speakers: [{ initials: "FN", name: "F. Nwosu" }],
//     registrations: 143, banner: 2,
//   },
//   {
//     id: 4, category: "oil-gas", status: "upcoming",
//     title: "Geospatial Intelligence for Offshore Asset Management",
//     description: "Integrating GIS and remote sensing for comprehensive offshore facility monitoring, risk assessment and regulatory compliance.",
//     date: "2025-06-18", time: "10:00 AM GMT", duration: "90 min",
//     speakers: [{ initials: "CE", name: "C. Effiong" }, { initials: "OA", name: "O. Adeyemi" }, { initials: "MJ", name: "M. James" }],
//     registrations: 98, banner: 3,
//   },
//   {
//     id: 5, category: "remote", status: "upcoming",
//     title: "SAR & Multispectral Remote Sensing for Environmental Monitoring",
//     description: "Practical applications of Synthetic Aperture Radar in tracking deforestation, flooding and coastal erosion dynamics.",
//     date: "2025-07-02", time: "2:00 PM GMT", duration: "90 min",
//     speakers: [{ initials: "BB", name: "B. Bassey" }],
//     registrations: 76, banner: 4,
//   },
//   {
//     id: 6, category: "gis", status: "completed",
//     title: "Land Administration & Cadastral Mapping in Emerging Markets",
//     description: "Exploring best practices for digital land registration and dispute resolution using geospatial technologies.",
//     date: "2025-04-10", time: "10:00 AM GMT", duration: "75 min",
//     speakers: [{ initials: "HI", name: "H. Ibrahim" }, { initials: "PO", name: "P. Ojo" }],
//     registrations: 302, banner: 5,
//   },
//   {
//     id: 7, category: "drones", status: "completed",
//     title: "LiDAR Point Cloud Processing for Topographic Surveys",
//     description: "End-to-end workflow for acquiring, processing and delivering LiDAR-derived products for engineering and construction.",
//     date: "2025-03-25", time: "11:00 AM GMT", duration: "90 min",
//     speakers: [{ initials: "TW", name: "T. Williams" }],
//     registrations: 258, banner: 6,
//   },
//   {
//     id: 8, category: "oil-gas", status: "upcoming",
//     title: "Digital Twin Technology in Oil Field Development Planning",
//     description: "How geospatial digital twins are reducing exploration risk and accelerating field development decisions.",
//     date: "2025-07-15", time: "1:00 PM GMT", duration: "60 min",
//     speakers: [{ initials: "JE", name: "J. Ezeh" }, { initials: "NK", name: "N. Kanu" }],
//     registrations: 54, banner: 7,
//   },
// ];

// const PER_PAGE = 6;

// // ─── Banner placeholder component ────────────────────────────────────────────
// function BannerPlaceholder({ index }) {
//   const b = BANNERS[index % BANNERS.length];
//   return (
//     <div
//       className="wcard__banner-placeholder"
//       style={{ background: b.bg }}
//     >
//       <span style={{ fontSize: "3rem", opacity: 0.35 }}>{b.icon}</span>
//       {/* decorative grid */}
//       <svg
//         style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}
//         viewBox="0 0 220 115" preserveAspectRatio="xMidYMid slice"
//       >
//         {[0,1,2,3,4,5].map(i => (
//           <line key={`v${i}`} x1={i*44} y1="0" x2={i*44} y2="115" stroke="#c9a84c" strokeWidth="0.5"/>
//         ))}
//         {[0,1,2,3].map(i => (
//           <line key={`h${i}`} x1="0" y1={i*38} x2="220" y2={i*38} stroke="#c9a84c" strokeWidth="0.5"/>
//         ))}
//       </svg>
//       {/* corner marks */}
//       <div style={{
//         position: "absolute", top: 10, left: 10, width: 18, height: 18,
//         borderTop: "1px solid rgba(201,168,76,0.4)", borderLeft: "1px solid rgba(201,168,76,0.4)"
//       }}/>
//       <div style={{
//         position: "absolute", bottom: 10, right: 10, width: 18, height: 18,
//         borderBottom: "1px solid rgba(201,168,76,0.4)", borderRight: "1px solid rgba(201,168,76,0.4)"
//       }}/>
//     </div>
//   );
// }

// // ─── Webinar Card ─────────────────────────────────────────────────────────────
// function WebinarCard({ webinar, listView }) {
//   const catLabel = CATEGORIES.find(c => c.id === webinar.category)?.label || webinar.category;
//   const isCompleted = webinar.status === "completed";
//   const isLive = webinar.status === "live";

//   return (
//     <div className="wcard">
//       {/* Banner */}
//       <div className="wcard__banner">
//         <BannerPlaceholder index={webinar.banner} />
//         <div className="wcard__banner-overlay" />
//         <div className={`wcard__status-badge ${webinar.status}`}>
//           {(isLive || webinar.status === "upcoming") && <span className="pulse" />}
//           {isLive ? "Live Now" : isCompleted ? "Recording" : "Upcoming"}
//         </div>
//         <div className="wcard__cat-badge">{catLabel}</div>
//       </div>

//       {/* Body */}
//       <div className="wcard__body">
//         <div className="wcard__date-row">
//           <span className="wcard__date">
//             {isCompleted ? "✓ " : "◷ "}{webinar.date} · {webinar.time}
//           </span>
//           <span className="wcard__duration">{webinar.duration}</span>
//         </div>
//         <h3 className="wcard__title">{webinar.title}</h3>
//         {!listView && <p className="wcard__desc">{webinar.description}</p>}

//         {/* Speakers */}
//         <div className="wcard__speakers">
//           <div className="wcard__avatars">
//             {webinar.speakers.slice(0, 3).map((s, i) => (
//               <div key={i} className="wcard__avatar">{s.initials}</div>
//             ))}
//           </div>
//           <div className="wcard__speaker-names">
//             <strong>{webinar.speakers[0].name}</strong>
//             {webinar.speakers.length > 1 && `+${webinar.speakers.length - 1} more`}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="wcard__footer">
//         <span className="wcard__reg-count">
//           {webinar.registrations.toLocaleString()} registered
//         </span>
//         <button className={`wcard__cta ${isCompleted ? "watch" : ""}`}>
//           {isLive ? "Join Now →" : isCompleted ? "▶ Watch" : "Register →"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function WebinarDiscovery() {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [searchQuery, setSearchQuery]       = useState("");
//   const [sortBy, setSortBy]                 = useState("date-asc");
//   const [viewMode, setViewMode]             = useState("grid"); // grid | list
//   const [currentPage, setCurrentPage]       = useState(1);
//   const [cardKey, setCardKey]               = useState(0); // forces re-animation
//   const searchRef = useRef(null);

//   // Re-trigger card animations on filter change
//   const triggerReveal = () => {
//     setCardKey(k => k + 1);
//     setCurrentPage(1);
//   };

//   const handleCategory = (id) => { setActiveCategory(id); triggerReveal(); };
//   const handleSearch   = (e)  => { setSearchQuery(e.target.value); triggerReveal(); };
//   const handleSort     = (e)  => { setSortBy(e.target.value); triggerReveal(); };

//   // Filter + sort
//   const filtered = useMemo(() => {
//     let list = [...WEBINARS];

//     if (activeCategory !== "all") {
//       list = list.filter(w => w.category === activeCategory);
//     }
//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       list = list.filter(w =>
//         w.title.toLowerCase().includes(q) ||
//         w.description.toLowerCase().includes(q)
//       );
//     }
//     list.sort((a, b) => {
//       if (sortBy === "date-asc")  return new Date(a.date) - new Date(b.date);
//       if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
//       if (sortBy === "popular")   return b.registrations - a.registrations;
//       return 0;
//     });
//     return list;
//   }, [activeCategory, searchQuery, sortBy]);

//   // Pagination
//   const totalPages = Math.ceil(filtered.length / PER_PAGE);
//   const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

//   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: styles }} />

//       <section className="disc-section">

//         {/* ── Header ── */}
//         <div className="disc-header">
//           <div className="disc-header__left">
//             <div className="disc-eyebrow">
//               <div className="disc-eyebrow__line" />
//               <span className="disc-eyebrow__text">Expert-Led Sessions</span>
//             </div>
//             <h2 className="disc-title">
//               Discover <em>Webinars</em>
//             </h2>
//           </div>
//           <div className="disc-header__right">
//             <div className="disc-count">
//               <strong>{filtered.length}</strong>
//               {filtered.length === WEBINARS.length ? "Total Events" : "Results Found"}
//             </div>
//           </div>
//         </div>

//         {/* ── Controls ── */}
//         <div className="disc-controls">
//           {/* Search */}
//           <div className="disc-search">
//             <span className="disc-search__icon">⌕</span>
//             <input
//               ref={searchRef}
//               type="text"
//               placeholder="Search webinars…"
//               value={searchQuery}
//               onChange={handleSearch}
//             />
//           </div>

//           {/* Category pills */}
//           <div className="disc-filters">
//             {CATEGORIES.map(cat => (
//               <button
//                 key={cat.id}
//                 className={`filter-pill ${activeCategory === cat.id ? "active" : ""}`}
//                 onClick={() => handleCategory(cat.id)}
//               >
//                 {activeCategory === cat.id && <span className="filter-pill__dot" />}
//                 {cat.label}
//               </button>
//             ))}
//           </div>

//           {/* Sort */}
//           <div className="disc-sort">
//             <select value={sortBy} onChange={handleSort}>
//               <option value="date-asc">Date: Soonest First</option>
//               <option value="date-desc">Date: Latest First</option>
//               <option value="popular">Most Popular</option>
//             </select>
//             <span className="disc-sort__chevron">▾</span>
//           </div>

//           {/* View toggle */}
//           <div className="disc-view-toggle">
//             <button
//               className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
//               onClick={() => setViewMode("grid")}
//               title="Grid view"
//             >
//               ⊞
//             </button>
//             <button
//               className={`view-btn ${viewMode === "list" ? "active" : ""}`}
//               onClick={() => setViewMode("list")}
//               title="List view"
//             >
//               ≡
//             </button>
//           </div>
//         </div>

//         {/* ── Grid ── */}
//         <div className="disc-grid-wrap">
//           <div
//             key={cardKey}
//             className={`disc-grid ${viewMode === "list" ? "list-view" : ""}`}
//           >
//             {paginated.length > 0 ? (
//               paginated.map(webinar => (
//                 <WebinarCard
//                   key={webinar.id}
//                   webinar={webinar}
//                   listView={viewMode === "list"}
//                 />
//               ))
//             ) : (
//               <div className="disc-empty">
//                 <div className="disc-empty__icon">◎</div>
//                 <div className="disc-empty__title">No webinars found</div>
//                 <div className="disc-empty__sub">
//                   Try adjusting your search or category filter
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── Pagination ── */}
//         {totalPages > 1 && (
//           <div className="disc-pagination">
//             <div className="disc-pagination__info">
//               Showing {(currentPage - 1) * PER_PAGE + 1}–
//               {Math.min(currentPage * PER_PAGE, filtered.length)} of {filtered.length} webinars
//             </div>
//             <div className="disc-pagination__controls">
//               <button
//                 className="page-btn"
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(p => p - 1)}
//               >
//                 ‹
//               </button>
//               {pageNumbers.map(n => (
//                 <button
//                   key={n}
//                   className={`page-btn ${currentPage === n ? "active" : ""}`}
//                   onClick={() => setCurrentPage(n)}
//                 >
//                   {n}
//                 </button>
//               ))}
//               <button
//                 className="page-btn"
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(p => p + 1)}
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         )}

//       </section>
//     </>
//   );
// }
