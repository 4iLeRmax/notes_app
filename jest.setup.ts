export const mockAddNote = jest.fn();

jest.mock("@/lib/store/useNotesStore", () => ({
  useNotesStore: jest.fn((selector: any) =>
    selector({ addNote: mockAddNote, isPending: false }),
  ),
}));

jest.mock("@/lib/auth-client", () => ({
  authClient: {
    useSession: () => ({
      data: { session: { userId: "test-user" } },
      isPending: false,
    }),
  },
}));

jest.mock("@/lib/store/useViewModeStore", () => ({
  __esModule: true,
  default: jest.fn(() => "GRID"),
  ViewMode: { GRID: "GRID", LIST: "LIST" },
}));
