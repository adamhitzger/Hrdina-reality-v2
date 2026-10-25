import type { PortableTextBlock } from "next-sanity";
type TypedObject = { _type: string; _key?: string };

type Heating = "Ústřední topení" | "Tuhá paliva" | "Vlastní";
type Water = "Dálkový odvod" | "Studna" | "Vlastní";
type Condition = "Velmi pěkný" | "Pěkný" | "Špatný" | "Velmi špatný";
type Material = "Cihlová" | "Dřevostavba";
type Owner = "Vlastní" | "Družstvo";
type Gargae = "Ano" | "Ne";
type Parking = "Venkovní" | "Vnitřní" | "Žádné";
type Equipment = "Kompletní" | "Částečné" | "Žádné";
type Type = "Byt" |"Rodinný dům" | "Chata" | "Chalupa" | "Pozemek";
type Status =  "Na prodej" | "K pronájmu" | "Prodáno" | "Storno";
export interface TextWithImageSection {
    _type: "textWithImage" | undefined;
    textWithImageUrl: string;
    heading: string | undefined;
    text: PortableTextBlock[];
    button: {
        url: string;
        text: string;
    };
    position: string;
    image_pos: string;
    heading_cap: string | undefined;
    isDynamic: boolean;
  };

export interface Staff {
    name: string;
    position: string;
    url: string;
    description: string[];
    staffUrl: string;
};

export interface RealityCard {
    name: string
    slug: string;
    overview: string;
    imageUrl: string;
    price: number;
};

export interface Reality {
    _createdAt: string;
    _updatedAt: string;
    name: string; 
    slug: string;
    overview: string;
    street: string;
    street_number: string;
    city: string;
    postcode: string;
    details: TypedObject[];
    sections: TextWithImageSection[];
    imageUrl: string;
    galleryUrls: string[];
    planUrl: string; 
    houseUrl: string
    price: string;
    area: number;
    geopoint: {
        _type: string;
        lng: number;
        lat: number;
        alt: number;
    };
    status: Status;
    /** Jméno makléře (reference na zaměstnance, záložně staré textové pole) */
    author?: string;
    type: Type;
    material: Material;
    equipment: Equipment;
    features?: string[];
    garage: Gargae;
    parking: Parking;
    owner: Owner;
    condition: Condition;
    water: Water;
    heating: Heating;
};



export interface Review {
    _id: string;
    review: string;
    clients: string;
    deal?: string;
    imageUrl?: string;
};

// Článek blogu = dokument „Podstránky“ (typ `page`)
export interface ArticleCard {
    title: string;
    slug: string;
    _createdAt: string;
    _updatedAt: string;
    overview?: string;
    imageUrl?: string;
    /** Prostý text prvního odstavce, z něj se skládá perex, když chybí popisek pro Google */
    intro?: string;
    words?: number;
};

type Block = PortableTextBlock;

export type ArticleSection = { _key: string } & (
    | {
          _type: "textWithImage";
          imageUrl?: string;
          imageWidth?: number;
          imageHeight?: number;
          heading?: string;
          text?: Block[];
          button?: { text?: string; url?: string };
          position?: "Text vlevo" | "Obrázek vlevo";
          image_pos?: "1/2 sekce" | "1/4 sekce" | "1/6 sekce";
      }
    | { _type: "heading"; text?: string }
    | { _type: "steps"; steps?: { _key: string; number?: number; desc?: string }[] }
    | { _type: "button"; text?: string; url?: string }
    | { _type: "accorditions"; accorditions?: { _key: string; heading?: string; text?: string }[] }
    | { _type: "form"; heading?: string; text?: Block[] }
);

export interface Article extends ArticleCard {
    heading?: string;
    sections?: ArticleSection[];
};

export interface OpenPosition {
  _createdAt: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  tag?: string;
  text: string;
  employmentType?: string[];
  datePosted?: string;
  jobPosting?: boolean;
}
