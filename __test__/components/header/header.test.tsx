import Header from "@/components/header/header";
import TanstackQueryWrapper from "@/components/wrappers/root-wrapper/tanstack-query-wrapper";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

const Wrapper = () => {
  return (
    <TanstackQueryWrapper>
      <Header />
    </TanstackQueryWrapper>
  );
};

const mockedUsePathname = usePathname as jest.Mock;

describe("Header", () => {
  it("should render header section when no notes are selected", () => {
    mockedUsePathname.mockReturnValue("/notes");

    (useSelectedNotesStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ selectedNoteIds: [] }),
    );

    render(<Wrapper />);

    expect(
      screen.getByRole("button", { name: /sync data/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /open search bar/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /user info/i }),
    ).toBeInTheDocument();
  });

  it("should NOT render header section when one ore more notes are selected", () => {
    (useSelectedNotesStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ selectedNoteIds: ["note-1"] }),
    );

    render(<Wrapper />);

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

  it("should render selected notes section when one ore more notes are selected", () => {
    (useSelectedNotesStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ selectedNoteIds: ["note-1"] }),
    );
    render(<Wrapper />);

    expect(
      screen.getByLabelText(/number of selected notes/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /options button/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /clear all selection/i,
      }),
    ).toBeInTheDocument();
  });

  it("should NOT render selected notes section when no notes are selected", () => {
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
});
