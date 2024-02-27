import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env";
import { getAllInputSchema, getMarkersInputSchema } from "~/schemas/property";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type {
  CardProperty,
  Marker,
  PropertyDTO,
  TableProperty,
} from "~/types/property";
import { getApiUrl } from "~/utils/api";

export const propertyRouter = createTRPCRouter({
  "get-home": publicProcedure
    .input(z.string().nullish())
    .query(async ({ input: token }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token ?? env.NONSTOP_TOKEN}`);

      const response = await fetch(`${getApiUrl()}/imoveis/home`, { headers });

      if (response.ok) {
        const data = (await response.json()) as { properties: CardProperty[] };
        return data.properties;
      }

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

      if (response.ok) {
        return ((await response.json()) as { property: PropertyDTO }).property;
      }

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
          properties: TableProperty[];
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

      if (response.ok) {
        return ((await response.json()) as { markers: Marker[] }).markers;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),
});
