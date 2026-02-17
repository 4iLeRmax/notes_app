"use server";

import { revalidatePath, unstable_cache } from "next/cache";
import prisma from "../prisma";
import { cache } from "react";
import { getSession } from "./auth";

export const getAllNotes = cache(async () => {
  const session = await getSession();

  if (session) {
    const notes = await prisma.note.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        content: true,
        labels: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notes;
  }
});

export const getNoteById = async (noteId: string) => {
  console.log("getNoteById");
  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    include: {
      content: {
        orderBy: {
          createdAt: "asc",
        },
      },
      labels: true,
    },
  });

  return note;
};

export const createNote = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const contentText = formData.get("content") as string;
  const contentLines = contentText.split("\n");

  if (title || contentText) {
    const session = await getSession();

    if (session) {
      await prisma.note.create({
        data: {
          title,
          type: "TEXT",
          userId: session.user.id,
          content: {
            createMany: {
              data: contentLines.map((line) => ({
                content: line,
              })),
            },
          },
        },
      });
    }

    revalidatePath("/");
  }
};

export const deleteNote = async (noteId: string) => {
  await prisma.note.delete({
    where: {
      id: noteId,
    },
  });

  revalidatePath("/");
  revalidatePath(`/${noteId}`);
};

export const toggleNoteType = async (noteId: string) => {
  const currentNote = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (currentNote) {
    const oldNoteType = currentNote.type;

    await prisma.note.update({
      where: { id: noteId },
      data: {
        type: oldNoteType === "TEXT" ? "TODO" : "TEXT",
      },
    });
  }

  revalidatePath(`/notes`);
  // revalidatePath(`/notes/${noteId}`);
};

export const togglePinnedStatus = async (noteId: string) => {
  const currentNote = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (currentNote) {
    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        isPinned: !currentNote.isPinned,
      },
    });
  }

  revalidatePath(`/`);
  revalidatePath(`/${noteId}`);
};

export const updateNoteTitle = async (noteId: string, formData: FormData) => {
  const title = formData.get("title") as string;

  await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      title: title,
    },
  });

  revalidatePath(`/${noteId}`);
};

export const updateNoteText = async (noteId: string, formData: FormData) => {
  const content = formData.get("text") as string;
  const contentLines = content.split("\n");

  await prisma.noteItem.deleteMany({
    where: {
      noteId,
    },
  });

  await prisma.noteItem.createMany({
    data: [
      ...contentLines.map((line) => ({
        content: line,
        isDone: false,
        noteId,
      })),
    ],
  });

  revalidatePath(`/${noteId}`);
};

export const createCopy = async (noteId: string) => {
  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    include: {
      content: true,
    },
  });

  if (note) {
    await prisma.note.create({
      data: {
        title: note.title + " (copy)",
        userId: note.userId,
        isPinned: note.isPinned,
        type: note.type,
        content: {
          createMany: {
            data: note.content.map((item) => ({
              content: item.content,
              isDone: item.isDone,
            })),
          },
        },
      },
    });
  }

  revalidatePath("/");
  revalidatePath(`/${noteId}`);
};
