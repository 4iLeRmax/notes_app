"use client";

import { useNotesStore } from "@/lib/store/useNotesStore";
import { ChevronRight, Palette } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import NoteColorsModal from "./note-colors-modal";
import cn from "@/lib/cn";

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
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={cn(
          " w-full flex items-center justify-between gap-2",
          "px-4 py-2 ",
          {
            "hover:bg-custom-blue text-txt-primary hover:text-primary":
              !showColors,
            "text-primary bg-custom-blue": showColors,
          },
        )}
      >
        <div className="flex items-center gap-2">
          <Palette size={20} className="flex xs:hidden" />
          <span>Add color</span>
        </div>
        <motion.div
          animate={{
            rotate: showColors ? 180 : 0,
          }}
        >
          <ChevronRight size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {showColors ? (
          <NoteColorsModal modalXPosition={modalXPosition} note={currentNote} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
