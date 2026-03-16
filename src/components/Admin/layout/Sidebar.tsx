'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Video,
  Users,
  BookOpen,
  BarChart2,
  Settings,
  LogOut,
  Globe,
  ChevronDown,
  ChevronRight,
  Tag,
  CalendarClock,
  Star,
  FileText,
  Bell,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────
interface NavChild {
  label: string;
  href: string;
  badge?: string | number;
}

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeVariant?: 'gold' | 'teal' | 'red';
  children?: NavChild[];
}

interface NavGroup {
  heading: string;
  items: NavItem[];
}

// ─── Navigation config ────────────────────────────────────────────────────
// Mirrors the public landing page sections + backend admin surfaces
const NAV: NavGroup[] = [
  {
    heading: 'Overview',
    items: [
      {
        label: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
      },
      {
        label: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart2,
      },
      {
        label: 'Notifications',
        href: '/admin/notifications',
        icon: Bell,
        badge: 3,
        badgeVariant: 'red',
      },
    ],
  },
  {
    heading: 'Platform Content',
    items: [
      {
        label: 'Webinars',
        icon: Video,
        badge: 'Live',
        badgeVariant: 'teal',
        children: [
          { label: 'All Webinars', href: '/admin/webinars' },
          { label: 'Schedule New', href: '/admin/webinars/new' },
          { label: 'Live Sessions', href: '/admin/webinars/live' },
          { label: 'Recordings', href: '/admin/webinars/recordings' },
          { label: 'Drafts', href: '/admin/webinars/drafts' },
        ],
      },
      {
        label: 'Speakers',
        icon: Star,
        children: [
          { label: 'All Speakers', href: '/admin/speakers' },
          { label: 'Add Speaker', href: '/admin/speakers/new' },
          { label: 'Profiles', href: '/admin/speakers/profiles' },
        ],
      },
      {
        label: 'Categories',
        icon: Tag,
        children: [
          { label: 'All Categories', href: '/admin/categories' },
          { label: 'Manage Domains', href: '/admin/categories/domains' },
        ],
      },
      {
        label: 'How It Works',
        href: '/admin/how-it-works',
        icon: Layers,
      },
    ],
  },
  {
    heading: 'Audience',
    items: [
      {
        label: 'Registrations',
        icon: CalendarClock,
        children: [
          { label: 'All Registrations', href: '/admin/registrations' },
          { label: 'Upcoming', href: '/admin/registrations/upcoming' },
          { label: 'Export Data', href: '/admin/registrations/export' },
        ],
      },
      {
        label: 'Attendees',
        icon: Users,
        children: [
          { label: 'All Attendees', href: '/admin/attendees' },
          { label: 'By Webinar', href: '/admin/attendees/by-webinar' },
          { label: 'By Country', href: '/admin/attendees/by-country' },
        ],
      },
      {
        label: 'Newsletter',
        href: '/admin/newsletter',
        icon: FileText,
      },
    ],
  },
  {
    heading: 'Configuration',
    items: [
      {
        label: 'About Page',
        href: '/admin/about',
        icon: BookOpen,
      },
      {
        label: 'Platform Settings',
        icon: Settings,
        children: [
          { label: 'General', href: '/admin/settings' },
          { label: 'Branding', href: '/admin/settings/branding' },
          { label: 'Integrations', href: '/admin/settings/integrations' },
          { label: 'Admin Users', href: '/admin/settings/users' },
        ],
      },
      {
        label: 'Security',
        href: '/admin/security',
        icon: ShieldCheck,
      },
    ],
  },
];

