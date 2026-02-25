"use client";

// ─── BackgroundDecor ───────────────────────────────────────────────────────────
// Purely decorative: ambient radial glow blobs + vertical hairlines.
// Rendered as aria-hidden so screen readers skip it entirely.

interface BackgroundDecorProps {
  /**
   * Relative positions (0-100) of the vertical hairlines as percentages of
   * the container width. Defaults to the original five positions.
   */
  linePositions?: number[];
}

export function BackgroundDecor({
  linePositions = [15, 30, 50, 70, 85],
}: BackgroundDecorProps) {
  return (
    <>
      {/* ── Top-right gold ambient glow ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[200px] -right-[300px]
          w-[700px] h-[700px] z-0
          bg-[radial-gradient(ellipse,rgba(201,168,76,0.05)_0%,transparent_65%)]"
      />

      {/* ── Bottom-left cyan ambient glow ────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[100px] -left-[200px]
          w-[500px] h-[500px] z-0
          bg-[radial-gradient(ellipse,rgba(0,212,255,0.04)_0%,transparent_65%)]"
      />

      {/* ── Vertical hairlines ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {linePositions.map((pos) => (
          <span
            key={pos}
            className="absolute top-0 bottom-0 w-px
              bg-[linear-gradient(180deg,transparent,rgba(201,168,76,0.06),transparent)]"
            style={{ left: `${pos}%` }}
          />
        ))}
      </div>
    </>
  );
}
