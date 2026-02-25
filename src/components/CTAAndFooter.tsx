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
//     --ivory:       #f0ede6;
//     --ivory-dim:   rgba(240,237,230,0.55);
//     --ivory-muted: rgba(240,237,230,0.28);
//     --border:      rgba(201,168,76,0.14);
//     --border-mid:  rgba(201,168,76,0.30);
//     --border-hi:   rgba(201,168,76,0.55);
//   }

//   /* ══════════════════════════════════════════════
//      CTA SECTION
//   ══════════════════════════════════════════════ */
//   .cta-section {
//     position: relative;
//     background: var(--obsidian-2);
//     overflow: hidden;
//     font-family: 'DM Sans', sans-serif;
//   }

//   /* Dramatic gold gradient flood */
//   .cta-section__flood {
//     position: absolute; inset: 0; z-index: 0;
//     background:
//       radial-gradient(ellipse 80% 60% at 50% 110%, rgba(201,168,76,0.18) 0%, transparent 65%),
//       radial-gradient(ellipse 50% 40% at 20% 50%, rgba(0,212,255,0.05) 0%, transparent 60%),
//       radial-gradient(ellipse 40% 30% at 80% 30%, rgba(201,168,76,0.07) 0%, transparent 60%);
//     pointer-events: none;
//   }

//   /* Geometric cross-hatch */
//   .cta-section__hatch {
//     position: absolute; inset: 0; z-index: 0; pointer-events: none;
//     background-image:
//       linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
//       linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
//     background-size: 60px 60px;
//   }

//   /* Top gold rule */
//   .cta-section__rule {
//     width: 100%; height: 1px;
//     background: linear-gradient(90deg, transparent 0%, var(--gold) 20%, var(--gold) 80%, transparent 100%);
//     opacity: 0.3;
//   }

//   /* Floating decorative diamonds */
//   .cta-diamond {
//     position: absolute; z-index: 1; pointer-events: none;
//     width: 8px; height: 8px;
//     background: var(--gold);
//     transform: rotate(45deg);
//     opacity: 0.15;
//     animation: diamondFloat 8s ease-in-out infinite;
//   }
//   @keyframes diamondFloat {
//     0%, 100% { transform: rotate(45deg) translateY(0); opacity: 0.15; }
//     50%       { transform: rotate(45deg) translateY(-14px); opacity: 0.3; }
//   }

//   /* Main inner */
//   .cta-inner {
//     position: relative; z-index: 2;
//     padding: 110px 60px 100px;
//     display: grid;
//     grid-template-columns: 1.1fr 1fr;
//     gap: 80px;
//     align-items: center;
//   }

//   /* ── Left copy ── */
//   .cta-left {}
//   .cta-eyebrow {
//     display: flex; align-items: center; gap: 14px; margin-bottom: 24px;
//     animation: ctaFadeUp 0.8s ease 0.1s both;
//   }
//   .cta-eyebrow__line {
//     width: 32px; height: 1px;
//     background: linear-gradient(90deg, transparent, var(--gold));
//   }
//   .cta-eyebrow__text {
//     font-size: 0.68rem; letter-spacing: 0.35em;
//     text-transform: uppercase; color: var(--gold);
//   }

