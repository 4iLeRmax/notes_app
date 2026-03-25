import React from "react";
import NoteCardList from "./note-card-list";
import NoteCardText from "./note-card-text";

const LIST_LENGTH = 5;
const TEXT_LINES = 10;

interface NoteCardMainProps {
  noteType: NoteType;
  noteContent: NoteItem[];
}

export default function NoteCardMain({
  noteType,
  noteContent,
}: NoteCardMainProps) {
  return (
    <>
      {noteType === "TODO" ? (
        <NoteCardList noteContent={noteContent} listLength={LIST_LENGTH} />
      ) : (
        <NoteCardText noteContent={noteContent} textLines={TEXT_LINES} />
      )}
      {noteContent.length > (noteType === "TODO" ? LIST_LENGTH : TEXT_LINES) ? (
        <span>...</span>
      ) : null}
    </>
  );
}
