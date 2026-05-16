import {
  createCopies,
  deleteNotes,
  toggleManyNoteTypes,
  toggleNoteType,
} from "@/lib/actions/note";
import { deleteAllMarkedItems, removeAllMarks } from "@/lib/actions/note-item";
import { ChevronRight } from "lucide-react";
import React from "react";

interface NoteOptionsListProps {
  noteIds: string[];
  startTransition: React.TransitionStartFunction;
  removeAll: () => void;
  //   toggleShowLabel: () => void;
}

export default function SelectNotesOptionsList({
  noteIds,
  startTransition,
  removeAll,
  //   toggleShowLabel,
}: NoteOptionsListProps) {
  return (
    <>
      <div className="flex flex-col">
        <form
          action={(e) => {
            startTransition(() => toggleManyNoteTypes(noteIds));
          }}
        >
          <button
            onClick={(e: any) => e.stopPropagation()}
            className="rounded-ss-xl rounded-se-xl w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start"
          >
            TODO/TEXT
          </button>
        </form>
        {/*<button
                className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-between items-center"
                onClick={() => setShowLabel((p) => !p)}
              >
                <span>Add Label</span>
                <ChevronRight size={20} />
              </button>*/}
        <form action={() => startTransition(() => createCopies(noteIds))}>
          <button
            onClick={(e: any) => e.stopPropagation()}
            className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start"
          >
            Create copy
          </button>
        </form>
        <form
          action={() =>
            startTransition(async () => {
              await deleteNotes(noteIds);
              removeAll();
            })
          }
        >
          <button
            onClick={(e: any) => e.stopPropagation()}
            className="rounded-es-xl rounded-ee-xl w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start"
          >
            Delete
          </button>
        </form>
      </div>
    </>
  );
}
