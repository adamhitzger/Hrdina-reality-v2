// Cena je v Sanity jako text – buď číslo ("4350000"), nebo hotový řetězec ("12 500 Kč / měsíc", "Cena na vyžádání")
export function formatPrice(price?: string | null) {
  if (!price) return "Cena na vyžádání";
  const trimmed = price.trim();
  if (/^\d[\d\s]*$/.test(trimmed)) {
    return `${new Intl.NumberFormat("cs-CZ").format(Number(trimmed.replace(/\s/g, "")))} Kč`;
  }
  return trimmed;
}

// „Rodinný dům · 164 m² · Havlíčkův Brod“
export function formatSpecs(...parts: (string | number | null | undefined | false)[]) {
  return parts.filter(Boolean).join(" · ");
}

export function formatArea(area?: number | null) {
  return area ? `${new Intl.NumberFormat("cs-CZ").format(area)} m²` : undefined;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

// „58231“ → „582 31“
export function formatPostcode(postcode?: string | null) {
  const digits = postcode?.replace(/\s/g, "");
  return digits && /^\d{5}$/.test(digits) ? `${digits.slice(0, 3)} ${digits.slice(3)}` : postcode ?? undefined;
}

// Česká množná čísla: plural(3, ["článek", "články", "článků"]) → „3 články“
export function plural(n: number, [one, few, many]: [string, string, string]) {
  return `${n} ${n === 1 ? one : n >= 2 && n <= 4 ? few : many}`;
}
