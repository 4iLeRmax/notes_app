"use client";

import cn from "@/lib/cn";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { TCreateNote } from "@/lib/zod-schemes/note-schemes/create-note.scheme";
import { CreateLocalNote } from "./create-note";
import { Plus } from "lucide-react";
import { NOTE_LIMITS } from "@/lib/constants";

interface CreateNoteTextareaProps {
  content: CreateLocalNote["content"];
  setNote: React.Dispatch<React.SetStateAction<CreateLocalNote>>;
}

export default function CreateNoteTextarea({
  content,
  setNote,
}: CreateNoteTextareaProps) {
  const contentToText = content.map((el) => el.content).join("\n");
  const textToObj = (text: string) => {
    const content: CreateLocalNote["content"] =
      text === ""
        ? []
        : text
            .slice(0, NOTE_LIMITS.TEXT.totalChars)
            .split("\n")
            .slice(0, NOTE_LIMITS.TEXT.maxItems)
            .map((el, i) => ({
              id: crypto.randomUUID(),
              content: el.slice(0, NOTE_LIMITS.TEXT.maxCharsPerItem),
              isDone: false,
              position: i,
            }));

    setNote((n) => ({ ...n, content }));
  };

  return (
    <>
      <textarea
        value={contentToText}
        onChange={(e) => textToObj(e.target.value)}
        placeholder="Type something..."
        className={cn(
          "outline-none resize-none overflow-hidden field-sizing-content bg-primary min-h-12 max-h-60",
          "placeholder:text-txt-primary shadow-inside px-4 py-3 rounded-3xl text-txt-primary w-full",
        )}
      />
    </>
  );
}
