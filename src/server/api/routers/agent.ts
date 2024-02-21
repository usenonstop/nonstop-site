import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { AgentsPageAgent } from "~/types/agent";

export const agentRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.string().nullable())
    .query(async ({ input: token }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      // Em produção usar o token aqui como env.var
      // headers.append("Authorization", `Bearer ${env.NONSTOP_TOKEN}`);

      const response = await fetch("https://www.usenonstop.com/api/agentes", {
        headers,
      });

      if (response.ok) {
        const data = (await response.json()) as { agents: AgentsPageAgent[] };
        return data.agents;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),
});
