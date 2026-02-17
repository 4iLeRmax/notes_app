import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum ViewMode {
  LIST = "LIST",
  GRID = "GRID",
}

interface ViewModeStore {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
}

const useViewModeStore = create<ViewModeStore>()(
  persist(
    (set) => ({
      viewMode: ViewMode.GRID,
      setViewMode: (mode) => set({ viewMode: mode }),
      toggleViewMode: () =>
        set((state) => ({
          viewMode:
            state.viewMode === ViewMode.GRID ? ViewMode.LIST : ViewMode.GRID,
        })),
    }),
    {
      name: "view-mode",
    },
  ),
);

export default useViewModeStore;
