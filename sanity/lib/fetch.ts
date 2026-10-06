// ./sanity/lib/fetch.ts

import type { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";


import { client } from "./client";
import { token } from "./token";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  perspective,
  stega,
}: {
  query: string;
  params?: QueryParams;
  perspective?: "drafts" | "published";
  stega?: boolean;
}) {
  perspective ??= (await draftMode()).isEnabled ? "drafts" : "published";
  stega ??= perspective === "drafts" || process.env.VERCEL_ENV === "preview";

  if (perspective === "drafts") {
    return client.fetch<QueryResponse>(query, params, {
      stega,
      perspective: "drafts",
      token,
      useCdn: false,
      next: { revalidate: 0 },
    });
  }
  return client.fetch<QueryResponse>(query, params, {
    stega,
    perspective: "published",
    useCdn: true,
    next: { revalidate: 30 },
  });
}
