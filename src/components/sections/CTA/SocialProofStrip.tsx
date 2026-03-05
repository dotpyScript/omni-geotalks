"use client";

import CountUp from "./CountUp";
import { SOCIAL_PROOF } from "./constants";
import type { SocialProofItem } from "./types";

export default function SocialProofStrip() {
  return (
    <div
      className={[
        "relative z-2",
        "border-t border-(--border)",
        "px-15 py-7",
        "flex items-center justify-between gap-8 flex-wrap",
        "max-md:px-6 max-md:gap-4",
      ].join(" ")}
      style={{ background: "color-mix(in srgb, var(--obsidian) 40%, transparent)" }}
    >
      {SOCIAL_PROOF.map((item, i) =>
        item === null ? (
          /* Vertical divider */
          <div key={`div-${i}`} className="w-px h-9 bg-(--border) max-md:hidden" />
        ) : (
          /* Stat item */
          <div
            key={i}
            className="flex items-center gap-3.5 text-[0.7rem] text-(--ivory-muted) tracking-[0.08em]"
          >
            <span className="font-bebas text-[1.8rem] tracking-[0.05em] text-(--gold-light) leading-none">
              <CountUp to={(item as SocialProofItem).num} />
              {(item as SocialProofItem).suffix}
            </span>
            <span>{(item as SocialProofItem).label}</span>
          </div>
        )
      )}
    </div>
  );
}
