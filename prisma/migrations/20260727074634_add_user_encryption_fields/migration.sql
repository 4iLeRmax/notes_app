-- AlterTable
ALTER TABLE "user" ADD COLUMN     "encryptedDek" TEXT,
ADD COLUMN     "kekVersion" INTEGER DEFAULT 1;