//   .cta-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: clamp(2.8rem, 5vw, 5rem);
//     font-weight: 300; line-height: 1.04; color: var(--ivory);
//     margin-bottom: 8px;
//     animation: ctaFadeUp 0.8s ease 0.2s both;
//   }
//   .cta-title em {
//     font-style: italic; color: var(--gold-light); display: block;
//   }
//   .cta-title strong {
//     font-weight: 600; display: block;
//     background: linear-gradient(135deg, var(--gold), var(--gold-light), var(--gold-pale));
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   .cta-sub {
//     font-size: 0.9rem; line-height: 1.7; color: var(--ivory-dim);
//     font-weight: 300; max-width: 460px; margin: 28px 0 44px;
//     animation: ctaFadeUp 0.8s ease 0.35s both;
//   }

//   .cta-actions {
//     display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
//     animation: ctaFadeUp 0.8s ease 0.48s both;
//   }

//   .cta-btn-primary {
//     display: inline-flex; align-items: center; gap: 12px;
//     font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;
//     color: var(--obsidian);
//     background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
//     border: none; padding: 18px 40px; cursor: pointer;
//     font-family: 'DM Sans', sans-serif; font-weight: 500;
//     clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
//     position: relative; overflow: hidden;
//     transition: all 0.3s ease;
//   }
//   .cta-btn-primary::before {
//     content: '';
//     position: absolute; inset: 0;
//     background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
//     opacity: 0; transition: opacity 0.3s;
//   }
//   .cta-btn-primary:hover::before { opacity: 1; }
//   .cta-btn-primary:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 14px 40px rgba(201,168,76,0.4);
//   }
//   .cta-btn-primary .arr { transition: transform 0.25s; }
//   .cta-btn-primary:hover .arr { transform: translateX(4px); }

//   .cta-btn-ghost {
//     display: inline-flex; align-items: center; gap: 10px;
//     font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
//     color: var(--ivory-dim); background: transparent;
//     border: 1px solid var(--border); padding: 17px 30px;
//     cursor: pointer; font-family: 'DM Sans', sans-serif;
//     transition: all 0.3s;
//   }
//   .cta-btn-ghost:hover {
//     border-color: var(--border-mid); color: var(--ivory);
//     background: var(--gold-dim);
//   }

//   /* Trust signals */
//   .cta-trust {
//     display: flex; align-items: center; gap: 24px;
//     margin-top: 40px; padding-top: 32px;
//     border-top: 1px solid var(--border);
//     animation: ctaFadeUp 0.8s ease 0.6s both;
//   }
//   .cta-trust__item {
//     display: flex; align-items: center; gap: 8px;
//     font-size: 0.68rem; letter-spacing: 0.1em; color: var(--ivory-muted);
//   }
//   .cta-trust__item::before {
//     content: '✓';
//     display: inline-flex; align-items: center; justify-content: center;
//     width: 16px; height: 16px;
//     background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.3);
//     color: var(--gold); font-size: 0.55rem; flex-shrink: 0;
//   }

//   @keyframes ctaFadeUp {
//     from { opacity: 0; transform: translateY(22px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   /* ── Right: Newsletter card ── */
//   .cta-right {
//     animation: ctaFadeLeft 0.9s ease 0.3s both;
//   }
//   @keyframes ctaFadeLeft {
//     from { opacity: 0; transform: translateX(32px); }
//     to   { opacity: 1; transform: translateX(0); }
//   }

//   .cta-card {
//     background: linear-gradient(145deg, var(--obsidian-3), var(--obsidian-4));
//     border: 1px solid var(--border);
//     padding: 44px 40px;
//     position: relative; overflow: hidden;
//     clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
//   }
//   /* top bar accent */
//   .cta-card::before {
//     content: '';
//     position: absolute; top: 0; left: 0; right: 0; height: 2px;
//     background: linear-gradient(90deg, var(--gold), var(--gold-light), transparent);
//   }

//   .cta-card__label {
//     font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
//     color: var(--gold); margin-bottom: 12px;
//     display: flex; align-items: center; gap: 10px;
//   }
//   .cta-card__label::after {
//     content: ''; flex: 1; height: 1px;
//     background: linear-gradient(90deg, var(--border), transparent);
//   }

//   .cta-card__heading {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.9rem; font-weight: 300; line-height: 1.2;
//     color: var(--ivory); margin-bottom: 12px;
//   }
//   .cta-card__heading em { font-style: italic; color: var(--gold-light); }

//   .cta-card__sub {
//     font-size: 0.78rem; line-height: 1.65;
//     color: var(--ivory-muted); font-weight: 300; margin-bottom: 28px;
//   }

//   /* Form */
//   .cta-form { display: flex; flex-direction: column; gap: 14px; }

//   .cta-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

//   .cta-input {
//     width: 100%; background: var(--obsidian-2);
//     border: 1px solid var(--border); color: var(--ivory);
//     font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
//     padding: 13px 16px; outline: none;
//     transition: border-color 0.25s, box-shadow 0.25s;
//     letter-spacing: 0.02em;
//   }
//   .cta-input::placeholder { color: var(--ivory-muted); }
//   .cta-input:focus {
//     border-color: var(--border-mid);
//     box-shadow: 0 0 0 3px rgba(201,168,76,0.06);
//   }

//   .cta-select {
//     width: 100%; background: var(--obsidian-2);
//     border: 1px solid var(--border); color: var(--ivory-dim);
//     font-family: 'DM Sans', sans-serif; font-size: 0.78rem;
//     padding: 13px 16px; outline: none; cursor: pointer; appearance: none;
//     transition: border-color 0.25s;
//   }
//   .cta-select:focus { border-color: var(--border-mid); }

//   .cta-form__checkbox {
//     display: flex; align-items: flex-start; gap: 12px;
//     font-size: 0.72rem; color: var(--ivory-muted); line-height: 1.5; cursor: pointer;
//   }
//   .cta-form__checkbox input[type="checkbox"] {
//     width: 16px; height: 16px; margin-top: 1px; flex-shrink: 0;
//     accent-color: var(--gold); cursor: pointer;
//   }

//   .cta-submit {
//     width: 100%; padding: 16px;
//     font-size: 0.78rem; letter-spacing: 0.2em; text-transform: uppercase;
//     color: var(--obsidian);
//     background: linear-gradient(135deg, var(--gold), var(--gold-light));
//     border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500;
//     clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
//     transition: all 0.3s; position: relative; overflow: hidden;
//   }
//   .cta-submit:hover {
//     background: linear-gradient(135deg, var(--gold-light), var(--gold-pale));
//     box-shadow: 0 8px 28px rgba(201,168,76,0.35);
//     transform: translateY(-1px);
//   }
//   .cta-submit.submitted {
//     background: linear-gradient(135deg, rgba(0,200,120,0.8), rgba(0,180,100,0.8));
//     color: #fff;
//   }

//   .cta-card__note {
//     font-size: 0.62rem; color: var(--ivory-muted); margin-top: 14px;
//     letter-spacing: 0.04em; text-align: center; line-height: 1.5;
//   }

//   /* ── Social proof strip ── */
//   .cta-social-proof {
//     position: relative; z-index: 2;
//     border-top: 1px solid var(--border);
//     padding: 28px 60px;
//     display: flex; align-items: center; justify-content: space-between; gap: 32px;
//     background: rgba(8,10,15,0.4);
//     flex-wrap: wrap;
//   }
//   .cta-sp-item {
//     display: flex; align-items: center; gap: 14px;
//     font-size: 0.7rem; color: var(--ivory-muted); letter-spacing: 0.08em;
//   }
//   .cta-sp-num {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 1.8rem; letter-spacing: 0.05em; color: var(--gold-light); line-height: 1;
//   }
//   .cta-sp-divider {
//     width: 1px; height: 36px; background: var(--border);
//   }

//   /* ══════════════════════════════════════════════
//      FOOTER
//   ══════════════════════════════════════════════ */
//   .footer {
//     position: relative;
//     background: var(--obsidian);
//     font-family: 'DM Sans', sans-serif;
//     color: var(--ivory);
//     border-top: 1px solid var(--border);
//     overflow: hidden;
//   }

//   /* Subtle gradient ceiling */
//   .footer::before {
//     content: '';
//     position: absolute;
//     top: 0; left: 0; right: 0; height: 200px;
//     background: linear-gradient(180deg, rgba(201,168,76,0.04) 0%, transparent 100%);
//     pointer-events: none; z-index: 0;
//   }

//   /* ── Top footer ── */
//   .footer-top {
//     position: relative; z-index: 2;
//     display: grid;
//     grid-template-columns: 1.6fr 1fr 1fr 1fr;
//     gap: 0;
//     border-bottom: 1px solid var(--border);
//   }

//   .footer-col {
//     padding: 64px 40px;
//     border-right: 1px solid var(--border);
//   }
//   .footer-col:last-child { border-right: none; }
//   .footer-col:first-child { padding-left: 60px; }

//   /* Brand col */
//   .footer-brand__logo {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 1.8rem; letter-spacing: 0.18em; color: var(--gold-light);
//     text-decoration: none; display: block; margin-bottom: 6px;
//   }
//   .footer-brand__tagline {
//     font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase;
//     color: var(--ivory-muted); margin-bottom: 24px;
//   }
//   .footer-brand__desc {
//     font-size: 0.78rem; line-height: 1.7; color: var(--ivory-muted);
//     font-weight: 300; margin-bottom: 28px; max-width: 280px;
//   }

//   /* Social icons */
//   .footer-socials {
//     display: flex; gap: 10px; margin-bottom: 32px;
//   }
//   .footer-social-btn {
//     width: 36px; height: 36px;
//     display: flex; align-items: center; justify-content: center;
//     background: var(--obsidian-3); border: 1px solid var(--border);
//     color: var(--ivory-muted); cursor: pointer; font-size: 0.75rem;
//     transition: all 0.25s; text-decoration: none;
//     clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
//   }
//   .footer-social-btn:hover {
//     border-color: var(--gold); color: var(--gold);
//     background: var(--gold-dim);
//     box-shadow: 0 0 12px rgba(201,168,76,0.15);
//   }

//   /* Cert badge */
//   .footer-cert {
//     display: inline-flex; align-items: center; gap: 10px;
//     font-size: 0.62rem; letter-spacing: 0.12em; color: var(--ivory-muted);
//     border: 1px solid var(--border); padding: 10px 14px;
//     background: var(--gold-dim);
//   }
//   .footer-cert__icon { color: var(--gold); font-size: 1rem; }

//   /* Nav cols */
//   .footer-col__heading {
//     font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
//     color: var(--gold); margin-bottom: 24px;
//     display: flex; align-items: center; gap: 10px;
//   }
//   .footer-col__heading::after {
//     content: ''; flex: 1; height: 1px;
//     background: linear-gradient(90deg, var(--border), transparent);
//   }

//   .footer-nav { list-style: none; display: flex; flex-direction: column; gap: 12px; }
//   .footer-nav li a {
//     font-size: 0.78rem; color: var(--ivory-muted); text-decoration: none;
//     font-weight: 300; letter-spacing: 0.03em;
//     transition: color 0.25s, padding-left 0.25s;
//     display: inline-flex; align-items: center; gap: 8px;
//   }
//   .footer-nav li a::before {
//     content: '›'; color: var(--gold); opacity: 0;
//     font-size: 0.9rem; transition: opacity 0.2s;
//   }
//   .footer-nav li a:hover { color: var(--ivory); padding-left: 6px; }
//   .footer-nav li a:hover::before { opacity: 1; }

//   /* Contact list */
//   .footer-contact { list-style: none; display: flex; flex-direction: column; gap: 16px; }
//   .footer-contact li {
//     display: flex; align-items: flex-start; gap: 12px;
//     font-size: 0.76rem; color: var(--ivory-muted); font-weight: 300; line-height: 1.5;
//   }
//   .footer-contact__icon {
//     color: var(--gold); font-size: 0.85rem; margin-top: 1px; flex-shrink: 0;
//   }

//   /* ── Middle: newsletter inline ── */
//   .footer-mid {
//     position: relative; z-index: 2;
//     padding: 40px 60px;
//     border-bottom: 1px solid var(--border);
//     display: flex; align-items: center; justify-content: space-between; gap: 40px;
//     background: linear-gradient(90deg, rgba(201,168,76,0.03), transparent 60%);
//   }
//   .footer-mid__left {}
//   .footer-mid__label {
//     font-size: 0.62rem; letter-spacing: 0.28em; text-transform: uppercase;
//     color: var(--gold); margin-bottom: 8px;
//   }
//   .footer-mid__heading {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.4rem; font-weight: 300; color: var(--ivory);
//   }
//   .footer-mid__heading em { font-style: italic; color: var(--gold-light); }

//   .footer-mid__form {
//     display: flex; gap: 0; flex: 1; max-width: 460px;
//   }
//   .footer-mid__input {
//     flex: 1; background: var(--obsidian-3);
//     border: 1px solid var(--border); border-right: none;
//     color: var(--ivory); font-family: 'DM Sans', sans-serif;
//     font-size: 0.78rem; padding: 13px 18px; outline: none;
//     transition: border-color 0.25s;
//   }
//   .footer-mid__input::placeholder { color: var(--ivory-muted); }
//   .footer-mid__input:focus { border-color: var(--border-mid); }
//   .footer-mid__btn {
//     padding: 13px 28px; background: var(--gold);
//     border: 1px solid var(--gold); color: var(--obsidian);
//     font-family: 'DM Sans', sans-serif; font-size: 0.72rem;
//     letter-spacing: 0.18em; text-transform: uppercase; font-weight: 500;
//     cursor: pointer; white-space: nowrap;
//     clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
//     transition: all 0.25s;
//   }
//   .footer-mid__btn:hover {
//     background: var(--gold-light);
//     box-shadow: 0 4px 20px rgba(201,168,76,0.3);
//   }

//   /* ── Bottom bar ── */
//   .footer-bottom {
//     position: relative; z-index: 2;
//     padding: 24px 60px;
//     display: flex; align-items: center; justify-content: space-between; gap: 24px;
//     flex-wrap: wrap;
//   }

//   .footer-bottom__copy {
//     font-size: 0.68rem; color: var(--ivory-muted);
//     letter-spacing: 0.06em; font-weight: 300;
//     display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
//   }
//   .footer-bottom__copy .sep { color: var(--border-mid); }
//   .footer-bottom__copy a {
//     color: var(--ivory-muted); text-decoration: none;
//     transition: color 0.2s;
//   }
//   .footer-bottom__copy a:hover { color: var(--gold-light); }

//   .footer-bottom__right {
//     display: flex; align-items: center; gap: 20px;
//   }

//   .footer-bottom__made {
//     font-size: 0.62rem; color: var(--ivory-muted); letter-spacing: 0.08em;
//     display: flex; align-items: center; gap: 6px;
//   }
//   .footer-bottom__made span { color: var(--gold); }

//   /* Scroll-to-top button */
//   .footer-scroll-top {
//     width: 38px; height: 38px;
//     display: flex; align-items: center; justify-content: center;
//     background: var(--obsidian-3); border: 1px solid var(--border);
//     color: var(--ivory-muted); cursor: pointer; font-size: 0.85rem;
//     clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
//     transition: all 0.25s;
//   }
//   .footer-scroll-top:hover {
//     border-color: var(--gold); color: var(--gold); background: var(--gold-dim);
//   }

//   /* ── Watermark IEGS large text ── */
//   .footer-watermark {
//     position: absolute; bottom: -20px; left: 50%;
//     transform: translateX(-50%);
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: clamp(5rem, 14vw, 12rem);
//     letter-spacing: 0.12em;
//     color: rgba(201,168,76,0.03);
//     white-space: nowrap; user-select: none; pointer-events: none; z-index: 1;
//     line-height: 1;
//   }

//   /* ── Responsive ── */
//   @media (max-width: 1100px) {
//     .cta-inner { grid-template-columns: 1fr; gap: 60px; padding: 80px 40px; }
//     .footer-top { grid-template-columns: 1fr 1fr; }
//     .footer-col:nth-child(2) { border-right: none; }
//   }
//   @media (max-width: 768px) {
//     .cta-inner { padding: 60px 24px; }
//     .cta-social-proof { padding: 20px 24px; gap: 16px; }
//     .cta-form__row { grid-template-columns: 1fr; }
//     .footer-top { grid-template-columns: 1fr; }
//     .footer-col { border-right: none; border-bottom: 1px solid var(--border); padding: 40px 24px; }
//     .footer-col:first-child { padding-left: 24px; }
//     .footer-col:last-child { border-bottom: none; }
//     .footer-mid { flex-direction: column; padding: 32px 24px; }
//     .footer-mid__form { max-width: 100%; width: 100%; }
//     .footer-bottom { padding: 20px 24px; }
//     .cta-trust { flex-direction: column; align-items: flex-start; gap: 12px; }
//     .cta-sp-divider { display: none; }
//   }
// `;

// // ─── Social proof counter ──────────────────────────────────────────────────────
// function CountUp({ to, duration = 1600 }) {
//   const [val, setVal] = useState(0);
//   const ref = useRef(null);
//   const started = useRef(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !started.current) {
//         started.current = true;
//         const t0 = performance.now();
//         const tick = (ts) => {
//           const p = Math.min((ts - t0) / duration, 1);
//           const e = 1 - Math.pow(1 - p, 3);
//           setVal(Math.floor(e * to));
//           if (p < 1) requestAnimationFrame(tick);
//           else setVal(to);
//         };
//         requestAnimationFrame(tick);
//       }
//     }, { threshold: 0.4 });
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [to, duration]);

