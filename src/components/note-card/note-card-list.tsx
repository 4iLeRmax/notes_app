"use client";

import { NOTE_CARD_LIMITS } from "@/lib/constants";
import { Square, SquareCheck } from "lucide-react";
import React from "react";

interface NoteCardListProps {
  noteContent: NoteItem[];
}

export default function NoteCardList({ noteContent }: NoteCardListProps) {
  const formatOfNoteItems = (content: NoteItem[], limitOfItems: number) => {
    let itemsInProcess: NoteItem[] = [];
    let completedItems: NoteItem[] = [];

    content.forEach((item) => {
      if (item.isDone) completedItems.push(item);
      else itemsInProcess.push(item);
    });

    if (itemsInProcess.length >= limitOfItems)
      return [itemsInProcess.slice(0, limitOfItems), []];

    return [
      itemsInProcess,
      completedItems.slice(0, limitOfItems - itemsInProcess.length),
    ];
  };

  const [activeItems, completedItems] = formatOfNoteItems(
    noteContent,
    NOTE_CARD_LIMITS.TODO.MAX_ITEMS,
  );

  return (
    <>
      <div className="flex flex-col gap-2 text-txt-primary">
        {activeItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div>
              <Square size={20} />
            </div>
            <span className="break-all">
              {item.content.length > NOTE_CARD_LIMITS.TODO.MAX_CHARS_PER_ITEM
                ? `${item.content.slice(0, NOTE_CARD_LIMITS.TODO.MAX_CHARS_PER_ITEM - 3)}...`
                : item.content}
            </span>
          </div>
        ))}
      </div>
      {completedItems.length > 0 ? (
        <div className="mt-4 text-txt-primary">
          <h3 className="text-sm mb-1">Completed:</h3>
          {completedItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div>
                <SquareCheck size={20} />
              </div>
              <span className="line-through break-all">
                {item.content.slice(0, 100)}
              </span>
            </div>
          ))}
        </div>
      ) : null}
      {noteContent.length > NOTE_CARD_LIMITS.TODO.MAX_ITEMS ? (
        <span>...</span>
      ) : null}
    </>
  );
}
