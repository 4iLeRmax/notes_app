"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "./auth";
import prisma from "../prisma";
import { cache } from "react";

export const getLabels = cache(async () => {
  const session = await getSession();

  if (!session?.user) return;

  const labels = await prisma.label.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return labels;
});

export const createLabel = async (
  prevState: { success?: boolean; error?: string } | null,
  formData: FormData,
) => {
  const session = await getSession();

  const label = formData.get("label") as string;
  if (!session) return { error: "Session error" };
  if (label.length === 0) return { error: "Label is empty" };

  await prisma.label.create({
    data: {
      name: label,
      userId: session.user.id,
    },
  });
  revalidatePath("/notes");

  return {
    success: true,
  };
};

export const updateLabel = async (labelId: string, formData: FormData) => {
  const newLabelName = formData.get("label") as string;

  await prisma.label.update({
    where: {
      id: labelId,
    },
    data: {
      name: newLabelName,
    },
  });

  revalidatePath("/");
};

export const deleteLabel = async (labelId: string) => {
  await prisma.label.delete({
    where: {
      id: labelId,
    },
  });

  revalidatePath("/");
};

export const addLabelToNote = async (noteId: string, labelId: string) => {
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
};
