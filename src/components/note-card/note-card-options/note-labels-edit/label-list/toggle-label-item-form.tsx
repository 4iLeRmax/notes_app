"use client";

import { Square, SquareCheck } from "lucide-react";
import React from "react";
import ToggleLabelItemBtn from "./toggle-label-item-btn";

interface ToggleLabelItemFormProps {
  label: Label;
  handleToggleLabelToNote: (labelId: string) => Promise<void>;
  labelIsAdded: boolean;
}

export default function ToggleLabelItemForm({
  label,
  handleToggleLabelToNote,
  labelIsAdded,
}: ToggleLabelItemFormProps) {
  return (
    <>
      <form
        action={() => handleToggleLabelToNote(label.id)}
        className="flex items-center"
      >
        <ToggleLabelItemBtn labelIsAdded={labelIsAdded} />
      </form>
    </>
  );
}
