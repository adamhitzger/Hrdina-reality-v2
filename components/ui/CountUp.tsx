"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1600;

// Rozloží „400+“, „38 dní“, „4,9 / 5“, „98 %“ na text před číslem, číslo, počet desetinných míst a zbytek
function parse(value: string) {
  const m = value.match(/^(\D*?)(\d+(?:[,.]\d+)?)([^]*)$/);
  if (!m) return null;
  const [, before, num, after] = m;
  const decimals = num.split(/[,.]/)[1]?.length ?? 0;
  return { before, target: Number(num.replace(",", ".")), decimals, after };
}

function format(n: number, decimals: number) {
  return n.toLocaleString("cs-CZ", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// Číslo se při prvním zobrazení napočítá od nuly. Server vykreslí konečnou hodnotu (Google, bez JS),
// při omezení pohybu se nic neanimuje. Čtečky dostanou rovnou konečnou hodnotu.
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = parse(value);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    setCurrent(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          const eased = 1 - Math.pow(1 - t, 3);
          setCurrent(parsed.target * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // Hodnota se během života komponenty nemění
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!parsed) return <span className={className}>{value}</span>;

  const shown = current === null ? value : `${parsed.before}${format(current, parsed.decimals)}${parsed.after}`;
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      <span aria-hidden>{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
