import cn from "@/lib/cn";
import { FileText, ListTodo, Plus } from "lucide-react";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
interface ToggleNoteTypeButtonProps {
  noteType: NoteType;
  toggleNoteType: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ToggleNoteTypeButton({
  noteType,
  toggleNoteType,
}: ToggleNoteTypeButtonProps) {
  return (
    <>
      <button
        aria-label="Toggle note type"
        onClick={toggleNoteType}
        className={cn("p-2 rounded-full bg-primary transition-colors", {
          "shadow-outside-small text-txt-secondary hover:text-custom-blue":
            noteType === "TEXT",
          "shadow-inside text-custom-blue": noteType === "TODO",
        })}
      >
        {noteType === "TEXT" ? <ListTodo size={20} /> : <FileText size={20} />}
      </button>
    </>
  );
}
