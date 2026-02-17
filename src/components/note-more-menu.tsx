"use client";

import React, {
  Activity,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import More from "./UI/more";
import { createCopy, deleteNote, toggleNoteType } from "@/lib/actions/note";
import { EllipsisVertical } from "lucide-react";
import CreateLabel from "./label/create-label";
import { deleteAllMarkedItems, removeAllMarks } from "@/lib/actions/note-item";

interface NoteMoreMenu {
  noteId: string;
  fixed?: boolean;
}

export default function NoteMoreMenu({ noteId, fixed }: NoteMoreMenu) {
  console.log("render: NOTE MORE MENU");

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
        isOpen={isOpen}
        handleOpen={toggleOpen}
        handleClose={handleClose}
        fixed={fixed}
      >
        {showLabel ? (
          <CreateLabel customRef={createLabelRef} noteId={noteId} />
        ) : (
          <div className="flex flex-col">
            <form action={() => startTransition(() => toggleNoteType(noteId))}>
              <button className="w-full hover:bg-gray-300 px-4 py-2 flex justify-start">
                TODO/TEXT
              </button>
            </form>
            <button
              className="w-full hover:bg-gray-300 px-4 py-2 flex justify-start"
              onClick={() => setShowLabel((p) => !p)}
            >
              Create Label
            </button>
            <form action={() => startTransition(() => createCopy(noteId))}>
              <button className="w-full hover:bg-gray-300 px-4 py-2 flex justify-start">
                Create copy
              </button>
            </form>
            <form action={() => startTransition(() => removeAllMarks(noteId))}>
              <button className="w-full hover:bg-gray-300 px-4 py-2 flex justify-start">
                Remove all marks
              </button>
            </form>
            <form
              action={() => startTransition(() => deleteAllMarkedItems(noteId))}
            >
              <button className="w-full hover:bg-gray-300 px-4 py-2 flex justify-start">
                Delete all marked items
              </button>
            </form>
            <form action={() => startTransition(() => deleteNote(noteId))}>
              <button className="w-full hover:bg-gray-300 px-4 py-2 flex justify-start">
                Delete
              </button>
            </form>
          </div>
        )}
      </More>
    </>
  );
}
