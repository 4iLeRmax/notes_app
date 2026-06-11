export const DEBOUNCE_VALUE = 500;
export const SEARCH_QUERY_LIMIT = 100;

//note content limits
export const NOTE_CARD_LIMITS = {
  TODO: { MAX_ITEMS: 5, MAX_CHARS_PER_ITEM: 100 },
  TEXT: { MAX_ITEMS: 10, MAX_CHARS: 400 },
};

export const NOTE_LIMITS = {
  MAX_NOTES: 500,
  MAX_TITLE_CHARS: 128,
  TODO: { maxItems: 100, maxCharsPerItem: 500, totalChars: 20_000 },
  TEXT: { maxItems: 100, maxCharsPerItem: 20_000, totalChars: 20_000 },
} as const;

export const LABEL_LIMITS = {
  MAX_LABELS: 100,
  MAX_LABEL_NAME_CHARS: 50,
  MAX_LABELS_PER_NOTE: 10,
} as const;
