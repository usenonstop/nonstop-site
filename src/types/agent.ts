import type { UF } from "~/types/property";

export interface AgentsPageAgent {
  id: string;
  profileImage: string | null;
  name: string;
  email: string;
  vgv: number;
  slug: string;
}

export type Languages =
  | "BR"
  | "US"
  | "ES"
  | "IT"
  | "FR"
  | "DE"
  | "CN"
  | "JP"
  | "KR"
  | "RU"
  | "IN"
  | "SA"
  | "IL";

interface ActuationArea {
  id: string;
  state: UF;
  city: string;
  area: string;
}

interface SocialMedia {
  name: "Facebook" | "Instagram" | "Twitter" | "Youtube" | "Linkedin";
  url: string;
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

interface Portfolio {
  vgv: number;
  total: number;
  soldVgv: number;
  soldTotal: number;
}

interface NaturalAgent {
  slug: string;
  name: string | null;
  email: string;
  corporateEmail: string | null;
  creci: string | null;
  profileImage: string | null;
  about: string | null;
  site: string | null;
  whatsapp: string | null;
  phone: string | null;
  actuationAreas: ActuationArea[];
  socialMedias: SocialMedia[];
  partnershipRules: string | null;
  zapRating: number | null;
  portfolio: Portfolio;
  reputation: number;
  id: string;
  type: "AGENTE";
  education: string | null;
  languages: Languages[];
  brokerage: BrokerageEmbed | null;
}

interface JuridicalAgent {
  slug: string;
  name: string | null;
  email: string;
  corporateEmail: string | null;
  creci: string | null;
  profileImage: string | null;
  about: string | null;
  site: string | null;
  whatsapp: string | null;
  phone: string | null;
  actuationAreas: ActuationArea[];
  socialMedias: SocialMedia[];
  partnershipRules: string | null;
  zapRating: number | null;
  portfolio: Portfolio;
  reputation: number;
  id: string;
  type:
    | "IBUYER"
    | "INCORPORADOR"
    | "IMOBILIARIA"
    | "FUNDO_IMOBILIARIO"
    | "GESTAO_DE_PATRIMONIO";
}

export type ProfileAgent = NaturalAgent | JuridicalAgent;
