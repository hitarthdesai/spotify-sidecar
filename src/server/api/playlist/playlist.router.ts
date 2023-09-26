import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCClientError } from "@trpc/client";
import { listAllInputSchema, listAllOutputSchema } from "./playlist.schema";

export const playlistRouter = createTRPCRouter({
  listAll: protectedProcedure
    .input(listAllInputSchema)
    .output(listAllOutputSchema)
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;

      try {
        const { items } = await fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            headers: {
              Authorization: `Bearer ${ctx.session.user.accessToken}`,
            },
          },
        ).then((res) => res.json());

        return { playlists: items };
      } catch (e) {
        throw new TRPCClientError(e);
      }
    }),
});
