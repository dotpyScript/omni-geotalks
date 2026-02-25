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
//     --gold-glow:   rgba(201,168,76,0.20);
//     --cyan:        #00d4ff;
//     --cyan-dim:    rgba(0,212,255,0.08);
//     --ivory:       #f0ede6;
//     --ivory-dim:   rgba(240,237,230,0.55);
//     --ivory-muted: rgba(240,237,230,0.28);
//     --border:      rgba(201,168,76,0.14);
//     --border-mid:  rgba(201,168,76,0.30);
//     --border-hi:   rgba(201,168,76,0.55);
//   }

//   /* ═══════════════════════════════
//      SECTION SHELL
//   ═══════════════════════════════ */
//   .spk-section {
//     position: relative;
//     background: var(--obsidian);
//     font-family: 'DM Sans', sans-serif;
//     color: var(--ivory);
//     overflow: hidden;
//   }

//   /* diagonal slice top border */
//   .spk-section__top-rule {
//     width: 100%; height: 1px;
//     background: linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold) 70%, transparent 100%);
//     opacity: 0.2;
//   }

//   /* ambient glow orbs */
//   .spk-orb {
//     position: absolute; border-radius: 50%;
//     filter: blur(90px); pointer-events: none;
//   }
//   .spk-orb--1 {
//     width: 600px; height: 600px;
//     background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
//     top: -100px; left: -150px;
//   }
//   .spk-orb--2 {
//     width: 400px; height: 400px;
//     background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
//     bottom: 0; right: -100px;
//   }

//   /* ═══════════════════════════════
//      SECTION HEADER
//   ═══════════════════════════════ */
//   .spk-header {
//     position: relative; z-index: 2;
//     padding: 90px 60px 60px;
//     display: flex;
//     align-items: flex-end;
//     justify-content: space-between;
//     gap: 40px;
//     border-bottom: 1px solid var(--border);
//   }

//   .spk-eyebrow { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
//   .spk-eyebrow__line { width: 32px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold)); }
//   .spk-eyebrow__text { font-size: 0.68rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); }

//   .spk-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: clamp(2.4rem, 4vw, 3.8rem);
//     font-weight: 300; line-height: 1.06; color: var(--ivory);
//   }
//   .spk-title em { font-style: italic; color: var(--gold-light); }

//   .spk-header__meta {
//     text-align: right; flex-shrink: 0;
//   }
//   .spk-header__meta-num {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 3.5rem; letter-spacing: 0.04em;
//     color: var(--gold-light); line-height: 1; display: block;
//   }
//   .spk-header__meta-label {
//     font-size: 0.65rem; letter-spacing: 0.25em;
//     text-transform: uppercase; color: var(--ivory-muted);
//   }

//   /* ═══════════════════════════════
//      MAIN BODY — split layout
//   ═══════════════════════════════ */
//   .spk-body {
//     position: relative; z-index: 2;
//     display: grid;
//     grid-template-columns: 1.1fr 1fr;
//     min-height: 700px;
//   }

//   /* ─── LEFT: Spotlight Panel ─── */
//   .spk-spotlight {
//     position: relative;
//     border-right: 1px solid var(--border);
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//     min-height: 700px;
//   }

//   /* large letter monogram bg */
//   .spk-spotlight__monogram {
//     position: absolute;
//     top: 50%; left: 50%;
//     transform: translate(-50%, -50%);
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: clamp(14rem, 22vw, 22rem);
//     letter-spacing: -0.05em;
//     color: rgba(201,168,76,0.04);
//     user-select: none; pointer-events: none;
//     transition: opacity 0.5s ease, color 0.5s ease;
//     white-space: nowrap;
//     line-height: 1;
//   }

