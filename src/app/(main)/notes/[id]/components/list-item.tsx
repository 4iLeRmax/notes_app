"use client";

import {} from "@/lib/actions/note";
import {
  deleteNoteItem,
  toggleNoteItemStatus,
  updateNoteItem,
} from "@/lib/actions/note-item";
import cn from "@/lib/cn";
import clsx from "clsx";
import { Check, Circle, Upload, X } from "lucide-react";
import React, { useState } from "react";

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
        className={clsx(
          "flex items-center gap-2 w-full py-2 px-4 rounded-3xl",
          {
            "line-through text-txt-primary": listItem.isDone,
            "shadow-outside_small": !focused,
            "text-txt-secondary": focused,
          },
        )}
      >
        <div
          className={cn("rounded-full flex", {
            "shadow-inside": !focused,
          })}
        >
          <form
            action={toggleNoteItemStatus.bind(
              null,
              listItem.id,
              listItem.isDone,
            )}
            className="flex items-center"
          >
            <button className="p-1">
              {listItem.isDone ? <Check size={20} /> : <Circle size={20} />}
            </button>
          </form>
        </div>

        <form
          action={updateNoteItem.bind(null, listItem.id)}
          className="flex items-center justify-center gap-2 min-h-7 w-full min-w-0"
        >
          {!listItem.isDone ? (
            <textarea
              name="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full overflow-hidden outline-none resize-none field-sizing-content"
            />
          ) : (
            <div className="w-full flex items-center justify-start">
              {listItem.content}
            </div>
          )}
          {listItem.content !== value && !listItem.isDone ? (
            <button
              onClick={() => setFocused(false)}
              className={cn(
                "flex items-center justify-center rounded-full p-1",
                {
                  "shadow-inside": !focused,
                },
              )}
            >
              <Upload size={20} />
            </button>
          ) : null}
        </form>

        {hovered || focused ? (
          <form
            action={deleteNoteItem.bind(null, listItem.id)}
            className={cn("flex items-center justify-center rounded-full p-1", {
              "shadow-inside": hovered && !focused,
            })}
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
