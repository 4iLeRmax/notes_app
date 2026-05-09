import React from "react";
import NoteViewListItem from "./note-view-list-item/note-view-list-item";
import { Check, X } from "lucide-react";

interface NoteViewListGroupProps {
  title?: string;
  list: NoteItem[];
}

export default function NoteViewListGroup({
  list,
  title,
}: NoteViewListGroupProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {title ? <h1 className="px-2 text-txt-primary">{title}</h1> : null}
        <div className="flex flex-col items-center gap-2">
          {list.map((item) => (
            <NoteViewListItem listItem={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
}
