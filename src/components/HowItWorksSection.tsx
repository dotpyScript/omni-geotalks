// "use client";

// import { useState, useEffect, useRef } from "react";

// // ─── Styles ────────────────────────────────────────────────────────────────────
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
//     --green:       #00e5a0;
//     --green-dim:   rgba(0,229,160,0.08);
//     --ivory:       #f0ede6;
//     --ivory-dim:   rgba(240,237,230,0.55);
//     --ivory-muted: rgba(240,237,230,0.28);
//     --border:      rgba(201,168,76,0.14);
//     --border-mid:  rgba(201,168,76,0.30);
//     --border-hi:   rgba(201,168,76,0.55);
//   }

//   /* ══════════════════════════════════
//      SECTION SHELL
//   ══════════════════════════════════ */
//   .hiw {
//     position: relative;
//     background: var(--obsidian-3);
//     font-family: 'DM Sans', sans-serif;
//     color: var(--ivory);
//     overflow: hidden;
//     padding: 0 0 0;
//   }

//   /* Blueprint grid overlay */
//   .hiw::before {
//     content: '';
//     position: absolute; inset: 0; z-index: 0; pointer-events: none;
//     background-image:
//       linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px),
//       linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px);
//     background-size: 48px 48px;
//   }

//   /* Top diagonal rule */
//   .hiw::after {
//     content: '';
//     position: absolute; top: 0; left: 0; right: 0; height: 1px;
//     background: linear-gradient(90deg, transparent 0%, var(--gold) 25%, var(--gold) 75%, transparent 100%);
//     opacity: 0.2; z-index: 1;
//   }

//   /* Ambient glow */
//   .hiw-glow {
//     position: absolute; z-index: 0; pointer-events: none; border-radius: 50%; filter: blur(100px);
//   }
//   .hiw-glow--1 {
//     width: 500px; height: 300px;
//     background: radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%);
//     top: 20%; left: -100px;
//   }
//   .hiw-glow--2 {
//     width: 400px; height: 400px;
//     background: radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%);
//     bottom: 10%; right: -80px;
//   }

//   /* ══════════════════════════════════
//      HEADER
//   ══════════════════════════════════ */
//   .hiw-header {
//     position: relative; z-index: 2;
//     padding: 100px 60px 0;
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 40px; align-items: end;
//     margin-bottom: 80px;
//   }

//   .hiw-eyebrow { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
//   .hiw-eyebrow__line { width: 32px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold)); }
//   .hiw-eyebrow__text { font-size: 0.68rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); }

//   .hiw-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: clamp(2.4rem, 4vw, 3.8rem);
//     font-weight: 300; line-height: 1.06; color: var(--ivory);
//   }
//   .hiw-title em { font-style: italic; color: var(--gold-light); }

//   .hiw-subtitle {
//     font-size: 0.88rem; line-height: 1.75; color: var(--ivory-dim);
//     font-weight: 300; max-width: 400px;
//   }
//   .hiw-subtitle strong { color: var(--gold-light); font-weight: 400; }

//   /* ══════════════════════════════════
//      PROCESS — horizontal timeline
//   ══════════════════════════════════ */
//   .hiw-process {
//     position: relative; z-index: 2;
//     padding: 0 60px 0;
//   }

//   /* The connecting line track */
//   .hiw-track {
//     position: relative;
//     display: grid;
//     grid-template-columns: repeat(5, 1fr);
//     gap: 0;
//     margin-bottom: 0;
//   }

//   /* Continuous line behind nodes */
//   .hiw-track__line {
//     position: absolute;
//     top: 52px; /* vertically centered on node */
//     left: calc(100% / 10); /* start at centre of first col */
//     right: calc(100% / 10);
//     height: 1px;
//     background: var(--border);
//     z-index: 0;
//     overflow: hidden;
//   }
//   .hiw-track__line-fill {
//     height: 100%; width: 0;
//     background: linear-gradient(90deg, var(--gold), var(--gold-light));
//     transition: width 1.8s cubic-bezier(0.4, 0, 0.2, 1);
//   }
//   .hiw-track__line-fill.animated { width: 100%; }

