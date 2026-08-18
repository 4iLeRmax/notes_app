import Header from "@/components/header/header";
import TanstackQueryWrapper from "@/components/wrappers/tanstack-query-wrapper";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { act } from "react";

const Wrapper = () => {
  return (
    <TanstackQueryWrapper>
      <Header />
    </TanstackQueryWrapper>
  );
};

const mockRemoveAll = jest.fn();
const mockToggleSelectedNote = jest.fn();

afterEach(() => {
  mockRemoveAll.mockClear();
  (useSelectedNotesStore as unknown as jest.Mock).mockImplementation(
    (selector: any) =>
      selector({
        selectedNoteIds: [],
        removeAll: mockRemoveAll,
        toggleSelectedNote: mockToggleSelectedNote,
      }),
  );
});

describe("Header", () => {
  it("should render correctly", () => {
    render(<Wrapper />);

    const syncDataButton = screen.getByRole("button", { name: /sync data/i });
    expect(syncDataButton).toBeInTheDocument();

    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });
    expect(searchButton).toBeInTheDocument();

    const userButton = screen.getByRole("button", { name: /user info/i });
    expect(userButton).toBeInTheDocument();
  });

  it("should render selected notes menu when one ore more notes are selected", () => {
    (useSelectedNotesStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ selectedNoteIds: ["note-1"] }),
    );
    render(<Wrapper />);

    expect(screen.queryByTestId("select-notes-section")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /sync data/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /open search bar/i,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /user info/i }),
    ).not.toBeInTheDocument();
  });

  it("should NOT render selected notes menu when no notes are selected", () => {
    (useSelectedNotesStore as unknown as jest.Mock).mockImplementation(
      (selector) => selector({ selectedNoteIds: [] }),
    );

    render(<Wrapper />);

    expect(
      screen.queryByLabelText(/number of selected notes/i),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /open selected notes options/i,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /clear all selection/i,
      }),
    ).not.toBeInTheDocument();
  });

  // it("should render header then selected notes menu and again render header", async () => {
  //   (useSelectedNotesStore as unknown as jest.Mock).mockImplementation(
  //     (selector) => selector({ selectedNoteIds: [] }),
  //   );

  //   render(<Wrapper />);

  //   expect(screen.getByTestId("header-section")).toBeInTheDocument();
  //   expect(
  //     screen.queryByTestId("select-notes-section"),
  //   ).not.toBeInTheDocument();

  //   act(() => {
  //     useSelectedNotesStore.getState().toggleSelectedNote("note-1");
  //   });

  //   expect(screen.getByTestId("select-notes-section")).toBeInTheDocument();
  //   expect(screen.queryByTestId("header-section")).not.toBeInTheDocument();
  // });

  // it("should replace selected notes menu with header when clear all selections", async () => {
  //   user.setup();
  //   act(() => {
  //     useSelectedNotesStore.getState().toggleSelectedNote("note-1");
  //     useSelectedNotesStore.getState().toggleSelectedNote("note-2");
  //   });

  //   render(<Wrapper />);

  //   const clearButton = screen.getByRole("button", {
  //     name: /clear all selection/i,
  //   });

  //   await user.click(clearButton);

  //   expect(mockRemoveAll).toHaveBeenCalledTimes(1);

  //   expect(
  //     screen.queryByLabelText(/number of selected notes/i),
  //   ).not.toBeInTheDocument();

  //   expect(
  //     screen.queryByRole("button", {
  //       name: /open selected notes options/i,
  //     }),
  //   ).not.toBeInTheDocument();

  //   expect(
  //     screen.queryByRole("button", {
  //       name: /clear all selection/i,
  //     }),
  //   ).not.toBeInTheDocument();
  // });
});
