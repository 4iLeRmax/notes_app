"use client";

import cn from "@/lib/cn";
import { vibrate } from "@/lib/haptics";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { CheckSquare, Square } from "lucide-react";

interface NoteViewListItemStatusBtnProps {
  noteId: string;
  listItemId: string;
  isDone: boolean;
  iconSize?: number;
}

export default function NoteViewListItemStatusBtn({
  noteId,
  listItemId,
  isDone,
  iconSize = 20,
}: NoteViewListItemStatusBtnProps) {
  const toggleItemStatus = useNotesStore((s) => s.toggleItemStatus);

  const handleToggle = async () => {
    vibrate(10);
    await toggleItemStatus(noteId, listItemId);
  };

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={handleToggle}
          className={cn(
            "rounded-full p-1.5 flex items-center justify-center bg-primary",
            "group-focus-within:bg-secondary group-hover:bg-secondary group/button",
            {
              "shadow-outside-small": !isDone,
              "shadow-inside": isDone,
            },
          )}
        >
          <CheckSquare
            size={iconSize}
            className={cn("text-custom-blue", {
              "block group-hover/button:hidden": isDone,
              "hidden group-hover/button:block": !isDone,
            })}
          />
          <Square
            size={iconSize}
            className={cn("text-custom-blue", {
              "block group-hover/button:hidden": !isDone,
              "hidden group-hover/button:block": isDone,
            })}
          />
        </button>
      </div>
    </>
  );
}
