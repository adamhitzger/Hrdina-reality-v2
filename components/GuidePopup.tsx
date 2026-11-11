"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { button } from "@/components/ui/button";
import { GUIDE_PAGES, GUIDE_PATH } from "@/lib/guide";
import mesto from "@/public/images/pruvodce/mesto.webp";

// Po 15 s na webu nabídne průvodce zdarma (/pruvodce). Na /pruvodce se neukáže a po zavření
// nebo prokliku se 30 dní neukáže znovu. Časovač běží jednou za návštěvu, v app/(pages)/layout.tsx
// se komponenta při navigaci nepřipojuje znovu.
const DELAY_MS = 15_000;
const STORAGE_KEY = "guide-popup-dismissed";
const HIDE_FOR_MS = 30 * 24 * 60 * 60 * 1000;

function dismissedRecently() {
  try {
    const at = Number(localStorage.getItem(STORAGE_KEY));
    return at > 0 && Date.now() - at < HIDE_FOR_MS;
  } catch {
    return false;
  }
}

function rememberDismiss() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // soukromé okno / zablokované úložiště: příště se okno ukáže znovu
  }
}

export default function GuidePopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dismissedRecently()) return;
    const timer = setTimeout(() => {
      if (window.location.pathname.startsWith(GUIDE_PATH) || dismissedRecently()) return;
      dialogRef.current?.showModal();
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="guide-popup-title"
      onClose={rememberDismiss}
      // klik na ztmavené pozadí (mimo obsah) okno zavře
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto w-[calc(100%-32px)] max-w-[560px] overflow-hidden rounded bg-surface-0 p-0 shadow-[0_24px_60px_-20px_rgba(2,31,64,0.45)] backdrop:bg-navy-950/60 open:motion-safe:animate-fade-up"
    >
      <div className="relative">
        <div className="bg-surface-100 px-8 pt-8">
          <Image src={mesto} alt="" sizes="(max-width: 592px) 100vw, 496px" className="h-auto w-full" />
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Zavřít"
          className="absolute top-3 right-3 flex size-9 items-center justify-center rounded bg-surface-0/90 text-[22px] leading-none text-navy-900 hover:bg-surface-0"
        >
          ×
        </button>
      </div>
      <div className="px-6 pt-7 pb-8 md:px-10 md:pb-10">
        <p className="text-label-s text-brass-500">Zdarma ke stažení · {GUIDE_PAGES} stran PDF</p>
        <h2 id="guide-popup-title" className="mt-3 font-serif text-heading-s text-navy-900">
          Průvodce světem nemovitostí
        </h2>
        <p className="mt-3 text-body-m text-ink-500">
          Praktické rady pro prodávající, kupující, pronajímatele i nájemce. Na co si dát pozor a co ověřit dřív, než něco podepíšete.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href={GUIDE_PATH} onClick={close} className={`${button.primary} w-full sm:w-auto`}>
            Chci průvodce zdarma
          </Link>
          <button type="button" onClick={close} className="py-3 text-button-m text-ink-500 hover:text-navy-900 sm:px-4">
            Teď ne
          </button>
        </div>
      </div>
    </dialog>
  );
}
