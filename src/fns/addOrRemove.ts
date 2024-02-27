export const addOrRemove = <T extends string[]>(arr: string[], val: string) => {
  if (arr.includes(val)) return arr.filter((v) => v !== val) as T;
  return [...arr, val] as T;
};
