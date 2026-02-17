import { NotebookPen } from "lucide-react";

import { getSession, SignOutAction } from "@/lib/actions/auth";
import { getAllNotes } from "@/lib/actions/note";

import CreateNote from "@/components/create-note";
import NoteGroup from "@/components/note-group";

export default async function NotesPage() {
  const session = await getSession();
  if (!session) return null;

  const notes = await getAllNotes();
  if (!notes) return null;

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const regularNotes = notes.filter((note) => !note.isPinned);

  return (
    <>
      <div>
        {session ? (
          <div>
            <div>
              <h1>{session.user.email}</h1>
              <p>{session.user.name}</p>
            </div>
            <form action={SignOutAction}>
              <button>Log Out</button>
            </form>
          </div>
        ) : null}
        <div className="w-full flex items-center justify-center">
          <CreateNote />
        </div>

        {notes.length > 0 ? (
          <>
            <div className="flex flex-col items-center justify-center mt-10 gap-10">
              <NoteGroup notes={pinnedNotes} label="Pinned notes" />
              <NoteGroup
                notes={regularNotes}
                label={pinnedNotes.length > 0 ? "Other notes" : ""}
              />
            </div>
          </>
        ) : (
          <div className="mt-[30vh] flex items-center justify-center gap-2 text-2xl text-gray-400">
            <NotebookPen size={40} />
            <span>Your notes will be here</span>
          </div>
        )}
      </div>
    </>
  );
}
