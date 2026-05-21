import React from "react";
import NoteViewListGroup from "./note-view-list-group";

interface NoteViewListDisplayProps {
  noteId: string;
  markedList: NoteItem[];
  unmarkedList: NoteItem[];
}

export default function NoteViewListDisplay({
  noteId,
  markedList,
  unmarkedList,
}: NoteViewListDisplayProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <NoteViewListGroup noteId={noteId} list={unmarkedList} />
        {markedList.length > 0 ? (
          <NoteViewListGroup
            noteId={noteId}
            list={markedList}
            title="Completed:"
          />
        ) : null}
      </div>
    </>
  );
}
