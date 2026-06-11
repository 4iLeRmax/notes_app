"use client";

import React from "react";
import NoteCardList from "./note-card-list";
import NoteCardText from "./note-card-text";

interface NoteCardMainProps {
  noteType: NoteType;
  noteContent: NoteItem[];
}

export default function NoteCardMain({
  noteType,
  noteContent,
}: NoteCardMainProps) {
  noteContent.sort((a, b) => a.position - b.position);

  const sortedNoteContent = [...noteContent].sort(
    (a, b) => a.position - b.position,
  );

  return (
    <>
      {noteType === "TODO" ? (
        <NoteCardList noteContent={sortedNoteContent} />
      ) : (
        <NoteCardText noteContent={sortedNoteContent} />
      )}
    </>
  );
}
