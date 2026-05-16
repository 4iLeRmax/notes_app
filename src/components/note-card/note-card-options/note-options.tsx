"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { EllipsisVertical, X } from "lucide-react";
import More from "../../UI/more";
import NoteOptionsList from "./note-options-list/note-options-list";
import NoteLabelsEdit from "./note-labels-edit/note-labels-edit";

interface NoteMoreMenu {
  noteId: string;
  fixed?: boolean;
}

export default function NoteOptions({ noteId, fixed }: NoteMoreMenu) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState("");

  const inputLabelRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showLabel) {
      inputLabelRef.current?.focus();
    }
  }, [showLabel]);

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

  const handleClose = () => {
    setIsOpen(false);
    setShowLabel(false);
  };

  return (
    <>
      <More
        btnChildren={
          isOpen ? (
            <X size={20} className="text-txt-primary" />
          ) : (
            <EllipsisVertical size={20} />
          )
        }
        isOpen={isOpen}
        handleOpen={toggleOpen}
        handleClose={handleClose}
        fixed={fixed}
      >
        <div className="w-[calc(100vw/2-24px-8px)] sm:w-[225px]">
          {showLabel ? (
            <NoteLabelsEdit
              noteId={noteId}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              inputLabelRef={inputLabelRef}
            />
          ) : (
            <NoteOptionsList
              noteId={noteId}
              startTransition={startTransition}
              toggleShowLabel={toggleShowLabel}
            />
          )}
        </div>
      </More>
    </>
  );
}
