import { useAtom } from "jotai";
import { useState } from "react";
import { tokenAtom } from "~/ui/Header";
// import { NoToken } from "~/ui/NoToken";
import { Pagination } from "~/ui/Pagination";
import { PropertyCard } from "~/ui/PropertyCard";
import { api } from "~/utils/api";

export const AgentPortfolio = ({
  slug,
  sold,
}: {
  slug: string;
  sold: boolean;
}) => {
  const [token] = useAtom(tokenAtom);
  const [pagination, setPagination] = useState({ currPage: 1, perPage: 5 });
  const { currPage, perPage } = pagination;
  const { data } = api.agent.portfolio.useQuery(
    { token, currPage, perPage, slug, sold },
    // { enabled: !!token },
  );

  const properties = data?.properties ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="scrollbar flex h-[calc(100vh-208px)] w-full flex-col items-center gap-8 overflow-scroll">
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
