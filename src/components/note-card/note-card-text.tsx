import React from "react";

interface NoteCardTextProps {
  noteContent: NoteItem[];
  textLines: number;
}

export default function NoteCardText({
  noteContent,
  textLines,
}: NoteCardTextProps) {
  return (
    <>
      <div
        className="flex flex-col overflow-hidden"
        style={{ maxHeight: `${textLines * 24}px` }}
      >
        {noteContent.map((item) => (
          <p key={item.id} className="break-all text-txt-primary">
            {item.content}
          </p>
        ))}
      </div>
    </>
  );
}
