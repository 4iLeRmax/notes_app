import React from "react";
import LabelList from "./label-list/label-list";
import CreateLabel from "./create-label/create-label";

interface NoteCardLabelsModalProps {
  noteId: string;
  searchValue: string;
  inputLabelRef: React.RefObject<HTMLInputElement | null>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function NoteLabelsEdit({
  noteId,
  searchValue,
  setSearchValue,
  inputLabelRef,
}: NoteCardLabelsModalProps) {
  return (
    <>
      <div className="pt-2">
        <div className="px-4 ">
          <h1 className="text-txt-secondary font-bold">Add label</h1>
        </div>
        <LabelList noteId={noteId} searchValue={searchValue} />
        <CreateLabel
          customRef={inputLabelRef}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
    </>
  );
}
