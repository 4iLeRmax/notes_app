"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "./auth";
import prisma from "../prisma";
import { cache } from "react";
import { connection } from "next/server";

export const getLabels = cache(async () => {
  // await connection();
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

    return labels;
  } catch {
    throw new Error(`Can't get labels for user ${session.session.userId}`);
  }
});

export const getLabelById = cache(async (labelId: string) => {
  console.log("getLabelById");
  const session = await getSession();
  if (!session) throw new Error("session error");

  try {
    const label = await prisma.label.findUnique({
      where: {
        id: labelId,
      },
    });

    return label;
  } catch (e) {
    throw new Error(`Can't get label ${labelId}`);
  }
});

export const createLabel = async (formData: FormData) => {
  console.log("createLabel");

  const session = await getSession();
  if (!session) return { error: "Session error" };

  const label = formData.get("label") as string;

  if (label.length === 0) return { error: "Label is empty" };
  if (label.length > 50) return { error: "Label is too long" };

  await prisma.label.create({
    data: {
      name: label,
      userId: session.session.userId,
    },
  });

  revalidatePath("/notes");
};

export const updateLabel = async (labelId: string, formData: FormData) => {
  console.log("updateLabel");
  const newLabelName = formData.get("label") as string;

  await prisma.label.update({
    where: {
      id: labelId,
    },
    data: {
      name: newLabelName,
    },
  });

  revalidatePath("/notes");
};

export const deleteLabel = async (labelId: string) => {
  console.log("deleteLabel");

  await prisma.label.delete({
    where: {
      id: labelId,
    },
  });

  revalidatePath("/notes");
};

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

  if (currentNote && currentNote._count.labels < 10) {
    if (labelIsAdded) {
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
    } else {
      await prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          labels: {
            connect: {
              id: labelId,
            },
          },
        },
      });
    }
  }

  revalidatePath("/notes");
  revalidatePath(`/notes/${noteId}`);
};

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
};
