"use client";

import type { Category, CardVariant } from "./types";
import { CategoryIcon } from "./CategoryIcons";
import { AnimatedCounter } from "./AnimatedCounter";
import { CardPattern } from "./CardPattern";

// ─── CategoryCard Props ────────────────────────────────────────────────────────

interface CategoryCardProps {
  /** Full category data object */
  category: Category;
  /**
   * Visual variant:
   * - "featured"  → tall card spanning 2 rows, larger typography, always-visible description & arrow
   * - "standard"  → compact card, description & arrow revealed on hover
   */
  variant?: CardVariant;
  /** 1-based display index shown in the top-right corner */
  index: number;
  /** Optional additional Tailwind classes for the outer wrapper */
  className?: string;
  /** Click handler */
  onClick?: (id: string) => void;
}

// ─── CategoryCard ──────────────────────────────────────────────────────────────

export function CategoryCard({
  category,
  variant = "standard",
  index,
  className = "",
  onClick,
}: CategoryCardProps) {
  const isFeatured = variant === "featured";

  // Stagger delay per index (mirrors original CSS animation-delay logic)
  const delayMap: Record<number, string> = {
    0: "0s",
    1: "0.08s",
    2: "0.14s",
    3: "0.18s",
    4: "0.22s",
    5: "0.26s",
  };
  const animDelay = delayMap[index] ?? "0.3s";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(category.id)}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(category.id)}
      style={{ animationDelay: animDelay }}
      className={[
        // ── Layout & base ──────────────────────────────────────────────────
        "group relative overflow-hidden cursor-pointer flex flex-col justify-end",
        // ── Colours ────────────────────────────────────────────────────────
        "bg-(--obsidian-3)",
        // ── Border ─────────────────────────────────────────────────────────
        "border border-(--border)",
        "hover:border-(--border-mid)",
        // ── Shadow ──────────────────────────────────────────────────────────
        "shadow-[0_2px_16px_rgba(0,0,0,0.10)]",
        "hover:shadow-[0_12px_40px_var(--gold-dim),inset_0_0_50px_var(--gold-dim)]",
        // ── z-index bump on hover ────────────────────────────────────────
        "hover:z-[3]",
        // ── Height ──────────────────────────────────────────────────────────
        isFeatured ? "min-h-[580px]" : "min-h-[280px]",
        // ── Transition ──────────────────────────────────────────────────────
        "transition-all duration-[350ms]",
        // ── Reveal animation ─────────────────────────────────────────────
        "animate-[catReveal_0.6s_ease_both]",
        // ── Row span for featured ────────────────────────────────────────
        isFeatured ? "row-span-2" : "",
        // Caller-supplied extras
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Gradient background layer ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{ background: category.gradient }}
        className="absolute inset-0 z-0 transition-[transform,opacity] duration-[600ms] ease-in-out group-hover:scale-[1.06] group-hover:opacity-[0.85]"
      >
        <CardPattern color={category.patternColor} />
      </div>

      {/* ── Dark overlay gradient (theme-aware via color-mix) ─────────────── */}
      {/* Base overlay — fades out slightly on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] transition-opacity duration-[350ms] group-hover:opacity-0"
        style={{
          background: `linear-gradient(180deg,
            color-mix(in srgb, var(--obsidian) 10%, transparent) 0%,
            color-mix(in srgb, var(--obsidian) 35%, transparent) 40%,
            color-mix(in srgb, var(--obsidian) 88%, transparent) 80%,
            color-mix(in srgb, var(--obsidian) 97%, transparent) 100%)`,
        }}
      />
      {/* Hover overlay — lighter top so gradient pops through more */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] transition-opacity duration-[350ms] opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(180deg,
            color-mix(in srgb, var(--obsidian) 5%, transparent) 0%,
            color-mix(in srgb, var(--obsidian) 20%, transparent) 35%,
            color-mix(in srgb, var(--obsidian) 82%, transparent) 75%,
            color-mix(in srgb, var(--obsidian) 96%, transparent) 100%)`,
        }}
      />

      {/* ── Top-right corner bracket ───────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="absolute top-[18px] right-[18px] z-[3] w-[22px] h-[22px]
          border-t border-r border-(--border-mid)
          opacity-0 scale-[0.7] group-hover:opacity-100 group-hover:scale-100
          transition-[opacity,transform] duration-300"
      />

      {/* ── Bottom-left corner bracket ─────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-[3] w-[22px] h-[22px]
          border-b border-l border-(--border-mid)
          opacity-0 scale-[0.7] group-hover:opacity-100 group-hover:scale-100
          transition-[opacity,transform] duration-300 delay-[50ms]"
      />

      {/* ── Icon wrapper ───────────────────────────────────────────────── */}
      <div
        className={[
          "absolute z-[3] flex items-center justify-center",
          "border border-(--border) backdrop-blur-sm",
          "transition-[border-color,background,transform] duration-300",
          "group-hover:border-(--border-mid) group-hover:bg-(--gold-dim) group-hover:scale-[1.08]",
          isFeatured
            ? "w-16 h-16 top-9 left-9"
            : "w-[52px] h-[52px] top-7 left-7",
        ].join(" ")}
        style={{ background: 'var(--surface-haze)' }}
      >
        <CategoryIcon
          id={category.icon}
          className={[
            "transition-[stroke] duration-300",
            isFeatured ? "w-8 h-8" : "w-[26px] h-[26px]",
          ].join(" ")}
        />
      </div>

      {/* ── Index number (top-right) ───────────────────────────────────── */}
      <span
        className="absolute top-7 right-7 z-[3]
          font-['Bebas_Neue',sans-serif] text-base tracking-[0.1em]
          text-(--ivory-muted)
          group-hover:text-(--gold)
          transition-colors duration-300"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* ── Card content (bottom) ──────────────────────────────────────── */}
      <div className={isFeatured ? "relative z-[3] p-9" : "relative z-[3] p-7"}>

        {/* Tag pill */}
        <div
          className="inline-block text-[0.6rem] tracking-[0.25em] uppercase
            text-(--gold) border border-(--border)
            px-[10px] py-1 mb-[14px]
            backdrop-blur-sm"
          style={{ background: 'var(--surface-haze)' }}
        >
          {category.tag}
        </div>

        {/* Category name */}
        <h3
          className={[
            "font-['Cormorant_Garamond',serif] font-normal leading-[1.15]",
            "text-(--ivory) mb-[10px]",
            "group-hover:text-(--gold-pale) transition-colors duration-300",
            isFeatured ? "text-[2.4rem] font-light mb-[14px]" : "text-[1.5rem]",
          ].join(" ")}
        >
          {category.name}
        </h3>

        {/* Description — always visible on featured; revealed on hover for standard */}
        <p
          className={[
            "text-(--ivory-muted) font-light leading-[1.65]",
            isFeatured
              ? "text-[0.82rem] opacity-100"
              : "text-[0.76rem] max-h-0 overflow-hidden opacity-0 group-hover:max-h-[120px] group-hover:opacity-100 group-hover:mb-1 transition-[max-height,opacity,margin] duration-[400ms,350ms,300ms] ease-in-out",
          ].join(" ")}
        >
          {category.description}
        </p>

        {/* Stats row */}
        <div
          className="flex items-center gap-5 mt-[18px] pt-4
            border-t border-(--border)"
        >
          <StatItem
            value={category.webinars}
            label="Webinars"
            featured={isFeatured}
          />
          <StatItem
            value={category.speakers}
            label="Speakers"
            featured={isFeatured}
          />
          <StatItem
            value={category.hours}
            label="Content"
            suffix="h"
            featured={isFeatured}
          />
        </div>

        {/* Explore arrow CTA */}
        <div
          className={[
            "inline-flex items-center gap-2 mt-5",
            "text-[0.68rem] tracking-[0.18em] uppercase text-(--gold)",
            isFeatured
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-[10px] group-hover:opacity-100 group-hover:translate-x-0",
            "transition-[opacity,transform] duration-300 delay-[50ms]",
          ].join(" ")}
        >
          Explore Sessions
          <span className="inline-block transition-transform duration-[250ms] group-hover:translate-x-[5px]">
            →
          </span>
        </div>
      </div>
    </article>
  );
}

// ─── StatItem sub-component ────────────────────────────────────────────────────

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  featured?: boolean;
}

function StatItem({ value, label, suffix = "", featured = false }: StatItemProps) {
  return (
    <div className="flex flex-col gap-[3px]">
      <span
        className={[
          "font-['Bebas_Neue',sans-serif] leading-none tracking-[0.05em] text-(--gold-light)",
          featured ? "text-[1.8rem]" : "text-[1.4rem]",
        ].join(" ")}
      >
        <AnimatedCounter value={value} suffix={suffix} />
      </span>
      <span className="text-[0.6rem] tracking-[0.18em] uppercase text-(--ivory-muted)">
        {label}
      </span>
    </div>
  );
}
