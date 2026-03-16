'use client';

import { motion } from 'framer-motion';
import {
  Video,
  Users,
  CalendarClock,
  Star,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  Radio,
  CheckCircle2,
  Circle,
  MapPin,
  Download,
  RefreshCw,
  Tag,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Animation presets ────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: EASE },
});

// ─── Mock data ─────────────────────────────────────────────────────────────
const STATS = [
  {
    id: 'webinars',
    label: 'Total Webinars',
    value: 54,
    suffix: '',
    trend: +12,
    caption: 'Since launch in 2021',
    icon: Video,
    accent: 'navy',
  },
  {
    id: 'attendees',
    label: 'Total Attendees',
    value: 6200,
    suffix: '+',
    trend: +8.4,
    caption: 'Across 18 African nations',
    icon: Users,
    accent: 'teal',
  },
  {
    id: 'registrations',
    label: 'Registrations',
    value: 318,
    suffix: '',
    trend: +22,
    caption: 'This month',
    icon: CalendarClock,
    accent: 'gold',
  },
  {
    id: 'speakers',
    label: 'Active Speakers',
    value: 34,
    suffix: '',
    trend: -2,
    caption: 'Verified professionals',
    icon: Star,
    accent: 'teal',
  },
] as const;

const UPCOMING_WEBINARS = [
  {
    id: 1,
    title: 'AI-Powered Land Use Mapping with Sentinel-2',
    category: 'Remote Sensing',
    date: 'Mar 18, 2026',
    time: '10:00 AM WAT',
    registrations: 87,
    capacity: 150,
    status: 'upcoming' as const,
    speaker: 'Dr. Emeka Okafor',
  },
  {
    id: 2,
    title: 'Drone Survey Best Practices for Oil & Gas',
    category: 'Drone & UAV',
    date: 'Mar 20, 2026',
    time: '02:00 PM WAT',
    registrations: 143,
    capacity: 150,
    status: 'almost-full' as const,
    speaker: 'Eng. Fatima Al-Rashid',
  },
  {
    id: 3,
    title: 'Digital Twin Infrastructure for Smart Cities',
    category: 'Digital Twin & AI',
    date: 'Mar 25, 2026',
    time: '11:00 AM WAT',
    registrations: 52,
    capacity: 200,
    status: 'upcoming' as const,
    speaker: 'Prof. Kwame Asante',
  },
  {
    id: 4,
    title: 'QGIS Advanced: Cadastral Mapping Pipeline',
    category: 'GIS & Mapping',
    date: 'Apr 02, 2026',
    time: '09:00 AM WAT',
    registrations: 29,
    capacity: 120,
    status: 'upcoming' as const,
    speaker: 'Amara Diallo, MSc',
  },
];

const LIVE_NOW = {
  title: 'Precision Agriculture with NDVI & Drone Data',
  category: 'Precision Agriculture',
  attendees: 112,
  duration: '1h 14m',
  speaker: 'Dr. Ngozi Adeyemi',
};

const RECENT_REGISTRATIONS = [
  { name: 'Chukwuemeka Eze', country: 'Nigeria', webinar: 'Drone Survey Best Practices', time: '4m ago' },
  { name: 'Amina Hassan', country: 'Kenya', webinar: 'AI-Powered Land Use Mapping', time: '11m ago' },
  { name: 'Seun Adebayo', country: 'Ghana', webinar: 'Drone Survey Best Practices', time: '18m ago' },
  { name: 'Fatou Diallo', country: 'Senegal', webinar: 'Digital Twin Infrastructure', time: '34m ago' },
  { name: 'Kofi Mensah', country: 'Ghana', webinar: 'QGIS Advanced', time: '51m ago' },
  { name: 'Zainab Musa', country: 'Nigeria', webinar: 'AI-Powered Land Use Mapping', time: '1h ago' },
];

