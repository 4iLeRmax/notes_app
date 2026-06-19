"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { EllipsisVertical, X } from "lucide-react";
import More from "@/components/UI/more";
import SelectNotesOptionsList from "./select-notes-options-list";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { vibrate } from "@/lib/haptics";
import cn from "@/lib/cn";

interface NoteMoreMenu {
  noteIds: string[];
}

function SelectNotesOptions({ noteIds }: NoteMoreMenu) {
  const [isOpen, setIsOpen] = useState(false);
  const isPending = useNotesStore((s) => s.isPending);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isPending) handleClose();
  }, [isPending]);

  const toggleOpen = () => {
    vibrate(10);
    if (isOpen) {
      setIsOpen(false);
    } else setIsOpen(true);
  };

  return (
    <>
      <More
        iconSize={25}
        isOpen={isOpen}
        handleOpen={toggleOpen}
        handleClose={handleClose}
        fixed
        customClassName={cn(
          " p-2 outline-none rounded-full transition-colors bg-secondary",
          {
            "shadow-outside-small text-txt-primary hover:text-custom-blue":
              !isOpen,
            "shadow-inside text-custom-blue": isOpen,
          },
        )}
      >
        <div className="w-full py-4 xs:py-0">
          <SelectNotesOptionsList noteIds={noteIds} />
        </div>
      </More>
    </>
  );
}

export default React.memo(SelectNotesOptions);
