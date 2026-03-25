"use client";

import { Loader, Square, SquareCheck } from "lucide-react";
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
          <Loader size={15} className="animate-spin" />
        ) : labelIsAdded ? (
          <SquareCheck size={15} />
        ) : (
          <Square size={15} />
        )}
      </button>
    </>
  );
}
