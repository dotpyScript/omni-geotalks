"use client";

// ─── SpeakerAvatar ─────────────────────────────────────────────────────────────
// Renders the circular initials avatar used in both the roster list
// and the spotlight panel (via SpotlightPortrait).

interface SpeakerAvatarProps {
  initials: string;
  size?: "sm" | "lg";
  active?: boolean;
}

export function SpeakerAvatar({
  initials,
  size = "sm",
  active = false,
}: SpeakerAvatarProps) {
  const isSm = size === "sm";

  return (
    <div
      className={[
        "relative flex items-center justify-center rounded-full shrink-0 overflow-hidden",
        "font-cormorant font-normal",
        // Theme-aware gradient: obsidian-4 → obsidian-3
        "bg-linear-to-br from-(--obsidian-4) to-(--obsidian-3)",
        "border transition-[border-color,box-shadow] duration-250",
        // size
        isSm ? "w-13 h-13 text-[1.1rem]" : "w-65 h-65 text-[5rem] font-light tracking-[-0.02em]",
        // border & glow — theme-aware via CSS vars
        active
          ? "border-(--gold)"
          : "border-(--border)",
        "text-(--gold-light)",
      ].join(" ")}
      style={active ? { boxShadow: "0 0 16px var(--gold-glow)" } : undefined}
      aria-label={`Speaker initials: ${initials}`}
    >
      {initials}

      {/* Shimmer layer — shown when active (small variant) */}
      {active && isSm && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-linear-to-br from-(--gold-glow) to-transparent"
        />
      )}
    </div>
  );
}
