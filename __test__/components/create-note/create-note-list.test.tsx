import "@testing-library/jest-dom";
import {
  getAllByPlaceholderText,
  render,
  screen,
} from "@testing-library/react";
import user from "@testing-library/user-event";

import CreateNoteList from "@/components/create-note/create-note-list";
import { CreateLocalNote } from "@/components/create-note/create-note";
import { useState } from "react";

const mockSetNote = jest.fn();

function Wrapper() {
  const [note, setNote] = useState<CreateLocalNote>({
    title: "",
    content: [],
    type: "TODO",
    isPinned: false,
  });
  return <CreateNoteList content={note.content} setNote={setNote} />;
}

describe("CreateNoteList", () => {
  it("should render 'Create first item' button", () => {
    render(<CreateNoteList content={[]} setNote={mockSetNote} />);

    const createButton = screen.getByRole("button", {
      name: /create first item/i,
    });

    expect(createButton).toBeInTheDocument();
  });

  it("should render 'Create item' button instead of 'Create first item' after create button is clicked", async () => {
    user.setup();
    render(<Wrapper />);

    const createButton = screen.getByRole("button", {
      name: /create first item/i,
    });

    expect(createButton).toBeInTheDocument();
    await user.click(createButton);

    expect(
      screen.queryByRole("button", {
        name: /create first item/i,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /create item/i,
      }),
    ).toBeInTheDocument();
  });

  it("should render first list item after 'Create first item' button is clicked", async () => {
    user.setup();
    render(<Wrapper />);

    const createItemButton = screen.getByRole("button", {
      name: /create first item/i,
    });

    await user.click(createItemButton);

    const listItem = screen.getByPlaceholderText(/type something.../i);
    expect(listItem).toBeInTheDocument();
  });

  it("should render first list item with focus", async () => {
    user.setup();
    render(<Wrapper />);

    const createItemButton = screen.getByRole("button", {
      name: /create first item/i,
    });

    await user.click(createItemButton);

    const listItem = screen.getByPlaceholderText(/type something.../i);
    expect(listItem).toHaveFocus();
  });

  it("should create create first item then add two more", async () => {
    user.setup();
    render(<Wrapper />);

    await user.click(
      screen.getByRole("button", {
        name: /create first item/i,
      }),
    );

    expect(screen.getAllByPlaceholderText(/type something.../i)).toHaveLength(
      1,
    );

    await user.click(
      screen.getByRole("button", {
        name: /create item/i,
      }),
    );
    expect(screen.getAllByPlaceholderText(/type something.../i)).toHaveLength(
      2,
    );

    await user.click(
      screen.getByRole("button", {
        name: /create item/i,
      }),
    );
    expect(screen.getAllByPlaceholderText(/type something.../i)).toHaveLength(
      3,
    );
  });
});
