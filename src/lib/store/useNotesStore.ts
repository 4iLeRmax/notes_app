import { create } from "zustand";
import {
  createCopies,
  createNote,
  deleteNotes,
  toggleManyNoteTypes,
  togglePinStatus,
  updateColor,
  updateNoteText,
  updateNoteTitle,
} from "@/lib/actions/note";
import {
  CreateNoteScheme,
  TCreateNote,
} from "@/lib/zod-schemes/note-schemes/create-note.scheme";
import {
  createNoteItem,
  deleteAllMarkedItems,
  deleteNoteItem,
  removeAllMarks,
  toggleNoteItemStatus,
  updateNoteItem,
  updateNoteItemsPositions,
} from "../actions/note-item";
import { LABEL_LIMITS, NOTE_LIMITS } from "../constants";
import {
  NoteActionErrors,
  TOAST_ERRORS,
  TOAST_USER_FRIENDLY_ERRORS,
} from "../actions/errors";
import {
  LabelNameScheme,
  NoteColorScheme,
  NoteItemPositionScheme,
  NoteTitleScheme,
  UserIdScheme,
} from "../zod-schemes/basic-schemes";
import {
  createLabel,
  deleteLabel,
  toggleLabelToNote,
  updateLabel,
} from "../actions/label";
import { toast } from "../toast";
import { NoteItemScheme } from "../zod-schemes/note-schemes/note-item-scheme";
import z from "zod";

interface NotesState {
  notes: Note[];
  isPending: boolean;

  focusedItemId: string | null;
  setFocusedItemId: (id: string | null) => void;

  isHydratedNote: boolean;
  isHydratedLabel: boolean;

  setNotes: (notes: Note[]) => void;
  addNote: (data: TCreateNote, userId: string) => Promise<void>;
  updateTitle: (noteId: string, newTitle: string) => Promise<void>;

  addNoteItem: (
    noteId: string,
    createAtPosition?: number,
  ) => Promise<NoteItem | undefined>;
  removeNoteItem: (noteId: string, noteItemId: string) => Promise<void>;
  toggleItemStatus: (noteId: string, noteItemId: string) => Promise<void>;
  updateNoteItemContent: (
    noteId: string,
    noteItemId: string,
    newContent: string,
  ) => Promise<void>;
  updateNoteContent: (noteId: string, newContent: string) => Promise<void>;
  updateItemsPositions: (
    noteId: string,
    reorderedList: NoteItem[],
  ) => Promise<void>;

  removeNotes: (noteIds: string[]) => Promise<void>;
  toggleNoteTypes: (noteIds: string[]) => Promise<void>;
  addCopies: (noteIds: string[]) => Promise<void>;
  addColor: (noteId: string, newColor: string | null) => Promise<void>;
  togglePin: (noteId: string) => Promise<void>;
  unmarkedAllItems: (noteId: string) => Promise<void>;
  deleteMarkedItems: (noteId: string) => Promise<void>;

  labels: Label[];
  setLabels: (labels: Label[]) => void;

  addLabel: (labelName: string, userId: string) => Promise<void>;
  removeLabel: (labelId: string) => Promise<void>;
  updateLabelName: (labelId: string, labelName: string) => Promise<void>;
  toggleNoteLabel: (noteId: string, labelId: string) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  labels: [],
  isPending: false,
  focusedItemId: null,
  isHydratedNote: false,
  isHydratedLabel: false,

  setNotes: (notes) => set({ notes, isHydratedNote: true }),
  setFocusedItemId: (id) => set({ focusedItemId: id }),

