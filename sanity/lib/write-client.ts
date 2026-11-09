import "server-only"

import { createClient } from "next-sanity"
import { experimental_taintUniqueValue } from "react"

import { apiVersion, dataset, projectId } from "../env"

// Zápis do Sanity z webu (Maily z PDF). Token s rolí Editor, read token zapisovat nesmí.
const token = process.env.SANITY_API_WRITE_TOKEN

if (token) {
  experimental_taintUniqueValue("do not pass sanity API write token to the client.", process, token)
}

export function writeClient() {
  if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN")
  return createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" })
}
