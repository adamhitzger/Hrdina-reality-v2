import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock } from "next-sanity";
import { Fragment, type ReactNode } from "react";

import ContactForm from "@/components/forms/ContactForm";
import { button } from "@/components/ui/button";
import RichText from "@/components/ui/RichText";
import { fixBrand, headingCase, internalHref } from "@/lib/blog";
import type { ArticleSection } from "@/sanity/lib/interfaces";

type Section<T extends ArticleSection["_type"]> = Extract<ArticleSection, { _type: T }>;

// Texty v Podstránkách jsou prosté bloky se zalomením „\n“ a odrážkami „- “ uvnitř jednoho bloku.
// Prázdný řádek = nový odstavec, řádky začínající „- “ = seznam. Blok s formátováním jde přes RichText.
function Paragraphs({ blocks }: { blocks?: PortableTextBlock[] }) {
  if (!blocks?.length) return null;
  const out: ReactNode[] = [];

  blocks.forEach((block, bi) => {
    if (block._type !== "block") return;
    const children = (block.children ?? []) as { text?: string; marks?: string[] }[];
    const formatted = children.some((c) => c.marks?.length) || (block.markDefs?.length ?? 0) > 0 || block.listItem;
    if (formatted) {
      out.push(<RichText key={bi} value={[block]} />);
      return;
    }
    const text = fixBrand(children.map((c) => c.text ?? "").join("")).trim();
    if (!text) return;
    if (block.style && /^h\d$/.test(block.style)) {
      out.push(
        <h3 key={bi} className="mt-2 text-title-m text-ink-900">
          {headingCase(text)}
        </h3>,
      );
      return;
    }

    text.split(/\n\s*\n/).forEach((para, pi) => {
      const lines = para.split("\n").map((l) => l.trim()).filter(Boolean);
      // Souvislé řádky s odrážkou → seznam, ostatní řádky → odstavec (např. „Posuzujeme:“ nad seznamem)
      const groups: { list: boolean; lines: string[] }[] = [];
      for (const line of lines) {
        const list = /^[-–•]\s?\S/.test(line);
        const last = groups.at(-1);
        // Text vložený z Wordu má odrážky natvrdo zalomené („… za posledních 90“ / „dní“)
        if (!list && last?.list && /^\p{Ll}/u.test(line)) {
          last.lines[last.lines.length - 1] += ` ${line}`;
          continue;
        }
        if (last && last.list === list) last.lines.push(line);
        else groups.push({ list, lines: [line] });
      }
      groups.forEach((g, gi) => {
        const key = `${bi}-${pi}-${gi}`;
        out.push(
          g.list ? (
            <ul key={key} className="flex list-disc flex-col gap-1.5 pl-5 text-body-m text-ink-500 marker:text-brass-500">
              {g.lines.map((l, li) => (
                <li key={li}>{l.replace(/^[-–•]\s*/, "")}</li>
              ))}
            </ul>
          ) : (
            <p key={key} className="text-body-m text-ink-500">
              {g.lines.map((l, li) => (
                <Fragment key={li}>
                  {li > 0 && <br />}
                  {l}
                </Fragment>
              ))}
            </p>
          ),
        );
      });
    });
  });

  return <div className="flex flex-col gap-[14px]">{out}</div>;
}

function SectionButton({ text, url }: { text?: string; url?: string }) {
  const href = internalHref(url);
  if (!href || !text) return null;
  return (
    <Link href={href} className={`${button.ghost} self-start whitespace-normal`}>
      {text}
    </Link>
  );
}

// Šířka fotky podle „Rozložení obrázku“ ze Sanity (polovina, menší, nejmenší)
const imageWidth = {
  "1/2 sekce": "lg:w-1/2",
  "1/4 sekce": "lg:w-5/12",
  "1/6 sekce": "lg:w-1/3",
} as const;

