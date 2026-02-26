"use client";

import { useInView } from "./useInView";

// ─── AboutCTA ──────────────────────────────────────────────────────────────────
// A full-width CTA strip at the bottom of the About section.
// Features a diagonal gold slash background and two action buttons.

export function AboutCTA() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={[
        "relative overflow-hidden",
        "border border-[rgba(201,168,76,0.14)]",
        "p-12 md:p-16",
        "flex flex-col md:flex-row items-center justify-between gap-8",
        "transition-[opacity,transform] duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
    >
      {/* Background: diagonal gradient slash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, rgba(201,168,76,0.05) 0%, transparent 40%, rgba(0,212,255,0.03) 100%)",
        }}
      />

      {/* Blueprint grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-grid opacity-60"
      />

      {/* Diagonal gold rule */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-[20%] bottom-0 w-px origin-top"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.2), transparent)",
          transform: "rotate(15deg) scaleX(1)",
        }}
      />

      {/* Text */}
      <div className="relative z-[1]">
        <div className="flex items-center gap-3 mb-3">
          <span aria-hidden="true" className="w-6 h-px bg-[#c9a84c]" />
          <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#c9a84c]">
            Join IEGS
          </span>
        </div>
        <h3
          className={[
            "font-['Cormorant_Garamond',serif] font-light",
            "text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15] text-[#f0ede6]",
          ].join(" ")}
        >
          Ready to shape Africa's{" "}
          <em className="italic text-[#e8c97e]">spatial future?</em>
        </h3>
      </div>

      {/* Buttons */}
      <div className="relative z-[1] flex flex-wrap gap-4 flex-shrink-0">
        {/* Primary */}
        <button
          type="button"
          className={[
            "inline-flex items-center gap-3",
            "text-[0.72rem] tracking-[0.18em] uppercase font-medium",
            "font-['DM_Sans',sans-serif]",
            "text-[#080a0f]",
            "bg-gradient-to-br from-[#c9a84c] to-[#e8c97e]",
            "px-7 py-[14px]",
            "clip-bevel-sm",
            "transition-all duration-[250ms]",
            "hover:from-[#e8c97e] hover:to-[#f5e6c0]",
            "hover:shadow-[0_8px_28px_rgba(201,168,76,0.35)]",
            "hover:-translate-y-px",
            "cursor-pointer border-none",
          ].join(" ")}
        >
          Explore Webinars
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>

        {/* Ghost */}
        <button
          type="button"
          className={[
            "inline-flex items-center gap-3",
            "text-[0.72rem] tracking-[0.18em] uppercase",
            "font-['DM_Sans',sans-serif]",
            "text-[rgba(240,237,230,0.55)]",
            "border border-[rgba(201,168,76,0.22)]",
            "px-7 py-[14px]",
            "transition-all duration-[250ms]",
            "hover:border-[rgba(201,168,76,0.40)] hover:text-[#f0ede6] hover:bg-[rgba(201,168,76,0.08)]",
            "cursor-pointer bg-transparent",
          ].join(" ")}
        >
          Meet Our Speakers
        </button>
      </div>
    </div>
  );
}
