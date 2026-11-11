import { Link, Section, Text } from "react-email";

import { siteUrl } from "../lib/site";
import { EmailLayout, formatReceived } from "./_components/layout";
import { color, type } from "./_components/theme";

export interface PruvodceLeadEmailProps {
  fullname: string;
  email: string;
  sentAt?: Date;
}

export const pruvodceLeadSubject = (fullname: string) => `Nový zájemce o průvodce — ${fullname}`;

// Upozornění pro Hrdina Reality, že si někdo poprvé nechal poslat průvodce (lib/actions.ts → sendGuide).
// Při opakovaném odeslání stejného e-mailu nechodí.
export default function PruvodceLeadEmail({ sentAt = new Date(), ...customer }: PruvodceLeadEmailProps) {
  return (
    <EmailLayout
      preview={`${customer.fullname} · ${customer.email}`}
      tag="Nový zájemce"
      eyebrow="Průvodce světem nemovitostí"
      heading={`${customer.fullname} chce průvodce světem nemovitostí`}
      meta={`Přijato ${formatReceived(sentAt)} přes stránku Průvodce`}
      replySubject="Re: Průvodce světem nemovitostí"
      customer={customer}
      withMessage={false}
    >
      <Section className="m-pad" style={{ padding: "0 40px 32px" }}>
        <Section style={{ backgroundColor: color.surface50, borderRadius: 4, padding: "20px 24px" }}>
          <Text style={{ ...type.labelS, color: color.brass500 }}>Co se stalo</Text>
          <Text style={{ ...type.bodyM, color: color.ink700, marginTop: 8 }}>
            Zájemci jsme poslali celé PDF průvodce. Kontakt je uložený ve Studiu v sekci Maily z PDF, kde uvidíte i to, kolikrát si e-mail zobrazil.
          </Text>
          <Text style={{ ...type.buttonM, marginTop: 8 }}>
            <Link href={`${siteUrl}/studio`} style={{ color: color.brass600, textDecoration: "none" }}>
              Otevřít Studio&nbsp;→
            </Link>
          </Text>
        </Section>
      </Section>
    </EmailLayout>
  );
}

PruvodceLeadEmail.PreviewProps = {
  fullname: "Jan Novák",
  email: "jan.novak@email.cz",
  sentAt: new Date("2026-11-11T12:32:00Z"),
} satisfies PruvodceLeadEmailProps;
