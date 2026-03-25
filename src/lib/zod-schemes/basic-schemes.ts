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

const NoteTitleScheme = z.string().trim().max(128, "Note title is too long");
const NoteContentScheme = z
  .string()
  .trim()
  .max(2000, "Note content is too long");

export {
  EmailScheme,
  FirstNameScheme,
  LastNameScheme,
  PasswordScheme,
  NoteTitleScheme,
  NoteContentScheme,
};
