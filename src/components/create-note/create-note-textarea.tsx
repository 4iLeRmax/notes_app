"use client";

import cn from "@/lib/cn";
import React from "react";
import { motion } from "motion/react";
import { TCreateNote } from "@/lib/zod-schemes/note-schemes/create-note.scheme";
import { CreateLocalNote } from "./create-note";

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
    const content = text
      .split("\n")
      .map((el, i) => ({ content: el, isDone: false, index: i }));

    setNote((n) => ({ ...n, content }));
  };

  return (
    <motion.div
      className={cn("w-full flex", {
        "px-4": !formIsOpen,
        "px-4 md:px-8": formIsOpen,
      })}
      animate={{
        width: "100%",
        maxHeight: formIsOpen ? "552px" : "48px",
      }}
      // transition={{ delay: 0.3 }}
    >
      <motion.textarea
        value={contentToText}
        onChange={(e) => textToObj(e.target.value)}
        placeholder="Type something..."
        className={cn(
          "outline-none resize-none overflow-hidden field-sizing-content bg-primary",
          "placeholder:text-txt-primary shadow-inside px-4 py-3 rounded-3xl text-txt-primary w-full",
        )}
        animate={{
          width: "100%",
          minHeight: formIsOpen ? "144px" : "48px",
          maxHeight: formIsOpen ? "552px" : "48px",
        }}
        // transition={{ duration: 2 }}
      />
      {!formIsOpen ? <div className="w-[52px] shrink-0"></div> : null}
    </motion.div>
  );
}
