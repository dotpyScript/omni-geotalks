// ─── tailwind.config.ts additions ─────────────────────────────────────────────
// Merge this into your existing tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ── Custom fonts (register via next/font/google in layout.tsx) ─────
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        bebas: ["var(--font-bebas)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },

      // ── Card reveal keyframe ───────────────────────────────────────────
      keyframes: {
        catReveal: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        catReveal: "catReveal 0.6s ease both",
      },

      // ── Custom colors (optional — you can also use arbitrary values) ───
      colors: {
        obsidian: {
          DEFAULT: "#080a0f",
          2: "#0d1118",
          3: "#12161f",
          4: "#181d28",
        },
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e8c97e",
          pale: "#f5e6c0",
        },
        ivory: {
          DEFAULT: "#f0ede6",
        },
        cyan: {
          geo: "#00d4ff",
        },
      },
    },
  },
  plugins: [],
};

export default config;
