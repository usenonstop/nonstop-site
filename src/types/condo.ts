import type { UserEmbed } from "~/types/agent";
import type { Address, Media, MinMax } from "~/types/property";

type CondoFeature =
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

type CondoType =
  | "COMERCIAL"
  | "RESIDENCIAL_VERTICAL"
  | "RESIDENCIAL_HORIZONTAL";

export interface CondoDTO {
  id: string;
  type: CondoType;
  name: string;
  description: string | null;
  yearOfConstruction: number | null;
  receptionPhone: string | null;
  address: Address;
  features: CondoFeature[];
  media: Media;
  user: UserEmbed;
  rooms: MinMax;
  baths: MinMax;
  parkingLots: MinMax;
  areas: MinMax;
  sale: MinMax;
  longStay: MinMax;
}

export interface CardCondo {
  id: string;
  type: CondoType;
  name: string;
  yearOfConstruction: number | null;
  address: Address;
  image: string | null;
  rooms: MinMax;
  baths: MinMax;
  parkingLots: MinMax;
  areas: MinMax;
}
