import React from "react";
import { Plus } from "lucide-react";
import { createNoteItem } from "@/lib/actions/note-item";
import NoteViewListDisplay from "./note-view-list-display";
import NoteViewCreateItemBtn from "./note-view-create-item-btn";

interface NoteViewListProps {
  noteId: string;
  list: NoteItem[];
}

export default function NoteViewList({ noteId, list }: NoteViewListProps) {
  const cleanList = list
    .map((item) => ({
      ...item,
      content: item.content.replace(/[\n\r]/g, ""),
    }))
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

  const unmarkedList = cleanList.filter((item) => !item.isDone);
  const markedList = cleanList.filter((item) => item.isDone);

  console.log({
    cleanList: cleanList.map((item) => ({ content: item.content })),
  });
  console.log({
    unmarkedList: unmarkedList.map((item) => ({ content: item.content })),
  });
  console.log({
    markedList: markedList.map((item) => ({ content: item.content })),
  });

  return (
    <>
      <NoteViewListDisplay
        unmarkedList={unmarkedList}
        markedList={markedList}
      />
      <NoteViewCreateItemBtn noteId={noteId} listLength={list.length} />
    </>
  );
}
