import React from "react";
import { motion } from "motion/react";
import { NOTE_CARD_COLORS } from "@/lib/constants";
import NoteColorsListItem from "./note-colors-list-item";

interface NoteColorsDesktopProps {
  noteColor: Note["color"];
  onChangeColor: (newColor: Note["color"]) => Promise<void>;
  modalXPosition: "left" | "right";
}

export default function NoteColorsDesktop({
  noteColor,
  onChangeColor,
  modalXPosition,
}: NoteColorsDesktopProps) {
  return (
    <>
      <motion.div
        initial={
          modalXPosition === "right"
            ? { x: -20, opacity: 0, left: "100%" }
            : { x: 20, opacity: 0, right: "100%" }
        }
        animate={
          modalXPosition === "right"
            ? { x: 0, opacity: 1, left: "100%" }
            : { x: 0, opacity: 1, right: "100%" }
        }
        exit={
          modalXPosition === "right"
            ? { x: -20, opacity: 0, left: "100%" }
            : { x: 20, opacity: 0, right: "100%" }
        }
        className="absolute top-0 px-3 hidden sm:flex"
      >
        <div className="bg-primary shadow-outside-small rounded-3xl py-4">
          <div className="flex flex-col items-center overflow-y-scroll h-[calc(44px*6)] snap-y snap-mandatory scrollbar-thin pl-2 pr-1 ">
            {NOTE_CARD_COLORS.map((color) => (
              <NoteColorsListItem
                key={color}
                color={color}
                handleChangeColor={() => onChangeColor(color)}
                size={28}
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
