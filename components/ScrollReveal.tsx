"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Jemné objevení prvků s data-reveal, když poprvé vjedou do obrazovky (CSS v globals.css).
// Jen jednou a bez vazby na rychlost scrollu. Sourozenci v mřížce najíždějí s malým zpožděním.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)").forEach((el) => {
        const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal")) : [];
        el.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(el), 5) * 80}ms`);
        io.observe(el);
      });
    };

    observe(document);
    // Obsah, který se vykreslí později (stránkování, přepínání záložek)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) m.addedNodes.forEach((n) => n instanceof HTMLElement && observe(n.parentNode ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
