"use client";

import { useAutoSubmit } from "@/hooks/useAutoSubmit";
import { updateNoteTitle } from "@/lib/actions/note";
import cn from "@/lib/cn";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

export default function NoteViewTitleForm({
  title: defaultTitle,
  noteId,
}: {
  title: string;
  noteId: string;
}) {
  const [focused, setFocused] = useState(false);

  const { value, setValue, isPending } = useAutoSubmit<string>(
    (title: string) => updateNoteTitle(noteId, title),
    defaultTitle,
  );

  return (
    <>
      <div className="flex items-center gap-4 relative">
        <input
          type="text"
          name="title"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "text-xl w-full outline-none font-bold px-4 py-2 rounded-4xl pr-[52px] ",
            {
              "text-txt-secondary hover:text-txt-primary cursor-pointer":
                !focused && defaultTitle === value,
              "shadow-inside text-txt-primary cursor-text bg-secondary":
                focused || defaultTitle !== value,
            },
          )}
          placeholder="Title..."
        />
        {isPending ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
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
