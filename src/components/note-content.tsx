import React from "react";
import NoteCardLabels from "./note-card/note-card-labels";
import List from "@/app/(main)/notes/[id]/components/list";
import TextArea from "@/app/(main)/notes/[id]/components/textarea";

interface NoteContentProps {
  note: Note;
}

export default function NoteContent({ note }: NoteContentProps) {
  return (
    <>
      <div className="text-txt-primary">
        {note.type === "TEXT" ? (
          <TextArea list={note.content} noteId={note.id} />
        ) : (
          <List list={note.content} noteId={note.id} />
        )}
      </div>
      <div className="mt-5">
        <NoteCardLabels note={note} />
      </div>
    </>
  );
}
