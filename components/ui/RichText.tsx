import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { Image as SanityImage } from "sanity";

import { urlForImage } from "@/sanity/lib/image";

type Value = Parameters<typeof PortableText>[0]["value"];

const components: Partial<PortableTextComponents> = {
  block: {
    normal: ({ children }) => <p className="text-body-m text-ink-500 [&+p]:mt-[14px]">{children}</p>,
    h2: ({ children }) => <h3 className="mt-8 mb-3 text-title-m text-ink-900">{children}</h3>,
    h3: ({ children }) => <h3 className="mt-8 mb-3 text-title-m text-ink-900">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-6 mb-2 text-title-s text-ink-900">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="my-4 border-l-2 border-brass-500 pl-4 text-body-m text-ink-700">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="my-4 flex list-disc flex-col gap-2 pl-5 text-body-m text-ink-700 marker:text-brass-500">{children}</ul>,
    number: ({ children }) => <ol className="my-4 flex list-decimal flex-col gap-2 pl-5 text-body-m text-ink-700">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink-900">{children}</strong>,
    link: ({ children, value }) => (
      <a href={value?.href} className="text-navy-900 underline hover:text-brass-600">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImage }) =>
      value?.asset ? (
        <div className="relative my-6 aspect-[3/2] overflow-hidden rounded">
          <Image src={urlForImage(value)} alt="" fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
        </div>
      ) : null,
  },
};

export default function RichText({ value }: { value: Value }) {
  return <PortableText value={value} components={components} />;
}
