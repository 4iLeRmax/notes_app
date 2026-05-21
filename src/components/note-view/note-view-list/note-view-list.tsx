import React from "react";
import NoteViewListDisplay from "./note-view-list-display";
import NoteViewCreateItemBtn from "./note-view-create-item-btn";

interface NoteViewListProps {
  noteId: string;
  list: NoteItem[];
}

export default function NoteViewList({ noteId, list }: NoteViewListProps) {
  const unmarkedList = list.filter((item) => !item.isDone);
  const markedList = list.filter((item) => item.isDone);

  return (
    <>
      <NoteViewListDisplay
        noteId={noteId}
        unmarkedList={unmarkedList}
        markedList={markedList}
      />
      <NoteViewCreateItemBtn noteId={noteId} listLength={list.length} />
    </>
  );
}
