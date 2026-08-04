"use server";

import prisma from "../prisma";
import { getSession } from "./auth";
import {
  NoteColorScheme,
  NoteTitleScheme,
  NoteTypeScheme,
} from "../zod-schemes/basic-schemes";
import { cache } from "react";
import z from "zod";
import {
  CreateNoteScheme,
  TCreateNote,
} from "../zod-schemes/note-schemes/create-note.scheme";
import { NoteScheme } from "../zod-schemes/note-schemes/note-scheme";
import { NoteActionErrors, NoteItemActionErrors } from "./errors";
import {
  NoteItemScheme,
  TEXTNoteItemScheme,
} from "../zod-schemes/note-schemes/note-item-scheme";
import { NOTE_LIMITS } from "../constants";
import {
  decryptDek,
  decryptField,
  encryptField,
} from "../encryption/encryption";
import { decryptNote, encryptContent } from "../encryption/encryption-helpers";
import { getUserDek } from "../encryption/get-user-dek";

export const getNotes = cache(async () => {
  console.log("getNotes");
  const session = await getSession();
  if (!session) throw new Error(NoteActionErrors.UNAUTHORIZED);

  try {
    const encryptedDek = session.user.encryptedDek;
    const kekVersion = session.user.kekVersion;
    const dek = getUserDek({ encryptedDek, kekVersion });

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

    const decryptedNotes = notes.map((note) => decryptNote(note, dek));

    return decryptedNotes;
  } catch (err) {
    throw new Error(NoteActionErrors.FETCH_NOTES_FAILED);
  }
});

