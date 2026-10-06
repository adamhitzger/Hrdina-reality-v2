import ContactForm from "@/components/forms/ContactForm";
import MapEmbed from "@/components/ui/MapEmbed";
import PageHero from "@/components/ui/PageHero";
import { telHref } from "@/lib/format";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Kontakt",
  description: "Kancelář na Havlíčkově náměstí 56 v Havlíčkově Brodě. Zavolejte na +420 773 498 424 nebo nám napište.",
  path: "/kontakt",
});

const rows: { label: string; value: string; href?: string }[] = [
  { label: "Telefon", value: site.phone, href: telHref(site.phone) },
  { label: "E-mail", value: site.email, href: `mailto:${site.email}` },
  { label: "Otevírací doba", value: "Po–Pá  9:00–17:00" },
  { label: "Mimo otevírací dobu", value: "Po telefonické domluvě i večer a o víkendu" },
];

export default function KontaktPage() {
  const address = `${site.address.street}, ${site.address.city}`;

  return (
    <>
      <PageHero crumb="Kontakt" title="Kontakt" lead="Zavolejte, napište nebo se zastavte přímo v kanceláři na náměstí." />

      {/* Kontakt — obsah (32:641) */}
      <section className="bg-surface-0">
        <div className="container-site flex flex-col gap-12 py-14 lg:flex-row lg:items-start lg:gap-20 lg:px-[120px] lg:py-24">
          <div className="flex-1 px-6 lg:px-0">
            <p className="text-label-s text-brass-500 lg:text-label-m">Kde nás najdete</p>
            <h2 className="mt-[14px] text-heading-m text-ink-900 lg:mt-4 lg:w-[480px] lg:text-display-l">{site.address.street}</h2>
            <p className="mt-4 text-body-m text-ink-500 lg:mt-5 lg:w-[460px]">
              {site.address.postalCode} {site.address.city} — kancelář je přímo na náměstí, vchod vedle lékárny.
            </p>
            <dl className="mt-8 lg:mt-10">
              {rows.map((r) => (
                <div key={r.label} className="flex flex-col gap-1 border-b border-line-200 py-[18px]">
                  <dt className="text-label-s text-ink-300">{r.label}</dt>
                  <dd className="text-title-s whitespace-pre-wrap text-navy-900 lg:text-title-m">
                    {r.href ? (
                      <a href={r.href} className="hover:text-brass-600">
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-surface-50 px-6 py-10 lg:w-[560px] lg:shrink-0 lg:rounded lg:p-10">
            <h2 className="text-heading-s text-ink-900">Napište nám</h2>
            <p className="mt-2 text-body-s text-ink-500">Ozveme se do 24 hodin, obvykle dřív.</p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Mapa (32:691) */}
      <section className="bg-surface-0">
        <MapEmbed query={`${address}, ${site.address.postalCode}`} label={address} className="h-[300px] rounded-none lg:h-[440px]" />
      </section>
    </>
  );
}
