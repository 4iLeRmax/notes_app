"use client";

import useViewModeStore, { ViewMode } from "@/lib/store/useViewModeStore";
import { LayoutGrid, Rows3 } from "lucide-react";

export default function ViewModeSwitcher() {
  const { viewMode, toggleViewMode } = useViewModeStore();

  return (
    <>
      <button onClick={toggleViewMode}>
        {viewMode === ViewMode.GRID ? (
          <Rows3 size={25} />
        ) : (
          <LayoutGrid size={25} />
        )}
      </button>
    </>
  );
}
