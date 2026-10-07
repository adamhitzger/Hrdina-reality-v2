import Image from "next/image";
import Link from "next/link";

import { telHref } from "@/lib/format";
import { footerNav } from "@/lib/nav";
import { site } from "@/lib/site";
import hrMark from "@/public/images/hr-mark.png";

export default function Footer() {
  return (
    <footer className="bg-navy-950">
      <div className="container-site px-6 pt-14 pb-8 lg:px-[120px] lg:pt-[88px] lg:pb-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-[18px] lg:gap-5">
            <Link href="/" className="flex items-center gap-3 lg:gap-[14px]">
              <span className="flex size-10 items-center justify-center rounded bg-surface-0 lg:size-[46px]">
                <Image src={hrMark} alt="" className="h-4 w-6 object-contain lg:h-[19px] lg:w-7" />
              </span>
              <span className="text-[12px] leading-4 font-semibold tracking-[1.8px] text-surface-0 uppercase lg:text-[14px] lg:leading-5 lg:tracking-[2.2px]">
                Hrdina Reality
              </span>
            </Link>
            <p className="text-body-s text-on-dark-muted lg:w-[340px]">
              Realitní kancelář v Havlíčkově Brodě. Prodej, pronájem a výkup nemovitostí na Vysočině — už 19 let.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-8 lg:mt-0 lg:flex-row lg:gap-24">
            <div className="flex flex-col gap-3 lg:gap-[14px]">
              <p className="mb-1 text-label-s text-brass-300 lg:mb-1.5">Stránky</p>
              {footerNav.map((item) => (
                <Link key={item.href} href={item.href} className="text-nav-m text-on-dark-muted hover:text-surface-0">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3 lg:gap-[14px]">
              <p className="mb-1 text-label-s text-brass-300 lg:mb-1.5">Kontakt</p>
              <p className="text-nav-m text-on-dark-muted">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </p>
              <a href={telHref(site.phone)} className="text-nav-m text-on-dark-muted hover:text-surface-0">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="text-nav-m text-on-dark-muted hover:text-surface-0">
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-9 h-px bg-line-dark lg:mt-[72px]" />

        <div className="mt-[22px] flex flex-col gap-2.5 text-body-s text-on-dark-muted lg:mt-7 lg:flex-row-reverse lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-x-[18px] gap-y-2 lg:gap-7">
            <Link href="/ochrana-osobnich-udaju" className="hover:text-surface-0">
              Ochrana osobních údajů
            </Link>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-surface-0">
              Facebook
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-surface-0">
              Instagram
            </a>
          </div>
          <p>© {new Date().getFullYear()} Hrdina Reality. Všechna práva vyhrazena.</p>
        </div>

        <p className="mt-6 text-body-s text-on-dark-muted/70 lg:mt-5">
          Developed by{" "}
          <a href="https://apilab.cz" target="_blank" rel="noopener" className="underline-offset-2 hover:text-surface-0 hover:underline">
            Adam Hitzger
          </a>
        </p>
      </div>
    </footer>
  );
}
