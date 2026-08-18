import { create } from "zustand";

export interface SelectedNotesStore {
  selectedNoteIds: string[];
  toggleSelectedNote: (noteIdToSelect: string) => void;
  removeAll: () => void;
}

const useSelectedNotesStore = create<SelectedNotesStore>((set) => ({
  selectedNoteIds: [],

  toggleSelectedNote: (noteIdToSelect) => {
    set((state) => {
      const isAlreadySelected = state.selectedNoteIds.find(
        (id) => id === noteIdToSelect,
      );

      if (isAlreadySelected) {
        const updatedNoteIds = [
          ...state.selectedNoteIds.filter((id) => id !== noteIdToSelect),
        ];
        return { selectedNoteIds: updatedNoteIds };
      } else {
        const updatedNotes = [...state.selectedNoteIds, noteIdToSelect];
        return { selectedNoteIds: updatedNotes };
      }
    });
  },
  removeAll: () => {
    set({ selectedNoteIds: [] });
  },
}));

export default useSelectedNotesStore;
