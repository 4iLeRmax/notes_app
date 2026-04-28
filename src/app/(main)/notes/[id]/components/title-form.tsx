"use client";

import FormInput from "@/components/UI/formElements/form-input";
import { updateNoteTitle } from "@/lib/actions/note";
import cn from "@/lib/cn";
import { DEBOUNCE_VALUE } from "@/lib/constants";
import clsx from "clsx";
import { Loader, Loader2, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function TitleForm({
  title,
  noteId,
}: {
  title: string;
  noteId: string;
}) {
  const [value, setValue] = useState(title);
  const [focused, setFocused] = useState(false);
  const [debouncedValue] = useDebounce(value, DEBOUNCE_VALUE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", debouncedValue);
      await updateNoteTitle(noteId, formData);
    } catch (error) {
      console.error("Failed to update note title:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [debouncedValue]);

  return (
    <>
      <div
        // form
        // action={updateNoteTitle.bind(null, noteId)}
        className="flex items-center gap-4 relative"
      >
        <input
          type="text"
          name="title"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "text-xl w-full outline-none font-bold px-4 py-2 rounded-2xl pr-[52px] ",
            {
              "text-txt-secondary hover:text-txt-primary cursor-pointer":
                !focused && title === value,
              "shadow-inside text-txt-primary cursor-text bg-secondary":
                focused || title !== value,
            },
          )}
          placeholder="Title..."
        />
        {isSubmitting ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Loader2
              size={20}
              className="animate-spin shrink-0 text-txt-primary"
            />
          </div>
        ) : null}
        {/* {title !== value ? (
          <button className="p-2 shadow-outside-small text-txt-secondary rounded-full">
            <Upload size={20} />
          </button>
        ) : null} */}
      </div>
    </>
  );
}
