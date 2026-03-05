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
    <div className="bg-(--obsidian-2) border border-(--border) overflow-hidden mb-5">
      {/* Header row */}
      <div className="px-3.5 py-2.5 border-b border-(--border) flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-(--gold) opacity-60" />
        <div className="w-2 h-2 rounded-full bg-(--ivory-muted)" />
        <div className="w-2 h-2 rounded-full bg-(--ivory-muted)" />
        <span className="text-[0.65rem] text-(--ivory-muted) tracking-[0.06em] flex-1">
          ✓ Webinar Confirmed — Check Your Inbox
        </span>
      </div>

      {/* Body lines */}
      <div className="p-3.5">
        {/* Gold accent line */}
        <div className="h-1.5 rounded-sm bg-(--gold-dim) w-[60%] mb-1.75" />
        {/* Text lines */}
        <div className="h-1.5 rounded-sm bg-(--obsidian-4) w-[75%] mb-1.75" />
        <div className="h-1.5 rounded-sm bg-(--obsidian-4) w-[40%] mb-1.75" />
        <div className="h-1.5 rounded-sm bg-(--obsidian-4) w-[75%] mb-1.75" />
        {/* Cyan accent line */}
        <div
          className="h-1.5 rounded-sm mb-1.75"
          style={{ width: "55%", background: "var(--cyan-dim)" }}
        />
      </div>
    </div>
  );
}

// ─── DetailPanel ──────────────────────────────────────────────────────────────
export default function DetailPanel({ step, open }: DetailPanelProps) {
  return (
    <div className="relative z-2 overflow-hidden">
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
            <motion.div
              className={[
                "px-15 pt-14 pb-18",
                "border-t border-(--border) mt-10",
                "grid gap-0 grid-cols-[1fr_1.2fr_1fr]",
                "max-[1100px]:grid-cols-1 max-[1100px]:gap-8",
                "max-md:px-6 max-md:pt-8 max-md:pb-12",
              ].join(" ")}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            >
              {/* ── LEFT: step info ──────────────────────────────────── */}
              <div className="pr-12 border-r border-(--border) max-[1100px]:pr-0 max-[1100px]:border-r-0">
                {/* Ghost step number */}
                <div
                  className="font-bebas text-[5rem] tracking-[0.04em] leading-none text-(--gold) -mb-2"
                  style={{ opacity: 0.08 }}
                >
                  {step.num}
                </div>

                {/* Step tag badge */}
                <div className="inline-block text-[0.6rem] tracking-[0.25em] uppercase text-(--gold) border border-(--border) px-2.5 py-1 bg-(--gold-dim) mb-4">
                  {step.tag}
                </div>

                {/* Step heading */}
                <h3 className="font-cormorant text-[2rem] font-light leading-[1.2] text-(--ivory) mb-4 [&_em]:italic [&_em]:text-(--gold-light)">
                  {step.heading}
                </h3>

                {/* Step body copy */}
                <p className="text-[0.8rem] leading-[1.75] text-(--ivory-dim) font-light">
                  {step.body}
                </p>
              </div>

              {/* ── CENTER: checklist ────────────────────────────────── */}
              <div className="px-12 border-r border-(--border) max-[1100px]:px-0 max-[1100px]:border-r-0">
                <div className="text-[0.6rem] tracking-[0.25em] uppercase text-(--ivory-muted) mb-5">
                  {step.centerLabel}
                </div>

                <ul className="flex flex-col gap-3 list-none">
                  {step.checkItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[0.78rem] text-(--ivory-dim) font-light leading-normal"
                    >
                      <span className="w-4.5 h-4.5 shrink-0 mt-px flex items-center justify-center text-[0.6rem] border border-(--border-mid) bg-(--gold-dim) text-(--gold)">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── RIGHT: outcome + CTA ─────────────────────────────── */}
              <div className="pl-12 max-[1100px]:pl-0">
                <div className="text-[0.6rem] tracking-[0.25em] uppercase text-(--ivory-muted) mb-4">
                  What you get
                </div>

                {/* Outcome card */}
                <div
                  className="relative overflow-hidden border border-(--border) p-5.5 mb-6 before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-linear-to-r before:from-(--gold) before:to-transparent"
                  style={{ background: "linear-gradient(145deg, var(--obsidian-2), var(--obsidian-4))" }}
                >
                  <p className="font-cormorant text-[1.05rem] font-light leading-normal text-(--ivory-dim) italic [&_strong]:not-italic [&_strong]:text-(--gold-light) [&_strong]:font-normal">
                    {step.outcomeText}
                  </p>
                </div>

                {/* Email preview — step 4 only */}
                {step.id === "email" && <EmailPreview />}

                {/* CTA button — intentionally fixed dark text on gold */}
                <button
                  className={[
                    "inline-flex items-center gap-2.5",
                    "text-[0.7rem] tracking-[0.18em] uppercase text-[#1c1a14]",
                    "bg-linear-to-br from-(--gold) to-(--gold-light)",
                    "border-none px-6.5 py-3.25 cursor-pointer",
                    "font-dm font-medium clip-bevel-sm",
                    "transition-all duration-250",
                    "hover:-translate-y-px",
                  ].join(" ")}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "linear-gradient(135deg, var(--gold-light), var(--gold-pale))";
                    el.style.boxShadow = "0 8px 24px var(--gold-glow)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "";
                    el.style.boxShadow = "";
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
