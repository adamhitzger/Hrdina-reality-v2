import { EmailLayout, formatReceived, type Customer } from "./_components/layout";

export interface KontaktEmailProps extends Customer {
  sentAt?: Date;
}

export const kontaktSubject = (fullname: string) => `Nová zpráva z kontaktního formuláře — ${fullname}`;

export default function KontaktEmail({ sentAt = new Date(), ...customer }: KontaktEmailProps) {
  return (
    <EmailLayout
      preview={customer.msg?.trim() || `${customer.fullname} · ${customer.phone}`}
      tag="Nová zpráva z webu"
      eyebrow="Kontaktní formulář"
      heading={`${customer.fullname} vám napsal zprávu`}
      meta={`Přijato ${formatReceived(sentAt)} přes stránku Kontakt`}
      replySubject="Re: Vaše zpráva pro Hrdina Reality"
      customer={customer}
    />
  );
}

KontaktEmail.PreviewProps = {
  fullname: "Jan Novák",
  email: "jan.novak@email.cz",
  phone: "+420 777 123 456",
  msg: "Dobrý den, rád bych prodal byt 3+1 v Havlíčkově Brodě. Můžete mi prosím zavolat a domluvit se na odhadu ceny? Nejlépe odpoledne po 15. hodině.\n\nDěkuji, Jan Novák",
  sentAt: new Date("2026-10-05T12:32:00Z"),
} satisfies KontaktEmailProps;
