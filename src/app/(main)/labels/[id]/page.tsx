import NoteGroup from "@/components/note-card/note-group";
import { getLabelById } from "@/lib/actions/label";
import { getAllNotesByLabelId } from "@/lib/actions/note";
import prisma from "@/lib/prisma";
import Link from "next/link";
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
      <div className="w-full h-screen flex items-center justify-center -mt-5">
        <div className="text-txt-primary flex flex-col items-center">
          <h1 className="text-2xl">There are no notes with this label</h1>
          <Link href="/notes" className="ml-4 text-custom-blue underline">
            View all notes
          </Link>
        </div>
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
