import { createCopies, deleteNotes, toggleNoteType } from "@/lib/actions/note";
import { deleteAllMarkedItems, removeAllMarks } from "@/lib/actions/note-item";
import { ChevronRight } from "lucide-react";
import React from "react";
import NoteOptionsListItem from "./note-options-list-item";

interface NoteOptionsListProps {
  noteId: string;
  startTransition: React.TransitionStartFunction;
  toggleShowLabel: () => void;
}

export default function NoteOptionsList({
  noteId,
  startTransition,
  toggleShowLabel,
}: NoteOptionsListProps) {
  return (
    <>
      <div className="flex flex-col items-start">
        <NoteOptionsListItem
          onClick={() => startTransition(() => toggleNoteType(noteId))}
        >
          TODO/TEXT
        </NoteOptionsListItem>
        <NoteOptionsListItem onClick={toggleShowLabel}>
          <div className="w-full flex items-center justify-between">
            <span>Add Label</span>
            <ChevronRight size={20} />
          </div>
        </NoteOptionsListItem>
        <NoteOptionsListItem
          onClick={() => startTransition(() => createCopies([noteId]))}
        >
          Create copy
        </NoteOptionsListItem>

        <NoteOptionsListItem
          onClick={() => startTransition(() => removeAllMarks(noteId))}
        >
          Remove all marks
        </NoteOptionsListItem>
        <NoteOptionsListItem
          onClick={() => startTransition(() => deleteAllMarkedItems(noteId))}
        >
          Delete marked items
        </NoteOptionsListItem>
        <NoteOptionsListItem
          onClick={() => startTransition(() => deleteNotes([noteId]))}
        >
          Delete
        </NoteOptionsListItem>
      </div>
    </>
  );
}
