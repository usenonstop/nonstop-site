import { MinMax, UF as UFType } from "~/types/general";
import { Accepts, Face, TransactionStatus } from "~/types/property";

export const RESIDENTIAL_TYPE_WITH_LABEL = [
  { value: "TERRENO_RESIDENCIAL", label: "Terreno residencial" },
  { value: "APARTAMENTO_GARDEN", label: "Apartamento garden" },
  { value: "APARTAMENTO_TIPO", label: "Apartamento tipo" },
  { value: "CASA_DE_VILA", label: "Casa de vila" },
  { value: "CASA_EM_CONDOMINIO", label: "Casa em condomínio" },
  { value: "CASA_TIPO", label: "Casa tipo" },
  { value: "COBERTURA", label: "Cobertura" },
  { value: "DUPLEX", label: "Duplex" },
  { value: "FLAT", label: "Flat" },
  { value: "KITNET", label: "Kitnet" },
  { value: "LOFT", label: "Loft" },
  { value: "SOBRADO", label: "Sobrado" },
  { value: "STUDIO", label: "Studio" },
  { value: "TRIPLEX", label: "Triplex" },
] as const;

export const COMMERCIAL_TYPE_WITH_LABEL = [
  { value: "TERRENO_COMERCIAL", label: "Terreno comercial" },
  { value: "CASA_COMERCIAL", label: "Casa comercial" },
  { value: "CONJUNTO_COMERCIAL", label: "Conjunto comercial" },
  { value: "EDIFICIO_MONOUSUARIO", label: "Edifício monousuário" },
  { value: "GALPAO", label: "Galpão" },
  { value: "LAGE_CORPORATIVA", label: "Lage corporativa" },
  { value: "LOJA_DE_RUA", label: "Loja de rua" },
] as const;

export const PROPERTY_USE_WITH_LABEL = [
  { value: "COMERCIAL", label: "Comercial" },
  { value: "RESIDENCIAL", label: "Residencial" },
] as const;

export const FACE_WITH_LABEL = [
  { value: "N", label: "Norte" },
  { value: "NE", label: "Nordeste" },
  { value: "E", label: "Leste" },
  { value: "SE", label: "Sudeste" },
  { value: "S", label: "Sul" },
  { value: "SW", label: "Sudoeste" },
  { value: "W", label: "Oeste" },
  { value: "NW", label: "Noroeste" },
] as const;

export const PROPERTY_FEATURE_WITH_LABEL = [
  { value: "ADEGA_CLIMATIZADA", label: "Adega climatizada" },
  { value: "AGUA_QUENTE", label: "Água quente" },
  { value: "AQUECIMENTO_CENTRAL", label: "Aquecimento central" },
  { value: "AQUECIMENTO_SOLAR", label: "Aquecimento solar" },
  { value: "ALARME", label: "Alarme" },
  { value: "AR_CONDICIONADO_CENTRAL", label: "Ar condicionado central" },
  { value: "AREA_SERVICO", label: "Área de serviço" },
  { value: "BANHEIRO_SERVICO", label: "Banheiro de serviço" },
  { value: "BANHEIRO_SR_SRA", label: "Banheiro Sr. e Sra." },
  { value: "CARPETE", label: "Carpete" },
  { value: "CHURRASQUEIRA", label: "Churrasqueira" },
  { value: "CLOSET", label: "Closet" },
  { value: "COPA", label: "Copa" },
  { value: "COZINHA_INTEGRADA", label: "Cozinha integrada" },
  { value: "DEPENDENCIA_DE_FUNCIONARIO", label: "Dependência de funcionário" },
  { value: "DEPOSITO", label: "Depósito" },
  { value: "DESPENSA", label: "Despensa" },
  { value: "ELEVADOR_PRIVATIVO", label: "Elevador privativo" },
  { value: "ESPACO_GOURMET", label: "Espaço gourmet" },
  { value: "GAS_ENCANADO", label: "Gás encanado" },
  { value: "HALL_PRIVATIVO", label: "Hall privativo" },
  { value: "HIDROMASSAGEM", label: "Hidromassagem" },
  { value: "HOME_OFFICE", label: "Home office" },
  { value: "HOME_THEATER", label: "Home theater" },
  {
    value: "INFRAESTRUTURA_AR_CONDICIONADO",
    label: "Infraestrutura para ar-condicionado",
  },
  { value: "INTERFONE", label: "Interfone" },
  { value: "JANELA_TETO_CHAO", label: "Janela teto-chão" },
  { value: "JARDIM", label: "Jardim" },
  { value: "LAREIRA", label: "Lareira" },
  { value: "LAVABO", label: "Lavabo" },
  { value: "LOCACAO_NAO_ACEITA_PET", label: "Locação não aceita pet" },
  { value: "MOBILIADO", label: "Mobiliado" },
  { value: "MOVEIS_PLANEJADOS", label: "Móveis planejados" },
  { value: "OFURO", label: "Ofurô" },
  { value: "PISCINA", label: "Piscina" },
  { value: "PISO_MADEIRA", label: "Piso de madeira" },
  { value: "PISO_PORCELANATO", label: "Piso porcelanato" },
  { value: "PISO_LAMINADO", label: "Piso laminado" },
  { value: "PISO_VINILICO", label: "Piso vinílico" },
  { value: "SACADA", label: "Sacada" },
  { value: "SALA_INTIMA", label: "Sala íntima" },
  { value: "SALA_CINEMA", label: "Sala cinema" },
  { value: "SAUNA_SECA", label: "Sauna seca" },
  { value: "SAUNA_UMIDA", label: "Sauna úmida" },
  { value: "VISTA_PARA_CIDADE", label: "Vista para cidade" },
  { value: "VISTA_PARA_MAR", label: "Vista para mar" },
  { value: "VISTA_PANORAMICA", label: "Vista panorâmica" },
  { value: "VISTA_PERMANENTE", label: "Vista permanente" },
] as const;

