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
          "w-[250px] mb-5": viewMode === ViewMode.GRID,
          "min-w-[250px] w-full sm:w-150": viewMode === ViewMode.LIST,
        })}
      >
        {children}
      </div>
    </>
  );
}
