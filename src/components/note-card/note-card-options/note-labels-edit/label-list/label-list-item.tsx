"use client";

import React from "react";
import ToggleLabelItemBtn from "./toggle-label-item-btn";
import cn from "@/lib/cn";

interface LabelListItemProps {
  label: Label;
  handleToggleLabelToNote: (labelId: string) => Promise<void>;
  labelIsAdded: boolean;
}

export default function LabelListItem({
  label,
  handleToggleLabelToNote,
  labelIsAdded,
}: LabelListItemProps) {
  return (
    <>
      <button
        onClick={() => handleToggleLabelToNote(label.id)}
        className={cn("flex items-center gap-2 px-4 py-2 cursor-pointer", {
          "text-txt-primary hover:bg-custom-blue hover:text-primary ":
            !labelIsAdded,
          "bg-custom-blue text-primary": labelIsAdded,
        })}
      >
        <ToggleLabelItemBtn labelIsAdded={labelIsAdded} />
        <span className="break-all">{label.name}</span>
      </button>
    </>
  );
}
