// lib/crypto/envelope.ts
import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

const ALGO = "aes-256-gcm";

const KEKS: Record<number, Buffer> = {
  1: Buffer.from(process.env.KEK_V1!, "hex"), // 32 bytes
};
const CURRENT_KEK_VERSION = 1;

function encrypt(plaintext: Buffer, key: Buffer): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGO, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, ciphertext]).toString("hex");
}

function decrypt(sealed: string, key: Buffer): Buffer {
  const buf = Buffer.from(sealed, "hex");
  const iv = buf.subarray(0, 12);
  const authTag = buf.subarray(12, 28);
  const ciphertext = buf.subarray(28);
  const decipher = createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}

export function generateDek(): Buffer {
  return randomBytes(32);
}

export function encryptDek(dek: Buffer): {
  encryptedDek: string;
  kekVersion: number;
} {
  return {
    encryptedDek: encrypt(dek, KEKS[CURRENT_KEK_VERSION]),
    kekVersion: CURRENT_KEK_VERSION,
  };
}

export function decryptDek(encryptedDek: string, kekVersion: number): Buffer {
  return decrypt(encryptedDek, KEKS[kekVersion]);
}

export function encryptField(plaintext: string, dek: Buffer): string {
  return encrypt(Buffer.from(plaintext, "utf8"), dek);
}

export function decryptField(encryptedFiled: string, dek: Buffer): string {
  return decrypt(encryptedFiled, dek).toString("utf8");
}
