"use client";

import React from "react";
import { motion } from "motion/react";

interface NoteColorWrapperProps {
  children: React.ReactNode;
  noteColor: string | null;
}

export default function NoteColorWrapper({
  children,
  noteColor,
}: NoteColorWrapperProps) {
  return (
    <>
      <motion.div
        animate={{
          paddingTop: noteColor !== null ? "10px" : "0px",
        }}
        className="relative rounded-xl sm:rounded-3xl shadow-outside-small sm:hover:shadow-inside overflow-hidden"
      >
        <motion.div
          animate={{
            background: noteColor !== null ? noteColor : "",
          }}
          className="absolute -z-20 top-0 left-0 w-full h-10"
        ></motion.div>

        <div className="absolute -z-10 bottom-0 left-0 w-full h-full">
          <motion.div
            animate={{
              height: noteColor !== null ? "10px" : "0px",
            }}
          ></motion.div>
          <motion.div
            animate={{ height: "100%" }}
            className="bg-secondary rounded-xl sm:rounded-3xl"
          ></motion.div>
        </div>
        {children}
      </motion.div>
    </>
  );
}
