"use client";

import Note from "./note";
import ViewModeLayout from "../notes-view-mode/wrappers/view-mode-layout";
import ViewModeNoteCard from "../notes-view-mode/wrappers/view-mode-note-card";

interface NotesGroupProps {
  label: string;
  notes: Note[];
}

export default function NotesGroup({ notes, label }: NotesGroupProps) {
  if (notes.length === 0) return null;

  return (
    <>
      <div className="flex flex-col lg:items-center gap-3 w-full">
        {label ? (
          <h1 className="text-txt-primary select-none text-center">{label}</h1>
        ) : null}
        <ViewModeLayout>
          {notes.map((note) => (
            <ViewModeNoteCard key={note.id}>
              <div className="break-inside-avoid w-full">
                <Note note={note} />
              </div>
            </ViewModeNoteCard>
          ))}
        </ViewModeLayout>
      </div>
    </>
  );
}
