import cn from "@/lib/cn";
import { FileText, ListTodo } from "lucide-react";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
interface ToggleNoteTypeButtonProps {
  noteType: NoteType;
  toggleNoteType: (e: React.MouseEvent<HTMLButtonElement>) => void;
  formIsOpen: boolean;
}

export default function ToggleNoteTypeButton({
  noteType,
  formIsOpen,
  toggleNoteType,
}: ToggleNoteTypeButtonProps) {
  return (
    <>
      <AnimatePresence mode="wait">
        {formIsOpen ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            key="bottom"
            type="button"
            className={cn(
              "absolute top-8 right-[calc(16px+36px+16px)] md:right-[calc(32px+36px+16px)]",
              "text-txt-secondary hover:text-custom-blue transition-colors shadow-outside-small p-2 rounded-full bg-primary",
            )}
            onClick={toggleNoteType}
            onMouseDown={(e) => e.preventDefault()}
          >
            {noteType === "TEXT" ? (
              <ListTodo size={20} />
            ) : (
              <FileText size={20} />
            )}
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            key="top"
            type="button"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 right-4",
              "text-txt-secondary hover:text-custom-blue transition-colors shadow-outside-small p-2 rounded-full bg-primary",
            )}
            onClick={toggleNoteType}
            onMouseDown={(e) => e.preventDefault()}
          >
            {noteType === "TEXT" ? (
              <ListTodo size={20} />
            ) : (
              <FileText size={20} />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