//   return <span ref={ref}>{val.toLocaleString()}</span>;
// }

// // ─── CTA Section ─────────────────────────────────────────────────────────────
// function CTASection() {
//   const [submitted, setSubmitted] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "", lastName: "", email: "", interest: "", newsletter: true,
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.email) return;
//     setSubmitted(true);
//   };

//   return (
//     <section className="cta-section">
//       <div className="cta-section__rule" />
//       <div className="cta-section__flood" />
//       <div className="cta-section__hatch" />

//       {/* Floating diamonds */}
//       {[
//         { top: "18%", left: "8%",  delay: "0s"   },
//         { top: "60%", left: "12%", delay: "2s"   },
//         { top: "30%", left: "55%", delay: "4s"   },
//         { top: "75%", left: "72%", delay: "1.5s" },
//         { top: "15%", left: "88%", delay: "3s"   },
//       ].map((d, i) => (
//         <div key={i} className="cta-diamond"
//           style={{ top: d.top, left: d.left, animationDelay: d.delay }} />
//       ))}

//       <div className="cta-inner">
//         {/* Left copy */}
//         <div className="cta-left">
//           <div className="cta-eyebrow">
//             <div className="cta-eyebrow__line" />
//             <span className="cta-eyebrow__text">Limited Seats Available</span>
//           </div>