export const CONDO_FEATURE_WITH_LABEL = [
  { value: "ACADEMIA", label: "Academia" },
  { value: "ACESSO_PCD", label: "Acesso PCD" },
  { value: "AREA_DE_LAZER", label: "Área de lazer" },
  { value: "AR_CONDICIONADO_CENTRAL", label: "Ar condicionado central" },
  { value: "AREA_DE_CARGA_E_DESCARGA", label: "Área de carga e descarga" },
  {
    value: "BANHEIRO_MASCULINO_FEMININO",
    label: "Banheiro masculino/feminino",
  },
  { value: "BAR", label: "Bar" },
  { value: "BICICLETARIO", label: "Bicicletário" },
  { value: "BIKE_ROOM", label: "Bike room" },
  { value: "BRINQUEDOTECA", label: "Brinquedoteca" },
  { value: "CHURRASQUEIRA", label: "Churrasqueira" },
  { value: "CINEMA", label: "Cinema" },
  { value: "COWORKING", label: "Coworking" },
  { value: "DECK_MOLHADO", label: "Deck molhado" },
  { value: "DEPOSITO_DE_ENTREGAS", label: "Depósito de entregas" },
  { value: "ELEVADOR", label: "Elevador" },
  { value: "ELEVADOR_DE_SERVICO", label: "Elevador de serviço" },
  { value: "ELEVADOR_DE_SHABBAT", label: "Elevador de shabbat" },
  { value: "ELEVADOR_SOCIAL", label: "Elevador social" },
  { value: "ESPACO_BEBE", label: "Espaço bebê" },
  { value: "ESPACO_BELEZA", label: "Espaço beleza" },
  { value: "ESPACO_FAMILIA", label: "Espaço família" },
  { value: "ESPACO_KIDS", label: "Espaço kids" },
  { value: "ESPACO_GOURMET", label: "Espaço gourmet" },
  { value: "ESPACO_PETS", label: "Espaço pets" },
  { value: "ESTACIONAMENTO_24H", label: "Estacionamento 24h" },
  { value: "FITNESS", label: "Fitness" },
  {
    value: "GARAGEM_COM_AUXILIO_DE_MANOBRISTA",
    label: "Garagem com auxílio de manobrista",
  },
  { value: "GERADOR", label: "Gerador" },
  { value: "HALL_SOCIAL_PRIVATIVO", label: "Hall social privativo" },
  { value: "HONEST_MARKET", label: "Honest market" },
  { value: "HORTA", label: "Horta" },
  { value: "INFRAESTRUTURA_MODULAR", label: "Infraestrutura modular" },
  { value: "JARDIM", label: "Jardim" },
  { value: "LOBBY_COM_PE_DIREITO_DUPLO", label: "Lobby com pé direito duplo" },
  { value: "OFURO", label: "Ofurô" },
  { value: "PAY_PER_USE", label: "Pay-per-use" },
  { value: "PET_FRIENDLY", label: "Pet-friendly" },
  { value: "PISCINA_ADULTO", label: "Piscina adulto" },
  { value: "PISCINA_COBERTA", label: "Piscina coberta" },
  { value: "PISCINA_AQUECIDA", label: "Piscina aquecida" },
  { value: "PISCINA_INFANTIL", label: "Piscina infantil" },
  { value: "PLAYGROUND", label: "Playground" },
  { value: "PORTARIA_24_HORAS", label: "Portaria 24 horas" },
  { value: "PORTARIA_REMOTA", label: "Portaria remota" },
  { value: "QUADRA_DE_BEACH_TENNIS", label: "Quadra de beach tennis" },
  { value: "QUADRA_DE_FUTEBOL", label: "Quadra de futebol" },
  { value: "QUADRA_DE_SQUASH", label: "Quadra de squash" },
  { value: "QUADRA_DE_TENIS", label: "Quadra de tênis" },
  { value: "QUADRA_POLIESPORTIVA", label: "Quadra poliesportiva" },
  { value: "SALA_DE_JOGOS", label: "Sala de jogos" },
  { value: "SALAO_DE_FESTAS", label: "Salão de festas" },
  { value: "SAUNA_SECA", label: "Sauna seca" },
  { value: "SAUNA_UMIDA", label: "Sauna úmida" },
  { value: "SEGURANCA_24H", label: "Segurança 24h" },
  { value: "SERVICO_DE_ARRUMACAO", label: "Serviço de arrumação" },
  { value: "SERVICO_DE_LAVANDERIA", label: "Serviço de lavanderia" },
  { value: "SPA", label: "Spa" },
  { value: "SPORTS_BAR", label: "Sports bar" },
  { value: "VAGAS_DE_VISITANTE", label: "Vagas de visitante" },
  { value: "VESTIARIO", label: "Vestiário" },
  { value: "ZELADOR", label: "Zelador" },
] as const;

