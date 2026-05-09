import z from "zod";
import { NoteContentScheme, NoteTitleScheme } from "./basic-schemes";

export const CreateNoteScheme = z
  .object({
    title: NoteTitleScheme,
    content: NoteContentScheme,
    noteType: z.enum(["TEXT", "TODO"]),
    isPinned: z.boolean().default(false),
  })
  .refine(({ title, content }) => title.length > 0 || content.length > 0, {
    error: "Either title or content must be provided",
    path: ["root"],
  });

export type TCreateNote = z.infer<typeof CreateNoteScheme>;
