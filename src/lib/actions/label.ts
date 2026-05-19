"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "./auth";
import prisma from "../prisma";
import { cache } from "react";
import encrypt from "../encryption/encrypt";
import decrypt from "../encryption/decrypt";
import { decryptLabels } from "../encryption/encryption-helpers";

export const getLabels = cache(async () => {
  console.log("getLabels");
  const session = await getSession();
  if (!session) throw new Error("session error");

  try {
    const labels = await prisma.label.findMany({
      where: {
        userId: session.session.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const decryptedLabels = decryptLabels(labels);
    return decryptedLabels;
  } catch {
    throw new Error(`Can't get labels for user ${session.session.userId}`);
  }
}); //+

export const getLabelById = cache(async (labelId: string) => {
  console.log("getLabelById");
  const session = await getSession();
  if (!session) throw new Error("session error");

  try {
    const label = await prisma.label.findUnique({
      where: {
        id: labelId,
        userId: session.user.id,
      },
    });
    if (!label) return;

    const decryptedLabel = decryptLabels([label])[0];
    return decryptedLabel;
  } catch (e) {
    throw new Error(`Can't get label ${labelId}`);
  }
}); //+

export const createLabel = async (formData: FormData) => {
  console.log("createLabel");

  const session = await getSession();
  if (!session) return { error: "Session error" };

  const labelName = formData.get("label") as string;

  if (labelName.length === 0) return { error: "Label is empty" };
  if (labelName.length > 50) return { error: "Label is too long" };

  const labels = await prisma.label.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      name: true,
    },
  });

  const isDuplicate = labels.some(
    (item) => decrypt(item.name).toLowerCase() === labelName.toLowerCase(),
  );

  if (isDuplicate) return;

  try {
    await prisma.label.create({
      data: {
        name: encrypt(labelName),
        userId: session.session.userId,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/notes");
}; //+

export const updateLabel = async (labelId: string, newLabelName: string) => {
  console.log("updateLabel");

  const session = await getSession();
  if (!session) return;

  await prisma.label.update({
    where: {
      id: labelId,
      userId: session.user.id,
    },
    data: {
      name: encrypt(newLabelName),
    },
  });

  revalidatePath("/notes");
}; //+

export const deleteLabel = async (labelId: string) => {
  console.log("deleteLabel");

  const session = await getSession();
  if (!session) return;

  await prisma.label.delete({
    where: {
      id: labelId,
      userId: session.user.id,
    },
  });

  revalidatePath("/notes");
}; //+

export const toggleLabelToNote = async (
  noteId: string,
  labelId: string,
  labelIsAdded: boolean,
) => {
  console.log("toggleLabelToNote");

  const currentNote = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    select: {
      _count: {
        select: { labels: true },
      },
    },
  });

  if (!currentNote || currentNote._count.labels > 10) return;
  await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      labels: labelIsAdded
        ? {
            disconnect: {
              id: labelId,
            },
          }
        : {
            connect: {
              id: labelId,
            },
          },
    },
  });

  revalidatePath("/notes");
  revalidatePath(`/notes/${noteId}`);
}; //+

export const removeLabelFromNote = async (noteId: string, labelId: string) => {
  console.log("removeLabelFromNote");

  await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      labels: {
        disconnect: {
          id: labelId,
        },
      },
    },
  });

  revalidatePath("/notes");
  revalidatePath(`/notes/${noteId}`);
}; //+
