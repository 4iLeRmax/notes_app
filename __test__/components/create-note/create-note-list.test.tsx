import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import CreateNoteList from "@/components/create-note/create-note-list";
import { CreateLocalNote } from "@/components/create-note/create-note";
import { useState } from "react";
import { NOTE_LIMITS } from "@/lib/constants";

const mockSetNote = jest.fn();

function Wrapper({
  initialContent = [],
}: {
  initialContent?: CreateLocalNote["content"];
}) {
  const [note, setNote] = useState<CreateLocalNote>({
    title: "",
    content: initialContent,
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

  it("should create first item then add two more", async () => {
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

  it("should NOT create more items than the limit", async () => {
    user.setup();

    const testContent: CreateLocalNote["content"] = Array.from(
      { length: NOTE_LIMITS.TODO.maxItems },
      (_, i) => ({
        id: String(i),
        position: i,
        content: String(i),
        isDone: false,
      }),
    );

    render(<Wrapper initialContent={testContent} />);

    const createItemButton = screen.getByRole("button", {
      name: /create item/i,
    });

    await user.click(createItemButton);

    expect(screen.getAllByPlaceholderText(/type something.../i)).toHaveLength(
      NOTE_LIMITS.TODO.maxItems,
    );
  });

  it("should NOT be able to receive more chars per item then limits", async () => {
    user.setup();
    render(
      <Wrapper
        initialContent={[{ id: "1", content: "", isDone: false, position: 0 }]}
      />,
    );

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);
    await user.paste("1".repeat(NOTE_LIMITS.TODO.maxCharsPerItem + 1));

    expect(textareaElement).toHaveDisplayValue(
      "1".repeat(NOTE_LIMITS.TODO.maxCharsPerItem),
    );
  });

  it("should NOT be able to receive more total chars then limits", async () => {
    user.setup();

    const maxItemsWithMaxCharsPerItem =
      NOTE_LIMITS.TODO.totalChars / NOTE_LIMITS.TODO.maxCharsPerItem;

    const testContent: CreateLocalNote["content"] = Array.from(
      {
        length: maxItemsWithMaxCharsPerItem,
      },
      (_, i) => ({
        id: String(i),
        position: i,
        content: "1".repeat(NOTE_LIMITS.TODO.maxCharsPerItem),
        isDone: false,
      }),
    );

    render(<Wrapper initialContent={testContent} />);
    const listItems = screen.getAllByPlaceholderText(/type something.../i);

    expect(listItems).toHaveLength(maxItemsWithMaxCharsPerItem);

    const createItemButton = screen.getByRole("button", {
      name: /create item/i,
    });

    await user.click(createItemButton);
    expect(screen.getAllByPlaceholderText(/type something.../i)).toHaveLength(
      maxItemsWithMaxCharsPerItem + 1,
    );

    const newlyAddedItem =
      screen.getAllByPlaceholderText(/type something.../i)[
        screen.getAllByPlaceholderText(/type something.../i).length - 1
      ];

    await user.type(newlyAddedItem, "1");
    expect(newlyAddedItem).toHaveDisplayValue("");
  });

  it("should create one items and delete it", async () => {
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

    const deleteButtons = screen.getAllByRole("button", {
      name: /delete item/i,
    });

    await user.click(deleteButtons[0]);

    expect(screen.queryAllByPlaceholderText(/type something.../i)).toHaveLength(
      0,
    );
  });

  it("should create two items and delete first one", async () => {
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

    const deleteButtons = screen.getAllByRole("button", {
      name: /delete item/i,
    });

    await user.click(deleteButtons[0]);

    expect(screen.getAllByPlaceholderText(/type something.../i)).toHaveLength(
      1,
    );
  });

  it("should check the first item's checkbox and uncheck it when clicked twice", async () => {
    user.setup();
    render(
      <Wrapper
        initialContent={[{ id: "1", content: "", isDone: false, position: 0 }]}
      />,
    );

    const checkboxButton = screen.getByRole("button", {
      name: /toggle item status/i,
    });
    expect(checkboxButton).toHaveAttribute("aria-pressed", "false");

    await user.click(checkboxButton);

    expect(checkboxButton).toHaveAttribute("aria-pressed", "true");

    await user.click(checkboxButton);

    expect(checkboxButton).toHaveAttribute("aria-pressed", "false");
  });

  // ENTER
  it('should create second item when pressing "Enter" key at the end of first item', async () => {
    user.setup();
    render(
      <Wrapper
        initialContent={[
          { id: "1", content: "First item", isDone: false, position: 0 },
        ]}
      />,
    );

    const firstItemTextarea = screen.getByDisplayValue(
      /first item/i,
    ) as HTMLTextAreaElement;
    await user.click(firstItemTextarea);
    firstItemTextarea.setSelectionRange(
      firstItemTextarea.value.length,
      firstItemTextarea.value.length,
    );
    await user.keyboard("{Enter}");

    expect(screen.getAllByPlaceholderText(/type something.../i)).toHaveLength(
      2,
    );

    const newlyCreatedTextarea = screen.getByDisplayValue(
      "",
    ) as HTMLTextAreaElement;

    expect(newlyCreatedTextarea).toHaveFocus();
    expect(newlyCreatedTextarea.selectionStart).toBe(0);
    expect(newlyCreatedTextarea.selectionEnd).toBe(0);
  });

  it('should NOT create second item when pressing "Enter" key at the end of first item', async () => {
    user.setup();
    render(
      <Wrapper
        initialContent={[
          { id: "1", content: "First item", isDone: false, position: 0 },
        ]}
      />,
    );

    const firstItemTextarea = screen.getByDisplayValue(
      /first item/i,
    ) as HTMLTextAreaElement;
    await user.click(firstItemTextarea);
    firstItemTextarea.setSelectionRange(3, 3);
    await user.keyboard("{Enter}");

    expect(screen.getAllByPlaceholderText(/type something.../i)).toHaveLength(
      1,
    );
  });

  //BACKSPACE
  it("should delete item on Backspace at start and focuses end of previous item", async () => {
    user.setup();
    render(
      <Wrapper
        initialContent={[
          { id: "1", content: "First item", isDone: false, position: 0 },
          { id: "2", content: "", isDone: false, position: 1 },
        ]}
      />,
    );

    expect(screen.getAllByPlaceholderText(/type something.../i)).toHaveLength(
      2,
    );

    const secondItemTextarea = screen.getByDisplayValue(
      "",
    ) as HTMLTextAreaElement;

    await user.click(secondItemTextarea);
    secondItemTextarea.setSelectionRange(0, 0);
    await user.keyboard("{Backspace}");

    expect(screen.getAllByPlaceholderText(/type something.../i)).toHaveLength(
      1,
    );

    const firstItemTextarea = screen.getByDisplayValue(
      /first item/i,
    ) as HTMLTextAreaElement;

    expect(firstItemTextarea).toHaveFocus();
    expect(firstItemTextarea.selectionStart).toBe(
      firstItemTextarea.value.length,
    );
    expect(firstItemTextarea.selectionEnd).toBe(firstItemTextarea.value.length);
  });

  it("should NOT delete item on Backspace at start and focuses end of previous item", async () => {
    user.setup();
    render(
      <Wrapper
        initialContent={[
          { id: "1", content: "First item", isDone: false, position: 0 },
          { id: "2", content: "Second item", isDone: false, position: 1 },
        ]}
      />,
    );

    expect(screen.getAllByPlaceholderText(/type something.../i)).toHaveLength(
      2,
    );

    const secondItemTextarea = screen.getByDisplayValue(
      "Second item",
    ) as HTMLTextAreaElement;

    await user.click(secondItemTextarea);
    secondItemTextarea.setSelectionRange(0, 0);
    await user.keyboard("{Backspace}");

    expect(screen.getAllByPlaceholderText(/type something.../i)).toHaveLength(
      2,
    );
  });

  //Arrow left
  it("should go from second item to first item when pressing ArrowLeft key at the start of second item", async () => {
    user.setup();
    render(
      <Wrapper
        initialContent={[
          { id: "1", content: "First item", isDone: false, position: 0 },
          { id: "2", content: "Second item", isDone: false, position: 1 },
        ]}
      />,
    );

    const secondItemTextarea = screen.getByDisplayValue(
      /second item/i,
    ) as HTMLTextAreaElement;
    await user.click(secondItemTextarea);
    secondItemTextarea.setSelectionRange(0, 0);
    await user.keyboard("{ArrowLeft}");

    const firstItemTextarea = screen.getByDisplayValue(
      /first item/i,
    ) as HTMLTextAreaElement;

    expect(firstItemTextarea).toHaveFocus();

    expect(firstItemTextarea.selectionStart).toBe(
      firstItemTextarea.value.length,
    );
    expect(firstItemTextarea.selectionEnd).toBe(firstItemTextarea.value.length);
  });

  //Arrow Right
  it("should go from first item to second item when pressing ArrowRight key at the end of first item", async () => {
    user.setup();
    render(
      <Wrapper
        initialContent={[
          { id: "1", content: "First item", isDone: false, position: 0 },
          { id: "2", content: "Second item", isDone: false, position: 1 },
        ]}
      />,
    );

    const firstItemTextarea = screen.getByDisplayValue(
      /first item/i,
    ) as HTMLTextAreaElement;
    await user.click(firstItemTextarea);
    firstItemTextarea.setSelectionRange(
      firstItemTextarea.value.length,
      firstItemTextarea.value.length,
    );
    await user.keyboard("{ArrowRight}");

    const secondItemTextarea = screen.getByDisplayValue(
      /second item/i,
    ) as HTMLTextAreaElement;

    expect(secondItemTextarea).toHaveFocus();

    expect(secondItemTextarea.selectionStart).toBe(0);
    expect(secondItemTextarea.selectionEnd).toBe(0);
  });

  //Arrow Up
  it("should go from second item to first item when pressing ArrowUp key at the start of second item", async () => {
    user.setup();
    render(
      <Wrapper
        initialContent={[
          { id: "1", content: "First item", isDone: false, position: 0 },
          { id: "2", content: "Second item", isDone: false, position: 1 },
        ]}
      />,
    );

    const secondItemTextarea = screen.getByDisplayValue(
      /second item/i,
    ) as HTMLTextAreaElement;
    await user.click(secondItemTextarea);
    secondItemTextarea.setSelectionRange(0, 0);
    await user.keyboard("{ArrowUp}");

    const firstItemTextarea = screen.getByDisplayValue(
      /first item/i,
    ) as HTMLTextAreaElement;

    expect(firstItemTextarea).toHaveFocus();

    expect(firstItemTextarea.selectionStart).toBe(
      firstItemTextarea.value.length,
    );
    expect(firstItemTextarea.selectionEnd).toBe(firstItemTextarea.value.length);
  });

  //Arrow Down
  it("should go from first item to second item when pressing ArrowDown key at the end of first item", async () => {
    user.setup();
    render(
      <Wrapper
        initialContent={[
          { id: "1", content: "First item", isDone: false, position: 0 },
          { id: "2", content: "Second item", isDone: false, position: 1 },
        ]}
      />,
    );

    const firstItemTextarea = screen.getByDisplayValue(
      /first item/i,
    ) as HTMLTextAreaElement;
    await user.click(firstItemTextarea);
    firstItemTextarea.setSelectionRange(
      firstItemTextarea.value.length,
      firstItemTextarea.value.length,
    );
    await user.keyboard("{ArrowDown}");

    const secondItemTextarea = screen.getByDisplayValue(
      /second item/i,
    ) as HTMLTextAreaElement;

    expect(secondItemTextarea).toHaveFocus();

    expect(secondItemTextarea.selectionStart).toBe(0);
    expect(secondItemTextarea.selectionEnd).toBe(0);
  });
});
