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

export default function StepNode({ num, label, icon, isActive, index, onClick }: StepNodeProps) {
  return (
    <motion.div
      data-active={isActive}
      className="group/step relative z-1 flex flex-col items-center cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 + 0.1, ease: "easeOut" }}
    >
      {/* ── Node circle ─────────────────────────────────────────────────── */}
      <div
        className={[
          "w-26 h-26 rounded-full",
          "flex items-center justify-center relative z-2 shrink-0 mb-8",
          "border transition-all duration-400",
          // dashed outer ring
          "before:absolute before:-inset-2 before:rounded-full",
          "before:border before:border-dashed before:border-(--border)",
          "before:transition-all before:duration-400 before:content-['']",
          // glow outer ring
          "after:absolute after:-inset-4 after:rounded-full",
          "after:border after:border-transparent",
          "after:transition-all after:duration-400 after:content-['']",
          // default state
          !isActive && "border-(--border) bg-(--obsidian-2)",
          // active state
          isActive && [
            "border-(--gold)",
            "before:border-(--border-mid)! before:scale-[1.05]",
            "after:border-(--border)! after:scale-[1.1]",
          ],
          // hover state (non-active)
          !isActive && [
            "group-hover/step:border-(--gold)",
            "group-hover/step:before:border-(--border-mid) group-hover/step:before:scale-[1.05]",
            "group-hover/step:after:border-(--border) group-hover/step:after:scale-[1.1]",
          ],
        ]
          .flat()
          .filter(Boolean)
          .join(" ")}
        style={
          isActive
            ? {
                background: "linear-gradient(145deg, var(--obsidian-3), var(--obsidian-4))",
                boxShadow: "0 0 32px var(--gold-glow), 0 0 64px var(--gold-dim)",
              }
            : undefined
        }
        onMouseEnter={(e) => {
          if (!isActive) {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = "linear-gradient(145deg, var(--obsidian-3), var(--obsidian-4))";
            el.style.boxShadow = "0 0 32px var(--gold-glow), 0 0 64px var(--gold-dim)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = "";
            el.style.boxShadow = "";
          }
        }}
      >
        {/* Step number — hides on active/hover */}
        <span
          className={[
            "font-bebas text-[2.6rem] tracking-[0.04em] leading-none",
            "transition-all duration-300",
            "text-(--ivory-muted)",
            isActive
              ? "text-(--gold-light) scale-[0.5] opacity-0 -translate-y-1"
              : [
                  "group-hover/step:text-(--gold-light)",
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
            !isActive && "opacity-0 scale-50",
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

      {/* ── Label ────────────────────────────────────────────────────────── */}
      <span
        className={[
          "text-[0.65rem] tracking-[0.22em] uppercase text-center",
          "transition-colors duration-300 px-2",
          isActive
            ? "text-(--gold)"
            : "text-(--ivory-muted) group-hover/step:text-(--gold)",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
      </span>
    </motion.div>
  );
}
