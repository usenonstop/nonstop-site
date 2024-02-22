import Image from "next/image";
import Link from "next/link";
import type { AgentsPageAgent } from "~/types/agent";

export const AgentCard = ({ agent }: { agent: AgentsPageAgent }) => {
  return (
    <Link
      href={`/agente/${agent.slug}`}
      className="relative h-[500px] w-80 overflow-hidden rounded-lg border shadow-lg shadow-gray-400"
    >
      <Image
        src={
          agent.profileImage ??
          "https://www.usenonstop.com/images/user-placeholder.webp"
        }
        alt="Imagem do imóvel"
        fill
        sizes="320px"
        className="object-cover"
      />
      <div className="absolute bottom-0 flex h-40 w-full flex-col justify-between bg-black/80 p-4 text-lg text-gray-200">
        <div className="h-16 font-medium">{agent.name}</div>
        <div className="flex flex-col gap-2">
          <div className="text-base">{agent.email}</div>
          <div className="text-base">
            Sob gestão: R${" "}
            {agent.vgv.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>
    </Link>
  );
};
