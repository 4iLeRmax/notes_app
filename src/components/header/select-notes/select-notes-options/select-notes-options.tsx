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
        isOpen={isOpen}
        handleOpen={toggleOpen}
        handleClose={handleClose}
        fixed
        buttonContent={
          <div
            className={cn(
              " p-2 outline-none rounded-full transition-colors bg-secondary",
              {
                "shadow-outside text-txt-primary hover:text-custom-blue":
                  !isOpen,
                "shadow-inside text-custom-blue": isOpen,
              },
            )}
          >
            {isOpen ? <X size={25} /> : <EllipsisVertical size={25} />}
          </div>
        }
      >
        <div
          className="w-full overflow-hidden rounded-ss-4xl rounded-se-4xl xs:rounded-3xl bg-secondary xs:bg-primary shadow-outside-small"
          data-select-options
        >
          <SelectNotesOptionsList noteIds={noteIds} />
        </div>
      </More>
    </>
  );
}

export default React.memo(SelectNotesOptions);
