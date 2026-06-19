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
  const updateNoteContent = useNotesStore((s) => s.updateNoteContent);

  const { value, setValue, isPending } = useAutoSubmit(
    (text) => updateNoteContent(noteId, text),
    list.map((item) => item.content).join("\n"),
    500,
  );

  return (
    <>
      <div className="pl-4 pr-2 sm:pl-8 sm:pr-6">
        <textarea
          className={cn(
            "w-full outline-none resize-none field-sizing-content break-all rounded-3xl p-4",
            "xs:focus:shadow-inside xs:focus:bg-primary",
          )}
          name="text"
          id="myTextArea"
          value={value}
          onChange={(e) =>
            setValue(e.target.value.slice(0, NOTE_LIMITS.TEXT.totalChars))
          }
          placeholder="Type something..."
        ></textarea>
      </div>
      <div className="mt-5 flex items-center justify-end text-sm px-4 sm:px-8">
        <div className="flex items-center gap-1">
          <span>{value.length}</span>
          <span>/</span>
          <span>{NOTE_LIMITS.TEXT.totalChars}</span>
        </div>
      </div>
    </>
  );
}