//           <h2 className="cta-title">
//             Secure Your
//             <em>Place Among</em>
//             <strong>the Elite.</strong>
//           </h2>

//           <p className="cta-sub">
//             IEGS webinars are not open to the general public. Each session is
//             curated for professionals who shape policy, lead organisations, and
//             drive geospatial innovation across Africa and beyond. Your seat
//             matters — reserve it before it's gone.
//           </p>

//           <div className="cta-actions">
//             <button className="cta-btn-primary">
//               Apply for Access
//               <span className="arr">→</span>
//             </button>
//             <button className="cta-btn-ghost">Browse All Webinars</button>
//           </div>

//           <div className="cta-trust">
//             {[
//               "Free to attend, always",
//               "No account required",
//               "Unsubscribe anytime",
//             ].map(t => (
//               <div key={t} className="cta-trust__item">{t}</div>
//             ))}
//           </div>
//         </div>

//         {/* Right: registration card */}
//         <div className="cta-right">
//           <div className="cta-card">
//             <div className="cta-card__label">Reserve Your Seat</div>
//             <h3 className="cta-card__heading">
//               Join the <em>Next Session</em>
//             </h3>
//             <p className="cta-card__sub">
//               Fill in your details and we'll send you the confirmation link,
//               webinar time in your timezone, and speaker briefing.
//             </p>

