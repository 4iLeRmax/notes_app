type NoteItem = {
  id: string;
  content: string;
  noteId: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Note = {
  id: string;
  title: string;
  content: NoteItem[];
  type: NoteType;
  isPinned: boolean;
  color;
  labels: Label[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Label = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
