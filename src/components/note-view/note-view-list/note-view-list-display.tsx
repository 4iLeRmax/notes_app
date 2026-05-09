import React from "react";
import NoteViewListGroup from "./note-view-list-group";

interface NoteViewListDisplayProps {
  markedList: NoteItem[];
  unmarkedList: NoteItem[];
}

export default function NoteViewListDisplay({
  markedList,
  unmarkedList,
}: NoteViewListDisplayProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <NoteViewListGroup list={unmarkedList} />
        {markedList.length > 0 ? (
          <NoteViewListGroup list={markedList} title="Completed:" />
        ) : null}
      </div>
    </>
  );
}
