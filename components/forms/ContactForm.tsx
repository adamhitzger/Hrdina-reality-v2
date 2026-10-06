"use client";

import { useActionState } from "react";

import { button } from "@/components/ui/button";
import { sendContact } from "@/lib/actions";
import type { ContactType } from "@/lib/schemas";
import type { ActionResponse } from "@/types";

import { TextAreaField, TextField } from "./fields";
import { initialActionState, useActionToast } from "./useActionToast";

// Figma: Kontakt → Formulář (32:662)
export default function ContactForm() {
  const [state, formAction, pending] = useActionState<ActionResponse<ContactType>, FormData>(sendContact, initialActionState);
  useActionToast(state);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-[18px]">
      <TextField
        name="fullname"
        label="Jméno a příjmení"
        placeholder="Jan Novák"
        autoComplete="name"
        required
        defaultValue={state.inputs?.fullname}
        error={state.errors?.fullname?.[0]}
      />
      <TextField
        name="email"
        type="email"
        label="E-mail"
        placeholder="jan.novak@email.cz"
        autoComplete="email"
        required
        defaultValue={state.inputs?.email}
        error={state.errors?.email?.[0]}
      />
      <TextField
        name="phone"
        type="tel"
        label="Telefon"
        placeholder="+420 777 123 456"
        autoComplete="tel"
        required
        defaultValue={state.inputs?.phone}
        error={state.errors?.phone?.[0]}
      />
      <TextAreaField
        name="msg"
        label="Zpráva"
        placeholder="Dobrý den, rád bych prodal byt 3+1 v Havlíčkově Brodě…"
        rows={4}
        className="min-h-[132px]"
        defaultValue={state.inputs?.msg}
        error={state.errors?.msg?.[0]}
      />
      <p className="text-body-s text-ink-300">Odesláním souhlasíte se zpracováním osobních údajů.</p>
      <button type="submit" disabled={pending} className={`${button.primary} mt-0.5 w-full`}>
        {pending ? "Odesílám…" : "Odeslat zprávu"}
      </button>
    </form>
  );
}
