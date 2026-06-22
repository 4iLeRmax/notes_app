"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useNotesStore } from "@/lib/store/useNotesStore";
import cn from "@/lib/cn";
import { vibrate } from "@/lib/haptics";

interface NoteCardLabelItemProps {
  label: Label;
  noteId: string;
  surface?: "primary" | "secondary";
}

export default function NoteCardLabelItem({
  label,
  noteId,
  surface = "primary",
}: NoteCardLabelItemProps) {
  const [showButton, setShowButton] = useState(false);
  const toggleNoteLabel = useNotesStore((s) => s.toggleNoteLabel);

  const handleLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    window.location.href = `/labels/${label.id}`;
  };

  const handleRemoveLabel = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    vibrate(10);
    await toggleNoteLabel(noteId, label.id);
  };

  return (
    <>
      <div
        onClick={handleLink}
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        className={cn(
          "relative flex items-center min-w-12 max-w-full shadow-inside text-sm py-1 rounded-3xl cursor-pointer text-txt-primary",
          {
            "bg-primary ": surface === "primary",
            "bg-secondary xs:bg-primary": surface === "secondary",
          },
        )}
      >
        <span
          className={cn("truncate pl-2 w-full", {
            "pr-5": !showButton,
          })}
        >
          {label.name}
        </span>
        {showButton ? (
          <button
            type="button"
            className="p-1 outline-none text-txt-secondary"
            onClick={handleRemoveLabel}
          >
            <X size={12} />
          </button>
        ) : null}
      </div>
    </>
  );
}