//   /* ── Step node ── */
//   .hiw-step {
//     position: relative; z-index: 1;
//     display: flex; flex-direction: column; align-items: center;
//     cursor: pointer;
//     padding-bottom: 0;
//   }

//   /* Number node circle */
//   .hiw-step__node {
//     width: 104px; height: 104px;
//     border-radius: 50%;
//     border: 1px solid var(--border);
//     background: var(--obsidian-2);
//     display: flex; align-items: center; justify-content: center;
//     position: relative; z-index: 2;
//     transition: all 0.4s ease;
//     margin-bottom: 32px;
//     flex-shrink: 0;
//   }
//   /* Outer ring */
//   .hiw-step__node::before {
//     content: '';
//     position: absolute; inset: -8px; border-radius: 50%;
//     border: 1px dashed rgba(201,168,76,0.15);
//     transition: all 0.4s ease;
//   }
//   /* Glow ring on active/hover */
//   .hiw-step__node::after {
//     content: '';
//     position: absolute; inset: -16px; border-radius: 50%;
//     border: 1px solid transparent;
//     transition: all 0.4s ease;
//   }

//   .hiw-step.active .hiw-step__node,
//   .hiw-step:hover .hiw-step__node {
//     border-color: var(--gold);
//     background: linear-gradient(145deg, var(--obsidian-3), var(--obsidian-4));
//     box-shadow: 0 0 32px rgba(201,168,76,0.2), 0 0 64px rgba(201,168,76,0.08);
//   }
//   .hiw-step.active .hiw-step__node::before,
//   .hiw-step:hover .hiw-step__node::before {
//     border-color: rgba(201,168,76,0.3);
//     transform: scale(1.05);
//   }
//   .hiw-step.active .hiw-step__node::after,
//   .hiw-step:hover .hiw-step__node::after {
//     border-color: rgba(201,168,76,0.1);
//     transform: scale(1.1);
//   }

//   /* Step number */
//   .hiw-step__num {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 2.6rem; letter-spacing: 0.04em;
//     color: var(--ivory-muted); line-height: 1;
//     transition: color 0.3s, transform 0.3s;
//   }
//   .hiw-step.active .hiw-step__num,
//   .hiw-step:hover .hiw-step__num {
//     color: var(--gold-light);
//     transform: scale(1.1);
//   }

//   /* SVG icon inside node — shown when active */
//   .hiw-step__icon {
//     position: absolute;
//     opacity: 0; transform: scale(0.5);
//     transition: all 0.3s ease;
//   }
//   .hiw-step.active .hiw-step__icon,
//   .hiw-step:hover .hiw-step__icon {
//     opacity: 1; transform: scale(1);
//   }
//   .hiw-step.active .hiw-step__num,
//   .hiw-step:hover .hiw-step__num {
//     opacity: 0; transform: scale(0.5) translateY(-4px);
//   }

//   /* Label below node */
//   .hiw-step__label {
//     font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase;
//     color: var(--ivory-muted); text-align: center;
//     transition: color 0.3s;
//     padding: 0 8px;
//   }
//   .hiw-step.active .hiw-step__label,
//   .hiw-step:hover .hiw-step__label { color: var(--gold); }

//   /* ══════════════════════════════════
//      DETAIL PANEL — slides open below steps
//   ══════════════════════════════════ */
//   .hiw-detail {
//     position: relative; z-index: 2;
//     overflow: hidden;
//     max-height: 0;
//     transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//   }
//   .hiw-detail.open { max-height: 500px; }

//   .hiw-detail__inner {
//     padding: 56px 60px 72px;
//     display: grid;
//     grid-template-columns: 1fr 1.2fr 1fr;
//     gap: 0;
//     border-top: 1px solid var(--border);
//     margin-top: 40px;
//     opacity: 0; transform: translateY(16px);
//     transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s;
//   }
//   .hiw-detail.open .hiw-detail__inner {
//     opacity: 1; transform: translateY(0);
//   }

