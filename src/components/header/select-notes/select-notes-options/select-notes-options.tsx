"use client";

import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  createCopies,
  deleteNotes,
  toggleManyNoteTypes,
  toggleNoteType,
} from "@/lib/actions/note";
import { ChevronRight, EllipsisVertical, X } from "lucide-react";
import { deleteAllMarkedItems, removeAllMarks } from "@/lib/actions/note-item";
import More from "@/components/UI/more";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import SelectNotesOptionsList from "./select-notes-options-list";

interface NoteMoreMenu {
  noteIds: string[];
  fixed?: boolean;
}

export default function SelectNotesOptions({ noteIds, fixed }: NoteMoreMenu) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { removeAll } = useSelectedNotesStore();

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
          <EllipsisVertical size={25} className="m-1 text-txt-primary" />
        }
        // isOpen={noteId === "1010e472-07d0-4f83-b4de-892e07f2b00d" || isOpen}
        isOpen={isOpen}
        handleOpen={toggleOpen}
        handleClose={handleClose}
        fixed={fixed}
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
            <SelectNotesOptionsList
              noteIds={noteIds}
              startTransition={startTransition}
              removeAll={removeAll}
            />
          )}
        </div>
      </More>
    </>
  );
}
