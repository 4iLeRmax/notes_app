"use client";

import { useAutoSubmit } from "@/hooks/useAutoSubmit";
import { updateNoteText } from "@/lib/actions/note";
import cn from "@/lib/cn";
import { Copy, Loader2 } from "lucide-react";
import React, { useState } from "react";
import CopyBtn from "../UI/copy-btn";

interface NoteViewTextareaProps {
  noteId: string;
  list: NoteItem[];
}

export default function NoteViewTextarea({
  list,
  noteId,
}: NoteViewTextareaProps) {
  const [focused, setFocused] = useState(false);

  const { value, setValue, isPending } = useAutoSubmit(
    (text) => updateNoteText(noteId, text),
    list.map((item) => item.content).join("\n"),
    500,
  );

  return (
    <>
      <div className="relative flex">
        <textarea
          className={cn(
            "w-full outline-none resize-none field-sizing-content rounded-3xl p-4",
            {
              "shadow-inside bg-secondary": focused,
            },
          )}
          name="text"
          id="myTextArea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
        {true && !isPending ? (
          <div className="absolute right-4 top-4">
            <CopyBtn value={value} />
          </div>
        ) : null}
      </div>
    </>
  );
}
