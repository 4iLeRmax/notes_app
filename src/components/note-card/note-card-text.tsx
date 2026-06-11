"use client";

import React, { useMemo, useState } from "react";

import { NOTE_CARD_LIMITS } from "@/lib/constants";

interface NoteCardTextProps {
  noteContent: NoteItem[];
}

export default function NoteCardText({ noteContent }: NoteCardTextProps) {
  const formatContent = (noteContent: string[], limit: number) => {
    let remainingChars = limit;
    const res: string[] = [];

    for (const el of noteContent) {
      if (el.length <= remainingChars) {
        res.push(el);
        remainingChars -= el.length;
      } else {
        res.push(el.slice(0, Math.max(0, remainingChars - 3)) + "...");
        remainingChars = 0;
        break;
      }
    }

    // console.log(res);
    // console.log(res.map((el) => el.length));
    // console.log(res.map((el) => el.length).reduce((acc, el) => acc + el, 0));

    return res;
  };
  const formattedContent = useMemo(
    () =>
      formatContent(
        noteContent.map((el) => el.content),
        NOTE_CARD_LIMITS.TEXT.MAX_CHARS,
      ),
    [noteContent],
  );

  return (
    <>
      <div
        className="flex flex-col overflow-hidden"
        // style={{ maxHeight: `${TEXT_LINES * 24}px` }}
      >
        {formattedContent
          .slice(0, NOTE_CARD_LIMITS.TEXT.MAX_ITEMS)
          .map((item, i) => (
            <p key={i} className="break-all text-txt-primary">
              {item}
            </p>
          ))}
        {formattedContent.length > NOTE_CARD_LIMITS.TEXT.MAX_ITEMS
          ? "..."
          : null}
      </div>
    </>
  );
}
