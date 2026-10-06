import type { ReactNode } from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "react-email";

import { siteUrl } from "../../lib/site";
import { color, fontFamily, type } from "./theme";

export interface Customer {
  fullname: string;
  email: string;
  phone: string;
  msg?: string;
}

// Texty podle toho, kdo formulář poslal
const copy = {
  customer: {
    contact: "Kontakt na zákazníka",
    message: "Zpráva",
    emptyMessage: "Zákazník nenapsal žádnou zprávu.",
    reply: "Odpovědět e-mailem",
    note: "Odpovědí na tento e-mail píšete přímo zákazníkovi.",
  },
  applicant: {
    contact: "Kontakt na uchazeče",
    message: "Pár slov o sobě",
    emptyMessage: "Uchazeč o sobě nic nenapsal.",
    reply: "Odpovědět uchazeči",
    note: "Odpovědí na tento e-mail píšete přímo uchazeči.",
  },
};

const divider = { border: "none", borderTop: `1px solid ${color.line200}`, margin: 0 };

// Mobilní úpravy (Apple Mail, iOS, Gmail app); inline styly přebíjí !important
const responsiveCss = `
@media only screen and (max-width: 620px) {
  .m-body { padding: 0 !important; }
  .m-container { border-radius: 0 !important; }
  .m-pad { padding-left: 24px !important; padding-right: 24px !important; }
  .m-stack { display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; }
  .m-stack + .m-stack { padding-top: 12px !important; }
  .m-hide { display: none !important; }
  .m-full { width: 100% !important; height: auto !important; }
}`;

