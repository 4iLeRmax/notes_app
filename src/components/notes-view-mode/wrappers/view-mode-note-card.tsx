"use client";

import useViewModeStore, { ViewMode } from "@/lib/store/useViewModeStore";
import clsx from "clsx";
import React from "react";
import { motion } from "motion/react";

export default function ViewModeNoteCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { viewMode } = useViewModeStore();

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
        className={clsx("", {
          // "w-[250px] mb-5": viewMode === ViewMode.GRID,
          "w-full lg:w-[250px] mb-2 xs:mb-5": viewMode === ViewMode.GRID,
          "w-full max-w-150": viewMode === ViewMode.LIST,
        })}
      >
        {children}
      </motion.div>
    </>
  );
}
