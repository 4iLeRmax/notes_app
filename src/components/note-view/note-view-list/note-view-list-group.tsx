"use client";

import React from "react";
import NoteViewListItem from "./note-view-list-item/note-view-list-item";
import AnimatePresenceWrapper from "@/components/UI/animate-presence-wrapper";

interface NoteViewListGroupProps {
  noteId: string;
  title?: string;
  list: NoteItem[];
}

export default function NoteViewListGroup({
  noteId,
  list,
  title,
}: NoteViewListGroupProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {title ? (
          <h1 className="px-2 text-txt-primary select-none">{title}</h1>
        ) : null}
        {/* <div className="flex flex-col items-center gap-2"> */}
        <div className="flex flex-col items-center">
          <AnimatePresenceWrapper mode="popLayout">
            {list.map((item, i) => (
              <NoteViewListItem
                key={item.id}
                listItem={item}
                noteId={noteId}
                prevItemId={list[i - 1]?.id ?? null}
                nextItemId={list[i + 1]?.id ?? null}
              />
            ))}
          </AnimatePresenceWrapper>
        </div>
      </div>
    </>
  );
}
