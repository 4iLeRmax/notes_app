"use client";

import {} from "@/lib/actions/note";
import { vibrate } from "@/lib/haptics";
import { useNotesStore } from "@/lib/store/useNotesStore";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import React from "react";

interface NoteOptionsListProps {
  noteIds: string[];
}

function SelectNotesOptionsList({ noteIds }: NoteOptionsListProps) {
  const toggleNoteTypes = useNotesStore((s) => s.toggleNoteTypes);
  const addCopies = useNotesStore((s) => s.addCopies);
  const removeNotes = useNotesStore((s) => s.removeNotes);

  const removeAll = useSelectedNotesStore((s) => s.removeAll);

  return (
    <>
      <div className="flex flex-col">
        {/* <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleNoteTypes(noteIds);
          }}
          className="rounded-ss-xl rounded-se-xl w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start"
        >
          TODO/TEXT
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addCopies(noteIds);
          }}
          className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start"
        >
          Create copy
        </button>

        <button
          type="button"
          onClick={async (e) => {
            e.stopPropagation();
            await removeNotes(noteIds);
            removeAll();
          }}
          className="rounded-es-xl rounded-ee-xl w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start"
        >
          Delete
        </button> */}

        <form action={(e) => toggleNoteTypes(noteIds)}>
          <button
            onClick={(e: any) => e.stopPropagation()}
            className="rounded-ss-xl rounded-se-xl w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start"
          >
            TODO/TEXT
          </button>
        </form>
        <form action={() => addCopies(noteIds)}>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start"
          >
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
            className="rounded-es-xl rounded-ee-xl w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start"
          >
            Delete
          </button>
        </form>
      </div>
    </>
  );
}

export default React.memo(SelectNotesOptionsList);
