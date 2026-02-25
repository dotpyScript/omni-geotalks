// components/ui/Input.tsx
'use client';

import { forwardRef, useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ChevronDown,
  Eye,
  EyeOff,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export type InputSize = 'sm' | 'md' | 'lg' | 'xl';
export type InputVariant = 'default' | 'ghost';

// ─── Size tokens ──────────────────────────────────────────────────────────────
// All measured to match the original .disc-search input exactly at "md"
const SIZE: Record<
  InputSize,
  {
    field: string; // padding + font-size + tracking on the input/select/textarea
    label: string; // label font-size + tracking
    icon: number; // lucide icon px
    pl: string; // left icon padding offset
    pr: string; // right icon padding offset
  }
> = {
  sm: {
    field: 'py-2 px-3 text-[0.72rem] tracking-[0.03em]',
    label: 'text-[0.58rem] tracking-[0.22em]',
    icon: 12,
    pl: 'pl-9',
    pr: 'pr-9',
  },
  md: {
    field: 'py-[13px] px-4 text-[0.8rem] tracking-[0.03em]',
    label: 'text-[0.62rem] tracking-[0.2em]',
    icon: 14,
    pl: 'pl-10',
    pr: 'pr-10',
  },
  lg: {
    field: 'py-3.5 px-5 text-[0.85rem] tracking-[0.02em]',
    label: 'text-[0.65rem] tracking-[0.18em]',
    icon: 15,
    pl: 'pl-11',
    pr: 'pr-11',
  },
  xl: {
    field: 'py-4 px-6 text-[0.9rem] tracking-[0.02em]',
    label: 'text-[0.68rem] tracking-[0.15em]',
    icon: 16,
    pl: 'pl-12',
    pr: 'pr-12',
  },
};

// Icon left/right absolute position per size
const ICON_POS: Record<InputSize, { l: string; r: string }> = {
  sm: { l: 'left-3', r: 'right-3' },
  md: { l: 'left-4', r: 'right-4' },
  lg: { l: 'left-4', r: 'right-5' },
  xl: { l: 'left-5', r: 'right-5' },
};

// ─── Shared field base class ──────────────────────────────────────────────────
// Matches exactly: obsidian-3 bg, 1px gold-14 border, ivory text, DM Sans,
// no outline, 0.25s transition, gold-dim glow on focus
const FIELD_BASE = [
  'w-full',
  'bg-[#12161f]',
  'border border-[rgba(201,168,76,0.14)]',
  'text-[#f0ede6]',
  'placeholder:text-[rgba(240,237,230,0.28)]',
  'outline-none',
  'transition-[border-color,box-shadow] duration-[250ms]',
  'focus:border-[rgba(201,168,76,0.3)]',
  'focus:shadow-[0_0_0_3px_rgba(201,168,76,0.06)]',
  'disabled:opacity-40 disabled:cursor-not-allowed',
].join(' ');

// ─── Label ────────────────────────────────────────────────────────────────────
function Label({
  text,
  htmlFor,
  size,
}: {
  text: string;
  htmlFor?: string;
  size: InputSize;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'block uppercase text-[rgba(240,237,230,0.45)] mb-2 font-normal',
        SIZE[size].label,
      )}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {text}
    </label>
  );
}

// ─── Hint / Error message ─────────────────────────────────────────────────────
function FieldMeta({ hint, error }: { hint?: string; error?: string }) {
  return (
    <AnimatePresence mode='wait' initial={false}>
      {error ? (
        <motion.p
          key='err'
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className='mt-1.5 text-[0.61rem] tracking-[0.08em] text-red-400'
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {error}
        </motion.p>
      ) : hint ? (
        <motion.p
          key='hint'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className='mt-1.5 text-[0.61rem] tracking-[0.08em] text-[rgba(240,237,230,0.28)]'
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {hint}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

// ─── Text / Password Input ────────────────────────────────────────────────────
export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  size?: InputSize;
  variant?: InputVariant;
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  isDisabled?: boolean;
  wrapperClass?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    variant = 'default',
    label,
    hint,
    error,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    isDisabled,
    wrapperClass,
    className,
    type = 'text',
    ...props
  },
  ref,
) {
  const uid = useId();
  const [show, setShow] = useState(false);
  const isPass = type === 'password';
  const s = SIZE[size];
  const p = ICON_POS[size];

  return (
    <div className={cn('flex flex-col', wrapperClass)}>
      {label && <Label text={label} htmlFor={uid} size={size} />}

      <div className='relative'>
        {LeftIcon && (
          <LeftIcon
            size={s.icon}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 pointer-events-none text-[rgba(240,237,230,0.3)] z-10',
              p.l,
            )}
          />
        )}

        <input
          id={uid}
          ref={ref}
          type={isPass ? (show ? 'text' : 'password') : type}
          disabled={isDisabled ?? props.disabled}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className={cn(
            FIELD_BASE,
            s.field,
            LeftIcon && s.pl,
            (RightIcon || isPass) && s.pr,
            error &&
              '!border-red-500/40 focus:!border-red-500/55 focus:!shadow-[0_0_0_3px_rgba(239,68,68,0.07)]',
            variant === 'ghost' &&
              'bg-transparent border-transparent focus:bg-[#12161f] focus:border-[rgba(201,168,76,0.2)]',
            className,
          )}
          {...props}
        />

        {/* Password toggle */}
        {isPass && (
          <button
            type='button'
            tabIndex={-1}
            onClick={() => setShow((v) => !v)}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-[rgba(240,237,230,0.3)]',
              'hover:text-[rgba(240,237,230,0.65)] transition-colors z-10',
              p.r,
            )}
          >
            {show ? <EyeOff size={s.icon} /> : <Eye size={s.icon} />}
          </button>
        )}

        {/* Right icon (non-password) */}
        {!isPass && RightIcon && (
          <RightIcon
            size={s.icon}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 pointer-events-none text-[rgba(240,237,230,0.3)] z-10',
              p.r,
            )}
          />
        )}
      </div>

      <FieldMeta hint={hint} error={error} />
    </div>
  );
});

