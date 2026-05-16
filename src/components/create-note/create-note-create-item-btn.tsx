import cn from "@/lib/cn";
import { Plus } from "lucide-react";
import React from "react";

interface CreateNoteCreateItemBtnProps {
  addNewItem: () => Promise<void>;
  valueLength: number;
}

export default function CreateNoteCreateItemBtn({
  addNewItem,
  valueLength,
}: CreateNoteCreateItemBtnProps) {
  return (
    <>
      <div
        className={cn("flex", {
          "ml-5 mt-5": valueLength > 0,
        })}
      >
        <button
          type="button"
          className="flex items-center gap-1 text-txt-secondary"
          onClick={addNewItem}
        >
          <Plus size={20} />
          <span>{valueLength < 1 ? "Create first item" : "Create item"}</span>
        </button>
      </div>
    </>
  );
}
