"use client";

import { deleteNoteItem } from "@/lib/actions/note-item";
import cn from "@/lib/cn";
import { X } from "lucide-react";
import React from "react";

interface NoteViewListItemDeleteBtnProps {
  listItemId: string;
  hovered: boolean;
}

export default function NoteViewListItemDeleteBtn({
  listItemId,
  hovered,
}: NoteViewListItemDeleteBtnProps) {
  return (
    <>
      {hovered ? (
        <form
          action={deleteNoteItem.bind(null, listItemId)}
          className="flex h-full py-4 pr-4"
        >
          <button className="p-1.5">
            <X size={20} />
          </button>
        </form>
      ) : null}
    </>
  );
}
