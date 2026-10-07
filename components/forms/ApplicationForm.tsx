"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

import { button } from "@/components/ui/button";
import { sendApplication } from "@/lib/actions";
import { positions } from "@/lib/careers";
import { CV_MAX_BYTES, CV_TYPES, type ApplicationInputs } from "@/lib/schemas";
import type { ActionResponse } from "@/types";

import { SelectField, TextAreaField, TextField } from "./fields";
import { initialActionState, useActionToast } from "./useActionToast";

const sources = ["Doporučení od známého", "Web / Google", "Sociální sítě", "Inzerát", "Jinak"];

// Figma: Kariéra → Přihláška → Formulář (94:1225)
export default function ApplicationForm({ defaultPosition }: { defaultPosition?: string }) {
  const [state, formAction, pending] = useActionState<ActionResponse<ApplicationInputs>, FormData>(sendApplication, initialActionState);
  useActionToast(state);
  // Životopis jde rovnou do e-mailu přes serverovou akci, velikost a typ se hlídají už tady
  const [cv, setCv] = useState<{ name: string; error?: string }>();

  function handleFile(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (!file) return setCv(undefined);
    const error = !CV_TYPES.includes(file.type) ? "Nahrajte PDF nebo DOC" : file.size > CV_MAX_BYTES ? "Soubor je větší než 4 MB, zmenšete ho prosím" : undefined;
    // Nevyhovující soubor se z inputu vyhodí, aby se neodeslal
    if (error) input.value = "";
    setCv({ name: file.name, error });
  }

  // Po odeslání se formulář resetuje, takže zapomeneme i vybraný soubor
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    setCv(undefined);
  }

  // consent a cv nejsou v ApplicationInputs, chyby k nim ale akce vrací
  const errors = state.errors as Record<string, string[] | undefined> | undefined;
  const cvError = cv?.error ?? errors?.cv?.[0];

  return (
    <form action={formAction} noValidate className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-[18px] md:flex-row md:gap-4 [&>*]:flex-1">
        <TextField
          idPrefix="app-"
          name="firstname"
          label="Jméno"
          placeholder="Jan"
          autoComplete="given-name"
          required
          defaultValue={state.inputs?.firstname}
          error={errors?.firstname?.[0]}
        />
        <TextField
          idPrefix="app-"
          name="lastname"
          label="Příjmení"
          placeholder="Novák"
          autoComplete="family-name"
          required
          defaultValue={state.inputs?.lastname}
          error={errors?.lastname?.[0]}
        />
      </div>
      <div className="flex flex-col gap-[18px] md:flex-row md:gap-4 [&>*]:flex-1">
        <TextField
          idPrefix="app-"
          name="email"
          type="email"
          label="E-mail"
          placeholder="jan.novak@email.cz"
          autoComplete="email"
          required
          defaultValue={state.inputs?.email}
          error={errors?.email?.[0]}
        />
        <TextField
          idPrefix="app-"
          name="phone"
          type="tel"
          label="Telefon"
          placeholder="+420 …"
          autoComplete="tel"
          required
          defaultValue={state.inputs?.phone}
          error={errors?.phone?.[0]}
        />
      </div>
      <SelectField
        idPrefix="app-"
        name="position"
        label="O jakou pozici máte zájem?"
        placeholder="Vyberte pozici"
        options={positions}
        required
        defaultValue={state.inputs?.position ?? defaultPosition ?? ""}
        error={errors?.position?.[0]}
      />
      <SelectField
        idPrefix="app-"
        name="source"
        label="Jak jste se o nás dozvěděli?"
        placeholder="Vyberte možnost"
        options={sources}
        defaultValue={state.inputs?.source ?? ""}
        error={errors?.source?.[0]}
      />
      <TextAreaField
        idPrefix="app-"
        name="msg"
        label="Pár slov o vás"
        placeholder="Co vás na realitách láká, jaké máte zkušenosti…"
        rows={4}
        className="min-h-[132px]"
        defaultValue={state.inputs?.msg}
        error={errors?.msg?.[0]}
      />

      <div className="flex flex-col gap-2">
        <span id="app-cv-label" className="text-label-s text-ink-500">
          Životopis (nepovinné)
        </span>
        <label
          className={`relative flex cursor-pointer flex-col items-center gap-1 rounded border border-dashed bg-surface-0 px-[18px] py-6 text-center transition-colors hover:border-brass-500 focus-within:border-navy-900 ${
            cvError ? "border-[#b42318]" : "border-line-200"
          }`}
        >
          <input
            type="file"
            name="cv"
            aria-labelledby="app-cv-label"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => handleFile(e.target)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <span className="text-body-m text-ink-700">{cv && !cv.error ? cv.name : "Přetáhněte soubor sem nebo vyberte z počítače"}</span>
          <span className="text-body-s text-ink-300">PDF nebo DOC, max. 4 MB</span>
        </label>
        {cvError && (
          <p role="alert" className="text-body-s text-[#b42318]">
            {cvError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-px size-5 shrink-0 cursor-pointer appearance-none rounded border border-line-200 bg-surface-0 bg-center bg-no-repeat checked:border-navy-900 checked:bg-navy-900 checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22><path d=%22M5 10.5l3.2 3L15 7%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22/></svg>')] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
          />
          <span className="flex-1 text-body-s text-ink-500">
            Souhlasím se{" "}
            <Link href="/ochrana-osobnich-udaju#zpracovani" target="_blank" className="underline hover:text-navy-900">
              zpracováním osobních údajů
            </Link>{" "}
            pro účely výběrového řízení.
          </span>
        </label>
        {errors?.consent?.[0] && <p className="text-body-s text-[#b42318]">{errors.consent[0]}</p>}
      </div>

      <button type="submit" disabled={pending} className={`${button.primary} w-full`}>
        {pending ? "Odesílám…" : "Odeslat přihlášku"}
      </button>
    </form>
  );
}
