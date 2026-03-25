import cn from "@/lib/cn";
import { Pin, PinOff } from "lucide-react";
import React from "react";

interface CreateNotePinButtonProps {
  isPinned: boolean;
  togglePin: () => void;
}

export default function CreateNotePinButton({
  isPinned,
  togglePin,
}: CreateNotePinButtonProps) {
  return (
    <>
      <button
        onClick={togglePin}
        className={cn("text-txt-secondary p-2 rounded-full", {
          "shadow-outside_small": !isPinned,
          "shadow-inside": isPinned,
        })}
      >
        {isPinned ? <PinOff size={20} /> : <Pin size={20} />}
      </button>
    </>
  );
}
