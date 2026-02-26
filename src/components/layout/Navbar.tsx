// components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Menu, X, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[]; // dropdown support
}

export interface NavbarProps {
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  location?: string;
  logoMark?: string;
  logoName?: string;
  transparent?: boolean; // start transparent, fill on scroll
}

// ─── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  // { label: 'Categories', href: '/categories' },
  // { label: 'Speakers', href: '/speakers' },
  { label: 'Webinars', href: '/webinars' },
  // { label: 'About', href: '/about' },
];

// ─── Motion variants ──────────────────────────────────────────────────────────
const navVariants: Variants = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.28, ease: [0.42, 0, 1, 1] }, // easeIn
  },
};

const mobileLinkVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.3, ease: [0, 0, 0.58, 1] }, // easeOut
  }),
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: [0, 0, 0.58, 1] }, // easeOut
  },
  exit: { opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.16 } },
};

// ─── Underline indicator ──────────────────────────────────────────────────────
function NavUnderline() {
  return (
    <motion.span
      layoutId='nav-underline'
      className='absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent'
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    />
  );
}

// ─── Single nav link ──────────────────────────────────────────────────────────
function NavItem({ link, pathname }: { link: NavLink; pathname: string }) {
  const [open, setOpen] = useState(false);
  const isActive =
    pathname === link.href || pathname.startsWith(link.href + '/');

  if (link.children?.length) {
    return (
      <div
        className='relative'
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className={cn(
            'relative flex items-center gap-1 text-[0.73rem] tracking-[0.14em] uppercase',
            'transition-colors duration-200 focus:outline-none',
            isActive
              ? 'text-[#e8c97e]'
              : 'text-[rgba(240,237,230,0.55)] hover:text-[#e8c97e]',
          )}
        >
          {link.label}
          <ChevronDown
            size={12}
            className={cn(
              'transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
          {isActive && <NavUnderline />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              variants={dropdownVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className={cn(
                'absolute top-full left-0 mt-3 min-w-[200px]',
                'bg-[#0d1118] border border-[rgba(201,168,76,0.16)]',
                'py-2 z-50',
              )}
              style={{
                clipPath:
                  'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}
            >
              {link.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className='block px-4 py-2.5 text-[0.68rem] tracking-[0.1em] uppercase text-[rgba(240,237,230,0.5)] hover:text-[#e8c97e] hover:bg-[rgba(201,168,76,0.06)] transition-all duration-150'
                >
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={link.href}
      className={cn(
        'relative text-[0.73rem] tracking-[0.14em] uppercase',
        'transition-colors duration-200',
        isActive
          ? 'text-[#e8c97e]'
          : 'text-[rgba(240,237,230,0.55)] hover:text-[#e8c97e]',
      )}
    >
      {link.label}
      {isActive && <NavUnderline />}
    </Link>
  );
}

// ─── Location badge ───────────────────────────────────────────────────────────
function LocationBadge({ location }: { location: string }) {
  return (
    <div className='hidden lg:flex items-center gap-2 px-3 py-1.5 border border-[rgba(201,168,76,0.16)] text-[rgba(240,237,230,0.4)] text-[0.6rem] tracking-[0.16em] uppercase'>
      <span className='relative flex h-[5px] w-[5px]'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a84c] opacity-60' />
        <span className='relative inline-flex rounded-full h-[5px] w-[5px] bg-[#c9a84c]' />
      </span>
      <MapPin size={9} className='text-[#c9a84c]' />
      {location}
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export function Navbar({
  links = DEFAULT_LINKS,
  ctaLabel = 'Register Free',
  ctaHref = '/register',
  location = 'Rivers State, Nigeria',
  logoMark = 'IEGS',
  logoName = 'Indepth Earth Geospatial Services',
  transparent = false,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for background fill
  useEffect(() => {
    if (!transparent) return;
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [transparent]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const showBg = !transparent || scrolled;

  return (
    <motion.header
      variants={navVariants}
      initial='hidden'
      animate='visible'
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-500',
        showBg
          ? 'bg-[rgba(8,10,15,0.92)] backdrop-blur-md border-b border-[rgba(201,168,76,0.14)]'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className='flex items-center justify-between px-6 lg:px-[60px] h-[72px]'>
        {/* ── Logo ── */}
        <Link href='/' className='flex flex-col gap-0.5 shrink-0'>
          <span
            className='text-[1.45rem] leading-none tracking-[0.2em] text-[#e8c97e]'
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {logoMark}
          </span>
          <span className='hidden sm:block text-[0.55rem] tracking-[0.26em] uppercase text-[rgba(240,237,230,0.3)] font-light'>
            {logoName}
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className='hidden lg:flex items-center gap-9'>
          {links.map((link) => (
            <NavItem key={link.href} link={link} pathname={pathname} />
          ))}
        </nav>

        {/* ── Right side ── */}
        <div className='flex items-center gap-3'>
          <LocationBadge location={location} />

          <Button
            variant='primary'
            size='sm'
            className='hidden sm:inline-flex'
            onClick={() => {
              window.location.href = ctaHref;
            }}
          >
            {ctaLabel}
          </Button>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen((v) => !v)}
            className='lg:hidden flex items-center justify-center w-9 h-9 border border-[rgba(201,168,76,0.16)] text-[rgba(240,237,230,0.55)] hover:text-[#e8c97e] hover:border-[rgba(201,168,76,0.35)] transition-colors'
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
            }}
          >
            <AnimatePresence mode='wait' initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            variants={mobileMenuVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='lg:hidden overflow-hidden bg-[rgba(8,10,15,0.97)] border-t border-[rgba(201,168,76,0.14)]'
          >
            <div className='px-6 py-6 flex flex-col gap-1'>
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={mobileLinkVariants}
                  initial='hidden'
                  animate='visible'
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center py-3 px-4 text-[0.75rem] tracking-[0.16em] uppercase',
                      'border-b border-[rgba(201,168,76,0.08)]',
                      'transition-all duration-200',
                      pathname === link.href
                        ? 'text-[#e8c97e] border-l-2 border-l-[#c9a84c] pl-5'
                        : 'text-[rgba(240,237,230,0.5)] hover:text-[#e8c97e] hover:pl-6',
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                custom={links.length}
                variants={mobileLinkVariants}
                initial='hidden'
                animate='visible'
                className='pt-4'
              >
                <Button
                  variant='primary'
                  size='md'
                  fullWidth
                  onClick={() => {
                    window.location.href = ctaHref;
                  }}
                >
                  {ctaLabel}
                </Button>
              </motion.div>

              <div className='flex items-center gap-2 pt-4 text-[0.58rem] tracking-[0.14em] uppercase text-[rgba(240,237,230,0.3)]'>
                <MapPin size={9} className='text-[#c9a84c]' />
                {location}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
