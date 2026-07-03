"use client";

import { AnimatePresence } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BaseModal from "../UI/base-modal";
import NoteView from "../note-view/note-view";
import NoteCard from "../note-card/note-card";
import useNoteModal from "@/hooks/useNoteModal";

interface NoteProps {
  note: Note;
}

export default function Note({ note }: NoteProps) {
  // const [isOpen, setIsOpen] = useState(false);
  const { activeNoteId, openNote, closeNote } = useNoteModal();
  const isOpen = activeNoteId === note.id;

  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (isOpenRef.current) closeNote();
    };
  }, []);

  return (
    <>
      <NoteCard note={note} handleOpen={() => openNote(note.id)} />
      {/* <AnimatePresence mode="popLayout">
        {isOpen ? (
          <BaseModal customClose={() => closeNote()}>
            <NoteView note={note} handleBack={() => closeNote()} />
          </BaseModal>
        ) : null}
      </AnimatePresence> */}
    </>
  );
}
