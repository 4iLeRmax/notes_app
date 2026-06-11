"use client";

import cn from "@/lib/cn";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { Check, Circle, CircleCheck } from "lucide-react";
import { motion, AnimatePresence, scale } from "motion/react";
import { useState } from "react";

interface NoteViewListItemStatusBtnProps {
  noteId: string;
  listItemId: string;
  isDone: boolean;
  size?: number;
}

export default function NoteViewListItemStatusBtn({
  noteId,
  listItemId,
  isDone,
  size = 36,
}: NoteViewListItemStatusBtnProps) {
  const toggleItemStatus = useNotesStore((s) => s.toggleItemStatus);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="flex items-center pl-4"
        onMouseOver={() => (!hovered ? setHovered(true) : null)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          onClick={() => toggleItemStatus(noteId, listItemId)}
          className={cn(
            "rounded-full w-7 h-7 bg-primary flex items-center justify-center",
            {
              "shadow-outside-small": !isDone,
              "shadow-inside": isDone,
            },
          )}
        >
          <AnimatePresence mode="wait">
            {(isDone && !hovered) || (!isDone && hovered) ? (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Check size={20} className="text-custom-blue" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}
