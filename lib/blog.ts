import type { PostCard } from "@/sanity/lib/interfaces";

import { plural } from "./format";
import { defaultAuthor } from "./site";

// „5. 10. 2026“
export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" }).format(new Date(date));
}

// „4 min čtení · Prodej“ (200 slov za minutu)
export function postMeta(post: Pick<PostCard, "words" | "category">) {
  const minutes = Math.max(1, Math.round((post.words ?? 0) / 200));
  return [`${minutes} min čtení`, post.category].filter(Boolean).join(" · ");
}

export function postAuthor(post: Pick<PostCard, "author">) {
  return post.author ?? defaultAuthor;
}

// „0 článků“, „1 článek“, „3 články“, „12 článků“
export function postCount(n: number) {
  return plural(n, ["článek", "články", "článků"]);
}
