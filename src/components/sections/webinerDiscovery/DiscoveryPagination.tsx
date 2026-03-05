'use client';

interface DiscoveryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

export function DiscoveryPagination({
  currentPage,
  totalPages,
  totalResults,
  perPage,
  onPageChange,
}: DiscoveryPaginationProps) {
  if (totalPages <= 1) return null;

  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalResults);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='relative z-10 px-6 sm:px-10 lg:px-16 pb-24 pt-4 flex items-center justify-between flex-wrap gap-4'>
      {/* Info */}
      <p
        className='text-[0.68rem] tracking-[0.1em]'
        style={{ color: 'var(--ivory-muted)' }}
      >
        Showing{' '}
        <strong
          className='font-bebas text-[0.95rem] tracking-[0.04em]'
          style={{ color: 'var(--gold-light)' }}
        >
          {from}–{to}
        </strong>{' '}
        of{' '}
        <strong className='font-normal' style={{ color: 'var(--ivory-dim)' }}>
          {totalResults}
        </strong>{' '}
        sessions
      </p>

      {/* Page buttons */}
      <div className='flex items-center gap-1.5'>
        <PageBtn
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label='Previous page'
        >
          ‹
        </PageBtn>

        {pages.map((n) => (
          <PageBtn
            key={n}
            onClick={() => onPageChange(n)}
            active={currentPage === n}
            aria-label={`Page ${n}`}
          >
            {n}
          </PageBtn>
        ))}

        <PageBtn
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label='Next page'
        >
          ›
        </PageBtn>
      </div>
    </div>
  );
}

// ─── PageBtn ──────────────────────────────────────────────────────────────────

interface PageBtnProps {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
}

function PageBtn({
  children,
  onClick,
  active = false,
  disabled = false,
  ...rest
}: PageBtnProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
      className='w-9 h-9 flex items-center justify-center text-[0.76rem] font-dm clip-bevel-xs transition-all duration-200 cursor-pointer disabled:cursor-not-allowed'
      style={{
        background: active
          ? 'linear-gradient(135deg, var(--gold), var(--gold-light))'
          : 'var(--obsidian-3)',
        border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
        color: active
          ? '#080a0f'
          : disabled
            ? 'var(--ivory-muted)'
            : 'var(--ivory-dim)',
        opacity: disabled && !active ? 0.35 : 1,
        fontWeight: active ? 500 : 400,
      }}
      onMouseEnter={(e) => {
        if (!active && !disabled) {
          (e.currentTarget as HTMLElement).style.borderColor =
            'var(--border-mid)';
          (e.currentTarget as HTMLElement).style.color = 'var(--ivory)';
          (e.currentTarget as HTMLElement).style.background =
            'var(--obsidian-4)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active && !disabled) {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLElement).style.color = 'var(--ivory-dim)';
          (e.currentTarget as HTMLElement).style.background =
            'var(--obsidian-3)';
        }
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
