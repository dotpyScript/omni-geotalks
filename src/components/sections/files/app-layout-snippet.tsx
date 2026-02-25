// ─── app/layout.tsx — Font setup ──────────────────────────────────────────────
// Add these font imports and apply the CSS variables to <body>.
// Your existing layout.tsx will look similar to this.

import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Bebas_Neue,
  DM_Sans,
} from "next/font/google";
import "./globals.css";

// ── Font definitions ───────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IEGS — Institute for Emerging Geospatial Sciences",
  description: "Webinar platform for geospatial professionals across Africa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        Apply the three font CSS variables to <body>.
        Tailwind will pick them up via:
          font-['Cormorant_Garamond',serif]
          font-['Bebas_Neue',sans-serif]
          font-['DM_Sans',sans-serif]
        — or via the custom fontFamily tokens in tailwind.config.ts
      */}
      <body
        className={`${cormorant.variable} ${bebas.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
