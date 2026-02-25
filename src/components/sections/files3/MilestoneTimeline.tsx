"use client";

import { useInView } from "./useInView";
import type { MilestoneItem } from "./types";
import { MILESTONES } from "./data";

// ─── MilestoneTimeline Props ───────────────────────────────────────────────────

interface MilestoneTimelineProps {
  milestones?: MilestoneItem[];
}

// ─── MilestoneTimeline ─────────────────────────────────────────────────────────
// A horizontal timeline of founding milestones.
// On desktop: all four in a row with a connecting gold line.
// On mobile: vertical stack.
// Each card slides up and fades in with staggered delay.

export function MilestoneTimeline({ milestones = MILESTONES }: MilestoneTimelineProps) {
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
          Our Journey
        </span>
        <span aria-hidden="true" className="flex-1 h-px bg-gradient-to-r from-[rgba(201,168,76,0.3)] to-transparent" />
      </div>

      {/* Timeline row */}
      <div className="relative">

        {/* Connecting line (desktop only) */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-[28px] left-[6%] right-[6%] h-px z-0"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3) 15%, rgba(201,168,76,0.3) 85%, transparent)" }}
        >
          {/* Animated fill */}
          <div
            className="h-full bg-gradient-to-r from-[#c9a84c] to-[rgba(201,168,76,0.3)] origin-left transition-[transform] duration-[1200ms] delay-300 ease-out"
            style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
          />
        </div>

        {/* Milestone cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              style={{
                transitionDelay: `${i * 150 + 200}ms`,
              }}
              className={[
                "group relative flex flex-col",
                "transition-[opacity,transform] duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
            >
              {/* Year node + connector dot */}
              <div className="relative flex items-center gap-4 mb-5 lg:flex-col lg:items-start lg:gap-2">
                {/* Dot on the timeline line */}
                <div
                  className={[
                    "relative z-10 flex-shrink-0",
                    "w-[14px] h-[14px] rounded-full",
                    "border-2 border-[#c9a84c]",
                    "bg-[#080a0f]",
                    "transition-[box-shadow,background] duration-300",
                    "group-hover:bg-[#c9a84c] group-hover:shadow-[0_0_16px_rgba(201,168,76,0.5)]",
                    // mobile: vertical connector line
                    "after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2",
                    "after:w-px after:h-6 after:bg-gradient-to-b after:from-[rgba(201,168,76,0.4)] after:to-transparent",
                    "lg:after:hidden",
                  ].join(" ")}
                />

                {/* Year label */}
                <span className="font-['Bebas_Neue',sans-serif] text-[2rem] leading-none tracking-[0.05em] text-[#c9a84c] lg:mt-3">
                  {m.year}
                </span>
              </div>

              {/* Card content */}
              <div
                className={[
                  "flex-1 p-5 border border-[rgba(201,168,76,0.14)]",
                  "bg-gradient-to-br from-[#0d1118] to-[#12161f]",
                  "transition-[border-color,box-shadow] duration-300",
                  "group-hover:border-[rgba(201,168,76,0.30)] group-hover:shadow-[0_0_30px_rgba(201,168,76,0.08)]",
                  "relative overflow-hidden",
                ].join(" ")}
              >
                {/* Top accent bar */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#c9a84c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <h4
                  className={[
                    "font-['Cormorant_Garamond',serif] font-normal",
                    "text-[1.1rem] leading-[1.2] text-[#f0ede6] mb-3",
                    "group-hover:text-[#e8c97e] transition-colors duration-300",
                  ].join(" ")}
                >
                  {m.title}
                </h4>
                <p className="text-[0.74rem] leading-[1.65] text-[rgba(240,237,230,0.45)] font-light">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
