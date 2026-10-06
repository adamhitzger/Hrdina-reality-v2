"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// „Více“ u recenze → fotka ručně psané recenze přes celou obrazovku (stejný lightbox jako Gallery)
export default function ReviewPhoto({ src, name }: { src: string; name: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="self-start text-label-m whitespace-pre text-brass-600 hover:text-brass-500">
        {"Více  →"}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Recenze – ${name}`}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex flex-col bg-navy-950/95"
        >
          <div className="flex items-center justify-between px-6 py-4 text-surface-0">
            <p className="text-body-s text-on-dark-muted">{name}</p>
            <button type="button" onClick={() => setOpen(false)} className="text-button-m hover:text-brass-300">
              Zavřít ✕
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={src} alt={`Ručně psaná recenze – ${name}`} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
