import z from "zod";
import { PasswordScheme } from "../basic-schemes";

export const ResetPasswordScheme = z
  .object({
    password: PasswordScheme,
    confirmPassword: PasswordScheme,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TResetPassword = z.infer<typeof ResetPasswordScheme>;
