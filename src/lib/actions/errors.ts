export enum NoteActionErrors {
  UNAUTHORIZED = "UNAUTHORIZED",

  INVALID_NOTE_ID = "INVALID_NOTE_ID",
  INVALID_LABEL_ID = "INVALID_LABEL_ID",
  INVALID_TITLE = "INVALID_TITLE",
  INVALID_NOTE_DATA = "INVALID_NOTE_DATA",
  NOTE_LIMIT_EXCEEDED = "NOTE_LIMIT_EXCEEDED",
  NOTE_TOTAL_CHARS_LIMIT = "NOTE_TOTAL_CHARS_LIMIT",
  NOTES_EXCEED_TODO_LIMITS = "NOTES_EXCEED_TODO_LIMITS",

  NOTE_NOT_FOUND = "NOTE_NOT_FOUND",

  FETCH_NOTES_FAILED = "FETCH_NOTES_FAILED",
  CREATE_NOTE_FAILED = "CREATE_NOTE_FAILED",
  DELETE_NOTES_FAILED = "DELETE_NOTES_FAILED",
  UPDATE_TITLE_FAILED = "UPDATE_TITLE_FAILED",
  UPDATE_CONTENT_FAILED = "UPDATE_CONTENT_FAILED",
  TOGGLE_TYPE_FAILED = "TOGGLE_TYPE_FAILED",
  TOGGLE_MANY_TYPES_FAILED = "TOGGLE_MANY_TYPES_FAILED",
  TOGGLE_PIN_FAILED = "TOGGLE_PIN_FAILED",
  CREATE_COPIES_FAILED = "CREATE_COPIES_FAILED",
}

export enum NoteItemActionErrors {
  UNAUTHORIZED = "UNAUTHORIZED",

  INVALID_NOTE_ITEM_ID = "INVALID_NOTE_ITEM_ID",
  INVALID_NOTE_ITEM_CONTENT = "INVALID_NOTE_ITEM_CONTENT",
  INVALID_NOTE_ITEM_DATA = "INVALID_NOTE_ITEM_DATA",
  INVALID_NOTE_ITEM_STATUS = "INVALID_NOTE_ITEM_STATUS",

  INVALID_NOTE_ITEM_POSITION = "INVALID_NOTE_ITEM_POSITION",

  NOTE_ITEM_LIMIT = "NOTE_ITEM_LIMIT",

  NOTE_ITEM_NOT_FOUND = "NOTE_ITEM_NOT_FOUND",

  CREATE_NOTE_ITEM_FAILED = "CREATE_NOTE_ITEM_FAILED",
  DELETE_NOTE_ITEM_FAILED = "DELETE_NOTE_ITEM_FAILED",
  UPDATE_NOTE_ITEM_FAILED = "UPDATE_NOTE_ITEM_FAILED",
  TOGGLE_NOTE_ITEM_STATUS_FAILED = "TOGGLE_NOTE_ITEM_STATUS_FAILED",
  DELETE_ALL_MARKED_ITEMS_FAILED = "DELETE_ALL_MARKED_ITEMS_FAILED",
  REMOVE_ALL_MARKS_FAILED = "REMOVE_ALL_MARKS_FAILED",
}

export enum LabelActionErrors {
  UNAUTHORIZED = "UNAUTHORIZED",

  INVALID_LABEL_ID = "INVALID_LABEL_ID",
  INVALID_LABEL_DATA = "INVALID_LABEL_DATA",

  NOTE_NOT_FOUND = "NOTE_NOT_FOUND",
  LABEL_NOT_FOUND = "LABEL_NOT_FOUND",

  LABEL_DUPLICATE = "LABEL_DUPLICATE",
  NOTE_LABELS_LIMIT_REACHED = "NOTE_LABELS_LIMIT_REACHED",

  FETCH_LABELS_FAILED = "FETCH_LABELS_FAILED",
  FETCH_SINGLE_LABEL_FAILED = "FETCH_SINGLE_LABEL_FAILED",

  CREATE_LABEL_FAILED = "CREATE_LABEL_FAILED",
  UPDATE_LABEL_FAILED = "UPDATE_LABEL_FAILED",
  DELETE_LABEL_FAILED = "DELETE_LABEL_FAILED",
  TOGGLE_LABEL_TO_NOTE_FAILED = "TOGGLE_LABEL_TO_NOTE_FAILED",
  REMOVE_LABEL_FROM_NOTE_FAILED = "REMOVE_LABEL_FROM_NOTE_FAILED",
}

export const TOAST_ERRORS = {
  // Notes
  addNote: {
    title: "Failed to create note",
    description: "Your note could not be saved.",
  },
  updateTitle: {
    title: "Failed to update title",
    description: "The title could not be saved.",
  },
  addNoteItem: {
    title: "Failed to add item",
    description: "The new item could not be created.",
  },
  removeNoteItem: {
    title: "Failed to remove item",
    description: "The item could not be deleted.",
  },
  toggleItem: {
    title: "Failed to update item",
    description: "The item status could not be changed.",
  },
  updateItemContent: {
    title: "Failed to update item",
    description: "Your changes could not be saved.",
  },
  updateContent: {
    title: "Failed to update note",
    description: "Your changes could not be saved.",
  },

  // Note options
  toggleNoteTypes: {
    title: "Failed to convert note",
    description: "The note type could not be changed.",
  },
  addCopies: {
    title: "Failed to copy notes",
    description: "The copies could not be created.",
  },
  togglePin: {
    title: "Failed to pin note",
    description: "The pin status could not be changed.",
  },
  unmarkedAllItems: {
    title: "Failed to unmark items",
    description: "Items could not be unmarked.",
  },
  deleteMarkedItems: {
    title: "Failed to delete items",
    description: "Marked items could not be deleted.",
  },
  removeNotes: {
    title: "Failed to delete notes",
    description: "The selected notes could not be deleted.",
  },

  // Labels
  addLabel: {
    title: "Failed to create label",
    description: "The label could not be saved.",
  },
  removeLabel: {
    title: "Failed to delete label",
    description: "The label could not be removed.",
  },
  updateLabelName: {
    title: "Failed to update label",
    description: "The label name could not be saved.",
  },
  toggleNoteLabel: {
    title: "Failed to update label",
    description: "The label could not be toggled.",
  },
} as const;
