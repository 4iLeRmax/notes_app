"use client";

import React from "react";
import FormInput from "../UI/formElements/form-input";
import { NOTE_LIMITS } from "@/lib/constants";
import { CreateLocalNote } from "./create-note";

interface CreateNoteTitleProps {
  noteTitle: string;
  setNote: (value: React.SetStateAction<CreateLocalNote>) => void;
}

export default function CreateNoteTitle({
  noteTitle,
  setNote,
}: CreateNoteTitleProps) {
  const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setNote((n) => ({
      ...n,
      title: e.target.value.slice(0, NOTE_LIMITS.MAX_TITLE_CHARS),
    }));

  return (
    <>
      <FormInput
        type="text"
        name="title"
        value={noteTitle}
        onChange={handleChangeTitle}
        placeholder="Title..."
        className="text-txt-primary bg-primary"
      />
    </>
  );
}
