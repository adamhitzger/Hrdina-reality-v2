import "server-only";

import { sanityFetch } from "@/sanity/lib/fetch";
import type { OpenPosition } from "@/sanity/lib/interfaces";
import { OPEN_POSITIONS_QUERY } from "@/sanity/lib/queries";

// Kariéra → Otevřené pozice (Figma 94:1113). Obsah je v Sanity, typ „position“.
export function getOpenPositions() {
  return sanityFetch<OpenPosition[]>({ query: OPEN_POSITIONS_QUERY });
}
