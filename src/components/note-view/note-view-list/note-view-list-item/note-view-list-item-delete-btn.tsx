"use client";

import cn from "@/lib/cn";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NoteViewListItemDeleteBtnProps {
  noteId: string;
  listItemId: string;
  iconSize?: number;
}

export default function NoteViewListItemDeleteBtn({
  noteId,
  listItemId,
  iconSize = 20,
}: NoteViewListItemDeleteBtnProps) {
  const removeNoteItem = useNotesStore((s) => s.removeNoteItem);
  return (
    <>
      <button
        onClick={() => removeNoteItem(noteId, listItemId)}
        className={cn(
          "p-1.5 rounded-full bg-secondary shadow-outside-small",
          "text-txt-primary hover:text-custom-blue transition-colors",
          "hidden group-hover:flex group-focus-within:flex",
        )}
      >
        <X size={iconSize} />
      </button>
      <div className="w-8 h-8 shrink-0 flex group-hover:hidden group-focus-within:hidden"></div>
    </>
  );
}
