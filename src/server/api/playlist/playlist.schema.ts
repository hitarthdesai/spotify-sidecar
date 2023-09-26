import * as z from "zod";

export const playlistSchema = z.object({
  id: z.string(),
  description: z.string(),
  images: z.array(
    z.object({
      height: z.number().nullable(),
      url: z.string().url(),
      width: z.number().nullable(),
    }),
  ),
  name: z.string(),
  public: z.boolean(),
  tracks: z.object({
    href: z.string().url(),
    total: z.number(),
  }),
  /* https://api.spotify.com/v1/playlists/5MiIwFlD5FH1VpUpy2SCLY/${id} */
  href: z.string().url(),
  /* spotify:playlist:${id} */
  uri: z.string(),
});

export type Playlist = z.infer<typeof playlistSchema>;

export const listAllInputSchema = z.undefined();
export const listAllOutputSchema = z.object({
  playlists: z.array(playlistSchema).nonempty(),
});
