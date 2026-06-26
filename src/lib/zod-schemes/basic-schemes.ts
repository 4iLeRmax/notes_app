import z from "zod";
import { LABEL_LIMITS, NOTE_LIMITS } from "../constants";

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

const NoteTitleScheme = z
  .string()
  .trim()
  .max(NOTE_LIMITS.MAX_TITLE_CHARS, "Note title is too long");

const NoteTypeScheme = z.enum(["TEXT", "TODO"]);

const NoteColorScheme = z.string().length(7).includes("#").nullable();

const NoteItemPositionScheme = z.number().int().nonnegative();

const LabelNameScheme = z
  .string()
  .trim()
  .min(1, "Label is empty")
  .max(LABEL_LIMITS.MAX_LABEL_NAME_CHARS, "Label is too long");

const UserIdScheme = z.string().trim().min(1);

export {
  EmailScheme,
  FirstNameScheme,
  LastNameScheme,
  PasswordScheme,
  NoteTitleScheme,
  NoteTypeScheme,
  NoteColorScheme,
  NoteItemPositionScheme,
  LabelNameScheme,
  UserIdScheme,
};
