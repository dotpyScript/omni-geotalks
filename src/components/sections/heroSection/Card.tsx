// components/ui/Card.tsx
'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export type CardVariant =
  | 'default' // dark bordered card — general use
  | 'event' // webinar event card with left gold accent
  | 'spotlight' // featured/hero card with top gradient bar
  | 'stat' // compact stat display card
  | 'glass' // frosted glass effect
  | 'outline'; // minimal border only

export type CardStatus =
  | 'live'
  | 'published'
  | 'completed'
  | 'cancelled'
  | 'draft';

export interface CardBadgeProps {
  status: CardStatus;
  label?: string;
}

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: CardVariant;
  hoverable?: boolean;
  clipped?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// ─── Variant base styles ──────────────────────────────────────────────────────
const variantBase: Record<CardVariant, string> = {
  default: [
    'bg-gradient-to-br from-[#0d1118] to-[#12161f]',
    'border border-[rgba(201,168,76,0.14)]',
  ].join(' '),

  event: [
    'bg-gradient-to-br from-[#0d1118] to-[#12161f]',
    'border border-[rgba(201,168,76,0.14)]',
    'border-l-[3px] border-l-[#c9a84c]',
  ].join(' '),

  spotlight: [
    'bg-gradient-to-br from-[#0d1118] to-[#181d28]',
    'border border-[rgba(201,168,76,0.14)]',
  ].join(' '),

  stat: [
    'bg-gradient-to-br from-[rgba(201,168,76,0.05)] to-[rgba(201,168,76,0.02)]',
    'border border-[rgba(201,168,76,0.14)]',
  ].join(' '),

  glass: [
    'bg-[rgba(8,10,15,0.65)]',
    'backdrop-blur-md',
    'border border-[rgba(201,168,76,0.14)]',
  ].join(' '),

  outline: ['bg-transparent', 'border border-[rgba(201,168,76,0.14)]'].join(
    ' ',
  ),
};

const hoverBase: Record<CardVariant, string> = {
  default:
    'hover:border-[rgba(201,168,76,0.32)] hover:shadow-[0_8px_32px_rgba(201,168,76,0.1)]',
  event:
    'hover:border-[rgba(201,168,76,0.4)] hover:translate-x-1 hover:shadow-[-4px_0_24px_rgba(201,168,76,0.1)]',
  spotlight:
    'hover:border-[rgba(201,168,76,0.35)] hover:shadow-[0_12px_48px_rgba(201,168,76,0.15)]',
  stat: 'hover:border-[rgba(201,168,76,0.3)] hover:shadow-[0_6px_24px_rgba(201,168,76,0.12)]',
  glass: 'hover:border-[rgba(201,168,76,0.28)] hover:bg-[rgba(8,10,15,0.8)]',
  outline:
    'hover:border-[rgba(201,168,76,0.35)] hover:bg-[rgba(201,168,76,0.03)]',
};

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

// ─── Status badge colours ─────────────────────────────────────────────────────
const statusConfig: Record<
  CardStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  live: {
    label: 'Live Now',
    color: 'text-[#00e5a0]',
    bg: 'bg-[rgba(0,229,160,0.1)]',
    border: 'border-[rgba(0,229,160,0.3)]',
  },
  published: {
    label: 'Registration Open',
    color: 'text-[#00d4ff]',
    bg: 'bg-[rgba(0,212,255,0.08)]',
    border: 'border-[rgba(0,212,255,0.25)]',
  },
  completed: {
    label: 'Recording Available',
    color: 'text-[#c9a84c]',
    bg: 'bg-[rgba(201,168,76,0.1)]',
    border: 'border-[rgba(201,168,76,0.25)]',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/25',
  },
  draft: {
    label: 'Draft',
    color: 'text-[rgba(240,237,230,0.4)]',
    bg: 'bg-[rgba(240,237,230,0.05)]',
    border: 'border-[rgba(240,237,230,0.12)]',
  },
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
export function CardStatusBadge({ status, label }: CardBadgeProps) {
  const cfg = statusConfig[status];
  const showPulse = status === 'live' || status === 'published';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        'text-[0.6rem] tracking-[0.22em] uppercase font-medium',
        'px-2.5 py-1 border',
        cfg.color,
        cfg.bg,
        cfg.border,
      )}
    >
      {showPulse && (
        <span className='relative flex h-[5px] w-[5px] shrink-0'>
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-60',
              status === 'live' ? 'bg-[#00e5a0]' : 'bg-[#00d4ff]',
            )}
          />
          <span
            className={cn(
              'relative inline-flex rounded-full h-[5px] w-[5px]',
              status === 'live' ? 'bg-[#00e5a0]' : 'bg-[#00d4ff]',
            )}
          />
        </span>
      )}
      {label ?? cfg.label}
    </span>
  );
}

