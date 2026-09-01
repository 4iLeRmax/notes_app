import SyncData from "@/components/header/header-section/sync-data/sync-data";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { mockGetNotes, mockSetLabels, mockSetNotes } from "../../../jest.setup";
import { toast } from "@/components/UI/toast";
import TanstackQueryWrapper from "@/components/wrappers/root-wrapper/tanstack-query-wrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

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

  it("should display error toast on sync failure", async () => {
    user.setup();
    mockGetNotes.mockRejectedValueOnce(new Error("Network error"));

    renderWithQueryClient(<SyncData />);

    const syncButton = screen.getByRole("button", { name: /sync data/i });
    await user.click(syncButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Sync Failed",
        "Unable to sync your data. Please try again.",
      );
    });
  });
});
