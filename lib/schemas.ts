import * as z from "zod";

const phoneRegex = new RegExp(/^\+?\d{1,4}[\s-]?(\d[\s-]?){6,14}\d$/)

export const contact_schema = z.object({
    fullname: z.string().min(3, {message: "Celé jméno je moc krátké"}).trim(),
    email: z.email({message: "Zadaný formát e-mailu je nespravný"}).min(3, {message: "E-mail je moc krátký"}).trim(),
    phone: z.string().min(1, {message: "Telefonní číslo je moc krátké"}).regex(phoneRegex, {message: "Zadali jste číslo ve špatném formátu"}),
    msg: z.string().trim().optional()
});

export const contact_nemovitosti_schema = z.object({
    fullname: z.string().min(3, {message: "Celé jméno je moc krátké"}).trim(),
    email: z.email({message: "Zadaný formát e-mailu je nespravný"}).min(3, {message: "E-mail je moc krátký"}).trim(),
    phone: z.string().min(1, {message: "Telefonní číslo je moc krátké"}).regex(phoneRegex, {message: "Zadali jste číslo ve špatném formátu"}),
    msg: z.string().optional(),
    id: z.string().trim(),
});

// Vercel pustí do serverové akce nejvýš 4,5 MB (pevný limit platformy, bodySizeLimit ho nezvýší),
// soubor jde rovnou do e-mailu, takže 4 MB a rezerva na ostatní pole
export const CV_MAX_BYTES = 4 * 1024 * 1024;
export const CV_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const application_schema = z.object({
    firstname: z.string().trim().min(2, {message: "Jméno je moc krátké"}),
    lastname: z.string().trim().min(2, {message: "Příjmení je moc krátké"}),
    email: z.email({message: "Zadaný formát e-mailu je nespravný"}).trim(),
    phone: z.string().min(1, {message: "Telefonní číslo je moc krátké"}).regex(phoneRegex, {message: "Zadali jste číslo ve špatném formátu"}),
    position: z.string().trim().min(1, {message: "Vyberte pozici"}),
    source: z.string().trim().optional(),
    msg: z.string().trim().optional(),
    consent: z.literal("on", {message: "Bez souhlasu přihlášku nemůžeme zpracovat"}),
    cv: z
        .instanceof(File)
        .refine((f) => f.size <= CV_MAX_BYTES, {message: "Soubor je větší než 4 MB"})
        .refine((f) => CV_TYPES.includes(f.type), {message: "Nahrajte PDF nebo DOC"})
        .optional(),
});

export type ContactType = z.infer<typeof contact_schema>
export type ContactNemovitostiType = z.infer<typeof contact_nemovitosti_schema>
export type ApplicationType = z.infer<typeof application_schema>
// Co se vrací zpět do formuláře (bez souboru a souhlasu)
export type ApplicationInputs = Omit<ApplicationType, "cv" | "consent">