// ─── Nav child item ────────────────────────────────────────────────────────
function ChildItem({ child, collapsed }: { child: NavChild; collapsed: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === child.href;

  if (collapsed) return null;

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.18 }}
    >
      <Link
        href={child.href}
        className={cn(
          'flex items-center gap-2.5 pl-10 pr-3 py-2 rounded-none',
          'text-[0.68rem] tracking-[0.05em] uppercase',
          'transition-colors duration-150 relative group',
          isActive
            ? 'text-(--gold)'
            : 'text-(--ivory-muted) hover:text-(--ivory-dim)',
        )}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* Active pip */}
        {isActive && (
          <span
            className='absolute left-6 top-1/2 -translate-y-1/2 w-1 h-1 rotate-45'
            style={{ background: 'var(--gold)' }}
          />
        )}
        <span
          className={cn(
            'w-px h-3 shrink-0 transition-colors duration-150',
            isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-60',
          )}
          style={{ background: isActive ? 'var(--gold)' : 'var(--border-hi)' }}
        />
        {child.label}
        {child.badge !== undefined && (
          <span
            className='ml-auto text-[0.56rem] px-1.5 py-px'
            style={{
              background: 'rgba(50,97,149,0.18)',
              color: 'var(--gold-light)',
              clipPath:
                'polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))',
            }}
          >
            {child.badge}
          </span>
        )}
      </Link>
    </motion.li>
  );
}

