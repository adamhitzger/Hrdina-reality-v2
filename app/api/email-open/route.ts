import { after, type NextRequest } from "next/server";

import { writeClient } from "@/sanity/lib/write-client";

// Sledovací pixel v e-mailu s průvodcem (emails/pruvodce.tsx): /api/email-open?id=<_id dokumentu pdfLead>.
// Každé načtení obrázku přičte 1 k „Počet zobrazení e-mailu“. Odpověď je vždy průhledný GIF 1×1,
// i když id neexistuje, aby se v e-mailu nikdy neukázal rozbitý obrázek.

const PIXEL = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");
const ID = /^[A-Za-z0-9_-]{8,64}$/;

export function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (id && ID.test(id)) {
    // Zápis do Sanity až po odeslání obrázku, klient na něj nečeká
    after(async () => {
      try {
        const sanity = writeClient();
        // Jen dokumenty „Maily z PDF“, jinak by šlo přes cizí _id zapisovat do libovolného dokumentu
        const exists = await sanity.fetch<string | null>(`*[_type == "pdfLead" && _id == $id][0]._id`, { id });
        if (!exists) return;
        const now = new Date().toISOString();
        await sanity
          .patch(id)
          .setIfMissing({ openCount: 0, firstOpenedAt: now })
          .inc({ openCount: 1 })
          .set({ lastOpenedAt: now })
          .commit();
      } catch (error) {
        console.error("Error v /api/email-open: ", error);
      }
    });
  }

  return new Response(PIXEL, {
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": String(PIXEL.length),
      // Každé zobrazení musí dojít až sem, ne do cache prohlížeče nebo CDN
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