//   /* avatar portrait area */
//   .spk-spotlight__portrait {
//     position: absolute;
//     inset: 0; z-index: 1;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .spk-spotlight__avatar-ring {
//     position: relative;
//     width: 260px; height: 260px;
//   }
//   /* spinning dashed ring */
//   .spk-spotlight__avatar-ring::before {
//     content: '';
//     position: absolute;
//     inset: -16px;
//     border-radius: 50%;
//     border: 1px dashed rgba(201,168,76,0.25);
//     animation: spinSlow 20s linear infinite;
//   }
//   .spk-spotlight__avatar-ring::after {
//     content: '';
//     position: absolute;
//     inset: -32px;
//     border-radius: 50%;
//     border: 1px solid rgba(201,168,76,0.08);
//     animation: spinSlow 35s linear infinite reverse;
//   }
//   @keyframes spinSlow {
//     from { transform: rotate(0deg); }
//     to   { transform: rotate(360deg); }
//   }

//   .spk-spotlight__img {
//     width: 260px; height: 260px;
//     border-radius: 50%;
//     object-fit: cover;
//     border: 3px solid rgba(201,168,76,0.25);
//     box-shadow: 0 0 60px rgba(201,168,76,0.15), 0 0 0 1px rgba(201,168,76,0.12);
//     transition: box-shadow 0.4s ease;
//     background: var(--obsidian-3);
//     display: flex; align-items: center; justify-content: center;
//     overflow: hidden;
//   }
//   .spk-spotlight__img-inner {
//     width: 100%; height: 100%;
//     border-radius: 50%;
//     background: linear-gradient(145deg, var(--obsidian-4), var(--obsidian-3));
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 5rem;
//     font-weight: 300;
//     color: var(--gold-light);
//     letter-spacing: -0.02em;
//     transition: all 0.4s ease;
//   }

//   /* scan-line overlay on portrait */
//   .spk-spotlight__scanlines {
//     position: absolute; inset: 0; z-index: 2;
//     background: repeating-linear-gradient(
//       0deg,
//       transparent,
//       transparent 3px,
//       rgba(0,0,0,0.03) 3px,
//       rgba(0,0,0,0.03) 4px
//     );
//     pointer-events: none;
//   }

//   /* Content lower panel */
//   .spk-spotlight__content {
//     position: relative; z-index: 3;
//     padding: 40px 48px;
//     background: linear-gradient(0deg, var(--obsidian) 50%, transparent 100%);
//     transition: all 0.4s ease;
//   }

//   .spk-spotlight__role-badge {
//     display: inline-flex; align-items: center; gap: 8px;
//     font-size: 0.62rem; letter-spacing: 0.25em; text-transform: uppercase;
//     padding: 5px 12px; margin-bottom: 16px;
//     transition: all 0.3s ease;
//   }
//   .spk-spotlight__role-badge.host {
//     color: var(--gold);
//     border: 1px solid rgba(201,168,76,0.3);
//     background: var(--gold-dim);
//   }
//   .spk-spotlight__role-badge.guest {
//     color: var(--cyan);
//     border: 1px solid rgba(0,212,255,0.25);
//     background: var(--cyan-dim);
//   }
//   .spk-spotlight__role-badge .dot {
//     width: 5px; height: 5px; border-radius: 50%; background: currentColor;
//     animation: pulse 2s infinite;
//   }
//   @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.75)} }

//   .spk-spotlight__name {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: clamp(2rem, 3.5vw, 3.2rem);
//     font-weight: 300; line-height: 1.1; color: var(--ivory);
//     margin-bottom: 6px;
//     transition: color 0.4s ease;
//   }

//   .spk-spotlight__title {
//     font-size: 0.8rem; color: var(--gold-light);
//     font-weight: 400; letter-spacing: 0.05em; margin-bottom: 4px;
//   }
//   .spk-spotlight__org {
//     font-size: 0.72rem; color: var(--ivory-muted);
//     font-weight: 300; letter-spacing: 0.06em; margin-bottom: 20px;
//   }

//   .spk-spotlight__bio {
//     font-size: 0.8rem; line-height: 1.7;
//     color: var(--ivory-dim); font-weight: 300;
//     display: -webkit-box;
//     -webkit-line-clamp: 3;
//     -webkit-box-orient: vertical;
//     overflow: hidden;
//     margin-bottom: 24px;
//   }

//   .spk-spotlight__actions {
//     display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
//   }

