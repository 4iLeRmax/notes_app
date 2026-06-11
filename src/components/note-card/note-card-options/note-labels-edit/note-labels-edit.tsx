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
      <div className="pt-2">
        <div className="px-4 ">
          <h1 className="text-txt-secondary font-bold">Add label</h1>
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
