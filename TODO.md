# TODO – Hrdina Reality

Stav k 5. 10. 2026: všech 8 stránek je převedených z Figmy (desktop i mobil). Typecheck, lint a build prochází.

## Před nasazením (blokující)

- [ ] **`LUKAS_EMAIL` v `lib/actions.ts:13` je přepnutý na testovací adresu** (adam.hitzger@icloud.com). Před nasazením vrátit na `lukas.hrdina@hrdinareality.cz`.
- [ ] Vyzkoušet úspěšné odeslání každého formuláře, zatím se testovala jen neplatná data:
  - [ ] Kontakt (`sendContact`)
  - [ ] Poptávka na detailu nemovitosti (`sendContactFromNemovitosti`)
  - [ ] Přihláška na Kariéře (`sendApplication`), včetně přílohy s CV blízko 10 MB
- [ ] Stránka **Ochrana osobních údajů** a odkaz na ni z patičky (`components/layout/Footer.tsx:58`, zatím je tam jen `<span>`) a z textu u formulářů. Podrobnosti v sekci níže.

## K odsouhlasení s klientem

- [ ] FAQ: Figma má odpověď jen u první otázky, ostatních 6 jsem napsal sám (`lib/content.ts`, `faq`).
- [ ] Kontakty makléřů: telefon a e-mail je jen u Lukáše. Čísla …425 a …426 z Figmy vypadala jako zástupná, chybí skutečné (`agentContacts`).
- [ ] Jméno Petry: Figma má „Prosrová“, Sanity „Prosová“. Použito „Prosová“.
- [ ] Čísla 400+, 38 dní, 4,9 ★ a 127 hodnocení a recenze jsou převzaté z Figmy. Ověřit, že odpovídají skutečnosti.
- [ ] Doplnit do Sanity další nemovitosti. Teď je aktivní jen jedna, takže se na detailu skrývá sekce „Podobné nemovitosti“.
- [ ] Opravit GPS souřadnice u inzerátu v Sanity, ukazují do Francie. Mapa teď hledá podle adresy.

## Odchylky od Figmy (vědomé)

- Poptávka nemá výběr „S čím vám můžeme pomoct?“, protože ho schéma neobsahuje. Pokud ho chceme, přidat ho do `contact_nemovitosti_schema`, do akce i do e-mailu.
- Blog (`/blog`, `/blog/[slug]`) Figma nemá, je složený z karty článku z homepage. „Rady a novinky“ na homepage ukazují ukázkové články z Figmy, dokud v Sanity není publikovaný žádný článek.
- Realizované prodeje mají nadpis „Co jsme prodali“ místo „… v roce 2026“, protože data nejsou filtrovaná podle roku.

## Ochrana osobních údajů: co web skutečně zpracovává

Podklad pro text zásad. Musí odpovídat tomu, co web opravdu dělá:

- **Kontaktní formulář a poptávka**: jméno, e-mail, telefon, zpráva (u poptávky i konkrétní nemovitost). Odesílá se e-mailem přes Gmail (Google) Lukášovi a nikde se neukládá do databáze.
- **Přihláška na Kariéře**: jméno, e-mail, telefon, pozice, zdroj, zpráva a CV (může obsahovat cokoliv). Taky jen e-mailem. Formulář má povinný checkbox se souhlasem.
- **Google Maps embed** na detailu nemovitosti: Google může nastavovat cookies a dostává IP návštěvníka.
- **Hosting** (Vercel?): serverové logy, IP.
- Analytika ani marketingové cookies na webu **nejsou**. Pokud se přidají, zásady se musí aktualizovat a bude potřeba cookie lišta.
- Odkazy na Facebook a Instagram jsou jen obyčejné odkazy, nejsou to vložené widgety.

Od klienta je potřeba zjistit:

- [ ] Správce: přesný název firmy nebo jméno OSVČ, IČO, sídlo, kontaktní e-mail pro GDPR.
- [ ] Jak dlouho drží e-maily z poptávek a přihlášek (CV neúspěšných uchazečů).
- [ ] Jestli předává data dalším zpracovatelům (CRM, účetní, realitní portály).
- [ ] Hosting (Vercel nebo jiný).
- [ ] Ideálně ať si finální text nechá zkontrolovat (advokát, případně šablona od realitní asociace, pokud v ní je).
