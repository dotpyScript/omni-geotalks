"use client";

// ─── SpeakerAvatar ─────────────────────────────────────────────────────────────
// Renders the circular initials avatar used in both the roster list
// and the spotlight panel (via SpotlightPortrait).

interface SpeakerAvatarProps {
  initials: string;
  /** Size variant */
  size?: "sm" | "lg";
  /** Whether this avatar is currently active/selected */
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
        "relative flex items-center justify-center rounded-full flex-shrink-0 overflow-hidden",
        "font-['Cormorant_Garamond',serif] font-normal",
        "bg-gradient-to-br from-[#181d28] to-[#12161f]",
        "border transition-[border-color,box-shadow] duration-[250ms]",
        // size
        isSm ? "w-[52px] h-[52px] text-[1.1rem]" : "w-[260px] h-[260px] text-[5rem] font-light tracking-[-0.02em]",
        // border & glow
        active
          ? "border-[#c9a84c] shadow-[0_0_16px_rgba(201,168,76,0.2)]"
          : "border-[rgba(201,168,76,0.14)]",
        "text-[#e8c97e]",
        // shimmer overlay on active (sm only)
        "group",
      ].join(" ")}
      aria-label={`Speaker initials: ${initials}`}
    >
      {initials}

      {/* Shimmer layer — shown when active (small variant) */}
      {active && isSm && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgba(201,168,76,0.15)] to-transparent"
        />
      )}
    </div>
  );
}