//             {submitted ? (
//               <div style={{
//                 textAlign: "center", padding: "40px 20px",
//                 display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
//               }}>
//                 <div style={{
//                   width: "56px", height: "56px", borderRadius: "50%",
//                   background: "rgba(0,200,120,0.12)", border: "1px solid rgba(0,200,120,0.3)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   fontSize: "1.4rem", color: "#00e5a0",
//                 }}>✓</div>
//                 <div style={{
//                   fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem",
//                   fontWeight: 300, color: "var(--ivory)",
//                 }}>
//                   You're <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>confirmed.</em>
//                 </div>
//                 <div style={{ fontSize: "0.76rem", color: "var(--ivory-muted)", lineHeight: 1.6 }}>
//                   Check your inbox for the confirmation email.<br/>
//                   We look forward to seeing you.
//                 </div>
//               </div>
//             ) : (
//               <form className="cta-form" onSubmit={handleSubmit}>
//                 <div className="cta-form__row">
//                   <input className="cta-input" placeholder="First name"
//                     value={formData.firstName}
//                     onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))} />
//                   <input className="cta-input" placeholder="Last name"
//                     value={formData.lastName}
//                     onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))} />
//                 </div>
//                 <input className="cta-input" type="email" placeholder="Professional email address"
//                   value={formData.email}
//                   onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
//                 <select className="cta-select"
//                   value={formData.interest}
//                   onChange={e => setFormData(p => ({ ...p, interest: e.target.value }))}>
//                   <option value="">Area of interest…</option>
//                   <option>GIS & Spatial Mapping</option>
//                   <option>UAV & Drone Surveys</option>
//                   <option>Precision Agriculture</option>
//                   <option>Oil & Gas Geospatial</option>
//                   <option>Remote Sensing & SAR</option>
//                   <option>Land Administration</option>
//                 </select>

