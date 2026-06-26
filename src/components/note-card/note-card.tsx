"use client";

import NoteCardLabels from "./note-card-labels";
import NoteCardHeader from "./note-card-header";
import NoteCardMain from "./note-card-main";
import LastNoteUpdate from "@/components/note/last-note-update";
import SelectNote from "./select-note";
import NoteOptions from "./note-card-options/note-options";

interface NoteCardProps {
  note: Note;
  handleOpen: () => void;
}

export default function NoteCard({ note, handleOpen }: NoteCardProps) {
  return (
    <>
      <SelectNote note={note}>
        <div className="relative rounded-xl sm:rounded-3xl w-full select-none">
          <div onClick={handleOpen} className="cursor-pointer ">
            <div className="px-2 sm:px-4 pt-3">
              <NoteCardHeader
                noteId={note.id}
                title={note.title}
                isPinned={note.isPinned}
              />
            </div>

            <div className="mt-3 px-2 sm:px-4 text-sm sm:text-base">
              <NoteCardMain noteType={note.type} noteContent={note.content} />
            </div>
            <div className="mt-4 px-2 sm:px-4 pb-5">
              <NoteCardLabels
                noteId={note.id}
                noteLabels={note.labels}
                maxLength={3}
              />
            </div>
            <div className="px-4 pb-3">
              <LastNoteUpdate note={note} />
            </div>
          </div>

          <div className="flex absolute bottom-0 right-0 pb-3 px-2 sm:px-4">
            <NoteOptions noteId={note.id} />
          </div>
        </div>
      </SelectNote>
    </>
  );
}
