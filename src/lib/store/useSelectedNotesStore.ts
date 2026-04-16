import { create } from "zustand";

interface SelectedNotesStore {
  selectedNotes: Note[];
  addSelectedNote: (selectedNote: Note) => void;
  removeSelectedNote: (selectedNote: Note) => void;
  toggleSelectedNote: (selectedNote: Note) => void;
  removeAll: () => void;
}

const useSelectedNotesStore = create<SelectedNotesStore>((set) => ({
  selectedNotes: [],
  addSelectedNote: (selectedNote: Note) =>
    set((state) => ({ selectedNotes: [...state.selectedNotes, selectedNote] })),
  removeSelectedNote: (selectedNote: Note) =>
    set((state) => ({
      selectedNotes: [
        ...state.selectedNotes.filter((sn) => sn.id !== selectedNote.id),
      ],
    })),
  toggleSelectedNote: (selectedNote) =>
    set((state) => {
      const isAlreadySelected = state.selectedNotes.find(
        (sn) => sn.id === selectedNote.id,
      );

      if (isAlreadySelected) {
        const updatedNotes = [
          ...state.selectedNotes.filter((sn) => sn.id !== selectedNote.id),
        ];
        return { selectedNotes: updatedNotes };
      } else {
        const updatedNotes = [...state.selectedNotes, selectedNote];
        return { selectedNotes: updatedNotes };
      }
    }),
  removeAll: () => set({ selectedNotes: [] }),
}));

export default useSelectedNotesStore;
