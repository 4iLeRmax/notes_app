import { Square, SquareCheck } from "lucide-react";
import React from "react";

interface NoteCardListProps {
  noteContent: NoteItem[];
  listLength: number;
}

export default function NoteCardList({
  noteContent,
  listLength,
}: NoteCardListProps) {
  const formatOfNoteItems = (content: NoteItem[]) => {
    let notesInProcess: NoteItem[] = [];
    let completedNotes: NoteItem[] = [];

    content.forEach((item) => {
      if (item.isDone) completedNotes.push(item);
      else notesInProcess.push(item);
    });

    if (notesInProcess.length >= listLength)
      return [notesInProcess.slice(0, listLength), []];

    return [
      notesInProcess,
      completedNotes.slice(0, listLength - notesInProcess.length),
    ];
  };

  const [activeNotes, completedNotes] = formatOfNoteItems(noteContent);

  return (
    <>
      <div className="flex flex-col gap-2 text-txt-primary">
        {activeNotes.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div>
              <Square size={20} />
            </div>
            <span className="break-all">{item.content}</span>
          </div>
        ))}
      </div>
      {completedNotes.length > 0 ? (
        <div className="mt-4 text-txt-primary">
          <h3 className="text-sm mb-1">Completed:</h3>
          {completedNotes.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div>
                <SquareCheck size={20} />
              </div>
              <span className="line-through break-all">{item.content}</span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
