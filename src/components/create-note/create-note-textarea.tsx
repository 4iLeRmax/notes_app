"use client";

import cn from "@/lib/cn";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { TCreateNote } from "@/lib/zod-schemes/note-schemes/create-note.scheme";
import { CreateLocalNote } from "./create-note";
import { Plus } from "lucide-react";

interface CreateNoteTextareaProps {
  content: CreateLocalNote["content"];
  setNote: React.Dispatch<React.SetStateAction<CreateLocalNote>>;
  formIsOpen: boolean;
}

export default function CreateNoteTextarea({
  content,
  setNote,
  formIsOpen,
}: CreateNoteTextareaProps) {
  const contentToText = content.map((el) => el.content).join("\n");
  const textToObj = (text: string) => {
    const content: CreateLocalNote["content"] = text
      .split("\n")
      .map((el, i) => ({
        id: crypto.randomUUID(),
        content: el,
        isDone: false,
        position: i,
      }));

    setNote((n) => ({ ...n, content }));
  };

  return (
    <>
      {/* <motion.textarea
        animate={
          {
            // maxHeight: formIsOpen ? "552px" : "48px",
            // padding: formIsOpen ? "12px 16px" : "8.5px 16px",
          }
        }
        value={contentToText}
        onChange={(e) => textToObj(e.target.value)}
        placeholder="Type something..."
        className={cn(
          "outline-none resize-none overflow-hidden field-sizing-content bg-primary min-h-12 max-h-60",
          "placeholder:text-txt-primary shadow-inside px-4 py-3 rounded-3xl text-txt-primary w-full",
        )}
      />
      <motion.div
        animate={{ width: formIsOpen ? "0" : "52px" }}
        className="shrink-0"
      ></motion.div> */}
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
