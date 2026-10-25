# TODO – Hrdina Reality

Stav k 5. 10. 2026: všech 8 stránek je převedených z Figmy (desktop i mobil). Typecheck, lint a build prochází.

## Před nasazením (blokující)

- [ ] **`LUKAS_EMAIL` v `lib/actions.ts:13` je přepnutý na testovací adresu** (adam.hitzger@icloud.com). Před nasazením vrátit na `lukas.hrdina@hrdinareality.cz`.
- [ ] Vyzkoušet úspěšné odeslání každého formuláře, zatím se testovala jen neplatná data:
  - [ ] Kontakt (`sendContact`)
  - [ ] Poptávka na detailu nemovitosti (`sendContactFromNemovitosti`)
  - [ ] Přihláška na Kariéře (`sendApplication`), včetně přílohy s CV blízko 10 MB
- [ ] **Ochrana osobních údajů** (`/ochrana-osobnich-udaju`): údaje od klienta jsou doplněné (Hrdina Group s.r.o., IČO, DIČ, e-maily 1 rok, hosting Vercel). Zbývá zjistit další zpracovatele (CRM, účetní, portály) a nechat text zkontrolovat.

## K odsouhlasení s klientem

- [ ] Kontakty makléřů: telefon a e-mail je jen u Lukáše. Čísla …425 a …426 z Figmy vypadala jako zástupná, chybí skutečné (`agentContacts`).
- [ ] Jméno Petry: v Sanity je teď „Petrá Prosrová“ (překlep v „Petrá“), Figma má „Prosrová“. Opravit v Sanity, propisuje se i do schema.org na O nás.
- [ ] Čísla 400+, 38 dní, 4,9 ★ a 127 hodnocení a recenze jsou převzaté z Figmy. Ověřit, že odpovídají skutečnosti.
- [ ] Doplnit do Sanity další nemovitosti. Teď je aktivní jen jedna, takže se na detailu skrývá sekce „Podobné nemovitosti“.
- [ ] Opravit GPS souřadnice u inzerátu v Sanity, ukazují do Francie. Mapa teď hledá podle adresy.

- [ ] Služba 03 se na O nás ve Figmě přejmenovala na „Tržní odhady“, ale popis a odrážky pořád mluví o výkupu (peníze do 48 h, exekuce). Potřeba nový text. Skrytý panel „Služby“ na homepage ve Figmě má pořád „Výkup za hotové“.
- [ ] Fotky v nízkém rozlišení, chtít originály: hero Recenze (`hero-recenze.jpg`, jen 1050×1400 na výšku, na širokém pásu je rozmazaná), fotky v hlavičkách podstránek mají 1700–1900 px (na 1920 px / retině trochu měkké), dvě prodané nemovitosti v Sanity mají fotky jen 450×337 a 500×374.

- [ ] Nová pole v Sanity, která musí vyplnit klient (bez nich se sekce jen skryje):
  - [ ] Nemovitost → **Vybavení a přednosti** (seznam bodů, na detailu ve dvou sloupcích jako ve Figmě).
  - [ ] Recenze → **Obchod a lokalita** (např. „Prodej domu · Mírovka“, pod jménem klientů).
  - [ ] Otevřené pozice → **Typ úvazku** u juniora (nevěděl jsem, jestli HPP nebo IČO). Makléř = HPP + IČO, asistent = částečný úvazek, tipař = jiné a vypnuté „Inzerovat v Google pro Jobs“.
- [ ] Ověřit možnosti výběru „S čím vám můžeme pomoct?“ v poptávce (`INQUIRY_TOPICS` v `lib/schemas.ts`). Figma ukazuje jen „Chci si domluvit prohlídku“, ostatní jsem doplnil.
- [ ] `CONTENT_UPDATED` v `app/sitemap.ts` posunout při větší změně textů v kódu.
- [ ] Recenze: publikovaných je jen 6, dalších 32 je v Sanity jako nepublikované koncepty. Stránkování (12 na stranu) se ukáže až po jejich publikování.
- [ ] Podstránky v Sanity:
  - [ ] Tlačítka v textech vedou na `localhost:3000`, na homepage nebo na Wikislovník. Web zobrazí jen tlačítka s odkazem na konkrétní stránku webu, ostatní skryje. Opravit odkazy, nebo tlačítka smazat.
  - [ ] „Chci zjistit cenu své nemovitosti“ a „Jak maximalizuji prodejní cenu…“ obsahují jen formulář (první dokonce anglický text z McGrath), proto se mezi články nezobrazují a vrací 404. Smazat, nebo doplnit text.
  - [ ] Popisek pro Google (`overview`) je u všech prázdný, perex se proto skládá ze začátku prvního textu. Nadpisy psané verzálkami se na webu převádějí na běžný zápis.

## Odchylky od Figmy (vědomé)

- Opravené překlepy z Figmy: „začína“ → „začíná“, „nemovittost“ → „nemovitost“, „za Vaší pozornost“ → „za vaši pozornost“, „Zjistěte jakou hodnotu má Vaše“ → „Zjistěte, jakou hodnotu má vaše“, „HRDINA Reality“ → „Hrdina Reality“, „úschovu,  i převod“ → „úschovu i převod“.

- Blog (`/blog`, `/blog/[slug]`) Figma nemá, je složený z karty článku z homepage. Články jsou dokumenty **Podstránky** (`page`) ze Sanity, renderuje je `components/blog/ArticleSections.tsx`. Typ Blog (`post`), Stránka knížky (`book`) a Sekce na hlavní stránce (`main`) jsou ze Sanity smazané (25. 10. 2026, záloha v `.sanity-backup/`). Staré adresy `/podstranky/…` přesměrovávají na `/blog/…`.
- Realizované prodeje mají nadpis „Co jsme prodali“ místo „… v roce 2026“, protože data nejsou filtrovaná podle roku.

## Ochrana osobních údajů: co web skutečně zpracovává

Podklad pro text zásad. Musí odpovídat tomu, co web opravdu dělá:

- **Kontaktní formulář a poptávka**: jméno, e-mail, telefon, zpráva (u poptávky i konkrétní nemovitost). Odesílá se e-mailem přes Gmail (Google) Lukášovi a nikde se neukládá do databáze.
- **Přihláška na Kariéře**: jméno, e-mail, telefon, pozice, zdroj, zpráva a CV (může obsahovat cokoliv). Taky jen e-mailem. Formulář má povinný checkbox se souhlasem.
- **Google Maps embed** na detailu nemovitosti: Google může nastavovat cookies a dostává IP návštěvníka.
- **Hosting** (Vercel): serverové logy, IP.
- Analytika ani marketingové cookies na webu **nejsou**. Pokud se přidají, zásady se musí aktualizovat a bude potřeba cookie lišta.
- Odkazy na Facebook a Instagram jsou jen obyčejné odkazy, nejsou to vložené widgety.

Od klienta je potřeba zjistit:

- [x] Správce: Hrdina Group s.r.o., IČO 09617957, DIČ CZ09617957, sídlo U schodů 122/5, Praha 9.
- [x] E-maily z poptávek a přihlášek drží 1 rok.
- [ ] Jestli předává data dalším zpracovatelům (CRM, účetní, realitní portály).
- [x] Hosting: Vercel.
- [ ] Ideálně ať si finální text nechá zkontrolovat (advokát, případně šablona od realitní asociace, pokud v ní je).
