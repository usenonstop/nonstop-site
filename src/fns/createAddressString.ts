import type { Address } from "~/types/property";

/**
 * Creates a string address from an address object
 */
export const createAddressString = (
  a?: Address,
  fields: (keyof Address)[] = ["number", "complement"],
) => {
  if (!a) return "-";
  if (!a.street) return "-";
  let newAddress = `${a.street}`;
  fields.map((f) => {
    const value = a[f];
    if (value && typeof value === "string")
      newAddress = `${newAddress}, ${value}`;
  });
  return newAddress;
};
