import z from "zod";

const EmailScheme = z.email("Invalid email address");
const FirstNameScheme = z
  .string()
  .trim()
  .min(1, "First name is required")
  .max(50, "First name is too long");
const LastNameScheme = z
  .string()
  .trim()
  .min(1, "First name is required")
  .max(50, "First name is too long");
const PasswordScheme = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters long")
  .max(128, "Password is too long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

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
