import { Square, SquareCheck, X } from "lucide-react";
import React from "react";

interface CreateNoteListItemProps {
  itemId: number;
  item: {
    content: string;
    isDone: boolean;
  };
  removeItem: (rowId: number) => void;
  toggleItemStatus: (rowId: number) => void;
  handleChangeItem: (targetValue: string, rowId: number) => void;
}

export default function CreateNoteListItem({
  itemId,
  item,
  removeItem,
  toggleItemStatus,
  handleChangeItem,
}: CreateNoteListItemProps) {
  return (
    <>
      <div className="flex items-center gap-2 px-4 py-2 rounded-3xl shadow-outside-small bg-primary">
        <button type="button" onClick={() => toggleItemStatus(itemId)}>
          {item.isDone ? <SquareCheck size={20} /> : <Square size={20} />}
        </button>
        <textarea
          value={item.content}
          onChange={(e) => handleChangeItem(e.target.value, itemId)}
          placeholder="Type something..."
          className="w-full outline-none resize-none overflow-hidden field-sizing-content "
        />
        <button type="button" onClick={() => removeItem(itemId)}>
          <X size={20} />
        </button>
      </div>
    </>
  );
}
