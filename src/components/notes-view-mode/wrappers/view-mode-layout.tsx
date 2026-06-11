"use client";

import cn from "@/lib/cn";
import useViewModeStore, { ViewMode } from "@/lib/store/useViewModeStore";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

export default function ViewModeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewMode = useViewModeStore((s) => s.viewMode);

  return (
    <>
      <div
        className={cn("", {
          // "columns-2 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 2xl:columns-4 3xl:columns-5 gap-2 xs:gap-5":
          "columns-2 md:columns-3 xl:columns-4 3xl:columns-5! gap-3 xs:gap-5":
            viewMode === ViewMode.GRID,
          "grid grid-cols-1 w-full gap-5 justify-items-center":
            viewMode === ViewMode.LIST,
        })}
      >
        <AnimatePresence mode="popLayout">{children}</AnimatePresence>
      </div>
    </>
  );
}
