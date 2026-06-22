import { create } from "zustand";
import { persist } from "zustand/middleware";

// export type SortField = "updatedAt" | "createdAt";
// export type SortDirection = "asc" | "desc";

export enum SortTypes {
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  name = "name",
}

export enum SortDirections {
  asc = "asc",
  desc = "desc",
}

export const sortTypesName: Record<SortTypes, string> = {
  createdAt: "By creation date",
  updatedAt: "By update date",
  name: "By name",
};

interface NoteFilterStore {
  filter: {
    sortType: SortTypes;
    sortDirection: SortDirections;
  };
  toggleFilter: (newSortType: SortTypes) => void;
}

const useNoteFilterStore = create<NoteFilterStore>()(
  persist(
    (set) => ({
      filter: {
        sortType: SortTypes.createdAt,
        sortDirection: SortDirections.desc,
      },
      toggleFilter: (newSortType) => {
        set((state) => {
          const { sortType, sortDirection } = state.filter;

          if (sortType === newSortType) {
            return {
              filter: {
                sortType,
                sortDirection:
                  sortDirection === SortDirections.asc
                    ? SortDirections.desc
                    : SortDirections.asc,
              },
            };
          } else {
            return {
              filter: {
                sortType: newSortType,
                sortDirection: SortDirections.desc,
              },
            };
          }
        });
      },
    }),

    {
      name: "sort-type",
    },
  ),
);

export default useNoteFilterStore;
