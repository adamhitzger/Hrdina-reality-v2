import { DocumentLocationResolver } from "sanity/presentation";
import { map } from "rxjs";

import { pagePhotoDocs } from "../schemaTypes/pagePhotos";

// Pevné stránky podle typu dokumentu
const STATIC: Record<string, { title: string; href: string }[]> = {
  review: [{ title: "Recenze", href: "/recenze" }],
  staff: [{ title: "O nás", href: "/o-nas" }],
  position: [{ title: "Kariéra", href: "/kariera" }],
  ...Object.fromEntries(pagePhotoDocs.map((d) => [d.type, [{ title: d.title, href: d.path }]])),
};

// Dokumenty se slugem: nemovitost → /nemovitosti/…, podstránka → /blog/…
const BY_SLUG: Record<string, { prefix: string; list: { title: string; href: string } }> = {
  reality: { prefix: "/nemovitosti/", list: { title: "Nemovitosti", href: "/nemovitosti" } },
  page: { prefix: "/blog/", list: { title: "Blog", href: "/blog" } },
};

export const locate: DocumentLocationResolver = (params, context) => {
  if (STATIC[params.type]) return { locations: STATIC[params.type] };

  const route = BY_SLUG[params.type];
  if (!route) return null;

  return context.documentStore
    .listenQuery(`*[_id == $id][0]{name, title, "slug": slug.current}`, { id: params.id }, { perspective: "drafts" })
    .pipe(
      map((doc: { name?: string; title?: string; slug?: string } | null) =>
        doc?.slug
          ? { locations: [{ title: doc.name || doc.title || "Bez názvu", href: `${route.prefix}${doc.slug}` }, route.list] }
          : null,
      ),
    );
};
