import { createNoteItem } from "@/lib/actions/note-item";
import { Plus } from "lucide-react";
import React from "react";

interface NoteViewCreateItemBtnProps {
  noteId: string;
  listLength: number;
}

export default function NoteViewCreateItemBtn({
  noteId,
  listLength,
}: NoteViewCreateItemBtnProps) {
  return (
    <>
      <form
        action={createNoteItem.bind(null, noteId, undefined)}
        className="ml-5 mt-5"
      >
        <button className="flex items-center gap-1 text-txt-secondary">
          <Plus size={20} />
          <span>{listLength === 0 ? "Create first item" : "Create item"}</span>
        </button>
      </form>
    </>
  );
}