// ─── Nav item ──────────────────────────────────────────────────────────────
function NavItemRow({
  item,
  sidebarCollapsed,
}: {
  item: NavItem;
  sidebarCollapsed: boolean;
}) {
  const pathname = usePathname();
  const hasChildren = !!item.children?.length;

  // Auto-expand if a child is active
  const childIsActive = item.children?.some((c) => pathname === c.href) ?? false;
  const [open, setOpen] = useState(childIsActive);

  const isActive = item.href ? pathname === item.href : childIsActive;

  const badgeColors: Record<string, string> = {
    gold: 'bg-[rgba(201,168,76,0.15)] text-[#e8c97e]',
    teal: 'bg-[rgba(0,128,101,0.15)] text-[#6fa088]',
    red: 'bg-[rgba(239,68,68,0.15)] text-red-400',
  };

  const inner = (
    <span className='flex items-center gap-3 w-full min-w-0'>
      {/* Icon */}
      <span
        className={cn(
          'shrink-0 w-8 h-8 flex items-center justify-center transition-all duration-200',
          isActive
            ? 'text-(--gold)'
            : 'text-(--ivory-muted) group-hover:text-(--ivory-dim)',
        )}
        style={
          isActive
            ? {
                background: 'rgba(50,97,149,0.12)',
                clipPath:
                  'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
              }
            : {}
        }
      >
        <item.icon size={15} />
      </span>

      {/* Label + badge — hidden when sidebar collapsed */}
      {!sidebarCollapsed && (
        <>
          <span
            className={cn(
              'flex-1 min-w-0 truncate text-[0.72rem] tracking-[0.06em] uppercase transition-colors duration-150',
              isActive
                ? 'text-(--ivory)'
                : 'text-(--ivory-dim) group-hover:text-(--ivory)',
            )}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {item.label}
          </span>

          {/* Badge */}
          {item.badge !== undefined && (
            <span
              className={cn(
                'shrink-0 text-[0.58rem] px-1.5 py-px font-medium',
                badgeColors[item.badgeVariant ?? 'gold'],
              )}
              style={{
                clipPath:
                  'polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))',
                fontFamily: 'var(--font-body)',
              }}
            >
              {item.badge}
            </span>
          )}

          {/* Expand chevron */}
          {hasChildren && (
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'shrink-0 transition-colors duration-150',
                isActive ? 'text-(--gold)' : 'text-(--ivory-muted)',
              )}
            >
              <ChevronDown size={12} />
            </motion.span>
          )}

          {/* Arrow for leaf links */}
          {!hasChildren && isActive && (
            <ChevronRight
              size={11}
              className='shrink-0'
              style={{ color: 'var(--gold)' }}
            />
          )}
        </>
      )}
    </span>
  );

  return (
    <li>
      {/* Row — link or button */}
      {hasChildren ? (
        <button
          type='button'
          onClick={() => !sidebarCollapsed && setOpen((v) => !v)}
          className={cn(
            'w-full flex items-center px-2 py-1 group',
            'transition-colors duration-150 relative',
            isActive
              ? 'before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-(--gold)'
              : '',
          )}
        >
          {inner}
        </button>
      ) : (
        <Link
          href={item.href!}
          className={cn(
            'flex items-center px-2 py-1 group',
            'transition-colors duration-150 relative',
            isActive
              ? 'before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-(--gold)'
              : '',
          )}
        >
          {inner}
        </Link>
      )}

      {/* Children */}
      {hasChildren && !sidebarCollapsed && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              key='children'
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className='overflow-hidden'
            >
              {item.children!.map((child) => (
                <ChildItem
                  key={child.href}
                  child={child}
                  collapsed={sidebarCollapsed}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </li>
  );
}

// ─── Sidebar component ─────────────────────────────────────────────────────
export interface SidebarProps {
  onSignOut?: () => void;
}

export default function Sidebar({ onSignOut }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className='relative flex flex-col h-screen shrink-0 overflow-hidden'
      style={{
        background: 'var(--obsidian-2)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* ── Top gradient accent */}
      <div
        className='absolute top-0 left-0 right-0 h-40 pointer-events-none z-0'
        style={{
          background:
            'linear-gradient(180deg, rgba(24,61,110,0.18) 0%, transparent 100%)',
        }}
      />

      {/* ── Logo bar */}
      <div
        className='relative z-10 flex items-center gap-3 px-4 h-16 shrink-0'
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div
          className='w-8 h-8 flex items-center justify-center shrink-0'
          style={{
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            clipPath:
              'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
          }}
        >
          <Globe size={15} style={{ color: 'var(--obsidian)' }} />
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className='overflow-hidden'
            >
              <p
                className='text-[0.65rem] tracking-[0.28em] uppercase leading-none'
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-bebas)' }}
              >
                IEGS
              </p>
              <p
                className='text-[0.54rem] tracking-[0.1em] uppercase mt-0.5 whitespace-nowrap'
                style={{
                  color: 'var(--ivory-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Admin Portal
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse toggle */}
        <button
          type='button'
          onClick={() => setCollapsed((v) => !v)}
          className={cn(
            'ml-auto shrink-0 w-7 h-7 flex items-center justify-center',
            'transition-colors duration-150',
            'hover:text-(--ivory)',
          )}
          style={{ color: 'var(--ivory-muted)' }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <PanelLeftOpen size={14} />
          ) : (
            <PanelLeftClose size={14} />
          )}
        </button>
      </div>

      {/* ── Nav groups — scrollable */}
      <nav className='relative z-10 flex-1 overflow-y-auto overflow-x-hidden py-4 px-2'>
        {NAV.map((group) => (
          <div key={group.heading} className='mb-5'>
            {/* Group heading */}
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className='px-2 mb-1.5 text-[0.56rem] tracking-[0.28em] uppercase'
                  style={{
                    color: 'var(--ivory-muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {group.heading}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Divider when collapsed */}
            {collapsed && (
              <div
                className='mx-2 mb-2 h-px'
                style={{ background: 'var(--border)' }}
              />
            )}

            <ul className='space-y-0.5'>
              {group.items.map((item) => (
                <NavItemRow
                  key={item.label}
                  item={item}
                  sidebarCollapsed={collapsed}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Bottom: Sign out */}
      <div
        className='relative z-10 px-2 py-3 shrink-0'
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <button
          type='button'
          onClick={onSignOut}
          className={cn(
            'w-full flex items-center gap-3 px-2 py-2 group',
            'transition-colors duration-150',
          )}
        >
          <span
            className={cn(
              'shrink-0 w-8 h-8 flex items-center justify-center',
              'text-(--ivory-muted) group-hover:text-red-400 transition-colors duration-150',
            )}
          >
            <LogOut size={15} />
          </span>

          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.18 }}
                className='text-[0.7rem] tracking-[0.08em] uppercase text-(--ivory-muted) group-hover:text-red-400 transition-colors duration-150 whitespace-nowrap'
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
