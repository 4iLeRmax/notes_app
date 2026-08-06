"use client";

import cn from "@/lib/cn";
import { CheckSquare, Square } from "lucide-react";
import React, { useState } from "react";

export default function CreateNoteListItemStatusBtn({
  isActive,
  onClick,
  iconSize = 20,
}: {
  isActive: boolean;
  onClick: () => void;
  iconSize?: number;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Toggle item status"
        aria-pressed={isActive}
        onClick={onClick}
        className="p-0.5"
      >
        {isActive ? (
          <CheckSquare size={iconSize} className="text-custom-blue" />
        ) : (
          <Square size={iconSize} className="text-custom-blue" />
        )}
      </button>
    </>
  );
}
