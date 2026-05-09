import z from "zod";
import { EmailScheme } from "../basic-schemes";

export const FindAccountScheme = z.object({
  email: EmailScheme,
});

export type TFindAccount = z.infer<typeof FindAccountScheme>;