//   .spk-btn-primary {
//     display: inline-flex; align-items: center; gap: 10px;
//     font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
//     color: var(--obsidian);
//     background: linear-gradient(135deg, var(--gold), var(--gold-light));
//     border: none; padding: 12px 24px; cursor: pointer;
//     font-family: 'DM Sans', sans-serif; font-weight: 500;
//     clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
//     transition: all 0.25s;
//   }
//   .spk-btn-primary:hover {
//     background: linear-gradient(135deg, var(--gold-light), var(--gold-pale));
//     box-shadow: 0 8px 24px rgba(201,168,76,0.3);
//     transform: translateY(-1px);
//   }

//   .spk-btn-ghost {
//     display: inline-flex; align-items: center; gap: 8px;
//     font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase;
//     color: var(--ivory-dim); background: transparent;
//     border: 1px solid var(--border); padding: 11px 20px;
//     cursor: pointer; font-family: 'DM Sans', sans-serif;
//     transition: all 0.25s;
//   }
//   .spk-btn-ghost:hover {
//     border-color: var(--border-mid); color: var(--ivory);
//     background: var(--gold-dim);
//   }

//   .spk-spotlight__webinars {
//     display: flex; align-items: center; gap: 8px;
//     margin-top: 18px; padding-top: 18px;
//     border-top: 1px solid var(--border);
//     font-size: 0.65rem; letter-spacing: 0.12em;
//     text-transform: uppercase; color: var(--ivory-muted);
//   }
//   .spk-spotlight__webinars strong {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 1.1rem; color: var(--gold-light);
//     letter-spacing: 0.05em; margin-right: 2px;
//   }

//   /* fade transition on panel switch */
//   .spk-spotlight__content.switching {
//     opacity: 0; transform: translateY(10px);
//   }
//   .spk-spotlight__content.visible {
//     opacity: 1; transform: translateY(0);
//     transition: opacity 0.35s ease, transform 0.35s ease;
//   }

//   /* ─── RIGHT: Speaker Roster ─── */
//   .spk-roster {
//     display: flex;
//     flex-direction: column;
//     overflow-y: auto;
//     max-height: 700px;
//     scrollbar-width: thin;
//     scrollbar-color: var(--border) transparent;
//   }
//   .spk-roster::-webkit-scrollbar { width: 4px; }
//   .spk-roster::-webkit-scrollbar-track { background: transparent; }
//   .spk-roster::-webkit-scrollbar-thumb {
//     background: var(--border); border-radius: 2px;
//   }

//   /* Roster item */
//   .spk-item {
//     display: flex; align-items: center; gap: 20px;
//     padding: 22px 36px;
//     border-bottom: 1px solid var(--border);
//     cursor: pointer;
//     transition: background 0.25s, padding-left 0.25s;
//     position: relative;
//     overflow: hidden;
//     animation: rosterReveal 0.5s ease both;
//   }
//   .spk-item::before {
//     content: '';
//     position: absolute;
//     left: 0; top: 0; bottom: 0;
//     width: 3px;
//     background: linear-gradient(180deg, var(--gold), transparent);
//     transform: scaleY(0);
//     transform-origin: top;
//     transition: transform 0.3s ease;
//   }
//   .spk-item:hover::before,
//   .spk-item.active::before { transform: scaleY(1); }

//   .spk-item:hover { background: rgba(201,168,76,0.03); padding-left: 42px; }
//   .spk-item.active {
//     background: linear-gradient(90deg, rgba(201,168,76,0.07), transparent);
//     padding-left: 42px;
//   }

//   @keyframes rosterReveal {
//     from { opacity: 0; transform: translateX(20px); }
//     to   { opacity: 1; transform: translateX(0); }
//   }
//   .spk-item:nth-child(1)  { animation-delay: 0.05s; }
//   .spk-item:nth-child(2)  { animation-delay: 0.10s; }
//   .spk-item:nth-child(3)  { animation-delay: 0.15s; }
//   .spk-item:nth-child(4)  { animation-delay: 0.20s; }
//   .spk-item:nth-child(5)  { animation-delay: 0.25s; }
//   .spk-item:nth-child(6)  { animation-delay: 0.30s; }
//   .spk-item:nth-child(7)  { animation-delay: 0.35s; }
//   .spk-item:nth-child(8)  { animation-delay: 0.40s; }

