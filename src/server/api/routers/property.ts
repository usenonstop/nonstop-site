import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { UF } from "~/consts/property";
import { env } from "~/env";
import { getAllInputSchema, getMarkersInputSchema } from "~/schemas/property";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { UF as UFType } from "~/types/general";
import type { CardProperty, Marker, Property } from "~/types/property";
import { getApiUrl } from "~/utils/api";

export const propertyRouter = createTRPCRouter({
  "get-home": publicProcedure
    .input(z.string().nullish())
    .query(async ({ input: token }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token ?? env.NONSTOP_TOKEN}`);

      const url = `${getApiUrl()}/imoveis/home`;

      const response = await fetch(url, { headers });

      if (response.ok) return (await response.json()) as CardProperty[];

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),

  "get-highlight": publicProcedure
    .input(z.string().nullish())
    .query(async ({ input: token }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token ?? env.NONSTOP_TOKEN}`);

      const response = await fetch(`${getApiUrl()}/imoveis/destaque`, {
        headers,
      });

      if (response.ok) return (await response.json()) as CardProperty[];

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),

  get: publicProcedure
    .input(
      z.object({
        base36Id: z.string().nullable(),
        token: z.string().nullish(),
      }),
    )
    .query(async ({ input: { base36Id, token } }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token ?? env.NONSTOP_TOKEN}`);

      const response = await fetch(`${getApiUrl()}/imoveis/${base36Id}`, {
        headers,
      });

      if (response.ok) return (await response.json()) as Property;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),

  "get-all": publicProcedure
    .input(getAllInputSchema)
    .query(async ({ input }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        `Bearer ${input.token ?? env.NONSTOP_TOKEN}`,
      );

      const response = await fetch(`${getApiUrl()}/imoveis/todos`, {
        headers,
        method: "POST",
        body: JSON.stringify(input),
      });

      if (response.ok) {
        return (await response.json()) as {
          properties: CardProperty[];
          total: number;
        };
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),

  "get-markers": publicProcedure
    .input(getMarkersInputSchema)
    .query(async ({ input }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        `Bearer ${input.token ?? env.NONSTOP_TOKEN}`,
      );

      const response = await fetch(`${getApiUrl()}/imoveis/markers`, {
        headers,
        method: "POST",
        body: JSON.stringify(input),
      });

      if (response.ok) return (await response.json()) as Marker[];

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),

  "get-states": publicProcedure
    .input(z.string().nullish())
    .query(async ({ input: token }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token ?? env.NONSTOP_TOKEN}`);

      const response = await fetch(`${getApiUrl()}/imoveis/estados/`, {
        headers,
      });

      if (response.ok) return (await response.json()) as UFType[];

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),

  "get-cities": publicProcedure
    .input(
      z.object({
        token: z.string().nullish(),
        state: z.enum(UF).nullable(),
        query: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { state, token, query } = input;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token ?? env.NONSTOP_TOKEN}`);

      const response = await fetch(
        `${getApiUrl()}/imoveis/cidades?state=${state}&query=${query}`,
        { headers },
      );

      if (response.ok) return (await response.json()) as string[];

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),

  "get-areas": publicProcedure
    .input(
      z.object({
        token: z.string().nullish(),
        state: z.enum(UF).nullable(),
        city: z.string().nullable(),
        query: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { state, token, query, city } = input;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token ?? env.NONSTOP_TOKEN}`);

      const response = await fetch(
        `${getApiUrl()}/imoveis/bairros?state=${state}&city=${city}&query=${query}`,
        { headers },
      );

      if (response.ok) return (await response.json()) as string[];

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),
});
