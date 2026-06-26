"use client";

import React, { useRef, useState } from "react";
import LabelList from "./label-list/label-list";
import CreateLabel from "./create-label/create-label";

interface NoteCardLabelsModalProps {
  noteId: string;
}

export default function NoteLabelsEdit({ noteId }: NoteCardLabelsModalProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="flex flex-col">
        <div className="px-4 xs:pt-2 py-4 xs:py-0 rounded-es-3xl rounded-ee-3xl shadow-outside-small xs:shadow-none bg-primary">
          <h1 className="text-txt-secondary font-bold ">Add label</h1>
        </div>
        <LabelList noteId={noteId} searchValue={searchValue} />
        <CreateLabel
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
    </>
  );
}