  addNote: async (data, userId) => {
    const notesCount = get().notes.length;
    if (notesCount >= NOTE_LIMITS.MAX_NOTES) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.NOTE_LIMIT_EXCEEDED);
      return;
    }

    const noteId = crypto.randomUUID();

    const { data: safeData, success: validData } =
      CreateNoteScheme.safeParse(data);
    if (!validData) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.INVALID_NOTE_DATA);
      return;
    }

    const optimisticNote: Note = {
      ...safeData,
      id: noteId,
      userId,
      color: null,
      labels: [],
      content: safeData.content.map((item, i) => ({
        ...item,
        id: crypto.randomUUID(),
        noteId: noteId,
        position: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      notes: [optimisticNote, ...state.notes],
      isPending: true,
    }));

    try {
      const createdNote = await createNote(data, noteId);

      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === createdNote.id ? createdNote : note,
        ),
        isPending: false,
      }));
    } catch {
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== noteId),
        isPending: false,
      }));
      toast.error(TOAST_ERRORS.addNote.title, TOAST_ERRORS.addNote.description);
    } finally {
      set({ isPending: false });
    }
  },
  updateTitle: async (noteId, newTitle) => {
    const prevNote = get().notes.find((note) => note.id === noteId);
    if (!prevNote) return;

    const { data: safeTitle, success: validTitle } =
      NoteTitleScheme.safeParse(newTitle);
    if (!validTitle) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.INVALID_TITLE);
      return;
    }

    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId ? { ...note, title: safeTitle } : note,
      ),
      isPending: true,
    }));

    try {
      await updateNoteTitle(noteId, safeTitle);
    } catch (err) {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? prevNote : note,
        ),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.updateTitle.title,
        TOAST_ERRORS.updateTitle.description,
      );
    } finally {
      set({ isPending: false });
    }
  },

  // Note Item
  // addNoteItem: async (noteId) => {
  //   const prevNote = get().notes.find((note) => note.id === noteId);
  //   if (!prevNote) return;
  //   if (prevNote.content.length >= NOTE_LIMITS[prevNote.type].maxItems) return;

  //   const sortedContent = [...prevNote.content].sort(
  //     (a, b) => a.position - b.position,
  //   );

  //   const noteItemId = crypto.randomUUID();
  //   const itemPosition =
  //     sortedContent.length > 0
  //       ? sortedContent[sortedContent.length - 1].position + 1
  //       : 0;

  //   const optimisticNoteItem: NoteItem = {
  //     id: noteItemId,
  //     noteId,
  //     content: "",
  //     isDone: false,
  //     position: itemPosition,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };

  //   set((state) => ({
  //     notes: state.notes.map((note) =>
  //       note.id === noteId
  //         ? { ...note, content: [...note.content, optimisticNoteItem] }
  //         : note,
  //     ),
  //     isPending: true,
  //   }));

  //   try {
  //     await createNoteItem(noteId, optimisticNoteItem, undefined);
  //   } catch {
  //     set((state) => ({
  //       notes: state.notes.map((note) =>
  //         note.id === noteId
  //           ? {
  //               ...note,
  //               content: note.content.filter(
  //                 (item) => item.id !== optimisticNoteItem.id,
  //               ),
  //             }
  //           : note,
  //       ),
  //       isPending: false,
  //     }));
  //   } finally {
  //     set({ isPending: false });
  //   }

  //   return optimisticNoteItem;
  // },
  addNoteItem: async (noteId, createAtPosition) => {
    const prevNote = get().notes.find((note) => note.id === noteId);
    if (!prevNote) return;
    if (prevNote.content.length >= NOTE_LIMITS[prevNote.type].maxItems) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.NOTE_ITEM_LIMIT);
      return;
    }

    let safePosition = createAtPosition;

    if (createAtPosition !== undefined) {
      const { data, success: validPosition } =
        NoteItemPositionScheme.safeParse(createAtPosition);
      if (!validPosition) {
        toast.error(TOAST_USER_FRIENDLY_ERRORS.INVALID_NOTE_ITEM_DATA);
        return;
      }
      safePosition = data;
    }

    const sortedContent = [...prevNote.content].sort(
      (a, b) => a.position - b.position,
    );

    const noteItemId = crypto.randomUUID();
    const itemPosition =
      safePosition ??
      (sortedContent.length > 0
        ? sortedContent[sortedContent.length - 1].position + 1
        : 0);

    const optimisticNoteItem: NoteItem = {
      id: noteItemId,
      noteId,
      content: "",
      isDone: false,
      position: itemPosition,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              content: [
                ...note.content.map((el) =>
                  el.position >= optimisticNoteItem.position
                    ? { ...el, position: el.position + 1 }
                    : el,
                ),
                optimisticNoteItem,
              ].sort((a, b) => a.position - b.position),
            }
          : note,
      ),
      focusedItemId: optimisticNoteItem.id,
      isPending: true,
    }));

    try {
      await createNoteItem(optimisticNoteItem);
    } catch {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId
            ? {
                ...note,
                content: note.content
                  .filter((item) => item.id !== optimisticNoteItem.id)
                  .map((el) =>
                    el.position >= optimisticNoteItem.position
                      ? { ...el, position: el.position - 1 }
                      : el,
                  ),
              }
            : note,
        ),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.addNoteItem.title,
        TOAST_ERRORS.addNoteItem.description,
      );
    } finally {
      set({ isPending: false });
    }

    return optimisticNoteItem;
  },
  removeNoteItem: async (noteId, noteItemId) => {
    const prevNote = get().notes.find((note) => note.id === noteId);
    if (!prevNote) return;
    const prevItem = prevNote.content.find((item) => item.id === noteItemId);
    if (!prevItem) return;

    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              content: note.content
                .filter((item) => item.id !== noteItemId)
                .sort((a, b) => a.position - b.position)
                .map((item, i) => ({ ...item, position: i })),
            }
          : note,
      ),
      isPending: true,
    }));

    try {
      await deleteNoteItem(noteItemId);
    } catch {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId
            ? {
                ...note,
                content: prevNote.content,
              }
            : note,
        ),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.removeNoteItem.title,
        TOAST_ERRORS.removeNoteItem.description,
      );
    } finally {
      set({ isPending: false });
    }
  },
  toggleItemStatus: async (noteId: string, noteItemId: string) => {
    const prevNote = get().notes.find((note) => note.id === noteId);
    if (!prevNote) return;
    const prevItem = prevNote.content.find((item) => item.id === noteItemId);
    if (!prevItem) return;

    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              content: note.content.map((item) =>
                item.id === noteItemId
                  ? { ...item, isDone: !item.isDone }
                  : item,
              ),
            }
          : note,
      ),
      isPending: true,
    }));

    try {
      await toggleNoteItemStatus(noteItemId, prevItem.isDone);
    } catch {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId
            ? {
                ...note,
                content: note.content.map((item) =>
                  item.id === noteItemId
                    ? { ...item, isDone: prevItem.isDone }
                    : item,
                ),
              }
            : note,
        ),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.toggleItem.title,
        TOAST_ERRORS.toggleItem.description,
      );
    } finally {
      set({ isPending: false });
    }
  },
  updateNoteItemContent: async (noteId, noteItemId, newContent) => {
    const prevNote = get().notes.find((note) => note.id === noteId);
    if (!prevNote) return;
    const prevItem = prevNote.content.find((item) => item.id === noteItemId);
    if (!prevItem) return;

    if (newContent.length > NOTE_LIMITS.TODO.maxCharsPerItem) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.INVALID_NOTE_ITEM_CONTENT);
      return;
    }
    if (
      prevNote.content.reduce((sum, item) => sum + item.content.length, 0) -
        (prevNote.content.find((item) => item.id === noteItemId)?.content
          .length ?? 0) +
        newContent.length >
      NOTE_LIMITS.TODO.totalChars
    ) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.NOTE_TOTAL_CHARS_LIMIT);
      return;
    }

    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              content: note.content.map((item) =>
                item.id === noteItemId
                  ? { ...item, content: newContent }
                  : item,
              ),
            }
          : note,
      ),
      isPending: true,
    }));

    try {
      await updateNoteItem(noteId, noteItemId, newContent);
    } catch {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId
            ? {
                ...note,
                content: note.content.map((item) =>
                  item.id === noteItemId
                    ? { ...item, content: prevItem.content }
                    : item,
                ),
              }
            : note,
        ),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.updateItemContent.title,
        TOAST_ERRORS.updateItemContent.description,
      );
    } finally {
      set({ isPending: false });
    }
  },
  updateNoteContent: async (noteId, newContent) => {
    const prevNote = get().notes.find((note) => note.id === noteId);
    if (!prevNote) return;

    const newContentItems: NoteItem[] = newContent
      .split("\n")
      .map((content, index) => ({
        id: crypto.randomUUID(),
        noteId,
        content,
        isDone: false,
        position: index,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    if (newContentItems.length > NOTE_LIMITS.TEXT.maxItems) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.NOTE_ITEM_LIMIT);
      return;
    }
    if (
      newContentItems.some(
        (item) => item.content.length > NOTE_LIMITS.TEXT.maxCharsPerItem,
      )
    ) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.NOTE_TOTAL_CHARS_LIMIT);
      return;
    }

    if (
      newContentItems.reduce((sum, item) => sum + item.content.length, 0) >
      NOTE_LIMITS.TEXT.totalChars
    ) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.NOTE_TOTAL_CHARS_LIMIT);
      return;
    }

    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId ? { ...note, content: newContentItems } : note,
      ),
      isPending: true,
    }));

    try {
      await updateNoteText(noteId, newContentItems);
    } catch {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? { ...note, content: prevNote.content } : note,
        ),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.updateContent.title,
        TOAST_ERRORS.updateContent.description,
      );
    } finally {
      set({ isPending: false });
    }
  },
  updateItemsPositions: async (noteId, reorderedList) => {
    const prevNote = get().notes.find((n) => n.id === noteId);
    if (!prevNote) return;

    const { data: safeList, success: validList } = z
      .array(NoteItemScheme)
      .safeParse(reorderedList);
    if (!validList) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.INVALID_NOTE_DATA);
      return;
    }

    set((state) => ({
      notes: [
        ...state.notes.map((note) =>
          note.id === noteId ? { ...note, content: safeList } : note,
        ),
      ],
      isPending: true,
    }));

    const lightWeightItems = safeList.map((item) => ({
      id: item.id,
      position: item.position,
    }));

    try {
      await updateNoteItemsPositions(noteId, lightWeightItems);
    } catch {
      set((state) => ({
        notes: [
          ...state.notes.map((note) =>
            note.id === noteId ? { ...note, content: prevNote.content } : note,
          ),
        ],
        isPending: false,
      }));
    } finally {
      set({ isPending: false });
    }
  },
  // Note Options
  toggleNoteTypes: async (noteIds) => {
    const prevNotes = get().notes;
    const notesToUpdate = prevNotes.filter((note) => noteIds.includes(note.id));
    if (notesToUpdate.length === 0) return;

    const nonConvertible = notesToUpdate.filter((note) => {
      const totalChars = note.content.reduce(
        (sum, item) => sum + item.content.length,
        0,
      );
      const anyItemTooLong = note.content.some(
        (item) => item.content.length > NOTE_LIMITS.TODO.maxCharsPerItem,
      );

      return totalChars > NOTE_LIMITS.TODO.totalChars || anyItemTooLong;
    });

    if (nonConvertible.length > 0) {
      toast.warning(
        "Cannot convert notes",
        "One or more notes could not be converted to the selected type.",
      );
      return;
    }

    const firstNoteType = prevNotes.find(
      (note) => note.id === noteIds[0],
    )?.type;
    const newType: NoteType = firstNoteType === "TEXT" ? "TODO" : "TEXT";

    set((state) => {
      const updatedNotes = state.notes.map((note) =>
        noteIds.includes(note.id)
          ? {
              ...note,
              type: newType,
            }
          : note,
      );

      return {
        notes: updatedNotes,
        isPending: true,
      };
    });

    try {
      await toggleManyNoteTypes(noteIds, newType);
    } catch {
      set((state) => ({
        notes: state.notes.map((note) =>
          noteIds.includes(note.id)
            ? (notesToUpdate.find((n) => n.id === note.id) as Note)
            : note,
        ),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.toggleNoteTypes.title,
        TOAST_ERRORS.toggleNoteTypes.description,
      );
    } finally {
      set({ isPending: false });
    }
  },
  addCopies: async (noteIds) => {
    const prevNotes = get().notes;

    if (prevNotes.length + noteIds.length > NOTE_LIMITS.MAX_NOTES) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.NOTE_LIMIT_EXCEEDED);
      return;
    }

    const copies = prevNotes
      .filter((note) => noteIds.includes(note.id))
      .map((note) => ({
        ...note,
        id: crypto.randomUUID(),
        title: note.title + "(copy)",
        content: note.content.map((item) => ({
          ...item,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    const copiesIds = copies.map((copy) => copy.id);

    set((state) => ({
      notes: [...copies, ...state.notes],
      isPending: true,
    }));

    try {
      await createCopies(copies);
      toast.success(
        "Notes duplicated",
        `${copies.length} note${copies.length > 1 ? "s" : ""} copied successfully.`,
      );
    } catch {
      set((state) => ({
        notes: state.notes.filter((note) => !copiesIds.includes(note.id)),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.addCopies.title,
        TOAST_ERRORS.addCopies.description,
      );
    } finally {
      set({ isPending: false });
    }
  },
  addColor: async (noteId, newColor) => {
    const prevNote = get().notes.find((note) => note.id === noteId);
    if (!prevNote) return;
    const prevColor = prevNote.color;

    if (prevColor === newColor) return;

    const { data: safeColor, success: validColor } =
      NoteColorScheme.safeParse(newColor);
    if (!validColor) return;

    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId ? { ...note, color: safeColor } : note,
      ),
      isPending: true,
    }));

    try {
      await updateColor(noteId, safeColor);
    } catch {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? { ...note, color: prevColor } : note,
        ),
        isPending: false,
      }));
    } finally {
      set({ isPending: false });
    }
  },
  togglePin: async (noteId) => {
    const prevNote = get().notes.find((note) => note.id === noteId);
    if (!prevNote) return;
    const newPinStatus = !prevNote.isPinned;

    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId ? { ...note, isPinned: newPinStatus } : note,
      ),
      isPending: true,
    }));

    try {
      await togglePinStatus(noteId, newPinStatus);
    } catch {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? { ...note, isPinned: !note.isPinned } : note,
        ),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.togglePin.title,
        TOAST_ERRORS.togglePin.description,
      );
    } finally {
      set({ isPending: false });
    }
  },
  unmarkedAllItems: async (noteId) => {
    const prevNote = get().notes.find((note) => note.id === noteId);

    if (!prevNote) return;

    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              content: note.content.map((item) => ({ ...item, isDone: false })),
            }
          : note,
      ),
      isPending: true,
    }));

    try {
      await removeAllMarks(noteId);
    } catch {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? prevNote : note,
        ),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.unmarkedAllItems.title,
        TOAST_ERRORS.unmarkedAllItems.description,
      );
    } finally {
      set({ isPending: false });
    }
  },
  deleteMarkedItems: async (noteId: string) => {
    const prevNote = get().notes.find((note) => note.id === noteId);
    if (!prevNote) return;

    const remainingItems = prevNote.content
      .filter((item) => !item.isDone)
      .sort((a, b) => a.position - b.position)
      .map((item, i) => ({ ...item, position: i }));

    const updatedNote: Note = { ...prevNote, content: remainingItems };

    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId ? updatedNote : note,
      ),
      isPending: true,
    }));

    try {
      await deleteAllMarkedItems(noteId, remainingItems);
    } catch {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? { ...note, content: prevNote.content } : note,
        ),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.deleteMarkedItems.title,
        TOAST_ERRORS.deleteMarkedItems.description,
      );
    } finally {
      set({ isPending: false });
    }
  },
  removeNotes: async (noteIds) => {
    const notesToRemove = get().notes.filter((note) =>
      noteIds.includes(note.id),
    );

    set((state) => ({
      notes: state.notes.filter((note) => !noteIds.includes(note.id)),
      isPending: true,
    }));

    try {
      await deleteNotes(noteIds);
    } catch {
      set((state) => ({
        notes: [...state.notes, ...notesToRemove].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        ),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.removeNotes.title,
        TOAST_ERRORS.removeNotes.description,
      );
    } finally {
      set({ isPending: false });
    }
  },

  //Labels
  setLabels: (labels) => set({ labels, isHydratedLabel: true }),
  addLabel: async (labelName, userId) => {
    const labels = get().labels;
    const labelsCount = labels.length;

    const { data: safeUserId, success: validUserId } =
      UserIdScheme.safeParse(userId);
    if (!validUserId) return;

    const { data: safeLabelName, success: validLabelName } =
      LabelNameScheme.safeParse(labelName);
    if (!validLabelName) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.INVALID_LABEL_DATA);
      return;
    }

    if (labelsCount >= LABEL_LIMITS.MAX_LABELS) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.INVALID_LABEL_DATA);
      return;
    }

    const isDuplicate = labels.some(
      (label) =>
        label.name.toLowerCase() === safeLabelName.toLowerCase() &&
        label.userId === userId,
    );

    if (isDuplicate) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.LABEL_DUPLICATE);
      return;
    }

    const optimisticLabel: Label = {
      id: crypto.randomUUID(),
      name: safeLabelName,
      userId: safeUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      labels: [optimisticLabel, ...state.labels].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      ),
      isPending: true,
    }));

    try {
      await createLabel(optimisticLabel);
    } catch {
      set((state) => ({
        labels: state.labels.filter((label) => label.id !== optimisticLabel.id),
        isPending: false,
      }));
      toast.error(
        TOAST_ERRORS.addLabel.title,
        TOAST_ERRORS.addLabel.description,
      );
    } finally {
      set({ isPending: false });
    }
  },
  removeLabel: async (labelId) => {
    const prevNotes = get().notes;
    const prevLabel = get().labels.find((l) => l.id === labelId);
    if (!prevLabel) return;

    set((state) => ({
      labels: state.labels.filter((l) => l.id !== labelId),
      notes: state.notes.map((note) => ({
        ...note,
        labels: note.labels.filter((l) => l.id !== labelId),
      })),
      isPending: true,
    }));

    try {
      await deleteLabel(labelId);
    } catch {
      set((state) => ({
        notes: prevNotes,
        labels: [...state.labels, prevLabel].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        ),
      }));
      toast.error(
        TOAST_ERRORS.removeLabel.title,
        TOAST_ERRORS.removeLabel.description,
      );
    } finally {
      set({ isPending: false });
    }
  },
  updateLabelName: async (labelId, labelName) => {
    const prevNotes = get().notes;
    const prevLabel = get().labels.find((l) => l.id === labelId);
    if (!prevLabel) return;

    const { data: safeLabelName, success: validLabelName } =
      LabelNameScheme.safeParse(labelName);
    if (!validLabelName) {
      toast.error(TOAST_USER_FRIENDLY_ERRORS.INVALID_LABEL_DATA);
      return;
    }

    set((state) => ({
      notes: state.notes.map((note) => ({
        ...note,
        labels: note.labels.map((label) =>
          label.id === labelId ? { ...label, name: safeLabelName } : label,
        ),
      })),
      labels: state.labels.map((label) =>
        label.id === labelId ? { ...label, name: safeLabelName } : label,
      ),
      isPending: true,
    }));

    try {
      await updateLabel(labelId, safeLabelName);
    } catch {
      set((state) => ({
        notes: prevNotes,
        labels: state.labels.map((label) =>
          label.id === labelId ? prevLabel : label,
        ),
      }));
      toast.error(
        TOAST_ERRORS.updateLabelName.title,
        TOAST_ERRORS.updateLabelName.description,
      );
    } finally {
      set({ isPending: false });
    }
  },
  toggleNoteLabel: async (noteId, labelId) => {
    const prevNote = get().notes.find((n) => n.id === noteId);
    if (!prevNote) return;
    const currentLabels = get().labels;
    const labelToAdd = currentLabels.find((l) => l.id === labelId);
    if (!labelToAdd) return;

    const labelIsAdded = prevNote.labels.some((label) => label.id === labelId);

    if (labelIsAdded) {
      // remove label
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId
            ? { ...note, labels: note.labels.filter((l) => l.id !== labelId) }
            : note,
        ),
        // isPending: true,
      }));
    } else {
      // add label
      if (prevNote.labels.length >= LABEL_LIMITS.MAX_LABELS_PER_NOTE) {
        toast.error(TOAST_USER_FRIENDLY_ERRORS.NOTE_LABELS_LIMIT_REACHED);
        return;
      }
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId
            ? {
                ...note,
                labels: [labelToAdd, ...note.labels].sort(
                  (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
                ),
              }
            : note,
        ),
        // isPending: true,
      }));
    }

    try {
      await toggleLabelToNote(noteId, labelId, labelIsAdded);
    } catch {
      if (labelIsAdded) {
        // add label
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? {
                  ...note,
                  labels: [labelToAdd, ...note.labels].sort(
                    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
                  ),
                }
              : note,
          ),
        }));
      } else {
        // remove label
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? { ...note, labels: note.labels.filter((l) => l.id !== labelId) }
              : note,
          ),
        }));
      }
      toast.error(
        TOAST_ERRORS.toggleNoteLabel.title,
        TOAST_ERRORS.toggleNoteLabel.description,
      );
    } finally {
      // set({ isPending: false });
    }
  },
}));
