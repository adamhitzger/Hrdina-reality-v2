"use server";

import { sanityFetch } from "@/sanity/lib/fetch";
import { Reality, RealityCard } from "@/sanity/lib/interfaces";
import { groq } from "next-sanity";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import nodemailer from "nodemailer"
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ActionResponse } from "@/types";
import { ApplicationInputs, ContactNemovitostiType, ContactType, GuideType, application_schema, contact_schema, contact_nemovitosti_schema, guide_schema } from "@/lib/schemas";
import { REALITY_QUERY } from "@/sanity/lib/queries";
import { renderKontaktEmail, renderPoptavkaEmail, renderPrihlaskaEmail, renderPruvodceEmail, renderPruvodceLeadEmail } from "@/lib/emails";
import { GUIDE_FILENAME } from "@/lib/guide";
import { site, siteUrl } from "@/lib/site";
import { writeClient } from "@/sanity/lib/write-client";

const LUKAS_EMAIL = "lukas.hrdina@hrdinareality.cz";

// Honeypot (components/forms/fields.tsx → Honeypot): skryté pole is_human vyplní jen bot.
// Bot dostane „úspěch“, aby nezkoušel znovu, ale nic se neuloží ani neodešle.
function isBot(formData: FormData, action: string) {
    const value = formData.get("is_human");
    if (typeof value === "string" && value.trim() !== "") {
        console.warn(`Honeypot v ${action}: odeslání zahozeno`);
        return true;
    }
    return false;
}

const BOT_RESPONSE = { success: true, submitted: true, message: "Odesláno" } as const;

function smtp(){
    return nodemailer.createTransport({
        host: "smtp.seznam.cz",
        port: 587,
        secure: false,
        auth: {
         user: process.env.FROM_EMAIL!,
         pass: process.env.FROM_EMAIL_PASSWORD!,
        },
        tls: {
         ciphers: "SSLv3"
        }
      });
}

export default async function getNemovitosti(params: string, start: number, end: number){
    let filter: string = "";
    
    switch(params) {
       case "kpronajmu":
        filter = "K pronájmu";
        break;
        case "naprodej":
        filter = "Na prodej";
        break;
        case "prodano":
        filter = "Prodáno";
        break;
        default:
            break;
    }

    const FILTERED_REALITIES_QUERY = groq`*[_type == 'reality' && status == '${filter}'] | order(_createdAt asc)[${start}..${end}] {
        name,
        'slug': slug.current,
        overview,
        price,
        "imageUrl": image.asset->url
      }`;

      const COUNT_ALL_REALITIES = groq`count(*[_type == 'reality' && status == '${filter}'])`;

    try {
        const result = await sanityFetch<RealityCard[]>({query: FILTERED_REALITIES_QUERY});
        const count = await sanityFetch<RealityCard[]>({query: COUNT_ALL_REALITIES});
        
        return { result, count };
    }catch(error){
        console.error(error);
        throw error;
    }
}

