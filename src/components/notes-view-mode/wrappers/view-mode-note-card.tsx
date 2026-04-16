"use client";

import useViewModeStore, { ViewMode } from "@/lib/store/useViewModeStore";
import clsx from "clsx";
import React from "react";

export default function ViewModeNoteCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { viewMode } = useViewModeStore();

  return (
    <>
      <div
        className={clsx("", {
          // "w-[250px] mb-5": viewMode === ViewMode.GRID,
          "w-full xs:w-[250px] mb-3": viewMode === ViewMode.GRID,
          "w-full max-w-150": viewMode === ViewMode.LIST,
        })}
      >
        {children}
      </div>
    </>
  );
}
