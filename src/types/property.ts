import type { z } from "zod";
import type {
  FILTER_ACCEPTS,
  FILTER_AVAILABLE_FOR,
  FILTER_FACE,
  PROPERTY_USE,
} from "~/consts/property";
import type { minMaxSchema } from "~/schemas/property";
import type { UserEmbed } from "~/types/agent";

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

type PropertyFeature =
  | "ADEGA_CLIMATIZADA"
  | "AGUA_QUENTE"
  | "AQUECIMENTO_CENTRAL"
  | "AQUECIMENTO_SOLAR"
  | "ALARME"
  | "AR_CONDICIONADO_CENTRAL"
  | "AREA_SERVICO"
  | "BANHEIRO_SERVICO"
  | "BANHEIRO_SR_SRA"
  | "CARPETE"
  | "CHURRASQUEIRA"
  | "CLOSET"
  | "COPA"
  | "COZINHA_INTEGRADA"
  | "DEPENDENCIA_DE_FUNCIONARIO"
  | "DEPOSITO"
  | "DESPENSA"
  | "ELEVADOR_PRIVATIVO"
  | "ESPACO_GOURMET"
  | "GAS_ENCANADO"
  | "HALL_PRIVATIVO"
  | "HIDROMASSAGEM"
  | "HOME_OFFICE"
  | "HOME_THEATER"
  | "INFRAESTRUTURA_AR_CONDICIONADO"
  | "INTERFONE"
  | "JANELA_TETO_CHAO"
  | "JARDIM"
  | "LAREIRA"
  | "LAVABO"
  | "LOCACAO_NAO_ACEITA_PET"
  | "MOBILIADO"
  | "MOVEIS_PLANEJADOS"
  | "OFURO"
  | "PISCINA"
  | "PISO_MADEIRA"
  | "PISO_PORCELANATO"
  | "PISO_LAMINADO"
  | "PISO_VINILICO"
  | "SACADA"
  | "SALA_INTIMA"
  | "SALA_CINEMA"
  | "SAUNA_SECA"
  | "SAUNA_UMIDA"
  | "VISTA_PARA_CIDADE"
  | "VISTA_PARA_MAR"
  | "VISTA_PANORAMICA"
  | "VISTA_PERMANENTE";

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
  user: UserEmbed;
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

