import { TCreateNote } from "@/lib/zod-schemes/note-schemes/create-note.scheme";
import { Square, SquareCheck, X } from "lucide-react";
import React from "react";
import { fi } from "zod/v4/locales";
import { CreateLocalNote } from "./create-note";

interface CreateNoteListItemProps {
  item: CreateLocalNote["content"][number];
  addNewItem: (createAtPosition?: number) => void;
  removeItem: (rowId: number) => void;
  toggleItemStatus: (rowId: number) => void;
  handleChangeItem: (targetValue: string, rowId: number) => void;
  autoFocus?: boolean;
  listRef: React.RefObject<HTMLDivElement | null>;
}

export default function CreateNoteListItem({
  item,
  addNewItem,
  removeItem,
  toggleItemStatus,
  handleChangeItem,
  listRef,
}: CreateNoteListItemProps) {
  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (!listRef.current) return;
    const currentTextarea =
      listRef.current.children[item.index].querySelector("textarea");
    if (!currentTextarea) return;

    const { selectionStart, value } = currentTextarea;
    const isAtStart = selectionStart === 0;
    const isAtEnd = selectionStart === value.length;

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      const prevElement = listRef.current.children[item.index - 1];
      if (!prevElement) return;
      const prevTextarea = prevElement.querySelector("textarea");
      if (prevTextarea && isAtStart) {
        e.preventDefault();
        prevTextarea.focus();
      }
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      const nextElement = listRef.current.children[item.index + 1];
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
        addNewItem(item.index + 1);

        requestAnimationFrame(() => {
          const nextElement = listRef.current?.children[item.index + 1];
          if (nextElement) {
            const nextTextarea = nextElement.querySelector("textarea");
            if (nextTextarea) nextTextarea.focus();
          }
        });
      }
    }
    if (e.key === "Backspace") {
      if (currentTextarea && isAtStart && value.length === 0) {
        e.preventDefault();
        const prevElement = listRef.current.children[item.index - 1];
        if (prevElement) {
          const prevTextarea = prevElement.querySelector("textarea");
          if (prevTextarea) prevTextarea.focus();
        }
        removeItem(item.index);
      }
    }
  };

  return (
    <>
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-3xl shadow-outside-small bg-primary"
        onKeyDown={handleKeyDown}
      >
        <button type="button" onClick={() => toggleItemStatus(item.index)}>
          {item.isDone ? <SquareCheck size={20} /> : <Square size={20} />}
        </button>
        <textarea
          value={item.content}
          onChange={(e) => handleChangeItem(e.target.value, item.index)}
          placeholder="Type something..."
          className="w-full outline-none resize-none overflow-hidden field-sizing-content "
          // autoFocus={autoFocus}
        />
        <button
          // tabIndex={-1}
          type="button"
          // onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            removeItem(item.index);
            if (listRef.current) listRef.current.focus();
          }}
        >
          <X size={20} />
        </button>
        <div>{item.index}</div>
      </div>
    </>
  );
}
