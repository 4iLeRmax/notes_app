import z from "zod";
import { EmailScheme, PasswordScheme } from "../basic-schemes";

export const SignInScheme = z.object({
  email: EmailScheme,
  password: PasswordScheme,
});

export type TSignIn = z.infer<typeof SignInScheme>;