export const INITIAL_GOOGLE_MAPS_OPTION: Partial<google.maps.MapOptions> = {
  fullscreenControl: false,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  disableDoubleClickZoom: true,
  gestureHandling: "cooperative",
  styles: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ],
};

export const PROPERTY_SORT = [
  "_id",
  "user.name",
  "type",
  "address.street",
  "address.area",
  "values.sale",
  "valuePerSquareMeter",
  "values.longStay",
  "zapRating",
  "transactionStatus",
] as const;

export const PROPERTY_SORT_OPTIONS = [
  {
    [`user.name`]: "Gestor",
    type: "Tipo",
    [`address.street`]: "Endereço",
    [`address.area`]: "Bairro",
    [`values.sale`]: "Venda",
    valuePerSquareMeter: "R$/m²",
    [`values.longStay`]: "Locação",
    zapRating: "Nota ZAP",
    transactionStatus: "Status",
  },
];

export const MANAGED_BY = [
  "MIM_EXCLUSIVOS",
  "MIM_NAO_EXCLUSIVOS",
  "IMOBILIARIA_EXCLUSIVOS",
  "IMOBILIARIA_NAO_EXCLUSIVOS",
  "PARCEIROS",
] as const;

export const MANAGED_BY_WITH_LABEL = [
  { value: "MIM_EXCLUSIVOS", label: "Mim (exclusivos)" },
  { value: "MIM_NAO_EXCLUSIVOS", label: "Mim (não exclusivos)" },
  {
    value: "IMOBILIARIA_EXCLUSIVOS",
    label: "Imobiliária (exclusivos)",
  },
  {
    value: "IMOBILIARIA_NAO_EXCLUSIVOS",
    label: "Imobiliária (não exclusivos)",
  },
  { value: "PARCEIROS", label: "Parceiros" },
] as const;

export const PROPERTY_USE = ["COMERCIAL", "RESIDENCIAL"] as const;

export const RESIDENTIAL_TYPE = [
  "TERRENO_RESIDENCIAL",
  "APARTAMENTO_GARDEN",
  "APARTAMENTO_TIPO",
  "CASA_DE_VILA",
  "CASA_EM_CONDOMINIO",
  "CASA_TIPO",
  "COBERTURA",
  "DUPLEX",
  "FLAT",
  "KITNET",
  "LOFT",
  "SOBRADO",
  "STUDIO",
  "TRIPLEX",
] as const;

export const COMMERCIAL_TYPE = [
  "TERRENO_COMERCIAL",
  "CASA_COMERCIAL",
  "CONJUNTO_COMERCIAL",
  "EDIFICIO_MONOUSUARIO",
  "GALPAO",
  "LAGE_CORPORATIVA",
  "LOJA_DE_RUA",
] as const;

export const PROPERTY_STATUS = [
  "LANCAMENTO",
  "CONSTRUCAO",
  "REFORMA",
  "NOVO",
  "PADRAO",
] as const;

