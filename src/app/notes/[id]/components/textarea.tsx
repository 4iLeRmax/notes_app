"use client";

import { updateNoteText } from "@/lib/actions/note";
import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function TextArea({
  list,
}: {
  list: {
    id: string;
    content: string;
    isDone: boolean;
    noteId: string;
  }[];
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(list.map((item) => item.content).join("\n"));
  }, [list]);

  const noteId = list[0].noteId;

  return (
    <>
      <div className="px-2">
        <form
          action={updateNoteText.bind(null, noteId)}
          className="flex flex-col gap-2"
        >
          <textarea
            className="w-full overflow-hidden outline-none resize-none field-sizing-content"
            name="text"
            id="myTextArea"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
          <button className="w-full flex items-center justify-center">
            <Upload size={20} />
          </button>
        </form>
      </div>
    </>
  );
}
