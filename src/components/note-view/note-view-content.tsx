"use client";

import React from "react";
import NoteViewList from "./note-view-list/note-view-list";
import NoteCardLabels from "../note-card/note-card-labels";
import NoteViewTextarea from "./note-view-textarea";

interface NoteViewContentProps {
  note: Note;
}

export default function NoteViewContent({ note }: NoteViewContentProps) {
  const noteWithSortedContent = {
    ...note,
    content: [...note.content].sort((a, b) => a.position - b.position),
  };

  return (
    <>
      <div className="text-txt-primary">
        {note.type === "TEXT" ? (
          <NoteViewTextarea
            list={noteWithSortedContent.content}
            noteId={note.id}
          />
        ) : (
          <NoteViewList list={noteWithSortedContent.content} noteId={note.id} />
        )}
      </div>
      <div className="mt-5">
        <NoteCardLabels
          noteId={note.id}
          noteLabels={note.labels}
          maxLength={10}
        />
      </div>
    </>
  );
}
