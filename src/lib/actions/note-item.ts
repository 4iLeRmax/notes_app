"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import encrypt from "../encryption/encrypt";
import { getSession } from "./auth";

export const createNoteItem = async (
  noteId: string,
  createAtPosition?: number,
) => {
  console.log("createNoteItem");
  const session = await getSession();
  if (!session) return;

  if (createAtPosition) {
    await prisma.noteItem.updateMany({
      where: {
        noteId: noteId,
        position: { gt: createAtPosition - 1 },
      },
      data: {
        position: { increment: 1 },
      },
    });

    await prisma.noteItem.create({
      data: {
        content: encrypt(""),
        isDone: false,
        noteId,
        position: createAtPosition,
      },
    });
  } else {
    const lastNoteItem = await prisma.noteItem.findFirst({
      where: {
        noteId,
      },
      orderBy: {
        position: "desc",
      },
      select: {
        position: true,
      },
    });
    const newPosition = lastNoteItem ? lastNoteItem.position + 1 : 0;

    try {
      await prisma.noteItem.create({
        data: {
          content: encrypt(""),
          isDone: false,
          noteId,
          position: newPosition,
        },
      });
    } catch (error) {
      console.error("Error creating note item:", error);
    }
  }

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${noteId}`);

  return { success: true };
}; //+

export const deleteNoteItem = async (noteItemId: string) => {
  console.log("deleteNoteItem");
  const session = await getSession();
  if (!session) return;

  const item = await prisma.noteItem.findUnique({
    where: { id: noteItemId },
    select: { position: true, noteId: true },
  });

  if (!item) return;

  await prisma.$transaction([
    prisma.noteItem.delete({
      where: { id: noteItemId },
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

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${item.noteId}`);
}; //+

export const updateNoteItem = async (noteItemId: string, text: string) => {
  console.log("updateNoteItem");

  const session = await getSession();
  if (!session) return;

  const res = await prisma.noteItem.update({
    where: {
      id: noteItemId,
    },
    data: {
      content: encrypt(text),
    },
  });
  // } catch (error) {
  //   console.error("Error updating note item:", error);
  // }

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${res.noteId}`);
}; //+

export const toggleNoteItemStatus = async (
  noteItemId: string,
  currentStatus: boolean,
) => {
  console.log("toggleNoteItemStatus");
  const session = await getSession();
  if (!session) return;

  const res = await prisma.noteItem.update({
    where: {
      id: noteItemId,
    },
    data: {
      isDone: !currentStatus,
    },
  });

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${res.noteId}`);
}; //+

export const deleteAllMarkedItems = async (noteId: string) => {
  console.log("deleteAllMarkedItems");
  const session = await getSession();
  if (!session) return;

  await prisma.noteItem.deleteMany({
    where: {
      noteId,
      isDone: true,
    },
  });

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${noteId}`);
}; //+

export const removeAllMarks = async (noteId: string) => {
  console.log("removeAllMarks");
  const session = await getSession();
  if (!session) return;

  await prisma.noteItem.updateMany({
    where: {
      noteId,
    },
    data: {
      isDone: false,
    },
  });

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${noteId}`);
}; //+