export const PROPERTY_STATUS_WITH_LABEL = [
  { value: "LANCAMENTO", label: "Lançamento" },
  { value: "CONSTRUCAO", label: "Construção" },
  { value: "REFORMA", label: "Reforma" },
  { value: "NOVO", label: "Novo" },
  { value: "PADRAO", label: "Padrão" },
] as const;

export const TRANSACTION_STATUS = [
  "SEM_OBSERVACOES",
  "EM_NEGOCIACAO",
  "VENDIDO",
  "ALUGADO",
  "BAIXOU_PRECO",
  "INDISPONIVEL",
] as const;

export const TRANSACTION_STATUS_WITH_LABEL = [
  { value: "SEM_OBSERVACOES", label: "Sem observações" },
  { value: "EM_NEGOCIACAO", label: "Em negociação" },
  { value: "VENDIDO", label: "Vendido" },
  { value: "ALUGADO", label: "Alugado" },
  { value: "BAIXOU_PRECO", label: "Baixou preço" },
] as const;

export const FILTER_AVAILABLE_FOR = [
  "VENDA",
  "LOCACAO",
  "VENDA_E_LOCACAO",
] as const;

export const FILTER_AVAILABLE_FOR_WITH_LABEL = [
  { value: "VENDA", label: "Somente venda" },
  { value: "LOCACAO", label: "Somente locação" },
  { value: "VENDA_E_LOCACAO", label: "Venda e locação" },
  { value: "INDISPONIVEL", label: "Indisponível" },
] as const;

export const FILTER_ACCEPTS = [
  "PERMUTA",
  "FINANCIAMENTO",
  "INDIFERENTE",
] as const;

export const FILTER_ACCEPTS_WITH_LABEL = [
  { value: "PERMUTA", label: "Permuta" },
  { value: "FINANCIAMENTO", label: "Financiamento" },
  { value: "INDIFERENTE", label: "Indiferente" },
] as const;

export const FILTER_FACE = [
  "N",
  "NE",
  "E",
  "SE",
  "S",
  "SW",
  "W",
  "NW",
  "ANY",
] as const;

export const FILTER_FACE_WITH_LABEL = [
  { value: "N", label: "Norte" },
  { value: "NE", label: "Nordeste" },
  { value: "E", label: "Leste" },
  { value: "SE", label: "Sudeste" },
  { value: "S", label: "Sul" },
  { value: "SW", label: "Sudoeste" },
  { value: "W", label: "Oeste" },
  { value: "NW", label: "Noroeste" },
  { value: "ANY", label: "Indiferente" },
] as const;

export const AGENT_MANAGED_BY = [
  "MIM_EXCLUSIVOS",
  "MIM_NAO_EXCLUSIVOS",
  "PARCEIROS",
] as const;

export const AGENT_MANAGED_BY_WITH_LABEL = [
  { value: "MIM_EXCLUSIVOS", label: "Mim (exclusivos)" },
  { value: "MIM_NAO_EXCLUSIVOS", label: "Mim (não exclusivos)" },
  {
    value: "IMOBILIARIA_EXCLUSIVOS",
    label: "Imobiliária (exclusivos)",
  },
  {
    value: "IMOBILIARIA_NAO_EXCLUSIVOS",
    label: "Imobiliária (não exclusivos)",
  },
  { value: "PARCEIROS", label: "Parceiros" },
] as const;

export const INITIAL_PROPERTY_FILTER = {
  state: null as UFType | null,
  city: null as string | null,
  area: null as string | null,
  use: [...PROPERTY_USE],
  managedBy: [...AGENT_MANAGED_BY],
  residentialTypes: [...RESIDENTIAL_TYPE],
  commercialTypes: [...COMMERCIAL_TYPE],
  status: [...PROPERTY_STATUS],
  transactionStatus: ["SEM_OBSERVACOES", "BAIXOU_PRECO"] as TransactionStatus[],
  availableFor: [...FILTER_AVAILABLE_FOR],
  accepts: ["INDIFERENTE"] as ("INDIFERENTE" | Accepts)[],
  values: {
    sale: { min: null, max: null } as MinMax,
    longStay: { min: null, max: null } as MinMax,
    propertyTax: { min: null, max: null } as MinMax,
    condoFee: { min: null, max: null } as MinMax,
  },
  areas: {
    useful: { min: null, max: null } as MinMax,
    land: { min: null, max: null } as MinMax,
  },
  face: ["ANY"] as ("ANY" | Face)[],
  floor: { min: null, max: null } as MinMax,
  zapRating: { min: null, max: null } as MinMax,
  minBaths: null as number | null,
  minRooms: null as number | null,
  minSuites: null as number | null,
  minParkingLots: null as number | null,
};

export const UF = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;
