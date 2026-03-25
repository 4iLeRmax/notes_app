"use client";

import { getLabels, toggleLabelToNote } from "@/lib/actions/label";
import { getNoteById } from "@/lib/actions/note";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Loader, Square, SquareCheck } from "lucide-react";
import LabelListItem from "./label-list-item";

interface LabelListProps {
  noteId: string;
}

export default function LabelList({ noteId }: LabelListProps) {
  const {
    data: note,
    isLoading: noteIsLoading,
    refetch: refetchNote,
  } = useQuery({
    queryKey: [`note-${noteId}`],
    queryFn: () => getNoteById(noteId),
  });

  const {
    data: labels,
    isLoading: labelsIsLoading,
    refetch: refetchLabels,
  } = useQuery({
    queryKey: [`labels`],
    queryFn: () => getLabels(),
  });

  const handleToggleLabelToNote = async (labelId: string) => {
    await toggleLabelToNote(noteId, labelId, labelIsAdded(labelId));
    await refetchNote();
    await refetchLabels();
  };

  const labelIsAdded = (labelId: string) =>
    note?.labels.some((l) => l.id === labelId) ?? false;

  if (noteIsLoading || labelsIsLoading)
    return (
      <div className="px-4 flex items-center justify-center h-20 text-txt-primary">
        <Loader size={20} className="animate-spin" />
      </div>
    );
  if (!note || !labels) return null;

  if (labels.length === 0) return null;

  return (
    <>
      <div
        className={clsx("flex flex-col", {
          "h-40 overflow-y-scroll": labels.length > 5,
        })}
      >
        {labels.map((label) => (
          <LabelListItem
            key={label.id}
            label={label}
            handleToggleLabelToNote={handleToggleLabelToNote}
            labelIsAdded={labelIsAdded(label.id)}
          />
        ))}
      </div>
    </>
  );
}
