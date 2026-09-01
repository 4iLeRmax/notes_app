import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import SelectNotesSection from "@/components/header/select-notes-section/select-notes-section";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import { mockRemoveAll } from "../../../jest.setup";

afterEach(() => {
  (useSelectedNotesStore as unknown as jest.Mock).mockImplementation(
    (selector) => selector({ selectedNoteIds: [] }),
  );
});

describe("SelectNotesSection", () => {
  it("should renders correctly", () => {
    (useSelectedNotesStore as unknown as jest.Mock).mockImplementation(
      (selector) => selector({ selectedNoteIds: ["note-1", "note-2"] }),
    );

    render(<SelectNotesSection />);

    const numberOfSelectedNotes = screen.getByLabelText(
      /number of selected notes/i,
    );

    expect(numberOfSelectedNotes).toBeInTheDocument();
    expect(numberOfSelectedNotes).toHaveTextContent("2");

    const selectedNotesOptionButton = screen.getByRole("button", {
      name: /options button/i,
    });
    expect(selectedNotesOptionButton).toBeInTheDocument();

    const clearButton = screen.getByRole("button", {
      name: /clear all selection/i,
    });
    expect(clearButton).toBeInTheDocument();
  });

  it("should call removeAll when clear button is clicked", async () => {
    (useSelectedNotesStore as unknown as jest.Mock).mockImplementation(
      (selector) =>
        selector({ selectedNoteIds: ["note-1"], removeAll: mockRemoveAll }),
    );

    user.setup();

    render(<SelectNotesSection />);

    const clearButton = screen.getByRole("button", {
      name: /clear all selection/i,
    });
    expect(clearButton).toBeInTheDocument();

    await user.click(clearButton);

    expect(mockRemoveAll).toHaveBeenCalledTimes(1);
  });
});