//                 <label className="cta-form__checkbox">
//                   <input type="checkbox" checked={formData.newsletter}
//                     onChange={e => setFormData(p => ({ ...p, newsletter: e.target.checked }))} />
//                   Subscribe to our newsletter for upcoming webinar announcements
//                   (you can unsubscribe at any time)
//                 </label>

//                 <button className={`cta-submit ${submitted ? "submitted" : ""}`} type="submit">
//                   Reserve My Seat →
//                 </button>
//               </form>
//             )}

//             <p className="cta-card__note">
//               By registering, you agree to receive event-related emails from IEGS.
//               We never share your data with third parties.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Social proof strip */}
//       <div className="cta-social-proof">
//         {[
//           { num: 2800, label: "Professionals registered", suffix: "+" },
//           null,
//           { num: 38,   label: "Countries represented",  suffix: "" },
//           null,
//           { num: 54,   label: "Sessions delivered",     suffix: "" },
//           null,
//           { num: 97,   label: "Attendee satisfaction",  suffix: "%" },
//         ].map((item, i) =>
//           item === null
//             ? <div key={i} className="cta-sp-divider" />
//             : (
//               <div key={i} className="cta-sp-item">
//                 <span className="cta-sp-num">
//                   <CountUp to={item.num} />{item.suffix}
//                 </span>
//                 <span>{item.label}</span>
//               </div>
//             )
//         )}
//       </div>
//     </section>
//   );
// }