//   /* Left: step info */
//   .hiw-detail__left {
//     padding-right: 48px;
//     border-right: 1px solid var(--border);
//   }

//   .hiw-detail__step-num {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 5rem; letter-spacing: 0.04em;
//     color: rgba(201,168,76,0.08); line-height: 1;
//     margin-bottom: -8px;
//   }
//   .hiw-detail__tag {
//     display: inline-block; font-size: 0.6rem; letter-spacing: 0.25em;
//     text-transform: uppercase; color: var(--gold);
//     border: 1px solid var(--border); padding: 4px 10px;
//     background: var(--gold-dim); margin-bottom: 16px;
//   }
//   .hiw-detail__heading {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 2rem; font-weight: 300; line-height: 1.2;
//     color: var(--ivory); margin-bottom: 16px;
//   }
//   .hiw-detail__heading em { font-style: italic; color: var(--gold-light); }
//   .hiw-detail__body {
//     font-size: 0.8rem; line-height: 1.75; color: var(--ivory-dim);
//     font-weight: 300;
//   }

//   /* Center: checklist / form fields / email list */
//   .hiw-detail__center {
//     padding: 0 48px;
//     border-right: 1px solid var(--border);
//   }
//   .hiw-detail__center-label {
//     font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase;
//     color: var(--ivory-muted); margin-bottom: 20px;
//   }
//   .hiw-checklist { list-style: none; display: flex; flex-direction: column; gap: 12px; }
//   .hiw-checklist li {
//     display: flex; align-items: flex-start; gap: 12px;
//     font-size: 0.78rem; color: var(--ivory-dim); font-weight: 300; line-height: 1.5;
//   }
//   .hiw-checklist__icon {
//     width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 0.6rem; border: 1px solid rgba(201,168,76,0.3);
//     background: var(--gold-dim); color: var(--gold);
//   }

//   /* Right: outcome / cta */
//   .hiw-detail__right { padding-left: 48px; }
//   .hiw-detail__outcome-label {
//     font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase;
//     color: var(--ivory-muted); margin-bottom: 16px;
//   }
//   .hiw-detail__outcome {
//     background: linear-gradient(145deg, var(--obsidian-2), var(--obsidian-4));
//     border: 1px solid var(--border); padding: 22px;
//     position: relative; overflow: hidden; margin-bottom: 24px;
//   }
//   .hiw-detail__outcome::before {
//     content: ''; position: absolute; top: 0; left: 0;
//     width: 100%; height: 2px;
//     background: linear-gradient(90deg, var(--gold), transparent);
//   }
//   .hiw-detail__outcome-text {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.05rem; font-weight: 300; line-height: 1.5;
//     color: var(--ivory-dim); font-style: italic;
//   }
//   .hiw-detail__outcome-text strong {
//     font-style: normal; color: var(--gold-light); font-weight: 400;
//   }

//   .hiw-detail__cta {
//     display: inline-flex; align-items: center; gap: 10px;
//     font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
//     color: var(--obsidian);
//     background: linear-gradient(135deg, var(--gold), var(--gold-light));
//     border: none; padding: 13px 26px; cursor: pointer;
//     font-family: 'DM Sans', sans-serif; font-weight: 500;
//     clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
//     transition: all 0.25s;
//   }
//   .hiw-detail__cta:hover {
//     background: linear-gradient(135deg, var(--gold-light), var(--gold-pale));
//     box-shadow: 0 8px 24px rgba(201,168,76,0.3);
//     transform: translateY(-1px);
//   }

