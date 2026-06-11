"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { EllipsisVertical, X } from "lucide-react";
import More from "@/components/UI/more";
import SelectNotesOptionsList from "./select-notes-options-list";
import { useNotesStore } from "@/lib/store/useNotesStore";

interface NoteMoreMenu {
  noteIds: string[];
  fixed?: boolean;
}

function SelectNotesOptions({ noteIds, fixed }: NoteMoreMenu) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const isPending = useNotesStore((s) => s.isPending);

  const createLabelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showLabel) {
      createLabelRef.current?.focus();
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
  const handleClose = () => {
    setIsOpen(false);
    setShowLabel(false);
  };

  return (
    <>
      <More
        btnChildren={
          <EllipsisVertical
            size={25}
            className="m-1 text-txt-primary hover:text-custom-blue"
          />
        }
        isOpen={isOpen}
        handleOpen={toggleOpen}
        handleClose={handleClose}
        fixed={fixed}
        bgSecondaryForBtn
      >
        <div className="w-[225px]">
          {/* {showLabel || noteId === "1010e472-07d0-4f83-b4de-892e07f2b00d" ? ( */}
          {showLabel ? (
            <>
              {/* <div className="pt-2">
                <div className="px-4 ">
                  <h1 className="text-txt-secondary font-bold">Add label</h1>
                </div>
                <LabelList noteId={noteId} />
                <CreateLabel customRef={createLabelRef} />
              </div> */}
            </>
          ) : (
            <SelectNotesOptionsList noteIds={noteIds} />
          )}
        </div>
      </More>
    </>
  );
}

export default React.memo(SelectNotesOptions);
