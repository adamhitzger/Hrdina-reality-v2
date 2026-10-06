import { button } from "@/components/ui/button";
import { faq } from "@/lib/content";
import { telHref } from "@/lib/format";
import { site } from "@/lib/site";

// Figma: 07 · FAQ (55:1013) – nativní <details>, první otázka otevřená
export default function Faq() {
  return (
    <section className="bg-surface-0">
      <div className="container-site flex flex-col gap-10 px-6 py-16 lg:flex-row lg:gap-20 lg:px-[120px] lg:pt-[104px] lg:pb-28">
        <div className="lg:w-[400px] lg:shrink-0">
          <div className="h-[2px] w-10 bg-brass-500 lg:w-12" />
          <p className="mt-[18px] text-label-s text-brass-500 lg:text-label-m">Náš rádce</p>
          <h2 className="mt-[14px] text-heading-s text-ink-900 lg:text-display-l">
            Nejčastější <br className="hidden lg:block" />
            otázky
          </h2>
          <p className="mt-4 text-body-m text-ink-500 lg:mt-5 lg:w-[340px]">
            Nenašli jste, co jste hledali? Zavolejte — odpovíme i na to, co tu není.
          </p>
          <a href={telHref(site.phone)} className={`${button.ghost} mt-7 hidden px-[26px] py-4 lg:inline-flex`}>
            {site.phone}
          </a>
        </div>

        <div className="flex-1">
          {faq.map((item, i) => (
            <details key={item.q} open={i === 0} className="group border-b border-line-200 py-5 lg:py-6">
              <summary className="flex cursor-pointer items-start justify-between gap-4 text-title-s text-ink-900 lg:text-title-m">
                <span className="flex-1">{item.q}</span>
                <span aria-hidden className="text-brass-500 group-open:hidden">
                  +
                </span>
                <span aria-hidden className="hidden text-brass-500 group-open:inline">
                  –
                </span>
              </summary>
              <p className="mt-[14px] text-body-m text-ink-500 lg:max-w-[680px]">{item.a}</p>
            </details>
          ))}
          <a href={telHref(site.phone)} className={`${button.ghost} mt-8 w-full py-4 lg:hidden`}>
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
