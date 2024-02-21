import { useAtom } from "jotai";
import { AgentCard } from "~/ui/AgentCard";
import { Header, tokenAtom } from "~/ui/Header";
import { NoToken } from "~/ui/NoToken";
import { api } from "~/utils/api";

export default function Agentes() {
  const [token] = useAtom(tokenAtom);
  const { data: agents } = api.agent.get.useQuery(token, {
    enabled: !!token,
  });

  console.log(agents);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Header title="AGENTES" />
      <div className="h-[calc(100vh-160px)] w-full overflow-scroll">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {!token && <NoToken />}
          {agents?.map((a) => <AgentCard key={a.id} agent={a} />)}
        </div>
      </div>
    </div>
  );
}
