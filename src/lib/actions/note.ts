"use server";

import prisma from "../prisma";
import { getSession } from "./auth";
import { NoteTitleScheme } from "../zod-schemes/basic-schemes";
import {
  CreateNoteScheme,
  TCreateNote,
} from "../zod-schemes/create-note.scheme";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import encrypt from "../encryption/encrypt";
import {
  decryptNote,
  encryptContent,
  encryptCreateContent,
} from "../encryption/encryption-helpers";
import decrypt from "../encryption/decrypt";

export const getAllNotes = cache(async () => {
  console.log("getAllNotes");
  const session = await getSession();
  if (!session) return;

  const notes = await prisma.note.findMany({
    where: {
      userId: session.session.userId,
    },
    include: {
      content: {
        orderBy: {
          position: "asc",
        },
      },
      labels: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const decryptedNotes = notes.map((note) => decryptNote(note));

  return decryptedNotes;
}); //+

export const getNoteById = cache(async (noteId: string) => {
  console.log("getNoteById");
  const session = await getSession();
  if (!session) return;

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    include: {
      content: {
        orderBy: {
          position: "asc",
        },
      },
      labels: true,
    },
  });

  if (!note) return;

  const decryptedNote = decryptNote(note);

  return decryptedNote;
}); //+

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

  const decryptedNotes = notes.map((note) => decryptNote(note));

  return decryptedNotes;
}); //+

export const createNote = async (note: TCreateNote) => {
  console.log("createNote");

  const safeData = CreateNoteScheme.safeParse({
    ...note,
  });

  if (!safeData.success) return;
  const session = await getSession();

  if (!session) return;
  try {
    const { title, content, type, isPinned } = safeData.data;

    let cleanContent = content;
    if (type === "TODO") {
      cleanContent = content.filter((item) => item.content !== "");
    }

    const encryptedTitle = encrypt(title);
    const encryptedContent = encryptCreateContent(cleanContent);

    await prisma.note.create({
      data: {
        title: encryptedTitle,
        type,
        isPinned,
        userId: session.user.id,
        content: {
          createMany: {
            data: encryptedContent.map((item, index) => ({
              ...item,
              position: index,
            })),
          },
        },
      },
    });
  } catch (error) {
    console.error("Error creating note:", error);
  }

  revalidatePath("/notes");
}; //+

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
}; //+

export const toggleNoteType = async (noteId: string) => {
  console.log("toggleNoteType");
  const session = await getSession();
  if (!session) return;

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
}; //+

export const toggleManyNoteTypes = async (noteIds: string[]) => {
  console.log("toggleManyNoteTypes");
  const session = await getSession();
  if (!session) return;

  const currentNotes = await prisma.note.findMany({
    where: {
      id: { in: noteIds },
    },
    select: {
      type: true,
    },
  });

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
}; //+

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
}; //+

export const updateNoteTitle = async (noteId: string, title: string) => {
  console.log("updateNoteTitle");

  const session = await getSession();
  if (!session) return;

  const safeData = NoteTitleScheme.safeParse(title);
  if (!safeData.success) return;

  await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      title: encrypt(title),
    },
  });

  revalidatePath("/notes");
  revalidatePath(`/notes/${noteId}`);
}; //+

export const updateNoteText = async (noteId: string, textContent: string) => {
  console.log("updateNoteText");

  const session = await getSession();
  if (!session) return;

  const contentLines = textContent.split("\n");

  await prisma.$transaction([
    prisma.noteItem.deleteMany({
      where: {
        noteId,
      },
    }),
    prisma.noteItem.createMany({
      data: [
        ...contentLines.map((line, index) => ({
          content: encrypt(line),
          isDone: false,
          noteId,
          position: index,
        })),
      ],
    }),
  ]);

  revalidatePath("/notes");
  revalidatePath(`/notes/${noteId}`);
}; //+

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
          title: encrypt(note.title + " (copy)"),
          userId: note.userId,
          isPinned: note.isPinned,
          type: note.type,
          content: {
            createMany: {
              data: note.content.map((item) => ({
                content: encrypt(item.content),
                isDone: item.isDone,
                position: item.position,
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
}; //+
