"use server";

import prisma from "../prisma";
import encrypt from "../encryption/encrypt";
import { getSession } from "./auth";
import { NoteActionErrors, NoteItemActionErrors } from "./errors";
import z from "zod";
import { TODONoteItemScheme } from "../zod-schemes/note-schemes/note-item-scheme";
import { NOTE_LIMITS } from "../constants";
import decrypt from "../encryption/decrypt";
import { NoteItemPositionScheme } from "../zod-schemes/basic-schemes";

export const createNoteItem = async (newNoteItem: NoteItem) => {
  console.log("createNoteItem");
  const session = await getSession();
  if (!session) throw new Error(NoteItemActionErrors.UNAUTHORIZED);

  // max chars per item
  const { data: safeNewNoteItem, success: validNoteItem } =
    TODONoteItemScheme.safeParse(newNoteItem);
  if (!validNoteItem)
    throw new Error(NoteItemActionErrors.INVALID_NOTE_ITEM_DATA);

  const noteItemsCount = await prisma.noteItem.count({
    where: { noteId: safeNewNoteItem.noteId },
  });

  // max items
  if (noteItemsCount >= NOTE_LIMITS.TODO.maxItems)
    throw new Error(NoteItemActionErrors.NOTE_ITEM_LIMIT);

  try {
    await prisma.noteItem.updateMany({
      where: {
        noteId: safeNewNoteItem.noteId,
        position: { gt: safeNewNoteItem.position - 1 },
      },
      data: {
        position: { increment: 1 },
      },
    });
    await prisma.noteItem.create({
      data: {
        ...safeNewNoteItem,
        content: encrypt(safeNewNoteItem.content),
      },
    });
  } catch (error) {
    throw new Error(NoteItemActionErrors.CREATE_NOTE_ITEM_FAILED);
  }

  // revalidatePath(`/notes`);
  // revalidatePath(`/notes/${noteId}`);

  return { success: true };
}; //+

export const deleteNoteItem = async (noteItemId: string) => {
  console.log("deleteNoteItem");
  const session = await getSession();
  if (!session) throw new Error(NoteItemActionErrors.UNAUTHORIZED);

  const safeNoteItemIdData = z.uuid().safeParse(noteItemId);
  if (!safeNoteItemIdData.success)
    throw new Error(NoteItemActionErrors.INVALID_NOTE_ITEM_ID);
  const { data: safeNoteItemId } = safeNoteItemIdData;

  const item = await prisma.noteItem.findUnique({
    where: { id: safeNoteItemId },
    select: { position: true, noteId: true },
  });

  if (!item) throw new Error(NoteItemActionErrors.NOTE_ITEM_NOT_FOUND);

  try {
    await prisma.$transaction([
      prisma.noteItem.delete({
        where: { id: safeNoteItemId },
      }),
      prisma.noteItem.updateMany({
        where: {
          noteId: item.noteId,
          position: { gt: item.position },
        },
        data: {
          position: { decrement: 1 },
        },
      }),
    ]);

    // revalidatePath(`/notes`);
    // revalidatePath(`/notes/${item.noteId}`);
  } catch {
    throw new Error(NoteItemActionErrors.DELETE_NOTE_ITEM_FAILED);
  }
}; //+

export const updateNoteItem = async (
  noteId: string,
  noteItemId: string,
  text: string,
) => {
  console.log("updateNoteItem");

  const session = await getSession();
  if (!session) throw new Error(NoteItemActionErrors.UNAUTHORIZED);

  const safeNoteIdData = z.uuid().safeParse(noteId);
  if (!safeNoteIdData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_ID);
  const { data: safeNoteId } = safeNoteIdData;

  const safeNoteItemIdData = z.uuid().safeParse(noteItemId);
  if (!safeNoteItemIdData.success)
    throw new Error(NoteItemActionErrors.INVALID_NOTE_ITEM_ID);
  const { data: safeNoteItemId } = safeNoteItemIdData;

  // max chars per item
  const safeData = TODONoteItemScheme.pick({ content: true }).safeParse({
    content: text,
  });
  if (!safeData.success)
    throw new Error(NoteItemActionErrors.INVALID_NOTE_ITEM_CONTENT);
  const {
    data: { content: safeText },
  } = safeData;

  const items = await prisma.noteItem.findMany({
    where: { noteId: safeNoteId },
    select: { id: true, content: true },
  });

  const currentTotal = items.reduce(
    (sum, item) => sum + decrypt(item.content).length,
    0,
  );
  const existingItem = items.find((item) => item.id === safeNoteItemId);
  if (!existingItem) throw new Error(NoteItemActionErrors.NOTE_ITEM_NOT_FOUND);

  const projectedTotal =
    currentTotal -
    (decrypt(existingItem.content).length ?? 0) +
    safeText.length;

  // total chars max

  if (projectedTotal > NOTE_LIMITS.TODO.totalChars)
    throw new Error(NoteActionErrors.NOTE_TOTAL_CHARS_LIMIT);

  try {
    await prisma.noteItem.update({
      where: {
        id: safeNoteItemId,
      },
      data: {
        content: encrypt(safeText),
      },
    });

    // revalidatePath(`/notes`);
    // revalidatePath(`/notes/${res.noteId}`);
  } catch {
    throw new Error(NoteItemActionErrors.UPDATE_NOTE_ITEM_FAILED);
  }
}; //+

