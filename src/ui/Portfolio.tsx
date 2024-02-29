// import { NoToken } from "~/ui/NoToken";
import { useAtom, type PrimitiveAtom } from "jotai";
import type { CardProperty } from "~/types/property";
import { Pagination, type PaginationType } from "~/ui/Pagination";
import { PropertyCard } from "~/ui/PropertyCard";

export const Portfolio = ({
  properties,
  total,
  paginationAtom,
}: {
  properties: CardProperty[];
  total: number;
  paginationAtom: PrimitiveAtom<PaginationType>;
}) => {
  const [pagination, setPagination] = useAtom(paginationAtom);
  return (
    <div className="flex h-[calc(100vh-208px)] w-full flex-col items-center gap-8 overflow-scroll scrollbar">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* {!token && <NoToken />} */}
        {properties?.map((p) => (
          <PropertyCard withAvatar={false} key={p.id} property={p} />
        ))}
      </div>
      <div className="mb-8">
        <Pagination
          total={total}
          pagination={pagination}
          onClick={(p) => setPagination((prev) => ({ ...prev, currPage: p }))}
        />
      </div>
    </div>
  );
};
