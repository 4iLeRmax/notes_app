import React from "react";
import ListItem from "./list-item";
import { Plus } from "lucide-react";
import { createNoteItem } from "@/lib/actions/note-item";

interface ListProps {
  noteId: string;
  list: NoteItem[];
}

export default function List({ noteId, list }: ListProps) {
  const cleanList = list
    .map((item) => ({
      ...item,
      content: item.content.replace(/[\n\r]/g, ""),
    }))
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const marked = cleanList.filter((item) => item.isDone);
  const unmarked = cleanList.filter((item) => !item.isDone);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        {unmarked.map((item) => (
          <ListItem listItem={item} key={item.id} />
        ))}
      </div>
      {marked.length > 0 ? (
        <>
          <h1 className="mt-4 px-2 text-txt-primary">Completed items:</h1>
          <div className="flex flex-col items-center gap-3 mt-2">
            {marked.map((item) => (
              <ListItem listItem={item} key={item.id} />
            ))}
          </div>
        </>
      ) : null}
      <form action={createNoteItem.bind(null, noteId)} className="ml-5 mt-5">
        <button className="flex items-center gap-1 text-txt-secondary">
          <Plus size={20} />
          <span>{list.length === 0 ? "Create first item" : "Create item"}</span>
        </button>
      </form>
    </>
  );
}
