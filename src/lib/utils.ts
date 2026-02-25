// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely, resolving conflicts.
 * Requires: npm install clsx tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Shared design tokens (mirrors CSS variables as JS constants) ─────────────
export const COLORS = {
  obsidian:    "#080a0f",
  obsidian2:   "#0d1118",
  obsidian3:   "#12161f",
  obsidian4:   "#181d28",
  gold:        "#c9a84c",
  goldLight:   "#e8c97e",
  goldPale:    "#f5e6c0",
  cyan:        "#00d4ff",
  green:       "#00e5a0",
  ivory:       "#f0ede6",
} as const;

export const FONTS = {
  display: "'Cormorant Garamond', serif",
  bebas:   "'Bebas Neue', sans-serif",
  body:    "'DM Sans', sans-serif",
} as const;

// ─── Animation presets ────────────────────────────────────────────────────────
export const SPRING_SMOOTH = { type: "spring", stiffness: 300, damping: 28 } as const;
export const SPRING_SNAPPY = { type: "spring", stiffness: 420, damping: 30 } as const;
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: EASE_OUT_EXPO },
  }),
};

export const fadeLeft = {
  hidden:  { opacity: 0, x: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay, ease: EASE_OUT_EXPO },
  }),
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
