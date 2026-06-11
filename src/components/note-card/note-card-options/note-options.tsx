"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { EllipsisVertical, X } from "lucide-react";
import More from "../../UI/more";
import NoteOptionsList from "./note-options-list/note-options-list";
import NoteLabelsEdit from "./note-labels-edit/note-labels-edit";
import { useNotesStore } from "@/lib/store/useNotesStore";

interface NoteMoreMenu {
  noteId: string;
  fixed?: boolean;
}

export default function NoteOptions({ noteId, fixed }: NoteMoreMenu) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const isPending = useNotesStore((s) => s.isPending);

  const handleClose = () => {
    setIsOpen(false);
    setShowLabel(false);
  };

  useEffect(() => {
    if (isPending) handleClose();
  }, [isPending]);

  const toggleOpen = () => {
    if (isOpen) {
      setIsOpen(false);
      setShowLabel(false);
    } else setIsOpen(true);
  };

  const toggleShowLabel = () => {
    setShowLabel((p) => !p);
  };

  return (
    <>
      <More
        btnChildren={isOpen ? <X size={20} /> : <EllipsisVertical size={20} />}
        isOpen={isOpen}
        handleOpen={toggleOpen}
        handleClose={handleClose}
        fixed={fixed}
      >
        <div className="w-full">
          {showLabel ? (
            <NoteLabelsEdit noteId={noteId} />
          ) : (
            <NoteOptionsList
              noteId={noteId}
              toggleShowLabel={toggleShowLabel}
              handleClose={handleClose}
            />
          )}
        </div>
      </More>
    </>
  );
}
