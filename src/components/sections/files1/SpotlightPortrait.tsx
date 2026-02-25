"use client";

// ─── SpotlightPortrait ──────────────────────────────────────────────────────────
// The large circular portrait in the left spotlight panel.
// Renders two orbital rings (spinning dashed + faint solid) and the avatar.

interface SpotlightPortraitProps {
  initials: string;
}

export function SpotlightPortrait({ initials }: SpotlightPortraitProps) {
  return (
    // Centered absolutely within the spotlight panel
    <div className="absolute inset-0 z-[1] flex items-center justify-center">
      {/* Ring wrapper — rings are pseudo-elements via Tailwind `before:` / `after:` */}
      <div className="relative w-[260px] h-[260px]">

        {/* Outer faint ring — spins counter-clockwise */}
        <span
          aria-hidden="true"
          className={[
            "absolute rounded-full pointer-events-none",
            "border border-[rgba(201,168,76,0.08)]",
            // -32px inset on all sides
            "top-[-32px] right-[-32px] bottom-[-32px] left-[-32px]",
            "animate-[spinSlowReverse_35s_linear_infinite]",
          ].join(" ")}
        />

        {/* Inner dashed ring — spins clockwise */}
        <span
          aria-hidden="true"
          className={[
            "absolute rounded-full pointer-events-none",
            "border border-dashed border-[rgba(201,168,76,0.25)]",
            // -16px inset
            "top-[-16px] right-[-16px] bottom-[-16px] left-[-16px]",
            "animate-[spinSlow_20s_linear_infinite]",
          ].join(" ")}
        />

        {/* Avatar circle */}
        <div
          className={[
            "w-[260px] h-[260px] rounded-full overflow-hidden",
            "border-[3px] border-[rgba(201,168,76,0.25)]",
            "shadow-[0_0_60px_rgba(201,168,76,0.15),0_0_0_1px_rgba(201,168,76,0.12)]",
            "bg-[#12161f]",
            "flex items-center justify-center",
            "transition-shadow duration-[400ms]",
          ].join(" ")}
        >
          {/* Initials */}
          <span
            className={[
              "font-['Cormorant_Garamond',serif] font-light text-[5rem]",
              "tracking-[-0.02em] text-[#e8c97e]",
              "bg-gradient-to-br from-[#181d28] to-[#12161f]",
              "w-full h-full rounded-full flex items-center justify-center",
              "transition-all duration-[400ms]",
            ].join(" ")}
          >
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
}
