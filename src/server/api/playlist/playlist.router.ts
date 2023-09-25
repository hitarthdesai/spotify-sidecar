import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCClientError } from "@trpc/client";
import { env } from "@/env.mjs";

export const playlistRouter = createTRPCRouter({
  listAll: protectedProcedure.input(z.undefined()).query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    try {
      let ans = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: {
            // Authorization: `Bearer BQAzEIBkLdUQ1tYMZELnICIhvDQAeZ3Ct7qcJKYFVXnfoyRbCyG5iowJag5XnUFNKENMbhhc75iaYnowqJ2h72OuHO66ONiGChZWCTel2mx9DrPCZBJCtCQDwxtMh1JfbC5tv-Ahz2-Axu5ByiXWasxerumiLvlrQK9QNPPNakdDKMbkq2NeVe6P6gY83lJ5L9dTw7-d8Ms18rA`,
            Authorization: `Bearer ${ctx.session.user.accessToken}`,
          },
        },
      );

      ans = await ans.json();

      return { res: ans };
    } catch (e) {
      throw new TRPCClientError(e);
    }
  }),
});
