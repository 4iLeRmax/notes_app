"use client";

import clsx from "clsx";
import React from "react";
import ToggleLabelItemForm from "./toggle-label-item-form";

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
      <div
        className={clsx("flex items-center gap-3 px-4 py-2", {
          "text-txt-primary hover:bg-custom-blue hover:text-primary":
            !labelIsAdded,
          "bg-custom-blue text-primary": labelIsAdded,
        })}
      >
        <ToggleLabelItemForm
          label={label}
          handleToggleLabelToNote={handleToggleLabelToNote}
          labelIsAdded={labelIsAdded}
        />

        <span className="break-all">{label.name}</span>
      </div>
    </>
  );
}