//   /* ══════════════════════════════════
//      EMAIL PREVIEW CARD (step 3 detail)
//   ══════════════════════════════════ */
//   .email-preview {
//     background: var(--obsidian-2); border: 1px solid var(--border);
//     overflow: hidden;
//   }
//   .email-preview__header {
//     padding: 10px 14px; border-bottom: 1px solid var(--border);
//     display: flex; align-items: center; gap: 8px;
//   }
//   .email-preview__dot {
//     width: 8px; height: 8px; border-radius: 50%;
//   }
//   .email-preview__subject {
//     font-size: 0.65rem; color: var(--ivory-muted); letter-spacing: 0.06em; flex: 1;
//   }
//   .email-preview__body { padding: 14px; }
//   .email-preview__line {
//     height: 6px; border-radius: 2px; background: var(--obsidian-4); margin-bottom: 7px;
//   }
//   .email-preview__line.gold { background: rgba(201,168,76,0.2); width: 60%; }
//   .email-preview__line.short { width: 40%; }
//   .email-preview__line.medium { width: 75%; }

//   /* ══════════════════════════════════
//      BOTTOM GUARANTEE STRIP
//   ══════════════════════════════════ */
//   .hiw-guarantee {
//     position: relative; z-index: 2;
//     border-top: 1px solid var(--border);
//     padding: 32px 60px;
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     gap: 0;
//     background: rgba(8,10,15,0.5);
//   }
//   .hiw-guarantee__item {
//     display: flex; align-items: center; gap: 16px;
//     padding: 0 32px;
//     border-right: 1px solid var(--border);
//   }
//   .hiw-guarantee__item:first-child { padding-left: 0; }
//   .hiw-guarantee__item:last-child  { border-right: none; }

//   .hiw-guarantee__icon {
//     width: 40px; height: 40px; flex-shrink: 0;
//     display: flex; align-items: center; justify-content: center;
//     border: 1px solid var(--border); background: var(--gold-dim);
//     color: var(--gold); font-size: 1rem;
//     clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
//   }
//   .hiw-guarantee__text {}
//   .hiw-guarantee__title {
//     font-size: 0.72rem; font-weight: 500; color: var(--ivory-dim);
//     letter-spacing: 0.05em; margin-bottom: 3px;
//   }
//   .hiw-guarantee__sub {
//     font-size: 0.62rem; color: var(--ivory-muted); font-weight: 300; letter-spacing: 0.04em;
//   }

//   /* ══════════════════════════════════
//      STEP ANIMATIONS (reveal on scroll)
//   ══════════════════════════════════ */
//   .hiw-step {
//     animation: stepReveal 0.6s ease both;
//   }
//   .hiw-step:nth-child(1) { animation-delay: 0.1s; }
//   .hiw-step:nth-child(2) { animation-delay: 0.22s; }
//   .hiw-step:nth-child(3) { animation-delay: 0.34s; }
//   .hiw-step:nth-child(4) { animation-delay: 0.46s; }
//   .hiw-step:nth-child(5) { animation-delay: 0.58s; }

//   @keyframes stepReveal {
//     from { opacity: 0; transform: translateY(24px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   /* ══════════════════════════════════
//      RESPONSIVE
//   ══════════════════════════════════ */
//   @media (max-width: 1100px) {
//     .hiw-track { grid-template-columns: 1fr 1fr 1fr; row-gap: 48px; }
//     .hiw-track__line { display: none; }
//     .hiw-detail__inner { grid-template-columns: 1fr; gap: 32px; }
//     .hiw-detail__left, .hiw-detail__center, .hiw-detail__right {
//       padding: 0; border: none;
//     }
//     .hiw-guarantee { grid-template-columns: 1fr 1fr; gap: 24px; }
//     .hiw-guarantee__item { border-right: none; padding: 0; }
//   }
//   @media (max-width: 768px) {
//     .hiw-header { grid-template-columns: 1fr; padding: 60px 24px 0; margin-bottom: 48px; }
//     .hiw-process { padding: 0 24px; }
//     .hiw-track { grid-template-columns: 1fr 1fr; }
//     .hiw-detail__inner { padding: 32px 24px 48px; }
//     .hiw-guarantee { grid-template-columns: 1fr; padding: 24px; }
//   }
//   @media (max-width: 480px) {
//     .hiw-track { grid-template-columns: 1fr; }
//     .hiw-step__node { width: 80px; height: 80px; }
//     .hiw-step__num { font-size: 2rem; }
//   }
// `;

