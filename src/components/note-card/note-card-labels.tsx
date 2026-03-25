import NoteCardLabelItem from "./note-card-label-item";

interface NoteCardLabelsProps {
  note: Note;
  maxLength?: number;
}

export default function NoteCardLabels({
  note,
  maxLength,
}: NoteCardLabelsProps) {
  if (note.labels.length === 0) return null;

  if (!maxLength) maxLength = note.labels.length;

  return (
    <>
      <div className="flex flex-wrap items-center gap-1">
        {(note.labels.length > maxLength
          ? note.labels.slice(0, maxLength)
          : note.labels
        ).map((label) => (
          <NoteCardLabelItem noteId={note.id} label={label} key={label.id} />
        ))}
        {note.labels.length > maxLength ? (
          <span>+{note.labels.length - maxLength}</span>
        ) : null}
      </div>
    </>
  );
}
