"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

// Figma: Detail → Galerie (23:284) + lightbox pro „Všechny fotky“ a „Půdorys“
export default function Gallery({ name, photos, plans }: { name: string; photos: string[]; plans: string[] }) {
  const [open, setOpen] = useState<{ list: string[]; index: number } | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((o) => (o ? { ...o, index: (o.index + d + o.list.length) % o.list.length } : o)),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const [main, ...side] = photos;
  const galleryButton = "rounded bg-surface-0 px-4 py-2.5 text-button-m text-navy-900 hover:bg-surface-50 lg:px-5 lg:py-[13px]";

  return (
    <>
      <div className="flex gap-3">
        <div className="relative h-[290px] flex-1 overflow-hidden bg-surface-100 lg:h-[520px] lg:w-[790px] lg:flex-none lg:rounded">
          <button type="button" onClick={() => setOpen({ list: photos, index: 0 })} aria-label="Otevřít galerii" className="absolute inset-0">
            {main && <Image src={main} alt={name} fill priority sizes="(min-width: 1024px) 790px, 100vw" className="object-cover" />}
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2.5 lg:bottom-6 lg:left-6">
            {photos.length > 0 && (
              <button type="button" onClick={() => setOpen({ list: photos, index: 0 })} className={galleryButton}>
                Všechny fotky ({photos.length})
              </button>
            )}
            {plans.length > 0 && (
              <button type="button" onClick={() => setOpen({ list: plans, index: 0 })} className={galleryButton}>
                Půdorys
              </button>
            )}
          </div>
        </div>
        <div className="hidden flex-1 flex-col gap-3 lg:flex">
          {side.slice(0, 2).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setOpen({ list: photos, index: i + 1 })}
              aria-label={`Otevřít fotku ${i + 2}`}
              className="relative h-[254px] overflow-hidden rounded bg-surface-100"
            >
              <Image src={src} alt="" fill sizes="400px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={`Fotografie – ${name}`} className="fixed inset-0 z-50 flex flex-col bg-navy-950/95">
          <div className="flex items-center justify-between px-6 py-4 text-surface-0">
            <p className="text-body-s text-on-dark-muted">
              {open.index + 1} / {open.list.length}
            </p>
            <button type="button" onClick={close} className="text-button-m hover:text-brass-300">
              Zavřít ✕
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={open.list[open.index]} alt={name} fill sizes="100vw" className="object-contain" />
            {open.list.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Předchozí fotka"
                  className="absolute top-1/2 left-4 -translate-y-1/2 rounded bg-surface-0/90 px-4 py-3 text-title-m text-navy-900"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Další fotka"
                  className="absolute top-1/2 right-4 -translate-y-1/2 rounded bg-surface-0/90 px-4 py-3 text-title-m text-navy-900"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
