import SyncData from "@/components/header/sync-data/sync-data";
import TanstackQueryWrapper from "@/components/wrappers/tanstack-query-wrapper";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { mockSetLabels, mockSetNotes } from "../../../jest.setup";
import { toast } from "@/components/UI/toast";

const Wrapper = () => {
  return (
    <TanstackQueryWrapper>
      <SyncData />
    </TanstackQueryWrapper>
  );
};

afterEach(() => {
  mockSetNotes.mockClear();
  mockSetLabels.mockClear();
});

describe("SyncData", () => {
  it("should render correctly", () => {
    render(<Wrapper />);

    const syncDataButton = screen.getByRole("button", { name: /sync data/i });
    expect(syncDataButton).not.toBeDisabled();
    expect(syncDataButton.querySelector(".lucide-rotate-cw"));
  });

  it("should render correctly all icons after click it", async () => {
    render(<Wrapper />);

    const syncDataButton = screen.getByRole("button", { name: /sync data/i });
    expect(syncDataButton).not.toBeDisabled();

    expect(syncDataButton.querySelector(".lucide-rotate-cw"));

    await user.click(syncDataButton);

    expect(syncDataButton).toBeDisabled();

    await waitFor(() => {
      expect(syncDataButton.querySelector(".lucide-loader2"));
    });

    expect(syncDataButton).toBeDisabled();

    await waitFor(() => {
      expect(syncDataButton.querySelector(".lucide-claude-check"));
    });

    expect(syncDataButton).toBeDisabled();

    await waitFor(() => {
      expect(syncDataButton.querySelector(".lucide-claude-check"));
    });

    await waitFor(
      () => {
        expect(syncDataButton).not.toBeDisabled();
      },
      { timeout: 2500 },
    );
  });

  it("should set notes and labels", async () => {
    render(<Wrapper />);
    const syncDataButton = screen.getByRole("button", { name: /sync data/i });
    await user.click(syncDataButton);

    expect(mockSetNotes).toHaveBeenCalledWith([{ id: "n1" }]);
    expect(mockSetLabels).toHaveBeenCalledWith([{ id: "l1" }]);
  });

  it("should render toast correctly when succeed", async () => {
    render(<Wrapper />);

    const syncDataButton = screen.getByRole("button", { name: /sync data/i });
    await user.click(syncDataButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Synced",
        "Your data are up to date.",
      );
    });
  });
});
