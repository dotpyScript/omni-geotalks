// components/ui/Tabs.tsx
'use client';

import { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export type TabVariant =
  | 'pills' // filter pills — WebinarDiscovery category bar
  | 'underline' // sliding gold underline — Admin dashboard nav
  | 'boxed' // dark bordered boxes — Webinar detail / Settings
  | 'segmented'; // sliding bg highlight — mobile full-width

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  /** notification count or short tag shown as a small badge */
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  /** controlled mode: pass activeTab + onChange */
  activeTab?: string;
  /** uncontrolled mode: initial tab id */
  defaultTab?: string;
  variant?: TabVariant;
  onChange?: (id: string) => void;
  className?: string;
  /** underline variant: which edge the indicator sits on */
  indicatorSide?: 'top' | 'bottom';
  /** segmented / boxed: stretch to fill container width */
  fullWidth?: boolean;
}

// ─── Shared small badge ───────────────────────────────────────────────────────
function TabBadge({
  value,
  active,
}: {
  value: string | number;
  active: boolean;
}) {
  return (
    <span
      className={cn(
        'text-[0.55rem] px-1.5 py-px min-w-[18px] text-center leading-tight rounded-sm',
        active
          ? 'bg-[rgba(201,168,76,0.25)] text-[#e8c97e]'
          : 'bg-[rgba(240,237,230,0.07)] text-[rgba(240,237,230,0.3)]',
      )}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {value}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT: PILLS
// The exact .filter-pill pattern from WebinarDiscovery.
// Clip-path polygon, 0.7rem uppercase 0.12em, active dot, active gold gradient.
// ═══════════════════════════════════════════════════════════════════════════════
function PillTabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.id}
            type='button'
            whileHover={tab.disabled ? {} : { scale: 1.02 }}
            whileTap={tab.disabled ? {} : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              fontFamily: "'DM Sans', sans-serif",
            }}
            className={cn(
              'inline-flex items-center gap-[7px] shrink-0 select-none',
              'text-[0.7rem] tracking-[0.12em] uppercase whitespace-nowrap',
              'px-[18px] py-[10px] border cursor-pointer',
              'transition-all duration-[220ms] ease-out',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              isActive
                ? [
                    'border-[#c9a84c]',
                    'bg-gradient-to-br from-[rgba(201,168,76,0.18)] to-[rgba(201,168,76,0.08)]',
                    'text-[#e8c97e] shadow-[0_0_18px_rgba(201,168,76,0.12)]',
                  ]
                : [
                    'border-[rgba(201,168,76,0.14)] bg-transparent',
                    'text-[rgba(240,237,230,0.55)]',
                    'hover:border-[rgba(201,168,76,0.3)]',
                    'hover:text-[#f0ede6] hover:bg-[rgba(201,168,76,0.12)]',
                  ],
            )}
          >
            {isActive && (
              <span className='w-[5px] h-[5px] rounded-full bg-current opacity-60 shrink-0' />
            )}
            {Icon && <Icon size={12} className='shrink-0' />}
            {tab.label}
            {tab.badge !== undefined && (
              <TabBadge value={tab.badge} active={isActive} />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT: UNDERLINE
// Used in Admin dashboard navigation, Webinar detail sub-tabs.
// Framer Motion layoutId sliding gold underline line (2px gradient).
// ═══════════════════════════════════════════════════════════════════════════════

function UnderlineTabs({
  tabs,
  active,
  onChange,
  indicatorSide = 'bottom',
  fullWidth,
  className,
}: {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  indicatorSide?: 'top' | 'bottom';
  fullWidth?: boolean;
  className?: string;
}) {
  const uid = useId(); // unique layoutId per Tabs instance to avoid cross-component conflicts

  return (
    <div
      role='tablist'
      className={cn(
        'relative flex',
        indicatorSide === 'bottom'
          ? 'border-b border-[rgba(201,168,76,0.14)]'
          : 'border-t border-[rgba(201,168,76,0.14)]',
        fullWidth && 'w-full',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type='button'
            role='tab'
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className={cn(
              'relative flex items-center gap-2',
              'text-[0.72rem] tracking-[0.14em] uppercase whitespace-nowrap',
              'px-5 py-3.5 border-none bg-transparent cursor-pointer',
              'transition-colors duration-200',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              fullWidth && 'flex-1 justify-center',
              isActive
                ? 'text-[#e8c97e]'
                : 'text-[rgba(240,237,230,0.4)] hover:text-[rgba(240,237,230,0.7)]',
            )}
          >
            {Icon && <Icon size={13} className='shrink-0' />}
            {tab.label}
            {tab.badge !== undefined && (
              <TabBadge value={tab.badge} active={isActive} />
            )}

            {/* Sliding indicator */}
            {isActive && (
              <motion.span
                layoutId={`tab-underline-${uid}`}
                className={cn(
                  'absolute left-0 right-0 h-[2px]',
                  'bg-gradient-to-r from-[#c9a84c] to-[#e8c97e]',
                  indicatorSide === 'bottom' ? '-bottom-px' : '-top-px',
                )}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT: BOXED
// Dark bordered box tabs — Webinar detail page (Overview / Speakers / Resources),
// Admin settings panels. Active tab gets border + inner bg + gold text.
// ═══════════════════════════════════════════════════════════════════════════════

function BoxedTabs({
  tabs,
  active,
  onChange,
  fullWidth,
  className,
}: {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <div
      role='tablist'
      className={cn(
        'flex p-1 gap-1',
        'bg-[#0d1118] border border-[rgba(201,168,76,0.14)]',
        fullWidth && 'w-full',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.id}
            type='button'
            role='tab'
            aria-selected={isActive}
            disabled={tab.disabled}
            whileTap={tab.disabled ? {} : { scale: 0.97 }}
            onClick={() => !tab.disabled && onChange(tab.id)}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className={cn(
              'relative flex items-center justify-center gap-2',
              'text-[0.68rem] tracking-[0.14em] uppercase whitespace-nowrap',
              'px-5 py-2.5 cursor-pointer',
              'transition-all duration-200',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              fullWidth && 'flex-1',
              isActive
                ? [
                    'bg-gradient-to-br from-[#12161f] to-[#181d28]',
                    'border border-[rgba(201,168,76,0.25)]',
                    'text-[#e8c97e]',
                    'shadow-[0_2px_12px_rgba(201,168,76,0.1)]',
                  ]
                : [
                    'bg-transparent border border-transparent',
                    'text-[rgba(240,237,230,0.4)]',
                    'hover:text-[rgba(240,237,230,0.65)]',
                    'hover:bg-[rgba(255,255,255,0.02)]',
                  ],
            )}
          >
            {Icon && <Icon size={13} className='shrink-0' />}
            {tab.label}
            {tab.badge !== undefined && (
              <TabBadge value={tab.badge} active={isActive} />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT: SEGMENTED
// Full-width equal-column tabs with a Framer Motion sliding background chip.
// Used in mobile views and compact filter bars.
// ═══════════════════════════════════════════════════════════════════════════════
function SegmentedTabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chip, setChip] = useState({ left: 0, width: 0 });
  const uid = useId();

  // Recalculate sliding chip position on active change or resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const idx = tabs.findIndex((t) => t.id === active);
    if (idx < 0) return;
    const total = el.offsetWidth;
    const w = total / tabs.length;
    setChip({ left: idx * w, width: w });
  }, [active, tabs]);

  return (
    <div
      ref={containerRef}
      role='tablist'
      className={cn(
        'relative flex w-full',
        'bg-[#0d1118] border border-[rgba(201,168,76,0.14)]',
        className,
      )}
    >
      {/* Sliding background chip */}
      <motion.div
        className='absolute top-0 bottom-0 z-0 bg-gradient-to-br from-[rgba(201,168,76,0.12)] to-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.22)]'
        animate={{ left: chip.left, width: chip.width }}
        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        aria-hidden
      />

      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type='button'
            role='tab'
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className={cn(
              'relative z-10 flex-1 flex items-center justify-center gap-2',
              'text-[0.68rem] tracking-[0.14em] uppercase whitespace-nowrap',
              'py-3 px-4 cursor-pointer',
              'transition-colors duration-200',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              isActive
                ? 'text-[#e8c97e]'
                : 'text-[rgba(240,237,230,0.4)] hover:text-[rgba(240,237,230,0.65)]',
            )}
          >
            {Icon && <Icon size={13} className='shrink-0' />}
            {tab.label}
            {tab.badge !== undefined && (
              <TabBadge value={tab.badge} active={isActive} />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB PANEL — animated content region
// ═══════════════════════════════════════════════════════════════════════════════
export interface TabPanelProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
  className?: string;
  /** if true, renders hidden instead of unmounting (preserves scroll position / state) */
  keepMounted?: boolean;
}

export function TabPanel({
  id,
  activeTab,
  children,
  className,
  keepMounted = false,
}: TabPanelProps) {
  const isActive = id === activeTab;

  if (keepMounted) {
    return (
      <div
        role='tabpanel'
        hidden={!isActive}
        className={cn(!isActive && 'hidden', className)}
      >
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence mode='wait'>
      {isActive && (
        <motion.div
          key={id}
          role='tabpanel'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN TABS DISPATCHER
// ═══════════════════════════════════════════════════════════════════════════════
export function Tabs({
  tabs,
  activeTab,
  defaultTab,
  variant = 'underline',
  onChange,
  className,
  indicatorSide = 'bottom',
  fullWidth = false,
}: TabsProps) {
  const [internal, setInternal] = useState<string>(
    activeTab ?? defaultTab ?? tabs[0]?.id ?? '',
  );

  // Support both controlled and uncontrolled
  const active = activeTab ?? internal;

  const handle = (id: string) => {
    setInternal(id);
    onChange?.(id);
  };

  const shared = { tabs, active, onChange: handle, fullWidth, className };

  switch (variant) {
    case 'pills':
      return <PillTabs {...shared} />;
    case 'underline':
      return <UnderlineTabs {...shared} indicatorSide={indicatorSide} />;
    case 'boxed':
      return <BoxedTabs {...shared} />;
    case 'segmented':
      return <SegmentedTabs {...shared} />;
  }
}
