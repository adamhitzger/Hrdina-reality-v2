import { sanityFetch } from "@/sanity/lib/fetch";
import { HERO_PHOTO_QUERY } from "@/sanity/lib/queries";

/** Hero fotka podstránky ze Sanity (singleton `id`), null když chybí */
export const getHeroPhoto = (id: "propertiesPhotos" | "contactPhotos" | "soldPhotos") =>
  sanityFetch<string | null>({ query: HERO_PHOTO_QUERY, params: { id } });
