import { create } from "zustand";

interface SelectedNotesStore {
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
    // console.log("removeAll");
    set({ selectedNoteIds: [] });
  },
}));

export default useSelectedNotesStore;