export const toggleNoteItemStatus = async (
  noteItemId: string,
  currentStatus: boolean,
) => {
  console.log("toggleNoteItemStatus");
  const session = await getSession();
  if (!session) throw new Error(NoteItemActionErrors.UNAUTHORIZED);

  const safeNoteItemIdData = z.uuid().safeParse(noteItemId);
  if (!safeNoteItemIdData.success)
    throw new Error(NoteItemActionErrors.INVALID_NOTE_ITEM_ID);
  const { data: safeNoteItemId } = safeNoteItemIdData;

  const safeStatusData = z.boolean().safeParse(currentStatus);
  if (!safeStatusData.success)
    throw new Error(NoteItemActionErrors.INVALID_NOTE_ITEM_STATUS);
  const { data: safeStatus } = safeStatusData;

  try {
    const res = await prisma.noteItem.update({
      where: {
        id: safeNoteItemId,
      },
      data: {
        isDone: !safeStatus,
      },
    });

    // revalidatePath(`/notes`);
    // revalidatePath(`/notes/${res.noteId}`);
  } catch {
    throw new Error(NoteItemActionErrors.TOGGLE_NOTE_ITEM_STATUS_FAILED);
  }
}; //+

export const removeAllMarks = async (noteId: string) => {
  console.log("removeAllMarks");
  const session = await getSession();
  if (!session) throw new Error(NoteItemActionErrors.UNAUTHORIZED);

  const safeNoteIdData = z.uuid().safeParse(noteId);
  if (!safeNoteIdData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_ID);
  const { data: safeNoteId } = safeNoteIdData;

  try {
    await prisma.noteItem.updateMany({
      where: {
        noteId: safeNoteId,
      },
      data: {
        isDone: false,
      },
    });

    // revalidatePath(`/notes`);
    // revalidatePath(`/notes/${safeNoteId}`);
  } catch {
    throw new Error(NoteItemActionErrors.REMOVE_ALL_MARKS_FAILED);
  }
}; //+

export const deleteAllMarkedItems = async (
  noteId: string,
  remainingItems: { id: string; position: number }[],
) => {
  console.log("deleteAllMarkedItems");
  const session = await getSession();
  if (!session) throw new Error(NoteItemActionErrors.UNAUTHORIZED);

  const safeNoteIdData = z.uuid().safeParse(noteId);
  if (!safeNoteIdData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_ID);
  const { data: safeNoteId } = safeNoteIdData;

  const safeItemsData = z
    .array(
      z.object({
        id: z.uuid(),
        position: NoteItemPositionScheme,
      }),
    )
    .safeParse(remainingItems);
  if (!safeItemsData.success)
    throw new Error(NoteItemActionErrors.INVALID_NOTE_ITEM_DATA);
  const { data: safeItems } = safeItemsData;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.noteItem.deleteMany({
        where: { noteId: safeNoteId, isDone: true },
      });

      await Promise.all(
        safeItems.map((item) =>
          tx.noteItem.update({
            where: { id: item.id },
            data: { position: item.position },
          }),
        ),
      );
    });

    // revalidatePath(`/notes`);
    // revalidatePath(`/notes/${safeNoteId}`);
  } catch {
    throw new Error(NoteItemActionErrors.DELETE_ALL_MARKED_ITEMS_FAILED);
  }
}; //+
