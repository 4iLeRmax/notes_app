import React from "react";
import { motion } from "motion/react";
import { ChevronRight, Palette } from "lucide-react";
import cn from "@/lib/cn";

interface NoteColorsBtnProps {
  isOpen: boolean;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  handleToggle: () => void;
}

export default function NoteColorsBtn({
  buttonRef,
  isOpen,
  handleToggle,
}: NoteColorsBtnProps) {
  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={cn(
          " w-full flex items-center justify-between gap-2",
          "px-4 py-2 ",
          {
            "hover:bg-custom-blue text-txt-primary hover:text-primary": !isOpen,
            "text-primary bg-custom-blue": isOpen,
          },
        )}
      >
        <div className="flex items-center gap-2">
          <Palette size={20} className="flex xs:hidden" />
          <span>Add color</span>
        </div>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
        >
          <ChevronRight size={20} />
        </motion.div>
      </button>
    </>
  );
}
