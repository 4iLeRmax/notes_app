"use client";

import ViewModeLayout from "../notes-view-mode/wrappers/view-mode-layout";
import ViewModeNoteCard from "../notes-view-mode/wrappers/view-mode-note-card";
import { AnimatePresence } from "motion/react";
import BaseModal from "../UI/base-modal";
import NoteView from "../note-view/note-view";
import { useState } from "react";
import NoteCard from "../note-card/note-card";
import useNoteModal from "@/hooks/useNoteModal";

interface NotesGroupProps {
  label: string;
  notes: Note[];
}

export default function NotesGroup({ notes, label }: NotesGroupProps) {
  const [activeNoteId, setActiveNoteId] = useState("");
  const currentNote = notes.find((n) => n.id === activeNoteId);

  useNoteModal(activeNoteId, (activeNoteId: string) =>
    setActiveNoteId(activeNoteId),
  );

  if (notes.length === 0) return null;

  return (
    <>
      <div className="flex flex-col lg:items-center gap-3 w-full">
        {label ? (
          <h1 className="text-txt-primary select-none text-center">{label}</h1>
        ) : null}
        <ViewModeLayout>
          {notes.map((note) => (
            <ViewModeNoteCard key={note.id}>
              <div className="break-inside-avoid w-full">
                <NoteCard
                  note={note}
                  handleOpen={() => setActiveNoteId(note.id)}
                />
              </div>
            </ViewModeNoteCard>
          ))}
        </ViewModeLayout>
      </div>
      <AnimatePresence mode="popLayout">
        {currentNote && activeNoteId !== "" ? (
          <BaseModal customClose={() => setActiveNoteId("")}>
            <NoteView
              note={currentNote}
              handleBack={() => setActiveNoteId("")}
            />
          </BaseModal>
        ) : null}
      </AnimatePresence>
    </>
  );
}
