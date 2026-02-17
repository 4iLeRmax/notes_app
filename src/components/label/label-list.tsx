"use client";

import { getLabels } from "@/lib/actions/label";
import { getNoteById } from "@/lib/actions/note";
import { Square, SquareCheck } from "lucide-react";
import React, { useEffect, useState } from "react";

interface LabelListProps {
  noteId: string;
}

export default function LabelList({ noteId }: LabelListProps) {
  console.log("render: LABEL LIST");

  const [note, setNote] = useState<Note>();
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    (async () => {
      const notePromise = getNoteById(noteId);
      const labelsPromise = getLabels();

      const note = await notePromise;
      const labels = await labelsPromise;

      if (note) setNote(note);
      if (labels) setLabels(labels);
    })();
  }, [noteId]);

  const labelIsAdded = (labelId: string) =>
    note?.labels.some((l) => l.id === labelId) ?? false;
  return (
    <>
      <div className="flex flex-col gap-2 mt-4">
        {labels.map((label) => (
          <div key={label.id} className="flex items-center gap-2">
            <form action="" className="flex items-center">
              <button>
                {labelIsAdded(label.id) ? (
                  <SquareCheck size={20} />
                ) : (
                  <Square size={20} />
                )}
              </button>
            </form>
            <span>{label.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
