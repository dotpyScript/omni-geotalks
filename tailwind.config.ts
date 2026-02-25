import type { Config } from 'tailwindcss';

// ─── Tailwind v4 config ────────────────────────────────────────────────────────
//
// In Tailwind v4 the theme is NO LONGER defined here.
// All design tokens (colors, fonts, keyframes, animations) live in globals.css
// inside the @theme { } block.
//
// This file now only needs:
//   1. content — file paths for class scanning
//   2. plugins — only if you have custom PostCSS plugins
//
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};

export default config;
