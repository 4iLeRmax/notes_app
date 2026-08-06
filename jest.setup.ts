import { mockDeep } from "jest-mock-extended";
import type { PrismaClient } from "@prisma/client";

export const mockAddNote = jest.fn();

jest.mock("@/lib/store/useNotesStore", () => ({
  useNotesStore: jest.fn((selector: any) =>
    selector({ addNote: mockAddNote, isPending: false }),
  ),
}));

jest.mock("@/lib/store/useSelectedNotesStore", () => ({
  useNotesStore: jest.fn((selector: any) => selector({ selectedNoteIds: [] })),
}));

jest.mock("@/lib/store/useViewModeStore", () => ({
  __esModule: true,
  default: jest.fn(() => "GRID"),
  ViewMode: { GRID: "GRID", LIST: "LIST" },
}));

jest.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: jest.fn(),
    },
  },
}));

jest.mock("@/lib/auth-client", () => ({
  authClient: {
    useSession: () => ({
      data: { session: { userId: "test-user" } },
      isPending: false,
    }),
    signOut: jest.fn(),
  },
}));

jest.mock("@/lib/prisma", () => ({
  prisma: mockDeep<PrismaClient>(),
}));
