import { Link, Section, Text } from "react-email";

import { siteUrl } from "../lib/site";
import { EmailLayout, formatReceived, type Customer } from "./_components/layout";
import { color, type } from "./_components/theme";

export interface PrihlaskaPosition {
  title: string;
  slug?: string;
  tag?: string;
}

export interface PrihlaskaEmailProps extends Customer {
  position: PrihlaskaPosition;
  source?: string;
  sentAt?: Date;
}

export const prihlaskaSubject = (fullname: string, position: string) => `Přihláška: ${position} — ${fullname}`;

// Figma: E-maily · 600 → E-mail / Přihláška (Kariéra) · 600
export default function PrihlaskaEmail({ position, source, sentAt = new Date(), ...customer }: PrihlaskaEmailProps) {
  const positionUrl = position.slug ? `${siteUrl}/kariera#${position.slug}` : `${siteUrl}/kariera`;

  return (
    <EmailLayout
      preview={`${position.title} · ${customer.fullname}, ${customer.phone}`}
      tag="Nová přihláška"
      eyebrow="Kariéra · přihláška"
      heading={`${customer.fullname} se hlásí do týmu`}
      meta={`Přijato ${formatReceived(sentAt)} přes stránku Kariéra`}
      replySubject={`Re: Přihláška — ${position.title}`}
      customer={customer}
      trailingRows={[["Jak se o nás dozvěděl/a", source ?? ""]]}
      sender="applicant"
    >
      <Section className="m-pad" style={{ padding: "0 40px 32px" }}>
        <Section style={{ backgroundColor: color.surface50, borderRadius: 4, padding: "20px 24px" }}>
          <Text style={{ ...type.labelS, color: color.brass500 }}>Pozice</Text>
          <Text style={{ ...type.titleM, color: color.navy900, marginTop: 8 }}>{position.title}</Text>
          {position.tag && <Text style={{ ...type.bodyS, color: color.ink500, marginTop: 4 }}>{position.tag} · Havlíčkův Brod</Text>}
          <Text style={{ ...type.buttonM, marginTop: 8 }}>
            <Link href={positionUrl} style={{ color: color.brass600, textDecoration: "none" }}>
              Zobrazit pozici na&nbsp;webu&nbsp;→
            </Link>
          </Text>
        </Section>
      </Section>
    </EmailLayout>
  );
}

PrihlaskaEmail.PreviewProps = {
  fullname: "Jan Novák",
  email: "jan.novak@email.cz",
  phone: "+420 777 123 456",
  msg: "Dobrý den, dva roky pracuji jako asistent v realitní kanceláři v Jihlavě a rád bych se posunul k vlastním obchodům. Havlíčkův Brod znám, bydlím tu od dětství.\n\nBudu rád, když se ozvete. Jan Novák",
  source: "Doporučení od známého",
  sentAt: new Date("2026-10-05T12:32:00Z"),
  position: { title: "Realitní makléř / makléřka", slug: "makler", tag: "HPP i IČO" },
} satisfies PrihlaskaEmailProps;
