"use client";

// ─── GeoMapDecoration ──────────────────────────────────────────────────────────
// Decorative SVG that evokes a geospatial / satellite map grid aesthetic.
// Renders: latitude/longitude grid lines, scatter of data points,
// connecting arcs, and a pulsing "active zone" highlight.
// Purely visual — aria-hidden.

interface GeoMapDecorationProps {
  className?: string;
}

export function GeoMapDecoration({ className = "" }: GeoMapDecorationProps) {
  // Data point positions (x%, y%) representing African cities
  const dataPoints = [
    { x: 48, y: 30, size: 4, label: "Lagos" },
    { x: 52, y: 28, size: 3, label: "Abuja" },
    { x: 55, y: 45, size: 3, label: "Nairobi" },
    { x: 42, y: 22, size: 2.5, label: "Accra" },
    { x: 60, y: 38, size: 2, label: "Dar es Salaam" },
    { x: 45, y: 50, size: 2, label: "Lusaka" },
    { x: 50, y: 60, size: 3, label: "Johannesburg" },
    { x: 38, y: 35, size: 2, label: "Douala" },
    { x: 62, y: 25, size: 2, label: "Addis Ababa" },
    { x: 44, y: 15, size: 2, label: "Bamako" },
    { x: 58, y: 55, size: 2, label: "Maputo" },
    { x: 35, y: 42, size: 1.5, label: "Libreville" },
  ];

  // Arc connections (pairs of point indices)
  const arcs = [
    [0, 1], [0, 4], [1, 9], [2, 5], [4, 6], [0, 7], [2, 8], [5, 10],
  ];

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        {/* ── Grid lines (lat/long) ──────────────────────────────────────── */}
        <g opacity="0.12">
          {/* Horizontal (latitude) */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
              key={`lat-${i}`}
              x1="0" y1={i * 50}
              x2="400" y2={i * 50}
              stroke="#c9a84c"
              strokeWidth="0.5"
              strokeDasharray="4 8"
            />
          ))}
          {/* Vertical (longitude) */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <line
              key={`lon-${i}`}
              x1={i * 50} y1="0"
              x2={i * 50} y2="300"
              stroke="#c9a84c"
              strokeWidth="0.5"
              strokeDasharray="4 8"
            />
          ))}
        </g>

        {/* ── Diagonal accent lines ──────────────────────────────────────── */}
        <g opacity="0.06">
          <line x1="0" y1="300" x2="400" y2="0" stroke="#c9a84c" strokeWidth="0.8" />
          <line x1="100" y1="300" x2="400" y2="75" stroke="#c9a84c" strokeWidth="0.4" />
          <line x1="0" y1="200" x2="300" y2="0" stroke="#c9a84c" strokeWidth="0.4" />
        </g>

        {/* ── Connecting arc lines between cities ───────────────────────── */}
        {arcs.map(([a, b], i) => {
          const p1 = dataPoints[a];
          const p2 = dataPoints[b];
          const x1 = (p1.x / 100) * 400;
          const y1 = (p1.y / 100) * 300;
          const x2 = (p2.x / 100) * 400;
          const y2 = (p2.y / 100) * 300;
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2 - 30;
          return (
            <path
              key={`arc-${i}`}
              d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
              fill="none"
              stroke="#c9a84c"
              strokeWidth="0.6"
              opacity="0.18"
              strokeDasharray="3 5"
            />
          );
        })}

        {/* ── Africa continent outline (simplified polygon) ─────────────── */}
        <polygon
          points="160,20 200,18 230,30 250,55 255,80 240,110 250,140 240,170 220,200 200,225 170,235 140,220 120,190 110,160 115,130 105,100 115,70 135,45"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="0.8"
          opacity="0.14"
        />

        {/* ── Data points (cities) ──────────────────────────────────────── */}
        {dataPoints.map((pt, i) => {
          const cx = (pt.x / 100) * 400;
          const cy = (pt.y / 100) * 300;
          const isMain = i === 0; // Lagos highlighted
          return (
            <g key={`pt-${i}`}>
              {/* Outer pulse ring on main point */}
              {isMain && (
                <>
                  <circle
                    cx={cx} cy={cy} r={pt.size + 10}
                    fill="none"
                    stroke="#c9a84c"
                    strokeWidth="0.6"
                    opacity="0.2"
                    style={{ animation: "geoRingPulse 3s ease-out infinite" }}
                  />
                  <circle
                    cx={cx} cy={cy} r={pt.size + 20}
                    fill="none"
                    stroke="#c9a84c"
                    strokeWidth="0.3"
                    opacity="0.1"
                    style={{ animation: "geoRingPulse 3s ease-out infinite 0.5s" }}
                  />
                </>
              )}
              {/* Cross-hair markers */}
              <line
                x1={cx - pt.size - 4} y1={cy}
                x2={cx + pt.size + 4} y2={cy}
                stroke="#c9a84c" strokeWidth="0.5" opacity="0.4"
              />
              <line
                x1={cx} y1={cy - pt.size - 4}
                x2={cx} y2={cy + pt.size + 4}
                stroke="#c9a84c" strokeWidth="0.5" opacity="0.4"
              />
              {/* Core dot */}
              <circle
                cx={cx} cy={cy} r={pt.size}
                fill={isMain ? "#c9a84c" : "rgba(201,168,76,0.6)"}
                opacity={isMain ? 1 : 0.7}
              />
              {/* Inner bright dot */}
              <circle
                cx={cx} cy={cy} r={pt.size * 0.4}
                fill="#f5e6c0"
                opacity="0.9"
              />
            </g>
          );
        })}

        {/* ── Corner scan-frame ─────────────────────────────────────────── */}
        {/* Top-left */}
        <path d="M 0 20 L 0 0 L 20 0" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
        {/* Top-right */}
        <path d="M 380 0 L 400 0 L 400 20" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
        {/* Bottom-left */}
        <path d="M 0 280 L 0 300 L 20 300" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
        {/* Bottom-right */}
        <path d="M 380 300 L 400 300 L 400 280" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />

        {/* ── Scan line animation ───────────────────────────────────────── */}
        <line
          x1="0" y1="0"
          x2="400" y2="0"
          stroke="#c9a84c"
          strokeWidth="1"
          opacity="0.3"
          style={{ animation: "geoScanLine 4s linear infinite" }}
        />

        {/* ── Coordinate text labels ────────────────────────────────────── */}
        <text x="4" y="12" fill="#c9a84c" fontSize="7" opacity="0.35" fontFamily="monospace">6.46°N</text>
        <text x="350" y="12" fill="#c9a84c" fontSize="7" opacity="0.35" fontFamily="monospace">3.39°E</text>
        <text x="4" y="296" fill="#c9a84c" fontSize="7" opacity="0.35" fontFamily="monospace">−26.20°S</text>
      </svg>

      {/* Keyframes injected via style tag — scoped to this decoration */}
      <style>{`
        @keyframes geoRingPulse {
          0%   { r: 12; opacity: 0.4; }
          100% { r: 28; opacity: 0; }
        }
        @keyframes geoScanLine {
          0%   { transform: translateY(0px);   opacity: 0.3; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(300px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
