import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { CardCondo, CondoDTO } from "~/types/condo";
import { getApiUrl } from "~/utils/api";

export const condoRouter = createTRPCRouter({
  "get-all": publicProcedure
    .input(
      z.object({
        token: z.string().nullish(),
        currPage: z.number(),
        perPage: z.number(),
      }),
    )
    .query(async ({ input: { perPage, currPage, token } }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token ?? env.NONSTOP_TOKEN}`);

      const response = await fetch(
        `${getApiUrl()}/condominios/todos?perPage=${perPage}&currPage=${currPage}`,
        { headers },
      );

      if (response.ok) {
        return (await response.json()) as {
          condos: CardCondo[];
          total: number;
        };
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),

  get: publicProcedure
    .input(z.object({ token: z.string().nullish(), id: z.string() }))
    .query(async ({ input: { id, token } }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token ?? env.NONSTOP_TOKEN}`);

      const response = await fetch(`${getApiUrl()}/condominios/${id}`, {
        headers,
      });

      if (response.ok) {
        return ((await response.json()) as { condo: CondoDTO }).condo;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ops, houve um problema",
      });
    }),
});
