import "server-only";

import { groq } from "next-sanity";

// Články blogu = Podstránky (typ `page`). Stránky jen s formulářem (bez textu s fotkou) článek nejsou.
const ARTICLE_FILTER = `_type == "page" && defined(slug.current) && count(sections[_type == "textWithImage"]) > 0`;

export const STAFF_QUERY = groq`*[_type == 'staff'] | order(poradi asc) {
  name,
  position,
  url,
  description,
  "staffUrl": image.asset->url,
}`;

export const REALITIES_QUERY = groq`*[_type == 'reality' && status == 'Na prodej'][0...5]  {
    name,
    'slug': slug.current,
    overview,
    price,
    "imageUrl": image.asset->url
  }`;

  export const REALITY_QUERY = groq`*[_type == 'reality' && slug.current == $slug][0]{
    _createdAt,
    _updatedAt,
    name,
    overview,
   "slug": slug.current,
   street,
   street_number,
   city,
   sections[]{
      _type == "textWithImage" => {
        _type,
        "textWithImageUrl": image.asset->url,
        heading,
        text,
        button,
        position,
        image_pos,
        heading_cap,
      }
      },
   postcode,
   details,
   "imageUrl": image.asset->url,
   "galleryUrls": gallery[].asset->url,
   "planUrl": floor_plan.asset->url,
   "houseUrl": house_plan.asset->url,
   price,
   area,
   geopoint,
   status,
   "author": coalesce(author->name, realtor),
   material,
   type,
   equipment,
   features,
   garage,
   parking,
   owner,
   condition,
   water,
   heating
   }`;


// Poslední změna obsahu ze Sanity pro lastModified statických stránek v sitemapě
export const SITEMAP_DATES_QUERY = groq`{
  "active": *[_type == 'reality' && status in ['Na prodej', 'K pronájmu']] | order(_updatedAt desc)[0]._updatedAt,
  "sold": *[_type == 'reality' && status == 'Prodáno'] | order(_updatedAt desc)[0]._updatedAt,
  "reviews": *[_type == 'review'] | order(_updatedAt desc)[0]._updatedAt,
  "staff": *[_type == 'staff'] | order(_updatedAt desc)[0]._updatedAt,
  "positions": *[_type == 'position'] | order(_updatedAt desc)[0]._updatedAt,
  "posts": *[${ARTICLE_FILTER}] | order(_updatedAt desc)[0]._updatedAt
}`;

export const SITEMAP_REALITIES_QUERY = groq`*[_type == 'reality' && defined(slug.current) && status != 'Storno'] | order(_updatedAt desc) {
  "slug": slug.current,
  _updatedAt,
  "imageUrl": image.asset->url
}`;


export const NEMOVITOSTI_QUERY = groq`*[_type == 'reality' && defined(slug.current) && status in ['Na prodej', 'K pronájmu']] | order(_createdAt desc) {
  _createdAt,
  name,
  "slug": slug.current,
  overview,
  price,
  status,
  type,
  area,
  city,
  "imageUrl": image.asset->url
}`;

export const SOLD_REALITIES_QUERY = groq`*[_type == 'reality' && defined(slug.current) && status == 'Prodáno'] | order(_updatedAt desc) {
  name,
  "slug": slug.current,
  overview,
  price,
  status,
  type,
  area,
  city,
  "imageUrl": image.asset->url
}`;

export const REALITY_SLUGS_QUERY = groq`*[_type == 'reality' && defined(slug.current) && status != 'Storno'].slug.current`;

export const REVIEWS_QUERY = groq`*[_type == 'review' && defined(review)] | order(_createdAt asc, _id asc) {
  _id,
  review,
  clients,
  deal,
  "imageUrl": image.asset->url
}`;

const ARTICLE_CARD = `
  "title": coalesce(name, heading),
  "slug": slug.current,
  _createdAt,
  _updatedAt,
  overview,
  "imageUrl": coalesce(image.asset->url, sections[_type == "textWithImage" && defined(image)][0].image.asset->url),
  "intro": pt::text(sections[_type == "textWithImage"][0].text),
  "words": length(string::split(pt::text(sections[].text[]), " "))
`;

export const POSTS_QUERY = groq`*[${ARTICLE_FILTER}] | order(_createdAt desc) { ${ARTICLE_CARD} }`;

export const LATEST_POSTS_QUERY = groq`*[${ARTICLE_FILTER}] | order(_createdAt desc)[0...3] { ${ARTICLE_CARD} }`;

export const POST_QUERY = groq`*[${ARTICLE_FILTER} && slug.current == $slug][0] {
  ${ARTICLE_CARD},
  heading,
  sections[]{
    _type,
    _key,
    _type == "textWithImage" => {
      "imageUrl": image.asset->url,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height,
      heading,
      text,
      button,
      position,
      image_pos
    },
    _type == "heading" => { text },
    _type == "steps" => { steps[]{ _key, number, desc } },
    _type == "button" => { text, url },
    _type == "accorditions" => { accorditions[]{ _key, heading, text } },
    _type == "form" => { heading, text }
  }
}`;

export const POST_SLUGS_QUERY = groq`*[${ARTICLE_FILTER}].slug.current`;

export const SITEMAP_POSTS_QUERY = groq`*[${ARTICLE_FILTER}] | order(_createdAt desc) {
  "slug": slug.current,
  _updatedAt,
  "imageUrl": image.asset->url
}`;

// Kariéra → Otevřené pozice (bez skrytých)
export const OPEN_POSITIONS_QUERY = groq`*[_type == "position" && active != false] | order(coalesce(order, 999) asc, _createdAt asc) {
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  tag,
  text,
  employmentType,
  datePosted,
  jobPosting
}`;
