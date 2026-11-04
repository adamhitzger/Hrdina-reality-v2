export type LatLng = { lat: number; lng: number };

/** Hrubý obdélník Česka. Starší inzeráty mají v Sanity body ve Francii nebo 0,0 – ty se berou jako chybějící. */
export const isInCzechia = (p?: { lat?: number; lng?: number } | null): p is LatLng =>
  typeof p?.lat === "number" && typeof p?.lng === "number" && p.lat > 48.5 && p.lat < 51.1 && p.lng > 12 && p.lng < 18.9;

/**
 * Poloha podle adresy přes Nominatim (OpenStreetMap), jen jako záloha, když inzerát nemá platný bod.
 * Výsledek drží cache 30 dní, takže se adresa nedotazuje opakovaně (Nominatim povoluje max. 1 dotaz za sekundu).
 */
/** Zkouší adresy od nejpřesnější (celá adresa → ulice a obec → obec), vrátí první nalezenou a jestli jde o přesnou polohu */
export async function geocodeFirst(queries: string[]): Promise<{ point: LatLng; exact: boolean } | null> {
  const unique = [...new Set(queries.map((q) => q.trim()).filter(Boolean))];
  for (const [i, q] of unique.entries()) {
    const point = await geocode(q);
    if (point) return { point, exact: i < unique.length - 1 };
  }
  return null;
}

export async function geocode(address: string): Promise<LatLng | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=cz&q=${encodeURIComponent(address)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "hrdinareality.cz (lukas.hrdina@hrdinareality.cz)" },
      next: { revalidate: 60 * 60 * 24 * 30 },
    });
    if (!res.ok) return null;
    const [hit] = (await res.json()) as { lat: string; lon: string }[];
    const p = hit && { lat: Number(hit.lat), lng: Number(hit.lon) };
    return isInCzechia(p) ? p : null;
  } catch {
    return null;
  }
}
