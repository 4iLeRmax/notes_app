"use server";

import prisma from "../prisma";
import { getSession } from "./auth";
import { NoteTitleScheme } from "../zod-schemes/basic-schemes";
import { CreateNoteScheme } from "../zod-schemes/create-note.scheme";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getNoteIds = async () => {
  console.log("getNoteIds");
  const noteIds = await prisma.note.findMany({
    select: {
      id: true,
    },
  });

  return noteIds;
};

export const getAllNotes = cache(async () => {
  console.log("getAllNotes");
  const session = await getSession();
  if (!session) return;

  return await prisma.note.findMany({
    where: {
      userId: session.session.userId,
    },
    include: {
      content: true,
      labels: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});

export const getNoteById = cache(async (noteId: string) => {
  console.log("getNoteById");
  const session = await getSession();
  if (!session) return;

  return await prisma.note.findUnique({
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
});

export const getAllNotesByLabelId = cache(async (labelId: string) => {
  console.log("getAllNotesByLabelId");
  const session = await getSession();

  if (!session) return null;

  const notes = await prisma.note.findMany({
    where: {
      labels: {
        some: {
          id: labelId,
        },
      },
      userId: session.session.userId,
    },
    include: {
      content: true,
      labels: true,
    },
  });

  return notes;
});

export const createNote = async (
  noteType: NoteType,
  isPinned: boolean,
  formData: FormData,
) => {
  console.log("createNote");
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const safeData = CreateNoteScheme.safeParse({
    title,
    content,
    noteType,
  });

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

    revalidatePath("/notes");
  }
};

export const deleteNotes = async (noteIds: string[]) => {
  console.log("deleteNotes");

  const session = await getSession();

  if (!session) return;

  try {
    await prisma.note.deleteMany({
      where: {
        id: {
          in: noteIds,
        },
      },
    });
  } catch {
    throw new Error(`Deleting notes: ${noteIds}`);
  }

  revalidatePath("/notes");
  noteIds.forEach((noteId) => {
    revalidatePath(`/notes/${noteId}`);
  });
};

export const toggleNoteType = async (noteId: string) => {
  console.log("toggleNoteType");

  const currentNote = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    select: {
      type: true,
      userId: true,
    },
  });

  if (!currentNote) return;
  const oldNoteType = currentNote.type;

  await prisma.note.update({
    where: { id: noteId },
    data: {
      type: oldNoteType === "TEXT" ? "TODO" : "TEXT",
    },
  });

  revalidatePath("/notes");
  revalidatePath(`/notes/${noteId}`);
};

export const toggleManyNoteTypes = async (noteIds: string[]) => {
  console.log("toggleManyNoteTypes");

  const currentNotes = await prisma.note.findMany({
    where: {
      id: { in: noteIds },
    },
    select: {
      type: true,
    },
  });

  console.log(currentNotes);

  if (!currentNotes.some((el) => el !== undefined)) return;
  const oldNoteType = currentNotes[0].type;

  await prisma.note.updateMany({
    where: {
      id: { in: noteIds },
    },
    data: {
      type: oldNoteType === "TEXT" ? "TODO" : "TEXT",
    },
  });

  revalidatePath("/notes");
};

export const togglePinnedStatus = async (noteId: string) => {
  console.log("togglePinnedStatus");

  const session = await getSession();
  if (!session) return;

  const currentNote = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    select: {
      isPinned: true,
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

  revalidatePath("/notes");
};

export const updateNoteTitle = async (noteId: string, formData: FormData) => {
  console.log("updateNoteTitle");

  const title = formData.get("title") as string;
  const session = await getSession();
  if (!session) return;

  const safeData = NoteTitleScheme.safeParse(title);
  if (!safeData.success) return;

  await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      title: title,
    },
  });

  revalidatePath("/notes");
  revalidatePath(`/notes/${noteId}`);
};

export const updateNoteText = async (noteId: string, formData: FormData) => {
  console.log("updateNoteText");

  const content = formData.get("text") as string;
  const contentLines = content.split("\n");

  const session = await getSession();
  if (!session) return;

  await prisma.$transaction([
    prisma.noteItem.deleteMany({
      where: {
        noteId,
      },
    }),
    prisma.noteItem.createMany({
      data: [
        ...contentLines.map((line) => ({
          content: line,
          isDone: false,
          noteId,
        })),
      ],
    }),
  ]);

  revalidatePath("/notes");
  revalidatePath(`/notes/${noteId}`);
};

export const createCopies = async (noteIds: string[]) => {
  console.log("createCopies");
  const notes = await Promise.all(noteIds.map((noteId) => getNoteById(noteId)));

  const validNotes = notes.filter(
    (note) => note !== undefined && note !== null,
  );
  if (validNotes.length < 1) return;

  await Promise.all(
    validNotes.map(async (note) => {
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
    }),
  );

  revalidatePath("/notes");
};
