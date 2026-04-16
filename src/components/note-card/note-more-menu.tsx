"use client";

import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { createCopies, deleteNotes, toggleNoteType } from "@/lib/actions/note";
import { ChevronRight, EllipsisVertical, X } from "lucide-react";
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

  const handleClose = () => {
    setIsOpen(false);
    setShowLabel(false);
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.slice(0, 50));
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
        // isOpen={noteId === "89cc668b-4188-4896-a5f1-74e24ca1d293" || isOpen}
        isOpen={isOpen}
        handleOpen={toggleOpen}
        handleClose={handleClose}
        fixed={fixed}
      >
        <div className="w-full xs:w-[225px]">
          {/* {showLabel || noteId === "89cc668b-4188-4896-a5f1-74e24ca1d293" ? ( */}
          {showLabel ? (
            <div className="pt-2">
              <div className="px-4 ">
                <h1 className="text-txt-secondary font-bold">Add label</h1>
              </div>
              <LabelList noteId={noteId} searchValue={searchValue} />
              <CreateLabel
                customRef={inputLabelRef}
                searchValue={searchValue}
                handleChangeValue={handleChangeValue}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <form
                action={() => startTransition(() => toggleNoteType(noteId))}
              >
                <button className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start">
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
              <form
                action={() => startTransition(() => createCopies([noteId]))}
              >
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
              <form action={() => startTransition(() => deleteNotes([noteId]))}>
                <button className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex justify-start">
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
