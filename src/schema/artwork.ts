import { z } from "zod";

const ArtworkItemSchema = z.looseObject({
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

export const ArtworkSchema = z.object({
  pagination: z.looseObject({
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
    total_pages: z.number(),
    current_page: z.number(),
  }),
  data: z.array(ArtworkItemSchema),
});

export type ArtworkResponse = z.infer<typeof ArtworkSchema>;
export type Artwork = z.infer<typeof ArtworkItemSchema>;
export type Pagination = z.infer<typeof ArtworkSchema.shape.pagination>;