// // ─── SVG Icons per step ───────────────────────────────────────────────────────
// const StepIcons = {
//   browse: (
//     <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
//       <circle cx="14" cy="14" r="9"/>
//       <line x1="21" y1="21" x2="28" y2="28"/>
//       <line x1="10" y1="14" x2="18" y2="14"/>
//       <line x1="14" y1="10" x2="14" y2="18"/>
//     </svg>
//   ),
//   filter: (
//     <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
//       <line x1="4" y1="8" x2="28" y2="8"/>
//       <line x1="8" y1="16" x2="24" y2="16"/>
//       <line x1="12" y1="24" x2="20" y2="24"/>
//     </svg>
//   ),
//   register: (
//     <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="5" y="4" width="22" height="28" rx="1"/>
//       <line x1="10" y1="12" x2="22" y2="12"/>
//       <line x1="10" y1="17" x2="22" y2="17"/>
//       <line x1="10" y1="22" x2="16" y2="22"/>
//       <circle cx="24" cy="24" r="5" fill="rgba(0,229,160,0.1)" stroke="#00e5a0"/>
//       <polyline points="21.5,24 23,25.5 26.5,22" stroke="#00e5a0" strokeWidth="1.3"/>
//     </svg>
//   ),
//   email: (
//     <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="3" y="7" width="26" height="18" rx="1"/>
//       <polyline points="3,7 16,18 29,7"/>
//       <line x1="3" y1="25" x2="11" y2="17"/>
//       <line x1="29" y1="25" x2="21" y2="17"/>
//     </svg>
//   ),
//   join: (
//     <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#00e5a0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
//       <circle cx="16" cy="16" r="12"/>
//       <polygon points="13,11 23,16 13,21" fill="rgba(0,229,160,0.15)" stroke="#00e5a0" strokeWidth="1.3"/>
//     </svg>
//   ),
// };

