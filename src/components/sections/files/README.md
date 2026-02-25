# CategoriesSection — Modular Component Guide

> **Stack:** Next.js 14 · TypeScript · Tailwind CSS · Lucide-ready · Framer-motion ready

---

## File Structure

```
components/
└── categories/
    ├── index.ts              ← barrel export (import everything from here)
    ├── types.ts              ← shared TypeScript interfaces
    ├── data.ts               ← CATEGORIES array (edit content here)
    │
    ├── CategoriesSection.tsx ← ✅ TOP-LEVEL — drop this into your page
    │
    ├── SectionHeader.tsx     ← eyebrow + title + subtitle (2-col grid)
    │                            ⚠️  Replace with your own Header.tsx (see below)
    ├── BackgroundDecor.tsx   ← ambient glow blobs + vertical hairlines
    ├── CategoryGrid.tsx      ← asymmetric 3-col bento card grid
    ├── CategoryCard.tsx      ← individual card (featured / standard variants)
    ├── CategoryStrip.tsx     ← bottom 6-col summary strip with toggle
    ├── CardPattern.tsx       ← SVG diagonal-grid pattern per card
    ├── AnimatedCounter.tsx   ← IntersectionObserver count-up animation
    └── CategoryIcons.tsx     ← all 6 SVG icons + CategoryIcon resolver
```

---

## Quick Start

```tsx
// app/page.tsx (or wherever you want the section)
import CategoriesSection from "@/components/categories";

export default function Page() {
  return (
    <main>
      <CategoriesSection
        onCategorySelect={(id) => console.log("Selected:", id)}
      />
    </main>
  );
}
```

---

## Swapping in your Header.tsx

`SectionHeader.tsx` is a **placeholder** that matches your existing `Header.tsx` props.

1. Open `CategoriesSection.tsx`
2. Replace the import:
   ```ts
   // Remove:
   import { SectionHeader } from "./SectionHeader";
   // Add:
   import { Header } from "@/components/Header";  // ← your generated Header
   ```
3. Replace the JSX:
   ```tsx
   // Remove:
   <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
   // Add:
   <Header eyebrow={eyebrow} title={title} subtitle={subtitle} />
   ```

---

## Tailwind Config (required)

Add to `tailwind.config.ts`:

```ts
theme: {
  extend: {
    keyframes: {
      catReveal: {
        from: { opacity: "0", transform: "translateY(28px)" },
        to:   { opacity: "1", transform: "translateY(0)" },
      },
    },
    animation: {
      catReveal: "catReveal 0.6s ease both",
    },
    fontFamily: {
      cormorant: ["var(--font-cormorant)", "serif"],
      bebas:     ["var(--font-bebas)", "sans-serif"],
      dm:        ["var(--font-dm-sans)", "sans-serif"],
    },
  },
},
```

---

## Fonts (app/layout.tsx)

See `app-layout-snippet.tsx` for the full font setup.

```ts
import { Cormorant_Garamond, Bebas_Neue, DM_Sans } from "next/font/google";
```

---

## CategoryCard Variants

| Prop `variant` | Description |
|---|---|
| `"featured"` | Tall card (row-span-2), larger type, always-visible description + arrow CTA |
| `"standard"` | Compact card, description + arrow revealed on hover |

The variant is automatically derived from `category.featured` in `CategoryGrid` — no manual prop needed in most cases.

---

## Props Reference

### `<CategoriesSection />`
| Prop | Type | Default |
|---|---|---|
| `eyebrow` | `string` | `"Knowledge Domains"` |
| `title` | `React.ReactNode` | `Explore by <em>Discipline</em>` |
| `subtitle` | `string` | IEGS description |
| `onCategorySelect` | `(id: string) => void` | — |

### `<CategoryCard />`
| Prop | Type | Required |
|---|---|---|
| `category` | `Category` | ✅ |
| `variant` | `"featured" \| "standard"` | — |
| `index` | `number` | ✅ |
| `onClick` | `(id: string) => void` | — |
| `className` | `string` | — |

### `<CategoryStrip />`
| Prop | Type | Required |
|---|---|---|
| `categories` | `Category[]` | ✅ |
| `activeId` | `string \| null` | ✅ |
| `onToggle` | `(id: string) => void` | ✅ |

---

## Adding Framer Motion

The `animate-[catReveal_...]` reveal animation can be upgraded to Framer Motion:

```tsx
// In CategoryCard.tsx — replace the className animation with:
import { motion } from "framer-motion";

<motion.article
  initial={{ opacity: 0, y: 28 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.07 }}
  whileHover={{ zIndex: 3 }}
  ...
>
```

---

## Editing Category Data

Open `data.ts` to add / remove / edit categories. Each entry follows the `Category` interface in `types.ts`.

The AI & Digital Twin mentions in descriptions can be expanded — each category's `description` field is where to highlight specific AI model types or Digital Twin use-cases relevant to that discipline.
