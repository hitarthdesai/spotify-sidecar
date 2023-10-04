import * as z from "zod";

export const trackSchema = z.object({
  id: z.string().min(1),
  artists: z.array(z.string()).nonempty(),
  durationMs: z.number(),
  // hasLyrics: z.boolean(),
  name: z.string(),
  // popularity: z.number(),
});

// export type MiniPlaylist = z.infer<typeof miniPlaylistSchema>;
// export type DetailedPlaylist = z.infer<typeof miniPlaylistSchema>;

// export const listAllInputSchema = z.undefined();
// export const listAllOutputSchema = z.object({
//   playlists: z.array(miniPlaylistSchema).nonempty(),
// });

export const searchInputSchema = z.object({ query: z.string().min(1) });
export const searchOutputSchema = z.object({
  tracks: z.array(trackSchema).nonempty(),
});
