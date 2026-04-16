import cn from "@/lib/cn";
import { FileText, SquareCheckBig } from "lucide-react";
import React from "react";

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
      <button
        type="button"
        className={cn(
          "text-txt-secondary shadow-outside-small p-2 rounded-full",
          {
            "absolute right-8 top-1/2 -translate-y-1/2": !formIsOpen,
            "absolute top-8 right-21": formIsOpen,
          },
        )}
        onClick={toggleNoteType}
        onMouseDown={(e) => e.preventDefault()}
      >
        {noteType === "TEXT" ? (
          <SquareCheckBig size={20} />
        ) : (
          <FileText size={20} />
        )}
      </button>
    </>
  );
}
