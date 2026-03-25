import NoteGroup from "@/components/note-card/note-group";
import { getLabelById } from "@/lib/actions/label";
import { getAllNotesByLabelId } from "@/lib/actions/note";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

interface LabelPageProps {
  params: Promise<{ id: string }>;
}

export default async function LabelPage({ params }: LabelPageProps) {
  const { id } = await params;

  const label = await getLabelById(id);
  const notes = await getAllNotesByLabelId(id);

  if (!notes || !label) redirect("/");
  if (notes.length === 0)
    return (
      <div className="w-full h-screen flex items-center justify-center text-txt-primary text-2xl -mt-5">
        There are no notes with this label
      </div>
    );

  return (
    <>
      <div>
        <NoteGroup
          notes={notes}
          label={`Notes with "${label?.name}" label (${notes.length})`}
        />
      </div>
    </>
  );
}
