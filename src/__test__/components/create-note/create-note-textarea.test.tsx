import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateNoteTextarea from "@/components/create-note/create-note-textarea";
import { CreateLocalNote } from "@/components/create-note/create-note";

function runUpdater(setNote: jest.Mock, prev: CreateLocalNote) {
  const updater = setNote.mock.calls[setNote.mock.calls.length - 1][0];
  return updater(prev);
}

const basePrev: CreateLocalNote = {
  title: "",
  type: "TEXT",
  isPinned: false,
  content: [],
};

describe("CreateNoteTextarea", () => {
  beforeAll(() => {
    if (!global.crypto || typeof global.crypto.randomUUID !== "function") {
      // @ts-expect-error test-only polyfill
      global.crypto = { randomUUID: () => Math.random().toString(36).slice(2) };
    }
  });

  it("splits a multi-line string into ordered content entries", () => {
    const setNote = jest.fn();
    render(<CreateNoteTextarea content={[]} setNote={setNote} formIsOpen />);

    fireEvent.change(screen.getByPlaceholderText("Type something..."), {
      target: { value: "first\nsecond\nthird" },
    });

    const result = runUpdater(setNote, basePrev);
    expect(result.content.map((c: any) => c.content)).toEqual([
      "first",
      "second",
      "third",
    ]);
    expect(result.content.map((c: any) => c.position)).toEqual([0, 1, 2]);
    expect(result.content.every((c: any) => c.isDone === false)).toBe(true);
  });

  it("produces a single empty-content entry for an empty string, not zero entries", () => {
    const setNote = jest.fn();
    render(
      <CreateNoteTextarea
        content={[{ id: "a", position: 0, content: "was here", isDone: false }]}
        setNote={setNote}
        formIsOpen
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Type something..."), {
      target: { value: "" },
    });

    const result = runUpdater(setNote, basePrev);
    expect(result.content).toHaveLength(1);
    expect(result.content[0].content).toBe("");
  });

  it("preserves blank lines in the middle as empty-content entries", () => {
    const setNote = jest.fn();
    render(<CreateNoteTextarea content={[]} setNote={setNote} formIsOpen />);

    fireEvent.change(screen.getByPlaceholderText("Type something..."), {
      target: { value: "a\n\nb" },
    });

    const result = runUpdater(setNote, basePrev);
    expect(result.content.map((c: any) => c.content)).toEqual(["a", "", "b"]);
  });

  it("renders the joined content as the textarea's display value", () => {
    render(
      <CreateNoteTextarea
        content={[
          { id: "a", position: 0, content: "one", isDone: false },
          { id: "b", position: 1, content: "two", isDone: false },
        ]}
        setNote={jest.fn()}
        formIsOpen
      />,
    );

    expect(screen.getByPlaceholderText("Type something...")).toHaveValue(
      "one\ntwo",
    );
  });
});
