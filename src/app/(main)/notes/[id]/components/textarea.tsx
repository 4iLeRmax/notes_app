"use client";

import { updateNoteText } from "@/lib/actions/note";
import cn from "@/lib/cn";
import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function TextArea({
  list,
  noteId,
}: {
  noteId: string;
  list: {
    id: string;
    content: string;
    isDone: boolean;
    noteId: string;
  }[];
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setValue(list.map((item) => item.content).join("\n"));
  }, [list]);

  return (
    <>
      <div>
        <form
          action={updateNoteText.bind(null, noteId)}
          className="flex flex-col gap-5"
        >
          <textarea
            className={cn(
              "w-full outline-none resize-none field-sizing-content rounded-3xl p-4",
              {
                "shadow-inside": focused,
              },
            )}
            name="text"
            id="myTextArea"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          ></textarea>
          <button className="w-full flex items-center justify-center bg-custom-blue shadow-3xl text-primary py-2 rounded-2xl">
            <Upload size={20} />
          </button>
        </form>
      </div>
    </>
  );
}
