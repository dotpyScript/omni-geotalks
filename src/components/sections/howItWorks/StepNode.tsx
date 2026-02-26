"use client";

import { motion } from "framer-motion";
import type { JSX } from "react";

interface StepNodeProps {
  num: string;
  label: string;
  icon: JSX.Element;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

export default function StepNode({
  num,
  label,
  icon,
  isActive,
  index,
  onClick,
}: StepNodeProps) {
  return (
    /*
     * Outer step wrapper — acts as the group anchor for hover/active states.
     * data-active drives Tailwind's data-[active=true]: variants below.
     * Framer-motion handles the stepReveal entrance animation.
     */
    <motion.div
      data-active={isActive}
      className="group/step relative z-[1] flex flex-col items-center cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 + 0.1, ease: "easeOut" }}
    >
      {/* ── Node circle ────────────────────────────────────────────────── */}
      <div
        className={[
          /* size & shape */
          "w-[104px] h-[104px] rounded-full",
          /* layout */
          "flex items-center justify-center relative z-[2] flex-shrink-0 mb-8",
          /* base border & bg */
          "border transition-all duration-[400ms]",
          /* pseudo — outer dashed ring */
          "before:absolute before:inset-[-8px] before:rounded-full",
          "before:border before:border-dashed before:border-[rgba(201,168,76,0.15)]",
          "before:transition-all before:duration-[400ms] before:content-['']",
          /* pseudo — glow ring */
          "after:absolute after:inset-[-16px] after:rounded-full",
          "after:border after:border-transparent",
          "after:transition-all after:duration-[400ms] after:content-['']",
          /* ── default state ─────────────────────── */
          !isActive && "border-border bg-obsidian-2",
          /* ── active state ──────────────────────── */
          isActive && [
            "border-gold",
            "shadow-[0_0_32px_rgba(201,168,76,0.2),0_0_64px_rgba(201,168,76,0.08)]",
            "before:!border-[rgba(201,168,76,0.3)] before:scale-[1.05]",
            "after:!border-[rgba(201,168,76,0.1)] after:scale-[1.1]",
          ],
          /* ── hover state (non-active) ──────────── */
          !isActive && [
            "group-hover/step:border-gold",
            "group-hover/step:shadow-[0_0_32px_rgba(201,168,76,0.2),0_0_64px_rgba(201,168,76,0.08)]",
            "group-hover/step:before:border-[rgba(201,168,76,0.3)] group-hover/step:before:scale-[1.05]",
            "group-hover/step:after:border-[rgba(201,168,76,0.1)] group-hover/step:after:scale-[1.1]",
          ],
        ]
          .flat()
          .filter(Boolean)
          .join(" ")}
        style={
          isActive
            ? { background: "linear-gradient(145deg, var(--obsidian-3), var(--obsidian-4))" }
            : undefined
        }
        /* Hover gradient — applied via JS since CSS-variable-based
           arbitrary gradients inside group-hover are unreliable in v4 */
        onMouseEnter={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLDivElement).style.background =
              "linear-gradient(145deg, var(--obsidian-3), var(--obsidian-4))";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLDivElement).style.background = "";
          }
        }}
      >
        {/* Step number — hides on active/hover */}
        <span
          className={[
            "font-bebas text-[2.6rem] tracking-[0.04em] leading-none",
            "transition-all duration-300",
            /* default */
            "text-ivory-muted",
            /* active */
            isActive
              ? "text-gold-light scale-[0.5] opacity-0 -translate-y-1"
              : [
                  "group-hover/step:text-gold-light",
                  "group-hover/step:scale-[0.5]",
                  "group-hover/step:opacity-0",
                  "group-hover/step:-translate-y-1",
                ],
          ]
            .flat()
            .filter(Boolean)
            .join(" ")}
        >
          {num}
        </span>

        {/* Icon — shows on active/hover */}
        <span
          className={[
            "absolute transition-all duration-300",
            /* default hidden */
            !isActive && "opacity-0 scale-50",
            /* active */
            isActive
              ? "opacity-100 scale-100"
              : "group-hover/step:opacity-100 group-hover/step:scale-100",
          ]
            .flat()
            .filter(Boolean)
            .join(" ")}
        >
          {icon}
        </span>
      </div>

      {/* ── Label below node ────────────────────────────────────────────── */}
      <span
        className={[
          "text-[0.65rem] tracking-[0.22em] uppercase text-center",
          "transition-colors duration-300 px-2",
          isActive
            ? "text-gold"
            : "text-ivory-muted group-hover/step:text-gold",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
      </span>
    </motion.div>
  );
}
