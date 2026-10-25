import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { button } from "@/components/ui/button";
import { telHref } from "@/lib/format";
import { site } from "@/lib/site";

// Neexistující adresa i notFound() z detailu nemovitosti nebo článku. Next sám přidá noindex.
// Root not-found nemá layout z app/(pages), proto hlavička a patička tady. Vlastní metadata mít nemůže, titulek je výchozí z app/layout.tsx.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-surface-0">
          <div className="container-site flex flex-col items-start px-6 py-24 lg:px-[120px] lg:py-36">
            <div className="h-[2px] w-10 bg-brass-500 lg:w-12" />
            <p className="mt-[18px] text-label-s text-brass-500 lg:mt-[22px] lg:text-label-m">Chyba 404</p>
            <h1 className="mt-[14px] text-heading-m text-ink-900 lg:mt-4 lg:text-display-l">Tahle stránka neexistuje</h1>
            <p className="mt-4 max-w-[560px] text-body-m text-ink-500 lg:mt-5 lg:text-body-l">
              Odkaz je možná starý, nebo už nemovitost není v nabídce. Podívejte se na aktuální nabídku, případně nám zavolejte a rádi
              poradíme.
            </p>
            <div className="mt-8 flex w-full flex-col gap-[14px] sm:w-auto sm:flex-row">
              <Link href="/nemovitosti" className={`${button.primary} px-[30px] py-[17px]`}>
                Aktuální nabídka
              </Link>
              <Link href="/" className={`${button.ghost} px-[30px] py-[17px]`}>
                Na úvodní stránku
              </Link>
              <a href={telHref(site.phone)} className={`${button.ghost} px-[30px] py-[17px]`}>
                {site.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
