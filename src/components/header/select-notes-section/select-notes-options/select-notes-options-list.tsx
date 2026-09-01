"use client";

import { vibrate } from "@/lib/haptics";
import { useNotesStore } from "@/lib/store/useNotesStore";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import { Copy, FileText, ListTodo, Trash } from "lucide-react";
import React from "react";

interface NoteOptionsListProps {
  noteIds: string[];
}

function SelectNotesOptionsList({ noteIds }: NoteOptionsListProps) {
  const currentNote = useNotesStore((s) =>
    s.notes.find((n) => n.id === noteIds[0]),
  );

  const toggleNoteTypes = useNotesStore((s) => s.toggleNoteTypes);
  const addCopies = useNotesStore((s) => s.addCopies);
  const removeNotes = useNotesStore((s) => s.removeNotes);

  const removeAll = useSelectedNotesStore((s) => s.removeAll);

  if (!currentNote) return null;
  const noteType = currentNote.type;
  return (
    <>
      <div
        className="flex flex-col py-4 xs:py-0"
        data-testid="select-notes-options-list"
      >
        <form action={(e) => toggleNoteTypes(noteIds)}>
          <button
            onClick={(e: any) => e.stopPropagation()}
            className="rounded-ss-xl rounded-se-xl w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex items-center gap-2 justify-start"
          >
            {noteType === "TEXT" ? (
              <ListTodo size={20} className="flex xs:hidden" />
            ) : (
              <FileText size={20} className="flex xs:hidden" />
            )}
            {noteType === "TEXT" ? "List" : "Text"}
          </button>
        </form>
        <form action={() => addCopies(noteIds)}>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex items-center gap-2 justify-start"
          >
            <Copy size={20} className="flex xs:hidden" />
            Create copy
          </button>
        </form>
        <form
          action={async () => {
            vibrate([20, 30, 20]);
            await removeNotes(noteIds);
            removeAll();
          }}
        >
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-es-xl rounded-ee-xl w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex items-center gap-2 justify-start"
          >
            <Trash size={20} className="flex xs:hidden" />
            Delete
          </button>
        </form>
      </div>
    </>
  );
}

export default React.memo(SelectNotesOptionsList);
