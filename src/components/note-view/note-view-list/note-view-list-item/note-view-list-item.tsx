"use client";

import cn from "@/lib/cn";
import React, { useEffect, useRef, useState } from "react";
import NoteViewListItemStatusBtn from "./note-view-list-item-status-btn";
import NoteViewListItemDeleteBtn from "./note-view-list-item-delete-btn";
import NoteViewListItemContent from "./note-view-list-item-content";
import { motion } from "motion/react";
import { createNoteItem, deleteNoteItem } from "@/lib/actions/note-item";

interface NoteViewListItemProps {
  noteId: string;
  listItem: NoteItem;
}

export default function NoteViewListItem({
  noteId,
  listItem,
}: NoteViewListItemProps) {
  const [hovered, setHovered] = useState(false);
  // const [focused, setFocused] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      listRef.current = elementRef.current.parentElement as HTMLDivElement;
    }
  }, [elementRef.current]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    const currentElement = elementRef.current;
    const prevElement = listRef.current?.childNodes[listItem.position - 1];
    let nextElement = listRef.current?.childNodes[listItem.position + 1];

    const currentElementsTextArea = currentElement?.childNodes[0].childNodes[1]
      .childNodes[0] as HTMLTextAreaElement | null;
    const prevElementsTextarea = prevElement?.childNodes[0].childNodes[1]
      .childNodes[0] as HTMLTextAreaElement | null;
    const nextElementsTextarea = nextElement?.childNodes[0].childNodes[1]
      .childNodes[0] as HTMLTextAreaElement | null;

    if (e.key === "ArrowLeft") {
      if (currentElementsTextArea?.selectionStart === 0) {
        e.preventDefault();
        prevElementsTextarea?.focus();
        prevElementsTextarea?.setSelectionRange(
          prevElementsTextarea.value.length,
          prevElementsTextarea.value.length,
        );
      }
    }
    if (e.key === "ArrowRight") {
      if (
        currentElementsTextArea?.selectionStart ===
        currentElementsTextArea?.value.length
      ) {
        e.preventDefault();
        nextElementsTextarea?.focus();
        nextElementsTextarea?.setSelectionRange(0, 0);
      }
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        currentElementsTextArea &&
        currentElementsTextArea.selectionStart ===
          currentElementsTextArea.value.length
      ) {
        const res = await createNoteItem(noteId, listItem.position + 1);
        if (res?.success) {
          console.log(
            await listRef.current?.childNodes[listItem.position].childNodes[0]
              .childNodes[1],
          );
        }
      }
    }
    if (e.key === "Backspace") {
      if (
        currentElementsTextArea &&
        currentElementsTextArea.value.length === 0
        // currentElementsTextArea.selectionStart === 0
      ) {
        await deleteNoteItem(listItem.id);
        console.log("delete");
        if (!listRef.current) return;

        if (!prevElementsTextarea) return;

        await prevElementsTextarea.focus();
        prevElementsTextarea.setSelectionRange(
          prevElementsTextarea.value.length,
          prevElementsTextarea.value.length,
        );
      }
    }
  };

  return (
    <>
      <motion.div
        ref={elementRef}
        initial={{ opacity: 0, x: -20, height: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          height: "auto",
        }}
        exit={{ opacity: 0, x: 20, height: 0 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onKeyDown={(e) => handleKeyDown(e)}
        // onFocus={() => setFocused(true)}
        // onBlur={() => setFocused(false)}
        tabIndex={0}
        className={cn("rounded-4xl bg-secondary shadow-outside-small w-full")}
      >
        <div className="w-full flex items-center gap-2">
          <NoteViewListItemStatusBtn
            listItemId={listItem.id}
            isDone={listItem.isDone}
            size={32}
          />

          <NoteViewListItemContent
            listItemId={listItem.id}
            content={listItem.content}
            isDone={listItem.isDone}
            hovered={hovered}
          />
          <NoteViewListItemDeleteBtn
            listItemId={listItem.id}
            hovered={hovered}
          />
          <div>{listItem.position}</div>
        </div>
      </motion.div>
    </>
  );
}