// ─── Search Input ─────────────────────────────────────────────────────────────
// Identical to the disc-search in WebinarDiscovery:
//   search icon left, placeholder "Search webinars…", focus gold glow,
//   animated clear X button when value present
export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  size?: InputSize;
  label?: string;
  hint?: string;
  error?: string;
  isDisabled?: boolean;
  onClear?: () => void;
  wrapperClass?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      size = 'md',
      label,
      hint,
      error,
      isDisabled,
      onClear,
      value,
      onChange,
      wrapperClass,
      className,
      placeholder = 'Search…',
      ...props
    },
    ref,
  ) {
    const uid = useId();
    const s = SIZE[size];
    const p = ICON_POS[size];
    const hasVal = value !== undefined && value !== '';

    return (
      <div className={cn('flex flex-col', wrapperClass)}>
        {label && <Label text={label} htmlFor={uid} size={size} />}

        <div className='relative group'>
          {/* Search icon — turns gold on focus */}
          <Search
            size={s.icon}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 pointer-events-none z-10',
              'text-[rgba(240,237,230,0.3)] transition-colors duration-200',
              'group-focus-within:text-[#c9a84c]',
              p.l,
            )}
          />

          <input
            id={uid}
            ref={ref}
            type='search'
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={isDisabled}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className={cn(
              FIELD_BASE,
              s.field,
              s.pl, // always has left icon
              hasVal ? s.pr : '', // only right pad when clear btn shows
              '[&::-webkit-search-cancel-button]:hidden',
              error && '!border-red-500/40',
              className,
            )}
            {...props}
          />

          {/* Animated clear button */}
          <AnimatePresence>
            {hasVal && onClear && (
              <motion.button
                type='button'
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.65 }}
                transition={{ duration: 0.15 }}
                onClick={onClear}
                className={cn(
                  'absolute top-1/2 -translate-y-1/2 z-10',
                  'text-[rgba(240,237,230,0.3)] hover:text-[rgba(240,237,230,0.7)]',
                  'transition-colors',
                  p.r,
                )}
              >
                <X size={s.icon} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <FieldMeta hint={hint} error={error} />
      </div>
    );
  },
);

// ─── Select ───────────────────────────────────────────────────────────────────
// Matches .disc-sort select: appearance-none, obsidian-3 bg, uppercase tracking,
// gold chevron right, focus border-mid
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> {
  size?: InputSize;
  variant?: InputVariant;
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  leftIcon?: LucideIcon;
  isDisabled?: boolean;
  wrapperClass?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      size = 'md',
      variant = 'default',
      label,
      hint,
      error,
      options,
      placeholder,
      leftIcon: LeftIcon,
      isDisabled,
      wrapperClass,
      className,
      ...props
    },
    ref,
  ) {
    const uid = useId();
    const s = SIZE[size];
    const p = ICON_POS[size];

    return (
      <div className={cn('flex flex-col', wrapperClass)}>
        {label && <Label text={label} htmlFor={uid} size={size} />}

        <div className='relative'>
          {LeftIcon && (
            <LeftIcon
              size={s.icon}
              className={cn(
                'absolute top-1/2 -translate-y-1/2 pointer-events-none text-[rgba(240,237,230,0.3)] z-10',
                p.l,
              )}
            />
          )}

          <select
            id={uid}
            ref={ref}
            disabled={isDisabled}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className={cn(
              FIELD_BASE,
              s.field,
              'appearance-none cursor-pointer',
              // extra right padding for chevron
              'pr-10',
              LeftIcon && s.pl,
              // uppercase + tracking on select text
              'uppercase tracking-[0.1em] text-[rgba(240,237,230,0.55)]',
              '[&>option]:bg-[#0d1118] [&>option]:text-[#f0ede6] [&>option]:normal-case [&>option]:tracking-normal',
              error && '!border-red-500/40',
              variant === 'ghost' && 'bg-transparent border-transparent',
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value='' disabled>
                {placeholder}
              </option>
            )}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {/* Gold chevron — matches .disc-sort__chevron */}
          <ChevronDown
            size={s.icon}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 pointer-events-none text-[#c9a84c] z-10',
              p.r,
            )}
          />
        </div>

        <FieldMeta hint={hint} error={error} />
      </div>
    );
  },
);

