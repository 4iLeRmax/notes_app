import lastNoteUpdate from "@/lib/last-note-update";
import React from "react";

interface LastNoteUpdateProps {
  note: Note;
}

export default function LastNoteUpdate({ note }: LastNoteUpdateProps) {
  return (
    <>
      <div className="text-sm text-txt-primary flex items-center gap-1 select-none">
        <span className="">Upd: </span>
        {lastNoteUpdate(note)}
      </div>
    </>
  );
}
