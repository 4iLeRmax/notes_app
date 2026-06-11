"use client";

import useViewModeStore, { ViewMode } from "@/lib/store/useViewModeStore";
import React from "react";
import { motion } from "motion/react";
import cn from "@/lib/cn";

export default function ViewModeNoteCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewMode = useViewModeStore((s) => s.viewMode);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn("", {
          "w-full lg:w-[250px] mb-3 xs:mb-5": viewMode === ViewMode.GRID,
          "w-full max-w-150": viewMode === ViewMode.LIST,
        })}
      >
        {children}
      </motion.div>
    </>
  );
}
