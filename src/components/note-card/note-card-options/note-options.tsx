"use client";

import React, { useEffect, useState } from "react";
import { EllipsisVertical, X } from "lucide-react";
import More from "../../UI/more";
import NoteOptionsList from "./note-options-list/note-options-list";
import NoteLabelsEdit from "./note-labels-edit/note-labels-edit";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { vibrate } from "@/lib/haptics";
import cn from "@/lib/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface NoteOptionsProps {
  noteId: string;
  fixed?: boolean;
}

export default function NoteOptions({ noteId, fixed }: NoteOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const clearNoteIdParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("noteId");

    router.push(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
      { scroll: false },
    );
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowLabel(false);
  };

  const toggleOpen = () => {
    vibrate(10);
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
        isOpen={isOpen}
        handleOpen={toggleOpen}
        handleClose={handleClose}
        fixed={fixed}
        buttonContent={
          <div
            className={cn("p-1.5 outline-none rounded-full transition-colors", {
              "shadow-outside-small text-txt-secondary hover:text-custom-blue":
                !isOpen,
              "shadow-inside text-custom-blue": isOpen,
              "bg-primary": !fixed,
              "bg-secondary xs:bg-primary": fixed,
            })}
          >
            {isOpen ? <X size={20} /> : <EllipsisVertical size={20} />}
          </div>
        }
      >
        <div className="w-full overflow-hidden rounded-ss-4xl rounded-se-4xl xs:rounded-3xl bg-secondary xs:bg-primary shadow-outside-small">
          {showLabel ? (
            <NoteLabelsEdit noteId={noteId} />
          ) : (
            <NoteOptionsList
              noteId={noteId}
              toggleShowLabel={toggleShowLabel}
              handleClose={handleClose}
              clearNoteIdParams={clearNoteIdParams}
            />
          )}
        </div>
      </More>
    </>
  );
}
