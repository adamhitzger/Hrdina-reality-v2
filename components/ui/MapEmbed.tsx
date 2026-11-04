import { stegaClean } from "next-sanity";

import { geocodeFirst, isInCzechia, type LatLng } from "@/lib/geo";

// Figma: Map / Google Maps (66:939). Mapa je z OpenStreetMap: neoficiální Google embed bez klíče prohlížeče blokovaly.
// Poloha: bod ze Sanity, když leží v Česku, jinak dohledání podle adres v `query` (od nejpřesnější). Když se najde jen
// poslední (obec), ukáže se širší výřez bez špendlíku. Když nenajde nic, zůstane jen odkaz.
export default async function MapEmbed({
  point,
  query,
  label,
  className = "",
}: {
  point?: Partial<LatLng> | null;
  /** Adresa, nebo víc variant od nejpřesnější po nejobecnější (poslední = obec) */
  query: string | string[];
  label: string;
  className?: string;
}) {
  // V náhledu ve Studiu nesou texty stega znaky, Nominatim by s nimi nic nenašel
  const queries = (Array.isArray(query) ? query : [query]).map((q) => stegaClean(q));
  const found = isInCzechia(point) ? { point, exact: true } : await geocodeFirst(queries);
  const p = found?.point;
  // Přiblížení ~15 na ulici, u samotné obce ~13
  const [dLng, dLat] = found?.exact ? [0.012, 0.006] : [0.045, 0.022];
  const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(found?.exact && p ? `${p.lat},${p.lng}` : queries[0])}`;

  return (
    <div className={`relative overflow-hidden rounded bg-[#e8e3da] ${className}`}>
      {p && (
        <iframe
          title={`Mapa – ${label}`}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${[p.lng - dLng, p.lat - dLat, p.lng + dLng, p.lat + dLat].map((n) => n.toFixed(6)).join("%2C")}&layer=mapnik${found?.exact ? `&marker=${p.lat}%2C${p.lng}` : ""}`}
          loading="lazy"
          className="absolute inset-0 size-full border-0"
        />
      )}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 rounded bg-surface-0 px-[14px] py-2.5 text-label-s whitespace-pre text-brass-600 shadow-[0_1px_4px_rgba(0,0,0,0.12)] hover:text-brass-500"
      >
        {"Zobrazit na Google Maps  →"}
      </a>
    </div>
  );
}
