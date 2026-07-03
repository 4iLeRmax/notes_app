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
  UPDATE_NOTE_COLOR_FAILED = "UPDATE_NOTE_COLOR_FAILED",
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
  UPDATE_NOTE_ITEMS_POSITIONS_FAILED = "UPDATE_NOTE_ITEMS_POSITIONS_FAILED",
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

export const TOAST_USER_FRIENDLY_ERRORS = {
  // ── Shared ────────────────────────────────────────────────
  UNAUTHORIZED: "You don't have permission to do that.",

  // ── Note validation ───────────────────────────────────────
  INVALID_NOTE_ID: "Something went wrong — invalid note.",
  INVALID_LABEL_ID: "Something went wrong — invalid label.",
  INVALID_TITLE: "That title isn't valid.",
  INVALID_NOTE_DATA: "The note data is invalid.",
  NOTE_LIMIT_EXCEEDED: "You've reached the maximum number of notes.",
  NOTE_TOTAL_CHARS_LIMIT: "Your note is too long.",
  NOTES_EXCEED_TODO_LIMITS:
    "One or more notes exceed the checklist item limit.",
  NOTE_NOT_FOUND: "Note not found.",

  // ── Note actions ──────────────────────────────────────────
  FETCH_NOTES_FAILED: "Couldn't load your notes. Please refresh.",
  CREATE_NOTE_FAILED: "Couldn't create the note.",
  DELETE_NOTES_FAILED: "Couldn't delete the note.",
  UPDATE_TITLE_FAILED: "Couldn't update the title.",
  UPDATE_CONTENT_FAILED: "Couldn't update the note.",
  TOGGLE_TYPE_FAILED: "Couldn't change the note type.",
  TOGGLE_MANY_TYPES_FAILED: "Couldn't change the type for some notes.",
  TOGGLE_PIN_FAILED: "Couldn't pin the note.",
  CREATE_COPIES_FAILED: "Couldn't duplicate the note.",

  // ── Note item validation ──────────────────────────────────
  INVALID_NOTE_ITEM_ID: "Something went wrong — invalid item.",
  INVALID_NOTE_ITEM_CONTENT: "That item content isn't valid.",
  INVALID_NOTE_ITEM_DATA: "The item data is invalid.",
  INVALID_NOTE_ITEM_STATUS: "That item status isn't valid.",
  INVALID_NOTE_ITEM_POSITION: "Something went wrong — invalid item position.",
  NOTE_ITEM_LIMIT: "You've reached the maximum number of items.",
  NOTE_ITEM_NOT_FOUND: "Item not found.",

  // ── Note item actions ─────────────────────────────────────
  CREATE_NOTE_ITEM_FAILED: "Couldn't add the item.",
  DELETE_NOTE_ITEM_FAILED: "Couldn't delete the item.",
  UPDATE_NOTE_ITEM_FAILED: "Couldn't update the item.",
  TOGGLE_NOTE_ITEM_STATUS_FAILED: "Couldn't update the item.",
  DELETE_ALL_MARKED_ITEMS_FAILED: "Couldn't delete the checked items.",
  REMOVE_ALL_MARKS_FAILED: "Couldn't uncheck all items.",

  // ── Label validation ──────────────────────────────────────
  INVALID_LABEL_DATA: "The label data is invalid.",
  LABEL_NOT_FOUND: "Label not found.",
  LABEL_DUPLICATE: "A label with that name already exists.",
  NOTE_LABELS_LIMIT_REACHED: "You've reached the label limit for this note.",

  // ── Label actions ─────────────────────────────────────────
  FETCH_LABELS_FAILED: "Couldn't load your labels. Please refresh.",
  FETCH_SINGLE_LABEL_FAILED: "Couldn't load the label. Please refresh.",
  CREATE_LABEL_FAILED: "Couldn't create the label.",
  UPDATE_LABEL_FAILED: "Couldn't update the label.",
  DELETE_LABEL_FAILED: "Couldn't delete the label.",
  TOGGLE_LABEL_TO_NOTE_FAILED: "Couldn't update the note's labels.",
  REMOVE_LABEL_FROM_NOTE_FAILED: "Couldn't remove the label from the note.",
};
