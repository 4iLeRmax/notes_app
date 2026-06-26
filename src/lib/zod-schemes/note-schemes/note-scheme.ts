import z from "zod";
import { LabelScheme } from "./label-scheme";
import {
  NoteColorScheme,
  NoteTitleScheme,
  NoteTypeScheme,
} from "../basic-schemes";
import {
  NoteItemScheme,
  TEXTNoteItemScheme,
  TODONoteItemScheme,
} from "./note-item-scheme";
import { LABEL_LIMITS, NOTE_LIMITS } from "@/lib/constants";

export const NoteScheme = z.object({
  id: z.uuid(),
  title: NoteTitleScheme,
  type: NoteTypeScheme,
  isPinned: z.boolean(),
  color: NoteColorScheme,
  userId: z.string().trim().min(1),
  content: z
    .array(NoteItemScheme)
    .max(NOTE_LIMITS.TODO.maxItems, "100 items max"),
  labels: z
    .array(LabelScheme)
    .max(LABEL_LIMITS.MAX_LABELS_PER_NOTE, "10 labels per note"),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const TEXTNoteScheme = NoteScheme.extend({
  content: z
    .array(TEXTNoteItemScheme)
    .max(NOTE_LIMITS.TEXT.maxItems, "100 items max"),
}).refine(
  ({ content }) =>
    content.reduce((sum, el) => (sum += el.content.length), 0) <=
    NOTE_LIMITS.TEXT.totalChars,
  {
    error: "Max count of chars",
  },
);

export const TODONoteScheme = NoteScheme.extend({
  content: z
    .array(TODONoteItemScheme)
    .max(NOTE_LIMITS.TODO.maxItems, "100 items max"),
}).refine(
  ({ content }) =>
    content.reduce((sum, el) => (sum += el.content.length), 0) <=
    NOTE_LIMITS.TODO.totalChars,
  {
    error: "Max count of chars",
  },
);

export type TNote = z.infer<typeof NoteScheme>;
