import "server-only";

import { groq } from "next-sanity";

export const BOOK_QUERY = groq`*[_type == 'book'] | order(_createdAt desc) {
  "frontUrl": front.asset->url,
  "backUrl": back.asset->url
}`;
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

  export const MAIN_SECTIONS = groq`*[_type == 'main'] | order(poradi asc){
    textWithImage{
        "textWithImageUrl": image.asset->url,
        heading,
        text,
        button,
        position,
        image_pos,
        heading_cap,
    }
  }`

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
   garage,
   parking,
   owner,
   condition,
   water,
   heating
   }`;

   export const PAGES_QUERY = groq`*[_type == "page"]{
    name,
    "slug": slug.current,
    heading,
    "pageImageUrl": image.asset->url,
   }`;

   export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
    name,
    overview,
    "slug": slug.current,
    heading,
    color,
    "pageImageUrl": image.asset->url,
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
      },
      _type == "heading" => {
        _type,
        text
      },
      _type == "steps" => {
        _type,
        steps[]{
          "iconUrl": icon.asset->url,
          number,
          desc
        }
      },
      _type == "button" => {
        _type,
        text,
        url
      },
      _type == "accorditions" => {
        _type,
        accorditions[]{
          heading,
          text
        }
        },
        _type == "form" => {
        _type,
        text,
        heading
      },
      }
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
  "imageUrl": image.asset->url
}`;

const POST_CARD = `
  title,
  "slug": slug.current,
  publishedAt,
  category,
  excerpt,
  "imageUrl": image.asset->url,
  "author": author->name,
  "words": length(string::split(pt::text(body), " "))
`;

export const POSTS_QUERY = groq`*[_type == 'post' && defined(slug.current)] | order(publishedAt desc) { ${POST_CARD} }`;

export const LATEST_POSTS_QUERY = groq`*[_type == 'post' && defined(slug.current)] | order(publishedAt desc)[0...3] { ${POST_CARD} }`;

export const POST_QUERY = groq`*[_type == 'post' && slug.current == $slug][0] {
  ${POST_CARD},
  _updatedAt,
  body,
  "authorPosition": author->position,
  "authorImageUrl": author->image.asset->url
}`;

export const POST_SLUGS_QUERY = groq`*[_type == 'post' && defined(slug.current)].slug.current`;

export const SITEMAP_POSTS_QUERY = groq`*[_type == 'post' && defined(slug.current)] | order(publishedAt desc) {
  "slug": slug.current,
  _updatedAt,
  "imageUrl": image.asset->url
}`;
