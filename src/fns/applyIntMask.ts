/**
 * Apply int mask for inputs
 */
export const applyIntMask = (num?: number | null) => {
  if (num === 0) return "0";
  if (!num) return "";
  return num.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
};
