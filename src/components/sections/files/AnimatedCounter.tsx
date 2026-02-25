"use client";

import { useState, useEffect, useRef } from "react";

// ─── AnimatedCounter ───────────────────────────────────────────────────────────
// Counts up from 0 → value when the element enters the viewport.

interface AnimatedCounterProps {
  /** The numeric target value to count up to */
  value: number;
  /** Optional suffix appended after the number, e.g. "h" for hours */
  suffix?: string;
  /** Animation duration in milliseconds (default: 1400) */
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1400,
}: AnimatedCounterProps) {
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

          const animate = (ts: number) => {
            const progress = Math.min((ts - startTime) / duration, 1);
            // Cubic ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
