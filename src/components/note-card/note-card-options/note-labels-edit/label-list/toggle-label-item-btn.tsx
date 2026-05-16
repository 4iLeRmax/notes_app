"use client";

import { Loader, Loader2, Square, SquareCheck } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface ToggleLabelItemBtnProps {
  labelIsAdded: boolean;
}

export default function ToggleLabelItemBtn({
  labelIsAdded,
}: ToggleLabelItemBtnProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <button className="p-1">
        {pending ? (
          <Loader2 size={15} className="animate-spin" />
        ) : labelIsAdded ? (
          <SquareCheck size={15} />
        ) : (
          <Square size={15} />
        )}
      </button>
    </>
  );
}
