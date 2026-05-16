-- AlterTable
CREATE SEQUENCE noteitem_position_seq;
ALTER TABLE "NoteItem" ALTER COLUMN "position" SET DEFAULT nextval('noteitem_position_seq');
ALTER SEQUENCE noteitem_position_seq OWNED BY "NoteItem"."position";
