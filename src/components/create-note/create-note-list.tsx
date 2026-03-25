"use client";

import cn from "@/lib/cn";
import { Plus, Square, X } from "lucide-react";
import React from "react";

interface CreateNoteListProps {
  value: string;
  setContentValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function CreateNoteList({
  value,
  setContentValue,
}: CreateNoteListProps) {
  const listRef = React.useRef<HTMLDivElement>(null);

  const handleChangeItem = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    rowId: number,
  ) => {
    setContentValue((p) =>
      p
        .split("\n")
        .map((text, i) => (i === rowId ? e.target.value : text))
        .join("\n"),
    );
  };

  const addNewItem = async () => {
    if (value === "") {
      await setContentValue(" ");
    } else await setContentValue((p) => p + "\n");

    await (
      listRef.current?.lastChild?.childNodes[1] as HTMLTextAreaElement
    )?.focus();
  };
  const removeItem = (rowId: number) => {
    setContentValue((p) =>
      p
        .split("\n")
        .filter((_, i) => i !== rowId)
        .join("\n"),
    );
  };

  return (
    <>
      <textarea
        name="content"
        className="hidden"
        value={value}
        onChange={(e) => setContentValue(e.target.value)}
      ></textarea>
      <div className="flex flex-col overflow-y-scroll max-h-[552px] px-8 py-4">
        <div className="flex flex-col gap-3 text-txt-primary" ref={listRef}>
          {value.length > 0
            ? value.split("\n").map((item, id) => (
                <div
                  key={id}
                  className="flex items-center gap-2 px-4 py-2 rounded-3xl shadow-outside_small"
                >
                  <Square />
                  <textarea
                    value={item}
                    onChange={(e) => handleChangeItem(e, id)}
                    className="w-full outline-none resize-none overflow-hidden field-sizing-content "
                  />
                  <button type="button" onClick={() => removeItem(id)}>
                    <X size={20} />
                  </button>
                </div>
              ))
            : null}
        </div>

        <div
          className={cn("", {
            "ml-5 mt-5": value.length > 0,
          })}
        >
          <button
            type="button"
            className="flex items-center gap-1 text-txt-secondary"
            onClick={addNewItem}
          >
            <Plus size={20} />
            <span>
              {value.length < 1 ? "Create first item" : "Create item"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