//   /* item avatar */
//   .spk-item__avatar {
//     width: 52px; height: 52px; border-radius: 50%; flex-shrink: 0;
//     border: 1px solid var(--border);
//     background: linear-gradient(145deg, var(--obsidian-4), var(--obsidian-3));
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.1rem; font-weight: 400; color: var(--gold-light);
//     transition: border-color 0.25s, box-shadow 0.25s;
//     overflow: hidden; position: relative;
//   }
//   .spk-item.active .spk-item__avatar,
//   .spk-item:hover .spk-item__avatar {
//     border-color: var(--gold);
//     box-shadow: 0 0 16px rgba(201,168,76,0.2);
//   }
//   /* shimmer on active avatar */
//   .spk-item.active .spk-item__avatar::after {
//     content: '';
//     position: absolute; inset: 0;
//     background: linear-gradient(135deg, rgba(201,168,76,0.15), transparent);
//     border-radius: 50%;
//   }

//   .spk-item__info { flex: 1; min-width: 0; }
//   .spk-item__name {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.05rem; font-weight: 400; color: var(--ivory);
//     white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
//     transition: color 0.25s; margin-bottom: 3px;
//   }
//   .spk-item.active .spk-item__name,
//   .spk-item:hover .spk-item__name { color: var(--gold-pale); }

//   .spk-item__role {
//     font-size: 0.68rem; color: var(--ivory-muted);
//     font-weight: 300; white-space: nowrap; overflow: hidden;
//     text-overflow: ellipsis; letter-spacing: 0.03em; margin-bottom: 2px;
//   }
//   .spk-item__org {
//     font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
//     color: var(--gold); opacity: 0.7; transition: opacity 0.25s;
//   }
//   .spk-item:hover .spk-item__org, .spk-item.active .spk-item__org { opacity: 1; }

//   .spk-item__right {
//     display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0;
//   }
//   .spk-item__badge {
//     font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase;
//     padding: 3px 9px;
//   }
//   .spk-item__badge.host {
//     color: var(--gold); border: 1px solid rgba(201,168,76,0.3); background: var(--gold-dim);
//   }
//   .spk-item__badge.guest {
//     color: var(--cyan); border: 1px solid rgba(0,212,255,0.2); background: var(--cyan-dim);
//   }
//   .spk-item__webinars {
//     font-size: 0.6rem; letter-spacing: 0.1em; color: var(--ivory-muted);
//     display: flex; align-items: center; gap: 5px;
//   }
//   .spk-item__webinars::before { content: '◈'; color: var(--gold); font-size: 0.55rem; }

//   /* arrow indicator */
//   .spk-item__arrow {
//     font-size: 0.8rem; color: var(--gold);
//     opacity: 0; transform: translateX(-6px);
//     transition: opacity 0.2s, transform 0.2s;
//   }
//   .spk-item:hover .spk-item__arrow,
//   .spk-item.active .spk-item__arrow { opacity: 1; transform: translateX(0); }

//   /* ═══════════════════════════════
//      BOTTOM MARQUEE — expertise tags
//   ═══════════════════════════════ */
//   .spk-tags-bar {
//     position: relative; z-index: 2;
//     border-top: 1px solid var(--border);
//     padding: 20px 0;
//     overflow: hidden;
//     background: var(--obsidian-2);
//   }
//   .spk-tags-track {
//     display: flex; gap: 0;
//     animation: tagMarquee 30s linear infinite;
//     white-space: nowrap;
//   }
//   .spk-tags-track:hover { animation-play-state: paused; }

//   .spk-tag {
//     display: inline-flex; align-items: center; gap: 10px;
//     padding: 0 28px;
//     font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase;
//     color: var(--ivory-muted);
//     cursor: default;
//     transition: color 0.2s;
//   }
//   .spk-tag:hover { color: var(--gold-light); }
//   .spk-tag .sep { color: var(--gold); opacity: 0.5; font-size: 0.5rem; }

//   @keyframes tagMarquee {
//     from { transform: translateX(0); }
//     to   { transform: translateX(-50%); }
//   }

