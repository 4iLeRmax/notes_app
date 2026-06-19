"use client";

import { useAutoSubmit } from "@/hooks/useAutoSubmit";
import { updateNoteTitle } from "@/lib/actions/note";
import cn from "@/lib/cn";
import { NOTE_LIMITS } from "@/lib/constants";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { Loader2, X } from "lucide-react";
import React, { useState } from "react";

export default function NoteViewTitleForm({
  title: defaultTitle,
  noteId,
}: {
  title: string;
  noteId: string;
}) {
  const updateTitle = useNotesStore((s) => s.updateTitle);

  const { value, setValue, isPending } = useAutoSubmit<string>(
    (title: string) => updateTitle(noteId, title),
    defaultTitle,
  );

  return (
    <>
      <div className="flex items-center gap-4 relative mt-2 group/button">
        <input
          type="text"
          name="title"
          value={value}
          onChange={(e) =>
            setValue(e.target.value.slice(0, NOTE_LIMITS.MAX_TITLE_CHARS))
          }
          className={cn(
            "text-xl w-full outline-none font-bold px-4 py-2 rounded-4xl cursor-text",
            "text-txt-secondary cursor-pointer",
            "focus:shadow-inside focus:text-txt-primary focus:bg-secondary xs:focus:bg-primary focus:pr-12",
          )}
          placeholder="Title..."
        />
        <button
          type="button"
          className="absolute z-10 top-1.5 right-4 text-txt-primary p-1.5 hidden group-focus-within/button:flex"
          onMouseDown={(e) => {
            e.preventDefault();
            setValue("");
          }}
        >
          <X size={20} />
        </button>
      </div>
    </>
  );
}
