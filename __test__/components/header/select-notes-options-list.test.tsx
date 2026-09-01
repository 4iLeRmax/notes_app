import SelectNotesOptionsList from "@/components/header/select-notes-section/select-notes-options/select-notes-options-list";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { useNotesStore } from "@/lib/store/useNotesStore";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import SelectNotesOptions from "@/components/header/select-notes-section/select-notes-options/select-notes-options";

const Wrapper = () => {
  return (
    <div>
      <SelectNotesOptions noteIds={["note-1"]} />
      <div id="modals"></div>
      <button>Click Outside</button>
    </div>
  );
};

describe("SelectNotesOptionsList", () => {
  // it("should render correctly", async () => {
  //   user.setup();
  //   render(<Wrapper />);
  //   await user.click(screen.getByRole("button", { name: /options button/i }));
  //   expect(
  //     screen.getByRole("button", { name: /toggle note types/i }),
  //   ).toBeInTheDocument();
  //   expect(
  //     screen.getByRole("button", { name: /create copies/i }),
  //   ).toBeInTheDocument();
  //   expect(
  //     screen.getByRole("button", { name: /delete notes/i }),
  //   ).toBeInTheDocument();
  // });
  // it("should NOT close when scroll", async () => {
  //   user.setup();
  //   render(<Wrapper />);
  //   await user.click(screen.getByRole("button", { name: /options button/i }));
  //   expect(
  //     screen.getByTestId(/select-notes-options-list/i),
  //   ).toBeInTheDocument();
  //   fireEvent.scroll(window);
  //   expect(
  //     screen.getByTestId(/select-notes-options-list/i),
  //   ).toBeInTheDocument();
  // });
  // it("should close options list when clicked outside", async () => {
  //   user.setup();
  //   render(<Wrapper />);
  //   await user.click(screen.getByRole("button", { name: /options button/i }));
  //   expect(
  //     screen.getByTestId(/select-notes-options-list/i),
  //   ).toBeInTheDocument();
  //   await user.click(screen.getByRole("button", { name: /click outside/i }));
  //   expect(
  //     screen.queryByTestId(/select-notes-options-list/i),
  //   ).not.toBeInTheDocument();
  // });
});
