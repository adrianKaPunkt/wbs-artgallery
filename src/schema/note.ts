import { z } from "zod";

export const NoteSchema = z.object({
  id: z.string(),
  note: z.string(),
});

export type Note = z.infer<typeof NoteSchema>;
