import type { Sort, SortingState } from "~/types/property";

/**
 * Convert sorting from react table to mongo sort by
 */
export const sortingToQuery = (
  s: SortingState,
  fallback: Record<string, 1 | -1> = { _id: -1 },
) => {
  const o = { ...s[0] };
  if (!o.id) return fallback;
  const obj: Sort = {};
  const key = o.id.replace("_", ".");
  obj[key] = o.desc ? -1 : 1;
  return obj;
};