const TOP_CATEGORIES = [
  { label: 'GIS & Mapping', count: 14, pct: 88 },
  { label: 'Drone & UAV', count: 11, pct: 69 },
  { label: 'Remote Sensing', count: 9, pct: 56 },
  { label: 'Oil & Gas', count: 8, pct: 50 },
  { label: 'Digital Twin', count: 6, pct: 38 },
  { label: 'Precision Agri', count: 6, pct: 38 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────
function statusConfig(status: 'upcoming' | 'almost-full' | 'live') {
  return {
    upcoming: {
      dot: 'bg-[rgba(50,97,149,0.6)]',
      label: 'Upcoming',
      text: 'text-[#7d9bc0]',
      bg: 'bg-[rgba(24,61,110,0.12)]',
    },
    'almost-full': {
      dot: 'bg-amber-400',
      label: 'Almost Full',
      text: 'text-amber-400',
      bg: 'bg-amber-400/10',
    },
    live: {
      dot: 'bg-[#6fa088] animate-pulse',
      label: 'Live',
      text: 'text-[#6fa088]',
      bg: 'bg-[rgba(13,108,74,0.12)]',
    },
  }[status];
}

function accentStyle(accent: string) {
  if (accent === 'navy')
    return {
      icon: 'rgba(24,61,110,0.18)',
      color: '#7d9bc0',
      glow: 'rgba(24,61,110,0.25)',
    };
  if (accent === 'teal')
    return {
      icon: 'rgba(13,108,74,0.15)',
      color: '#6fa088',
      glow: 'rgba(13,108,74,0.2)',
    };
  return {
    icon: 'rgba(50,97,149,0.15)',
    color: 'var(--gold)',
    glow: 'rgba(50,97,149,0.22)',
  };
}

// ─── Stat card ─────────────────────────────────────────────────────────────
function StatCard({
  stat,
  delay,
}: {
  stat: (typeof STATS)[number];
  delay: number;
}) {
  const a = accentStyle(stat.accent);
  const positive = stat.trend >= 0;

  return (
    <motion.div {...fadeUp(delay)} className='relative p-5 overflow-hidden'
      style={{
        background: 'linear-gradient(145deg, var(--obsidian-3) 0%, var(--obsidian-2) 100%)',
        border: '1px solid var(--border)',
        clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
      }}
    >
      {/* Glow */}
      <div
        className='absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none blur-2xl'
        style={{ background: a.glow }}
      />

      {/* Icon */}
      <div
        className='inline-flex items-center justify-center w-9 h-9 mb-4'
        style={{
          background: a.icon,
          clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
        }}
      >
        <stat.icon size={16} style={{ color: a.color }} />
      </div>

      {/* Value */}
      <p
        className='text-[2rem] font-light leading-none mb-1'
        style={{ fontFamily: 'var(--font-display)', color: 'var(--ivory)' }}
      >
        {stat.value.toLocaleString()}
        <span className='text-[1.2rem]' style={{ color: a.color }}>
          {stat.suffix}
        </span>
      </p>

      {/* Label */}
      <p
        className='text-[0.62rem] tracking-[0.18em] uppercase mb-2'
        style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
      >
        {stat.label}
      </p>

      {/* Trend */}
      <div className='flex items-center gap-1.5'>
        {positive ? (
          <TrendingUp size={11} className='text-[#6fa088]' />
        ) : (
          <TrendingDown size={11} className='text-red-400' />
        )}
        <span
          className={cn('text-[0.6rem] font-medium', positive ? 'text-[#6fa088]' : 'text-red-400')}
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {positive ? '+' : ''}{stat.trend}%
        </span>
        <span
          className='text-[0.58rem]'
          style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
        >
          {stat.caption}
        </span>
      </div>

      {/* Corner accent */}
      <div
        className='absolute bottom-0 left-0 w-8 h-px'
        style={{ background: `linear-gradient(90deg, ${a.color} 0%, transparent 100%)` }}
      />
    </motion.div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────
function SectionHeader({
  label,
  action,
  onAction,
}: {
  label: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className='flex items-center justify-between mb-4'>
      <div className='flex items-center gap-3'>
        <div
          className='w-px h-4'
          style={{ background: 'linear-gradient(180deg, var(--gold) 0%, transparent 100%)' }}
        />
        <p
          className='text-[0.6rem] tracking-[0.22em] uppercase'
          style={{ color: 'var(--ivory-dim)', fontFamily: 'var(--font-body)' }}
        >
          {label}
        </p>
      </div>
      {action && (
        <button
          type='button'
          onClick={onAction}
          className='flex items-center gap-1.5 text-[0.6rem] tracking-[0.1em] uppercase transition-colors duration-150'
          style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}
        >
          {action}
          <ArrowRight size={10} />
        </button>
      )}
    </div>
  );
}

// ─── Live now banner ───────────────────────────────────────────────────────
function LiveBanner() {
  return (
    <motion.div
      {...fadeUp(0.05)}
      className='relative px-5 py-4 overflow-hidden'
      style={{
        background: 'linear-gradient(135deg, rgba(13,108,74,0.15) 0%, rgba(13,108,74,0.06) 100%)',
        border: '1px solid rgba(13,108,74,0.3)',
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
      }}
    >
      {/* Pulse glow */}
      <div
        className='absolute top-0 left-0 w-40 h-full pointer-events-none blur-3xl opacity-30'
        style={{ background: 'radial-gradient(ellipse, rgba(13,108,74,0.6) 0%, transparent 70%)' }}
      />

      <div className='relative flex items-center gap-4 flex-wrap'>
        {/* Live badge */}
        <div className='flex items-center gap-2 shrink-0'>
          <span className='w-2 h-2 rounded-full bg-[#6fa088] animate-pulse' />
          <span
            className='text-[0.58rem] tracking-[0.28em] uppercase'
            style={{ color: '#6fa088', fontFamily: 'var(--font-bebas)', letterSpacing: '0.3em' }}
          >
            Live Now
          </span>
        </div>

        <div
          className='w-px h-4 shrink-0'
          style={{ background: 'rgba(111,160,136,0.3)' }}
        />

        {/* Title */}
        <p
          className='flex-1 min-w-0 text-[0.78rem] font-light truncate'
          style={{ fontFamily: 'var(--font-display)', color: 'var(--ivory)' }}
        >
          {LIVE_NOW.title}
        </p>

        {/* Meta */}
        <div className='flex items-center gap-4 shrink-0'>
          <div className='flex items-center gap-1.5'>
            <Radio size={11} style={{ color: '#6fa088' }} />
            <span className='text-[0.62rem]' style={{ color: 'var(--ivory-dim)', fontFamily: 'var(--font-body)' }}>
              {LIVE_NOW.attendees} live
            </span>
          </div>
          <div className='flex items-center gap-1.5'>
            <Clock size={11} style={{ color: 'var(--ivory-muted)' }} />
            <span className='text-[0.62rem]' style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}>
              {LIVE_NOW.duration}
            </span>
          </div>
          <button
            type='button'
            className='flex items-center gap-1.5 px-3 py-1.5 text-[0.6rem] tracking-[0.1em] uppercase transition-all duration-150'
            style={{
              background: 'rgba(13,108,74,0.25)',
              color: '#6fa088',
              border: '1px solid rgba(13,108,74,0.4)',
              clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
              fontFamily: 'var(--font-body)',
            }}
          >
            <Eye size={10} />
            Monitor
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Upcoming webinars table ───────────────────────────────────────────────
function UpcomingTable() {
  return (
    <motion.div
      {...fadeUp(0.2)}
      style={{
        background: 'linear-gradient(145deg, var(--obsidian-3) 0%, var(--obsidian-2) 100%)',
        border: '1px solid var(--border)',
        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
      }}
      className='p-5'
    >
      <SectionHeader label='Upcoming Webinars' action='View All' />

      <div className='space-y-1'>
        {/* Table head */}
        <div
          className='grid gap-3 px-3 py-2 mb-1'
          style={{
            gridTemplateColumns: '1fr 130px 110px 90px 80px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {['Title', 'Speaker', 'Date', 'Registrations', 'Status'].map((h) => (
            <span
              key={h}
              className='text-[0.56rem] tracking-[0.2em] uppercase'
              style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
            >
              {h}
            </span>
          ))}
        </div>

        {UPCOMING_WEBINARS.map((w, i) => {
          const s = statusConfig(w.status);
          const fillPct = Math.round((w.registrations / w.capacity) * 100);
          return (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.25 + i * 0.07, ease: EASE }}
              className='grid gap-3 px-3 py-3 group cursor-pointer transition-colors duration-150 hover:bg-white/[0.02]'
              style={{ gridTemplateColumns: '1fr 130px 110px 90px 80px' }}
            >
              {/* Title + category */}
              <div className='min-w-0'>
                <p
                  className='text-[0.72rem] truncate mb-0.5'
                  style={{ color: 'var(--ivory-dim)', fontFamily: 'var(--font-body)' }}
                >
                  {w.title}
                </p>
                <div className='flex items-center gap-1.5'>
                  <Tag size={9} style={{ color: 'var(--ivory-muted)' }} />
                  <span
                    className='text-[0.58rem] tracking-[0.06em]'
                    style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {w.category}
                  </span>
                </div>
              </div>

              {/* Speaker */}
              <p
                className='text-[0.68rem] self-center truncate'
                style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
              >
                {w.speaker}
              </p>

              {/* Date */}
              <div className='self-center'>
                <p
                  className='text-[0.68rem]'
                  style={{ color: 'var(--ivory-dim)', fontFamily: 'var(--font-body)' }}
                >
                  {w.date}
                </p>
                <p
                  className='text-[0.58rem] mt-0.5'
                  style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {w.time}
                </p>
              </div>

              {/* Registrations + progress */}
              <div className='self-center'>
                <p
                  className='text-[0.68rem] mb-1'
                  style={{ color: 'var(--ivory-dim)', fontFamily: 'var(--font-body)' }}
                >
                  {w.registrations}
                  <span style={{ color: 'var(--ivory-muted)' }}>/{w.capacity}</span>
                </p>
                <div
                  className='h-0.5 w-full overflow-hidden'
                  style={{ background: 'var(--border)' }}
                >
                  <div
                    className='h-full transition-all duration-500'
                    style={{
                      width: `${fillPct}%`,
                      background: fillPct >= 90
                        ? 'rgba(251,191,36,0.7)'
                        : 'rgba(50,97,149,0.6)',
                    }}
                  />
                </div>
              </div>

              {/* Status badge */}
              <div className='self-center'>
                <span
                  className={cn('inline-flex items-center gap-1.5 px-2 py-1 text-[0.56rem] tracking-[0.1em] uppercase', s.text, s.bg)}
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <span className={cn('w-1 h-1 rounded-full', s.dot)} />
                  {s.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Recent registrations panel ────────────────────────────────────────────
function RecentRegistrations() {
  return (
    <motion.div
      {...fadeUp(0.25)}
      className='p-5'
      style={{
        background: 'linear-gradient(145deg, var(--obsidian-3) 0%, var(--obsidian-2) 100%)',
        border: '1px solid var(--border)',
        clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
      }}
    >
      <SectionHeader label='Recent Registrations' action='View All' />

      <ul className='space-y-1'>
        {RECENT_REGISTRATIONS.map((r, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.06, ease: EASE }}
            className='flex items-start gap-3 py-2.5 group'
            style={{ borderBottom: i < RECENT_REGISTRATIONS.length - 1 ? '1px solid var(--border)' : undefined }}
          >
            {/* Avatar initials */}
            <div
              className='w-7 h-7 flex items-center justify-center shrink-0 text-[0.58rem] font-medium'
              style={{
                background: 'rgba(24,61,110,0.2)',
                color: 'var(--gold-light)',
                clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
                fontFamily: 'var(--font-body)',
              }}
            >
              {r.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>

            <div className='flex-1 min-w-0'>
              <p
                className='text-[0.7rem] truncate'
                style={{ color: 'var(--ivory-dim)', fontFamily: 'var(--font-body)' }}
              >
                {r.name}
              </p>
              <div className='flex items-center gap-1.5 mt-0.5'>
                <MapPin size={9} style={{ color: 'var(--ivory-muted)' }} />
                <span
                  className='text-[0.58rem]'
                  style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {r.country}
                </span>
                <span style={{ color: 'var(--border-hi)' }}>·</span>
                <span
                  className='text-[0.58rem] truncate'
                  style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {r.webinar}
                </span>
              </div>
            </div>

            <span
              className='shrink-0 text-[0.58rem] mt-0.5'
              style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
            >
              {r.time}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Top categories panel ──────────────────────────────────────────────────
function TopCategories() {
  return (
    <motion.div
      {...fadeUp(0.3)}
      className='p-5'
      style={{
        background: 'linear-gradient(145deg, var(--obsidian-3) 0%, var(--obsidian-2) 100%)',
        border: '1px solid var(--border)',
        clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
      }}
    >
      <SectionHeader label='Top Categories' />

      <ul className='space-y-3'>
        {TOP_CATEGORIES.map((cat, i) => (
          <li key={cat.label}>
            <div className='flex items-center justify-between mb-1.5'>
              <span
                className='text-[0.68rem]'
                style={{ color: 'var(--ivory-dim)', fontFamily: 'var(--font-body)' }}
              >
                {cat.label}
              </span>
              <span
                className='text-[0.62rem]'
                style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
              >
                {cat.count} webinars
              </span>
            </div>
            <div
              className='h-1 w-full overflow-hidden'
              style={{
                background: 'var(--border)',
                clipPath: 'polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))',
              }}
            >
              <motion.div
                className='h-full'
                initial={{ width: 0 }}
                animate={{ width: `${cat.pct}%` }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease: EASE }}
                style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(90deg, #183d6e, #326195)'
                    : 'linear-gradient(90deg, #0d6c4a, #008065)',
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Quick actions panel ───────────────────────────────────────────────────
function QuickActions() {
  const actions = [
    { label: 'Schedule Webinar', icon: Video, accent: 'navy' },
    { label: 'Add Speaker', icon: Star, accent: 'teal' },
    { label: 'Export Registrations', icon: Download, accent: 'gold' },
    { label: 'Refresh Stats', icon: RefreshCw, accent: 'teal' },
  ];

  return (
    <motion.div
      {...fadeUp(0.1)}
      className='p-5'
      style={{
        background: 'linear-gradient(145deg, var(--obsidian-3) 0%, var(--obsidian-2) 100%)',
        border: '1px solid var(--border)',
        clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
      }}
    >
      <SectionHeader label='Quick Actions' />

      <div className='grid grid-cols-2 gap-2'>
        {actions.map((a, i) => {
          const ac = accentStyle(a.accent);
          return (
            <motion.button
              key={a.label}
              type='button'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.06, ease: EASE }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className='flex flex-col items-start gap-2.5 p-3 text-left transition-colors duration-150'
              style={{
                background: ac.icon,
                border: '1px solid var(--border)',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}
            >
              <a.icon size={14} style={{ color: ac.color }} />
              <span
                className='text-[0.62rem] tracking-[0.06em] uppercase leading-tight'
                style={{ color: 'var(--ivory-dim)', fontFamily: 'var(--font-body)' }}
              >
                {a.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Page header ──────────────────────────────────────────────────────────
function PageHeader() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div
      {...fadeUp(0)}
      className='flex items-start justify-between mb-7 flex-wrap gap-4'
    >
      <div>
        <p
          className='text-[0.58rem] tracking-[0.28em] uppercase mb-1.5'
          style={{ color: 'var(--teal-light)', fontFamily: 'var(--font-body)' }}
        >
          ── Admin Dashboard
        </p>
        <h1
          className='text-[1.8rem] font-light leading-none'
          style={{ fontFamily: 'var(--font-display)', color: 'var(--ivory)' }}
        >
          {greeting}, <em className='not-italic' style={{ color: 'var(--gold)' }}>Admin.</em>
        </h1>
        <p
          className='mt-1.5 text-[0.65rem] tracking-[0.05em]'
          style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
        >
          {dateStr}
        </p>
      </div>

      {/* Platform health indicators */}
      <div className='flex items-center gap-4'>
        {[
          { label: 'Platform', ok: true },
          { label: 'Registrations', ok: true },
          { label: 'Live Stream', ok: true },
        ].map((s) => (
          <div key={s.label} className='flex items-center gap-1.5'>
            {s.ok ? (
              <CheckCircle2 size={11} className='text-[#6fa088]' />
            ) : (
              <Circle size={11} className='text-red-400' />
            )}
            <span
              className='text-[0.6rem] tracking-[0.08em] uppercase'
              style={{ color: 'var(--ivory-muted)', fontFamily: 'var(--font-body)' }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main dashboard ────────────────────────────────────────────────────────
export default function AdminDashboard() {
  return (
    <div
      className='min-h-screen p-6 lg:p-8'
      style={{ background: 'var(--obsidian)', color: 'var(--ivory)' }}
    >
      {/* Ambient top glow */}
      <div
        className='fixed top-0 left-0 right-0 h-56 pointer-events-none z-0'
        style={{
          background:
            'linear-gradient(180deg, rgba(24,61,110,0.12) 0%, transparent 100%)',
        }}
      />

      <div className='relative z-10 max-w-[1400px] mx-auto'>
        {/* Header */}
        <PageHeader />

        {/* Live banner (always visible if a session is running) */}
        <div className='mb-6'>
          <LiveBanner />
        </div>

        {/* Stat cards */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7'>
          {STATS.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} delay={0.08 + i * 0.07} />
          ))}
        </div>

        {/* Main content grid */}
        <div className='grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5'>
          {/* Left column */}
          <div className='space-y-5 min-w-0'>
            <UpcomingTable />
            <RecentRegistrations />
          </div>

          {/* Right column */}
          <div className='space-y-5'>
            <QuickActions />
            <TopCategories />
          </div>
        </div>
      </div>
    </div>
  );
}
