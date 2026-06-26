"use client";

import { createNoteItem } from "@/lib/actions/note-item";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { Plus } from "lucide-react";
import React, { useRef } from "react";

interface NoteViewCreateItemBtnProps {
  listLength: number;
  handleCreateItem: () => Promise<void>;
}

export default function NoteViewCreateItemBtn({
  listLength,
  handleCreateItem,
}: NoteViewCreateItemBtnProps) {
  return (
    <>
      <div className="px-4 sm:px-8 select-none">
        <button
          onClick={handleCreateItem}
          className="flex items-center gap-1 text-txt-secondary ml-5 mt-5"
        >
          <Plus size={20} />
          <span>{listLength === 0 ? "Create first item" : "Create item"}</span>
        </button>
      </div>
    </>
  );
}
