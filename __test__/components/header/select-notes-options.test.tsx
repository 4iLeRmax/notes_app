import SelectNotesOptions from "@/components/header/select-notes-section/select-notes-options/select-notes-options";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

describe("SelectNotesOptions", () => {
  it("should render menu button", () => {
    render(<SelectNotesOptions noteIds={["note-1"]} />);

    expect(
      screen.getByLabelText(/open selected notes options/i),
    ).toBeInTheDocument();
  });

  it("should render correct icon when closed", () => {
    render(<SelectNotesOptions noteIds={["note-1"]} />);

    const menuButton = screen.getByRole("button", { name: /options button/i });
    expect(
      menuButton.querySelector(".lucide-ellipsis-vertical"),
    ).toBeInTheDocument();
  });

  it("should render correct icon when open", async () => {
    render(<SelectNotesOptions noteIds={["note-1"]} />);

    const menuButton = screen.getByRole("button", { name: /options button/i });

    await user.click(menuButton);

    expect(menuButton.querySelector(".lucide-x")).toBeInTheDocument();
  });

  it("should render options list when clicked", async () => {
    user.setup();
    render(
      <div>
        <SelectNotesOptions noteIds={["note-1"]} />
        <div id="modals"></div>
      </div>,
    );

    const menuButton = screen.getByRole("button", { name: /options button/i });

    expect(
      screen.queryByTestId("select-notes-options-list"),
    ).not.toBeInTheDocument();

    await user.click(menuButton);

    expect(screen.getAllByTestId("select-notes-options-list")).toHaveLength(2);
  });

  it("should NOT render options list when clicked twice", async () => {
    user.setup();
    render(
      <div>
        <SelectNotesOptions noteIds={["note-1"]} />
        <div id="modals"></div>
      </div>,
    );

    const menuButton = screen.getByRole("button", { name: /options button/i });

    expect(
      screen.queryByTestId("select-notes-options-list"),
    ).not.toBeInTheDocument();

    await user.click(menuButton);

    expect(screen.getAllByTestId("select-notes-options-list")).toHaveLength(2);

    await user.click(menuButton);

    expect(
      screen.queryByTestId("select-notes-options-list"),
    ).not.toBeInTheDocument();
  });
});
