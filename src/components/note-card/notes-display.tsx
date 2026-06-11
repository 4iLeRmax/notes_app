"use client";

import React, { useEffect } from "react";
import { Check, CheckCircle, NotebookPen, Search } from "lucide-react";
import NotesGroup from "./notes-group";
import { useNotesStore } from "@/lib/store/useNotesStore";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import { NotesDisplaySkeleton } from "../UI/skeletons";

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest("[data-note-card]")) return;
      if (target.closest("[data-note-card-button]")) return;
      if (target.closest("[data-header]")) return;
      if (target.closest("[data-aside]")) return;
      if (!hasAnySelected) return;

      removeAll();
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [removeAll, hasAnySelected]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.some((item) =>
        item.content.toLowerCase().includes(query.toLowerCase()),
      ),
  );

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const regularNotes = notes.filter((note) => !note.isPinned);

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
      <div className="flex flex-col items-center justify-center mt-10 gap-10">
        {query.length > 0 ? (
          <NotesGroup
            notes={filteredNotes}
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
