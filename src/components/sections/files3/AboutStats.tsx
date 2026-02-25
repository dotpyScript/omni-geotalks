"use client";

import type { StatItem } from "./types";
import { AboutCounter } from "./AboutCounter";
import { useInView } from "./useInView";
import { STATS } from "./data";

// ─── AboutStats Props ──────────────────────────────────────────────────────────

interface AboutStatsProps {
  stats?: StatItem[];
}

// ─── AboutStats ────────────────────────────────────────────────────────────────
// Four large animated counters in a horizontal strip.
// Each counter triggers on scroll-entry with staggered delay.

export function AboutStats({ stats = STATS }: AboutStatsProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-[rgba(201,168,76,0.14)]"
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          style={{ transitionDelay: `${i * 120}ms` }}
          className={[
            "relative flex flex-col items-center justify-center text-center",
            "px-6 py-10",
            // right border except last in each row
            "border-r border-[rgba(201,168,76,0.14)] last:border-r-0",
            // second item in 2-col mobile: no right border
            "even:max-lg:border-r-0",
            // top border for bottom row on mobile
            "[&:nth-child(3)]:max-lg:border-t [&:nth-child(4)]:max-lg:border-t",
            "[&:nth-child(3)]:max-lg:border-[rgba(201,168,76,0.14)] [&:nth-child(4)]:max-lg:border-[rgba(201,168,76,0.14)]",
            // reveal transition
            "transition-[opacity,transform] duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            // hover subtle gold tint
            "group cursor-default hover:bg-[rgba(201,168,76,0.03)] transition-colors",
          ].join(" ")}
        >
          {/* Decorative corner bracket — top left */}
          <span
            aria-hidden="true"
            className="absolute top-3 left-3 w-4 h-4
              border-t border-l border-[rgba(201,168,76,0.25)]
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          {/* Decorative corner bracket — bottom right */}
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 w-4 h-4
              border-b border-r border-[rgba(201,168,76,0.25)]
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Value */}
          <div
            className={[
              "font-['Bebas_Neue',sans-serif] leading-none tracking-[0.02em]",
              "text-[clamp(3rem,6vw,5rem)]",
              "text-gold-gradient",
              "mb-2",
            ].join(" ")}
          >
            {inView ? (
              <AboutCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                duration={1800}
              />
            ) : (
              <span>0</span>
            )}
          </div>

          {/* Label */}
          <div className="text-[0.75rem] tracking-[0.22em] uppercase text-[#f0ede6] font-normal mb-1">
            {stat.label}
          </div>

          {/* Sublabel */}
          {stat.sublabel && (
            <div className="text-[0.62rem] tracking-[0.12em] uppercase text-[rgba(240,237,230,0.28)]">
              {stat.sublabel}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
