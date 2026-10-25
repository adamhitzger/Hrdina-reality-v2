import { defineType, defineField } from "sanity"

export const reviewType = defineType({
    name: "review",
    title: "Recenze",
    type: "document",
    fields: [
        defineField({
            name: "review",
            title: "Text recenze",
            type: "text",
            rows: 5,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "image",
            title: "Fotka (osobně psaná recenze)",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "clients",
            title: "Jména klientů",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "deal",
            title: "Obchod a lokalita",
            type: "string",
            description: "Zobrazí se pod jménem, např. „Prodej domu · Mírovka“ nebo „Pronájem bytu · Havlíčkův Brod“. Nepovinné.",
            validation: (rule) => rule.max(50),
        }),
    ],
    preview: {
        select: { title: "clients", deal: "deal", review: "review", media: "image" },
        prepare: ({ title, deal, review, media }) => ({ title, subtitle: deal || review, media }),
    },
})
