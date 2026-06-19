"use client";

import React from "react";
import NoteViewListGroup from "./note-view-list-group";

interface NoteViewListDisplayProps {
  noteId: string;
  list: NoteItem[];
}

export default function NoteViewListDisplay({
  noteId,
  list,
}: NoteViewListDisplayProps) {
  if (list.length === 0) return null;

  const unmarkedList = list.filter((item) => !item.isDone);
  const markedList = list.filter((item) => item.isDone);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="pl-4 pr-2 sm:pl-8 sm:pr-6">
          <NoteViewListGroup noteId={noteId} list={unmarkedList} />
          {markedList.length > 0 ? (
            <NoteViewListGroup
              noteId={noteId}
              list={markedList}
              title="Completed:"
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
