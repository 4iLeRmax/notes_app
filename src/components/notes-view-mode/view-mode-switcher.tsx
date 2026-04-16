"use client";

import cn from "@/lib/cn";
import useViewModeStore, { ViewMode } from "@/lib/store/useViewModeStore";
import { LayoutGrid, Rows3 } from "lucide-react";

export default function ViewModeSwitcher({
  iconSize = 20,
}: {
  iconSize?: number;
}) {
  const { viewMode, toggleViewMode } = useViewModeStore();

  return (
    <>
      <button
        onClick={toggleViewMode}
        className={cn(
          "w-[41px] h-[41px] flex items-center justify-center bg-primary rounded-full shrink-0",
          {
            "shadow-outside-small": viewMode === ViewMode.GRID,
            "shadow-inside": viewMode === ViewMode.LIST,
          },
        )}
      >
        {viewMode === ViewMode.GRID ? (
          <Rows3 size={iconSize} />
        ) : (
          <LayoutGrid size={iconSize} />
        )}
      </button>
    </>
  );
}
