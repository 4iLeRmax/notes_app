"use client";

import { useNotesStore } from "@/lib/store/useNotesStore";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NoteViewListItemDeleteBtnProps {
  noteId: string;
  listItemId: string;
  hovered: boolean;
}

export default function NoteViewListItemDeleteBtn({
  noteId,
  listItemId,
  hovered,
}: NoteViewListItemDeleteBtnProps) {
  const removeNoteItem = useNotesStore((s) => s.removeNoteItem);

  return (
    <>
      <AnimatePresence mode="wait">
        {hovered ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex h-full pr-4"
          >
            <button
              onClick={() => removeNoteItem(noteId, listItemId)}
              className="p-1 rounded-full bg-primary shadow-outside-small text-txt-primary hover:text-custom-blue transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        ) : (
          <div className="w-7 h-7 shrink-0"></div>
        )}
      </AnimatePresence>
    </>
  );
}