//   /* ═══════════════════════════════
//      RESPONSIVE
//   ═══════════════════════════════ */
//   @media (max-width: 1024px) {
//     .spk-body { grid-template-columns: 1fr; }
//     .spk-spotlight {
//       min-height: 500px;
//       border-right: none;
//       border-bottom: 1px solid var(--border);
//     }
//     .spk-roster { max-height: none; }
//   }
//   @media (max-width: 640px) {
//     .spk-header { padding: 60px 24px 40px; flex-direction: column; align-items: flex-start; }
//     .spk-spotlight__content { padding: 28px 24px; }
//     .spk-item { padding: 18px 24px; }
//     .spk-item:hover, .spk-item.active { padding-left: 28px; }
//   }
// `;

// // ─── Expertise tags for marquee ───────────────────────────────────────────────
// const TAGS = [
//   "GIS Analysis", "Remote Sensing", "UAV Operations", "LiDAR Processing",
//   "Spatial Databases", "Precision Agriculture", "Oil Field Intelligence",
//   "Cadastral Systems", "Digital Twins", "SAR Interpretation",
//   "Environmental Monitoring", "Coastal Mapping", "Python & QGIS",
//   "ArcGIS Enterprise", "Drone Photogrammetry", "Land Administration",
// ];

// // ─── Speaker data ──────────────────────────────────────────────────────────────
// const SPEAKERS = [
//   {
//     id: 1,
//     initials: "AK",
//     name: "Dr. Adaeze Kalu",
//     title: "Principal GIS Scientist",
//     org: "Federal Ministry of Environment, Nigeria",
//     role: "host",
//     category: "GIS & Spatial Mapping",
//     webinars: 6,
//     bio: "Dr. Kalu is a pioneer in applied geospatial science across Sub-Saharan Africa, with over 18 years of experience in land use mapping, environmental monitoring, and spatial data infrastructure development for government agencies. She holds a PhD in Geoinformatics from ITC Netherlands.",
//     linkedin: "#",
//     expertise: ["GIS Analysis", "Environmental Monitoring", "Spatial Policy"],
//     accentColor: "rgba(0,80,160,0.3)",
//   },
//   {
//     id: 2,
//     initials: "RO",
//     name: "Engr. Raymond Okonkwo",
//     title: "UAV Systems Lead",
//     org: "Shell Nigeria Exploration",
//     role: "host",
//     category: "Drone Surveys",
//     webinars: 4,
//     bio: "Raymond leads UAV survey operations for offshore and onshore pipeline surveillance across the Niger Delta. His work on autonomous drone corridors has been cited in IEEE Geoscience journals. He is a certified remote pilot with over 2,000 flight hours.",
//     linkedin: "#",
//     expertise: ["UAV Operations", "Pipeline Surveillance", "Oil Field Intelligence"],
//     accentColor: "rgba(0,180,120,0.25)",
//   },
//   {
//     id: 3,
//     initials: "FM",
//     name: "Dr. Fatima Musa",
//     title: "Senior Remote Sensing Analyst",
//     org: "NASRDA — Space Agency Nigeria",
//     role: "guest",
//     category: "Remote Sensing",
//     webinars: 3,
//     bio: "Dr. Musa specialises in SAR and multispectral satellite data processing for national security and environmental risk assessment. She has contributed to flood early-warning systems serving over 3 million Nigerians across the Benue River basin.",
//     linkedin: "#",
//     expertise: ["SAR Interpretation", "Flood Mapping", "Satellite Analytics"],
//     accentColor: "rgba(0,120,200,0.25)",
//   },
//   {
//     id: 4,
//     initials: "CE",
//     name: "Chief Emmanuel Effiong",
//     title: "Executive Director, Geospatial Services",
//     org: "NNPC Upstream",
//     role: "host",
//     category: "Oil & Gas",
//     webinars: 5,
//     bio: "Chief Effiong oversees all geospatial operations for NNPC's upstream division, managing a portfolio of 14 active fields across the Niger Delta and deep-water blocks. He championed the first digital twin initiative for Nigerian oilfield development planning.",
//     linkedin: "#",
//     expertise: ["Digital Twins", "Oil Field Intelligence", "Regulatory Compliance"],
//     accentColor: "rgba(200,80,0,0.22)",
//   },
//   {
//     id: 5,
//     initials: "LB",
//     name: "Lara Bello, MSc",
//     title: "Precision Agriculture Consultant",
//     org: "AfricaRice / CGIAR",
//     role: "guest",
//     category: "Precision Agriculture",
//     webinars: 3,
//     bio: "Lara works at the intersection of satellite imagery and smallholder farming, designing crop monitoring dashboards for over 40,000 rice farmers in Ebonyi and Kebbi States. Her soil-health spectral indices have been adopted by two West African governments.",
//     linkedin: "#",
//     expertise: ["Precision Agriculture", "Crop Yield Analytics", "NDVI Analysis"],
//     accentColor: "rgba(80,160,0,0.22)",
//   },
//   {
//     id: 6,
//     initials: "HI",
//     name: "Barrister Haruna Ibrahim",
//     title: "Director of Land Administration",
//     org: "Rivers State Government",
//     role: "host",
//     category: "Land Administration",
//     webinars: 2,
//     bio: "Barrister Ibrahim has spent two decades reforming land tenure law in Rivers State, spearheading Nigeria's first fully paperless cadastral registration system. His work has reduced land dispute litigation by 68% in Port Harcourt Metropolitan Area.",
//     linkedin: "#",
//     expertise: ["Cadastral Systems", "Land Administration", "Property Law"],
//     accentColor: "rgba(160,100,0,0.22)",
//   },
//   {
//     id: 7,
//     initials: "TW",
//     name: "Tunde Williams",
//     title: "LiDAR & Photogrammetry Expert",
//     org: "Fugro West Africa",
//     role: "guest",
//     category: "Drone Surveys",
//     webinars: 4,
//     bio: "Tunde leads LiDAR acquisition and point-cloud processing projects across West Africa, delivering topographic datasets for major infrastructure projects including the Lagos-Ibadan expressway expansion and Dangote Refinery site surveys.",
//     linkedin: "#",
//     expertise: ["LiDAR Processing", "Drone Photogrammetry", "Point Cloud Analysis"],
//     accentColor: "rgba(100,0,180,0.2)",
//   },
//   {
//     id: 8,
//     initials: "NK",
//     name: "Dr. Ngozi Kanu",
//     title: "Head of Spatial Analytics",
//     org: "University of Port Harcourt",
//     role: "guest",
//     category: "GIS & Spatial Mapping",
//     webinars: 3,
//     bio: "Dr. Kanu leads the department of Geospatial Engineering at UNIPORT, combining academic rigour with applied research. Her lab has produced 24 PhD graduates now leading geospatial practices across 12 African nations.",
//     linkedin: "#",
//     expertise: ["Spatial Databases", "Python & QGIS", "ArcGIS Enterprise"],
//     accentColor: "rgba(0,180,180,0.2)",
//   },
// ];

