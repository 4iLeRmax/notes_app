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
import { ChevronRight, EllipsisVertical } from "lucide-react";
import { deleteAllMarkedItems, removeAllMarks } from "@/lib/actions/note-item";
import More from "@/components/UI/more";
import CreateLabel from "@/components/note-card/label/create-label/create-label";
import LabelList from "@/components/note-card/label/label-list/label-list";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";

interface NoteMoreMenu {
  noteIds: string[];
  fixed?: boolean;
}

export default function SelectNotesMoreMenu({ noteIds, fixed }: NoteMoreMenu) {
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
            <div className="flex flex-col">
              <form
                action={(e) => {
                  startTransition(() => toggleManyNoteTypes(noteIds));
                }}
              >
                <button
                  onClick={(e: any) => e.stopPropagation()}
                  className="rounded-ss-xl rounded-se-xl w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start"
                >
                  TODO/TEXT
                </button>
              </form>
              {/*<button
                className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-between items-center"
                onClick={() => setShowLabel((p) => !p)}
              >
                <span>Add Label</span>
                <ChevronRight size={20} />
              </button>*/}
              <form action={() => startTransition(() => createCopies(noteIds))}>
                <button onClick={(e: any) => e.stopPropagation()} className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start">
                  Create copy
                </button>
              </form>
              {/*<form
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
              </form> */}
              <form
                action={() =>
                  startTransition(async () => {
                    await deleteNotes(noteIds);
                    removeAll();
                  })
                }
              >
                <button onClick={(e: any) => e.stopPropagation()} className="rounded-es-xl rounded-ee-xl w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start">
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
