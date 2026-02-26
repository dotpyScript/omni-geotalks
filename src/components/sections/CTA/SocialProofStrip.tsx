"use client";

import CountUp from "./CountUp";
import { SOCIAL_PROOF } from "./constants";
import type { SocialProofItem } from "./types";

export default function SocialProofStrip() {
  return (
    /*
     * .cta-social-proof
     * Desktop: row, space-between, 60px padding
     * ≤768px : 24px padding, dividers hidden
     */
    <div
      className={[
        "relative z-[2]",
        "border-t border-border",
        "px-[60px] py-7",
        "flex items-center justify-between gap-8 flex-wrap",
        "bg-[rgba(8,10,15,0.4)]",
        "max-md:px-6 max-md:gap-4",
      ].join(" ")}
    >
      {SOCIAL_PROOF.map((item, i) =>
        item === null ? (
          /* Vertical divider — hidden on mobile (.cta-sp-divider) */
          <div
            key={`div-${i}`}
            className="w-px h-9 bg-border max-md:hidden"
          />
        ) : (
          /* Stat item (.cta-sp-item) */
          <div
            key={i}
            className="flex items-center gap-[14px] text-[0.7rem] text-ivory-muted tracking-[0.08em]"
          >
            {/* Animated number (.cta-sp-num) */}
            <span className="font-bebas text-[1.8rem] tracking-[0.05em] text-gold-light leading-none">
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
