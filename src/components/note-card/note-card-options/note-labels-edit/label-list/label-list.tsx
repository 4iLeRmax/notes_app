"use client";

import cn from "@/lib/cn";
import LabelListItem from "./label-list-item";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { vibrate } from "@/lib/haptics";

interface LabelListProps {
  noteId: string;
  searchValue: string;
}

export default function LabelList({ noteId, searchValue }: LabelListProps) {
  const note = useNotesStore((s) => s.notes.find((n) => n.id === noteId));
  if (!note) return null;
  const labels = useNotesStore((s) => s.labels);
  const toggleNoteLabel = useNotesStore((s) => s.toggleNoteLabel);
  if (!labels) return null;

  if (labels.length === 0)
    return (
      <div className="w-full h-30 flex items-center justify-center text-txt-primary">
        No labels found
      </div>
    );

  const handleToggleLabelToNote = async (labelId: string) => {
    vibrate(10);
    await toggleNoteLabel(noteId, labelId);
  };

  const labelIsAdded = (labelId: string) =>
    note.labels.some((l) => l.id === labelId) ?? false;

  const sortedLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <>
      <div
        className={cn(
          "flex flex-col max-h-[50vh] xs:max-h-30 overflow-y-scroll snap-y snap-mandatory",
        )}
      >
        {sortedLabels.map((label) => (
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
