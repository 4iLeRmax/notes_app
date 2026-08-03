import CreateNotePinButton from "@/components/create-note/create-note-pin-button";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { useState } from "react";

const mockTogglePin = jest.fn();

afterEach(() => {
  mockTogglePin.mockClear();
});

function PinButtonHarness() {
  const [isPinned, setIsPinned] = useState(false);
  return (
    <CreateNotePinButton
      isPinned={isPinned}
      togglePin={() => setIsPinned((p) => !p)}
    />
  );
}

describe("CreateNotePinButton", () => {
  it("should render correct icon while toggling", async () => {
    user.setup();
    render(<PinButtonHarness />);

    const button = screen.getByRole("button", { name: /pin note/i });
    expect(button.querySelector("svg")).toHaveClass("lucide-pin");

    await user.click(button);
    expect(button.querySelector("svg")).toHaveClass("lucide-pin-off");

    await user.click(button);
    expect(button.querySelector("svg")).toHaveClass("lucide-pin");
  });

  it("should call togglePin when clicked", async () => {
    user.setup();
    render(<CreateNotePinButton isPinned={false} togglePin={mockTogglePin} />);

    await user.click(screen.getByRole("button", { name: /pin note/i }));
    expect(mockTogglePin).toHaveBeenCalledTimes(1);
  });
});
