"use client";

// ─── SpotlightPortrait ──────────────────────────────────────────────────────────
// The large circular portrait in the left spotlight panel.
// Renders two orbital rings (spinning dashed + faint solid) and the avatar.

interface SpotlightPortraitProps {
  initials: string;
}

export function SpotlightPortrait({ initials }: SpotlightPortraitProps) {
  return (
    <div className="absolute inset-0 z-1 flex items-center justify-center">
      <div className="relative w-65 h-65">

        {/* Outer faint ring — spins counter-clockwise */}
        <span
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none -top-8 -right-8 -bottom-8 -left-8 animate-spin-slow-reverse"
          style={{ border: "1px solid var(--border)" }}
        />

        {/* Inner dashed ring — spins clockwise */}
        <span
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none -top-4 -right-4 -bottom-4 -left-4 animate-spin-slow"
          style={{ border: "1px dashed var(--border-mid)" }}
        />

        {/* Avatar circle */}
        <div
          className={[
            "w-65 h-65 rounded-full overflow-hidden",
            "border-[3px]",
            "bg-(--obsidian-3)",
            "flex items-center justify-center",
            "transition-shadow duration-400",
          ].join(" ")}
          style={{
            borderColor: "var(--border-mid)",
            boxShadow: "0 0 60px var(--gold-glow), 0 0 0 1px var(--border)",
          }}
        >
          {/* Initials */}
          <span
            className={[
              "font-cormorant font-light text-[5rem]",
              "tracking-[-0.02em] text-(--gold-light)",
              "bg-linear-to-br from-(--obsidian-4) to-(--obsidian-3)",
              "w-full h-full rounded-full flex items-center justify-center",
              "transition-all duration-400",
            ].join(" ")}
          >
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
}
