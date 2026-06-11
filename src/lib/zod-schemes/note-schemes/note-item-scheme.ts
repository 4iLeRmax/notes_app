import { NOTE_LIMITS } from "@/lib/constants";
import z from "zod";

export const NoteItemScheme = z.object({
  id: z.uuid(),
  content: z.string().trim(),
  isDone: z.boolean(),
  position: z.number().int().nonnegative(),
  noteId: z.uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const TEXTNoteItemScheme = NoteItemScheme.extend({
  content: z
    .string()
    .trim()
    .max(NOTE_LIMITS.TEXT.maxCharsPerItem, "Note content is too long"),
});

export const TODONoteItemScheme = NoteItemScheme.extend({
  content: z
    .string()
    .trim()
    .max(NOTE_LIMITS.TODO.maxCharsPerItem, "Note content is too long"),
});

export type TNoteItem = z.infer<typeof NoteItemScheme>;
