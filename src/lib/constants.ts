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

export const NOTE_CARD_COLORS = [
  null,
  "#dbc1e8",
  "#a2c0e2",
  "#f6e289",
  "#252d44",
  "#fbb18a",
  "#f77053",
  "#a9af95",
  "#ea5f86",
  "#48b4a7",
  "#f8a1c4",
  "#6b515e",
  "#b89a66",
  "#829c17",
];
