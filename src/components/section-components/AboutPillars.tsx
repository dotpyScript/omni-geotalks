"use client";

import { useInView } from "./useInView";

// ─── Pillar data ───────────────────────────────────────────────────────────────

const PILLARS = [
  {
    index: "01",
    title: "Context-First Education",
    description:
      "Every curriculum is built around African data, African infrastructure challenges and African professionals — not adapted from foreign frameworks but designed from the ground up for this continent's realities.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="16" cy="16" r="12" />
        <ellipse cx="16" cy="16" rx="5" ry="12" />
        <line x1="4" y1="16" x2="28" y2="16" />
        <line x1="6" y1="10" x2="26" y2="10" />
        <line x1="6" y1="22" x2="26" y2="22" />
      </svg>
    ),
    accentColor: "rgba(0,80,160,0.15)",
  },
  {
    index: "02",
    title: "AI & Digital Twin Integration",
    description:
      "We don't teach yesterday's tools. IEGS curricula embed AI-powered spatial analytics and Digital Twin methodologies so practitioners are equipped for the next decade — not the last.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="4" y="4" width="11" height="11" />
        <rect x="17" y="4" width="11" height="11" />
        <rect x="4" y="17" width="11" height="11" />
        <path d="M17 22 L22 17 L28 28 Z" strokeOpacity="0.6" />
        <circle cx="22" cy="22" r="2" fill="rgba(201,168,76,0.3)" stroke="currentColor" />
      </svg>
    ),
    accentColor: "rgba(0,212,255,0.10)",
  },
  {
    index: "03",
    title: "Practitioner-to-Practitioner",
    description:
      "Our speakers are not consultants who theorise. They are the engineers, scientists, policymakers and field practitioners actively reshaping Africa's geospatial landscape — sharing live knowledge from the frontline.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="10" cy="10" r="4" />
        <circle cx="22" cy="10" r="4" />
        <circle cx="16" cy="23" r="4" />
        <line x1="13.5" y1="13" x2="14.5" y2="19.5" />
        <line x1="18.5" y1="13" x2="17.5" y2="19.5" />
        <line x1="14" y1="10" x2="18" y2="10" />
      </svg>
    ),
    accentColor: "rgba(0,229,160,0.10)",
  },
];

// ─── AboutPillars ──────────────────────────────────────────────────────────────

export function AboutPillars() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div ref={ref}>
      {/* Section label */}
      <div
        className={[
          "flex items-center gap-4 mb-10",
          "transition-[opacity,transform] duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        ].join(" ")}
      >
        <span aria-hidden="true" className="w-8 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
        <span className="text-[0.68rem] tracking-[0.35em] uppercase text-[#c9a84c]">
          What Drives Us
        </span>
        <span aria-hidden="true" className="flex-1 h-px bg-gradient-to-r from-[rgba(201,168,76,0.3)] to-transparent" />
      </div>

      {/* Pillars grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
        {PILLARS.map((p, i) => (
          <div
            key={p.index}
            style={{ transitionDelay: `${i * 130}ms` }}
            className={[
              "group relative overflow-hidden",
              "bg-gradient-to-br from-[#0d1118] to-[#12161f]",
              "border border-[rgba(201,168,76,0.14)]",
              "p-8 flex flex-col gap-5",
              "cursor-default",
              "transition-[opacity,transform,border-color,box-shadow] duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              "hover:border-[rgba(201,168,76,0.30)] hover:shadow-[0_0_40px_rgba(201,168,76,0.07)]",
              "hover:z-[1]",
            ].join(" ")}
          >
            {/* Per-pillar ambient glow on hover */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 30% 50%, ${p.accentColor} 0%, transparent 65%)`,
              }}
            />

            {/* Top-right corner brackets */}
            <span
              aria-hidden="true"
              className="absolute top-4 right-4 w-5 h-5
                border-t border-r border-[rgba(201,168,76,0.3)]
                opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100
                transition-[opacity,transform] duration-300"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-4 w-5 h-5
                border-b border-l border-[rgba(201,168,76,0.3)]
                opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100
                transition-[opacity,transform] duration-300 delay-50"
            />

            {/* Index number */}
            <div className="font-['Bebas_Neue',sans-serif] text-[3.5rem] leading-none tracking-[0.05em] text-[rgba(201,168,76,0.10)] absolute top-4 right-6 select-none">
              {p.index}
            </div>

            {/* Icon */}
            <div
              className={[
                "relative z-[1] w-14 h-14 flex items-center justify-center flex-shrink-0",
                "border border-[rgba(201,168,76,0.18)] bg-[rgba(8,10,15,0.6)]",
                "text-[#c9a84c]",
                "transition-[border-color,background,color] duration-300",
                "group-hover:border-[rgba(201,168,76,0.40)] group-hover:bg-[rgba(201,168,76,0.08)] group-hover:text-[#e8c97e]",
              ].join(" ")}
            >
              {p.icon}
            </div>

            {/* Content */}
            <div className="relative z-[1]">
              <h3
                className={[
                  "font-['Cormorant_Garamond',serif] font-normal",
                  "text-[1.35rem] leading-[1.2] text-[#f0ede6] mb-3",
                  "transition-colors duration-300 group-hover:text-[#f5e6c0]",
                ].join(" ")}
              >
                {p.title}
              </h3>
              <p className="text-[0.78rem] leading-[1.7] text-[rgba(240,237,230,0.45)] font-light">
                {p.description}
              </p>
            </div>

            {/* Bottom gold rule that extends on hover */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px] origin-left
                bg-gradient-to-r from-[#c9a84c] to-transparent
                scale-x-0 group-hover:scale-x-100
                transition-transform duration-500 ease-out"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
