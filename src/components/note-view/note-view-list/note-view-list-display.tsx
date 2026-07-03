"use client";

import React, { useCallback, useEffect, useState } from "react";
import NoteViewListGroup from "./note-view-list-group";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { Reorder } from "motion/react";

interface NoteViewListDisplayProps {
  noteId: string;
  list: NoteItem[];
}

export default function NoteViewListDisplay({
  noteId,
  list,
}: NoteViewListDisplayProps) {
  const updateItemsPositions = useNotesStore((s) => s.updateItemsPositions);

  const [liveOrder, setLiveOrder] = useState(list);

  useEffect(() => {
    setLiveOrder(list);
  }, [list]);

  if (list.length === 0) return null;

  const handleDragEnd = useCallback(async () => {
    const reorderedItems = liveOrder.map((item, i) => ({
      ...item,
      position: i,
    }));
    updateItemsPositions(noteId, reorderedItems);
  }, [liveOrder]);

  const unmarkedList = liveOrder.filter((item) => !item.isDone);
  const markedList = liveOrder.filter((item) => item.isDone);

  return (
    <>
      <div className="pl-4 pr-2 sm:pl-8 sm:pr-6">
        <Reorder.Group
          values={liveOrder}
          onReorder={setLiveOrder}
          as="div"
          className="flex flex-col gap-4"
        >
          <NoteViewListGroup
            noteId={noteId}
            list={unmarkedList}
            handleDragEnd={handleDragEnd}
          />

          {markedList.length > 0 ? (
            <NoteViewListGroup
              noteId={noteId}
              list={markedList}
              title="Completed:"
              handleDragEnd={handleDragEnd}
            />
          ) : null}
        </Reorder.Group>
      </div>
    </>
  );
}
