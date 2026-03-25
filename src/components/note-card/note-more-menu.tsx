"use client";

import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { createCopy, deleteNote, toggleNoteType } from "@/lib/actions/note";
import { ChevronRight, EllipsisVertical } from "lucide-react";
import { deleteAllMarkedItems, removeAllMarks } from "@/lib/actions/note-item";
import More from "../UI/more";
import LabelList from "./label/label-list/label-list";
import CreateLabel from "./label/create-label/create-label";

interface NoteMoreMenu {
  noteId: string;
  fixed?: boolean;
}

export default function NoteMoreMenu({ noteId, fixed }: NoteMoreMenu) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [isPending, startTransition] = useTransition();

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
        btnChildren={<EllipsisVertical size={20} />}
        // isOpen={noteId === "1010e472-07d0-4f83-b4de-892e07f2b00d" || isOpen}
        isOpen={isOpen}
        handleOpen={toggleOpen}
        handleClose={handleClose}
        fixed={fixed}
      >
        <div className="w-[225px]">
          {/* {showLabel || noteId === "1010e472-07d0-4f83-b4de-892e07f2b00d" ? ( */}
          {showLabel ? (
            <div className="pt-2">
              <div className="px-4 ">
                <h1 className="text-txt-secondary font-bold">Add label</h1>
              </div>
              <LabelList noteId={noteId} />
              <CreateLabel customRef={createLabelRef} />
            </div>
          ) : (
            <div className="flex flex-col">
              <form
                action={() => startTransition(() => toggleNoteType(noteId))}
              >
                <button className="rounded-ss-xl rounded-se-xl w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start">
                  TODO/TEXT
                </button>
              </form>
              <button
                className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-between items-center"
                onClick={() => setShowLabel((p) => !p)}
              >
                <span>Add Label</span>
                <ChevronRight size={20} />
              </button>
              <form action={() => startTransition(() => createCopy(noteId))}>
                <button className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start">
                  Create copy
                </button>
              </form>
              <form
                action={() => startTransition(() => removeAllMarks(noteId))}
              >
                <button className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start">
                  Remove all marks
                </button>
              </form>
              <form
                action={() =>
                  startTransition(() => deleteAllMarkedItems(noteId))
                }
              >
                <button className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start">
                  Delete all marked items
                </button>
              </form>
              <form action={() => startTransition(() => deleteNote(noteId))}>
                <button className="rounded-es-xl rounded-ee-xl w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start">
                  Delete
                </button>
              </form>
            </div>
          )}
        </div>
      </More>
    </>
  );
}
