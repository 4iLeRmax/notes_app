"use client";

import { togglePinnedStatus } from "@/lib/actions/note";
import clsx from "clsx";
import { Pin, PinOff } from "lucide-react";
import React from "react";

interface PinButtonProps {
  noteId: string;
  isPinned: boolean;
}

export default function PinButton({ noteId, isPinned }: PinButtonProps) {
  return (
    <>
      <form
        action={togglePinnedStatus.bind(null, noteId)}
        className="flex items-center justify-center"
      >
        <button
          className={clsx("text-txt-secondary  p-1 rounded-full outline-none", {
            "shadow-outside-small": !isPinned,
            "shadow-inside": isPinned,
          })}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {isPinned ? <PinOff size={20} /> : <Pin size={20} />}
        </button>
      </form>
    </>
  );
}
