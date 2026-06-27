"use client";

import { useAutoSubmit } from "@/hooks/useAutoSubmit";
import { updateNoteItem } from "@/lib/actions/note-item";
import { NOTE_LIMITS } from "@/lib/constants";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface NoteViewListItemContentProps {
  noteId: string;
  listItemId: string;
  content: string;
  isDone: boolean;
}

export default function NoteViewListItemContent({
  noteId,
  listItemId,
  content,
  isDone,
}: NoteViewListItemContentProps) {
  const updateNoteItemContent = useNotesStore(
    (state) => state.updateNoteItemContent,
  );
  const focusedItemId = useNotesStore((s) => s.focusedItemId);
  const setFocusedItemId = useNotesStore((s) => s.setFocusedItemId);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (focusedItemId === listItemId) {
      textareaRef.current?.focus();
      setFocusedItemId(null);
    }
  }, [focusedItemId, listItemId, setFocusedItemId]);

  const { value, setValue, isPending } = useAutoSubmit(
    (text) => updateNoteItemContent(noteId, listItemId, text),
    content,
  );

  return (
    <>
      <div className="flex items-center gap-2 min-h-7 w-full min-w-0">
        {!isDone ? (
          <textarea
            name="text"
            value={value}
            ref={textareaRef}
            onChange={(e) =>
              setValue(
                e.target.value.slice(0, NOTE_LIMITS.TODO.maxCharsPerItem),
              )
            }
            placeholder="Type something..."
            className="w-full overflow-hidden outline-none resize-none field-sizing-content break-all px-2 py-3"
          />
        ) : (
          <div className="w-full overflow-hidden line-through break-all px-2 py-3">
            {content}
          </div>
        )}
      </div>
    </>
  );
}
