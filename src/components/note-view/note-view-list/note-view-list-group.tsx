"use client";

import React from "react";
import NoteViewListItem from "./note-view-list-item/note-view-list-item";
import { motion, AnimatePresence } from "motion/react";

interface NoteViewListGroupProps {
  noteId: string;
  title?: string;
  list: NoteItem[];
  handleDragEnd?: () => Promise<void>;
}

export default function NoteViewListGroup({
  noteId,
  list,
  title,
  handleDragEnd,
}: NoteViewListGroupProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {title ? (
          <h1 className="px-2 text-txt-primary select-none">{title}</h1>
        ) : null}
        <div className="flex flex-col items-center gap-2">
          {/* <AnimatePresence mode="popLayout" initial={false}> */}
          {list.map((item, i) => (
            <NoteViewListItem
              key={`note-view-${item.id}`}
              listItem={item}
              noteId={noteId}
              prevItemId={list[i - 1]?.id ?? null}
              nextItemId={list[i + 1]?.id ?? null}
              handleDragEnd={handleDragEnd}
            />
          ))}
          {/* </AnimatePresence> */}
        </div>
      </div>
    </>
  );
}
