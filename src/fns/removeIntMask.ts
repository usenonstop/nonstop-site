/**
 * Remove int mask
 */
export const removeIntMask = (str: string, acceptZero?: boolean) => {
  str = str.replaceAll(/\D/g, "");
  if (acceptZero) {
    if (str === "") return null;
    if (str === "0") return 0;
  }
  if (!str || str === "0") return null;
  return Number(str);
};
