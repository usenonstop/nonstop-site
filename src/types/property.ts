import type { AgentEmbed } from "~/types/agent";

interface Values {
  sale: number | null;
  longStay: number | null;
  condoFee: number | null;
  propertyTax: number | null;
}

export type TransactionStatus =
  | "SEM_OBSERVACOES"
  | "EM_NEGOCIACAO"
  | "VENDIDO"
  | "ALUGADO"
  | "BAIXOU_PRECO";

export type PropertyType =
  | "APARTAMENTO_GARDEN"
  | "APARTAMENTO_TIPO"
  | "CASA_COMERCIAL"
  | "CASA_DE_VILA"
  | "CASA_EM_CONDOMINIO"
  | "CASA_TIPO"
  | "COBERTURA"
  | "CONJUNTO_COMERCIAL"
  | "DUPLEX"
  | "EDIFICIO_MONOUSUARIO"
  | "FLAT"
  | "GALPAO"
  | "KITNET"
  | "LAGE_CORPORATIVA"
  | "LOFT"
  | "LOJA_DE_RUA"
  | "SOBRADO"
  | "STUDIO"
  | "TERRENO_COMERCIAL"
  | "TERRENO_RESIDENCIAL"
  | "TRIPLEX";

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

export interface CardProperty {
  base36Id: string;
  transactionStatus: TransactionStatus;
  baths: number | null;
  values: Values;
  zapRating: number;
  areas: Areas;
  address: Address;
  user: AgentEmbed;
  zip: boolean;
  condo: CondoEmbed | null;
  id: string;
  type: PropertyType;
  image?: string | undefined;
  rooms?: (number | null) | undefined;
  parkingLots: number;
}

type CondoFeatures =
  | "ACADEMIA"
  | "ACESSO_PCD"
  | "AREA_DE_LAZER"
  | "AR_CONDICIONADO_CENTRAL"
  | "AREA_DE_CARGA_E_DESCARGA"
  | "BANHEIRO_MASCULINO_FEMININO"
  | "BAR"
  | "BICICLETARIO"
  | "BIKE_ROOM"
  | "BRINQUEDOTECA"
  | "CHURRASQUEIRA"
  | "CINEMA"
  | "COWORKING"
  | "DECK_MOLHADO"
  | "DEPOSITO_DE_ENTREGAS"
  | "ELEVADOR"
  | "ELEVADOR_DE_SERVICO"
  | "ELEVADOR_DE_SHABBAT"
  | "ELEVADOR_SOCIAL"
  | "ESPACO_BEBE"
  | "ESPACO_BELEZA"
  | "ESPACO_FAMILIA"
  | "ESPACO_KIDS"
  | "ESPACO_GOURMET"
  | "ESPACO_PETS"
  | "ESTACIONAMENTO_24H"
  | "FITNESS"
  | "GARAGEM_COM_AUXILIO_DE_MANOBRISTA"
  | "GERADOR"
  | "HALL_SOCIAL_PRIVATIVO"
  | "HONEST_MARKET"
  | "HORTA"
  | "INFRAESTRUTURA_MODULAR"
  | "JARDIM"
  | "LOBBY_COM_PE_DIREITO_DUPLO"
  | "OFURO"
  | "PAY_PER_USE"
  | "PET_FRIENDLY"
  | "PISCINA_ADULTO"
  | "PISCINA_COBERTA"
  | "PISCINA_AQUECIDA"
  | "PISCINA_INFANTIL"
  | "PLAYGROUND"
  | "PORTARIA_24_HORAS"
  | "PORTARIA_REMOTA"
  | "QUADRA_DE_BEACH_TENNIS"
  | "QUADRA_DE_FUTEBOL"
  | "QUADRA_DE_SQUASH"
  | "QUADRA_DE_TENIS"
  | "QUADRA_POLIESPORTIVA"
  | "SALA_DE_JOGOS"
  | "SALAO_DE_FESTAS"
  | "SAUNA_SECA"
  | "SAUNA_UMIDA"
  | "SEGURANCA_24H"
  | "SERVICO_DE_ARRUMACAO"
  | "SERVICO_DE_LAVANDERIA"
  | "SPA"
  | "SPORTS_BAR"
  | "VAGAS_DE_VISITANTE"
  | "VESTIARIO"
  | "ZELADOR";

interface MediaFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

interface Media {
  images: MediaFile[];
  floorPlans: MediaFile[];
  promotionalFiles: MediaFile[];
  videos: string[];
  tours: string[];
}

interface CondoEmbed {
  id: string;
  features: CondoFeatures[];
  media: Media;
  name: string;
  zip: boolean;
  address: Address;
  yearOfConstruction: number | null;
}
