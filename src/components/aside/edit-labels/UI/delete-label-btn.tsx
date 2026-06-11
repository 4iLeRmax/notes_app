import { useNotesStore } from "@/lib/store/useNotesStore";
import { X } from "lucide-react";
import React from "react";

interface DeleteLabelBtnProps {
  labelId: string;
}

export default function DeleteLabelBtn({ labelId }: DeleteLabelBtnProps) {
  const removeLabel = useNotesStore((s) => s.removeLabel);

  return (
    <>
      <button onClick={() => removeLabel(labelId)}>
        <X size={20} />
      </button>
    </>
  );
}
