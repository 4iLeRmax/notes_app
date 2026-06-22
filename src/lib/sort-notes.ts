import { SortDirections, SortTypes } from "./store/useNoteFilterStore";

const sortNotes: Record<
  SortTypes,
  (notesToSort: Note[], direction: SortDirections) => Note[]
> = {
  createdAt: (notesToSort, direction) => {
    return [...notesToSort].sort((a, b) =>
      direction === SortDirections.desc
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime(),
    );
  },
  updatedAt: (notesToSort, direction) => {
    return [...notesToSort].sort((a, b) =>
      direction === SortDirections.desc
        ? b.updatedAt.getTime() - a.updatedAt.getTime()
        : a.updatedAt.getTime() - b.updatedAt.getTime(),
    );
  },
  name: (notesToSort, direction) => {
    return [...notesToSort].sort((a, b) =>
      direction === SortDirections.desc
        ? b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
        : a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
    );
  },
};

export default sortNotes;
