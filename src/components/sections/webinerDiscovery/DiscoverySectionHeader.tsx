"use client";

// ─── DiscoverySectionHeader Props ─────────────────────────────────────────────

interface DiscoverySectionHeaderProps {
  eyebrow?: string;
  title?: React.ReactNode;
  /** Number of currently visible/filtered results */
  filteredCount: number;
  /** Total number of webinars in the dataset */
  totalCount: number;
}

// ─── DiscoverySectionHeader ───────────────────────────────────────────────────
// Top header bar: eyebrow + title on the left, results count on the right.

export function DiscoverySectionHeader({
  eyebrow = "Expert-Led Sessions",
  title = (
    <>
      Discover <em className="italic text-[#e8c97e]">Webinars</em>
    </>
  ),
  filteredCount,
  totalCount,
}: DiscoverySectionHeaderProps) {
  const isFiltered = filteredCount !== totalCount;

  return (
    <div
      className={[
        "relative z-[2]",
        "px-[60px] pt-[100px] pb-[60px]",
        "flex items-end justify-between gap-10",
        "border-b border-[rgba(201,168,76,0.14)]",
        // mobile
        "max-md:px-6 max-md:pt-[60px] max-md:pb-10 max-md:flex-col max-md:items-start max-md:gap-4",
      ].join(" ")}
    >
      {/* Left: eyebrow + title */}
      <div>
        <div className="flex items-center gap-[14px] mb-5">
          <span
            aria-hidden="true"
            className="w-8 h-px bg-gradient-to-r from-transparent to-[#c9a84c]"
          />
          <span className="text-[0.68rem] tracking-[0.35em] uppercase text-[#c9a84c] font-normal">
            {eyebrow}
          </span>
        </div>

        <h2
          className={[
            "font-['Cormorant_Garamond',serif] font-light leading-[1.08]",
            "text-[#f0ede6] text-[clamp(2.4rem,4vw,3.8rem)]",
          ].join(" ")}
        >
          {title}
        </h2>
      </div>

      {/* Right: result count */}
      <div className="flex items-center gap-5 flex-shrink-0">
        <div className="text-[0.72rem] tracking-[0.15em] uppercase text-[rgba(240,237,230,0.28)]">
          <strong className="font-['Bebas_Neue',sans-serif] text-[1.5rem] tracking-[0.05em] text-[#e8c97e] mr-[6px]">
            {filteredCount}
          </strong>
          {isFiltered ? "Results Found" : "Total Events"}
        </div>
      </div>
    </div>
  );
}
