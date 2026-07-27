"use server";

import { getSession } from "./auth";
import prisma from "../prisma";
import { cache } from "react";
import { decryptLabels } from "../encryption/encryption-helpers";
import { LabelActionErrors, NoteActionErrors } from "./errors";
import { LabelScheme } from "../zod-schemes/note-schemes/label-scheme";
import z from "zod";
import { LabelNameScheme } from "../zod-schemes/basic-schemes";
import { LABEL_LIMITS } from "../constants";
import {
  decryptDek,
  decryptField,
  encryptField,
} from "../encryption/encryption";

export const getLabels = cache(async () => {
  console.log("getLabels");
  const session = await getSession();
  if (!session) throw new Error(LabelActionErrors.UNAUTHORIZED);

  try {
    const encryptedDek = session.user.encryptedDek;
    const kekVersion = session.user.kekVersion;
    const dek = decryptDek(encryptedDek, kekVersion);

    const labels = await prisma.label.findMany({
      where: {
        userId: session.session.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const decryptedLabels = decryptLabels(labels, dek);
    return decryptedLabels;
  } catch {
    throw new Error(LabelActionErrors.FETCH_LABELS_FAILED);
  }
}); //+

export const getLabelById = cache(async (labelId: string) => {
  console.log("getLabelById");
  const session = await getSession();
  if (!session) throw new Error(LabelActionErrors.UNAUTHORIZED);

  const safeLabelIdData = z.uuid().safeParse(labelId);
  if (!safeLabelIdData.success)
    throw new Error(LabelActionErrors.INVALID_LABEL_ID);
  const { data: safeLabelId } = safeLabelIdData;

  try {
    const encryptedDek = session.user.encryptedDek;
    const kekVersion = session.user.kekVersion;
    const dek = decryptDek(encryptedDek, kekVersion);

    const label = await prisma.label.findUnique({
      where: {
        id: safeLabelId,
        userId: session.user.id,
      },
    });
    if (!label) throw new Error(LabelActionErrors.LABEL_NOT_FOUND);

    const decryptedLabel = decryptLabels([label], dek)[0];
    return decryptedLabel;
  } catch (e) {
    throw new Error(LabelActionErrors.FETCH_SINGLE_LABEL_FAILED);
  }
}); //+

export const createLabel = async (label: Label) => {
  console.log("createLabel");

  const session = await getSession();
  if (!session) throw new Error(LabelActionErrors.UNAUTHORIZED);

  const encryptedDek = session.user.encryptedDek;
  const kekVersion = session.user.kekVersion;
  const dek = decryptDek(encryptedDek, kekVersion);

  const { data: safeLabel, success: validLabel } = LabelScheme.safeParse(label);
  if (!validLabel) throw new Error(LabelActionErrors.INVALID_LABEL_DATA);

  const labels = await prisma.label.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      name: true,
    },
  });

  const isDuplicate = labels.some(
    (item) =>
      decryptField(item.name, dek).toLowerCase() ===
      safeLabel.name.toLowerCase(),
  );

  if (isDuplicate) throw new Error(LabelActionErrors.LABEL_DUPLICATE);

  try {
    await prisma.label.create({
      data: {
        id: safeLabel.id,
        name: encryptField(safeLabel.name, dek),
        userId: session.session.userId,
      },
    });

    // revalidatePath("/notes");
  } catch (error) {
    throw new Error(LabelActionErrors.CREATE_LABEL_FAILED);
  }
}; //+

export const updateLabel = async (labelId: string, newLabelName: string) => {
  console.log("updateLabel");

  const session = await getSession();
  if (!session) throw new Error(LabelActionErrors.UNAUTHORIZED);

  const safeLabelIdData = z.uuid().safeParse(labelId);
  if (!safeLabelIdData.success)
    throw new Error(LabelActionErrors.INVALID_LABEL_ID);
  const { data: safeLabelId } = safeLabelIdData;

  const safeData = LabelNameScheme.safeParse(newLabelName);
  if (!safeData.success) throw new Error(LabelActionErrors.INVALID_LABEL_DATA);
  const { data: safeLabelName } = safeData;

  try {
    const encryptedDek = session.user.encryptedDek;
    const kekVersion = session.user.kekVersion;
    const dek = decryptDek(encryptedDek, kekVersion);

    await prisma.label.update({
      where: {
        id: safeLabelId,
        userId: session.user.id,
      },
      data: {
        name: encryptField(safeLabelName, dek),
      },
    });

    // revalidatePath("/notes");
  } catch {
    throw new Error(LabelActionErrors.UPDATE_LABEL_FAILED);
  }
}; //+

