import { decryptDek } from "./encryption";

export function getUserDek(user: {
  encryptedDek?: string | null;
  kekVersion?: number | null;
}) {
  if (!user.encryptedDek || !user.kekVersion) {
    throw new Error("User is missing encryption key material");
  }
  return decryptDek(user.encryptedDek, user.kekVersion);
}
