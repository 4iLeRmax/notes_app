import React from "react";
import { getAllNotes } from "@/lib/actions/note";
import { NotebookPen, Search } from "lucide-react";
import NoteGroup from "./note-group";

interface NotesDisplayProps {
  query: string;
}

export default async function NotesDisplay({ query }: NotesDisplayProps) {
  const notes = await getAllNotes();
  if (!notes) return null;

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.some((item) =>
        item.content.toLowerCase().includes(query.toLowerCase()),
      ),
  );

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const regularNotes = notes.filter((note) => !note.isPinned);

  if (query.length > 0 && filteredNotes.length === 0)
    return (
      <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
        <div className="flex items-center gap-2 text-2xl text-txt-primary">
          <Search size={40} />
          <span>No results found for your search “{query}” </span>
        </div>
      </div>
    );

  return (
    <>
      {notes.length > 0 ? (
        <>
          <div className="flex flex-col items-center justify-center mt-10 gap-10">
            {query.length > 0 ? (
              <NoteGroup
                notes={filteredNotes}
                label={`Result of search "${query}"`}
              />
            ) : (
              <>
                <NoteGroup notes={pinnedNotes} label="Pinned notes" />
                <NoteGroup
                  notes={regularNotes}
                  label={pinnedNotes.length > 0 ? "Other notes" : ""}
                />
              </>
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
          <div className="flex items-center gap-2 text-2xl text-txt-primary">
            <NotebookPen size={40} />
            <span>Your notes will be here</span>
          </div>
        </div>
      )}
    </>
  );
}
