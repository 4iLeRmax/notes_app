"use client";

import { createNote } from "@/lib/actions/note";
import React, { useRef, useState } from "react";

export default function CreateNote() {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [noteType, setNoteType] = useState<"TODO" | "TEXT">("TEXT");

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await createNote(formData);
    setTitleValue("");
    setContentValue("");
  };

  return (
    <>
      <div className="rounded-md px-10 py-2 shadow-xl w-100">
        <form action={handleSubmit} className="flex flex-col" ref={formRef}>
          {contentValue.length > 0 || titleValue.length > 0 ? (
            <input
              type="text"
              name="title"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              placeholder="Title..."
              className="text-xl"
            />
          ) : null}

          <textarea
            name="content"
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
            placeholder="Create note..."
            className="outline-none resize-none overflow-hidden field-sizing-content mt-2"
          />
          {contentValue.length > 0 || titleValue.length > 0 ? (
            <button>Create</button>
          ) : null}
        </form>
      </div>
    </>
  );
}
