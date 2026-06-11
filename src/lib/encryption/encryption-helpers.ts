import { TCreateNote } from "../zod-schemes/note-schemes/create-note.scheme";
import decrypt from "./decrypt";
import encrypt from "./encrypt";

type TCreateContent = TCreateNote["content"];

export const encryptNote = (note: Note) => {
  return {
    ...note,
    title: encrypt(note.title),
    content: encryptContent(note.content),
    labels: encryptLabels(note.labels),
  };
};
export const decryptNote = (encryptedNote: Note) => {
  return {
    ...encryptedNote,
    title: decrypt(encryptedNote.title),
    content: decryptContent(encryptedNote.content),
    labels: decryptLabels(encryptedNote.labels),
  };
};

export const encryptContent = (content: NoteItem[]) => {
  return content.map((item) => ({ ...item, content: encrypt(item.content) }));
};
export const decryptContent = (encryptedContent: NoteItem[]) => {
  return encryptedContent.map((item) => ({
    ...item,
    content: decrypt(item.content),
  }));
};
export const encryptCreateContent = (content: TCreateContent) => {
  return content.map((item) => ({ ...item, content: encrypt(item.content) }));
};
export const decryptCreateContent = (encryptedContent: TCreateContent) => {
  return encryptedContent.map((item) => ({
    ...item,
    content: decrypt(item.content),
  }));
};

export const encryptLabels = (labels: Label[]) => {
  return labels.map((item) => ({ ...item, name: encrypt(item.name) }));
};
export const decryptLabels = (encryptedLabels: Label[]) => {
  return encryptedLabels.map((item) => ({
    ...item,
    name: decrypt(item.name),
  }));
};
