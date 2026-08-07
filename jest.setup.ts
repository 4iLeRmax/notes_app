import { mockDeep } from "jest-mock-extended";
import { PrismaClient } from "@/generated/prisma/client";

export const mockAddNote = jest.fn();

jest.mock("@/lib/store/useNotesStore", () => ({
  useNotesStore: jest.fn((selector: any) =>
    selector({ addNote: mockAddNote, isPending: false }),
  ),
}));

jest.mock("@/lib/store/useSelectedNotesStore", () => ({
  __esModule: true,
  default: jest.fn((selector: any) => selector({ selectedNoteIds: [] })),
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
      data: {
        user: { id: "test-user", name: "Test User", email: "test@example.com" },
        session: { userId: "test-user" },
      },
      isPending: false,
    }),
    signOut: jest.fn(),
  },
}));

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/notes",
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("@/lib/actions/note", () => ({
  getNotes: jest.fn().mockResolvedValue([]),
}));

jest.mock("@/lib/actions/label", () => ({
  getLabels: jest.fn().mockResolvedValue([]),
}));
