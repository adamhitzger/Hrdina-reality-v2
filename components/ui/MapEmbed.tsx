// Figma: Map / Google Maps (66:939) – „náhled vloženého Google Maps embedu“.
// Štítek s adresou z Figmy vynechán – embed zobrazuje vlastní kartu s adresou.
export default function MapEmbed({ query, label, className = "" }: { query: string; label: string; className?: string }) {
  const q = encodeURIComponent(query);
  return (
    <div className={`relative overflow-hidden rounded bg-[#e8e3da] ${className}`}>
      <iframe
        title={`Mapa – ${label}`}
        src={`https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${q}!6i15`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 size-full border-0"
      />
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${q}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 rounded bg-surface-0 px-[14px] py-2.5 text-label-s whitespace-pre text-brass-600 shadow-[0_1px_4px_rgba(0,0,0,0.12)] hover:text-brass-500"
      >
        {"Zobrazit na Google Maps  →"}
      </a>
    </div>
  );
}