export async function sendContact(
    _prevState: ActionResponse<ContactType>,
    formData: FormData
  ): Promise<ActionResponse<ContactType>> {
    if (isBot(formData, "sendContact")) return BOT_RESPONSE;
    const revalidate = false;
    const transporter = smtp();
    try {
        const raw_data: ContactType = {
            fullname: formData.get("fullname") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            msg: formData.get("msg") as string,
        }

        const validate = contact_schema.safeParse(raw_data);

        if(!validate.success){
            return {
                success: false,
                submitted:true,
                message: "Některá pole jste nevyplnili dobře",
                errors: validate.error.flatten().fieldErrors,
                inputs: raw_data,
            }
        }

        const data = validate.data;

        const mail = await renderKontaktEmail(data);

        const sendMail = await transporter.sendMail({
          from: `"Web Hrdina Reality" <${process.env.FROM_EMAIL}>`,
          to: LUKAS_EMAIL,
          replyTo: { name: data.fullname, address: data.email },
          ...mail,
        })

        if(sendMail.accepted.length === 0){
            return {
                success: false,
                submitted:true,
                message: "Nepodařilo se odeslat mail. Kontaktujte mě napřímo",
                inputs: raw_data,
            }
        }

        return {
            success: true,
            submitted:true,
            message: "Odesláno",
        }

    }catch(error){
        console.error("Eroor v serverové akci sendContact: ", error);
        return {
            submitted:true,
            success: false,
            message: "Nepovedlo se odeslat Vaše údaje",
        };
    }finally{
        if(revalidate){
            revalidatePath("/")
        }
    }
  }

  export async function sendContactFromNemovitosti(
    _prevState: ActionResponse<ContactNemovitostiType>,
    formData: FormData
  ): Promise<ActionResponse<ContactNemovitostiType>> {
    if (isBot(formData, "sendContactFromNemovitosti")) return BOT_RESPONSE;
    const revalidate = false;
    const transporter = smtp();
    try {
        const raw_data: ContactNemovitostiType = {
            fullname: formData.get("fullname") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            topic: formData.get("topic") as ContactNemovitostiType["topic"],
            msg: formData.get("msg") as string,
            id: formData.get("id") as string
        }

        const validate = contact_nemovitosti_schema.safeParse(raw_data);

        if(!validate.success){
            return {
                success: false,
                submitted:true,
                message: "Některá pole jste nevyplnili dobře",
                errors: validate.error.flatten().fieldErrors,
                inputs: raw_data,
            }
        }

        const data = validate.data;

        const nemovitost = await sanityFetch<Reality>({
          query: REALITY_QUERY,
          params: {slug: data.id}
        }) as Reality | null;

        const mail = await renderPoptavkaEmail(data, nemovitost);

        const sendMail = await transporter.sendMail({
          from: `"Web Hrdina Reality" <${process.env.FROM_EMAIL}>`,
          to: LUKAS_EMAIL,
          replyTo: { name: data.fullname, address: data.email },
          ...mail,
        })

        if(sendMail.accepted.length === 0){
            return {
                success: false,
                submitted:true,
                message: "Nepodařilo se odeslat mail. Kontaktujte mě napřímo",
                inputs: raw_data,
            }
        }

        return {
            success: true,
            submitted:true,
            message: "Odesláno",
        }

    }catch(error){
        console.error("Eroor v serverové akci sendContactFromNemovitosti: ", error);
        return {
            submitted:true,
            success: false,
            message: "Nepovedlo se odeslat Vaše údaje",
        };
    }finally{
        if(revalidate){
            revalidatePath("/")
        }
    }
  }

  export async function sendApplication(
    prevState: ActionResponse<ApplicationInputs>,
    formData: FormData
  ): Promise<ActionResponse<ApplicationInputs>> {
    if (isBot(formData, "sendApplication")) return BOT_RESPONSE;
    const transporter = smtp();
    const raw_inputs: ApplicationInputs = {
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        position: formData.get("position") as string,
        source: formData.get("source") as string,
        msg: formData.get("msg") as string,
    };
    try {
        // Prázdný file input posílá File o velikosti 0
        const cv = formData.get("cv");
        const validate = application_schema.safeParse({
            ...raw_inputs,
            consent: formData.get("consent") ?? undefined,
            cv: cv instanceof File && cv.size > 0 ? cv : undefined,
        });

        if(!validate.success){
            return {
                success: false,
                submitted: true,
                message: "Některá pole jste nevyplnili dobře",
                errors: validate.error.flatten().fieldErrors,
                inputs: raw_inputs,
            }
        }

        const data = validate.data;
        const fullname = `${data.firstname} ${data.lastname}`;
        const mail = await renderPrihlaskaEmail(data);


        const sendMail = await transporter.sendMail({
          from: `"Web Hrdina Reality" <${process.env.FROM_EMAIL}>`,
          to: LUKAS_EMAIL,
          replyTo: { name: fullname, address: data.email },
          ...mail,
          attachments: data.cv
            ? [{ filename: data.cv.name, content: Buffer.from(await data.cv.arrayBuffer()), contentType: data.cv.type }]
            : [],
        })

        if(sendMail.accepted.length === 0){
            return {
                success: false,
                submitted: true,
                message: "Nepodařilo se odeslat přihlášku. Zavolejte nám prosím.",
                inputs: raw_inputs,
            }
        }

        return {
            success: true,
            submitted: true,
            message: "Přihláška odeslána, ozveme se do tří pracovních dnů",
        }
    }catch(error){
        console.error("Error v serverové akci sendApplication: ", error);
        return {
            submitted: true,
            success: false,
            message: "Nepovedlo se odeslat přihlášku",
            inputs: raw_inputs,
        };
    }
  }


  // Jeden e-mail = jeden dokument „Maily z PDF“. Nejdřív hledá existující (i staré s náhodným _id),
  // jinak založí nový s _id odvozeným z e-mailu: dvojklik nebo dvě souběžná odeslání tak skončí 409, ne duplikátem.
  async function upsertPdfLead(sanity: ReturnType<typeof writeClient>, data: GuideType) {
    const email = data.email.toLowerCase();
    const existingId = await sanity.fetch<string | null>(
      `*[_type == "pdfLead" && lower(email) == $email] | order(_createdAt asc)[0]._id`,
      { email },
    );
    if (existingId) return { id: existingId, isNew: false };

    // Bez teček (ty by z dokumentu udělaly neveřejnou cestu) a v mezích ID regexu v app/api/email-open/route.ts
    const id = `pdfLead-${createHash("sha256").update(email).digest("hex").slice(0, 32)}`;
    try {
      await sanity.create({ _id: id, _type: "pdfLead", ...data, email, openCount: 0, requestCount: 1 });
      return { id, isNew: true };
    } catch (error) {
      if ((error as { statusCode?: number }).statusCode === 409) return { id, isNew: false };
      throw error;
    }
  }

  // Průvodce světem nemovitostí: kontakt se uloží do Sanity (Maily z PDF), PDF jde zákazníkovi v příloze
  // a e-mail nese sledovací pixel s _id dokumentu (app/api/email-open/route.ts).
  // Opakované odeslání stejného e-mailu PDF pošle znovu, ale nový dokument ani upozornění nevzniká.
  export async function sendGuide(
    _prevState: ActionResponse<GuideType>,
    formData: FormData
  ): Promise<ActionResponse<GuideType>> {
    if (isBot(formData, "sendGuide")) return BOT_RESPONSE;
    const raw_inputs: GuideType = {
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        email: formData.get("email") as string,
    };
    try {
        const validate = guide_schema.safeParse(raw_inputs);

        if(!validate.success){
            return {
                success: false,
                submitted: true,
                message: "Některá pole jste nevyplnili dobře",
                errors: validate.error.flatten().fieldErrors,
                inputs: raw_inputs,
            }
        }

        const data = validate.data;
        const sanity = writeClient();
        const lead = await upsertPdfLead(sanity, data);

        if (lead.isNew) {
            // Upozornění pro Hrdina Reality na Gmail; zákazník na něj nečeká a jeho selhání odeslání PDF nezastaví
            after(async () => {
                try {
                    const notice = await renderPruvodceLeadEmail(data);
                    await smtp().sendMail({
                        from: `"Web Hrdina Reality" <${process.env.FROM_EMAIL}>`,
                        to: site.email,
                        replyTo: { name: `${data.firstname} ${data.lastname}`, address: data.email },
                        ...notice,
                    });
                } catch (error) {
                    console.error("Error při upozornění na nového zájemce o průvodce: ", error);
                }
            });
        } else {
            // Jméno podle posledního odeslání, počet žádostí je vidět ve Studiu
            await sanity
                .patch(lead.id)
                .set({ firstname: data.firstname, lastname: data.lastname })
                .setIfMissing({ requestCount: 1 })
                .inc({ requestCount: 1 })
                .set({ lastRequestedAt: new Date().toISOString() })
                .commit();
        }

        const [mail, pdf] = await Promise.all([
            renderPruvodceEmail(`${siteUrl}/api/email-open?id=${encodeURIComponent(lead.id)}`),
            // Pevná cesta, s proměnnou by Turbopack přibalil do funkce celý projekt
            readFile(path.join(process.cwd(), "assets/pruvodce-svetem-nemovitosti.pdf")),
        ]);

        const sendMail = await smtp().sendMail({
          from: `"Hrdina Reality" <${process.env.FROM_EMAIL}>`,
          to: { name: `${data.firstname} ${data.lastname}`, address: data.email },
          replyTo: { name: site.name, address: site.email },
          ...mail,
          attachments: [{ filename: GUIDE_FILENAME, content: pdf, contentType: "application/pdf" }],
        })

        if(sendMail.accepted.length === 0){
            return {
                success: false,
                submitted: true,
                message: "Průvodce se nepodařilo odeslat. Zkontrolujte e-mail, nebo nám zavolejte.",
                inputs: raw_inputs,
            }
        }

        await sanity.patch(lead.id).set({ sentAt: new Date().toISOString() }).commit();

        return {
            success: true,
            submitted: true,
            message: "Hotovo, průvodce máte v e-mailu",
        }
    }catch(error){
        console.error("Error v serverové akci sendGuide: ", error);
        return {
            submitted: true,
            success: false,
            message: "Průvodce se nepodařilo odeslat",
            inputs: raw_inputs,
        };
    }
  }
