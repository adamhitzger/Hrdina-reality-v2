import { defineType, defineField } from "sanity"

// Maily z PDF: kdo si na /pruvodce nechal poslat celý průvodce. Dokumenty zakládá web (lib/actions.ts → sendGuide),
// zobrazení počítá sledovací pixel v e-mailu (app/api/email-open/route.ts).
export const pdfLeadType = defineType({
    name: "pdfLead",
    title: "Maily z PDF",
    type: "document",
    fields: [
        defineField({
            name: "firstname",
            title: "Jméno",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "lastname",
            title: "Příjmení",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "email",
            title: "E-mail",
            type: "string",
            validation: (rule) => rule.required().email(),
        }),
        defineField({
            name: "sentAt",
            title: "PDF odesláno",
            type: "datetime",
            description: "Prázdné = e-mail se nepodařilo odeslat.",
            readOnly: true,
        }),
        defineField({
            name: "openCount",
            title: "Počet zobrazení e-mailu",
            type: "number",
            description:
                "Počítá se přes neviditelný obrázek v e-mailu. Je to jen orientační číslo: kdo má vypnuté obrázky, se nezapočítá, a Apple Mail nebo Gmail si obrázek někdy stáhnou samy, i když e-mail nikdo neotevřel.",
            initialValue: 0,
            readOnly: true,
        }),
        defineField({
            name: "firstOpenedAt",
            title: "Poprvé zobrazeno",
            type: "datetime",
            readOnly: true,
        }),
        defineField({
            name: "lastOpenedAt",
            title: "Naposledy zobrazeno",
            type: "datetime",
            readOnly: true,
        }),
    ],
    orderings: [
        { title: "Nejnovější", name: "createdDesc", by: [{ field: "_createdAt", direction: "desc" }] },
        { title: "Nejvíc zobrazení", name: "openCountDesc", by: [{ field: "openCount", direction: "desc" }] },
    ],
    preview: {
        select: { firstname: "firstname", lastname: "lastname", email: "email", openCount: "openCount", sentAt: "sentAt" },
        prepare: ({ firstname, lastname, email, openCount, sentAt }) => ({
            title: [firstname, lastname].filter(Boolean).join(" ") || email,
            subtitle: `${email ?? ""} · ${sentAt ? `zobrazeno ${openCount ?? 0}×` : "neodesláno"}`,
        }),
    },
})
