"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import StepNode from "./StepNode";
import DetailPanel from "./DetailPanel";
import GuaranteeStrip from "./GuaranteeStrip";
import { StepIcons } from "./StepIcons";
import { STEPS } from "./constants";

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [lineAnimated, setLineAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLineAnimated(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleStepClick = (i: number) => {
    setActiveStep((prev) => (prev === i ? -1 : i));
  };

  return (
    <section
      ref={sectionRef}
      className="relative font-dm text-(--ivory) overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--obsidian-2) 0%, var(--obsidian-3) 50%, var(--obsidian-2) 100%)" }}
    >
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid opacity-60" />

      {/* Top diagonal rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20 z-1 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, var(--gold) 25%, var(--gold) 75%, transparent 100%)" }}
      />

      {/* Ambient gold glow — top-left */}
      <div
        className="absolute z-0 pointer-events-none rounded-full blur-[100px] w-125 h-75 top-[20%] left-[-100px]"
        style={{ background: "radial-gradient(ellipse, var(--gold-dim) 0%, transparent 70%)" }}
      />

      {/* Ambient cyan glow — bottom-right */}
      <div
        className="absolute z-0 pointer-events-none rounded-full blur-[100px] w-100 h-100 bottom-[10%] right-[-80px]"
        style={{ background: "radial-gradient(ellipse, var(--cyan-dim) 0%, transparent 70%)" }}
      />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div
        className={[
          "relative z-2",
          "pt-[100px] px-[60px]",
          "grid grid-cols-2 gap-10 items-end mb-20",
          "max-md:grid-cols-1 max-md:pt-[60px] max-md:px-6 max-md:mb-12",
        ].join(" ")}
      >
        {/* Left: eyebrow + title */}
        <div>
          <div className="eyebrow mb-5">
            <span className="eyebrow-text">Simple Process</span>
          </div>
          <h2
            className={[
              "font-cormorant font-light leading-[1.06] text-(--ivory)",
              "text-[clamp(2.4rem,4vw,3.8rem)]",
              "[&_em]:italic [&_em]:text-(--gold-light)",
            ].join(" ")}
          >
            How It <em>Works</em>
          </h2>
        </div>

        {/* Right: subtitle */}
        <p
          className={[
            "text-[0.88rem] leading-[1.75] text-(--ivory-dim) font-light max-w-[400px]",
            "[&_strong]:text-(--gold-light) [&_strong]:font-normal",
          ].join(" ")}
        >
          From discovery to joining live — the entire process takes
          <strong> under 5 minutes</strong> and requires nothing more than your
          name and email. No account. No payment.
          <strong> Just knowledge.</strong>
        </p>
      </div>

      {/* ── Process track ───────────────────────────────────────────────── */}
      <div className="relative z-2 px-[60px] max-md:px-6">
        <div
          className={[
            "relative grid grid-cols-5 gap-0",
            "max-[1100px]:grid-cols-3 max-[1100px]:gap-y-12",
            "max-md:grid-cols-2",
            "max-[480px]:grid-cols-1",
          ].join(" ")}
        >
          {/* Animated connector line */}
          <div
            className={[
              "absolute top-[52px] z-0 overflow-hidden h-px",
              "bg-(--border)",
              "left-[10%] right-[10%]",
              "max-[1100px]:hidden",
            ].join(" ")}
          >
            <motion.div
              className="h-full bg-linear-to-r from-(--gold) to-(--gold-light)"
              initial={{ width: 0 }}
              animate={{ width: lineAnimated ? "100%" : 0 }}
              transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

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

        {STEPS.map((step, i) => (
          <DetailPanel key={step.id} step={step} open={activeStep === i} />
        ))}
      </div>

      {/* ── Guarantee strip ─────────────────────────────────────────────── */}
      <GuaranteeStrip />
    </section>
  );
}
