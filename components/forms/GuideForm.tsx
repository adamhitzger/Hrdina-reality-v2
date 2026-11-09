"use client";

import Link from "next/link";
import { useActionState } from "react";

import { button } from "@/components/ui/button";
import { sendGuide } from "@/lib/actions";
import type { GuideType } from "@/lib/schemas";
import type { ActionResponse } from "@/types";

import { TextField } from "./fields";
import { initialActionState, useActionToast } from "./useActionToast";

// /pruvodce: celé PDF průvodce na e-mail
export default function GuideForm() {
  const [state, formAction, pending] = useActionState<ActionResponse<GuideType>, FormData>(sendGuide, initialActionState);
  useActionToast(state);

  if (state.success) {
    return (
      <div role="status" className="flex flex-col gap-3 border-l-[3px] border-brass-500 bg-surface-0 p-6">
        <p className="text-title-s text-ink-900">Průvodce je na cestě</p>
        <p className="text-body-m text-ink-500">
          Celé PDF jsme poslali na zadaný e-mail. Kdyby do pár minut nedorazilo, mrkněte do složky Hromadné nebo Spam.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-[18px] md:flex-row md:gap-4 [&>*]:flex-1">
        <TextField
          idPrefix="guide-"
          name="firstname"
          label="Jméno"
          placeholder="Jan"
          autoComplete="given-name"
          required
          defaultValue={state.inputs?.firstname}
          error={state.errors?.firstname?.[0]}
        />
        <TextField
          idPrefix="guide-"
          name="lastname"
          label="Příjmení"
          placeholder="Novák"
          autoComplete="family-name"
          required
          defaultValue={state.inputs?.lastname}
          error={state.errors?.lastname?.[0]}
        />
      </div>
      <TextField
        idPrefix="guide-"
        name="email"
        type="email"
        label="E-mail"
        placeholder="jan.novak@email.cz"
        autoComplete="email"
        required
        defaultValue={state.inputs?.email}
        error={state.errors?.email?.[0]}
      />
      <p className="text-body-s text-ink-300">
        Odesláním berete na vědomí{" "}
        <Link href="/ochrana-osobnich-udaju#zpracovani" target="_blank" className="underline hover:text-navy-900">
          zpracování osobních údajů
        </Link>
        . Pošleme jen průvodce, žádný newsletter.
      </p>
      <button type="submit" disabled={pending} className={`${button.primary} mt-0.5 w-full`}>
        {pending ? "Odesílám…" : "Poslat celé PDF"}
      </button>
    </form>
  );
}
