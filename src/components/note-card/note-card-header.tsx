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
      <div className="flex items-start gap-1">
        <h1 className="xs:text-xl text-txt-secondary font-bold w-full break-all">
          {title}
        </h1>
        <PinButton noteId={noteId} isPinned={isPinned} />
      </div>
    </>
  );
}
