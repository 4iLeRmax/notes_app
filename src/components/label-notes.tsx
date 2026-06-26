"use client";

import React from "react";
import NotesGroup from "./note/notes-group";
import { useNotesStore } from "@/lib/store/useNotesStore";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { NotesDisplaySkeleton } from "./UI/skeletons";
import { useClickOutsideDeselected } from "@/hooks/useClickOutsideDeselected";

interface LabelNotesProps {
  labelId: string;
}

export default function LabelNotes({ labelId }: LabelNotesProps) {
  const label = useNotesStore((s) => s.labels.find((l) => l.id === labelId));
  const isHydratedNote = useNotesStore((s) => s.isHydratedNote);
  const isHydratedLabel = useNotesStore((s) => s.isHydratedLabel);

  useClickOutsideDeselected();

  const notesByLabel = useNotesStore(
    useShallow((s) =>
      s.notes.filter((note) => note.labels.some((l) => l.id === labelId)),
    ),
  );

  if (!isHydratedNote && !isHydratedLabel) return <NotesDisplaySkeleton />;
  if (!label) return null;

  if (notesByLabel.length === 0)
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
      <div className="h-[41px]"></div>
      <NotesGroup
        label={`Notes with label "${label.name}" (${notesByLabel.length})`}
        notes={notesByLabel}
      />
    </>
  );
}
