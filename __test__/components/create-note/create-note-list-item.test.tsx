import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import CreateNoteListItem from "@/components/create-note/create-note-list-item";

describe("CreateNoteListItem", () => {
  it("should render correctly", () => {
    render(
      <CreateNoteListItem
        item={{ id: "1", position: 0, content: "", isDone: false }}
        addNewItem={() => {}}
        removeItem={() => {}}
        toggleItemStatus={() => {}}
        handleChangeItem={() => {}}
        listRef={{ current: null }}
        pendingFocusId={null}
        clearPendingFocusId={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", { name: /drag to reorder/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /toggle item status/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/type something.../i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /delete item/i }),
    ).toBeInTheDocument();
  });
});
