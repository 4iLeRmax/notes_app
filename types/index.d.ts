type NoteType = "TEXT" | "TODO";

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

type SessionInfo = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null | undefined | undefined;
  userAgent?: string | null | undefined | undefined;
};
type SessionUser = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined | undefined;
};

type Session = {
  session: SessionInfo;
  user: SessionUser;
} | null;
