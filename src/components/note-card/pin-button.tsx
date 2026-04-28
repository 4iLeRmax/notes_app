"use client";

import { togglePinnedStatus } from "@/lib/actions/note";
import clsx from "clsx";
import { Pin, PinOff } from "lucide-react";
import React, { useOptimistic, useTransition } from "react";

interface PinButtonProps {
  noteId: string;
  isPinned: boolean;
}

export default function PinButton({ noteId, isPinned }: PinButtonProps) {
  const [optimisticIsPinned, addOptimisticUpdate] = useOptimistic(isPinned);
  const [isPending, startTransition] = useTransition();

  const handleTogglePin = async (formData: FormData) => {
    addOptimisticUpdate(!optimisticIsPinned);
    startTransition(async () => {
      await togglePinnedStatus(noteId);
    });
  };

  return (
    <>
      <form
        action={handleTogglePin}
        className="flex items-center justify-center"
      >
        <button
          className={clsx(
            "text-txt-secondary bg-primary  p-1 rounded-full outline-none",
            {
              "shadow-outside-small": !optimisticIsPinned,
              "shadow-inside": optimisticIsPinned,
            },
          )}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          disabled={isPending}
        >
          {optimisticIsPinned ? <PinOff size={20} /> : <Pin size={20} />}
        </button>
      </form>
    </>
  );
}
