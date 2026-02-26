"use client";

import { useState, useEffect, useRef } from "react";

// ─── AboutCounter ──────────────────────────────────────────────────────────────
// Counts from 0 → value with cubic ease-out when it enters the viewport.

interface AboutCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // ms
  className?: string;
}

export function AboutCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
  className = "",
}: AboutCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const tick = (ts: number) => {
            const p = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4); // quartic ease-out
            setCount(Math.floor(eased * value));
            if (p < 1) requestAnimationFrame(tick);
            else setCount(value);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
