import "@testing-library/jest-dom";
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreateNote from "@/components/create-note/create-note";
import { useNotesStore } from "@/lib/store/useNotesStore";
import useViewModeStore, { ViewMode } from "@/lib/store/useViewModeStore";
import { authClient } from "@/lib/auth-client";
import { TextEncoder, TextDecoder } from "util";

jest.mock("@/lib/store/useNotesStore");
jest.mock("@/lib/store/useViewModeStore", () => ({
  __esModule: true,
  default: jest.fn(),
  ViewMode: { GRID: "GRID", LIST: "LIST" },
}));
jest.mock("@/lib/auth-client", () => ({
  authClient: { useSession: jest.fn() },
}));

const mockedUseNotesStore = useNotesStore as unknown as jest.Mock;
const mockedUseViewModeStore = useViewModeStore as unknown as jest.Mock;
const mockedUseSession = authClient.useSession as jest.Mock;

describe("CreateNote", () => {
  const addNote = jest.fn();

  beforeAll(() => {
    // Fix for Prisma / TextEncoder error
    if (typeof global.TextEncoder === "undefined") {
      const { TextEncoder, TextDecoder } = require("util");
      global.TextEncoder = TextEncoder;
      global.TextDecoder = TextDecoder;
    }

    // Your existing crypto polyfill
    if (!global.crypto || typeof global.crypto.randomUUID !== "function") {
      // @ts-expect-error test-only polyfill
      global.crypto = { randomUUID: () => Math.random().toString(36).slice(2) };
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseNotesStore.mockImplementation((selector: any) =>
      selector({ addNote, isPending: false }),
    );
    mockedUseViewModeStore.mockImplementation((selector: any) =>
      selector({ viewMode: ViewMode.GRID }),
    );
    mockedUseSession.mockReturnValue({
      data: { session: { userId: "user-1" } },
      isPending: false,
    });
  });

  it("does not submit an empty note, but submits once title and content are filled in", async () => {
    const user = userEvent.setup();
    render(<CreateNote />);

    const textarea = screen.getByPlaceholderText("Type something...");
    await user.click(textarea); // opens the form

    const createButton = screen.getByRole("button", { name: /create/i });
    await user.click(createButton);
    expect(addNote).not.toHaveBeenCalled();

    const titleInput = screen.getByPlaceholderText("Title...");
    await user.type(titleInput, "Groceries");
    await user.type(textarea, "Milk, eggs, bread");
    await user.click(createButton);

    await waitFor(() => expect(addNote).toHaveBeenCalledTimes(1));
    expect(addNote).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Groceries",
        type: "TEXT",
        isPinned: false,
        content: expect.arrayContaining([
          expect.objectContaining({ content: "Milk, eggs, bread" }),
        ]),
      }),
      "user-1",
    );
    expect(titleInput).toHaveValue(""); // cleared after submit
  });

  it("submits and closes the form when focus moves outside the container", async () => {
    const user = userEvent.setup();
    render(<CreateNote />);

    const textarea = screen.getByPlaceholderText("Type something...");
    await user.click(textarea);
    await user.type(textarea, "Saved via blur");

    await user.click(document.body); // a real focus change, not fireEvent.blur

    await waitFor(() => expect(addNote).toHaveBeenCalledTimes(1));
  });

  it("does NOT submit when focus moves between fields inside the form", async () => {
    const user = userEvent.setup();
    render(<CreateNote />);

    const textarea = screen.getByPlaceholderText("Type something...");
    await user.click(textarea);

    const titleInput = screen.getByPlaceholderText("Title...");
    await user.type(titleInput, "Still drafting");
    await user.click(textarea); // focus moves, but stays inside the container

    expect(addNote).not.toHaveBeenCalled();
    expect(titleInput).toHaveValue("Still drafting");
  });

  it("does not submit without an authenticated session", async () => {
    mockedUseSession.mockReturnValue({ data: null, isPending: false });
    const user = userEvent.setup();
    render(<CreateNote />);

    const textarea = screen.getByPlaceholderText("Type something...");
    await user.click(textarea);
    await user.type(textarea, "Should never be saved");
    await user.click(document.body);

    expect(addNote).not.toHaveBeenCalled();
  });

  it("toggling to TODO and adding an item is reflected in the submitted payload", async () => {
    const user = userEvent.setup();
    render(<CreateNote />);

    const textarea = screen.getByPlaceholderText("Type something...");
    await user.click(textarea); // open the form in TEXT mode first

    await user.click(screen.getByTestId("toggle-note-type"));

    await user.click(screen.getByText("Create first item"));
    const itemTextarea = screen.getAllByPlaceholderText("Type something...")[0];
    await user.type(itemTextarea, "Buy milk");

    await user.click(document.body); // blur outside submits

    await waitFor(() => expect(addNote).toHaveBeenCalledTimes(1));
    expect(addNote).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "TODO",
        content: expect.arrayContaining([
          expect.objectContaining({ content: "Buy milk" }),
        ]),
      }),
      "user-1",
    );
  });
});
