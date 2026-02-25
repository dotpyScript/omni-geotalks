# IEGS Component Library — Setup Guide

## Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
- **Framer Motion**
- **Lucide React**

---

## 1. Install dependencies

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 2. Folder structure

```
├── app/
│   ├── globals.css           ← Copy globals.css here
│   ├── layout.tsx            ← Add font setup here
│   └── page.tsx              ← Assemble sections here
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx        ✅
│   ├── ui/
│   │   ├── Button.tsx        ✅
│   │   ├── Card.tsx          ✅
│   │   ├── StatCounter.tsx   ✅
│   │   ├── Countdown.tsx     ✅
│   │   ├── Marquee.tsx       ✅
│   │   └── index.ts          ✅ (barrel export)
│   └── sections/
│       └── HeroSection.tsx   ✅
│
├── lib/
│   └── utils.ts              ✅ (cn + shared tokens)
│
└── tailwind.config.ts        ✅
```

---

## 3. layout.tsx — font setup

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, Bebas_Neue } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'IEGS — Indepth Earth Geospatial Services',
  description: 'Free expert-led geospatial webinars across Africa and beyond.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${cormorant.variable} ${dmSans.variable} ${bebasNeue.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

Then update `tailwind.config.ts` font references to use CSS variables:

```ts
fontFamily: {
  cormorant: ["var(--font-cormorant)", "serif"],
  bebas:     ["var(--font-bebas)",     "sans-serif"],
  dm:        ["var(--font-dm-sans)",   "sans-serif"],
  sans:      ["var(--font-dm-sans)",   "sans-serif"],
},
```

---

## 4. page.tsx — assemble the landing page

```tsx
// app/page.tsx
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';

export default function HomePage() {
  return (
    <>
      <Navbar transparent />
      <main>
        <HeroSection />
        {/* WebinarDiscovery, CategoriesSection, etc. */}
      </main>
    </>
  );
}
```

---

## 5. Component usage examples

### Button

```tsx
import { Button, IconButton } from "@/components/ui";
import { ArrowRight, Trash2 } from "lucide-react";

// Primary CTA
<Button variant="primary" size="lg" rightIcon={ArrowRight}>
  Register Free
</Button>

// Ghost
<Button variant="ghost" size="md">
  Browse Webinars
</Button>

// Loading state
<Button variant="primary" isLoading loadingText="Submitting...">
  Register
</Button>

// Danger
<Button variant="danger" size="sm" leftIcon={Trash2}>
  Delete
</Button>

// Icon only
<IconButton icon={ArrowRight} label="Next" variant="ghost" />
```

### Card + EventCard

```tsx
import { Card, EventCard, CardStatusBadge } from "@/components/ui";

// Generic card
<Card variant="spotlight" padding="lg" clipped>
  <p>Any content here</p>
</Card>

// Full webinar event card
<EventCard
  status="live"
  category="GIS & Mapping"
  title="Advanced GIS for Urban Planning"
  date="Today · 10:00 AM WAT"
  duration="90 min"
  platform="Zoom"
  speakers={[{ initials: "AK", name: "Dr. A. Kalu" }]}
  registrations={214}
  onAction={() => router.push("/webinars/123")}
/>

// Status badge standalone
<CardStatusBadge status="live" />
<CardStatusBadge status="published" label="Open for Registration" />
```

### StatCounter + StatsGrid

```tsx
import { StatsGrid, HeroStats, StatCounter } from "@/components/ui";

// Single animated counter
<StatCounter value={2800} suffix="+" />

// Hero strip
<HeroStats stats={[
  { value: 2800, suffix: "+", label: "Registered Professionals" },
  { value: 54,               label: "Sessions Delivered"        },
  { value: 38,               label: "Countries Reached"         },
]} />

// Grid layout
<StatsGrid
  stats={[...]}
  variant="large"
  columns={3}
  dividers
/>
```

### Countdown

```tsx
import { Countdown } from "@/components/ui";

// Card style (used in Hero)
<Countdown
  targetDate="2025-05-22T13:00:00Z"
  variant="card"
  label="Next Session Begins In"
  showSeconds
  onExpire={() => console.log("Session started!")}
/>

// Minimal inline style
<Countdown
  targetDate="2025-05-22T13:00:00Z"
  variant="minimal"
  label=""
  showSeconds={false}
/>
```

### Marquee

```tsx
import { Marquee, IEGS_TICKER_ITEMS } from "@/components/ui";

// Pre-configured IEGS ticker
<Marquee
  items={IEGS_TICKER_ITEMS}
  variant="ticker"
  speed={34}
  separator="◆"
  pauseOnHover
/>

// Custom items
<Marquee
  items={[
    { text: "GIS & Mapping" },
    { text: "Register Free", highlight: true },
  ]}
  variant="tags"
  direction="right"
  speed={20}
/>
```

### Navbar

```tsx
import { Navbar } from "@/components/layout/Navbar";

// Default
<Navbar />

// Transparent (fills on scroll)
<Navbar transparent />

// Custom links + CTA
<Navbar
  links={[
    { label: "Webinars",   href: "/webinars" },
    { label: "Recordings", href: "/recordings" },
    {
      label: "Categories", href: "/categories",
      children: [
        { label: "GIS & Mapping",  href: "/categories/gis" },
        { label: "Drone Surveys",  href: "/categories/drones" },
      ],
    },
  ]}
  ctaLabel="Register Free"
  ctaHref="/register"
  location="Rivers State, Nigeria"
/>
```

---

## 6. TypeScript path aliases

Ensure `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 7. Component props summary

| Component     | Key Props                                                                 |
| ------------- | ------------------------------------------------------------------------- |
| `Button`      | `variant`, `size`, `leftIcon`, `rightIcon`, `isLoading`, `clipped`        |
| `IconButton`  | `icon`, `variant`, `size`, `label`                                        |
| `Card`        | `variant`, `hoverable`, `clipped`, `padding`                              |
| `EventCard`   | `status`, `category`, `title`, `date`, `platform`, `speakers`, `onAction` |
| `StatCounter` | `value`, `suffix`, `prefix`, `duration`, `delay`                          |
| `StatsGrid`   | `stats`, `variant`, `columns`, `dividers`, `animated`                     |
| `HeroStats`   | `stats`                                                                   |
| `Countdown`   | `targetDate`, `variant`, `label`, `showSeconds`, `onExpire`               |
| `Marquee`     | `items`, `variant`, `direction`, `speed`, `separator`, `pauseOnHover`     |
| `Navbar`      | `links`, `ctaLabel`, `ctaHref`, `location`, `transparent`                 |
| `HeroSection` | `stats`, `webinars`, `nextWebinarDate`, `countdownLabel`                  |
