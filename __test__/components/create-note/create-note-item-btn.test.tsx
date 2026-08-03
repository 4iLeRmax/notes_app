import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import CreateNoteItemBtn from "@/components/create-note/create-note-item-btn";

const mockAddNewItem = jest.fn();

describe("CreateNoteItemBtn", () => {
  it("should render 'Create first item' when valueLength is 0", () => {
    render(<CreateNoteItemBtn addNewItem={mockAddNewItem} valueLength={0} />);

    const createFirstItemButton = screen.getByRole("button", {
      name: /create first item/i,
    });
    expect(createFirstItemButton).toBeInTheDocument();

    const createItemButton = screen.queryByRole("button", {
      name: /create item/i,
    });
    expect(createItemButton).not.toBeInTheDocument();
  });

  it("should render 'Create item' when valueLength is 1 or higher", () => {
    render(<CreateNoteItemBtn addNewItem={mockAddNewItem} valueLength={1} />);

    const createFirstItemButton = screen.queryByRole("button", {
      name: /create first item/i,
    });
    expect(createFirstItemButton).not.toBeInTheDocument();

    const createItemButton = screen.getByRole("button", {
      name: /create item/i,
    });
    expect(createItemButton).toBeInTheDocument();
  });

  it("should call addNewItem when clicked", async () => {
    user.setup();
    render(<CreateNoteItemBtn addNewItem={mockAddNewItem} valueLength={0} />);

    await user.click(
      screen.getByRole("button", { name: /create first item/i }),
    );

    expect(mockAddNewItem).toHaveBeenCalledTimes(1);
  });
});