// // ─── Footer ───────────────────────────────────────────────────────────────────
// function Footer() {
//   const [email, setEmail] = useState("");
//   const [subDone, setSubDone] = useState(false);

//   const handleSub = (e) => {
//     e.preventDefault();
//     if (email) setSubDone(true);
//   };

//   return (
//     <footer className="footer">
//       <div className="footer-watermark">IEGS</div>

//       {/* Top columns */}
//       <div className="footer-top">

//         {/* Brand */}
//         <div className="footer-col">
//           <a href="#" className="footer-brand__logo">IEGS</a>
//           <div className="footer-brand__tagline">
//             Indepth Earth Geospatial Services
//           </div>
//           <p className="footer-brand__desc">
//             Rivers State, Nigeria's leading geospatial services firm —
//             delivering precision mapping, drone surveys, and expert-led
//             knowledge transfer to professionals across Africa and beyond.
//           </p>

//           <div className="footer-socials">
//             {[
//               { icon: "in", href: "#", label: "LinkedIn" },
//               { icon: "𝕏",  href: "#", label: "Twitter/X" },
//               { icon: "▶", href: "#", label: "YouTube" },
//               { icon: "✉", href: "#", label: "Email" },
//             ].map(s => (
//               <a key={s.label} href={s.href} className="footer-social-btn"
//                 title={s.label} aria-label={s.label}>
//                 {s.icon}
//               </a>
//             ))}
//           </div>

