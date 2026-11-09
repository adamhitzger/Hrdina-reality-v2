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

import { GUIDE_PAGES, GUIDE_TITLE, guideChapters } from "../lib/guide";
import { site, siteUrl } from "../lib/site";
import { buttonBase, divider, responsiveCss, telHref } from "./_components/layout";
import { color, fontFamily, type } from "./_components/theme";

export interface PruvodceEmailProps {
  /** Adresa sledovacího pixelu (/api/email-open?id=…), bez ní se zobrazení nepočítá */
  trackingUrl?: string;
}

export const pruvodceSubject = `${GUIDE_TITLE} – celé PDF`;

// E-mail pro zákazníka, PDF je v příloze (lib/actions.ts → sendGuide)
export default function PruvodceEmail({ trackingUrl }: PruvodceEmailProps) {
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
      <Preview>{`Celý průvodce (${GUIDE_PAGES} stran) najdete v příloze. Prodej, koupě i nájem srozumitelně a prakticky.`}</Preview>
      <Body className="m-body" style={{ backgroundColor: color.surface100, margin: 0, padding: "48px 0", fontFamily }}>
        <Container className="m-container" style={{ width: "100%", maxWidth: 600, backgroundColor: color.surface0, borderRadius: 4, overflow: "hidden" }}>
          <Section style={{ height: 4, lineHeight: "4px", fontSize: 0, backgroundColor: color.brass500 }}>&nbsp;</Section>

          {/* Header */}
          <Section className="m-pad" style={{ padding: "28px 40px" }}>
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
          </Section>

          <Img
            src={`${siteUrl}/email/pruvodce-mesto.jpg`}
            width={600}
            alt=""
            className="m-full"
            style={{ display: "block", width: "100%", height: "auto" }}
          />

          {/* Úvod */}
          <Section className="m-pad" style={{ padding: "40px 40px 8px" }}>
            <Text style={{ ...type.labelS, color: color.brass500 }}>{GUIDE_TITLE}</Text>
            {/* Bez jména v oslovení, 5. pád se ze zadaného jména spolehlivě nevytvoří */}
            <Text style={{ ...type.headingS, color: color.ink900, marginTop: 12 }}>Posíláme vám celého průvodce</Text>
            <Text style={{ ...type.bodyM, color: color.ink700, marginTop: 16 }}>
              Dobrý den, děkujeme za zájem o našeho průvodce. Celé PDF ({GUIDE_PAGES} stran) najdete v příloze tohoto e-mailu.
              Uložte si ho, ať ho máte po ruce, až budete prodávat, kupovat nebo řešit nájem.
            </Text>
          </Section>

          {/* Obsah */}
          <Section className="m-pad" style={{ padding: "24px 40px 0" }}>
            <Text style={{ ...type.labelS, color: color.brass500, marginBottom: 8 }}>Co v průvodci najdete</Text>
            {guideChapters.map((c) => (
              <Section key={c.n}>
                <Hr style={divider} />
                <Row style={{ padding: "14px 0" }}>
                  <Column style={{ width: 36, verticalAlign: "top" }}>
                    <Text style={{ ...type.titleM, color: color.brass500 }}>{c.n}</Text>
                  </Column>
                  <Column style={{ verticalAlign: "top" }}>
                    <Text style={{ ...type.titleS, color: color.navy900 }}>{c.title}</Text>
                    <Text style={{ ...type.bodyS, color: color.ink500, marginTop: 4 }}>{c.points}</Text>
                  </Column>
                </Row>
              </Section>
            ))}
            <Hr style={divider} />
          </Section>

          {/* Kontakt */}
          <Section className="m-pad" style={{ padding: "32px 40px 0" }}>
            <Section style={{ backgroundColor: color.surface50, borderLeft: `3px solid ${color.brass500}`, borderRadius: 4, padding: 24 }}>
              <Text style={{ ...type.titleS, color: color.ink900 }}>Řešíte konkrétní nemovitost?</Text>
              <Text style={{ ...type.bodyM, color: color.ink700, marginTop: 8 }}>
                Rádi s vámi probereme vaše možnosti a pomůžeme vám zorientovat se v dalším kroku. Konzultace je nezávazná a zdarma.
              </Text>
            </Section>
          </Section>

          <Section className="m-pad" style={{ padding: "24px 40px 40px" }}>
            <Row>
              <Column className="m-stack" style={{ width: "50%", paddingRight: 6 }}>
                <Button
                  href={telHref(site.phone)}
                  style={{ ...buttonBase, backgroundColor: color.navy900, color: color.surface0, border: `1px solid ${color.navy900}` }}
                >
                  Zavolat {site.phone}
                </Button>
              </Column>
              <Column className="m-stack" style={{ width: "50%", paddingLeft: 6 }}>
                <Button
                  href={`${siteUrl}/nemovitosti`}
                  style={{ ...buttonBase, backgroundColor: color.surface0, color: color.navy900, border: `1px solid ${color.navy900}` }}
                >
                  Prohlédnout nabídku
                </Button>
              </Column>
            </Row>
            <Text style={{ ...type.bodyM, color: color.ink700, marginTop: 32 }}>
              S pozdravem
              <br />
              <strong style={{ fontWeight: 600, color: color.ink900 }}>Lukáš Hrdina</strong>
              <br />
              <span style={{ color: color.ink500 }}>majitel Hrdina Reality</span>
            </Text>
          </Section>

          {/* Footer */}
          <Section className="m-pad" style={{ backgroundColor: color.navy950, padding: "32px 40px" }}>
            <Text style={{ ...type.bodyS, color: color.onDarkMuted }}>
              Tento e-mail jste dostali, protože jste si na webu hrdinareality.cz vyžádali průvodce. Žádné další e-maily vám posílat nebudeme.
              Na tuto zprávu můžete rovnou odpovědět.
            </Text>
            <Hr style={{ ...divider, borderTop: `1px solid ${color.lineDark}`, margin: "16px 0" }} />
            <Text style={{ ...type.labelS, color: color.onDarkMuted }}>
              Hrdina Reality &nbsp;·&nbsp; <span style={{ whiteSpace: "nowrap" }}>{site.phone}</span>
              <br />
              {site.address.street}, {site.address.postalCode} {site.address.city}
            </Text>
          </Section>
        </Container>

        {trackingUrl && (
          <Img src={trackingUrl} width={1} height={1} alt="" style={{ display: "block", width: 1, height: 1, border: 0 }} />
        )}
      </Body>
    </Html>
  );
}

PruvodceEmail.PreviewProps = {} satisfies PruvodceEmailProps;
