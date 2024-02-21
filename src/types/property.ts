interface Values {
  sale: number | null;
  longStay: number | null;
  condoFee: number | null;
  propertyTax: number | null;
}

type UF =
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

interface Address {
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

interface Areas {
  useful: number | null;
  total: number | null;
  land: number | null;
}

export interface HomeProperty {
  id: string;
  image: string;
  values: Values;
  address: Address;
  baths: number | null;
  rooms: number;
  parkingLots: number;
  areas: Areas;
  manager: {
    id: string;
    image: string;
  };
}
