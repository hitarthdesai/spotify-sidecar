import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCClientError } from "@trpc/client";
import { searchInputSchema, searchOutputSchema } from "./track.schema";

export const trackRouter = createTRPCRouter({
  search: protectedProcedure
    .input(searchInputSchema)
    .output(searchOutputSchema)
    .query(async ({ ctx, input: { query } }) => {
      const encodedQuery = encodeURIComponent(query);
      const accessToken = ctx.session.user.accessToken;

      try {
        const {
          tracks: { items },
        } = await fetch(
          `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        ).then((res) => res.json());

        const tracks = items.map(
          ({ artists, duration_ms, explicit, id, name, popularity }) => ({
            id,
            name,
            popularity,
            artists: artists?.map((_) => _.name),
            durationMs: duration_ms,
            hasLyrics: explicit,
          }),
        );

        return { tracks };
      } catch (e) {
        console.log(e);
        throw new TRPCClientError(e);
      }
    }),
});
