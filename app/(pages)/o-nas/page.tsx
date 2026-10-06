import Image from "next/image";
import Link from "next/link";

import ServiceCards from "@/components/sections/ServiceCards";
import { button } from "@/components/ui/button";
import PageHero from "@/components/ui/PageHero";
import { agentContacts, processSteps, values } from "@/lib/content";
import { telHref } from "@/lib/format";
import { pageMetadata, site } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { Staff } from "@/sanity/lib/interfaces";
import { STAFF_QUERY } from "@/sanity/lib/queries";
import photoOffice from "@/public/images/photo-office.jpg";

export const metadata = pageMetadata({
  title: "O nás",
  description: "Seznamte se s týmem realitní kanceláře Hrdina Reality z Havlíčkova Brodu.",
  path: "/o-nas",
});

export default async function ONasPage() {
  const staff = await sanityFetch<Staff[]>({ query: STAFF_QUERY });

  return (
    <>
      <PageHero crumb="O nás" title="O nás" lead="Malá realitní kancelář z Havlíčkova Brodu. Osobní přístup, jasný plán a 19 let zkušeností." />

      {/* Můj příběh (31:591) */}
      <section className="bg-surface-0">
        <div className="container-site flex flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center lg:gap-20 lg:px-[120px] lg:py-24">
          <div className="flex-1">
            <p className="text-label-s text-brass-500 lg:text-label-m">Můj příběh</p>
            <h2 className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:w-[480px] lg:text-display-l">
              Začalo to na druhé <br className="hidden lg:block" />
              straně světa
            </h2>
            <p className="mt-4 text-body-m text-ink-500 lg:mt-[22px] lg:w-[480px] lg:text-body-l">
              Začal jsem s realitami v Austrálii. Nechal jsem se zaměstnat u tamní realitní kanceláře a řemeslo se naučil na trhu, kde se
              makléř pozná podle toho, jak rychle a za kolik prodá.
            </p>
            <p className="mt-[14px] text-body-m text-ink-500 lg:w-[480px]">
              Po návratu do Česka jsem nastoupil do RE/MAX, kde mě na pobočce Well dvakrát vyhlásili nejlepším makléřem — v roce 2017 a
              2019. Pak jsem se osamostatnil a založil Hrdina Reality: vlastní kancelář na Havlíčkově náměstí, kde každou zakázku vede od
              začátku do konce jeden člověk.
            </p>
            <div className="mt-[26px] flex flex-col gap-[3px] text-body-s">
              <p className="font-semibold text-ink-900">Lukáš Hrdina</p>
              <p className="text-ink-500">majitel Hrdina Reality</p>
            </div>
          </div>
          <div className="relative h-[320px] overflow-hidden rounded lg:h-[480px] lg:w-[520px] lg:shrink-0">
            <Image src={photoOffice} alt="Lukáš Hrdina v kanceláři Hrdina Reality" fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Hodnoty (31:601) */}
      <section className="bg-surface-50">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:py-24">
          <p className="text-label-s text-brass-500 lg:text-label-m">Jak pracujeme</p>
          <h2 className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:w-[620px] lg:text-display-l">Tři věci, na kterých trváme</h2>
          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-3 lg:gap-[30px]">
            {values.map((v) => (
              <div key={v.title} className="border-t-2 border-brass-500 pt-6">
                <h3 className="text-heading-s text-ink-900">{v.title}</h3>
                <p className="mt-3 text-body-m text-ink-500">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Služby (27:369) */}
      <section className="bg-surface-0">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:py-24">
          <p className="text-label-s text-brass-500 lg:text-label-m">Co pro vás uděláme</p>
          <h2 className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:w-[620px] lg:text-display-l">Tři služby, jeden makléř</h2>
          <p className="mt-4 text-body-m text-ink-500 lg:w-[620px] lg:text-body-l">
            U každé zakázky vás vede jeden člověk od první schůzky po katastr. Nepředáváme vás mezi odděleními.
          </p>
          <div className="mt-10 lg:mt-14">
            <ServiceCards variant="about" />
          </div>
        </div>
      </section>

      {/* Jak to probíhá (28:397) */}
      <section className="bg-surface-100">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:pt-24 lg:pb-[104px]">
          <p className="text-label-s text-brass-600 lg:text-label-m">Průběh spolupráce</p>
          <h2 className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:text-display-l">Jak to probíhá</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-[30px]">
            {processSteps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-brass-500 pt-6">
                <p className="text-title-m text-brass-600">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-heading-s text-ink-900">{s.title}</h3>
                <p className="mt-2.5 text-body-m text-ink-500">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Náš tým (31:619) – ze Sanity */}
      <section className="bg-surface-0">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:pt-24 lg:pb-[104px]">
          <p className="text-label-s text-brass-500 lg:text-label-m">Naši makléři</p>
          <h2 className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:w-[620px] lg:text-display-l">Lidé, na které se dovoláte</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-[30px] lg:gap-y-14">
            {staff.map((s) => {
              const contact = agentContacts[s.name];
              return (
                <article key={s.name} className="flex flex-col">
                  <div className="relative h-[380px] overflow-hidden rounded bg-surface-100 lg:h-[420px]">
                    {s.staffUrl && <Image src={s.staffUrl} alt={s.name} fill sizes="(min-width: 1024px) 380px, 100vw" className="object-cover object-top" />}
                  </div>
                  <h3 className="mt-5 text-title-m text-ink-900">{s.name}</h3>
                  {s.position && <p className="mt-1 text-body-s text-ink-500">{s.position}</p>}
                  {contact?.phone && (
                    <a href={telHref(contact.phone)} className="mt-[14px] text-body-s font-semibold text-navy-900">
                      {contact.phone}
                    </a>
                  )}
                  {contact?.email && (
                    <a href={`mailto:${contact.email}`} className="mt-1 text-body-s text-ink-500 hover:text-navy-900">
                      {contact.email}
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA (28:427) */}
      <section className="bg-surface-50">
        <div className="container-site flex flex-col items-center px-6 py-16 text-center lg:px-[120px] lg:py-[88px]">
          <h2 className="text-heading-s text-ink-900 lg:text-display-l">Nevíte, kde začít?</h2>
          <p className="mt-4 max-w-[620px] text-body-m text-ink-500 lg:text-body-l">
            Zavolejte nám. První schůzka je nezávazná, zdarma a odejdete z ní s konkrétním číslem.
          </p>
          <div className="mt-8 flex w-full flex-col gap-[14px] sm:w-auto sm:flex-row">
            <Link href="/kontakt" className={`${button.primary} px-[30px] py-[17px]`}>
              Nezávazná konzultace
            </Link>
            <a href={telHref(site.phone)} className={`${button.ghost} px-[30px] py-[17px]`}>
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
