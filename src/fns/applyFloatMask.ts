/**
 * Apply float mask for inputs
 */
export const applyFloatMask = (num: number | null) => {
  if (num === null) return "";

  return num.toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};