// // ─── Step data ────────────────────────────────────────────────────────────────
// const STEPS = [
//   {
//     id: "browse",
//     num: "01",
//     label: "Discover",
//     tag: "Step One",
//     heading: <>Browse &amp; <em>Discover</em></>,
//     body: "Explore all upcoming IEGS webinars on the public listing page. Filter by discipline — GIS, Drones, Agriculture, Oil & Gas or Remote Sensing — or search by keyword. Every webinar card shows the date, speakers, platform and duration upfront.",
//     checkItems: [
//       "Filter by category: GIS, Drones, Agric, Oil & Gas, Remote Sensing",
//       "Search by keyword across titles and descriptions",
//       "Sort by date or popularity",
//       "View speaker profiles before registering",
//       "See past recordings on the archive page",
//     ],
//     centerLabel: "What you can do",
//     outcomeText: <>You land on the <strong>right webinar</strong> for your discipline in under 60 seconds.</>,
//     ctaLabel: "Browse Webinars →",
//     color: "var(--gold)",
//   },
//   {
//     id: "filter",
//     num: "02",
//     label: "Choose",
//     tag: "Step Two",
//     heading: <>View Full <em>Details</em></>,
//     body: "Click any webinar card to open its full detail page. Read the complete description, see who the speakers are with their bios, check the date and duration, and confirm the platform (Zoom, Google Meet or Zoho). The webinar time is automatically shown in your local timezone.",
//     checkItems: [
//       "Full webinar description and learning objectives",
//       "Speaker bios, titles and LinkedIn profiles",
//       "Date & time auto-converted to your local timezone",
//       "Platform details: Zoom, Google Meet or Zoho",
//       "Share to WhatsApp, LinkedIn or Twitter/X",
//     ],
//     centerLabel: "Detail page shows",
//     outcomeText: <>You have <strong>full clarity</strong> on the topic, speakers and timing before committing.</>,
//     ctaLabel: "View a Webinar →",
//     color: "var(--cyan)",
//   },
//   {
//     id: "register",
//     num: "03",
//     label: "Register",
//     tag: "Step Three",
//     heading: <>Fill the <em>Form</em></>,
//     body: "Click Register and fill a simple form — first name, last name, email address, phone number and your timezone. That's it. No account creation, no password, no payment. The system prevents duplicate registrations so you only ever receive one set of emails per webinar.",
//     checkItems: [
//       "First name, last name, email, phone",
//       "Select your timezone from the dropdown",
//       "Newsletter opt-in checkbox (pre-checked, opt-out)",
//       "No account or password required",
//       "Duplicate registration is automatically blocked",
//     ],
//     centerLabel: "Form fields required",
//     outcomeText: <>Registration is complete in <strong>under 60 seconds</strong>. No friction. No barriers.</>,
//     ctaLabel: "Register Now — Free →",
//     color: "var(--green)",
//   },
//   {
//     id: "email",
//     num: "04",
//     label: "Confirmed",
//     tag: "Step Four",
//     heading: <><em>Emails</em> Keep You Ready</>,
//     body: "Immediately after registration, a confirmation email lands in your inbox. Then 24 hours before the webinar, a reminder. One hour before, another reminder. When the admin marks the session live, the meeting link and password are emailed directly to you.",
//     checkItems: [
//       "Instant confirmation email after registration",
//       "24-hour reminder with webinar details",
//       "1-hour reminder to help you prepare",
//       "Meeting link + password sent when session goes live",
//       "All emails show time in your registered timezone",
//     ],
//     centerLabel: "Automated email sequence",
//     outcomeText: <>You <strong>never miss a session</strong> — every critical moment is covered by an automated email.</>,
//     ctaLabel: "See How Emails Work →",
//     color: "var(--gold)",
//   },
//   {
//     id: "join",
//     num: "05",
//     label: "Join Live",
//     tag: "Step Five",
//     heading: <>Join &amp; <em>Learn Live</em></>,
//     body: "Click the meeting link from your email and join the live session on Zoom, Google Meet or Zoho. After the webinar ends, IEGS publishes the recording to the archive page so you can rewatch or share with colleagues. Missed a session? The recordings page has every past webinar.",
//     checkItems: [
//       "One-click join via Zoom, Google Meet or Zoho",
//       "Meeting link arrives in email when session goes live",
//       "Session recordings published on the archive page",
//       "Watch any past webinar without registering again",
//       "Certificates issued for attended sessions (Phase 2)",
//     ],
//     centerLabel: "On the day",
//     outcomeText: <>Expert geospatial knowledge — <strong>live, free</strong> and accessible from anywhere in the world.</>,
//     ctaLabel: "View Upcoming Sessions →",
//     color: "var(--green)",
//   },
// ];

// // ─── Guarantee items ──────────────────────────────────────────────────────────
// const GUARANTEES = [
//   { icon: "◈", title: "Always Free",       sub: "No payment, ever"          },
//   { icon: "◎", title: "No Account Needed", sub: "Register per webinar only" },
//   { icon: "◷", title: "Your Timezone",     sub: "Times auto-converted"      },
//   { icon: "✉", title: "Smart Reminders",   sub: "24hr + 1hr before session" },
// ];

// // ─── Detail panel ─────────────────────────────────────────────────────────────
// function DetailPanel({ step, open }) {
//   return (
//     <div className={`hiw-detail ${open ? "open" : ""}`}>
//       <div className="hiw-detail__inner">

//         {/* Left */}
//         <div className="hiw-detail__left">
//           <div className="hiw-detail__step-num">{step.num}</div>
//           <div className="hiw-detail__tag">{step.tag}</div>
//           <h3 className="hiw-detail__heading">{step.heading}</h3>
//           <p className="hiw-detail__body">{step.body}</p>
//         </div>

//         {/* Center */}
//         <div className="hiw-detail__center">
//           <div className="hiw-detail__center-label">{step.centerLabel}</div>
//           <ul className="hiw-checklist">
//             {step.checkItems.map((item, i) => (
//               <li key={i}>
//                 <span className="hiw-checklist__icon">✓</span>
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Right */}
//         <div className="hiw-detail__right">
//           <div className="hiw-detail__outcome-label">What you get</div>
//           <div className="hiw-detail__outcome">
//             <p className="hiw-detail__outcome-text">{step.outcomeText}</p>
//           </div>