// // ─── Spotlight panel ──────────────────────────────────────────────────────────
// function Spotlight({ speaker, switching }) {
//   if (!speaker) return null;
//   return (
//     <div className="spk-spotlight">
//       {/* Large monogram bg */}
//       <div className="spk-spotlight__monogram"
//         style={{ color: `rgba(201,168,76,0.035)` }}
//       >
//         {speaker.initials}
//       </div>

//       {/* Ambient glow behind portrait */}
//       <div style={{
//         position: "absolute", inset: 0, zIndex: 0,
//         background: `radial-gradient(ellipse at 50% 40%, ${speaker.accentColor} 0%, transparent 65%)`,
//         transition: "background 0.5s ease",
//       }} />

//       {/* Portrait */}
//       <div className="spk-spotlight__portrait">
//         <div className="spk-spotlight__avatar-ring">
//           <div className="spk-spotlight__img">
//             <div className="spk-spotlight__img-inner">
//               {speaker.initials}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scan lines */}
//       <div className="spk-spotlight__scanlines" />

//       {/* Content */}
//       <div className={`spk-spotlight__content ${switching ? "switching" : "visible"}`}>
//         <div className={`spk-spotlight__role-badge ${speaker.role}`}>
//           <span className="dot" />
//           {speaker.role === "host" ? "Lead Speaker" : "Guest Speaker"}
//         </div>

