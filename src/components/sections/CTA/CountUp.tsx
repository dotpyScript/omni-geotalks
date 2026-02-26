"use client";

import { useState, useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  duration?: number;
}

/**
 * Animates a number from 0 → `to` using a cubic ease-out curve.
 * The animation only starts once the element scrolls into view (threshold 0.4).
 */
export default function CountUp({ to, duration = 1600 }: CountUpProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();

          const tick = (ts: number) => {
            const p = Math.min((ts - t0) / duration, 1);
            const e = 1 - Math.pow(1 - p, 3); // cubic ease-out
            setVal(Math.floor(e * to));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val.toLocaleString()}</span>;
}