//           {/* Email preview mockup for step 4 */}
//           {step.id === "email" && (
//             <div className="email-preview" style={{ marginBottom: "20px" }}>
//               <div className="email-preview__header">
//                 <div className="email-preview__dot" style={{ background: "var(--gold)", opacity: 0.6 }} />
//                 <div className="email-preview__dot" style={{ background: "var(--ivory-muted)" }} />
//                 <div className="email-preview__dot" style={{ background: "var(--ivory-muted)" }} />
//                 <span className="email-preview__subject">✓ Webinar Confirmed — Check Your Inbox</span>
//               </div>
//               <div className="email-preview__body">
//                 <div className="email-preview__line gold" />
//                 <div className="email-preview__line medium" />
//                 <div className="email-preview__line short" />
//                 <div className="email-preview__line medium" />
//                 <div className="email-preview__line" style={{ width: "55%", background: "rgba(0,212,255,0.15)" }} />
//               </div>
//             </div>
//           )}

//           <button className="hiw-detail__cta">{step.ctaLabel}</button>
//         </div>

//       </div>
//     </div>
//   );
// }

// // ─── Main export ──────────────────────────────────────────────────────────────
// export default function HowItWorksSection() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [lineAnimated, setLineAnimated] = useState(false);
//   const sectionRef = useRef(null);

//   // Trigger line animation on scroll into view
//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setLineAnimated(true); },
//       { threshold: 0.2 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   const handleStepClick = (i) => {
//     setActiveStep(prev => prev === i ? -1 : i);
//   };

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: styles }} />

//       <section className="hiw" ref={sectionRef}>
//         <div className="hiw-glow hiw-glow--1" />
//         <div className="hiw-glow hiw-glow--2" />

//         {/* Header */}
//         <div className="hiw-header">
//           <div>
//             <div className="hiw-eyebrow">
//               <div className="hiw-eyebrow__line" />
//               <span className="hiw-eyebrow__text">Simple Process</span>
//             </div>
//             <h2 className="hiw-title">How It <em>Works</em></h2>
//           </div>
//           <p className="hiw-subtitle">
//             From discovery to joining live — the entire process takes
//             <strong> under 5 minutes</strong> and requires nothing more
//             than your name and email. No account. No payment.
//             <strong> Just knowledge.</strong>
//           </p>
//         </div>

//         {/* Process track */}
//         <div className="hiw-process">
//           <div className="hiw-track">

//             {/* Animated connector line */}
//             <div className="hiw-track__line">
//               <div className={`hiw-track__line-fill ${lineAnimated ? "animated" : ""}`} />
//             </div>

//             {STEPS.map((step, i) => (
//               <div
//                 key={step.id}
//                 className={`hiw-step ${activeStep === i ? "active" : ""}`}
//                 onClick={() => handleStepClick(i)}
//               >
//                 <div className="hiw-step__node">
//                   <span className="hiw-step__num">{step.num}</span>
//                   <span className="hiw-step__icon">{StepIcons[step.id]}</span>
//                 </div>
//                 <span className="hiw-step__label">{step.label}</span>
//               </div>
//             ))}
//           </div>

//           {/* Detail panel — renders for whichever step is active */}
//           {STEPS.map((step, i) => (
//             <DetailPanel key={step.id} step={step} open={activeStep === i} />
//           ))}
//         </div>

//         {/* Guarantee strip */}
//         <div className="hiw-guarantee">
//           {GUARANTEES.map((g, i) => (
//             <div key={i} className="hiw-guarantee__item">
//               <div className="hiw-guarantee__icon">{g.icon}</div>
//               <div className="hiw-guarantee__text">
//                 <div className="hiw-guarantee__title">{g.title}</div>
//                 <div className="hiw-guarantee__sub">{g.sub}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//       </section>
//     </>
//   );
// }