// ─── Category Tag ─────────────────────────────────────────────────────────────
export function CardCategoryTag({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-block text-[0.58rem] tracking-[0.2em] uppercase',
        'px-2.5 py-1 border border-[rgba(201,168,76,0.22)]',
        'text-[#c9a84c] bg-[rgba(201,168,76,0.06)]',
        className,
      )}
    >
      {category}
    </span>
  );
}

// ─── Speaker Avatars ──────────────────────────────────────────────────────────
export interface SpeakerAvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}

const avatarSize = {
  sm: 'w-7 h-7 text-[0.5rem]',
  md: 'w-9 h-9 text-[0.6rem]',
  lg: 'w-12 h-12 text-[0.75rem]',
};

export function SpeakerAvatar({ initials, size = 'md' }: SpeakerAvatarProps) {
  return (
    <div
      className={cn(
        'rounded-full border-2 border-[#080a0f]',
        'bg-gradient-to-br from-[#181d28] to-[#12161f]',
        'flex items-center justify-center shrink-0',
        'text-[#e8c97e] font-semibold -ml-2 first:ml-0',
        avatarSize[size],
      )}
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      {initials}
    </div>
  );
}

export interface SpeakerAvatarGroupProps {
  speakers: { initials: string; name: string }[];
  size?: 'sm' | 'md' | 'lg';
  maxShow?: number;
  label?: string;
  sublabel?: string;
}

