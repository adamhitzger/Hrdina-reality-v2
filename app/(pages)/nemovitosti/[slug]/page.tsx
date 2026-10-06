import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import JsonLd from "@/components/JsonLd";
import InquiryForm from "@/components/forms/InquiryForm";
import Gallery from "@/components/property/Gallery";
import { button } from "@/components/ui/button";
import MapEmbed from "@/components/ui/MapEmbed";
import PropertyCard from "@/components/ui/PropertyCard";
import RichText from "@/components/ui/RichText";
import SectionHeading from "@/components/ui/SectionHeading";
import { agentContacts } from "@/lib/content";
import { formatArea, formatPostcode, formatPrice, formatSpecs, telHref } from "@/lib/format";
import { breadcrumbJsonLd, realityJsonLd } from "@/lib/json-ld";
import { propertyCardProps, type PropertyListItem } from "@/lib/property";
import { defaultAuthor, pageMetadata } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { Reality, Staff } from "@/sanity/lib/interfaces";
import { NEMOVITOSTI_QUERY, REALITY_QUERY, REALITY_SLUGS_QUERY, STAFF_QUERY } from "@/sanity/lib/queries";

// Sdílí výsledek mezi generateMetadata a stránkou
const getReality = cache((slug: string) => sanityFetch<Reality | null>({ query: REALITY_QUERY, params: { slug } }));

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(REALITY_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/nemovitosti/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const reality = await getReality(slug);
  if (!reality) return {};

  const description =
    reality.overview || [reality.type, reality.area && `${reality.area} m²`, reality.city, reality.price].filter(Boolean).join(" · ");
  return pageMetadata({ title: reality.name, description, path: `/nemovitosti/${slug}`, defaultImage: false });
}

