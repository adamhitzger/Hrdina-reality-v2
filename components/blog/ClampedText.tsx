"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { linkArrow } from "@/components/ui/button";

// Text vedle fotky v článku: od lg ho výška fotky ořízne (obsah je absolutně, takže výšku řádku určuje jen fotka).
// Ořez je v CSS, aby po hydrataci nic neposkočilo. JS jen zjistí, jestli text přetéká, a pak ukáže „Číst dál“.
// Na mobilu je fotka nad textem a text je celý.
export default function ClampedText({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || open) return;
    const check = () => setOverflow(el.scrollHeight > el.clientHeight + 1);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, [open]);

  const collapsed = overflow && !open;

  return (
    <div ref={root} className="flex min-w-0 flex-1 flex-col gap-5">
      <div className="relative lg:flex-1">
        <div
          ref={ref}
          className={`${open ? "" : "lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-center-safe lg:overflow-hidden"} ${
            collapsed ? "lg:[mask-image:linear-gradient(to_bottom,black_75%,transparent)]" : ""
          }`}
        >
          <div className="flex flex-col gap-5">{children}</div>
        </div>
      </div>
      {overflow && (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => {
            setOpen(!open);
            // Po sbalení vrátit čtenáře na začátek sekce, jinak by zůstal daleko pod ní
            if (open) root.current?.scrollIntoView({ block: "nearest" });
          }}
          className={`${linkArrow} self-start max-lg:hidden`}
        >
          {open ? "Zobrazit méně ↑" : "Číst dál ↓"}
        </button>
      )}
    </div>
  );
}
