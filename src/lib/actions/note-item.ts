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

  revalidatePath(`/${noteId}`);
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

  revalidatePath(`/${res.noteId}`);
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

  revalidatePath(`/${res.noteId}`);
};

export const deleteNoteItem = async (noteItemId: string) => {
  const res = await prisma.noteItem.delete({
    where: {
      id: noteItemId,
    },
  });

  revalidatePath(`/${res.noteId}`);
};

export const deleteAllMarkedItems = async (noteId: string) => {
  await prisma.noteItem.deleteMany({
    where: {
      noteId,
      isDone: true,
    },
  });

  revalidatePath(`/`);
  revalidatePath(`/${noteId}`);
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

  revalidatePath(`/`);
  revalidatePath(`/${noteId}`);
};
