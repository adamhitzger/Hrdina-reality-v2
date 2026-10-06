"use client";

import { useId, useState, type ReactNode } from "react";

// Figma: 02 · Provázíme vás domů – záložky „O Hrdina reality“ / „Služby“ (63:915, 64:943)
export default function HomeTabs({ tabs }: { tabs: { label: string; panel: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <div>
      <div role="tablist" className="flex gap-7 border-b border-line-200 lg:gap-10">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            onClick={() => setActive(i)}
            className={`-mb-px pb-[14px] text-title-s whitespace-nowrap transition-colors lg:pb-[18px] lg:text-title-m ${
              active === i ? "border-b-2 border-brass-500 text-ink-900" : "text-ink-300 hover:text-ink-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          className="pt-8 lg:pt-12"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