//           <div className="footer-cert">
//             <span className="footer-cert__icon">◈</span>
//             Registered with NiGOS · ISO 19100 Compliant
//           </div>
//         </div>

//         {/* Webinars */}
//         <div className="footer-col">
//           <div className="footer-col__heading">Webinars</div>
//           <ul className="footer-nav">
//             {[
//               "Upcoming Sessions",
//               "Past Recordings",
//               "GIS & Mapping",
//               "Drone Surveys",
//               "Precision Agriculture",
//               "Oil & Gas",
//               "Remote Sensing",
//               "Land Administration",
//             ].map(l => <li key={l}><a href="#">{l}</a></li>)}
//           </ul>
//         </div>

//         {/* Company */}
//         <div className="footer-col">
//           <div className="footer-col__heading">Company</div>
//           <ul className="footer-nav">
//             {[
//               "About IEGS",
//               "Our Services",
//               "Speaker Programme",
//               "Become a Speaker",
//               "Partner With Us",
//               "Careers",
//               "Press & Media",
//               "Blog",
//             ].map(l => <li key={l}><a href="#">{l}</a></li>)}
//           </ul>
//         </div>

//         {/* Contact */}
//         <div className="footer-col">
//           <div className="footer-col__heading">Contact</div>
//           <ul className="footer-contact">
//             <li>
//               <span className="footer-contact__icon">◎</span>
//               <span>Plot 14, Trans-Amadi Industrial Layout,<br/>Port Harcourt, Rivers State, Nigeria</span>
//             </li>
//             <li>
//               <span className="footer-contact__icon">◷</span>
//               <span>Mon – Fri, 8:00 AM – 5:00 PM WAT</span>
//             </li>
//             <li>
//               <span className="footer-contact__icon">✉</span>
//               <span>webinars@iegs.com.ng</span>
//             </li>
//             <li>
//               <span className="footer-contact__icon">☏</span>
//               <span>+234 (0) 803 000 0000</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Mid: newsletter */}
//       <div className="footer-mid">
//         <div className="footer-mid__left">
//           <div className="footer-mid__label">Stay Informed</div>
//           <h4 className="footer-mid__heading">
//             Get webinar alerts <em>before seats fill up</em>
//           </h4>
//         </div>

//         {subDone ? (
//           <div style={{
//             fontSize: "0.8rem", color: "var(--gold-light)",
//             letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "10px",
//           }}>
//             <span style={{ color: "#00e5a0" }}>✓</span> You're subscribed. Watch your inbox.
//           </div>
//         ) : (
//           <form className="footer-mid__form" onSubmit={handleSub}>
//             <input
//               className="footer-mid__input"
//               type="email" placeholder="Enter your email address"
//               value={email} onChange={e => setEmail(e.target.value)}
//             />
//             <button className="footer-mid__btn" type="submit">Subscribe</button>
//           </form>
//         )}
//       </div>

//       {/* Bottom bar */}
//       <div className="footer-bottom">
//         <div className="footer-bottom__copy">
//           <span>© {new Date().getFullYear()} Indepth Earth Geospatial Services Ltd.</span>
//           <span className="sep">|</span>
//           <a href="#">Privacy Policy</a>
//           <span className="sep">|</span>
//           <a href="#">Terms of Use</a>
//           <span className="sep">|</span>
//           <a href="#">Cookie Settings</a>
//         </div>

//         <div className="footer-bottom__right">
//           <div className="footer-bottom__made">
//             Built with <span>◆</span> in Rivers State, Nigeria
//           </div>
//           <button
//             className="footer-scroll-top"
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             title="Back to top"
//             aria-label="Back to top"
//           >
//             ↑
//           </button>
//         </div>
//       </div>

//     </footer>
//   );
// }

// // ─── Combined export ──────────────────────────────────────────────────────────
// export default function CTAAndFooter() {
//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: styles }} />
//       <CTASection />
//       <Footer />
//     </>
//   );
// }
