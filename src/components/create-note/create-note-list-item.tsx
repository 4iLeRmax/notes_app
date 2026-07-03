import {
  CheckSquare,
  GripVertical,
  Square,
  SquareCheck,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { CreateLocalNote } from "./create-note";
import { motion, AnimatePresence } from "motion/react";
import CreateNoteListItemStatusBtn from "./create-note-list-item-status-btn";
import CreateNoteListItemDeleteBtn from "./create-note-list-item-delete-btn";
import { flushSync } from "react-dom";

interface CreateNoteListItemProps {
  item: CreateLocalNote["content"][number];
  handleChangeItem: (targetValue: string, itemId: string) => void;
  addNewItem: (createAtPosition?: number) => void;
  removeItem: (itemId: string) => void;
  toggleItemStatus: (itemId: string) => void;
  listRef: React.RefObject<HTMLDivElement | null>;

  pendingFocusId: string | null; // NEW
  clearPendingFocusId: () => void; // NEW
}

export default function CreateNoteListItem({
  item,
  addNewItem,
  removeItem,
  toggleItemStatus,
  handleChangeItem,
  listRef,

  pendingFocusId, // NEW
  clearPendingFocusId, // NEW
}: CreateNoteListItemProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null); // NEW

  useEffect(() => {
    // NEW
    if (pendingFocusId === item.id) {
      textareaRef.current?.focus();
      clearPendingFocusId();
    }
  }, [pendingFocusId, item.id, clearPendingFocusId]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (!listRef.current) return;
    const currentTextarea =
      listRef.current.children[0].children[item.position].querySelector(
        "textarea",
      );
    if (!currentTextarea) return;

    const { selectionStart, value } = currentTextarea;
    const isAtStart = selectionStart === 0;
    const isAtEnd = selectionStart === value.length;

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      const prevElement =
        listRef.current.children[0].children[item.position - 1];
      if (!prevElement) return;
      const prevTextarea = prevElement.querySelector("textarea");
      if (prevTextarea && isAtStart) {
        e.preventDefault();
        prevTextarea.focus();
      }
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      const nextElement =
        listRef.current.children[0].children[item.position + 1];
      if (!nextElement) return;
      const nextTextarea = nextElement.querySelector("textarea");
      if (nextTextarea && isAtEnd) {
        e.preventDefault();
        nextTextarea.focus();
      }
    }

    if (e.key === "Enter") {
      if (currentTextarea && isAtEnd) {
        e.preventDefault();
        addNewItem(item.position + 1);
      }
    }
    if (e.key === "Backspace") {
      if (currentTextarea && isAtStart && value.length === 0) {
        e.preventDefault();
        const prevElement =
          listRef.current.children[0].children[item.position - 1];
        if (prevElement) {
          const prevTextarea = prevElement.querySelector("textarea");
          if (prevTextarea) prevTextarea.focus();
        }
        removeItem(item.id);
      }
    }
  };

  return (
    <>
      <div className="py-1.5">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-3xl shadow-outside-small bg-primary text-txt-primary"
          onKeyDown={handleKeyDown}
        >
          <button
            type="button"
            // onPointerDown={(e) => controls.start(e)}
            className="touch-none"
          >
            <GripVertical size={20} />
          </button>
          <CreateNoteListItemStatusBtn
            isActive={item.isDone}
            onClick={() => toggleItemStatus(item.id)}
            iconSize={20}
          />
          <textarea
            id={item.id}
            ref={textareaRef} // NEW
            value={item.content}
            onChange={(e) => handleChangeItem(e.target.value, item.id)}
            placeholder="Type something..."
            className="w-full outline-none resize-none overflow-hidden field-sizing-content "
          />
          <CreateNoteListItemDeleteBtn
            onClick={() => removeItem(item.id)}
            iconSize={20}
          />
          <div>{item.position}</div>
        </div>
      </div>
    </>
  );
}
