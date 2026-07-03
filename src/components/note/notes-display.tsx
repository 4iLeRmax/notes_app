"use client";

import React, { useEffect } from "react";
import { NotebookPen, Search } from "lucide-react";
import NotesGroup from "./notes-group";
import { useNotesStore } from "@/lib/store/useNotesStore";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import { NotesDisplaySkeleton } from "../UI/skeletons";
import NotesSort from "./notes-sort/notes-sort";
import useNoteSortStore from "@/lib/store/useNoteSortStore";
import sortNotes from "@/lib/sort-notes";
import NotesSortLayout from "./notes-sort/notes-sort-layout";
import { useClickOutsideDeselected } from "@/hooks/useClickOutsideDeselected";
import NoteView from "../note-view/note-view";

interface NotesDisplayProps {
  query: string;
}

export default function NotesDisplay({ query }: NotesDisplayProps) {
  const notes = useNotesStore((s) => s.notes);

  const currentNote = notes[0];

  const isHydratedNote = useNotesStore((s) => s.isHydratedNote);
  const { sortType, sortDirection } = useNoteSortStore((s) => s.sort);

  useClickOutsideDeselected();

  const searchResultOfNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.some((item) =>
        item.content.toLowerCase().includes(query.toLowerCase()),
      ),
  );

  const sortedNotes = sortNotes[sortType](searchResultOfNotes, sortDirection);

  const pinnedNotes = sortedNotes.filter((note) => note.isPinned);
  const regularNotes = sortedNotes.filter((note) => !note.isPinned);

  if (!isHydratedNote) return <NotesDisplaySkeleton />;

  if (notes.length === 0)
    return (
      <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
        <div className="flex items-center gap-2 text-2xl text-txt-primary">
          <NotebookPen size={40} />
          <span>Your notes will be here</span>
        </div>
      </div>
    );

  if (query.length > 0 && searchResultOfNotes.length === 0)
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
      {/* <NoteView note={currentNote} handleBack={() => {}} /> */}
      <div className="flex flex-col items-center justify-center mt-10 gap-4">
        <NotesSortLayout position="right">
          <NotesSort />
        </NotesSortLayout>

        <div className="w-full flex flex-col items-center gap-10">
          {query.length > 0 ? (
            <NotesGroup
              notes={sortedNotes}
              label={`Result of search "${query}"`}
            />
          ) : (
            <>
              <NotesGroup notes={pinnedNotes} label="Pinned notes" />
              <NotesGroup
                notes={regularNotes}
                label={pinnedNotes.length > 0 ? "Other notes" : "Notes"}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
