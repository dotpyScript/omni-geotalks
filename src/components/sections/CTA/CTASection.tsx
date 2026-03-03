"use client";

import { motion } from "framer-motion";
import RegistrationForm from "./RegistrationForm";
import SocialProofStrip from "./SocialProofStrip";
import { DIAMONDS, TRUST_ITEMS } from "./constants";

// ─── CTASection ───────────────────────────────────────────────────────────────
export default function CTASection() {
  return (
    /*
     * .cta-section — bg-obsidian-2, overflow-hidden, font-dm
     */
    <section className="relative overflow-hidden font-dm" style={{ background: 'linear-gradient(180deg, var(--obsidian-4) 0%, var(--obsidian-3) 50%, var(--obsidian-4) 100%)' }}>

      {/* ── Top gold rule (.cta-section__rule) ─────────────────────────
           1px full-width gradient line */}
      <div
        className="w-full h-px opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--gold) 20%, var(--gold) 80%, transparent 100%)",
        }}
      />

      {/* ── Dramatic gold gradient flood (.cta-section__flood) ─────────
           Three layered radial gradients — gold bottom-centre, cyan mid-left,
           gold top-right */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(201,168,76,0.18) 0%, transparent 65%)",
            "radial-gradient(ellipse 50% 40% at 20% 50%, rgba(0,212,255,0.05) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 30% at 80% 30%, rgba(201,168,76,0.07) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      {/* ── Cross-hatch grid (.cta-section__hatch) ─────────────────────
           bg-grid is defined in globals.css */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid" />

      {/* ── Floating decorative diamonds (.cta-diamond) ──────────────── */}
      {DIAMONDS.map((d, i) => (
        <div
          key={i}
          className="absolute z-[1] pointer-events-none w-2 h-2 bg-gold opacity-[0.15] animate-[diamondFloat_8s_ease-in-out_infinite]"
          style={{
            top: d.top,
            left: d.left,
            animationDelay: d.delay,
            transform: "rotate(45deg)",
          }}
        />
      ))}

      {/* ════════════════════════════════════════════════════════════════
          INNER GRID (.cta-inner)
          Desktop  : 2-col [1.1fr 1fr], 110px top, 60px sides
          ≤1100px  : single col, 80px padding
          ≤768px   : 60px top, 24px sides
         ════════════════════════════════════════════════════════════════ */}
      <div
        className={[
          "relative z-[2]",
          "pt-[110px] pb-[100px] px-[60px]",
          "grid grid-cols-[1.1fr_1fr] gap-20 items-center",
          /* responsive */
          "max-[1100px]:grid-cols-1 max-[1100px]:gap-[60px] max-[1100px]:px-10 max-[1100px]:py-20",
          "max-md:pt-[60px] max-md:pb-[60px] max-md:px-6",
        ].join(" ")}
      >

        {/* ── LEFT COPY (.cta-left) ─────────────────────────────────── */}
        <div>
          {/* Eyebrow — uses global .eyebrow + .eyebrow-text */}
          <motion.div
            className="eyebrow mb-6"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <span className="eyebrow-text">Limited Seats Available</span>
          </motion.div>

          {/* Title (.cta-title) */}
          <motion.h2
            className={[
              "font-cormorant font-light leading-[1.04] text-ivory",
              "text-[clamp(2.8rem,5vw,5rem)]",
              "mb-2",
            ].join(" ")}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Secure Your
            {/* em — italic gold, block */}
            <em className="italic text-gold-light block">Place Among</em>
            {/* strong — gold gradient text, block */}
            <strong className="font-semibold block text-gold-gradient">
              the Elite.
            </strong>
          </motion.h2>

          {/* Sub (.cta-sub) */}
          <motion.p
            className="text-[0.9rem] leading-[1.7] text-ivory-dim font-light max-w-[460px] mt-7 mb-11"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          >
            IEGS webinars are not open to the general public. Each session is
            curated for professionals who shape policy, lead organisations, and
            drive geospatial innovation across Africa and beyond. Your seat
            matters — reserve it before it&apos;s gone.
          </motion.p>

          {/* Actions (.cta-actions) */}
          <motion.div
            className="flex items-center gap-[18px] flex-wrap"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48, ease: "easeOut" }}
          >
            {/*
             * Primary button (.cta-btn-primary)
             * clip-bevel-lg from globals.css
             * The ::before shimmer overlay is replicated via a child span.
             */}
            <button
              className={[
                "group/primary",
                "inline-flex items-center gap-3",
                "text-[0.8rem] tracking-[0.2em] uppercase",
                "text-obsidian bg-gradient-to-br from-gold to-gold-light",
                "border-none px-10 py-[18px] cursor-pointer",
                "font-dm font-medium",
                "clip-bevel-lg",
                "relative overflow-hidden",
                "transition-all duration-300",
                "hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(201,168,76,0.4)]",
              ].join(" ")}
            >
              {/* Shimmer overlay (.cta-btn-primary::before) */}
              <span
                className={[
                  "absolute inset-0 pointer-events-none",
                  "bg-gradient-to-br from-white/20 to-transparent",
                  "opacity-0 transition-opacity duration-300",
                  "group-hover/primary:opacity-100",
                ].join(" ")}
              />
              Apply for Access
              {/* Arrow — slides right on hover (.arr) */}
              <span className="transition-transform duration-[250ms] group-hover/primary:translate-x-1">
                →
              </span>
            </button>

            {/* Ghost button (.cta-btn-ghost) */}
            <button
              className={[
                "inline-flex items-center gap-[10px]",
                "text-[0.75rem] tracking-[0.15em] uppercase",
                "text-ivory-dim bg-transparent",
                "border border-border px-[30px] py-[17px]",
                "cursor-pointer font-dm",
                "transition-all duration-300",
                "hover:border-border-mid hover:text-ivory hover:bg-gold-dim",
              ].join(" ")}
            >
              Browse All Webinars
            </button>
          </motion.div>

          {/* Trust signals (.cta-trust) */}
          <motion.div
            className={[
              "flex items-center gap-6 flex-wrap",
              "mt-10 pt-8 border-t border-border",
              "max-md:flex-col max-md:items-start max-md:gap-3",
            ].join(" ")}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            {TRUST_ITEMS.map((t) => (
              /*
               * .cta-trust__item — ::before checkmark box
               * Replaced with an explicit <span> child since ::before
               * with dynamic content can't be done in Tailwind.
               */
              <div
                key={t}
                className="flex items-center gap-2 text-[0.68rem] tracking-[0.1em] text-ivory-muted"
              >
                <span
                  className={[
                    "inline-flex items-center justify-content-center",
                    "w-4 h-4 flex-shrink-0",
                    "bg-gold-dim border border-[rgba(201,168,76,0.3)]",
                    "text-gold text-[0.55rem]",
                    "flex items-center justify-center",
                  ].join(" ")}
                >
                  ✓
                </span>
                {t}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Registration card (.cta-right) ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        >
          <RegistrationForm />
        </motion.div>
      </div>

      {/* ── Social proof strip ──────────────────────────────────────── */}
      <SocialProofStrip />
    </section>
  );
}
