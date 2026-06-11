"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useNotesStore } from "@/lib/store/useNotesStore";
import cn from "@/lib/cn";

interface NoteCardLabelItemProps {
  label: Label;
  noteId: string;
}

export default function NoteCardLabelItem({
  label,
  noteId,
}: NoteCardLabelItemProps) {
  const [showButton, setShowButton] = useState(false);
  const toggleNoteLabel = useNotesStore((s) => s.toggleNoteLabel);

  const handleLink = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/labels/${label.id}`;
  };

  const handleRemoveLabel = async (e: React.FormEvent) => {
    e.preventDefault();
    await toggleNoteLabel(noteId, label.id);
  };

  return (
    <>
      <div
        onClick={handleLink}
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        className="bg-primary relative flex items-center min-w-12 max-w-full shadow-inside text-sm py-1 rounded-3xl cursor-pointer text-txt-primary"
      >
        <span
          className={cn("truncate pl-2 w-full", {
            "pr-5": !showButton,
          })}
        >
          {label.name}
        </span>
        <form onSubmit={handleRemoveLabel} className="flex items-center">
          {showButton ? (
            <button
              className="p-1 outline-none text-txt-secondary"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <X size={12} />
            </button>
          ) : null}
        </form>
      </div>
    </>
  );
}