export function SpeakerAvatarGroup({
  speakers,
  size = 'md',
  maxShow = 3,
  label,
  sublabel,
}: SpeakerAvatarGroupProps) {
  const shown = speakers.slice(0, maxShow);
  const extras = speakers.length - maxShow;

  return (
    <div className='flex items-center gap-2.5'>
      <div className='flex'>
        {shown.map((s, i) => (
          <SpeakerAvatar key={i} initials={s.initials} size={size} />
        ))}
        {extras > 0 && (
          <div
            className={cn(
              'rounded-full border-2 border-[#080a0f]',
              'bg-[#12161f] flex items-center justify-center -ml-2',
              'text-[rgba(240,237,230,0.4)] text-[0.5rem] tracking-wide',
              avatarSize[size],
            )}
          >
            +{extras}
          </div>
        )}
      </div>

      {(label || sublabel) && (
        <div className='text-[0.65rem] leading-tight'>
          {label && (
            <p className='text-[rgba(240,237,230,0.55)] font-normal'>{label}</p>
          )}
          {sublabel && (
            <p className='text-[rgba(240,237,230,0.3)] font-light'>
              {sublabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Platform Chip ────────────────────────────────────────────────────────────
export function PlatformChip({ platform }: { platform: string }) {
  return (
    <span className='inline-flex items-center gap-1 text-[0.58rem] tracking-[0.14em] uppercase px-2 py-0.5 border border-[rgba(0,212,255,0.2)] text-[#00d4ff] bg-[rgba(0,212,255,0.06)]'>
      {platform}
    </span>
  );
}

// ─── Card with top spotlight bar ──────────────────────────────────────────────
export function SpotlightBar({
  color = 'gold',
}: {
  color?: 'gold' | 'cyan' | 'green';
}) {
  const gradient = {
    gold: 'from-[#c9a84c] via-[#e8c97e] to-transparent',
    cyan: 'from-[#00d4ff] via-[#00d4ff]/60 to-transparent',
    green: 'from-[#00e5a0] via-[#00e5a0]/60 to-transparent',
  }[color];

  return (
    <div
      className={cn(
        'absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r',
        gradient,
      )}
    />
  );
}

// ─── Main Card ────────────────────────────────────────────────────────────────
export function Card({
  variant = 'default',
  hoverable = true,
  clipped = false,
  padding = 'md',
  children,
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.005 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      style={
        clipped
          ? {
              clipPath:
                'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
            }
          : undefined
      }
      className={cn(
        'relative overflow-hidden',
        'transition-all duration-300 ease-out',
        variantBase[variant],
        hoverable && hoverBase[variant],
        paddingMap[padding],
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── Webinar Event Card (composite) ──────────────────────────────────────────
export interface EventCardProps {
  status: CardStatus;
  category: string;
  title: string;
  date: string;
  duration: string;
  platform: string;
  speakers: { initials: string; name: string }[];
  registrations?: number;
  meta?: string; // e.g. "Free · No account required"
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export function EventCard({
  status,
  category,
  title,
  date,
  duration,
  platform,
  speakers,
  registrations,
  meta = 'Free · No account required',
  onAction,
  actionLabel,
  className,
}: EventCardProps) {
  const isLive = status === 'live';
  const isCompleted = status === 'completed';

  const defaultAction = isLive
    ? 'Join Now'
    : isCompleted
      ? 'Watch Recording'
      : 'Register Free';

  return (
    <Card
      variant='event'
      padding='none'
      className={cn('cursor-pointer group', className)}
      onClick={onAction}
    >
      {/* Top gold rule on hover */}
      <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c9a84c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

      <div className='p-6 pb-5'>
        {/* Status + Category row */}
        <div className='flex items-center justify-between mb-4'>
          <CardStatusBadge status={status} />
          <CardCategoryTag category={category} />
        </div>

        {/* Title */}
        <h3
          className='text-[1.15rem] leading-snug font-light text-[#f0ede6] mb-4 group-hover:text-[#f5e6c0] transition-colors duration-250'
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {title}
        </h3>

        {/* Meta rows */}
        <div className='flex flex-col gap-1.5 mb-5'>
          <div className='flex items-center gap-2 text-[0.68rem] text-[rgba(240,237,230,0.4)]'>
            <span className='text-[#c9a84c] text-[0.72rem]'>◷</span>
            {date} · {duration}
          </div>
          <div className='flex items-center gap-2 text-[0.68rem] text-[rgba(240,237,230,0.4)]'>
            <span className='text-[#c9a84c] text-[0.72rem]'>◈</span>
            Via <PlatformChip platform={platform} />
          </div>
          {meta && (
            <div className='flex items-center gap-2 text-[0.68rem] text-[rgba(240,237,230,0.4)]'>
              <span className='text-[#c9a84c] text-[0.72rem]'>◆</span>
              {meta}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className='px-6 pb-5 pt-0 flex items-center justify-between border-t border-[rgba(201,168,76,0.1)] pt-4'>
        <SpeakerAvatarGroup
          speakers={speakers}
          size='sm'
          label={speakers[0]?.name}
          sublabel={
            speakers.length > 1
              ? `+${speakers.length - 1} speaker${speakers.length > 2 ? 's' : ''}`
              : 'Lead Speaker'
          }
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAction?.();
          }}
          className={cn(
            'text-[0.62rem] tracking-[0.16em] uppercase font-medium px-4 py-2',
            'transition-all duration-200 shrink-0',
            isLive
              ? 'bg-gradient-to-br from-[#00e5a0] to-[#00c882] text-[#001a10] hover:shadow-[0_4px_16px_rgba(0,229,160,0.3)]'
              : isCompleted
                ? 'border border-[rgba(201,168,76,0.3)] text-[#c9a84c] hover:bg-[rgba(201,168,76,0.08)]'
                : 'bg-gradient-to-br from-[#c9a84c] to-[#e8c97e] text-[#080a0f] hover:shadow-[0_4px_16px_rgba(201,168,76,0.3)]',
          )}
          style={{
            clipPath:
              'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))',
          }}
        >
          {actionLabel ?? defaultAction}
        </button>
      </div>

      {/* Registration count */}
      {registrations !== undefined && (
        <div className='px-6 pb-3 text-[0.6rem] tracking-[0.08em] text-[rgba(240,237,230,0.25)] flex items-center gap-1.5'>
          <span className='text-[#c9a84c] text-[0.55rem]'>◈</span>
          {registrations.toLocaleString()} registered
        </div>
      )}
    </Card>
  );
}
