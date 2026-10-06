import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function PagesLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
