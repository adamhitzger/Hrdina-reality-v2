"use client";

import { useActionState } from "react";

import { button } from "@/components/ui/button";
import { sendContactFromNemovitosti } from "@/lib/actions";
import type { ContactNemovitostiType } from "@/lib/schemas";
import type { ActionResponse } from "@/types";

import { TextAreaField, TextField } from "./fields";
import { initialActionState, useActionToast } from "./useActionToast";

// Figma: Detail → Poptávkový formulář (50:1038)
export default function InquiryForm({ slug }: { slug: string }) {
  const [state, formAction, pending] = useActionState<ActionResponse<ContactNemovitostiType>, FormData>(
    sendContactFromNemovitosti,
    initialActionState,
  );
  useActionToast(state);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-[18px]">
      <input type="hidden" name="id" value={slug} />
      <div className="flex flex-col gap-[18px] md:flex-row md:gap-4 [&>*]:flex-1">
        <TextField
          idPrefix="inq-"
          name="fullname"
          label="Jméno a příjmení"
          placeholder="Jan Novák"
          autoComplete="name"
          required
          defaultValue={state.inputs?.fullname}
          error={state.errors?.fullname?.[0]}
        />
        <TextField
          idPrefix="inq-"
          name="phone"
          type="tel"
          label="Telefon"
          placeholder="+420 777 123 456"
          autoComplete="tel"
          required
          defaultValue={state.inputs?.phone}
          error={state.errors?.phone?.[0]}
        />
      </div>
      <TextField
        idPrefix="inq-"
        name="email"
        type="email"
        label="E-mail"
        placeholder="jan.novak@email.cz"
        autoComplete="email"
        required
        defaultValue={state.inputs?.email}
        error={state.errors?.email?.[0]}
      />
      <TextAreaField
        idPrefix="inq-"
        name="msg"
        label="Zpráva"
        placeholder="Dobrý den, rád bych se přišel podívat…"
        rows={4}
        defaultValue={state.inputs?.msg}
        error={state.errors?.msg?.[0]}
      />
      <p className="text-body-s text-ink-300">Odesláním souhlasíte se zpracováním osobních údajů.</p>
      <button type="submit" disabled={pending} className={`${button.primary} mt-0.5 w-full md:w-auto md:self-start`}>
        {pending ? "Odesílám…" : "Odeslat poptávku"}
      </button>
    </form>
  );
}
