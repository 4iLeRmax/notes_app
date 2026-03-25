"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export const createNoteItem = async (noteId: string) => {
  await prisma.noteItem.create({
    data: {
      content: "",
      isDone: false,
      noteId,
    },
  });

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${noteId}`);
};

export const updateNoteItem = async (
  noteItemId: string,
  formData: FormData,
) => {
  const text = formData.get("text") as string;

  const res = await prisma.noteItem.update({
    where: {
      id: noteItemId,
    },
    data: {
      content: text,
    },
  });
  revalidatePath(`/notes`);
  revalidatePath(`/notes/${res.noteId}`);
};

export const toggleNoteItemStatus = async (
  noteItemId: string,
  currentStatus: boolean,
) => {
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
};

export const deleteNoteItem = async (noteItemId: string) => {
  const res = await prisma.noteItem.delete({
    where: {
      id: noteItemId,
    },
  });

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${res.noteId}`);
};

export const deleteAllMarkedItems = async (noteId: string) => {
  await prisma.noteItem.deleteMany({
    where: {
      noteId,
      isDone: true,
    },
  });

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${noteId}`);
};

export const removeAllMarks = async (noteId: string) => {
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
};
