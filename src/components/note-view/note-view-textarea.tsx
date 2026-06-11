"use client";

import { useAutoSubmit } from "@/hooks/useAutoSubmit";
import cn from "@/lib/cn";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import CopyBtn from "../UI/copy-btn";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { NOTE_LIMITS } from "@/lib/constants";

interface NoteViewTextareaProps {
  noteId: string;
  list: NoteItem[];
}

export default function NoteViewTextarea({
  list,
  noteId,
}: NoteViewTextareaProps) {
  const [focused, setFocused] = useState(false);
  const updateNoteContent = useNotesStore((s) => s.updateNoteContent);

  const { value, setValue, isPending } = useAutoSubmit(
    (text) => updateNoteContent(noteId, text),
    list.map((item) => item.content).join("\n"),
    500,
  );

  return (
    <>
      <div className="relative flex">
        <textarea
          className={cn(
            "w-full outline-none resize-none field-sizing-content break-all rounded-3xl p-4",
            {
              "shadow-inside bg-secondary": focused,
            },
          )}
          name="text"
          id="myTextArea"
          value={value}
          onChange={(e) =>
            setValue(e.target.value.slice(0, NOTE_LIMITS.TEXT.totalChars))
          }
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Type something..."
        ></textarea>
        {isPending ? (
          <div className="absolute right-4 bottom-4">
            <Loader2
              size={24}
              className="animate-spin shrink-0 text-txt-primary"
            />
          </div>
        ) : null}
      </div>
      <div className="mt-2 flex items-center justify-end text-sm">
        <div className="flex items-center gap-1">
          <span>{value.length}</span>
          <span>/</span>
          <span>{NOTE_LIMITS.TEXT.totalChars}</span>
        </div>
      </div>
    </>
  );
}
