import {
  COMMERCIAL_TYPE_WITH_LABEL,
  RESIDENTIAL_TYPE_WITH_LABEL,
} from "~/consts/property";
import type { PropertyDTO } from "~/types/property";

export const createPropertyTitle = (p: PropertyDTO) => {
  const isLand =
    p.type === "TERRENO_RESIDENCIAL" || p.type === "TERRENO_COMERCIAL";

  const rooms = !isLand && p.use === "RESIDENCIAL" && p.rooms;

  const area = p.areas.useful
    ? p.areas.useful
    : p.areas.land
      ? p.areas.land
      : null;

  return `${
    RESIDENTIAL_TYPE_WITH_LABEL.find((t) => t.value === p.type)?.label ??
    COMMERCIAL_TYPE_WITH_LABEL.find((t) => t.value === p.type)?.label ??
    ""
  }${
    p.availableFor.length < 1
      ? " indisponível"
      : " para " +
        p.availableFor
          .join(" e ")
          .replace("VENDA", "venda")
          .replace("LOCACAO", "locação")
  }${
    !!rooms && rooms > 0 ? ` com ${rooms} quarto${rooms > 1 ? "s" : ""}` : ""
  }${area ? `, ${area}m²` : ""}`;
};
