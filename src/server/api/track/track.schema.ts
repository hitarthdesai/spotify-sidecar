import * as z from "zod";

export const trackSchema = z.object({
  id: z.string().min(1),
  artists: z.array(z.string()).nonempty(),
  durationMs: z.number(),
  name: z.string(),
  // hasLyrics: z.boolean(),
  // popularity: z.number(),
});

export const searchInputSchema = z.object({ query: z.string().min(1) });
export const searchOutputSchema = z.object({
  tracks: z.array(trackSchema).nonempty(),
});
