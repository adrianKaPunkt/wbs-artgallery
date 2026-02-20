import { z } from "zod";

export const ArtworkSchema = z.object({
  // pagination: z.object({
  //   total: z.number(),
  //   limit: z.number(),
  //   offset: z.number(),
  //   total_pages: z.number(),
  //   current_page: z.number(),
  //   next_url: z.string().nullable(),
  // }),
  id: z.number().optional().nullable(),
  title: z.string().optional().nullable(),
  artist_title: z.string().nullable(),
  description: z.string().optional().nullable(),
  thumbnail: z
    .looseObject({
      alt_text: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  date_start: z.number().optional().nullable(),
  image_id: z.string().optional().nullable(),
});

export type Artwork = z.infer<typeof ArtworkSchema>;