export const getNoteById = cache(async (noteId: string) => {
  console.log("getNoteById");
  const session = await getSession();
  if (!session) throw new Error(NoteActionErrors.UNAUTHORIZED);

  const safeNoteIdData = z.uuid().safeParse(noteId);
  if (!safeNoteIdData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_ID);
  const { data: safeNoteId } = safeNoteIdData;

  try {
    const encryptedDek = session.user.encryptedDek;
    const kekVersion = session.user.kekVersion;
    const dek = getUserDek({ encryptedDek, kekVersion });

    const note = await prisma.note.findUnique({
      where: {
        id: safeNoteId,
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
    });

    if (!note) throw new Error(NoteActionErrors.NOTE_NOT_FOUND);

    const decryptedNote = decryptNote(note, dek);

    return decryptedNote;
  } catch {
    throw new Error(NoteActionErrors.FETCH_NOTES_FAILED);
  }
});

export const getNotesByLabelId = cache(async (labelId: string) => {
  console.log("getNotesByLabelId");
  const session = await getSession();
  if (!session) throw new Error(NoteActionErrors.UNAUTHORIZED);

  const safeLabelIdData = z.uuid().safeParse(labelId);
  if (!safeLabelIdData.success)
    throw new Error(NoteActionErrors.INVALID_LABEL_ID);
  const { data: safeLabelId } = safeLabelIdData;

  try {
    const encryptedDek = session.user.encryptedDek;
    const kekVersion = session.user.kekVersion;
    const dek = getUserDek({ encryptedDek, kekVersion });

    const notes = await prisma.note.findMany({
      where: {
        labels: { some: { id: safeLabelId } },
        userId: session.session.userId,
      },
      include: { content: true, labels: true },
    });

    return notes.map((note) => decryptNote(note, dek));
  } catch {
    throw new Error(NoteActionErrors.FETCH_NOTES_FAILED);
  }
});

export const createNote = async (note: TCreateNote, noteId: string) => {
  console.log("createNote");
  const session = await getSession();
  if (!session) throw new Error(NoteActionErrors.UNAUTHORIZED);

  const safeData = CreateNoteScheme.safeParse(note);
  console.log(safeData.error);
  if (!safeData.success) throw new Error(NoteActionErrors.INVALID_NOTE_DATA);

  const safeNoteIdData = z.uuid().safeParse(noteId);
  if (!safeNoteIdData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_ID);
  const { data: safeNoteId } = safeNoteIdData;

  try {
    const encryptedDek = session.user.encryptedDek;
    const kekVersion = session.user.kekVersion;
    const dek = getUserDek({ encryptedDek, kekVersion });

    const { title, content, type, isPinned } = safeData.data;

    const cleanContent =
      type === "TODO" ? content.filter((item) => item.content !== "") : content;

    const encryptedContent = encryptContent(cleanContent, dek);

    const notesCount = await prisma.note.count({
      where: { userId: session.session.userId },
    });

    if (notesCount >= NOTE_LIMITS.MAX_NOTES) {
      throw new Error(NoteActionErrors.NOTE_LIMIT_EXCEEDED);
    }

    const note = await prisma.note.create({
      data: {
        id: safeNoteId,
        title: encryptField(title, dek),
        type,
        isPinned,
        userId: session.session.userId,
        content: {
          createMany: {
            data: encryptedContent.map((item, index) => ({
              ...item,
              position: index,
            })),
          },
        },
      },
      include: {
        content: true,
        labels: true,
      },
    });

    return decryptNote(note, dek);
  } catch (error) {
    throw new Error(NoteActionErrors.CREATE_NOTE_FAILED);
  }
  // revalidatePath("/notes");
};

export const deleteNotes = async (noteIds: string[]) => {
  console.log("deleteNotes");

  const session = await getSession();
  if (!session) throw new Error(NoteActionErrors.UNAUTHORIZED);

  const safeNoteIdsData = z.array(z.uuid()).safeParse(noteIds);
  if (!safeNoteIdsData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_ID);
  const { data: safeNoteIds } = safeNoteIdsData;

  try {
    await prisma.note.deleteMany({
      where: {
        id: {
          in: safeNoteIds,
        },
      },
    });
  } catch {
    throw new Error(NoteActionErrors.DELETE_NOTES_FAILED);
  }

  // revalidatePath("/notes");
  // safeNoteIds.forEach((noteId) => revalidatePath(`/notes/${noteId}`));
};

export const toggleManyNoteTypes = async (
  noteIds: string[],
  newType: NoteType,
) => {
  console.log("toggleManyNoteTypes");
  const session = await getSession();
  if (!session) throw new Error(NoteActionErrors.UNAUTHORIZED);

  const safeNoteIdsData = z.array(z.uuid()).safeParse(noteIds);
  if (!safeNoteIdsData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_ID);
  const { data: safeNoteIds } = safeNoteIdsData;

  const safeNoteTypeData = NoteTypeScheme.safeParse(newType);
  if (!safeNoteTypeData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_DATA);
  const { data: safeNewType } = safeNoteTypeData;

  if (safeNewType === "TODO") {
    try {
      const encryptedDek = session.user.encryptedDek;
      const kekVersion = session.user.kekVersion;
      const dek = getUserDek({ encryptedDek, kekVersion });

      const notes = await prisma.note.findMany({
        where: { id: { in: safeNoteIds }, userId: session.session.userId },
        select: {
          id: true,
          content: {
            select: { content: true },
          },
        },
      });

      const nonConvertible = notes.filter((note) => {
        const totalChars = note.content.reduce(
          (sum, item) => sum + decryptField(item.content, dek).length,
          0,
        );
        const anyItemTooLong = note.content.some(
          (item) =>
            decryptField(item.content, dek).length >
            NOTE_LIMITS.TODO.maxCharsPerItem,
        );

        return totalChars > NOTE_LIMITS.TODO.totalChars || anyItemTooLong;
      });
      if (nonConvertible.length > 0)
        throw new Error(NoteActionErrors.NOTES_EXCEED_TODO_LIMITS);
    } catch {
      throw new Error(NoteActionErrors.TOGGLE_MANY_TYPES_FAILED);
    }
  }

  try {
    await prisma.note.updateMany({
      where: {
        id: { in: safeNoteIds },
      },
      data: {
        type: safeNewType,
      },
    });
  } catch {
    throw new Error(NoteActionErrors.TOGGLE_MANY_TYPES_FAILED);
  }

  // revalidatePath("/notes");
};

export const togglePinStatus = async (
  noteId: string,
  newPinStatus: boolean,
) => {
  console.log("togglePinStatus");

  const session = await getSession();
  if (!session) throw new Error(NoteActionErrors.UNAUTHORIZED);

  const safeNoteIdData = z.uuid().safeParse(noteId);
  if (!safeNoteIdData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_ID);
  const { data: safeNoteId } = safeNoteIdData;

  const safeNewPinStatusData = z.boolean().safeParse(newPinStatus);
  if (!safeNewPinStatusData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_DATA);
  const { data: safeNewPinStatus } = safeNewPinStatusData;

  try {
    await prisma.note.update({
      where: {
        id: safeNoteId,
      },
      data: {
        isPinned: safeNewPinStatus,
      },
    });
  } catch {
    throw new Error(NoteActionErrors.TOGGLE_PIN_FAILED);
  }

  // revalidatePath("/notes");
};

export const updateNoteTitle = async (noteId: string, newTitle: string) => {
  console.log("updateNoteTitle");

  const session = await getSession();
  if (!session) throw new Error(NoteActionErrors.UNAUTHORIZED);

  const safeData = NoteTitleScheme.safeParse(newTitle);
  if (!safeData.success) throw new Error(NoteActionErrors.INVALID_TITLE);
  const { data: safeTitle } = safeData;

  const safeNoteIdData = z.uuid().safeParse(noteId);
  if (!safeNoteIdData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_ID);
  const { data: safeNoteId } = safeNoteIdData;

  try {
    const encryptedDek = session.user.encryptedDek;
    const kekVersion = session.user.kekVersion;
    const dek = getUserDek({ encryptedDek, kekVersion });

    await prisma.note.update({
      where: { id: safeNoteId },
      data: { title: encryptField(safeTitle, dek) },
    });
  } catch {
    throw new Error(NoteActionErrors.UPDATE_TITLE_FAILED);
  }

  // revalidatePath("/notes");
  // revalidatePath(`/notes/${safeNoteId}`);
};

export const updateNoteText = async (noteId: string, content: NoteItem[]) => {
  console.log("updateNoteText");

  const session = await getSession();
  if (!session) throw new Error(NoteActionErrors.UNAUTHORIZED);

  const safeNoteIdData = z.uuid().safeParse(noteId);
  if (!safeNoteIdData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_ID);
  const { data: safeNoteId } = safeNoteIdData;

  // max chars per item
  const safeData = z.array(TEXTNoteItemScheme).safeParse(content);
  if (!safeData.success) throw new Error(NoteActionErrors.INVALID_NOTE_DATA);
  const { data: safeContent } = safeData;

  // max items
  if (safeContent.length > NOTE_LIMITS.TEXT.maxItems)
    throw new Error(NoteItemActionErrors.NOTE_ITEM_LIMIT);

  const totalChars = safeContent.reduce(
    (acc, el) => acc + el.content.length,
    0,
  );

  // total chars max
  if (totalChars > NOTE_LIMITS.TEXT.totalChars)
    throw new Error(NoteActionErrors.NOTE_TOTAL_CHARS_LIMIT);

  try {
    const encryptedDek = session.user.encryptedDek;
    const kekVersion = session.user.kekVersion;
    const dek = getUserDek({ encryptedDek, kekVersion });

    await prisma.$transaction([
      prisma.noteItem.deleteMany({ where: { noteId: safeNoteId } }),
      prisma.noteItem.createMany({
        data: safeContent.map((item) => ({
          ...item,
          content: encryptField(item.content, dek),
        })),
      }),
    ]);
  } catch {
    throw new Error(NoteActionErrors.UPDATE_CONTENT_FAILED);
  }

  // revalidatePath("/notes");
  // revalidatePath(`/notes/${safeNoteId}`);
};

export const createCopies = async (copies: Note[]) => {
  console.log("createCopies");

  const session = await getSession();
  if (!session) throw new Error(NoteActionErrors.UNAUTHORIZED);

  const safeData = z.array(NoteScheme).safeParse(copies);
  if (!safeData.success) throw new Error(NoteActionErrors.INVALID_NOTE_DATA);
  const { data: safeCopies } = safeData;

  const notesCount = await prisma.note.count({
    where: { userId: session.session.userId },
  });

  if (notesCount + copies.length > NOTE_LIMITS.MAX_NOTES)
    throw new Error(NoteActionErrors.NOTE_LIMIT_EXCEEDED);

  try {
    const encryptedDek = session.user.encryptedDek;
    const kekVersion = session.user.kekVersion;
    const dek = getUserDek({ encryptedDek, kekVersion });

    await prisma.$transaction(
      safeCopies.map((note) =>
        prisma.note.create({
          data: {
            id: note.id,
            title: encryptField(note.title, dek),
            userId: session.session.userId,
            isPinned: note.isPinned,
            color: note.color,
            type: note.type,
            content: {
              createMany: {
                data: note.content.map((item) => ({
                  content: encryptField(item.content, dek),
                  isDone: item.isDone,
                  position: item.position,
                })),
              },
            },
            labels: {
              connect: note.labels.map((label) => ({ id: label.id })),
            },
          },
        }),
      ),
    );
  } catch (err) {
    throw new Error(NoteActionErrors.CREATE_COPIES_FAILED);
  }

  // revalidatePath("/notes");
};

export const updateColor = async (noteId: string, newColor: string | null) => {
  console.log("updateColor");
  const session = await getSession();
  if (!session) throw new Error(NoteActionErrors.UNAUTHORIZED);

  const { data: safeNoteId, success: validNoteId } = z.uuid().safeParse(noteId);
  if (!validNoteId) throw new Error(NoteActionErrors.INVALID_NOTE_ID);

  const { data: safeColor, success: validColor } =
    NoteColorScheme.safeParse(newColor);
  if (!validColor) throw new Error(NoteActionErrors.INVALID_NOTE_DATA);

  try {
    await prisma.note.update({
      where: {
        id: safeNoteId,
      },
      data: {
        color: safeColor,
      },
    });
  } catch {
    throw new Error(NoteActionErrors.UPDATE_NOTE_COLOR_FAILED);
  }
};
