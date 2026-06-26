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
  createdAt: "Created Date",
  updatedAt: "Last Update",
  name: "Name",
};

interface NoteSortStore {
  sort: {
    sortType: SortTypes;
    sortDirection: SortDirections;
  };
  toggleSortTypeAndDirection: (newSortType: SortTypes) => void;
}

const useNoteSortStore = create<NoteSortStore>()(
  persist(
    (set) => ({
      sort: {
        sortType: SortTypes.createdAt,
        sortDirection: SortDirections.desc,
      },
      toggleSortTypeAndDirection: (newSortType) => {
        set((state) => {
          const { sortType, sortDirection } = state.sort;

          if (sortType === newSortType) {
            return {
              sort: {
                sortType,
                sortDirection:
                  sortDirection === SortDirections.asc
                    ? SortDirections.desc
                    : SortDirections.asc,
              },
            };
          } else {
            return {
              sort: {
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

export default useNoteSortStore;
