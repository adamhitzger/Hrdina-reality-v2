import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import GuidePopup from "@/components/GuidePopup";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ScrollReveal from "@/components/ScrollReveal";

export default async function PagesLayout({ children }: LayoutProps<"/">) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <Header />
      <main className="flex-1 overflow-x-hidden">{children}</main>
      <Footer />
      <ScrollReveal />
      <GuidePopup />
      {/* Náhled ve Studiu (Presentation): rámečky „klikni a uprav“ a obnovení stránky po každé změně konceptu */}
      {isDraftMode && <VisualEditing />}
    </>
  );
}
