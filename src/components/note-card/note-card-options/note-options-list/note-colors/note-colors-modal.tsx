"use client";

import React from "react";
import { motion } from "motion/react";
import { NOTE_CARD_COLORS } from "@/lib/constants";
import cn from "@/lib/cn";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { DropletOff } from "lucide-react";

interface NoteColorsModalProps {
  note: Note;
  modalXPosition: "left" | "right";
}

export default function NoteColorsModal({
  note,
  modalXPosition,
}: NoteColorsModalProps) {
  const addColor = useNotesStore((s) => s.addColor);

  const handleChangeColor = async (newColor: string | null) => {
    await addColor(note.id, newColor);
  };

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
              <div key={color} className="snap-start pl-4 last:pr-4">
                <button
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 ",
                    {
                      "border-txt-secondary": color === null,
                      "border-transparent":
                        note.color !== color && color !== null,
                      "border-custom-blue": note.color === color,
                    },
                  )}
                  style={{ background: color ?? "" }}
                  onClick={() => handleChangeColor(color)}
                >
                  {color === null ? (
                    <DropletOff size={15} className="text-txt-secondary" />
                  ) : null}
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

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
              <div key={color} className="py-2 snap-start">
                <button
                  key={color}
                  className={cn(
                    "w-7 h-7 rounded-full border-3 flex items-center justify-center",
                    {
                      "border-txt-secondary": color === null,
                      "border-transparent":
                        note.color !== color && color !== null,
                      "border-custom-blue": note.color === color,
                    },
                  )}
                  style={{ background: color ?? "" }}
                  onClick={() => handleChangeColor(color)}
                >
                  {color === null ? (
                    <DropletOff size={15} className="text-txt-secondary" />
                  ) : null}
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
