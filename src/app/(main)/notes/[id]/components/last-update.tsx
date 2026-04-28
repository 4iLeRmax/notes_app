import lastNoteUpdate from "@/lib/last-note-update";
import React from "react";

interface LastUpdateProps {
  note: Note;
}

export default function LastUpdate({ note }: LastUpdateProps) {
  return (
    <>
      <div className="text-sm text-txt-primary flex items-center gap-1">
        <span className="hidden sm:inline">Updated: </span>
        <span className="inline sm:hidden">Upd: </span>
        {lastNoteUpdate(note)}
      </div>
    </>
  );
}
