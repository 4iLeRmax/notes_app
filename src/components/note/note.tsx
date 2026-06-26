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
      {/* <div className="rounded-3xl bg-[#F4D892]">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold text-[#ffb700]">Large text</div>
          <div className="w-7 h-7 rounded-full  bg-[#ffb700]"></div>
        </div>
        <div className="px-4 text-txt-primary">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dumdmy text
          ever since 1966, when designers at Letraset and James Mosley, the
          librarian at St Bride Printing Library, took a 1914 Cicero translation
          and scrambled it to make dummy! text for Letraset's Body Type sheets.
          It has survived not only many decades, but also the leap i...
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="w-20 h-7 rounded-full  bg-[#ffb700]"></div>
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xs">Updated: 12 .123.123</div>
          <div className="w-7 h-7 rounded-full  bg-[#ffb700]"></div>
        </div>
      </div>

      <div className="rounded-3xl bg-[#bbe5fd]">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold text-[#00a2ff]">Large text</div>
          <div className="w-7 h-7 rounded-full  bg-[#00a2ff]"></div>
        </div>
        <div className="px-4 text-txt-primary">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dumdmy text
          ever since 1966, when designers at Letraset and James Mosley, the
          librarian at St Bride Printing Library, took a 1914 Cicero translation
          and scrambled it to make dummy! text for Letraset's Body Type sheets.
          It has survived not only many decades, but also the leap i...
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="w-20 h-7 rounded-full  bg-[#00a2ff]"></div>
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xs">Updated: 12 .123.123</div>
          <div className="w-7 h-7 rounded-full  bg-[#00a2ff]"></div>
        </div>
      </div>

      <div className="rounded-3xl bg-[#ffb5a1]">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold text-[#ff663c]">Large text</div>
          <div className="w-7 h-7 rounded-full  bg-[#ff663c]"></div>
        </div>
        <div className="px-4 text-txt-primary">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dumdmy text
          ever since 1966, when designers at Letraset and James Mosley, the
          librarian at St Bride Printing Library, took a 1914 Cicero translation
          and scrambled it to make dummy! text for Letraset's Body Type sheets.
          It has survived not only many decades, but also the leap i...
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="w-20 h-7 rounded-full  bg-[#ff663c]"></div>
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xs">Updated: 12 .123.123</div>
          <div className="w-7 h-7 rounded-full  bg-[#ff663c]"></div>
        </div>
      </div> */}

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
