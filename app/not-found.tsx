import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import NotFoundSection from "@/components/sections/NotFoundSection";

// Neexistující adresa mimo app/(pages). Next sám přidá noindex.
// Root not-found nemá layout z app/(pages), proto hlavička a patička tady. Vlastní metadata mít nemůže, titulek je výchozí z app/layout.tsx.
// notFound() z detailu nemovitosti nebo článku chytá app/(pages)/not-found.tsx, jinak by se hlavička vykreslila dvakrát.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <NotFoundSection />
      </main>
      <Footer />
    </>
  );
}
