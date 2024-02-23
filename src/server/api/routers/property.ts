import { TRPCError } from "@trpc/server";
import { z } from "zod";
// import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { CardProperty } from "~/types/property";

export const propertyRouter = createTRPCRouter({
  getHome: publicProcedure
    .input(z.string().nullable())
    .query(async ({ input: token }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      // Em produção usar o token aqui como env.var
      // headers.append("Authorization", `Bearer ${env.NONSTOP_TOKEN}`);

      const response = await fetch(
        `https://www.usenonstop.com/api/imoveis/home`,
        { headers },
      );

      if (response.ok) {
        const data = (await response.json()) as { properties: CardProperty[] };
        return data.properties;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),

  getHighlight: publicProcedure
    .input(z.string().nullable())
    .query(async ({ input: token }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      // Em produção usar o token aqui como env.var
      // headers.append("Authorization", `Bearer ${env.NONSTOP_TOKEN}`);

      const response = await fetch(
        "https://www.usenonstop.com/api/imoveis/destaque",
        { headers },
      );

      if (response.ok) {
        const data = (await response.json()) as { properties: CardProperty[] };
        return data.properties;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),
});
