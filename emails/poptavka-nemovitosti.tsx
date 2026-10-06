import { Column, Img, Link, Row, Section, Text } from "react-email";

import { siteUrl } from "../lib/site";
import { EmailLayout, formatReceived, type Customer } from "./_components/layout";
import { color, type } from "./_components/theme";

export interface PoptavkaProperty {
  name: string;
  slug: string;
  price?: string;
  specs?: string;
  imageUrl?: string;
}

export interface PoptavkaEmailProps extends Customer {
  property: PoptavkaProperty | null;
  sentAt?: Date;
}

export const poptavkaSubject = (fullname: string, propertyName?: string) =>
  propertyName ? `Poptávka: ${propertyName} — ${fullname}` : `Poptávka nemovitosti — ${fullname}`;

export default function PoptavkaNemovitostiEmail({ property, sentAt = new Date(), ...customer }: PoptavkaEmailProps) {
  const propertyUrl = property ? `${siteUrl}/nemovitosti/${encodeURIComponent(property.slug)}` : undefined;
  const thumb = property?.imageUrl ? `${property.imageUrl}?w=336&h=240&fit=crop&fm=jpg&q=80` : undefined;

  return (
    <EmailLayout
      preview={`${property?.name ?? "Poptávka nemovitosti"} · ${customer.fullname}, ${customer.phone}`}
      tag="Nová poptávka"
      eyebrow="Poptávka nemovitosti"
      heading={`${customer.fullname} má zájem o nemovitost`}
      meta={`Přijato ${formatReceived(sentAt)} z detailu nemovitosti`}
      replySubject={`Re: ${property?.name ?? "Vaše poptávka"} — Hrdina Reality`}
      customer={customer}
    >
      {property && (
        <Section className="m-pad" style={{ padding: "0 40px 32px" }}>
          <Section style={{ backgroundColor: color.surface50, borderRadius: 4, padding: "16px 20px 16px 16px" }}>
            <Row>
              {thumb && (
                <Column className="m-stack" style={{ width: 188, verticalAlign: "middle" }}>
                  <Link href={propertyUrl}>
                    <Img src={thumb} width={168} height={120} alt={property.name} className="m-full" style={{ borderRadius: 4, objectFit: "cover" }} />
                  </Link>
                </Column>
              )}
              <Column className="m-stack" style={{ verticalAlign: "middle" }}>
                {property.price && <Text style={{ ...type.titleM, color: color.navy900 }}>{property.price}</Text>}
                <Text style={{ ...type.titleS, color: color.ink900, marginTop: 4 }}>{property.name}</Text>
                {property.specs && <Text style={{ ...type.bodyS, color: color.ink500, marginTop: 4 }}>{property.specs}</Text>}
                <Text style={{ ...type.buttonM, marginTop: 8 }}>
                  <Link href={propertyUrl} style={{ color: color.brass600, textDecoration: "none" }}>
                    Zobrazit inzerát na&nbsp;webu&nbsp;→
                  </Link>
                </Text>
              </Column>
            </Row>
          </Section>
        </Section>
      )}
    </EmailLayout>
  );
}

PoptavkaNemovitostiEmail.PreviewProps = {
  fullname: "Jan Novák",
  email: "jan.novak@email.cz",
  phone: "+420 777 123 456",
  msg: "Dobrý den, rád bych se přišel podívat na dům v Mírovce. Hodila by se mi sobota dopoledne, případně kterýkoliv všední den po 16. hodině.\n\nDěkuji, Jan Novák",
  sentAt: new Date("2026-10-05T12:32:00Z"),
  property: {
    name: "Rodinný dům, Havlíčkův Brod — Mírovka",
    slug: "rodinny-dum-havlickuv-brod",
    price: "4 950 000 Kč",
    specs: "Rodinný dům · 164 m² · Havlíčkův Brod",
    imageUrl: "https://cdn.sanity.io/images/os2qan8r/production/3b20891751adb8019d5ee9b412d2653f349abe9e-1867x1400.webp",
  },
} satisfies PoptavkaEmailProps;