//         <h3 className="spk-spotlight__name">{speaker.name}</h3>
//         <div className="spk-spotlight__title">{speaker.title}</div>
//         <div className="spk-spotlight__org">{speaker.org}</div>
//         <p className="spk-spotlight__bio">{speaker.bio}</p>

//         {/* Expertise tags */}
//         <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
//           {speaker.expertise.map(tag => (
//             <span key={tag} style={{
//               fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase",
//               padding: "4px 10px", border: "1px solid rgba(201,168,76,0.2)",
//               color: "rgba(240,237,230,0.45)", background: "rgba(201,168,76,0.05)",
//             }}>
//               {tag}
//             </span>
//           ))}
//         </div>

//         <div className="spk-spotlight__actions">
//           <button className="spk-btn-primary">
//             View Profile →
//           </button>
//           <button className="spk-btn-ghost">
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
//               <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
//             </svg>
//             LinkedIn
//           </button>
//         </div>

//         <div className="spk-spotlight__webinars">
//           <strong>{speaker.webinars}</strong>
//           webinars hosted &nbsp;·&nbsp; {speaker.category}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Roster item ──────────────────────────────────────────────────────────────
// function RosterItem({ speaker, isActive, onClick }) {
//   return (
//     <div
//       className={`spk-item ${isActive ? "active" : ""}`}
//       onClick={onClick}
//     >
//       <div className="spk-item__avatar">{speaker.initials}</div>
//       <div className="spk-item__info">
//         <div className="spk-item__name">{speaker.name}</div>
//         <div className="spk-item__role">{speaker.title}</div>
//         <div className="spk-item__org">{speaker.org}</div>
//       </div>
//       <div className="spk-item__right">
//         <span className={`spk-item__badge ${speaker.role}`}>
//           {speaker.role === "host" ? "Lead" : "Guest"}
//         </span>
//         <span className="spk-item__webinars">{speaker.webinars} sessions</span>
//       </div>
//       <span className="spk-item__arrow">›</span>
//     </div>
//   );
// }

// // ─── Main export ──────────────────────────────────────────────────────────────
// export default function SpeakersSection() {
//   const [activeId, setActiveId]   = useState(SPEAKERS[0].id);
//   const [switching, setSwitching] = useState(false);

//   const activeSpeaker = SPEAKERS.find(s => s.id === activeId);

//   const handleSelect = (id) => {
//     if (id === activeId) return;
//     setSwitching(true);
//     setTimeout(() => {
//       setActiveId(id);
//       setSwitching(false);
//     }, 220);
//   };

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: styles }} />

//       <section className="spk-section">
//         <div className="spk-section__top-rule" />
//         <div className="spk-orb spk-orb--1" />
//         <div className="spk-orb spk-orb--2" />

//         {/* Header */}
//         <div className="spk-header">
//           <div>
//             <div className="spk-eyebrow">
//               <div className="spk-eyebrow__line" />
//               <span className="spk-eyebrow__text">World-Class Expertise</span>
//             </div>
//             <h2 className="spk-title">Meet the <em>Speakers</em></h2>
//           </div>
//           <div className="spk-header__meta">
//             <span className="spk-header__meta-num">{SPEAKERS.length}</span>
//             <span className="spk-header__meta-label">Expert Speakers<br/>This Season</span>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="spk-body">
//           {/* Left: spotlight */}
//           <Spotlight speaker={activeSpeaker} switching={switching} />

//           {/* Right: roster */}
//           <div className="spk-roster">
//             {SPEAKERS.map(speaker => (
//               <RosterItem
//                 key={speaker.id}
//                 speaker={speaker}
//                 isActive={speaker.id === activeId}
//                 onClick={() => handleSelect(speaker.id)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Tags marquee */}
//         <div className="spk-tags-bar">
//           <div className="spk-tags-track">
//             {[...TAGS, ...TAGS].map((tag, i) => (
//               <span key={i} className="spk-tag">
//                 {tag}
//                 <span className="sep">◆</span>
//               </span>
//             ))}
//           </div>
//         </div>

//       </section>
//     </>
//   );
// }
