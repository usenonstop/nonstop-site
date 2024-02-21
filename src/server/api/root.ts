import { propertyRouter } from "~/server/api/routers/property";
import { agentRouter } from "~/server/api/routers/agent";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  property: propertyRouter,
  agent: agentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
