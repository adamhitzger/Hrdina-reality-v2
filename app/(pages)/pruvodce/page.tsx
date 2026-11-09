import Image from "next/image";
import type { ReactNode } from "react";

import GuideForm from "@/components/forms/GuideForm";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { GUIDE_PAGES, GUIDE_PATH, GUIDE_TITLE, guideCards, guideChapters, guideIntro } from "@/lib/guide";
import { pageJsonLd } from "@/lib/json-ld";
import { pageMetadata, site } from "@/lib/site";
import logo from "@/public/images/pruvodce/logo.webp";
import mesto from "@/public/images/pruvodce/mesto.webp";
import photoMagazine from "@/public/images/photo-magazine.jpg";

const TITLE = "Průvodce světem nemovitostí zdarma";
const DESCRIPTION =
  "Praktické rady pro prodávající, kupující, pronajímatele a nájemce od Hrdina Reality z Havlíčkova Brodu. Prohlédněte si ukázku a celé PDF vám pošleme e-mailem.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: GUIDE_PATH });

const contactLine = `${site.address.street}, ${site.address.city}`;

// Jedna strana PDF (A4) přepsaná do HTML
function Sheet({ page, children }: { page: number; children: ReactNode }) {
  return (
    <article
      data-reveal
      aria-label={`Strana ${page} z ${GUIDE_PAGES}`}
      className="mx-auto flex w-full max-w-[794px] flex-col bg-surface-0 px-6 pt-10 pb-6 shadow-[0_24px_60px_-30px_rgba(2,31,64,0.35)] md:aspect-[210/297] md:px-16 md:pt-16 md:pb-10"
    >
      {children}
    </article>
  );
}

function SheetFooter({ page }: { page: number }) {
  return (
    <footer className="flex items-end justify-between gap-4 border-t border-line-200 pt-4 text-[11px] leading-4 text-ink-500">
      <p>
        <span className="font-semibold tracking-[2px] text-navy-900 uppercase">Hrdina Reality</span> • {GUIDE_TITLE} • {page}
        <br />
        {contactLine}
        <br />
        {site.phone}, {site.email}
      </p>
      <Image src={logo} alt="" className="h-auto w-9 shrink-0" />
    </footer>
  );
}

export default function PruvodcePage() {
  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: GUIDE_PATH,
          name: TITLE,
          description: DESCRIPTION,
          crumbs: [{ name: "Průvodce", path: GUIDE_PATH }],
        })}
      />
      <PageHero
        crumb="Průvodce"
        title="Průvodce světem nemovitostí"
        lead={`Praktické rady pro prodávající, kupující, pronajímatele a nájemce. Níže si přečtete první dvě strany, celé PDF (${GUIDE_PAGES} stran) vám zdarma pošleme e-mailem.`}
        image={photoMagazine}
      />

      {/* Ukázka: strany 1–2 */}
      <section className="bg-surface-100">
        <div className="container-site flex flex-col gap-8 px-4 py-14 md:gap-12 lg:py-24">
          <p data-reveal className="text-center text-label-s text-brass-600 lg:text-label-m">
            Ukázka · strana 1–2 z {GUIDE_PAGES}
          </p>

          {/* Strana 1 – titulka */}
          <Sheet page={1}>
            <Image src={logo} alt="Hrdina Reality" priority className="h-auto w-[104px] md:w-[148px]" />
            <h2 className="mt-12 font-serif text-[32px] leading-[1.1] text-navy-900 md:mt-auto md:text-[56px]">
              <span className="font-normal">Váš průvodce</span>
              <br />
              <span className="font-bold">světem nemovitostí</span>
            </h2>
            <div className="mt-6 h-px bg-brass-500" />
            <p className="mt-5 font-serif text-body-m text-ink-500 italic">Praktické rady pro prodávající, kupující, pronajímatele a nájemce</p>
            <Image src={mesto} alt="" sizes="(max-width: 794px) 100vw, 666px" className="mt-10 h-auto w-full md:mt-14" />
            <div className="mt-6 bg-navy-900 px-5 py-6 text-center md:mb-auto md:py-7">
              <p className="font-serif text-body-m text-brass-300 italic md:text-body-l">Osobní přístup. Znalost místního trhu. 19 let zkušeností.</p>
              <p className="mt-2 text-[12px] leading-5 text-surface-0">
                {contactLine} • {site.phone} • {site.email}
              </p>
            </div>
          </Sheet>

          {/* Strana 2 – rozcestník */}
          <Sheet page={2}>
            <h2 className="font-serif text-[28px] leading-tight font-bold text-navy-900 md:text-[34px]">Vítejte ve světě nemovitostí</h2>
            <div className="mt-4 h-px bg-ink-300" />
            {guideIntro.map((p) => (
              <p key={p} className="mt-4 text-body-s text-ink-700 md:text-body-m">
                {p}
              </p>
            ))}
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 md:gap-x-16 md:gap-y-6">
              {guideCards.map((c) => (
                <li key={c.n} className="flex flex-col bg-[#efe7d6]">
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image src={c.image} alt="" width={1800} height={760} sizes="(max-width: 640px) 100vw, 300px" className="size-full object-cover" />
                  </div>
                  <div className="px-3 pt-3 pb-5">
                    <h3 className="font-serif text-[20px] leading-snug font-bold text-navy-900">
                      <span className="mr-2 text-brass-500">{c.n}</span>
                      {c.title}
                    </h3>
                    <p className="mt-1 font-serif text-body-s text-ink-500 italic">{c.lead}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <SheetFooter page={2} />
            </div>
          </Sheet>
        </div>
      </section>

      {/* Zbytek PDF e-mailem */}
      <section id="cele-pdf" className="scroll-mt-24 bg-surface-0">
        <div className="container-site flex flex-col gap-12 py-14 lg:flex-row lg:items-start lg:gap-12 lg:px-[120px] lg:py-24 xl:gap-20">
          <div data-reveal className="flex-1 px-6 lg:px-0">
            <p className="text-label-s text-brass-500 lg:text-label-m">Strany 3–{GUIDE_PAGES}</p>
            <h2 className="mt-[14px] font-serif font-normal text-heading-m text-ink-900 lg:mt-4 lg:max-w-[480px] lg:text-display-l">Chcete vědět víc?</h2>
            <p className="mt-4 text-body-m text-ink-500 lg:mt-5 lg:max-w-[460px]">
              Zašleme vám celé PDF do e-mailu. Najdete v něm konkrétní kroky, na co si dát pozor a co ověřit dřív, než něco podepíšete.
            </p>
            <ol className="mt-8 lg:mt-10">
              {guideChapters.map((c) => (
                <li key={c.n} className="flex gap-4 border-b border-line-200 py-[18px]">
                  <span className="w-6 shrink-0 font-serif text-title-m text-brass-500">{c.n}</span>
                  <div>
                    <p className="text-title-s text-navy-900">{c.title}</p>
                    <p className="mt-1 text-body-s text-ink-500">{c.points}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div data-reveal className="bg-surface-50 px-6 py-10 lg:sticky lg:top-8 lg:w-[50%] lg:shrink-0 lg:rounded lg:p-10 xl:w-[560px]">
            <h2 className="text-heading-s text-ink-900">Pošlete mi celé PDF</h2>
            <p className="mt-2 text-body-s text-ink-500">Zdarma, {GUIDE_PAGES} stran, do pár minut ve vaší schránce.</p>
            <div className="mt-7">
              <GuideForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