export function EmailLayout({
  preview,
  tag,
  eyebrow,
  heading,
  meta,
  replySubject,
  customer,
  extraRows = [],
  trailingRows = [],
  sender = "customer",
  children,
}: {
  preview: string;
  tag: string;
  eyebrow: string;
  heading: string;
  meta: string;
  replySubject: string;
  customer: Customer;
  extraRows?: [label: string, value: string][];
  /** Řádky za telefonem, nejsou to odkazy, takže jsou v barvě textu */
  trailingRows?: [label: string, value: string][];
  sender?: keyof typeof copy;
  children?: ReactNode;
}) {
  const t = copy[sender];
  const rows: [string, string, string?][] = [
    ...extraRows,
    ["Jméno a příjmení", customer.fullname],
    ["E-mail", customer.email, `mailto:${customer.email}`],
    ["Telefon", customer.phone, telHref(customer.phone)],
  ];
  const msg = customer.msg?.trim();
  const trailing = trailingRows.filter(([, value]) => value.trim());

  return (
    <Html lang="cs">
      <Head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- e-mail, ne stránka Next.js */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <style>{responsiveCss}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body className="m-body" style={{ backgroundColor: color.surface100, margin: 0, padding: "48px 0", fontFamily }}>
        <Container className="m-container" style={{ width: "100%", maxWidth: 600, backgroundColor: color.surface0, borderRadius: 4, overflow: "hidden" }}>
          <Section style={{ height: 4, lineHeight: "4px", fontSize: 0, backgroundColor: color.brass500 }}>&nbsp;</Section>

          {/* Header */}
          <Section className="m-pad" style={{ padding: "28px 40px" }}>
            <Row>
              <Column style={{ verticalAlign: "middle" }}>
                <Link href={siteUrl} style={{ textDecoration: "none" }}>
                  <Img
                    src={`${siteUrl}/email/hr-mark.png`}
                    width={44}
                    height={30}
                    alt="HR"
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  />
                  <span style={{ ...type.labelS, fontSize: 14, lineHeight: "20px", letterSpacing: "2.2px", color: color.navy900, verticalAlign: "middle", marginLeft: 12, whiteSpace: "nowrap" }}>
                    Hrdina Reality
                  </span>
                </Link>
              </Column>
              <Column align="right" className="m-hide" style={{ verticalAlign: "middle" }}>
                <Text style={{ ...type.labelS, color: color.ink500, textAlign: "right" }}>{tag}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={divider} />

          {/* Úvod */}
          <Section className="m-pad" style={{ padding: "40px 40px 32px" }}>
            <Text style={{ ...type.labelS, color: color.brass500 }}>{eyebrow}</Text>
            <Text style={{ ...type.headingS, color: color.ink900, marginTop: 12 }}>{heading}</Text>
            <Text style={{ ...type.bodyS, color: color.ink500, marginTop: 8 }}>{meta}</Text>
          </Section>

          {children}

          {/* Kontakt na zákazníka */}
          <Section className="m-pad" style={{ padding: "0 40px" }}>
            <Text style={{ ...type.labelS, color: color.brass500, marginBottom: 8 }}>{t.contact}</Text>
            {rows.map(([label, value, href]) => (
              <Section key={label}>
                <Hr style={divider} />
                <Section style={{ padding: "14px 0" }}>
                  <Text style={{ ...type.labelS, color: color.ink500 }}>{label}</Text>
                  <Text style={{ ...type.titleS, color: color.navy900, marginTop: 4 }}>
                    {href ? (
                      <Link href={href} style={{ color: color.navy900, textDecoration: "none" }}>{value}</Link>
                    ) : (
                      value
                    )}
                  </Text>
                </Section>
              </Section>
            ))}
            {trailing.map(([label, value]) => (
              <Section key={label}>
                <Hr style={divider} />
                <Section style={{ padding: "14px 0" }}>
                  <Text style={{ ...type.labelS, color: color.ink500 }}>{label}</Text>
                  <Text style={{ ...type.titleS, color: color.ink900, marginTop: 4 }}>{value}</Text>
                </Section>
              </Section>
            ))}
            <Hr style={divider} />
          </Section>

          {/* Zpráva */}
          <Section className="m-pad" style={{ padding: "32px 40px 0" }}>
            <Text style={{ ...type.labelS, color: color.brass500, marginBottom: 12 }}>{t.message}</Text>
            <Section
              style={{
                backgroundColor: color.surface50,
                borderLeft: `3px solid ${color.brass500}`,
                borderRadius: 4,
                padding: 24,
              }}
            >
              {msg ? (
                <Text style={{ ...type.bodyM, color: color.ink700 }}>
                  {msg.split("\n").map((line, i, all) => (
                    <span key={i}>
                      {line}
                      {i < all.length - 1 && <br />}
                    </span>
                  ))}
                </Text>
              ) : (
                <Text style={{ ...type.bodyM, color: color.ink500, fontStyle: "italic" }}>
                  {t.emptyMessage}
                </Text>
              )}
            </Section>
          </Section>

          {/* Akce */}
          <Section className="m-pad" style={{ padding: "32px 40px 40px" }}>
            <Row>
              <Column className="m-stack" style={{ width: "50%", paddingRight: 6 }}>
                <Button
                  href={`mailto:${customer.email}?subject=${encodeURIComponent(replySubject)}`}
                  style={{ ...buttonBase, backgroundColor: color.navy900, color: color.surface0, border: `1px solid ${color.navy900}` }}
                >
                  {t.reply}
                </Button>
              </Column>
              <Column className="m-stack" style={{ width: "50%", paddingLeft: 6 }}>
                <Button
                  href={telHref(customer.phone)}
                  style={{ ...buttonBase, backgroundColor: color.surface0, color: color.navy900, border: `1px solid ${color.navy900}` }}
                >
                  Zavolat {customer.phone}
                </Button>
              </Column>
            </Row>
          </Section>

          {/* Footer */}
          <Section className="m-pad" style={{ backgroundColor: color.navy950, padding: "32px 40px" }}>
            <Text style={{ ...type.bodyS, color: color.onDarkMuted }}>
              Tato zpráva byla automaticky odeslána z webu hrdinareality.cz. {t.note}
            </Text>
            <Hr style={{ ...divider, borderTop: `1px solid ${color.lineDark}`, margin: "16px 0" }} />
            <Text style={{ ...type.labelS, color: color.onDarkMuted }}>
              Hrdina Reality &nbsp;·&nbsp; <span style={{ whiteSpace: "nowrap" }}>+420 773 498 424</span>
              <br />
              Havlíčkovo náměstí 56, 580 01 Havlíčkův Brod
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const buttonBase = {
  ...type.buttonM,
  display: "block",
  boxSizing: "border-box",
  width: "100%",
  textAlign: "center",
  padding: "18px 12px",
  borderRadius: 4,
} as const;

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

// „Přijato 5. 10. 2026 ve 14:32“
export function formatReceived(date: Date) {
  const tz = "Europe/Prague";
  const day = new Intl.DateTimeFormat("cs-CZ", { timeZone: tz, day: "numeric", month: "numeric", year: "numeric" }).format(date);
  const time = new Intl.DateTimeFormat("cs-CZ", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(date);
  const hour = Number(time.split(":")[0]);
  const prep = [2, 3, 4, 12, 13, 14, 20, 21, 22, 23].includes(hour) ? "ve" : "v";
  return `${day} ${prep} ${time}`;
}
