import React from "react";
import PinButton from "./pin-button";

interface NoteCardHeaderProps {
  noteId: string;
  isPinned: boolean;
  title: string;
}

export default function NoteCardHeader({
  noteId,
  title,
  isPinned,
}: NoteCardHeaderProps) {
  return (
    <>
      <div className="float-right">
        <PinButton noteId={noteId} isPinned={isPinned} />
      </div>
      <h1 className="text-xl text-txt-secondary font-bold break-words">
        {title}
      </h1>
    </>
  );
}
