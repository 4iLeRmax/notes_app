"use server";

import prisma from "../prisma";
import { getSession, isAuthorized } from "./auth";
import { NoteTitleScheme } from "../zod-schemes/basic-schemes";
import { CreateNoteScheme } from "../zod-schemes/create-note.scheme";
import { revalidatePath } from "next/cache";

export const getNoteIds = async () => {
  const noteIds = await prisma.note.findMany({
    select: {
      id: true,
    },
  });

  return noteIds;
};

export const getAllNotes = async () => {
  const session = await isAuthorized();

  if (!session) return;
  const notes = await prisma.note.findMany({
    where: {
      userId: session.userId,
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
};

export const getNoteById = async (noteId: string) => {
  // console.log("getNoteById");

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

export const getAllNotesByLabelId = async (labelId: string) => {
  const session = await isAuthorized();

  if (!session) return null;

  const notes = await prisma.note.findMany({
    where: {
      labels: {
        some: {
          id: labelId,
        },
      },
      userId: session.userId,
    },
    include: {
      content: true,
      labels: true,
    },
  });

  return notes;
};

export const createNote = async (
  noteType: NoteType,
  isPinned: boolean,
  formData: FormData,
) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const safeData = CreateNoteScheme.safeParse({
    title,
    content,
    noteType,
  });

  console.log(safeData);

  if (safeData.success) {
    const session = await getSession();
    const contentLines = safeData.data.content.split("\n");

    if (!session) return;
    const newNote = await prisma.note.create({
      data: {
        title: safeData.data.title,
        type: safeData.data.noteType,
        isPinned: isPinned,
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

    revalidatePath(`/notes`);
    revalidatePath(`/notes/${newNote.id}`);
  }
};

export const deleteNote = async (noteId: string) => {
  await prisma.note.delete({
    where: {
      id: noteId,
    },
  });

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${noteId}`);
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
  revalidatePath(`/notes/${noteId}`);
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

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${noteId}`);
};

export const updateNoteTitle = async (noteId: string, formData: FormData) => {
  const title = formData.get("title") as string;

  const safeData = NoteTitleScheme.safeParse(title);
  if (safeData.success) {
    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title: title,
      },
    });

    revalidatePath(`/notes`);
    revalidatePath(`/notes/${noteId}`);
  }
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

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${noteId}`);
};

export const createCopy = async (noteId: string) => {
  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    include: {
      content: true,
      labels: true,
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
        labels: {
          connect: note.labels.map((label) => ({ id: label.id })),
        },
      },
    });
  }

  revalidatePath(`/notes`);
  revalidatePath(`/notes/${noteId}`);
};
