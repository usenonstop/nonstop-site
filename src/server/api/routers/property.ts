import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type {
  CardProperty,
  PropertyDTO,
  TableProperty,
} from "~/types/property";
// import { getApiUrl } from "~/utils/api";

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

  get: publicProcedure
    .input(
      z.object({
        base36Id: z.string().nullable(),
        token: z.string().nullable(),
      }),
    )
    .query(async ({ input: { base36Id, token } }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      // Em produção usar o token aqui como env.var
      // headers.append("Authorization", `Bearer ${env.NONSTOP_TOKEN}`);

      const response = await fetch(
        `https://www.usenonstop.com/api/imoveis/${base36Id}`,
        // `${getApiUrl()}/imoveis/${base36Id}`,
        { headers },
      );

      if (response.ok) {
        return ((await response.json()) as { property: PropertyDTO }).property;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        base36Id: z.string().nullable(),
        token: z.string().nullable(),
      }),
    )
    .query(async ({ input }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      // headers.append("Authorization", `Bearer ${token}`);
      // Em produção usar o token aqui como env.var
      headers.append("Authorization", `Bearer ${env.NONSTOP_TOKEN}`);

      const response = await fetch(
        `https://www.usenonstop.com/api/imoveis/todos`,
        // `${getApiUrl()}/imoveis/${base36Id}`,
        { headers, method: "POST", body: JSON.stringify(input) },
      );

      if (response.ok) {
        return (await response.json()) as {
          properties: TableProperty[];
          total: number;
        };
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),
});
