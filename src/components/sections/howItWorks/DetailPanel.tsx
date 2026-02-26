"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Step } from "./types";

interface DetailPanelProps {
  step: Step;
  open: boolean;
}

// ─── Email preview mockup (shown only for step "email") ───────────────────────
function EmailPreview() {
  return (
    /*
     * Replicates .email-preview — a faux email card for the step-4 detail panel.
     */
    <div className="bg-obsidian-2 border border-border overflow-hidden mb-5">
      {/* Header row */}
      <div className="px-[14px] py-[10px] border-b border-border flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gold opacity-60" />
        <div className="w-2 h-2 rounded-full bg-ivory-muted" />
        <div className="w-2 h-2 rounded-full bg-ivory-muted" />
        <span className="text-[0.65rem] text-ivory-muted tracking-[0.06em] flex-1">
          ✓ Webinar Confirmed — Check Your Inbox
        </span>
      </div>

      {/* Body lines — faux text lines */}
      <div className="p-[14px]">
        {/* Gold accent line */}
        <div className="h-[6px] rounded-sm bg-[rgba(201,168,76,0.2)] w-[60%] mb-[7px]" />
        {/* Medium line */}
        <div className="h-[6px] rounded-sm bg-obsidian-4 w-[75%] mb-[7px]" />
        {/* Short line */}
        <div className="h-[6px] rounded-sm bg-obsidian-4 w-[40%] mb-[7px]" />
        {/* Medium line */}
        <div className="h-[6px] rounded-sm bg-obsidian-4 w-[75%] mb-[7px]" />
        {/* Cyan accent line */}
        <div
          className="h-[6px] rounded-sm mb-[7px]"
          style={{ width: "55%", background: "rgba(0,212,255,0.15)" }}
        />
      </div>
    </div>
  );
}

// ─── DetailPanel ──────────────────────────────────────────────────────────────
export default function DetailPanel({ step, open }: DetailPanelProps) {
  return (
    /*
     * Outer overflow-hidden wrapper controls the max-height reveal.
     * AnimatePresence + motion.div replaces the .hiw-detail / .hiw-detail.open
     * max-height CSS transition for a smoother Framer-Motion driven expand.
     */
    <div className="relative z-[2] overflow-hidden">
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ maxHeight: 0 }}
            animate={{ maxHeight: 600 }}
            exit={{ maxHeight: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            {/*
             * Inner grid — replicates .hiw-detail__inner
             * Desktop: 3-col grid [1fr 1.2fr 1fr]
             * ≤1100px : single column, borders removed
             * ≤768px  : tighter padding
             */}
            <motion.div
              className={[
                /* spacing & top rule */
                "px-[60px] pt-14 pb-[72px]",
                "border-t border-border mt-10",
                /* 3-col grid */
                "grid gap-0",
                "grid-cols-[1fr_1.2fr_1fr]",
                /* responsive: ≤1100px → single col */
                "max-[1100px]:grid-cols-1 max-[1100px]:gap-8",
                /* responsive: ≤768px  → smaller padding */
                "max-md:px-6 max-md:pt-8 max-md:pb-12",
              ].join(" ")}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            >
              {/* ── LEFT: step info ──────────────────────────────────── */}
              <div
                className={[
                  "pr-12",
                  "border-r border-border",
                  "max-[1100px]:pr-0 max-[1100px]:border-r-0",
                ].join(" ")}
              >
                {/* Large ghost step number */}
                <div className="font-bebas text-[5rem] tracking-[0.04em] leading-none text-[rgba(201,168,76,0.08)] -mb-2">
                  {step.num}
                </div>

                {/* Step tag badge */}
                <div className="inline-block text-[0.6rem] tracking-[0.25em] uppercase text-gold border border-border px-[10px] py-1 bg-gold-dim mb-4">
                  {step.tag}
                </div>

                {/* Step heading */}
                <h3 className="font-cormorant text-[2rem] font-light leading-[1.2] text-ivory mb-4 [&_em]:italic [&_em]:text-gold-light">
                  {step.heading}
                </h3>

                {/* Step body copy */}
                <p className="text-[0.8rem] leading-[1.75] text-ivory-dim font-light">
                  {step.body}
                </p>
              </div>

              {/* ── CENTER: checklist ────────────────────────────────── */}
              <div
                className={[
                  "px-12",
                  "border-r border-border",
                  "max-[1100px]:px-0 max-[1100px]:border-r-0",
                ].join(" ")}
              >
                {/* Center label */}
                <div className="text-[0.6rem] tracking-[0.25em] uppercase text-ivory-muted mb-5">
                  {step.centerLabel}
                </div>

                {/* Checklist */}
                <ul className="flex flex-col gap-3 list-none">
                  {step.checkItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[0.78rem] text-ivory-dim font-light leading-[1.5]"
                    >
                      {/* Check icon box */}
                      <span className="w-[18px] h-[18px] flex-shrink-0 mt-[1px] flex items-center justify-center text-[0.6rem] border border-[rgba(201,168,76,0.3)] bg-gold-dim text-gold">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── RIGHT: outcome + CTA ─────────────────────────────── */}
              <div
                className={[
                  "pl-12",
                  "max-[1100px]:pl-0",
                ].join(" ")}
              >
                {/* Outcome label */}
                <div className="text-[0.6rem] tracking-[0.25em] uppercase text-ivory-muted mb-4">
                  What you get
                </div>

                {/* Outcome card */}
                <div className="relative overflow-hidden border border-border p-[22px] mb-6 before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-gold before:to-transparent"
                  style={{ background: "linear-gradient(145deg, var(--obsidian-2), var(--obsidian-4))" }}
                >
                  <p className="font-cormorant text-[1.05rem] font-light leading-[1.5] text-ivory-dim italic [&_strong]:not-italic [&_strong]:text-gold-light [&_strong]:font-normal">
                    {step.outcomeText}
                  </p>
                </div>

                {/* Email preview mockup — only for step 4 */}
                {step.id === "email" && <EmailPreview />}

                {/* CTA button — replicates .hiw-detail__cta with clip-bevel-sm */}
                <button
                  className={[
                    "inline-flex items-center gap-[10px]",
                    "text-[0.7rem] tracking-[0.18em] uppercase text-obsidian",
                    "bg-gradient-to-br from-gold to-gold-light",
                    "border-none px-[26px] py-[13px] cursor-pointer",
                    "font-dm font-medium",
                    "clip-bevel-sm",
                    "transition-all duration-[250ms]",
                    "hover:shadow-[0_8px_24px_rgba(201,168,76,0.3)]",
                    "hover:-translate-y-px",
                  ].join(" ")}
                  style={{
                    /* hover bg change needs inline since Tailwind can't
                       express the exact gradient stop change */
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "linear-gradient(135deg, var(--gold-light), var(--gold-pale))";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "";
                  }}
                >
                  {step.ctaLabel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
