import { createTRPCRouter } from "@/server/api/trpc";
import { playlistRouter } from "./playlist/playlist.router";
import { trackRouter } from "./track/track.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  playlist: playlistRouter,
  track: trackRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
