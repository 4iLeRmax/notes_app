"use client";

import useViewModeStore, { ViewMode } from "@/lib/store/useViewModeStore";
import clsx from "clsx";
import React from "react";

export default function ViewModeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { viewMode } = useViewModeStore();

  return (
    <>
      <div
        className={clsx("", {
          "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-5":
            viewMode === ViewMode.GRID,
          "grid grid-cols-1 w-full gap-5 justify-items-center px-5 sm:px-0":
            viewMode === ViewMode.LIST,
        })}
      >
        {children}
      </div>
    </>
  );
}
