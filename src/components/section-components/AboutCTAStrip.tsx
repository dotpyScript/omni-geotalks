"use client";

import { useScrollReveal } from "./useScrollReveal";

interface AboutCTAStripProps {
  onExplore?: () => void;
  onSpeakers?: () => void;
}

// ─── AboutCTAStrip ─────────────────────────────────────────────────────────────
// A dramatic full-width CTA with:
//   - Background: diagonal overlay of gold/cyan gradients
//   - A large italic Cormorant pull quote
//   - Two action buttons
//   - Animated appearance on scroll

export function AboutCTAStrip({ onExplore, onSpeakers }: AboutCTAStripProps) {
  const [ref, vis] = useScrollReveal<HTMLDivElement>(0.3);

  return (
    <div
      ref={ref}
      className={[
        "relative overflow-hidden border border-[rgba(201,168,76,0.18)]",
        "transition-[opacity,transform] duration-800 ease-out",
        vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ].join(" ")}
    >
      {/* Multi-layer background */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#0d1118] via-[#080a0f] to-[#0a0e16]" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(118deg, rgba(201,168,76,0.07) 0%, transparent 45%, rgba(0,212,255,0.04) 100%)" }}
      />
      {/* Blueprint grid */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      {/* Diagonal gold slash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div
          className="absolute top-0 bottom-0 w-[1px]"
          style={{
            left: "38%",
            background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.25) 70%, transparent)",
            transform: "rotate(12deg) scaleX(1) translateX(-50%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[1] px-10 py-14 md:px-16 md:py-18 flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span aria-hidden="true" className="w-5 h-px bg-[#c9a84c]" />
            <span className="text-[0.6rem] tracking-[0.4em] uppercase text-[#c9a84c] font-['DM_Sans',sans-serif]">
              Join IEGS
            </span>
          </div>

          {/* Pull quote */}
          <h3
            className={[
              "font-['Cormorant_Garamond',serif] font-light leading-[1.15]",
              "text-[clamp(1.6rem,3.2vw,2.6rem)] text-[#f0ede6]",
              "max-w-[520px]",
            ].join(" ")}
          >
            Ready to shape Africa's{" "}
            <em className="italic text-[#e8c97e] not-italic">spatial future</em>{" "}
            with the continent's best minds?
          </h3>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 flex-shrink-0">
          <button
            type="button"
            onClick={onExplore}
            className={[
              "group inline-flex items-center gap-3",
              "font-['DM_Sans',sans-serif] text-[0.72rem] tracking-[0.18em] uppercase font-medium",
              "text-[#080a0f] bg-gradient-to-br from-[#c9a84c] to-[#e8c97e]",
              "px-7 py-[13px]",
              "clip-bevel-sm",
              "transition-all duration-[250ms]",
              "hover:from-[#e8c97e] hover:to-[#f5e6c0]",
              "hover:shadow-[0_8px_28px_rgba(201,168,76,0.35)]",
              "hover:-translate-y-px cursor-pointer border-none",
            ].join(" ")}
          >
            Explore Webinars
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>

          <button
            type="button"
            onClick={onSpeakers}
            className={[
              "inline-flex items-center gap-3",
              "font-['DM_Sans',sans-serif] text-[0.72rem] tracking-[0.18em] uppercase",
              "text-[rgba(240,237,230,0.5)] border border-[rgba(201,168,76,0.22)]",
              "px-7 py-[13px] bg-transparent",
              "transition-all duration-[250ms]",
              "hover:border-[rgba(201,168,76,0.45)] hover:text-[#f0ede6] hover:bg-[rgba(201,168,76,0.07)]",
              "cursor-pointer",
            ].join(" ")}
          >
            Meet Our Speakers
          </button>
        </div>
      </div>
    </div>
  );
}
