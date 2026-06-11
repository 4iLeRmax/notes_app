"use client";

import cn from "@/lib/cn";
import React, { useEffect, useRef, useState } from "react";
import NoteViewListItemStatusBtn from "./note-view-list-item-status-btn";
import NoteViewListItemDeleteBtn from "./note-view-list-item-delete-btn";
import NoteViewListItemContent from "./note-view-list-item-content";
import { motion } from "motion/react";
import { useNotesStore } from "@/lib/store/useNotesStore";

interface NoteViewListItemProps {
  noteId: string;
  listItem: NoteItem;
  prevItemId: string | null;
  nextItemId: string | null;
}

export default function NoteViewListItem({
  noteId,
  listItem,
  prevItemId,
  nextItemId,
}: NoteViewListItemProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const addNoteItem = useNotesStore((s) => s.addNoteItem);
  const removeNoteItem = useNotesStore((s) => s.removeNoteItem);
  const setFocusedItemId = useNotesStore((s) => s.setFocusedItemId);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    const currentTextarea = (
      elementRef.current as HTMLElement
    )?.querySelector<HTMLTextAreaElement>("textarea");
    if (!currentTextarea) return;

    const { selectionStart, value } = currentTextarea;
    const isAtStart = selectionStart === 0;
    const isAtEnd = selectionStart === value.length;

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      if (prevItemId && isAtStart) {
        e.preventDefault();
        setFocusedItemId(prevItemId);
      }
    }

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      if (nextItemId && isAtEnd) {
        e.preventDefault();
        setFocusedItemId(nextItemId);
      }
    }

    if (e.key === "Enter") {
      if (currentTextarea && isAtEnd) {
        e.preventDefault();
        await addNoteItem(noteId, listItem.position + 1);
      }
    }

    if (e.key === "Backspace") {
      if (currentTextarea && isAtStart && value.length === 0) {
        e.preventDefault();
        if (prevItemId) setFocusedItemId(prevItemId);
        await removeNoteItem(noteId, listItem.id);
      }
    }
  };

  return (
    <>
      <motion.div
        tabIndex={0}
        ref={elementRef}
        initial={{ opacity: 0, x: -20, height: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          height: "auto",
        }}
        exit={{ opacity: 0, x: 20, height: 0 }}
        onMouseOver={() => (!hovered ? setHovered(true) : null)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => handleKeyDown(e)}
        className={cn("relative rounded-4xl w-full transition-colors ", {
          "hover:bg-primary hover:shadow-outside-small": !focused,
          "bg-primary shadow-outside-small": focused,
        })}
      >
        <div className="w-full min-w-0 flex items-center gap-2">
          <NoteViewListItemStatusBtn
            noteId={noteId}
            listItemId={listItem.id}
            isDone={listItem.isDone}
            size={32}
          />

          <NoteViewListItemContent
            noteId={noteId}
            listItemId={listItem.id}
            content={listItem.content}
            isDone={listItem.isDone}
          />
          <NoteViewListItemDeleteBtn
            noteId={noteId}
            listItemId={listItem.id}
            hovered={hovered}
          />
        </div>
      </motion.div>
    </>
  );
}
