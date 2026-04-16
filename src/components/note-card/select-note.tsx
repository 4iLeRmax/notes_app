"use client";

import cn from "@/lib/cn";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import { Check } from "lucide-react";
import React, { useState, memo, useEffect } from "react";

const ChildrenWrapper = memo(({ children }: { children: React.ReactNode }) => (
  <>{children}</>
));

ChildrenWrapper.displayName = "ChildrenWrapper";

export default function SelectNote({
  children,
  note,
}: {
  children: React.ReactNode;
  note: Note;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { selectedNotes, toggleSelectedNote, removeAll } =
    useSelectedNotesStore();

  const isSelected = selectedNotes.some((sn) => sn.id === note.id);

  let mouseTimer: any;
  let touchStartX = 0;
  let touchStartY = 0;
  const LONG_PRESS_DURATION = 400;
  const TOUCH_MOVE_THRESHOLD = 10; // pixels

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest("[data-note-card]")) return;
      if (target.closest("[data-note-card-button]")) return;
      if (target.closest("[data-header]")) return;
      if (target.closest("[data-aside]")) return;

      removeAll();
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [removeAll]);

  useEffect(() => {
    return () => removeAll();
  }, []);

  const handlePressStart = () => {
    if (mouseTimer) clearTimeout(mouseTimer);
    mouseTimer = window.setTimeout(() => {
      console.log("note selected");
      toggleSelectedNote(note);
      navigator.vibrate?.(200);
    }, LONG_PRESS_DURATION);
  };

  const handlePressEnd = () => {
    if (mouseTimer) {
      clearTimeout(mouseTimer);
      mouseTimer = undefined;
    }
  };

  const handleTouchMove = () => {
    // Cancel long-press if user is moving (scrolling)
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
        // onMouseDown={mouseDown}
        // onMouseUp={mouseUp}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        onTouchCancel={touchCancel}
        onTouchMove={touchMove}
        className={cn(
          "relative rounded-xl xs:rounded-3xl bg-primary w-full note-card",
          {
            "shadow-outside-small": !isSelected && !isHovered,
            "shadow-inside ": isSelected || isHovered,
          },
        )}
      >
        {isSelected || isHovered ? (
          <div className="hidden xs:flex absolute z-20 top-3 -left-3.5">
            <button
              data-note-card-button
              onClick={() => toggleSelectedNote(note)}
              className="bg-primary rounded-3xl shadow-outside-small p-1 text-txt-primary"
            >
              <Check size={20} />
            </button>
          </div>
        ) : null}
        {selectedNotes.length > 0 && (
          <div
            style={{ position: "absolute", inset: 0, zIndex: 1 }}
            className={cn("absolute inset-0 z-10 cursor-pointer", {
              "bg-txt-primary/20 rounded-xl xs:rounded-3xl": isSelected,
            })}
            onClick={() => toggleSelectedNote(note)}
          />
        )}

        <ChildrenWrapper>{children}</ChildrenWrapper>
      </div>
    </>
  );
}
