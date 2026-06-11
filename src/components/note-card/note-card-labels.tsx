"use client";

import NoteCardLabelItem from "./note-card-label-item";

interface NoteCardLabelsProps {
  noteId: string;
  noteLabels: Label[];
  maxLength?: number;
}

export default function NoteCardLabels({
  noteId,
  noteLabels,
  maxLength,
}: NoteCardLabelsProps) {
  if (noteLabels.length === 0) return null;

  if (!maxLength) maxLength = noteLabels.length;

  return (
    <>
      <div className="flex flex-wrap items-center gap-1">
        {(noteLabels.length > maxLength
          ? noteLabels.slice(0, maxLength)
          : noteLabels
        ).map((label) => (
          <NoteCardLabelItem noteId={noteId} label={label} key={label.id} />
        ))}
        {noteLabels.length > maxLength ? (
          <span>+{noteLabels.length - maxLength}</span>
        ) : null}
      </div>
    </>
  );
}
