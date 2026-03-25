import z from "zod";
import { NoteContentScheme, NoteTitleScheme } from "./basic-schemes";
import { no } from "zod/v4/locales";

export const CreateNoteScheme = z.object({
  title: NoteTitleScheme,
  content: NoteContentScheme,
  noteType: z.enum(["TEXT", "TODO"]),
});

export type TCreateNote = z.infer<typeof CreateNoteScheme>;
