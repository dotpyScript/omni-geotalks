"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import StepNode from "./StepNode";
import DetailPanel from "./DetailPanel";
import GuaranteeStrip from "./GuaranteeStrip";
import { StepIcons } from "./StepIcons";
import { STEPS } from "./constants";

// ─── Main export ──────────────────────────────────────────────────────────────
export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [lineAnimated, setLineAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger the connector line animation when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLineAnimated(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleStepClick = (i: number) => {
    setActiveStep((prev) => (prev === i ? -1 : i));
  };

  return (
    /*
     * ── Section shell (.hiw) ─────────────────────────────────────────────
     * relative | bg-obsidian-3 | font-dm | text-ivory | overflow-hidden
     *
     * The original .hiw::before (grid) and .hiw::after (top rule) pseudo-
     * elements are converted to explicit <div> children so they can be
     * expressed purely in Tailwind without a CSS block.
     */
    <section
      ref={sectionRef}
      className="relative font-dm text-ivory overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0e1624 0%, #111a28 50%, #0d1422 100%)' }}
    >
      {/* ── Blueprint grid overlay (.hiw::before) ───────────────────────
           bg-grid is a global utility defined in globals.css */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid opacity-[0.6]" />

      {/* ── Top diagonal rule (.hiw::after) ─────────────────────────────
           A 1px gradient line across the very top of the section */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--gold) 25%, var(--gold) 75%, transparent 100%)",
        }}
      />

      {/* ── Ambient gold glow (.hiw-glow--1) ────────────────────────────
           Elliptical gold blur, top-left quadrant */}
      <div
        className="absolute z-0 pointer-events-none rounded-full blur-[100px] w-[500px] h-[300px] top-[20%] left-[-100px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Ambient cyan glow (.hiw-glow--2) ────────────────────────────
           Elliptical cyan blur, bottom-right quadrant */}
      <div
        className="absolute z-0 pointer-events-none rounded-full blur-[100px] w-[400px] h-[400px] bottom-[10%] right-[-80px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ════════════════════════════════════════════════════════════════
          HEADER (.hiw-header)
          Desktop  : 2-col grid, 100px top padding, 60px sides
          ≤768px   : single col, 60px top, 24px sides
         ════════════════════════════════════════════════════════════════ */}
      <div
        className={[
          "relative z-[2]",
          "pt-[100px] px-[60px]",
          "grid grid-cols-2 gap-10 items-end",
          "mb-20",
          /* responsive */
          "max-md:grid-cols-1 max-md:pt-[60px] max-md:px-6 max-md:mb-12",
        ].join(" ")}
      >
        {/* Left: eyebrow + title */}
        <div>
          {/* Eyebrow (.hiw-eyebrow) — uses global .eyebrow + .eyebrow-text */}
          <div className="eyebrow mb-5">
            <span className="eyebrow-text">Simple Process</span>
          </div>

          {/* Title (.hiw-title) */}
          <h2
            className={[
              "font-cormorant font-light leading-[1.06] text-ivory",
              "text-[clamp(2.4rem,4vw,3.8rem)]",
              /* italic gold em spans */
              "[&_em]:italic [&_em]:text-gold-light",
            ].join(" ")}
          >
            How It <em>Works</em>
          </h2>
        </div>

        {/* Right: subtitle (.hiw-subtitle) */}
        <p
          className={[
            "text-[0.88rem] leading-[1.75] text-ivory-dim font-light max-w-[400px]",
            "[&_strong]:text-gold-light [&_strong]:font-normal",
          ].join(" ")}
        >
          From discovery to joining live — the entire process takes
          <strong> under 5 minutes</strong> and requires nothing more than your
          name and email. No account. No payment.
          <strong> Just knowledge.</strong>
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          PROCESS TRACK (.hiw-process / .hiw-track)
          Desktop  : 5-col equal grid, 60px horizontal padding
          ≤1100px  : 3-col
          ≤768px   : 2-col, 24px padding
          ≤480px   : 1-col
         ════════════════════════════════════════════════════════════════ */}
      <div
        className={[
          "relative z-[2]",
          "px-[60px]",
          "max-md:px-6",
        ].join(" ")}
      >
        {/* Track grid + connector line */}
        <div
          className={[
            "relative",
            "grid grid-cols-5 gap-0",
            /* responsive breakpoints */
            "max-[1100px]:grid-cols-3 max-[1100px]:gap-y-12",
            "max-md:grid-cols-2",
            "max-[480px]:grid-cols-1",
          ].join(" ")}
        >
          {/* ── Animated connector line (.hiw-track__line) ───────────────
               Sits behind the step nodes at y ≈ 52px (node centre).
               Hidden below 1100px breakpoint. */}
          <div
            className={[
              "absolute top-[52px] z-0 overflow-hidden h-px",
              "bg-border",
              /* start/end inset = centre of first / last column */
              "left-[10%] right-[10%]",
              /* hide on narrower layouts where grid wraps */
              "max-[1100px]:hidden",
            ].join(" ")}
          >
            {/* Framer-motion drives the fill from 0 → 100% on scroll */}
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-gold-light"
              initial={{ width: 0 }}
              animate={{ width: lineAnimated ? "100%" : 0 }}
              transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* ── Step nodes ──────────────────────────────────────────────── */}
          {STEPS.map((step, i) => (
            <StepNode
              key={step.id}
              num={step.num}
              label={step.label}
              icon={StepIcons[step.id]}
              isActive={activeStep === i}
              index={i}
              onClick={() => handleStepClick(i)}
            />
          ))}
        </div>

        {/* ── Detail panels — one per step, only the active one opens ── */}
        {STEPS.map((step, i) => (
          <DetailPanel key={step.id} step={step} open={activeStep === i} />
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          GUARANTEE STRIP (.hiw-guarantee)
         ════════════════════════════════════════════════════════════════ */}
      <GuaranteeStrip />
    </section>
  );
}
