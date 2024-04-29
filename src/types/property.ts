import type { CondoEmbed } from "~/types/condo";
import type {
  Address,
  Location,
  UF,
  MinMax,
  Pagination,
} from "~/types/general";
import type { UserEmbed } from "~/types/user";

export type Transaction = "sale" | "longStay";

interface Values {
  sale: number | null;
  longStay: number | null;
  condoFee: number | null;
  propertyTax: number | null;
}

export type MediaType =
  | "images"
  | "condo-images"
  | "videos"
  | "floorplans"
  | "streetview"
  | "tours";

interface Areas {
  useful: number | null;
  total: number | null;
  land: number | null;
}

export type PropertyType =
  | "APARTAMENTO_GARDEN"
  | "APARTAMENTO_TIPO"
  | "COBERTURA"
  | "DUPLEX"
  | "FLAT"
  | "KITNET"
  | "LOFT"
  | "STUDIO"
  | "TRIPLEX"
  | "CASA_COMERCIAL"
  | "CASA_DE_VILA"
  | "CASA_EM_CONDOMINIO"
  | "CASA_TIPO"
  | "SOBRADO"
  | "CONJUNTO_COMERCIAL"
  | "EDIFICIO_MONOUSUARIO"
  | "LAGE_CORPORATIVA"
  | "GALPAO"
  | "LOJA_DE_RUA"
  | "TERRENO_COMERCIAL"
  | "TERRENO_RESIDENCIAL";

export type AvailableFor = "VENDA" | "LOCACAO";

export type FilterAvailableFor = AvailableFor | "VENDA_E_LOCACAO";

export type Accepts = "PERMUTA" | "FINANCIAMENTO";

export type FilterAccepts = Accepts | "INDIFERENTE";

export type Status =
  | "LANCAMENTO"
  | "CONSTRUCAO"
  | "REFORMA"
  | "NOVO"
  | "PADRAO";

export type Face = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

export type FilterFace = Face | "ANY";

type Feature =
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

export type MgmtDecision =
  | "OCULTAR_ENDERECO"
  | "OCULTAR_ANDAR"
  | "OCULTAR_PRECO"
  | "COMPARTILHAR_APENAS_COM_PARCEIROS"
  | "NAO_PERMITIR_PORTAIS";

type Pendency =
  | "ALIENACAO_FIDUCIARIA"
  | "DEBITO_DE_CONDOMINIO"
  | "DEBITO_DE_IPTU"
  | "INVENTARIO"
  | "PENHORA"
  | "PROPRIETARIO_INCAPAZ"
  | "USUFRUTO";

export type TransactionStatus =
  | "SEM_OBSERVACOES"
  | "EM_NEGOCIACAO"
  | "VENDIDO"
  | "ALUGADO"
  | "BAIXOU_PRECO"
  | "INDISPONIVEL";

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

type PropertySort =
  | "_id"
  | "user.name"
  | "type"
  | "address.street"
  | "address.area"
  | "values.sale"
  | "valuePerSquareMeter"
  | "values.longStay"
  | "zapRating"
  | "transactionStatus";

type ManagedBy =
  | "MIM_EXCLUSIVOS"
  | "MIM_NAO_EXCLUSIVOS"
  | "IMOBILIARIA_EXCLUSIVOS"
  | "IMOBILIARIA_NAO_EXCLUSIVOS"
  | "PARCEIROS";

export type Use = "COMERCIAL" | "RESIDENCIAL";

interface PropertyFilter {
  state: UF;
  city: string | null;
  managedBy: ManagedBy[];
  use: Use[];
  residentialTypes: ResidentialType[];
  commercialTypes: CommercialType[];
  status: Status[];
  transactionStatus: TransactionStatus[];
  availableFor: AvailableFor[];
  accepts: Accepts[];
  face: Face[];
  floor: MinMax;
  zapRating: MinMax;
  minBaths: number | null;
  minRooms: number | null;
  minSuites: number | null;
  minParkingLots: number | null;
  values: {
    sale: MinMax;
    longStay: MinMax;
    propertyTax: MinMax;
    condoFee: MinMax;
  };
  areas: {
    useful: MinMax;
    land: MinMax;
  };
}

export interface MapBounds {
  NE: Location;
  SW: Location;
}

export interface CardProperty {
  id: string;
  type: PropertyType;
  image?: string | undefined;
  rooms?: number | null;
  parkingLots: number;
  url: string;
  condo: CondoEmbed | null;
  base36Id: string;
  transactionStatus: TransactionStatus;
  baths: number | null;
  values: Values;
  areas: Areas;
  address: Address;
  user: UserEmbed;
  sharedMgmtUser: UserEmbed | null;
  createdAt: Date;
}

export interface CommonFields {
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
  condo: CondoEmbed;
  address: Address;
  description: string;
  privateObservations: string | null;
  parkingLots: ParkingLot[];
  features: Feature[];
  mgmtDecisions: MgmtDecision[];
  pendencies: Pendency[];
  base36Id: string;
  zapRating: number;
  transactionStatus: TransactionStatus;
  media: Media;
  updatedAt: Date;
  createdAt: Date;
}

interface ResidentialProperty extends CommonFields {
  use: "RESIDENCIAL";
  type: ResidentialType;
  rooms: number | null;
  suites: number | null;
}

interface CommercialProperty extends CommonFields {
  use: "COMERCIAL";
  type: CommercialType;
}

export type Property = ResidentialProperty | CommercialProperty;

export interface PropertiesApiBody {
  pagination: Pagination;
  search: string;
  sort: Record<PropertySort, 1 | -1>;
  selectedProperties: Location[];
  filters: PropertyFilter;
  perimeters: string[];
}

export interface MarkersApiBody {
  zoom: number;
  bounds: MapBounds;
  search: string;
  selectedProperties: Location[];
  filters: PropertyFilter;
  perimeters: string[];
}

export interface Marker {
  id: string;
  size: number;
  selected: boolean;
  position: Location;
}

export type MapMarker = {
  id: string;
  marker: google.maps.Marker | null;
  position: Location;
  selected: boolean;
  size: number;
  listener?: google.maps.MapsEventListener;
};

export interface MediaFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface Media {
  images: MediaFile[];
  floorPlans: MediaFile[];
  promotionalFiles: MediaFile[];
  videos: string[];
  tours: string[];
}

export type onClickMarkerParams = {
  map: google.maps.Map;
  size: number;
  position: Marker["position"];
};

export interface ParkingLot {
  id: string;
  size: "PEQUENA" | "MEDIA" | "GRANDE";
  type: "DETERMINADA" | "INDETERMINADA";
  notes: string | null;
}
