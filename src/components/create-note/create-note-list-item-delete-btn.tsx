"use client";

import { CheckSquare, Square, X } from "lucide-react";
import React, { useState } from "react";

export default function CreateNoteListItemDeleteBtn({
  onClick,
  iconSize = 20,
}: {
  onClick: () => void;
  iconSize?: number;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="p-0.5 text-txt-primary hover:text-custom-blue transition-colors"
      >
        <X size={iconSize} />
      </button>
    </>
  );
}
