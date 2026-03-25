import Link from "next/link";

import NoteMoreMenu from "./note-more-menu";
import NoteCardLabels from "./note-card-labels";
import NoteCardHeader from "./note-card-header";
import NoteCardMain from "./note-card-main";
import LastUpdate from "@/app/(main)/notes/[id]/components/last-update";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <>
      <div className="relative shadow-outside_small rounded-3xl w-full select-none bg-primary">
        <Link href={`/notes/${note.id}`}>
          <div className="px-4 pt-3">
            <NoteCardHeader
              noteId={note.id}
              title={note.title}
              isPinned={note.isPinned}
            />
          </div>

          <div className="mt-3 px-4">
            <NoteCardMain noteType={note.type} noteContent={note.content} />
          </div>
          <div className="mt-4 px-4 pb-5">
            <NoteCardLabels note={note} maxLength={3} />
          </div>
          <div className="px-4 pb-3">
            <LastUpdate note={note} />
          </div>
        </Link>

        <div className="absolute bottom-0 right-0 pb-3 px-4">
          <NoteMoreMenu noteId={note.id} />
        </div>
      </div>
    </>
  );
}
