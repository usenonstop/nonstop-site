import type { Address } from "~/types/general";

/**
 * Creates a string address from an address object
 */
export const createAddressString = (
  a?: Address,
  fields: (keyof Address)[] = ["number", "complement"],
) => {
  if (!a) return "-";
  if (!a.street) return "-";
  let newAddress = `${a.street.replace(/avenida/gi, "Av").replace(/alameda/gi, "Al")}`;
  fields.map((f) => {
    const value = a[f];
    if (value && typeof value === "string")
      newAddress = `${newAddress}, ${value}`;
  });
  return newAddress;
};
