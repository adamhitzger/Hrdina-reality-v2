import "server-only";

import { render } from "react-email";

import KontaktEmail, { kontaktSubject } from "@/emails/kontakt";
import PrihlaskaEmail, { prihlaskaSubject } from "@/emails/prihlaska";
import PoptavkaNemovitostiEmail, { poptavkaSubject, type PoptavkaProperty } from "@/emails/poptavka-nemovitosti";
import { roles } from "@/lib/careers";
import type { ApplicationInputs, ContactNemovitostiType, ContactType } from "@/lib/schemas";
import type { Reality } from "@/sanity/lib/interfaces";

export async function renderKontaktEmail(data: ContactType) {
  const email = <KontaktEmail {...data} />;
  return {
    subject: kontaktSubject(data.fullname),
    html: await render(email),
    text: await render(email, { plainText: true }),
  };
}

export async function renderPoptavkaEmail(data: ContactNemovitostiType, reality: Reality | null) {
  const property: PoptavkaProperty | null = reality
    ? {
        name: reality.name,
        slug: reality.slug,
        price: reality.price,
        specs: [reality.type, reality.area && `${reality.area} m²`, reality.city].filter(Boolean).join(" · "),
        imageUrl: reality.imageUrl,
      }
    : null;
  const email = <PoptavkaNemovitostiEmail {...data} property={property} />;
  return {
    subject: poptavkaSubject(data.fullname, property?.name),
    html: await render(email),
    text: await render(email, { plainText: true }),
  };
}

export async function renderPrihlaskaEmail(data: ApplicationInputs) {
  const fullname = `${data.firstname} ${data.lastname}`;
  const role = roles.find((r) => r.title === data.position);
  const email = (
    <PrihlaskaEmail
      fullname={fullname}
      email={data.email}
      phone={data.phone}
      msg={data.msg}
      source={data.source}
      position={{ title: data.position, slug: role?.slug, tag: role?.tag }}
    />
  );
  return {
    subject: prihlaskaSubject(fullname, data.position),
    html: await render(email),
    text: await render(email, { plainText: true }),
  };
}
