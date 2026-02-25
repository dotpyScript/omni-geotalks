// components/ui/Pagination.tsx
'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onChange: (page: number) => void;
  /** Show "Showing X–Y of Z items" info text */
  showInfo?: boolean;
  itemLabel?: string;
  /** Max page number buttons visible before ellipsis collapses */
  maxVisible?: number;
  className?: string;
}

// ─── Page range with ellipsis ─────────────────────────────────────────────────
function buildRange(
  current: number,
  total: number,
  max: number,
): (number | '…')[] {
  if (total <= max) return Array.from({ length: total }, (_, i) => i + 1);

  const half = Math.floor(max / 2);
  let start = Math.max(2, current - half);
  let end = Math.min(total - 1, current + half);

  if (current - 1 <= half) end = Math.min(total - 1, max - 1);
  if (total - current <= half) start = Math.max(2, total - max + 2);

  const pages: (number | '…')[] = [1];
  if (start > 2) pages.push('…');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push('…');
  pages.push(total);

  return pages;
}

// ─── Single page button ───────────────────────────────────────────────────────
// Exact .page-btn from original:
//   38×38px, obsidian-3 bg, border gold-14, clip-path polygon corner 6px,
//   0.78rem DM Sans, hover: border-mid + obsidian-4,
//   active: gold gradient + gold border + obsidian text + font-medium,
//   disabled: opacity-30 cursor-not-allowed
function PageBtn({
  children,
  active = false,
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  'aria-label'?: string;
}) {
  return (
    <motion.button
      type='button'
      whileHover={disabled ? {} : { scale: 1.06 }}
      whileTap={disabled ? {} : { scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        clipPath:
          'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
      }}
      className={cn(
        // .page-btn base
        'w-[38px] h-[38px] flex items-center justify-center shrink-0',
        'text-[0.78rem] border cursor-pointer select-none',
        'transition-all duration-200',
        active
          ? [
              // .page-btn.active
              'bg-gradient-to-br from-[#c9a84c] to-[#e8c97e]',
              'border-[#c9a84c] text-[#080a0f] font-medium',
            ]
          : disabled
            ? [
                // .page-btn:disabled
                'bg-[#12161f] border-[rgba(201,168,76,0.14)]',
                'text-[rgba(240,237,230,0.28)] opacity-30 cursor-not-allowed',
              ]
            : [
                // .page-btn default + hover
                'bg-[#12161f] border-[rgba(201,168,76,0.14)]',
                'text-[rgba(240,237,230,0.55)]',
                'hover:border-[rgba(201,168,76,0.3)]',
                'hover:text-[#f0ede6] hover:bg-[#181d28]',
              ],
      )}
    >
      {children}
    </motion.button>
  );
}

// ─── Main Pagination ──────────────────────────────────────────────────────────
export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 6,
  onChange,
  showInfo = true,
  itemLabel = 'items',
  maxVisible = 7,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const range = buildRange(currentPage, totalPages, maxVisible);

  // Info string: "Showing X–Y of Z webinars"
  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = totalItems
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : currentPage * itemsPerPage;

  return (
    // .disc-pagination: flex, items-center, justify-between
    <div
      className={cn(
        'flex items-center justify-between gap-4 flex-wrap',
        className,
      )}
    >
      {/* .disc-pagination__info */}
      {showInfo && totalItems !== undefined && (
        <p
          className='text-[0.72rem] tracking-[0.08em] text-[rgba(240,237,230,0.28)]'
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Showing{' '}
          <span className='text-[rgba(240,237,230,0.55)]'>
            {from}–{to}
          </span>{' '}
          of{' '}
          <span
            className='text-[#e8c97e] leading-none'
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem' }}
          >
            {totalItems}
          </span>{' '}
          {itemLabel}
        </p>
      )}

      {/* .disc-pagination__controls: flex gap-1.5 */}
      <div className='flex items-center gap-1.5 ml-auto'>
        {/* Prev ‹ */}
        <PageBtn
          disabled={currentPage === 1}
          onClick={() => onChange(currentPage - 1)}
          aria-label='Previous page'
        >
          <ChevronLeft size={14} />
        </PageBtn>

        {/* Numbered pages + ellipsis */}
        {range.map((p, i) =>
          p === '…' ? (
            <span
              key={`ellipsis-${i}`}
              className='w-[38px] h-[38px] flex items-center justify-center text-[rgba(240,237,230,0.22)] text-sm select-none'
            >
              ···
            </span>
          ) : (
            <PageBtn
              key={p}
              active={p === currentPage}
              onClick={() => onChange(p as number)}
              aria-label={`Page ${p}`}
            >
              {p}
            </PageBtn>
          ),
        )}

        {/* Next › */}
        <PageBtn
          disabled={currentPage === totalPages}
          onClick={() => onChange(currentPage + 1)}
          aria-label='Next page'
        >
          <ChevronRight size={14} />
        </PageBtn>
      </div>
    </div>
  );
}
