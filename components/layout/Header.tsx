import Link from "next/link";

import { button } from "@/components/ui/button";
import { telHref } from "@/lib/format";
import { mainNav } from "@/lib/nav";
import { site } from "@/lib/site";

import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="relative z-40 border-b border-line-200 bg-surface-0">
      <div className="container-site flex h-16 items-center justify-between px-5 lg:h-[88px] lg:gap-6 lg:px-8 xl:px-16">
        <Logo />

        <nav aria-label="Hlavní navigace" className="hidden items-center gap-6 lg:flex xl:gap-9">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-nav-m whitespace-nowrap text-ink-700 hover:text-navy-900">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a href={telHref(site.phone)} className="hidden text-button-m tracking-normal whitespace-nowrap text-navy-900 xl:inline">
            {site.phone}
          </a>
          <Link href="/kontakt" className={button.brass}>
            Nezávazná konzultace
          </Link>
        </div>

        <div className="flex items-center gap-[18px] lg:hidden">
          <a href={telHref(site.phone)} className="rounded bg-brass-500 px-[14px] py-[9px] text-label-s text-surface-0">
            Zavolat
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