export interface MediaFile {
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

export interface ParkingLot {
  id: string;
  size: "PEQUENA" | "MEDIA" | "GRANDE";
  type: "DETERMINADA" | "INDETERMINADA";
  notes: string | null;
}

export type MgmtDecision =
  | "OCULTAR_ENDERECO"
  | "OCULTAR_ANDAR"
  | "OCULTAR_PRECO"
  | "COMPARTILHAR_APENAS_COM_PARCEIROS"
  | "NAO_PERMITIR_PORTAIS";

type Face = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

type AvailableFor = "VENDA" | "LOCACAO";

type Accepts = "PERMUTA" | "FINANCIAMENTO";

export type Status =
  | "LANCAMENTO"
  | "CONSTRUCAO"
  | "REFORMA"
  | "NOVO"
  | "PADRAO";

type Pendency =
  | "ALIENACAO_FIDUCIARIA"
  | "DEBITO_DE_CONDOMINIO"
  | "DEBITO_DE_IPTU"
  | "INVENTARIO"
  | "PENHORA"
  | "PROPRIETARIO_INCAPAZ"
  | "USUFRUTO";

export type ResidentialType =
  | "TERRENO_RESIDENCIAL"
  | "APARTAMENTO_GARDEN"
  | "APARTAMENTO_TIPO"
  | "CASA_DE_VILA"
  | "CASA_EM_CONDOMINIO"
  | "CASA_TIPO"
  | "COBERTURA"
  | "DUPLEX"
  | "FLAT"
  | "KITNET"
  | "LOFT"
  | "SOBRADO"
  | "STUDIO"
  | "TRIPLEX";

export type CommercialType =
  | "TERRENO_COMERCIAL"
  | "CASA_COMERCIAL"
  | "CONJUNTO_COMERCIAL"
  | "EDIFICIO_MONOUSUARIO"
  | "GALPAO"
  | "LAGE_CORPORATIVA"
  | "LOJA_DE_RUA";

interface ResidentialProperty {
  id: string;
  availableFor: AvailableFor[];
  accepts: Accepts[];
  status: Status;
  baths: number | null;
  floor: number | null;
  face: Face | null;
  user: UserEmbed;
  sharedMgmtUser: UserEmbed | null;
  values: Values;
  areas: Areas;
  yearOfConstruction: number | null;
  condo: CondoEmbed | null;
  address: Address;
  description: string;
  privateObservations: string | null;
  parkingLots: ParkingLot[];
  features: PropertyFeature[];
  mgmtDecisions: MgmtDecision[];
  pendencies: Pendency[];
  base36Id: string;
  zapRating: number;
  transactionStatus: TransactionStatus;
  media: Media;
  updatedAt: Date;
  createdAt: Date;
  use: "RESIDENCIAL";
  type: ResidentialType;
  rooms: number | null;
  suites: number | null;
}

interface CommercialProperty {
  id: string;
  availableFor: AvailableFor[];
  accepts: Accepts[];
  status: Status;
  baths: number | null;
  floor: number | null;
  face: Face | null;
  user: UserEmbed;
  sharedMgmtUser: UserEmbed | null;
  values: Values;
  areas: Areas;
  yearOfConstruction: number | null;
  condo: CondoEmbed | null;
  address: Address;
  description: string;
  privateObservations: string | null;
  parkingLots: ParkingLot[];
  features: PropertyFeature[];
  mgmtDecisions: MgmtDecision[];
  pendencies: Pendency[];
  base36Id: string;
  zapRating: number;
  transactionStatus: TransactionStatus;
  media: Media;
  updatedAt: Date;
  createdAt: Date;
  use: "COMERCIAL";
  type: CommercialType;
  rooms: number | null;
  suites: number | null;
}

export type PropertyDTO = ResidentialProperty | CommercialProperty;

export type MediaType =
  | "images"
  | "condo-images"
  | "videos"
  | "floorplans"
  | "streetview"
  | "tours";

interface Location {
  lat: number;
  lng: number;
}

export interface MapBound {
  NE: Location;
  SW: Location;
}

export interface TableProperty {
  base36Id: string;
  user: UserEmbed;
  zip: boolean;
  address: Address;
  values: Values;
  zapRating: number;
  areas: Areas;
  availableFor: AvailableFor[];
  accepts: Accepts[];
  status: Status;
  transactionStatus: TransactionStatus;
  pendencies: Pendency[];
  face: Face | null;
  baths: number | null;
  floor: number | null;
  mgmtDecisions: MgmtDecision[];
  features: PropertyFeature[];
  id: string;
  use: "COMERCIAL" | "RESIDENCIAL";
  condo: CondoEmbed | null;
  image?: string | undefined;
  sharedMgmtUserId?: string | undefined;
  addressString: string;
  valuePerSquareMeter: number | null;
  parkingLots: number;
  type: PropertyType;
  rooms?: (number | null) | undefined;
  suites?: (number | null) | undefined;
  page: string;
}

export type Sort = Record<string, 1 | -1>;

export type AcceptsFilter = (typeof FILTER_ACCEPTS)[number];

export type MinMax = z.infer<typeof minMaxSchema>;

export type FilterFace = (typeof FILTER_FACE)[number];

export interface ColumnSort {
  id: string;
  desc: boolean;
}
export type SortingState = ColumnSort[];

export type FilterAvailableFor = (typeof FILTER_AVAILABLE_FOR)[number];

export type PropertyUse = (typeof PROPERTY_USE)[number];

export type Marker = {
  id: string;
  position: Position;
  selected: boolean;
  size: number;
};

interface Position {
  lat: number;
  lng: number;
}

export type MapMarker = {
  id: string;
  marker: google.maps.Marker | null;
  position: Position;
  selected: boolean;
  size: number;
  listener?: google.maps.MapsEventListener;
};

export interface MarkerProperty {
  id: string;
  size: number;
  selected: boolean;
  position: Position;
}

export type onClickMarkerParams = {
  map: google.maps.Map;
  size: number;
  position: MarkerProperty["position"];
};

export type StateFilter = "TODOS" | UF;
