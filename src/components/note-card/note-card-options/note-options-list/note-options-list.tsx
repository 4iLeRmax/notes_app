"use client";

import {
  ArrowRight,
  ChevronRight,
  Copy,
  Files,
  FileText,
  ListTodo,
  ListX,
  SquareX,
  Tags,
  Trash,
  X,
} from "lucide-react";
import React from "react";
import NoteOptionsListItem from "./note-options-list-item";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { toast } from "@/lib/toast";
import { vibrate } from "@/lib/haptics";
import NoteColors from "./note-colors/note-colors";

interface NoteOptionsListProps {
  noteId: string;
  toggleShowLabel: () => void;
  handleClose: () => void;
}

export default function NoteOptionsList({
  noteId,
  toggleShowLabel,
  handleClose,
}: NoteOptionsListProps) {
  const currentNote = useNotesStore((s) =>
    s.notes.find((n) => n.id === noteId),
  );
  if (!currentNote) return null;
  const noteType = currentNote.type;

  const toggleNoteTypes = useNotesStore((s) => s.toggleNoteTypes);
  const addCopies = useNotesStore((s) => s.addCopies);
  const removeNotes = useNotesStore((s) => s.removeNotes);
  const unmarkedAllItems = useNotesStore((s) => s.unmarkedAllItems);
  const deleteMarkedItems = useNotesStore((s) => s.deleteMarkedItems);

  if (!currentNote) return null;

  const handleCopyContent = () => {
    navigator.clipboard.writeText(
      currentNote.content.map((item) => item.content).join("\n"),
    );
    handleClose();
    toast.success("Successfully copied to clipboard");
  };

  return (
    <>
      <div className="flex flex-col items-start gap-2 xs:gap-0 py-4 xs:py-0">
        <NoteOptionsListItem
          onClick={() => {
            // console.log("todo/text");
            toggleNoteTypes([noteId]);
          }}
          icon={
            noteType === "TEXT" ? (
              <ListTodo size={20} className="flex xs:hidden" />
            ) : (
              <FileText size={20} className="flex xs:hidden" />
            )
          }
        >
          {noteType === "TEXT" ? "List" : "Text"}
        </NoteOptionsListItem>

        <NoteOptionsListItem onClick={toggleShowLabel}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tags size={20} className="flex xs:hidden" />
              <span>Add label</span>
            </div>
            <ChevronRight size={20} />
          </div>
        </NoteOptionsListItem>

        <NoteColors noteId={noteId} />

        <NoteOptionsListItem
          onClick={() => addCopies([noteId])}
          icon={<Files size={20} className="flex xs:hidden" />}
        >
          Create copy
        </NoteOptionsListItem>
        <NoteOptionsListItem
          onClick={handleCopyContent}
          icon={<Copy size={20} className="flex xs:hidden" />}
        >
          Copy text
        </NoteOptionsListItem>

        {noteType === "TODO" ? (
          <>
            <NoteOptionsListItem
              onClick={() => unmarkedAllItems(noteId)}
              icon={<SquareX size={20} className="flex xs:hidden" />}
            >
              Unmarked all items
            </NoteOptionsListItem>
            <NoteOptionsListItem
              onClick={() => deleteMarkedItems(noteId)}
              icon={<ListX size={20} className="flex xs:hidden" />}
            >
              Delete marked items
            </NoteOptionsListItem>
          </>
        ) : null}
        <NoteOptionsListItem
          onClick={() => {
            vibrate([20, 30, 20]);
            removeNotes([noteId]);
            // closeNote();
          }}
          icon={<Trash size={20} className="flex xs:hidden" />}
        >
          Delete
        </NoteOptionsListItem>
      </div>
    </>
  );
}
