"use client";

import { toggleNoteItemStatus } from "@/lib/actions/note-item";
import { Check, Circle, CircleCheck } from "lucide-react";

interface NoteViewListItemStatusBtnProps {
  listItemId: string;
  isDone: boolean;
  size?: number;
}

export default function NoteViewListItemStatusBtn({
  listItemId,
  isDone,
  size = 36,
}: NoteViewListItemStatusBtnProps) {
  return (
    <>
      <form
        action={toggleNoteItemStatus.bind(null, listItemId, isDone)}
        className="flex items-center py-4 pl-4"
      >
        <button className="rounded-full bg-txt-primary/50 text-primary flex items-center justify-center">
          {isDone ? <CircleCheck size={size} /> : <Circle size={size} />}
        </button>
      </form>
    </>
  );
}
