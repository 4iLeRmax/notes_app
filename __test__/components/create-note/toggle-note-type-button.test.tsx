import ToggleNoteTypeButton from "@/components/create-note/toggle-note-type-button";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

const mockToggleNoteType = jest.fn();

describe("ToggleNoteTypeButton", () => {
  it("calls toggleNoteType when clicked", async () => {
    render(
      <ToggleNoteTypeButton
        noteType="TEXT"
        toggleNoteType={mockToggleNoteType}
      />,
    );

    await user.click(screen.getByRole("button", { name: /toggle note type/i }));
    expect(mockToggleNoteType).toHaveBeenCalledTimes(1);
  });

  it("should render correct icon", async () => {
    user.setup();
    render(
      <ToggleNoteTypeButton
        noteType="TEXT"
        toggleNoteType={mockToggleNoteType}
      />,
    );

    expect(screen.getByRole("button").querySelector("lucide-file-text"));

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("button").querySelector("lucide-list-todo"));

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("button").querySelector("lucide-file-text"));
  });
});
