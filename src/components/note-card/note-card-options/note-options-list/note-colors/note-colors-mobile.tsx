import React from "react";
import { motion } from "motion/react";
import { NOTE_CARD_COLORS } from "@/lib/constants";
import NoteColorsListItem from "./note-colors-list-item";

interface NoteColorsMobileProps {
  noteColor: Note["color"];
  onChangeColor: (newColor: Note["color"]) => Promise<void>;
}

export default function NoteColorsMobile({
  noteColor,
  onChangeColor,
}: NoteColorsMobileProps) {
  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="absolute bottom-[calc(100%+12px)] w-full left-0 flex sm:hidden"
      >
        <div className="w-full flex flex-col gap-2 bg-secondary xs:bg-primary shadow-outside-small rounded-3xl">
          <h1 className="uppercase text-txt-primary font-bold px-4 pt-2">
            Note Color
          </h1>
          <div className="w-full flex items-center overflow-x-scroll scrollbar-none snap-x snap-mandatory pb-6">
            {NOTE_CARD_COLORS.map((color) => (
              <NoteColorsListItem
                key={color}
                color={color}
                handleChangeColor={() => onChangeColor(color)}
                size={40}
                variants={{
                  default: noteColor !== color && color !== null,
                  customDefault: color === null,
                  selectedColor: noteColor === color,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
