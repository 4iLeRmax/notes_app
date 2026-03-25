import z from "zod";
import {
  EmailScheme,
  FirstNameScheme,
  LastNameScheme,
  PasswordScheme,
} from "./basic-schemes";

export const SignUpScheme = z
  .object({
    email: EmailScheme,
    firstName: FirstNameScheme,
    lastName: LastNameScheme,
    password: PasswordScheme,
    confirmPassword: PasswordScheme,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TSignUp = z.infer<typeof SignUpScheme>;

export const SignInScheme = z.object({
  email: EmailScheme,
  password: PasswordScheme,
});

export type TSignIn = z.infer<typeof SignInScheme>;