export const deleteLabel = async (labelId: string) => {
  console.log("deleteLabel");

  const session = await getSession();
  if (!session) throw new Error(LabelActionErrors.UNAUTHORIZED);

  const safeLabelIdData = z.uuid().safeParse(labelId);
  if (!safeLabelIdData.success)
    throw new Error(LabelActionErrors.INVALID_LABEL_ID);
  const { data: safeLabelId } = safeLabelIdData;

  try {
    await prisma.label.delete({
      where: {
        id: safeLabelId,
        userId: session.user.id,
      },
    });

    // revalidatePath("/notes");
  } catch {
    throw new Error(LabelActionErrors.DELETE_LABEL_FAILED);
  }
}; //+

export const toggleLabelToNote = async (
  noteId: string,
  labelId: string,
  labelIsAdded: boolean,
) => {
  console.log("toggleLabelToNote");
  const session = await getSession();
  if (!session) throw new Error(LabelActionErrors.UNAUTHORIZED);

  const safeNoteIdData = z.uuid().safeParse(noteId);
  if (!safeNoteIdData.success)
    throw new Error(NoteActionErrors.INVALID_NOTE_ID);
  const { data: safeNoteId } = safeNoteIdData;

  const safeLabelIdData = z.uuid().safeParse(labelId);
  if (!safeLabelIdData.success)
    throw new Error(LabelActionErrors.INVALID_LABEL_ID);
  const { data: safeLabelId } = safeLabelIdData;

  const safeStatusData = z.boolean().safeParse(labelIsAdded);
  if (!safeStatusData.success)
    throw new Error(LabelActionErrors.INVALID_LABEL_DATA);
  const { data: safeLabelIsAdded } = safeStatusData;

  try {
    const currentNote = await prisma.note.findUnique({
      where: {
        id: safeNoteId,
      },
      select: {
        _count: {
          select: { labels: true },
        },
      },
    });

    if (!currentNote) throw new Error(LabelActionErrors.NOTE_NOT_FOUND);
    if (currentNote._count.labels >= LABEL_LIMITS.MAX_LABELS_PER_NOTE)
      throw new Error(LabelActionErrors.NOTE_LABELS_LIMIT_REACHED);
    await prisma.note.update({
      where: {
        id: safeNoteId,
        userId: session.user.id,
      },
      data: {
        labels: safeLabelIsAdded
          ? {
              disconnect: {
                id: safeLabelId,
              },
            }
          : {
              connect: {
                id: safeLabelId,
              },
            },
      },
    });

    // revalidatePath("/notes");
    // revalidatePath(`/notes/${safeNoteId}`);
  } catch {
    throw new Error(LabelActionErrors.TOGGLE_LABEL_TO_NOTE_FAILED);
  }
}; //+

// export const removeLabelFromNoteAction = async (
//   noteId: string,
//   labelId: string,
// ) => {
//   console.log("removeLabelFromNote");
//   const session = await getSession();
//   if (!session) throw new Error(LabelActionErrors.UNAUTHORIZED);

//   const safeNoteIdData = z.uuid().safeParse(noteId);
//   if (!safeNoteIdData.success)
//     throw new Error(NoteActionErrors.INVALID_NOTE_ID);
//   const { data: safeNoteId } = safeNoteIdData;

//   const safeLabelIdData = z.uuid().safeParse(labelId);
//   if (!safeLabelIdData.success)
//     throw new Error(LabelActionErrors.INVALID_LABEL_ID);
//   const { data: safeLabelId } = safeLabelIdData;

//   try {
//     await prisma.note.update({
//       where: {
//         id: safeNoteId,
//       },
//       data: {
//         labels: {
//           disconnect: {
//             id: safeLabelId,
//           },
//         },
//       },
//     });

//     // revalidatePath("/notes");
//     // revalidatePath(`/notes/${safeNoteId}`);
//   } catch {
//     throw new Error(LabelActionErrors.REMOVE_LABEL_FROM_NOTE_FAILED);
//   }
// }; //+
