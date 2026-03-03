"use client";

import type { Category } from "./types";

// ─── CategoryStrip Props ───────────────────────────────────────────────────────

interface CategoryStripProps {
  /** Full list of categories */
  categories: Category[];
  /** Currently active category id (null = none selected) */
  activeId: string | null;
  /** Callback when a strip item is toggled */
  onToggle: (id: string) => void;
}

// ─── CategoryStrip ─────────────────────────────────────────────────────────────
// The bottom bar showing webinar count + label for each category.
// Each item has a gold underline animation on hover / active.

export function CategoryStrip({
  categories,
  activeId,
  onToggle,
}: CategoryStripProps) {
  return (
    <div
      className={[
        "relative z-[2] mt-[2px]",
        "grid grid-cols-6",
        "border border-(--border) border-t-0",
        // ── Responsive ────────────────────────────────────────────────────
        "max-lg:grid-cols-3",
        "max-sm:grid-cols-2",
      ].join(" ")}
    >
      {categories.map((cat) => {
        const isActive = activeId === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onToggle(cat.id)}
            className={[
              // ── Layout ──────────────────────────────────────────────────
              "group relative flex flex-col items-center justify-center gap-[6px]",
              "px-4 py-[22px] overflow-hidden",
              // ── Right border (except last) ───────────────────────────────
              "border-r border-(--border) last:border-r-0",
              // ── Hover / active fill ──────────────────────────────────────
              "transition-colors duration-[250ms]",
              isActive
                ? "bg-(--gold-dim)"
                : "hover:bg-(--gold-dim)",
            ].join(" ")}
          >
            {/* Gold underline that scales in on hover / active */}
            <span
              aria-hidden="true"
              className={[
                "absolute bottom-0 left-0 right-0 h-[2px] bg-(--gold)",
                "transition-transform duration-300 origin-left",
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
              ].join(" ")}
            />

            {/* Webinar count */}
            <span
              className={[
                "font-['Bebas_Neue',sans-serif] text-[1.1rem] tracking-[0.05em]",
                "transition-colors duration-[250ms]",
                isActive
                  ? "text-(--gold)"
                  : "text-(--ivory-dim) group-hover:text-(--gold)",
              ].join(" ")}
            >
              {cat.webinars}
            </span>

            {/* Category label */}
            <span
              className={[
                "text-[0.6rem] tracking-[0.15em] uppercase text-center leading-tight",
                "transition-colors duration-[250ms]",
                isActive
                  ? "text-(--gold-light)"
                  : "text-(--ivory-muted) group-hover:text-(--gold-light)",
              ].join(" ")}
            >
              {cat.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