// ─── Textarea ─────────────────────────────────────────────────────────────────
export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> {
  size?: InputSize;
  label?: string;
  hint?: string;
  error?: string;
  isDisabled?: boolean;
  rows?: number;
  wrapperClass?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      size = 'md',
      label,
      hint,
      error,
      isDisabled,
      rows = 4,
      wrapperClass,
      className,
      ...props
    },
    ref,
  ) {
    const uid = useId();
    const s = SIZE[size];

    return (
      <div className={cn('flex flex-col', wrapperClass)}>
        {label && <Label text={label} htmlFor={uid} size={size} />}

        <textarea
          id={uid}
          ref={ref}
          rows={rows}
          disabled={isDisabled}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className={cn(
            FIELD_BASE,
            s.field,
            'resize-y min-h-[100px]',
            error && '!border-red-500/40',
            className,
          )}
          {...props}
        />

        <FieldMeta hint={hint} error={error} />
      </div>
    );
  },
);

// ─── FilterPill ───────────────────────────────────────────────────────────────
// The exact .filter-pill from WebinarDiscovery:
//   clip-path polygon, 0.7rem uppercase 0.12em tracking, gold border + bg when active,
//   dot indicator when active, optional badge count
export interface FilterPillProps {
  label: string;
  active?: boolean;
  count?: number;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FilterPill({
  label,
  active = false,
  count,
  disabled = false,
  onClick,
  className,
}: FilterPillProps) {
  return (
    <motion.button
      type='button'
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      onClick={() => !disabled && onClick?.()}
      disabled={disabled}
      style={{
        clipPath:
          'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
        fontFamily: "'DM Sans', sans-serif",
      }}
      className={cn(
        'inline-flex items-center gap-[7px] shrink-0 select-none',
        'text-[0.7rem] tracking-[0.12em] uppercase',
        'px-[18px] py-[10px]',
        'border transition-all duration-[220ms] ease-out',
        'whitespace-nowrap cursor-pointer',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        active
          ? [
              'border-[#c9a84c]',
              'bg-gradient-to-br from-[rgba(201,168,76,0.18)] to-[rgba(201,168,76,0.08)]',
              'text-[#e8c97e]',
              'shadow-[0_0_18px_rgba(201,168,76,0.12)]',
            ]
          : [
              'border-[rgba(201,168,76,0.14)]',
              'bg-transparent',
              'text-[rgba(240,237,230,0.55)]',
              'hover:border-[rgba(201,168,76,0.3)]',
              'hover:text-[#f0ede6]',
              'hover:bg-[rgba(201,168,76,0.12)]',
            ],
        className,
      )}
    >
      {/* Active dot — .filter-pill__dot */}
      {active && (
        <span className='w-[5px] h-[5px] rounded-full bg-current opacity-60 shrink-0' />
      )}

      {label}

      {/* Badge count */}
      {count !== undefined && (
        <span
          className={cn(
            'text-[0.58rem] px-1.5 py-px rounded-sm leading-tight',
            active
              ? 'bg-[rgba(201,168,76,0.3)] text-[#e8c97e]'
              : 'bg-[rgba(240,237,230,0.07)] text-[rgba(240,237,230,0.35)]',
          )}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}

// ─── ViewToggle ───────────────────────────────────────────────────────────────
// The exact .disc-view-toggle / .view-btn from WebinarDiscovery:
//   40×40px buttons, grid icon "⊞" and list icon "≡",
//   gold-dim bg + gold color when active
export type ViewMode = 'grid' | 'list';

export interface ViewToggleProps {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ value, onChange, className }: ViewToggleProps) {
  return (
    <div
      className={cn(
        'flex overflow-hidden shrink-0',
        'border border-[rgba(201,168,76,0.14)]',
        className,
      )}
    >
      {(['grid', 'list'] as ViewMode[]).map((mode) => (
        <motion.button
          key={mode}
          type='button'
          whileTap={{ scale: 0.88 }}
          onClick={() => onChange(mode)}
          title={mode === 'grid' ? 'Grid view' : 'List view'}
          aria-label={mode === 'grid' ? 'Grid view' : 'List view'}
          aria-pressed={value === mode}
          className={cn(
            'w-10 h-10 flex items-center justify-center',
            'text-[0.9rem] border-none cursor-pointer',
            'transition-all duration-200',
            value === mode
              ? 'bg-[rgba(201,168,76,0.12)] text-[#c9a84c]'
              : 'bg-transparent text-[rgba(240,237,230,0.28)] hover:bg-[#12161f] hover:text-[rgba(240,237,230,0.55)]',
          )}
        >
          {mode === 'grid' ? '⊞' : '≡'}
        </motion.button>
      ))}
    </div>
  );
}
