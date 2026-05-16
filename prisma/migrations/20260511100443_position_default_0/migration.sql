-- AlterTable
ALTER TABLE "NoteItem" ALTER COLUMN "position" SET DEFAULT 0,
ALTER COLUMN "position" DROP DEFAULT;
DROP SEQUENCE "noteitem_position_seq";
