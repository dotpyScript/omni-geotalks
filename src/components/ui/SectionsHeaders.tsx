// components/ui/SectionHeader.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export type SectionHeaderLayout = 'split' | 'centered' | 'left';

export interface SectionHeaderMeta {
  /** Bebas Neue large number on the right side */
  value: string | number;
  /** small label below the number */
  label: string;
}

export interface SectionHeaderProps {
  /** small gold uppercase line above the title */
  eyebrow?: string;
  /** Supports <em> for italic gold and <strong> for block bold */
  title: React.ReactNode;
  /** muted body text below the title */
  subtitle?: React.ReactNode;
  /** shows big Bebas number + label on the right in split layout */
  meta?: SectionHeaderMeta;
  /** layout mode */
  layout?: SectionHeaderLayout;
  /** whether to draw a gold rule bottom border */
  bordered?: boolean;
  /** anything you want on the right side instead of meta */
  rightSlot?: React.ReactNode;
  /** extra classes on the wrapper */
  className?: string;
  /** Framer Motion reveal delay offset in seconds */
  delay?: number;
  /** override the default px-[60px] pt-[100px] pb-[60px] padding */
  padding?: string;
}

// ─── Animation preset ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// ─── Eyebrow row  ─────────────────────────────────────────────────────────────
// Matches the exact pattern used in every section:
//   [gold gradient line]  [UPPERCASE GOLD TEXT 0.35em spacing]
export function SectionEyebrow({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3.5', className)}>
      {/* 32px gradient line: transparent → gold */}
      <span
        className='shrink-0 block h-px w-8'
        style={{ background: 'linear-gradient(90deg, transparent, #c9a84c)' }}
      />
      <span
        className='text-[0.68rem] tracking-[0.35em] uppercase text-[#c9a84c] font-normal'
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Section Title ─────────────────────────────────────────────────────────────
// Cormorant Garamond, clamp 2.4→3.8rem, weight 300
// <em>  → italic, color gold-light  (#e8c97e)
// <strong> → font-semibold, displayed as block
export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'font-light leading-[1.06] tracking-[-0.01em] text-[#f0ede6]',
        // em → italic gold
        '[&_em]:not-italic [&_em]:italic [&_em]:text-[#e8c97e]',
        // strong → semibold block
        '[&_strong]:font-semibold [&_strong]:block',
        className,
      )}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
      }}
    >
      {children}
    </h2>
  );
}

// ─── Meta count (right side of split headers) ─────────────────────────────────
// Bebas Neue large number + small label, used in Discover Webinars, Speakers etc.
function MetaCount({ meta }: { meta: SectionHeaderMeta }) {
  return (
    <div className='flex flex-col items-end shrink-0 gap-0.5'>
      <span
        className='leading-none tracking-[0.05em] text-[#e8c97e]'
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3.2rem' }}
      >
        {meta.value}
      </span>
      <span
        className='text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(240,237,230,0.3)]'
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {meta.label}
      </span>
    </div>
  );
}

// ─── Main SectionHeader ───────────────────────────────────────────────────────
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  meta,
  rightSlot,
  layout = 'split',
  bordered = true,
  className,
  delay = 0,
  padding = 'px-[60px] pt-[100px] pb-[60px]',
}: SectionHeaderProps) {
  const isCentered = layout === 'centered';
  const isSplit = layout === 'split';
  const isLeft = layout === 'left';

  return (
    <div
      className={cn(
        'relative z-[2]',
        padding,
        bordered && 'border-b border-[rgba(201,168,76,0.14)]',
        // layout classes
        isSplit && 'flex items-end justify-between gap-10 flex-wrap',
        isCentered && 'flex flex-col items-center text-center',
        isLeft && 'flex flex-col',
        // mobile: always column
        'max-sm:flex-col max-sm:items-start max-sm:gap-4',
        className,
      )}
    >
      {/* ── Left / main block ── */}
      <div className={cn(isCentered && 'max-w-2xl')}>
        {eyebrow && (
          <motion.div
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-60px' }}
            custom={delay}
            className='mb-5'
          >
            <SectionEyebrow text={eyebrow} />
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-60px' }}
          custom={delay + 0.1}
        >
          <SectionTitle>{title}</SectionTitle>
        </motion.div>

        {subtitle && (
          <motion.p
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-60px' }}
            custom={delay + 0.2}
            className={cn(
              'font-light leading-[1.7] text-[rgba(240,237,230,0.55)] mt-4',
              'text-[0.88rem]',
              isCentered ? 'max-w-xl' : 'max-w-[420px]',
            )}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* ── Right slot (only in split layout) ── */}
      {isSplit && (meta || rightSlot) && (
        <motion.div
          variants={fadeUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-60px' }}
          custom={delay + 0.15}
        >
          {rightSlot ?? (meta && <MetaCount meta={meta} />)}
        </motion.div>
      )}
    </div>
  );
}
