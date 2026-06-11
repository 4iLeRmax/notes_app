import z from "zod";
import { LabelNameScheme, UserIdScheme } from "../basic-schemes";

export const LabelScheme = z.object({
  id: z.uuid(),
  name: LabelNameScheme,
  userId: UserIdScheme,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type TLabel = z.infer<typeof LabelScheme>;
