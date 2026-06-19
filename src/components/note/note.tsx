"use client";

import { AnimatePresence } from "motion/react";
import React, { useCallback, useEffect, useState } from "react";
import BaseModal from "../UI/base-modal";
import NoteView from "../note-view/note-view";
import NoteCard from "../note-card/note-card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useNoteModal from "@/hooks/useNoteModal";

interface NoteProps {
  note: Note;
}

export default function Note({ note }: NoteProps) {
  // const [isOpen, setIsOpen] = useState(false);

  // const handleOpen = () => setIsOpen(true);
  // const handleClose = () => setIsOpen(false);
  const { activeNoteId, openNote, closeNote } = useNoteModal();
  const isOpen = activeNoteId === note.id;

  useEffect(() => {
    if (isOpen) openNote(note.id);
  }, []);

  return (
    <>
      <NoteCard note={note} handleOpen={() => openNote(note.id)} />
      <AnimatePresence mode="wait">
        {isOpen ? (
          <BaseModal customClose={closeNote}>
            <NoteView note={note} handleBack={closeNote} />
          </BaseModal>
        ) : null}
      </AnimatePresence>
    </>
  );
}