export default async function NemovitostPage({ params }: PageProps<"/nemovitosti/[slug]">) {
  const { slug } = await params;
  const [reality, staff, active] = await Promise.all([
    getReality(slug),
    sanityFetch<Staff[]>({ query: STAFF_QUERY }),
    sanityFetch<PropertyListItem[]>({ query: NEMOVITOSTI_QUERY }),
  ]);
  if (!reality) notFound();

  const photos = [...new Set([reality.imageUrl, ...(reality.galleryUrls ?? [])].filter(Boolean))];
  const plans = [reality.planUrl, reality.houseUrl].filter(Boolean);
  const address = formatSpecs([reality.street, reality.street_number].filter(Boolean).join(" "), reality.city);
  const fullAddress = [reality.street, reality.street_number, reality.postcode, reality.city].filter(Boolean).join(" ");

  const facts = [
    [reality.type, "typ nemovitosti"],
    [formatArea(reality.area), "plocha"],
    [reality.condition, "stav"],
    [reality.material, "stavba"],
    [reality.garage, "garáž"],
    [reality.parking, "parkování"],
  ].filter(([v]) => v) as [string, string][];

  const params1 = [
    ["Druh stavby", reality.type],
    ["Typ stavby", reality.material],
    ["Stav objektu", reality.condition],
    ["Vlastnictví", reality.owner],
    ["Status", reality.status],
    ["Vybavení", reality.equipment],
  ].filter(([, v]) => v);
  const params2 = [
    ["Plocha", formatArea(reality.area)],
    ["Topení", reality.heating],
    ["Voda", reality.water],
    ["Garáž", reality.garage],
    ["Parkování", reality.parking],
    ["Obec", [formatPostcode(reality.postcode), reality.city].filter(Boolean).join(" ")],
  ].filter(([, v]) => v);

  // Makléř z inzerátu + majitel kanceláře (Figma: „Kdo nemovitost prodává“)
  const agentNames = [...new Set([reality.author ?? defaultAuthor, defaultAuthor])];
  const agents = agentNames.map((n) => ({ name: n, staff: staff.find((s) => s.name === n), ...agentContacts[n] }));

  const similar = active
    .filter((r) => r.slug !== slug)
    .sort((a, b) => Number(b.type === reality.type) - Number(a.type === reality.type))
    .slice(0, 3);

  const sections = (reality.sections ?? []).filter((s) => s?._type === "textWithImage");

  return (
    <>
      <JsonLd data={realityJsonLd(reality)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Hrdina Reality", path: "/" },
          { name: "Nemovitosti", path: "/nemovitosti" },
          { name: reality.name, path: `/nemovitosti/${slug}` },
        ])}
      />

      {/* Galerie (23:284) */}
      <section className="bg-surface-0">
        <div className="container-site lg:px-[120px] lg:pt-8">
          <Gallery name={reality.name} photos={photos} plans={plans as string[]} />
        </div>
      </section>

      {/* Hlavička nemovitosti (48:1018) */}
      <section className="bg-surface-0">
        <div className="container-site px-6 pt-8 pb-8 lg:px-[120px] lg:pt-12 lg:pb-10">
          <nav aria-label="Drobečková navigace" className="text-label-s text-brass-500">
            <Link href="/" className="hover:text-brass-600">
              Domů
            </Link>
            <span className="whitespace-pre">{"  /  "}</span>
            <Link href="/nemovitosti" className="hover:text-brass-600">
              Nemovitosti
            </Link>
            <span className="whitespace-pre">{"  /  "}</span>
            <span aria-current="page">{reality.type ?? reality.name}</span>
          </nav>
          <div className="mt-[18px] flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-heading-s text-ink-900 lg:text-heading-m">{reality.name}</h1>
              <p className="text-body-m text-ink-500">{formatSpecs(reality.type, address)}</p>
            </div>
            <div className="flex flex-col gap-1.5 lg:items-end">
              <p className="text-heading-s whitespace-nowrap text-navy-900 lg:text-heading-m">{formatPrice(reality.price)}</p>
              <p className="text-body-s text-ink-500">Prohlídka po domluvě</p>
            </div>
          </div>
          {facts.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-y-5 border-y border-line-200 py-6 sm:grid-cols-3 lg:flex">
              {facts.map(([value, label]) => (
                <div key={label} className="flex flex-col-reverse gap-1 lg:flex-1">
                  <dt className="text-body-s text-ink-500">{label}</dt>
                  <dd className="text-title-m text-ink-900">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* Detail — obsah (49:1013) */}
      <section className="bg-surface-0">
        <div className="container-site flex flex-col gap-10 px-6 pt-4 pb-16 lg:flex-row lg:items-start lg:gap-[60px] lg:px-[120px] lg:pt-6 lg:pb-[88px]">
          <div className="min-w-0 flex-1">
            <h2 className="text-heading-s text-ink-900">Popis nemovitosti</h2>
            <div className="mt-[18px]">
              {reality.overview && <p className="text-body-m text-ink-500">{reality.overview}</p>}
              {reality.details && (
                <div className="mt-[14px]">
                  <RichText value={reality.details} />
                </div>
              )}
              {sections.map((s, i) => (
                <div key={i} className="mt-8">
                  {s.heading && <h3 className="mb-3 text-title-m text-ink-900">{s.heading}</h3>}
                  {s.text && <RichText value={s.text} />}
                  {s.textWithImageUrl && (
                    <div className="relative mt-5 aspect-[3/2] overflow-hidden rounded">
                      <Image src={s.textWithImageUrl} alt="" fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {params1.length + params2.length > 0 && (
              <>
                <h2 className="mt-11 text-heading-s text-ink-900">Parametry nemovitosti</h2>
                <div className="mt-5 grid gap-x-10 md:grid-cols-2">
                  {[params1, params2].map((col, ci) => (
                    <dl key={ci}>
                      {col.map(([label, value]) => (
                        <div key={label} className="flex items-start justify-between gap-4 border-b border-line-200 py-[13px] text-body-s">
                          <dt className="text-ink-500">{label}</dt>
                          <dd className="text-right font-semibold text-ink-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  ))}
                </div>
              </>
            )}

            <h2 className="mt-12 text-heading-s text-ink-900">Kdo nemovitost prodává</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {agents.map((a) => (
                <div key={a.name} className="flex flex-col rounded border border-line-200 p-6">
                  <div className="flex items-center gap-[14px]">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-surface-100">
                      {a.staff?.staffUrl && <Image src={a.staff.staffUrl} alt={a.name} fill sizes="64px" className="object-cover" />}
                    </div>
                    <div className="flex flex-col gap-[3px]">
                      <p className="text-title-m text-ink-900">{a.name}</p>
                      {a.staff?.position && <p className="text-body-s text-ink-500">{a.staff.position}</p>}
                    </div>
                  </div>
                  {a.phone && (
                    <a href={telHref(a.phone)} className="mt-[18px] text-body-m font-semibold text-navy-900">
                      {a.phone}
                    </a>
                  )}
                  {a.email && (
                    <a href={`mailto:${a.email}`} className="mt-1 text-body-s text-ink-500 hover:text-navy-900">
                      {a.email}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div id="poptavka" className="mt-12 scroll-mt-6 rounded bg-surface-50 px-6 py-8 lg:p-10">
              <h2 className="text-heading-s text-ink-900">Máte zájem o tuto nemovitost?</h2>
              <p className="mt-2 text-body-s text-ink-500">Ozveme se do 24 hodin. Prohlídku zvládneme domluvit i na víkend.</p>
              <div className="mt-[26px]">
                <InquiryForm slug={slug} />
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-6 lg:w-[380px] lg:shrink-0">
            <div className="rounded border border-line-200 bg-surface-0 p-7">
              <h2 className="text-title-m text-ink-900">Informace o nemovitosti</h2>
              <dl className="mt-[18px] text-body-s">
                {[
                  ["Cena", formatPrice(reality.price)],
                  ["Plocha", formatArea(reality.area)],
                  ["Typ", reality.type],
                  ["Status", reality.status],
                ]
                  .filter(([, v]) => v)
                  .map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 border-b border-line-200 py-3">
                      <dt className="text-ink-500">{label}</dt>
                      <dd className="text-right font-semibold text-ink-900">{value}</dd>
                    </div>
                  ))}
              </dl>
              <a href="#poptavka" className={`${button.primary} mt-6 w-full py-4`}>
                Mám zájem
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Lokalita (67:915) */}
      {(fullAddress || reality.city) && (
        <section className="bg-surface-0">
          <div className="container-site px-6 pt-2 pb-16 lg:px-[120px] lg:pb-[88px]">
            <div className="h-[2px] w-10 bg-brass-500 lg:w-12" />
            <p className="mt-[18px] text-label-s text-brass-500 lg:text-label-m">Lokalita</p>
            <h2 className="mt-[14px] text-heading-s text-ink-900">Kde nemovitost najdete</h2>
            <MapEmbed query={fullAddress || reality.city} label={address || reality.city} className="mt-7 h-[300px] lg:h-[440px]" />
          </div>
        </section>
      )}

      {/* Podobné nemovitosti (26:313) */}
      {similar.length > 0 && (
        <section className="bg-surface-50">
          <div className="container-site px-6 py-16 lg:px-[120px] lg:py-[104px]">
            <SectionHeading
              eyebrow="Mohlo by se hodit"
              title="Podobné nemovitosti"
              aside={
                <Link href="/nemovitosti" className={`${button.ghost} hidden lg:inline-flex`}>
                  Celá nabídka
                </Link>
              }
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-[30px]">
              {similar.map((r) => (
                <PropertyCard key={r.slug} {...propertyCardProps(r)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
