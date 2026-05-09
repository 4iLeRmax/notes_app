import React from "react";
import NoteViewList from "./note-view-list/note-view-list";
import NoteCardLabels from "../note-card/note-card-labels";
import NoteViewTextarea from "./note-view-textarea";

interface NoteViewContentProps {
  note: Note;
}

export default function NoteViewContent({ note }: NoteViewContentProps) {
  return (
    <>
      <div className="text-txt-primary">
        {note.type === "TEXT" ? (
          <NoteViewTextarea list={note.content} noteId={note.id} />
        ) : (
          <NoteViewList list={note.content} noteId={note.id} />
        )}
      </div>
      <div className="mt-5">
        <NoteCardLabels note={note} />
      </div>
    </>
  );
}
