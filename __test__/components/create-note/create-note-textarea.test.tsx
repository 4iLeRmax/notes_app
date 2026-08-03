import { CreateLocalNote } from "@/components/create-note/create-note";
import CreateNoteTextarea from "@/components/create-note/create-note-textarea";
import { NOTE_LIMITS } from "@/lib/constants";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { useState } from "react";

const mockSetNote = jest.fn();

function ControlledWrapper({
  initialContent = [],
}: {
  initialContent?: CreateLocalNote["content"];
}) {
  const [note, setNote] = useState<CreateLocalNote>({
    title: "",
    content: initialContent,
    type: "TEXT",
    isPinned: false,
  });
  return <CreateNoteTextarea content={note.content} setNote={setNote} />;
}

describe("CreateNoteTextarea", () => {
  it("should render correctly", () => {
    render(<CreateNoteTextarea content={[]} setNote={mockSetNote} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should not be able to receive more total chars then limits", async () => {
    user.setup();
    render(<ControlledWrapper />);

    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    await user.paste("1".repeat(NOTE_LIMITS.TEXT.totalChars + 1));

    expect(textareaElement).toHaveDisplayValue(
      "1".repeat(NOTE_LIMITS.TEXT.totalChars),
    );
  }, 15000);

  it("should not be able to receive more items then limits", async () => {
    user.setup();
    render(<ControlledWrapper />);
    const textareaElement = screen.getByPlaceholderText(/type something.../i);
    await user.click(textareaElement);

    const lines = Array.from(
      { length: NOTE_LIMITS.TEXT.maxItems + 1 },
      (_, i) => String(i),
    );

    const wrongText = lines.join("\n");
    const expectedText = lines.slice(0, NOTE_LIMITS.TEXT.maxItems).join("\n");

    await user.paste(wrongText);

    // expect(textareaElement).toHaveValue(expectedText);
    expect(textareaElement).toHaveDisplayValue(expectedText);
  }, 15000);
});
