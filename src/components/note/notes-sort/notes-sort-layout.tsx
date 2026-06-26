"use client";

import React from "react";
import cn from "@/lib/cn";
import useViewModeStore, { ViewMode } from "@/lib/store/useViewModeStore";

interface NotesSortLayoutProps {
  children: React.ReactNode;
  position?: "left" | "right" | "center";
}

export default function NotesSortLayout({
  children,
  position = "center",
}: NotesSortLayoutProps) {
  const viewMode = useViewModeStore((s) => s.viewMode);

  return (
    <>
      <div className="w-full flex justify-center">
        <div
          className={cn("flex ", {
            "justify-start": position === "left",
            "justify-end": position === "right",
            "justify-center": position === "center",
            "w-full lg:w-[calc((250px*3)+(20px*2))] xl:w-[calc((250px*4)+(20px*3))] 3xl:w-[calc((250px*5)+(20px*4))]!":
              viewMode === ViewMode.GRID,
            "w-full max-w-150": viewMode === ViewMode.LIST,
          })}
        >
          {children}
        </div>
      </div>
    </>
  );
}
