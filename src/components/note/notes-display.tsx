"use client";

import React, { useEffect } from "react";
import { NotebookPen, Search } from "lucide-react";
import NotesGroup from "./notes-group";
import { useNotesStore } from "@/lib/store/useNotesStore";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import { NotesDisplaySkeleton } from "../UI/skeletons";
import NotesFilter from "./notes-filter/notes-filter";
import useNoteFilterStore, {
  SortDirections,
  SortTypes,
} from "@/lib/store/useNoteFilterStore";
import sortNotes from "@/lib/sort-notes";

interface NotesDisplayProps {
  query: string;
}

export default function NotesDisplay({ query }: NotesDisplayProps) {
  const notes = useNotesStore((s) => s.notes);
  const removeAll = useSelectedNotesStore((s) => s.removeAll);
  const hasAnySelected = useSelectedNotesStore(
    (s) => s.selectedNoteIds.length > 0,
  );
  const isHydratedNote = useNotesStore((s) => s.isHydratedNote);
  const { sortType, sortDirection } = useNoteFilterStore((s) => s.filter);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest("[data-note-card]")) return;
      if (target.closest("[data-note-card-button]")) return;
      if (target.closest("[data-header]")) return;
      if (target.closest("[data-aside]")) return;
      if (target.closest("[data-more-btn]")) return;
      if (!hasAnySelected) return;

      removeAll();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [removeAll, hasAnySelected]);

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
      <div className="flex flex-col items-center justify-center mt-10 gap-10">
        <div className="w-full flex justify-center">
          <div className="flex justify-end w-full lg:w-[calc((250px*3)+(20px*2))] xl:w-[calc((250px*4)+(20px*3))] 3xl:w-[calc((250px*5)+(20px*4))]!">
            <NotesFilter />
          </div>
        </div>

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
              label={pinnedNotes.length > 0 ? "Other notes" : ""}
            />
          </>
        )}
      </div>
    </>
  );
}