function TextWithImage({ s }: { s: Section<"textWithImage"> }) {
  const imageLeft = s.position === "Obrázek vlevo";
  const width = imageWidth[s.image_pos ?? "1/4 sekce"] ?? imageWidth["1/4 sekce"];

  return (
    <div className={`flex flex-col gap-8 lg:items-center lg:gap-16 ${imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
      {s.imageUrl && (
        <div data-reveal="image" className={`relative aspect-[4/3] overflow-hidden rounded bg-surface-100 lg:aspect-[4/5] lg:shrink-0 ${width}`}>
          <Image src={s.imageUrl} alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
        </div>
      )}
      <div data-reveal className="flex min-w-0 flex-1 flex-col gap-5">
        {s.heading && <h2 className="text-heading-s text-ink-900">{headingCase(s.heading)}</h2>}
        <Paragraphs blocks={s.text} />
        <SectionButton text={s.button?.text} url={s.button?.url} />
      </div>
    </div>
  );
}

function Steps({ s }: { s: Section<"steps"> }) {
  const steps = s.steps?.filter((step) => step.desc) ?? [];
  if (!steps.length) return null;
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
      {steps.map((step, i) => (
        <li key={step._key ?? i} data-reveal className="flex flex-col gap-3 border-t-2 border-brass-500 pt-5">
          <span className="text-label-m text-brass-500">{String(step.number ?? i + 1).padStart(2, "0")}</span>
          <span className="text-title-s text-ink-900">{fixBrand(step.desc!)}</span>
        </li>
      ))}
    </ol>
  );
}

function Accordions({ s }: { s: Section<"accorditions"> }) {
  const items = s.accorditions?.filter((a) => a.heading) ?? [];
  if (!items.length) return null;
  return (
    <div>
      {items.map((item, i) => (
        <details key={item._key ?? i} data-reveal className="group border-b border-line-200 py-5">
          <summary className="flex cursor-pointer items-start justify-between gap-4 text-title-s text-ink-900">
            <span className="flex-1">{headingCase(item.heading!)}</span>
            <span aria-hidden className="text-brass-500 group-open:hidden">
              +
            </span>
            <span aria-hidden className="hidden text-brass-500 group-open:inline">
              –
            </span>
          </summary>
          {item.text && <p className="mt-[14px] text-body-m whitespace-pre-line text-ink-500">{fixBrand(item.text)}</p>}
        </details>
      ))}
    </div>
  );
}

function FormSection({ s }: { s: Section<"form"> }) {
  return (
    <div data-reveal className="rounded border border-line-200 bg-surface-50 p-6 lg:p-12">
      <div className="h-[2px] w-10 bg-brass-500 lg:w-12" />
      <h2 className="mt-5 text-heading-s text-ink-900">{s.heading ? headingCase(s.heading) : "Nezávazně se nám ozvěte"}</h2>
      <div className="mt-4">
        {s.text?.length ? <Paragraphs blocks={s.text} /> : <p className="text-body-m text-ink-500">Ozveme se do 24 hodin, obvykle dřív.</p>}
      </div>
      <div className="mt-8 max-w-[640px]">
        <ContactForm />
      </div>
    </div>
  );
}

// Sekce dokumentu „Podstránky“ v pořadí ze Sanity (text s fotkou, nadpis, kroky, tlačítko, rozbalovací nabídka, formulář)
export default function ArticleSections({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="flex flex-col gap-14 lg:gap-24">
      {sections.map((s) => {
        switch (s._type) {
          case "textWithImage":
            return <TextWithImage key={s._key} s={s} />;
          case "heading":
            return s.text ? (
              <div key={s._key} data-reveal className="-mb-6 lg:-mb-12 lg:max-w-[820px]">
                <div className="h-[2px] w-10 bg-brass-500 lg:w-12" />
                <h2 className="mt-5 text-heading-s text-ink-900 lg:text-heading-m">{headingCase(s.text)}</h2>
              </div>
            ) : null;
          case "steps":
            return <Steps key={s._key} s={s} />;
          case "button":
            return internalHref(s.url) && s.text ? (
              <div key={s._key} data-reveal className="flex">
                <SectionButton text={s.text} url={s.url} />
              </div>
            ) : null;
          case "accorditions":
            return <Accordions key={s._key} s={s} />;
          case "form":
            return <FormSection key={s._key} s={s} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
