"use client";

import { useAutoSubmit } from "@/hooks/useAutoSubmit";
import { updateNoteItem } from "@/lib/actions/note-item";
import { Loader2 } from "lucide-react";

interface NoteViewListItemContentProps {
  listItemId: string;
  content: string;
  isDone: boolean;
  hovered: boolean;
}

export default function NoteViewListItemContent({
  listItemId,
  content,
  isDone,
  hovered,
}: NoteViewListItemContentProps) {
  const { value, setValue, isPending } = useAutoSubmit(
    (text) => updateNoteItem(listItemId, text),
    content,
  );

  return (
    <>
      <div className="flex items-center justify-center gap-2 min-h-7 w-full min-w-0">
        {!isDone ? (
          <textarea
            name="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full overflow-hidden outline-none resize-none field-sizing-content py-4"
          />
        ) : (
          <div className="w-full overflow-hidden line-through">{content}</div>
        )}
        {isPending ? (
          <div className="">
            <Loader2
              size={20}
              className="animate-spin shrink-0 text-txt-primary"
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
