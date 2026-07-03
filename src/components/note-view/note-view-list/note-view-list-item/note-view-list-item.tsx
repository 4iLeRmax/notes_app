"use client";

import cn from "@/lib/cn";
import React, { useEffect, useRef, useState } from "react";
import NoteViewListItemStatusBtn from "./note-view-list-item-status-btn";
import NoteViewListItemDeleteBtn from "./note-view-list-item-delete-btn";
import NoteViewListItemContent from "./note-view-list-item-content";
import { Reorder, useDragControls } from "motion/react";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { GripVertical } from "lucide-react";

interface NoteViewListItemProps {
  noteId: string;
  listItem: NoteItem;
  prevItemId: string | null;
  nextItemId: string | null;
  handleDragEnd?: () => Promise<void>;
}

export default function NoteViewListItem({
  noteId,
  listItem,
  prevItemId,
  nextItemId,
  handleDragEnd,
}: NoteViewListItemProps) {
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

  const controls = useDragControls();

  return (
    <>
      <Reorder.Item
        key={`note-view-${listItem.id}`}
        value={listItem}
        dragListener={false}
        dragControls={controls}
        onDragEnd={handleDragEnd}
        dragElastic={0.1}
        className="w-full"
        as="div"
      >
        <div
          tabIndex={0}
          ref={elementRef}
          onKeyDown={(e) => handleKeyDown(e)}
          className={cn(
            "relative rounded-4xl w-full transition-colors outline-none group",
            "hover:bg-primary hover:shadow-outside-small",
            "focus-within:bg-primary focus-within:shadow-outside-small",
          )}
        >
          {/* {listItem.content} */}
          <div className="w-full min-w-0 flex items-center px-4 ">
            {listItem.isDone ? (
              <div className="w-7 h-5 shrink-0"></div>
            ) : (
              <button
                onPointerDown={(e) => controls.start(e)}
                className="mr-2 touch-none"
              >
                <GripVertical size={20} />
              </button>
            )}
            <NoteViewListItemStatusBtn
              noteId={noteId}
              listItemId={listItem.id}
              isDone={listItem.isDone}
              iconSize={20}
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
              iconSize={20}
            />
            <div>{listItem.position}</div>
          </div>
        </div>
      </Reorder.Item>
    </>
  );
}
