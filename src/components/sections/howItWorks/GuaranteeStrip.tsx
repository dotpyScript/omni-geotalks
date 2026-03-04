"use client";

import type { Guarantee } from "./types";
import { GUARANTEES } from "./constants";

function GuaranteeItem({ guarantee }: { guarantee: Guarantee }) {
  return (
    <div
      className={[
        "flex items-center gap-4 px-8",
        "first:pl-0",
        "border-r border-(--border) last:border-r-0",
        "max-[1100px]:border-r-0 max-[1100px]:p-0",
      ].join(" ")}
    >
      {/* Icon box */}
      <div
        className={[
          "w-10 h-10 shrink-0",
          "flex items-center justify-center text-[1rem]",
          "border border-(--border) bg-(--gold-dim) text-(--gold)",
          "clip-corner-sm",
        ].join(" ")}
      >
        {guarantee.icon}
      </div>

      {/* Text */}
      <div>
        <div className="text-[0.72rem] font-medium text-(--ivory-dim) tracking-[0.05em] mb-0.75">
          {guarantee.title}
        </div>
        <div className="text-[0.62rem] text-(--ivory-muted) font-light tracking-[0.04em]">
          {guarantee.sub}
        </div>
      </div>
    </div>
  );
}

export default function GuaranteeStrip() {
  return (
    <div
      className={[
        "relative z-2",
        "border-t border-(--border)",
        "px-15 py-8",
        "grid grid-cols-4 gap-0",
        "max-[1100px]:grid-cols-2 max-[1100px]:gap-6",
        "max-md:grid-cols-1 max-md:px-6",
      ].join(" ")}
      // Theme-aware semi-transparent surface: dark = near-black tint, light = parchment tint
      style={{ background: "color-mix(in srgb, var(--obsidian) 50%, transparent)" }}
    >
      {GUARANTEES.map((g, i) => (
        <GuaranteeItem key={i} guarantee={g} />
      ))}
    </div>
  );
}
