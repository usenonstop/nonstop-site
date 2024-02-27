import type { PaginationType } from "~/ui/Pagination";

export const Results = ({
  pagination,
  total,
}: {
  pagination: PaginationType;
  total: number;
}) => {
  const { currPage, perPage } = pagination;
  const firstResult = total === 0 ? 0 : (currPage - 1) * perPage + 1;
  const lastResult = Math.min(firstResult + perPage - 1, total);
  return (
    <div
      draggable={false}
      className="flex min-w-fit select-none gap-1 text-xs text-gray-700"
    >
      <span>{firstResult}</span>-<span>{lastResult}</span> de
      <span> {total}</span>
    </div>
  );
};
