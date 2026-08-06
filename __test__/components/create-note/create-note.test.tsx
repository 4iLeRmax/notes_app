import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import CreateNote, {
  CreateLocalNote,
} from "@/components/create-note/create-note";
import { mockAddNote } from "../../../jest.setup";
import { TCreateNote } from "@/lib/zod-schemes/note-schemes/create-note.scheme";
import { NOTE_LIMITS } from "@/lib/constants";

afterEach(() => {
  mockAddNote.mockClear();
});

describe("CreateNote", () => {
  it("should renders correctly", () => {
    render(<CreateNote />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    expect(textareaElement).toBeInTheDocument();

    const plusButton = screen.getByRole("button", { name: /open note form/i });
    expect(plusButton).toBeInTheDocument();
  });

  it("should open when click on it", async () => {
    user.setup();
    render(<CreateNote />);
    const container = screen.getByTestId("create-note-container");

    await user.click(container);

    const headingElement = screen.getByRole("heading", {
      name: /create note/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("should open when click on textarea", async () => {
    user.setup();
    render(<CreateNote />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);

    await user.click(textareaElement);

    const headingElement = screen.getByRole("heading", {
      name: /create note/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("should open when click on plus button", async () => {
    user.setup();
    render(<CreateNote />);

    const buttonElement = screen.getByRole("button", {
      name: /open note form/i,
    });

    await user.click(buttonElement);

    const headingElement = screen.getByRole("heading", {
      name: /create note/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("should render all elements correctly when is open", async () => {
    user.setup();
    render(<CreateNote />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    expect(textareaElement).toBeInTheDocument();

    const headingElement = screen.getByRole("heading", {
      name: /create note/i,
    });
    expect(headingElement).toBeInTheDocument();

    const noteTypeButton = screen.getByRole("button", {
      name: /toggle note type/i,
    });
    expect(noteTypeButton).toBeInTheDocument();

    const pinButton = screen.getByRole("button", {
      name: /pin note/i,
    });
    expect(pinButton).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText("Title...");
    expect(inputElement).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /create/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("should toggle note content", async () => {
    user.setup();
    render(<CreateNote />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    expect(textareaElement).toBeInTheDocument();

    await user.click(textareaElement);

    const noteTypeButton = screen.getByRole("button", {
      name: /toggle note type/i,
    });

    await user.click(noteTypeButton);
    expect(textareaElement).not.toBeInTheDocument();

    const createItemButton = screen.getByRole("button", {
      name: /create first item/i,
    });
    expect(createItemButton).toBeInTheDocument();
  });

  it("should switch note type from 'TEXT' to 'TODO' and back to 'TEXT'", async () => {
    user.setup();
    render(<CreateNote />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);
    expect(textareaElement).toBeInTheDocument();

    const toggleNoteTypeButton = screen.getByRole("button", {
      name: /toggle note type/i,
    });
    await user.click(toggleNoteTypeButton);

    expect(
      screen.queryByPlaceholderText(/type something.../i),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /create first item/i,
      }),
    ).toBeInTheDocument();

    await user.click(toggleNoteTypeButton);

    expect(
      screen.queryByRole("button", {
        name: /create first item/i,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/type something.../i),
    ).toBeInTheDocument();
  });

  it("should close form outside click", async () => {
    user.setup();
    render(
      <div>
        <CreateNote />
        <button>Outside button</button>
      </div>,
    );

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    const headingElement = screen.getByRole("heading", {
      name: /create note/i,
    });
    expect(headingElement).toBeInTheDocument();

    const outsideButton = screen.getByRole("button", {
      name: /outside button/i,
    });
    await user.click(outsideButton);

    expect(headingElement).not.toBeInTheDocument();
  });

  it("should close after the title input was focused and clicked outside", async () => {
    user.setup();
    render(
      <div>
        <CreateNote />
        <button>Outside button</button>
      </div>,
    );
    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    const headingElement = screen.getByRole("heading", {
      name: /create note/i,
    });
    expect(headingElement).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText(/title.../i);
    await user.click(titleInput);

    const outsideButton = screen.getByRole("button", {
      name: /outside button/i,
    });
    await user.click(outsideButton);

    expect(
      screen.queryByRole("heading", {
        name: /create note/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("should close after the content textarea was focused and clicked outside", async () => {
    user.setup();
    render(
      <div>
        <CreateNote />
        <button>Outside button</button>
      </div>,
    );
    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    const headingElement = screen.getByRole("heading", {
      name: /create note/i,
    });
    expect(headingElement).toBeInTheDocument();

    const outsideButton = screen.getByRole("button", {
      name: /outside button/i,
    });
    await user.click(outsideButton);

    expect(
      screen.queryByRole("heading", {
        name: /create note/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("should close after the note type button was clicked and clicked outside", async () => {
    user.setup();
    render(
      <div>
        <CreateNote />
        <button>Outside button</button>
      </div>,
    );
    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    const headingElement = screen.getByRole("heading", {
      name: /create note/i,
    });
    expect(headingElement).toBeInTheDocument();

    const noteTypeButton = screen.getByRole("button", {
      name: /toggle note type/i,
    });
    await user.click(noteTypeButton);

    const outsideButton = screen.getByRole("button", {
      name: /outside button/i,
    });
    await user.click(outsideButton);

    expect(
      screen.queryByRole("heading", {
        name: /create note/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("should close after the pin button was clicked and clicked outside", async () => {
    user.setup();
    render(
      <div>
        <CreateNote />
        <button>Outside button</button>
      </div>,
    );
    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    const headingElement = screen.getByRole("heading", {
      name: /create note/i,
    });
    expect(headingElement).toBeInTheDocument();

    const pinButton = screen.getByRole("button", {
      name: /pin note/i,
    });
    await user.click(pinButton);

    const outsideButton = screen.getByRole("button", {
      name: /outside button/i,
    });
    await user.click(outsideButton);

    expect(
      screen.queryByRole("heading", {
        name: /create note/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("should submit data when only the title input field is filled ", async () => {
    user.setup();
    render(<CreateNote />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    const titleInput = screen.getByPlaceholderText(/title.../i);
    await user.type(titleInput, "test title text");

    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    const expectedObj: TCreateNote = {
      title: "test title text",
      content: [],
      type: "TEXT",
      isPinned: false,
    };

    expect(mockAddNote).toHaveBeenCalledWith(
      expect.objectContaining(expectedObj),
      "test-user",
    );
  });

  it("should submit data when only the content input field is filled", async () => {
    user.setup();
    render(<CreateNote />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    await user.type(textareaElement, "test text");

    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    const expectedObj: TCreateNote = {
      title: "",
      content: [
        {
          content: "test text",
          isDone: false,
        },
      ],
      type: "TEXT",
      isPinned: false,
    };

    expect(mockAddNote).toHaveBeenCalledWith(
      expect.objectContaining(expectedObj),
      "test-user",
    );
  });

  it("should submit data when both inputs are filled", async () => {
    user.setup();
    render(<CreateNote />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    const titleInput = screen.getByPlaceholderText(/title.../i);
    await user.type(titleInput, "test title text");
    await user.type(textareaElement, "test text");

    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    const expectedObj: TCreateNote = {
      title: "test title text",
      content: [
        {
          content: "test text",
          isDone: false,
        },
      ],
      type: "TEXT",
      isPinned: false,
    };

    expect(mockAddNote).toHaveBeenCalledWith(
      expect.objectContaining(expectedObj),
      "test-user",
    );
  });

  it("should submit data on blur when title field are filled", async () => {
    user.setup();
    render(
      <div>
        <CreateNote />
        <button>Outside button</button>
      </div>,
    );

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    const titleInput = screen.getByPlaceholderText(/title.../i);
    await user.type(titleInput, "test title text");

    const outsideButton = screen.getByRole("button", {
      name: /outside button/i,
    });

    await user.click(outsideButton);

    const expectedObj: TCreateNote = {
      title: "test title text",
      content: [],
      type: "TEXT",
      isPinned: false,
    };

    expect(mockAddNote).toHaveBeenCalledWith(
      expect.objectContaining(expectedObj),
      "test-user",
    );
  });

  it("should submit data on blur when content field are filled", async () => {
    user.setup();
    render(
      <div>
        <CreateNote />
        <button>Outside button</button>
      </div>,
    );

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    await user.type(textareaElement, "test text");

    const outsideButton = screen.getByRole("button", {
      name: /outside button/i,
    });

    await user.click(outsideButton);

    const expectedObj: TCreateNote = {
      title: "",
      content: [
        {
          content: "test text",
          isDone: false,
        },
      ],
      type: "TEXT",
      isPinned: false,
    };

    expect(mockAddNote).toHaveBeenCalledWith(
      expect.objectContaining(expectedObj),
      "test-user",
    );
  });

  it("should submit data on blur when both fields are filled", async () => {
    user.setup();
    render(
      <div>
        <CreateNote />
        <button>Outside button</button>
      </div>,
    );

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    const titleInput = screen.getByPlaceholderText(/title.../i);
    await user.type(titleInput, "test title text");
    await user.type(textareaElement, "test text");

    const outsideButton = screen.getByRole("button", {
      name: /outside button/i,
    });

    await user.click(outsideButton);

    const expectedObj: TCreateNote = {
      title: "test title text",
      content: [
        {
          content: "test text",
          isDone: false,
        },
      ],
      type: "TEXT",
      isPinned: false,
    };

    expect(mockAddNote).toHaveBeenCalledWith(
      expect.objectContaining(expectedObj),
      "test-user",
    );
  });

  it("should not submit empty form", async () => {
    user.setup();
    render(<CreateNote />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    expect(mockAddNote).toHaveBeenCalledTimes(0);
  });

  it("should not submit form without session", async () => {
    user.setup();
    render(<CreateNote />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);
    await user.type(textareaElement, "test text");

    const expectedObj: TCreateNote = {
      title: "",
      content: [
        {
          content: "test text",
          isDone: false,
        },
      ],
      isPinned: false,
      type: "TEXT",
    };

    jest.mock("@/lib/auth-client", () => ({
      authClient: {
        useSession: () => ({
          data: null,
          isPending: false,
        }),
      },
    }));

    expect(mockAddNote).not.toHaveBeenCalledWith(
      expect.objectContaining(expectedObj),
      "test-user",
    );
  });

  it("should submit isPinned", async () => {
    user.setup();
    render(<CreateNote />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    await user.type(textareaElement, "test text");

    const pinButton = screen.getByRole("button", { name: /pin note/i });
    await user.click(pinButton);

    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    const expectedObj: TCreateNote = {
      title: "",
      content: [
        {
          content: "test text",
          isDone: false,
        },
      ],
      type: "TEXT",
      isPinned: true,
    };

    expect(mockAddNote).toHaveBeenCalledWith(
      expect.objectContaining(expectedObj),
      "test-user",
    );
  });

  it("should convert content from text to todo and opposite within the limits", async () => {
    user.setup();
    render(<CreateNote />);

    const testContentArr: CreateLocalNote["content"] = Array.from(
      { length: 10 },
      (_, i) => ({
        id: String(i),
        position: i,
        content: `Item ${i + 1}`,
        isDone: false,
      }),
    );
    const testContentText = testContentArr
      .map((item) => item.content)
      .join("\n");

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);
    await user.paste(testContentText);

    expect(textareaElement).toHaveDisplayValue(testContentText);

    const toggleNoteTypeButton = screen.getByRole("button", {
      name: /toggle note type/i,
    });
    await user.click(toggleNoteTypeButton);

    const listItems = screen.getAllByPlaceholderText(/type something.../i);
    expect(listItems).toHaveLength(testContentArr.length);

    for (let i = 0; i < testContentArr.length; i++) {
      expect(listItems[i]).toHaveDisplayValue(testContentArr[i].content);
    }

    await user.click(toggleNoteTypeButton);
    expect(textareaElement).toHaveDisplayValue(testContentText);
  });

  it("should NOT convert content from text to todo when maxCharsPerItem limit too big for todo item", async () => {
    user.setup();
    render(<CreateNote />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);

    await user.click(textareaElement);
    await user.paste("1".repeat(NOTE_LIMITS.TODO.maxCharsPerItem + 1));

    expect(textareaElement).toHaveDisplayValue(
      "1".repeat(NOTE_LIMITS.TODO.maxCharsPerItem + 1),
    );

    const noteTypeButton = screen.getByRole("button", {
      name: /toggle note type/i,
    });

    await user.click(noteTypeButton);

    expect(
      screen.queryByRole("button", { name: /create item/i }),
    ).not.toBeInTheDocument();
  });
});
