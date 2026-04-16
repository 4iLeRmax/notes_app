import ViewModeLayout from "../notes-view-mode/wrappers/view-mode-layout";
import ViewModeNoteCard from "../notes-view-mode/wrappers/view-mode-note-card";
import NoteCard from "./note-card";

interface NoteGroupProps {
  label: string;
  notes: Note[];
}

export default function NoteGroup({ notes, label }: NoteGroupProps) {
  if (notes.length === 0) return null;

  return (
    <>
      <div className="flex flex-col xs:items-center gap-3 w-full">
        {label ? (
          <h1 className="text-txt-primary select-none">{label}</h1>
        ) : null}
        <ViewModeLayout>
          {notes.map((note) => (
            <ViewModeNoteCard key={note.id}>
              <div className="break-inside-avoid w-full">
                <NoteCard note={note} />
              </div>
            </ViewModeNoteCard>
          ))}
        </ViewModeLayout>
      </div>
    </>
  );
}
