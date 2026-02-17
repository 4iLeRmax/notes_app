import NoteCard from "./note-card";
import ViewModeLayout from "./notes-view-mode/wrappers/view-mode-layout";
import ViewModeNoteCard from "./notes-view-mode/wrappers/view-mode-note-card";

interface NoteGroupProps {
  label: string;
  notes: Note[];
}

export default function NoteGroup({ notes, label }: NoteGroupProps) {
  if (notes.length === 0) return null;

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        {label ? <h1 className="text-gray-400">{label}</h1> : null}
        <ViewModeLayout>
          {notes.map((note) => (
            <ViewModeNoteCard key={note.id}>
              <div className="break-inside-avoid">
                <NoteCard note={note} />
              </div>
            </ViewModeNoteCard>
          ))}
        </ViewModeLayout>
      </div>
    </>
  );
}
