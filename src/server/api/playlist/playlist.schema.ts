import * as z from "zod";

export const miniPlaylistSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  images: z.array(
    z.object({
      height: z.number().nullable(),
      url: z.string().url(),
      width: z.number().nullable(),
    }),
  ),
  public: z.boolean(),
  tracks: z.object({
    total: z.number(),
  }),
});

export const detailedPlaylistSchema = z.object({
  id: z.string(),
  name: z.string(),
  tracks: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      artists: z.array(z.string()).nonempty(),
    }),
  ),
});

export type MiniPlaylist = z.infer<typeof miniPlaylistSchema>;

export const listAllInputSchema = z.undefined();
export const listAllOutputSchema = z.object({
  playlists: z.array(miniPlaylistSchema).nonempty(),
});

export const listByIdInputSchema = z.object({ id: z.string().min(1) });
export const listByIdOutputSchema = z.object({
  playlist: miniPlaylistSchema,
});
