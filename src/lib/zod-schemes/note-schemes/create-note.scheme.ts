import z from "zod";
import { NoteTitleScheme, NoteTypeScheme } from "../basic-schemes";
import { NOTE_LIMITS } from "@/lib/constants";
import { NoteItemScheme } from "./note-item-scheme";

export const CreateNoteScheme = z
  .object({
    title: NoteTitleScheme,
    content: z
      .array(
        z.object({
          content: NoteItemScheme.shape.content,
          isDone: z.boolean(),
        }),
      )
      .max(NOTE_LIMITS.TODO.maxItems, "Note content is too long"),
    type: NoteTypeScheme,
    isPinned: z.boolean(),
  })
  .refine(
    ({ title, content }) =>
      title.length > 0 || content.some((el) => el.content.length > 0),
    {
      error: "Either title or content must be provided",
      path: ["root"],
    },
  )
  .refine(
    ({ content, type }) =>
      type === "TEXT"
        ? content.every(
            (el) => el.content.length <= NOTE_LIMITS.TEXT.maxCharsPerItem,
          )
        : content.every(
            (el) => el.content.length <= NOTE_LIMITS.TODO.maxCharsPerItem,
          ),
    {
      error: "One or more note items exceed the maximum character limit",
      path: ["content"],
    },
  )
  .refine(
    ({ content }) =>
      content.reduce((sum, el) => (sum += el.content.length), 0) <=
      NOTE_LIMITS.TODO.totalChars,
    {
      error: "Total content length exceeds the limit",
      path: ["content"],
    },
  );

export type TCreateNote = z.infer<typeof CreateNoteScheme>;
