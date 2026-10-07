import type { ReactNode } from "react";

import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { PRIVACY_PATH, privacyEffectiveFrom, privacyForms, privacySections, type PrivacyBlock } from "@/lib/privacy-content";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Ochrana osobních údajů",
  description: `Jak ${site.legal.company} (${site.name}) zpracovává osobní údaje z kontaktního formuláře, poptávek a přihlášek a jaká máte práva podle GDPR.`,
  path: PRIVACY_PATH,
});

// URL a e-maily v textu udělá klikací
function Linkify({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s),]+|www\.[^\s),]+[a-z]|[\w.+-]+@[\w-]+\.[\w.]+[a-z])/g);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part;
        const href = part.includes("@") ? `mailto:${part}` : part.startsWith("http") ? part : `https://${part}`;
        return (
          <a key={i} href={href} {...(part.includes("@") ? {} : { target: "_blank", rel: "noopener noreferrer" })} className="text-navy-900 underline hover:text-brass-600">
            {part}
          </a>
        );
      })}
    </>
  );
}

function Block({ block }: { block: PrivacyBlock }): ReactNode {
  if (block.type === "p") return <p><Linkify text={block.text} /></p>;
  if (block.type === "list")
    return (
      <div className="flex flex-col gap-2">
        {block.intro && <p>{block.intro}</p>}
        <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-brass-500">
          {block.items.map((item) => (
            <li key={item}>
              <Linkify text={item} />
            </li>
          ))}
        </ul>
      </div>
    );
  return (
    <div className="flex flex-col gap-5">
      {privacyForms.map((p) => (
        <div key={p.form} className="rounded border border-line-200 p-6">
          <h3 className="text-title-m text-ink-900">{p.form}</h3>
          <dl className="mt-4 grid gap-x-6 gap-y-3 text-body-s sm:grid-cols-[150px_1fr]">
            {(
              [
                ["Údaje", p.data],
                ["Účel", p.purpose],
                ["Právní základ", p.basis],
                ["Jak dlouho", p.retention],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-label-s text-ink-500 sm:pt-0.5">{label}</dt>
                <dd className="text-ink-700">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

export default function OchranaOsobnichUdajuPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Hrdina Reality", path: "/" },
          { name: "Ochrana osobních údajů", path: PRIVACY_PATH },
        ])}
      />
      <PageHero
        crumb="Ochrana osobních údajů"
        title="Ochrana osobních údajů"
        lead="Dovolte, abychom Vás informovali o tom, jak zpracováváme Vaše osobní údaje a jaká máte práva."
      />

      <div className="bg-surface-0">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:py-24">
          <article className="mx-auto flex max-w-[760px] flex-col gap-10">
            {privacySections.map((section) => (
              <section key={section.heading} id={section.id} className="scroll-mt-6 flex flex-col gap-4">
                <h2 className="text-heading-s text-ink-900">{section.heading}</h2>
                <div className="flex flex-col gap-4 text-body-m text-ink-700">
                  {section.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
            <p className="border-t border-line-200 pt-8 text-body-s text-ink-500">
              Tyto zásady platí od {privacyEffectiveFrom}. Když je změníme, aktuální verzi najdete vždy na této stránce.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
