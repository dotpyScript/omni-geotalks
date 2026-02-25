"use client";

// ─── CardPattern ───────────────────────────────────────────────────────────────
// Renders an SVG grid/diagonal-line pattern behind each category card.
// The `color` prop is a raw CSS color string (rgba, hex, etc.)

interface CardPatternProps {
  /** Raw CSS color string for the grid lines, e.g. "rgba(0,100,200,0.07)" */
  color: string;
}

export function CardPattern({ color }: CardPatternProps) {
  // Derive a safe id from the color string (strip all non-alphanumeric chars)
  const id = `pat-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.55]"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          {/* Single diagonal stroke — top-right corner to bottom-left corner of each tile */}
          <path
            d="M 36 0 L 0 0 0 36"
            fill="none"
            stroke={color}
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
