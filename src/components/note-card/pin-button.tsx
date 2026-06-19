"use client";

import cn from "@/lib/cn";
import { vibrate } from "@/lib/haptics";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { Pin, PinOff } from "lucide-react";

interface PinButtonProps {
  noteId: string;
  isPinned: boolean;
}

export default function PinButton({ noteId, isPinned }: PinButtonProps) {
  const togglePin = useNotesStore((s) => s.togglePin);

  const handleTogglePin = (e: React.FormEvent<HTMLFormElement>) => {
    vibrate(10);
    e.preventDefault();
    togglePin(noteId);
  };

  return (
    <>
      <form
        onSubmit={handleTogglePin}
        className="flex items-center justify-center"
      >
        <button
          className={cn(
            "bg-primary p-1.5 rounded-full outline-none transition-colors",
            {
              "shadow-outside-small text-txt-secondary hover:text-custom-blue":
                !isPinned,
              "shadow-inside text-custom-blue": isPinned,
            },
          )}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            e.stopPropagation()
          }
        >
          {isPinned ? <PinOff size={20} /> : <Pin size={20} />}
        </button>
      </form>
    </>
  );
}
