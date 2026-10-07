import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

// Figma: Homepage → Rady a novinky → Article (11:9)
export default function ArticleCard({
  href,
  image,
  meta,
  title,
  text,
  author,
}: {
  href?: string;
  image?: string | StaticImageData;
  meta: string;
  title: string;
  text?: string;
  author: string;
}) {
  const body = (
    <>
      <div className="relative h-[220px] overflow-hidden rounded bg-surface-100 lg:h-[232px]">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, 100vw"
            className={`object-cover ${href ? "transition-transform duration-500 group-hover:scale-[1.03]" : ""}`}
          />
        )}
      </div>
      <div className="flex flex-col gap-3 pt-6">
        <p className="text-label-s text-brass-500">{meta}</p>
        <h3 className={`text-title-m text-ink-900 ${href ? "group-hover:text-navy-900" : ""}`}>{title}</h3>
        {text && <p className="text-body-s text-ink-500">{text}</p>}
        <p className="text-body-s text-ink-300">{author}</p>
      </div>
    </>
  );

  return (
    <article data-reveal className="flex flex-col">
      {href ? (
        <Link href={href} className="group flex flex-col">
          {body}
        </Link>
      ) : (
        body
      )}
    </article>
  );
}
