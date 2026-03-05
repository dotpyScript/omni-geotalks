import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Cormorant_Garamond, DM_Sans, Bebas_Neue } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

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

// Runs synchronously before first paint — reads localStorage and sets
// data-theme on <html> so there is never a flash of the wrong theme.
const themeScript = `
  (function () {
    try {
      var t = localStorage.getItem('iegs-theme');
      document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
    } catch (_) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable} ${bebasNeue.variable}`}
    >
      <head>
        {/* Theme script must run before any rendering to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
      <Toaster />
    </html>
  );
}
