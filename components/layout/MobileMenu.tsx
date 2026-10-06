"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { button } from "@/components/ui/button";
import { telHref } from "@/lib/format";
import { footerNav } from "@/lib/nav";
import { site } from "@/lib/site";

export default function MobileMenu() {
  const pathname = usePathname();
  // Menu je otevřené jen na stránce, kde se otevřelo → po navigaci se samo zavře
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        onClick={() => setOpenOn(open ? null : pathname)}
        className="flex h-6 w-[22px] flex-col items-start justify-center gap-[5px]"
      >
        <span className={`h-[2px] w-[22px] rounded-[1px] bg-navy-900 transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
        <span className={`h-[2px] w-[22px] rounded-[1px] bg-navy-900 transition-opacity ${open ? "opacity-0" : ""}`} />
        <span className={`h-[2px] w-[22px] rounded-[1px] bg-navy-900 transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line-200 bg-surface-0 px-6 pt-4 pb-8 shadow-lg"
      >
        <nav aria-label="Mobilní navigace" className="flex flex-col">
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="border-b border-line-200 py-4 text-title-s text-ink-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <a href={telHref(site.phone)} className="mt-6 block text-title-s text-navy-900">
          {site.phone}
        </a>
        <Link href="/kontakt" className={`${button.brass} mt-4 w-full py-4`}>
          Nezávazná konzultace
        </Link>
      </div>
    </>
  );
}
