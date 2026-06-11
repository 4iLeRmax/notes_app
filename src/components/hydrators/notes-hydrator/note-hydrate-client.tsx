"use client";

import { useNotesStore } from "@/lib/store/useNotesStore";
import { useEffect } from "react";

export default function NotesHydratorClient({ notes }: { notes: Note[] }) {
  const setNotes = useNotesStore((s) => s.setNotes);

  useEffect(() => {
    setNotes(notes);
  }, [notes, setNotes]);

  return null;
}
