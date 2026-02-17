"use client";

import {} from "@/lib/actions/note";
import {
  deleteNoteItem,
  toggleNoteItemStatus,
  updateNoteItem,
} from "@/lib/actions/note-item";
import clsx from "clsx";
import { Square, SquareCheck, Upload, X } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";

export default function ListItem({ listItem }: { listItem: NoteItem }) {
  const [value, setValue] = useState(listItem.content);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        tabIndex={0}
        className={clsx("flex items-center gap-2 w-full border-y py-1 px-2", {
          "line-through text-gray-500": listItem.isDone,
          "border-transparent": !focused,
          "border-black": focused,
        })}
      >
        <form
          action={toggleNoteItemStatus.bind(null, listItem.id, listItem.isDone)}
          className="flex items-center"
        >
          <button>
            {listItem.isDone ? <SquareCheck size={20} /> : <Square size={20} />}
          </button>
        </form>
        <form
          action={updateNoteItem.bind(null, listItem.id)}
          className="flex w-full"
        >
          <textarea
            name="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full overflow-hidden outline-none resize-none field-sizing-content"
          />
          {listItem.content !== value ? (
            <button onClick={() => setFocused(false)}>
              <Upload size={20} />
            </button>
          ) : null}
        </form>
        {/* {`${listItem.createdAt.getHours()}:${listItem.createdAt.getMinutes()}:${listItem.createdAt.getSeconds()}`} */}
        {hovered || focused ? (
          <form
            action={deleteNoteItem.bind(null, listItem.id)}
            className="flex items-center justify-center"
          >
            <button>
              <X size={20} />
            </button>
          </form>
        ) : null}
      </div>
    </>
  );
}
