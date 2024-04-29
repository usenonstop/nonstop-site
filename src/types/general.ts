export interface Address {
  street: string;
  number: string;
  complement: string | null;
  area: string;
  city: string;
  state: UF;
  zipcode: string;
  geo: {
    type: "Point";
    coordinates: number[];
  };
}

type SocialMediaOption =
  | "Facebook"
  | "Instagram"
  | "Twitter"
  | "Youtube"
  | "Linkedin";

export interface SocialMedia {
  name: SocialMediaOption;
  url: string;
}

export interface Pagination {
  perPage: number;
  currPage: number;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface MinMax {
  min: number | null;
  max: number | null;
}

export type UF =
  | "AC"
  | "AL"
  | "AP"
  | "AM"
  | "BA"
  | "CE"
  | "DF"
  | "ES"
  | "GO"
  | "MA"
  | "MT"
  | "MS"
  | "MG"
  | "PA"
  | "PB"
  | "PR"
  | "PE"
  | "PI"
  | "RJ"
  | "RN"
  | "RS"
  | "RO"
  | "RR"
  | "SC"
  | "SP"
  | "SE"
  | "TO";

export type Result =
  | { ok: true; message: string }
  | { ok: false; error: string };

export interface ColumnSort {
  id: string;
  desc: boolean;
}

export type SortingState = ColumnSort[];

export type Sort = Record<string, 1 | -1>;
