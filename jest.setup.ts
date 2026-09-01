import { mockDeep } from "jest-mock-extended";
import { PrismaClient } from "@/generated/prisma/client";

export const mockSessionUser = {
  id: "user-id",
  name: "Test User",
  email: "test@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
  emailVerified: true,
};

export const mockPush = jest.fn();
export const mockReplace = jest.fn();
export const mockUseSearchParams = jest.fn(() => new URLSearchParams());

export const mockNotes = [
  {
    id: "note-1",
    type: "TEXT",
    title: "Test note",
    content: [],
    isPinned: false,
  },
];
export const mockAddNote = jest.fn();
export const mockSetNotes = jest.fn();
export const mockSetLabels = jest.fn();
export const mockToggleNoteTypes = jest.fn();
export const mockAddCopies = jest.fn();
export const mockRemoveNotes = jest.fn().mockResolvedValue(undefined);

export const mockRemoveAll = jest.fn();
export const mockToggleSelectedNote = jest.fn();

export const mockGetNotes = jest.fn().mockResolvedValue([{ id: "n1" }]);
export const mockGetLabels = jest.fn().mockResolvedValue([{ id: "l1" }]);

afterEach(() => {
  mockPush.mockClear();
  mockReplace.mockClear();
  mockUseSearchParams.mockReturnValue(new URLSearchParams());

  mockRemoveAll.mockClear();
});

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => mockUseSearchParams(),
}));

jest.mock("@/lib/store/useNotesStore", () => ({
  useNotesStore: jest.fn((selector: any) =>
    selector({
      notes: mockNotes,
      addNote: mockAddNote,
      isPending: false,
      setNotes: mockSetNotes,
      setLabels: mockSetLabels,
      toggleNoteTypes: mockToggleNoteTypes,
      addCopies: mockAddCopies,
      removeNotes: mockRemoveNotes,
    }),
  ),
}));

jest.mock("@/lib/store/useSelectedNotesStore", () => ({
  __esModule: true,
  default: jest.fn((selector: any) =>
    selector({
      selectedNoteIds: [],
      removeAll: mockRemoveAll,
      toggleSelectedNote: mockToggleSelectedNote,
    }),
  ),
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
    useSession: jest.fn(() => ({
      data: {
        user: mockSessionUser,
        session: { userId: mockSessionUser.id },
      },
      isPending: false,
    })),
    signOut: jest.fn(),
  },
}));

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

jest.mock("@/lib/actions/note", () => ({
  getNotes: mockGetNotes,
}));

jest.mock("@/lib/actions/label", () => ({
  getLabels: mockGetLabels,
}));

jest.mock("@/components/UI/toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  },
}));
