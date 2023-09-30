import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCClientError } from "@trpc/client";
import {
  listAllInputSchema,
  listAllOutputSchema,
  listByIdInputSchema,
  listByIdOutputSchema,
} from "./playlist.schema";

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

  byId: protectedProcedure
    .input(listByIdInputSchema)
    .output(listByIdOutputSchema)
    .query(async ({ ctx, input: { id: playlistId } }) => {
      const accessToken = ctx.session.user.accessToken;

      try {
        const { id, name, description, tracks } = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}?fields=name%2Cdescription%2Cid%2Ctracks.items%28track%28id%2Cartists%28id%29%2Cname%2Cimages%29%29`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        ).then((res) => res.json());

        const _ = {
          id,
          name,
          description,
          tracks: tracks.items.map((item) => item.track),
        };

        const playlist = {
          ..._,
          tracks: _.tracks.map((track) => ({
            ...track,
            artists: track.artists.map((artist) => artist.id),
          })),
        };

        return { playlist };
      } catch (e) {
        console.log(e);
        throw new TRPCClientError(e);
      }
    }),
});
