"use client";

// ─── DiscoveryPagination Props ─────────────────────────────────────────────────

interface DiscoveryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

// ─── DiscoveryPagination ───────────────────────────────────────────────────────
// Shows "Showing X–Y of Z webinars" info text on the left,
// and prev / numbered page buttons / next on the right.

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
    <div
      className={[
        "relative z-[2]",
        "px-[60px]",
        "flex items-center justify-between",
        "max-md:px-6 max-md:flex-col max-md:gap-4",
      ].join(" ")}
    >
      {/* Info label */}
      <p className="text-[0.72rem] text-[rgba(240,237,230,0.28)] tracking-[0.08em]">
        Showing {from}–{to} of {totalResults} webinars
      </p>

      {/* Page buttons */}
      <div className="flex items-center gap-[6px]">
        {/* Previous */}
        <PageButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ‹
        </PageButton>

        {/* Numbered pages */}
        {pages.map((n) => (
          <PageButton
            key={n}
            onClick={() => onPageChange(n)}
            active={currentPage === n}
            aria-label={`Page ${n}`}
          >
            {n}
          </PageButton>
        ))}

        {/* Next */}
        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          ›
        </PageButton>
      </div>
    </div>
  );
}

// ─── PageButton ────────────────────────────────────────────────────────────────

interface PageButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
}

function PageButton({ children, onClick, active = false, disabled = false, ...rest }: PageButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? "page" : undefined}
      className={[
        "w-[38px] h-[38px] flex items-center justify-center",
        "text-[0.78rem] font-['DM_Sans',sans-serif]",
        "border clip-bevel-xs",
        "transition-all duration-[200ms]",
        active
          ? // Active page: gold fill
            "bg-gradient-to-br from-[#c9a84c] to-[#e8c97e] border-[#c9a84c] text-[#080a0f] font-medium"
          : disabled
          ? // Disabled: faded
            "bg-[#12161f] border-[rgba(201,168,76,0.14)] text-[rgba(240,237,230,0.55)] opacity-30 cursor-not-allowed"
          : // Default: obsidian with gold hover
            [
              "bg-[#12161f] border-[rgba(201,168,76,0.14)] text-[rgba(240,237,230,0.55)]",
              "hover:border-[rgba(201,168,76,0.28)] hover:text-[#f0ede6] hover:bg-[#181d28]",
              "cursor-pointer",
            ].join(" "),
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
