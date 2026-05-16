import Link from "next/link";

import NoteMoreMenu from "./note-card-options/note-options";
import NoteCardLabels from "./note-card-labels";
import NoteCardHeader from "./note-card-header";
import NoteCardMain from "./note-card-main";
import LastUpdate from "@/components/note-view/note-view-last-update";
import SelectNote from "./select-note";
interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <>
      <SelectNote note={note}>
        <div className="relative rounded-xl sm:rounded-3xl w-full select-none ">
          <Link href={`/notes/${note.id}`}>
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
              <NoteCardLabels note={note} maxLength={3} />
            </div>
            <div className="px-4 pb-3">
              <LastUpdate note={note} />
            </div>
          </Link>

          <div className="absolute bottom-0 right-0 pb-3 px-2 sm:px-4">
            <NoteMoreMenu noteId={note.id} />
          </div>
        </div>
      </SelectNote>
    </>
  );
}
