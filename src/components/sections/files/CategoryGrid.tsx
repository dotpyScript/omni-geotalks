"use client";

import type { Category } from "./types";
import { CategoryCard } from "./CategoryCard";

// ─── CategoryGrid Props ────────────────────────────────────────────────────────

interface CategoryGridProps {
  /** Full list of categories (featured first) */
  categories: Category[];
  /** Callback when a card is clicked, receives the category id */
  onCardClick?: (id: string) => void;
}

// ─── CategoryGrid ──────────────────────────────────────────────────────────────
// Renders the asymmetric 3-column / 2-row bento-style grid.
//
// Grid layout:
//   [featured — col 1, rows 1-2]  [card 2]  [card 3]
//                                 [card 4]  [card 5]
//
// The featured card spans both rows in column 1.
// On tablet (≤1024 px) it collapses to a 2-col grid, featured spans full width.
// On mobile (≤640 px) it becomes a single column.

export function CategoryGrid({ categories, onCardClick }: CategoryGridProps) {
  // Sort: featured first, rest follow
  const featured = categories.filter((c) => c.featured);
  const rest = categories.filter((c) => !c.featured);
  const ordered = [...featured, ...rest];

  return (
    <div
      className={[
        // ── Desktop: 3-column asymmetric grid ────────────────────────────
        "grid gap-[2px]",
        "grid-cols-[1.6fr_1fr_1fr] grid-rows-[auto_auto]",
        // ── Tablet ────────────────────────────────────────────────────────
        "max-lg:grid-cols-2 max-lg:grid-rows-none",
        // ── Mobile ────────────────────────────────────────────────────────
        "max-sm:grid-cols-1",
      ].join(" ")}
    >
      {ordered.map((cat, i) => (
        <CategoryCard
          key={cat.id}
          category={cat}
          variant={cat.featured ? "featured" : "standard"}
          index={i}
          onClick={onCardClick}
          className={
            cat.featured
              ? // ── Featured: row-span-2 on desktop; full-width on tablet ─
                "max-lg:row-auto max-lg:col-span-2 max-sm:col-span-1"
              : ""
          }
        />
      ))}
    </div>
  );
}
