"use client";

import cn from "@/lib/cn";
import { vibrate } from "@/lib/haptics";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, memo, useEffect } from "react";

export default function SelectNote({
  children,
  note,
}: {
  children: React.ReactNode;
  note: Note;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // const selectedNoteIds = useSelectedNotesStore((s) => s.selectedNoteIds);
  const toggleSelectedNote = useSelectedNotesStore((s) => s.toggleSelectedNote);
  // const removeAll = useSelectedNotesStore((s) => s.removeAll);

  const isSelected = useSelectedNotesStore((s) =>
    s.selectedNoteIds.includes(note.id),
  );
  const hasAnySelected = useSelectedNotesStore(
    (s) => s.selectedNoteIds.length > 0,
  );

  let mouseTimer: any;
  let touchStartX = 0;
  let touchStartY = 0;
  const LONG_PRESS_DURATION = 400;
  const TOUCH_MOVE_THRESHOLD = 10; // pixels

  // useEffect(() => {
  //   return () => removeAll();
  // }, []);

  const handlePressStart = () => {
    if (mouseTimer) clearTimeout(mouseTimer);
    mouseTimer = window.setTimeout(() => {
      toggleSelectedNote(note.id);
      vibrate(100);
    }, LONG_PRESS_DURATION);
  };

  const handlePressEnd = () => {
    if (mouseTimer) {
      clearTimeout(mouseTimer);
      mouseTimer = undefined;
    }
  };

  const handleTouchMove = () => {
    handlePressEnd();
  };

  // const mouseDown = () => {
  //   handlePressStart();
  // };

  // const mouseUp = () => {
  //   handlePressEnd();
  // };

  const touchStart = () => {
    handlePressStart();
  };

  const touchEnd = () => {
    handlePressEnd();
  };

  const touchCancel = () => {
    handlePressEnd();
  };

  const touchMove = () => {
    handleTouchMove();
  };

  return (
    <>
      <div
        data-note-card
        tabIndex={1}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        onTouchCancel={touchCancel}
        onTouchMove={touchMove}
        className={cn("relative rounded-2xl sm:rounded-3xl w-full note-card")}
      >
        {isSelected || isHovered ? (
          <div className="hidden sm:flex absolute z-20 top-2.5 -left-2.5">
            <button
              data-note-card-button
              onClick={() => toggleSelectedNote(note.id)}
              className="bg-custom-blue rounded-3xl shadow-outside-small p-0.5 text-primary"
            >
              <Check size={16} />
            </button>
          </div>
        ) : null}
        {hasAnySelected ? (
          <div
            className={cn(
              "absolute inset-0 z-10 cursor-pointer rounded-xl sm:rounded-3xl",
              {
                "bg-custom-blue/20 border-2 border-custom-blue": isSelected,
              },
            )}
            onClick={() => toggleSelectedNote(note.id)}
          />
        ) : null}
        {/* <div className="absolute top-0 left-0 bg-amber-500 w-full h-10 -z-20 rounded-ss-2xl rounded-se-2xl sm:rounded-ss-3xl sm:rounded-se-3xl"></div> */}

        {children}
      </div>
    </>
  );
}
