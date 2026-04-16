"use client";

import FormInput from "@/components/UI/formElements/form-input";
import { updateNoteTitle } from "@/lib/actions/note";
import cn from "@/lib/cn";
import clsx from "clsx";
import { Upload } from "lucide-react";
import React, { useState } from "react";

export default function TitleForm({
  title,
  noteId,
}: {
  title: string;
  noteId: string;
}) {
  const [value, setValue] = useState(title);
  const [focused, setFocused] = useState(false);

  return (
    <>
      <form
        action={updateNoteTitle.bind(null, noteId)}
        className="flex items-center gap-4"
      >
        <input
          type="text"
          name="title"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "text-xl w-full outline-none font-bold px-4 py-2 rounded-2xl ",
            {
              "text-txt-secondary hover:text-txt-primary cursor-pointer":
                !focused && title === value,
              "shadow-inside text-txt-primary cursor-text":
                focused || title !== value,
            },
          )}
          placeholder="Title..."
        />
        {title !== value ? (
          <button className="p-2 shadow-outside-small text-txt-secondary rounded-full">
            <Upload size={20} />
          </button>
        ) : null}
      </form>
    </>
  );
}
