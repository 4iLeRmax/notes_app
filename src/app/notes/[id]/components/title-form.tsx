"use client";

import { updateNoteTitle } from "@/lib/actions/note";
import { Upload } from "lucide-react";
import React, { useState } from "react";

export default function TitleForm({
  title,
  noteId,
}: {
  title: string;
  noteId: string;
}) {
  const [value, setValue] = useState(title);

  return (
    <>
      <form
        action={updateNoteTitle.bind(null, noteId)}
        className="flex items-center"
      >
        <input
          type="text"
          name="title"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="text-xl w-full outline-none"
          placeholder="Title..."
        />
        {title !== value ? (
          <button>
            <Upload size={20} />
          </button>
        ) : null}
      </form>
    </>
  );
}
