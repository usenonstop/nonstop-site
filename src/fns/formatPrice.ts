import type { MgmtDecision } from "~/types/property";

/**
 * Format price
 */
export const formatPrice = (s: string, mgmt?: MgmtDecision[]) => {
  if (!s) return "-";
  if (mgmt?.includes("OCULTAR_PRECO")) return "Oculto";
  return `R$ ${s}`;
};
