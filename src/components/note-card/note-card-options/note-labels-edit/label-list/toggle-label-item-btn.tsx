"use client";

import { Square, SquareCheck } from "lucide-react";
import React from "react";

interface ToggleLabelItemBtnProps {
  labelIsAdded: boolean;
}

export default function ToggleLabelItemBtn({
  labelIsAdded,
}: ToggleLabelItemBtnProps) {
  return (
    <>
      <div className="p-1.5">
        {labelIsAdded ? <SquareCheck size={15} /> : <Square size={15} />}
      </div>
    </>
  );
}
