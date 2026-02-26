"use client";

import type { Guarantee } from "./types";
import { GUARANTEES } from "./constants";

// ─── Individual guarantee item ────────────────────────────────────────────────
function GuaranteeItem({ guarantee }: { guarantee: Guarantee }) {
  return (
    /*
     * Replicates .hiw-guarantee__item
     * Each item has horizontal padding and a right border (removed on last child).
     * first:pl-0 removes left padding on the first item.
     * last:border-r-0 removes the right border on the last item.
     * clip-corner-sm comes from globals.css for the icon box.
     */
    <div
      className={[
        "flex items-center gap-4 px-8",
        "first:pl-0",
        "border-r border-border last:border-r-0",
        /* responsive ≤1100px: remove border + padding */
        "max-[1100px]:border-r-0 max-[1100px]:p-0",
      ].join(" ")}
    >
      {/* Icon box — clip-corner-sm from globals.css */}
      <div
        className={[
          "w-10 h-10 flex-shrink-0",
          "flex items-center justify-center text-[1rem]",
          "border border-border bg-gold-dim text-gold",
          "clip-corner-sm",
        ].join(" ")}
      >
        {guarantee.icon}
      </div>

      {/* Text block */}
      <div>
        <div className="text-[0.72rem] font-medium text-ivory-dim tracking-[0.05em] mb-[3px]">
          {guarantee.title}
        </div>
        <div className="text-[0.62rem] text-ivory-muted font-light tracking-[0.04em]">
          {guarantee.sub}
        </div>
      </div>
    </div>
  );
}

// ─── GuaranteeStrip ───────────────────────────────────────────────────────────
export default function GuaranteeStrip() {
  return (
    /*
     * Replicates .hiw-guarantee
     * Desktop: 4-col grid
     * ≤1100px : 2-col grid with gap
     * ≤768px  : 1-col
     */
    <div
      className={[
        "relative z-[2]",
        "border-t border-border",
        "px-[60px] py-8",
        "grid grid-cols-4 gap-0",
        "bg-[rgba(8,10,15,0.5)]",
        /* responsive */
        "max-[1100px]:grid-cols-2 max-[1100px]:gap-6",
        "max-md:grid-cols-1 max-md:px-6",
      ].join(" ")}
    >
      {GUARANTEES.map((g, i) => (
        <GuaranteeItem key={i} guarantee={g} />
      ))}
    </div>
  );
}
