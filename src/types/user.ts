import type { Address, SocialMedia } from "~/types/general";

type JuridicalType =
  | "IBUYER"
  | "INCORPORADOR"
  | "IMOBILIARIA"
  | "FUNDO_IMOBILIARIO"
  | "GESTAO_DE_PATRIMONIO";

interface Portfolio {
  vgv: number;
  total: number;
  soldVgv: number;
  soldTotal: number;
}

interface BrokerageEmbed {
  id: string;
  name: string | null;
  email: string;
  corporateEmail: string | null;
  phone: string | null;
  whatsapp: string | null;
  hrWhatsapp: string | null;
  profileImage: string | null;
  slug: string;
  site: string | null;
}

export interface UserEmbed {
  id: string;
  name: string | null;
  type: "AGENTE" | JuridicalType;
  email: string;
  corporateEmail: string | null;
  phone: string | null;
  whatsapp: string | null;
  hrWhatsapp: string | null;
  profileImage: string | null;
  slug: string;
  site: string | null;
  zapRating: number | null;
  reputation: number;
  portfolio: Portfolio;
  brokerage: BrokerageEmbed | null;
}

export interface Contact {
  name: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string;
  address: Address;
  socialMedias: SocialMedia[];
}
