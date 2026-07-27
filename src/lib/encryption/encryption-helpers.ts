import { decryptField, encryptField } from "./encryption";

//NOTE
export const encryptNote = (note: Note, dek: Buffer) => {
  return {
    ...note,
    title: encryptField(note.title, dek),
    content: encryptContent(note.content, dek),
    labels: encryptLabels(note.labels, dek),
  };
};
export const decryptNote = (encryptedNote: Note, dek: Buffer) => {
  return {
    ...encryptedNote,
    title: decryptField(encryptedNote.title, dek),
    content: decryptContent(encryptedNote.content, dek),
    labels: decryptLabels(encryptedNote.labels, dek),
  };
};

// CONTENT
export function encryptContent<T extends { content: NoteItem["content"] }>(
  content: T[],
  dek: Buffer,
): T[] {
  return content.map((item) => ({
    ...item,
    content: encryptField(item.content, dek),
  }));
}

export function decryptContent<T extends { content: NoteItem["content"] }>(
  encryptedContent: T[],
  dek: Buffer,
): T[] {
  return encryptedContent.map((item) => ({
    ...item,
    content: decryptField(item.content, dek),
  }));
}

//LABELS
export const encryptLabels = (labels: Label[], dek: Buffer) => {
  return labels.map((item) => ({
    ...item,
    name: encryptField(item.name, dek),
  }));
};
export const decryptLabels = (encryptedLabels: Label[], dek: Buffer) => {
  return encryptedLabels.map((item) => ({
    ...item,
    name: decryptField(item.name, dek),
  }));
};
