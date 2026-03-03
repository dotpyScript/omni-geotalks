// components/ui/Button.tsx
'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export type ButtonVariant =
  | 'primary' // gold gradient — main CTA
  | 'ghost' // transparent with gold border
  | 'outline' // ivory border, transparent bg
  | 'cyan' // cyan accent — live/active states
  | 'green' // green accent — success/join states
  | 'danger' // red — destructive actions
  | 'dark'; // dark filled — secondary actions

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<
  HTMLMotionProps<'button'>,
  'children'
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  clipped?: boolean; // applies the signature polygon clip-path
  children: React.ReactNode;
  loadingText?: string;
}

// ─── Variant styles ───────────────────────────────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-gradient-to-br from-(--gold) to-(--gold-light)',
    'text-(--obsidian) font-medium',
    'border border-transparent',
    'shadow-[0_4px_24px_rgba(201,168,76,0.25)]',
    'hover:from-(--gold-light) hover:to-(--gold-pale)',
    'hover:shadow-[0_8px_36px_rgba(201,168,76,0.4)]',
  ].join(' '),

  ghost: [
    'bg-transparent',
    'text-(--ivory-dim)',
    'border border-(--border)',
    'hover:border-(--border-mid)',
    'hover:text-(--ivory)',
    'hover:bg-(--gold-dim)',
  ].join(' '),

  outline: [
    'bg-transparent',
    'text-(--ivory-dim)',
    'border border-(--border)',
    'hover:border-(--border-mid)',
    'hover:text-(--ivory)',
    'hover:bg-(--gold-dim)',
  ].join(' '),

  cyan: [
    'bg-(--cyan-dim)',
    'text-(--cyan)',
    'border border-(--cyan-dim)',
    'hover:bg-[rgba(0,212,255,0.18)]',
    'hover:border-[rgba(0,212,255,0.5)]',
    'hover:shadow-[0_4px_20px_rgba(0,212,255,0.2)]',
  ].join(' '),

  green: [
    'bg-gradient-to-br from-(--green) to-[#00c882]',
    'text-[#001a10] font-medium',
    'border border-transparent',
    'hover:from-[#00c882] hover:to-[#00b070]',
    'hover:shadow-[0_8px_28px_rgba(0,229,160,0.35)]',
  ].join(' '),

  danger: [
    'bg-[rgba(239,68,68,0.1)]',
    'text-red-400',
    'border border-red-500/25',
    'hover:bg-red-500/20',
    'hover:border-red-500/50',
    'hover:shadow-[0_4px_20px_rgba(239,68,68,0.2)]',
  ].join(' '),

  dark: [
    'bg-(--obsidian-3)',
    'text-(--ivory-dim)',
    'border border-(--border)',
    'hover:border-(--border-mid)',
    'hover:text-(--ivory)',
    'hover:bg-(--obsidian-4)',
  ].join(' '),
};

// ─── Size styles ──────────────────────────────────────────────────────────────
const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-3 py-1.5 text-[0.6rem] tracking-[0.18em] gap-1.5',
  sm: 'px-4 py-2.5 text-[0.65rem] tracking-[0.18em] gap-2',
  md: 'px-6 py-3.5 text-[0.72rem] tracking-[0.18em] gap-2.5',
  lg: 'px-8 py-4 text-[0.78rem] tracking-[0.2em] gap-3',
  xl: 'px-10 py-5 text-[0.85rem] tracking-[0.22em] gap-3',
};

// ─── Icon size per button size ────────────────────────────────────────────────
const iconSize: Record<ButtonSize, number> = {
  xs: 12,
  sm: 13,
  md: 14,
  lg: 16,
  xl: 18,
};

// ─── Framer motion variants ───────────────────────────────────────────────────
const motionVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.01, y: -1.5 },
  tap: { scale: 0.97, y: 0 },
};

// ─── Component ────────────────────────────────────────────────────────────────
export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  clipped = true,
  children,
  loadingText,
  className,
  ...props
}: ButtonProps) {
  const disabled = isDisabled || isLoading;

  // Signature IEGS polygon clip
  const clipStyle = clipped
    ? {
        clipPath:
          'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
      }
    : {};

  return (
    <motion.button
      variants={motionVariants}
      initial='rest'
      whileHover={disabled ? 'rest' : 'hover'}
      whileTap={disabled ? 'rest' : 'tap'}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      disabled={disabled}
      style={clipStyle}
      className={cn(
        // Base
        'relative inline-flex items-center justify-center',
        "font-['DM_Sans'] uppercase font-medium",
        'transition-all duration-250 ease-out',
        'select-none cursor-pointer',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-(--gold)/50',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        // Variant
        variantStyles[variant],
        // Size
        sizeStyles[size],
        // Full width
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {/* Shimmer overlay on primary */}
      {variant === 'primary' && (
        <motion.span
          className='absolute inset-0 bg-linear-to-r from-white/0 via-white/15 to-white/0'
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        />
      )}

      {/* Content */}
      <span className='relative flex items-center gap-[inherit]'>
        {isLoading ? (
          <>
            <Loader2 size={iconSize[size]} className='animate-spin shrink-0' />
            {loadingText ?? children}
          </>
        ) : (
          <>
            {LeftIcon && (
              <LeftIcon
                size={iconSize[size]}
                className='shrink-0 transition-transform duration-200'
              />
            )}
            {children}
            {RightIcon && (
              <motion.span
                className='shrink-0'
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <RightIcon size={iconSize[size]} />
              </motion.span>
            )}
          </>
        )}
      </span>
    </motion.button>
  );
}

// ─── Icon-only button ─────────────────────────────────────────────────────────
export interface IconButtonProps extends Omit<
  HTMLMotionProps<'button'>,
  'children'
> {
  icon: LucideIcon;
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string; // for accessibility
  isDisabled?: boolean;
}

export function IconButton({
  icon: Icon,
  variant = 'ghost',
  size = 'md',
  label,
  isDisabled = false,
  className,
  ...props
}: IconButtonProps) {
  const sz = iconSize[size];
  const padding: Record<ButtonSize, string> = {
    xs: 'p-1.5',
    sm: 'p-2',
    md: 'p-2.5',
    lg: 'p-3',
    xl: 'p-3.5',
  };

  return (
    <motion.button
      whileHover={isDisabled ? {} : { scale: 1.05, y: -1 }}
      whileTap={isDisabled ? {} : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      disabled={isDisabled}
      aria-label={label}
      style={{
        clipPath:
          'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
      }}
      className={cn(
        'inline-flex items-center justify-center',
        'transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-(--gold)/50',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variantStyles[variant],
        padding[size],
        className,
      )}
      {...props}
    >
      <Icon size={sz} className='shrink-0' />
    </motion.button>
  );
}
