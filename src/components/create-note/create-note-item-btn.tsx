import cn from "@/lib/cn";
import { Plus } from "lucide-react";
import React from "react";

interface CreateNoteItemBtnProps {
  addNewItem: (createAtPosition?: number) => void;
  valueLength: number;
  listRef: React.RefObject<HTMLDivElement | null>;
}

export default function CreateNoteItemBtn({
  addNewItem,
  valueLength,
  listRef,
}: CreateNoteItemBtnProps) {
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
          onClick={() => {
            addNewItem();
            requestAnimationFrame(() => {
              const last = listRef.current?.lastElementChild;
              if (!last) return;
              const textarea = last.querySelector("textarea");
              if (!textarea) return;
              textarea.focus();
            });
          }}
        >
          <Plus size={20} />
          <span>{valueLength < 1 ? "Create first item" : "Create item"}</span>
        </button>
      </div>
    </>
  );
}
