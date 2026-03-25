"use client";

import cn from "@/lib/cn";
import clsx from "clsx";
import React from "react";

interface CreateNoteTextareaProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  formIsOpen: boolean;
}

export default function CreateNoteTextarea({
  value,
  handleChange,
  formIsOpen,
}: CreateNoteTextareaProps) {
  return (
    <div
      className={cn("w-full", {
        "max-h-12 px-4": !formIsOpen,
        "max-h-[552px] px-8": formIsOpen,
      })}
    >
      <textarea
        name="content"
        value={value}
        onChange={handleChange}
        placeholder="New Note..."
        className={cn(
          "outline-none resize-none overflow-hidden field-sizing-content",
          "placeholder:text-txt-primary shadow-inside px-4 py-3 rounded-3xl text-txt-primary",
          {
            "w-[calc(100%-36px-10px-16px)] max-h-12": !formIsOpen,
            "w-full min-h-36 max-h-[552px]": formIsOpen,
          },
        )}
      />
    </div>
  );
}
