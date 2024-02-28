import { useAtom } from "jotai";
import { useState } from "react";
import { CondoCard } from "~/ui/CondoCard";
import { Header, tokenAtom } from "~/ui/Header";
// import { NoToken } from "~/ui/NoToken";
import { Pagination } from "~/ui/Pagination";
import { api } from "~/utils/api";

export default function Condominios() {
  const [token] = useAtom(tokenAtom);
  const [pagination, setPagination] = useState({ currPage: 1, perPage: 5 });
  const { currPage, perPage } = pagination;
  const { data } = api.condo["get-all"].useQuery({ token, currPage, perPage });

  const condos = data?.condos ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Header title="CONDOMÍNIOS" />
      <div className="flex h-[calc(100vh-208px)] w-full flex-col items-center overflow-scroll scrollbar">
        <div className="mb-8">
          <Pagination
            total={total}
            pagination={pagination}
            onClick={(p) => setPagination((prev) => ({ ...prev, currPage: p }))}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* {!token && <NoToken />} */}
          {condos?.map((c) => <CondoCard key={c.id} condo={c} />)}
        </div>
      </div>
    </div>
  );
}
