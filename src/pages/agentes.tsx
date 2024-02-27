import { useAtom } from "jotai";
import { useState } from "react";
import { AgentCard } from "~/ui/AgentCard";
import { Header, tokenAtom } from "~/ui/Header";
// import { NoToken } from "~/ui/NoToken";
import { Pagination } from "~/ui/Pagination";
import { api } from "~/utils/api";

export default function Agentes() {
  const [token] = useAtom(tokenAtom);
  const [pagination, setPagination] = useState({ currPage: 1, perPage: 5 });
  const { currPage, perPage } = pagination;
  const { data } = api.agent.get.useQuery({ token, currPage, perPage });

  const agents = data?.agents ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Header title="AGENTES" />
      <div className="flex h-[calc(100vh-208px)] w-full flex-col items-center overflow-scroll scrollbar">
        <div className="mb-8">
          {token && (
            <Pagination
              total={total}
              pagination={pagination}
              onClick={(p) =>
                setPagination((prev) => ({ ...prev, currPage: p }))
              }
            />
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* {!token && <NoToken />} */}
          {agents?.map((a) => <AgentCard key={a.id} agent={a} />)}
        </div>
      </div>
    </div>
  );
}
