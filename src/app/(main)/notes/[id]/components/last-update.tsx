import lastNoteUpdate from "@/lib/last-note-update";
import React from "react";

interface LastUpdateProps {
  note: Note;
}

export default function LastUpdate({ note }: LastUpdateProps) {
  return (
    <>
      <span className="text-sm text-txt-primary">
        Last update: {lastNoteUpdate(note)}
      </span>
    </>
  );
}
