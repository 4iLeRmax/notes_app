import cn from "@/lib/cn";
import { Pin, PinOff } from "lucide-react";
import React from "react";
import { motion } from "motion/react";
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
        aria-label="Pin note"
        onClick={togglePin}
        className={cn("p-2 rounded-full bg-primary transition-colors", {
          "shadow-outside-small text-txt-secondary hover:text-custom-blue":
            !isPinned,
          "shadow-inside text-custom-blue": isPinned,
        })}
      >
        {isPinned ? <PinOff size={20} /> : <Pin size={20} />}
      </button>
    </>
  );
}
  