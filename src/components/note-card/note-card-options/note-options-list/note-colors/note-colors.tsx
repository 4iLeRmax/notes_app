"use client";

import { useNotesStore } from "@/lib/store/useNotesStore";
import { ChevronRight, Palette } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import NoteColorsModal from "./note-colors-modal";
import cn from "@/lib/cn";
import NoteColorsBtn from "./note-colors-btn";

interface NoteColorsProps {
  noteId: string;
}

export default function NoteColors({ noteId }: NoteColorsProps) {
  const [showColors, setShowColors] = useState(false);
  const [modalXPosition, setModalXPosition] = useState<"left" | "right">(
    "right",
  );
  const currentNote = useNotesStore((s) =>
    s.notes.find((n) => n.id === noteId),
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (!currentNote) return null;

  const handleToggle = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const rightRest = window.innerWidth - rect.right;
    setModalXPosition(rightRest >= 48 + 24 ? "right" : "left");
    setShowColors((p) => !p);
  };

  return (
    <>
      <NoteColorsBtn
        buttonRef={buttonRef}
        isOpen={showColors}
        handleToggle={handleToggle}
      />
      <AnimatePresence>
        {showColors ? (
          <NoteColorsModal modalXPosition={modalXPosition} note={currentNote} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
