import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { AgentsPageAgent, ProfileAgent } from "~/types/agent";
import { getApiUrl } from "~/utils/api";

export const agentRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        token: z.string().nullable(),
        currPage: z.number(),
        perPage: z.number(),
      }),
    )
    .query(async ({ input: { token, perPage, currPage } }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      // Em produção usar o token aqui como env.var
      // headers.append("Authorization", `Bearer ${env.NONSTOP_TOKEN}`);

      const response = await fetch(
        `${getApiUrl()}/agentes/todos?perPage=${perPage}&currPage=${currPage}`,
        // `https://www.usenonstop.com/api/agentes/todos?perPage=${perPage}&currPage=${currPage}`,
        { headers },
      );

      if (response.ok) {
        return (await response.json()) as {
          agents: AgentsPageAgent[];
          total: number;
        };
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),

  profile: publicProcedure
    .input(z.object({ token: z.string().nullable(), slug: z.string() }))
    .query(async ({ input: { token, slug } }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      // Em produção usar o token aqui como env.var
      // headers.append("Authorization", `Bearer ${env.NONSTOP_TOKEN}`);

      const response = await fetch(
        `${getApiUrl()}/agentes/${slug}`,
        // `https://www.usenonstop.com/api/agentes/${slug}`,
        { headers },
      );

      if (response.ok) {
        return ((await response.json()) as { agent: ProfileAgent }).agent;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),
});
