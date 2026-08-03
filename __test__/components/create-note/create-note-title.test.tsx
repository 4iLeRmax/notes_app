import { CreateLocalNote } from "@/components/create-note/create-note";
import CreateNoteTitle from "@/components/create-note/create-note-title";
import { NOTE_LIMITS } from "@/lib/constants";
import { TCreateNote } from "@/lib/zod-schemes/note-schemes/create-note.scheme";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { useState } from "react";

const Function = () => {
  const [note, setNote] = useState<CreateLocalNote>({
    title: "",
    content: [],
    type: "TEXT",
    isPinned: false,
  });

  return <CreateNoteTitle noteTitle={note.title} setNote={setNote} />;
};

describe("CreateNoteTitle", () => {
  it("should not by able to receive more then 128 chars in the title field", async () => {
    user.setup();
    render(<Function />);

    const titleInput = screen.getByPlaceholderText(/title.../i);
    expect(titleInput).toBeInTheDocument();

    await user.type(titleInput, "1".repeat(NOTE_LIMITS.MAX_TITLE_CHARS + 1));
    expect(titleInput).toHaveDisplayValue(
      "1".repeat(NOTE_LIMITS.MAX_TITLE_CHARS),
    );
  });
});
