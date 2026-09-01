import { SEARCH_QUERY_LIMIT } from "@/lib/constants";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { mockReplace, mockUseSearchParams } from "../../../jest.setup";
import NotesPathBoundary from "@/components/wrappers/notes-path-boundary";
import { usePathname } from "next/navigation";
import Search from "@/components/header/header-section/search/search";

const mockedUsePathname = usePathname as jest.Mock;

describe("Search", () => {
  mockedUsePathname.mockReturnValue("/notes");

  it("should render correctly", () => {
    render(<Search />);

    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });
    expect(searchButton).toBeInTheDocument();
  });

  it("should toggle button's icon when click twice", async () => {
    render(<Search />);

    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });

    expect(searchButton).toHaveAttribute("aria-pressed", "false");

    await user.click(searchButton);

    expect(searchButton).toHaveAttribute("aria-pressed", "true");

    await user.click(searchButton);

    expect(searchButton).toHaveAttribute("aria-pressed", "false");
  });

  it("should open when click it", async () => {
    render(<Search />);

    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });

    await user.click(searchButton);

    const searchInput = screen.getByPlaceholderText(/search.../i);
    expect(searchInput).toBeInTheDocument();
  });

  it("should open when click it and have focus", async () => {
    render(<Search />);

    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });

    await user.click(searchButton);

    const searchInput = screen.getByPlaceholderText(/search.../i);
    expect(searchInput).toHaveFocus();
  });

  it("should open and close when click it twice", async () => {
    render(<Search />);

    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });

    await user.click(searchButton);

    expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();

    await user.click(searchButton);

    expect(screen.queryByPlaceholderText(/search.../i)).not.toBeInTheDocument();
  });

  it("should close when click outside", async () => {
    render(
      <>
        <Search />
        <button>Click Outside</button>
      </>,
    );

    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });

    await user.click(searchButton);

    expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /click outside/i }));

    expect(screen.queryByPlaceholderText(/search.../i)).not.toBeInTheDocument();
  });

  it("should NOT close when click outside and input is NOT empty", async () => {
    render(
      <>
        <Search />
        <button>Click Outside</button>
      </>,
    );

    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });
    await user.click(searchButton);

    const searchInput = screen.getByPlaceholderText(/search.../i);
    await user.type(searchInput, "123");

    await user.click(screen.getByRole("button", { name: /click outside/i }));

    expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
  });

  it("should receive value", async () => {
    render(<Search />);

    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });

    await user.click(searchButton);

    const searchInput = screen.getByPlaceholderText(/search.../i);
    expect(searchInput).toHaveDisplayValue("");

    await user.type(searchInput, "123");
    expect(searchInput).toHaveDisplayValue("123");
  });

  it("should NOT receive value longer then limit", async () => {
    render(<Search />);

    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });

    await user.click(searchButton);

    const searchInput = screen.getByPlaceholderText(/search.../i);
    await user.click(searchInput);

    await user.paste("1".repeat(SEARCH_QUERY_LIMIT + 1));
    expect(searchInput).toHaveDisplayValue("1".repeat(SEARCH_QUERY_LIMIT));
  });

  it("should close when scroll and input is empty", async () => {
    render(<Search />);

    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });

    await user.click(searchButton);

    const searchInput = screen.getByPlaceholderText(/search.../i);
    expect(searchInput).toHaveDisplayValue("");

    fireEvent.scroll(window);

    expect(screen.queryByPlaceholderText(/search.../i)).not.toBeInTheDocument();
  });

  it("should NOT close when scroll and input is NOT empty", async () => {
    render(<Search />);

    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });

    await user.click(searchButton);

    const searchInput = screen.getByPlaceholderText(/search.../i);

    await user.type(searchInput, "123");
    expect(searchInput).toHaveDisplayValue("123");

    fireEvent.scroll(window);

    expect(searchInput).toBeInTheDocument();
  });

  it("should update search params when pass a value", async () => {
    render(<Search />);
    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });

    await user.click(searchButton);

    const searchInput = screen.getByPlaceholderText(/search.../i);
    await user.type(searchInput, "123");

    expect(searchInput).toHaveDisplayValue("123");

    await waitFor(() =>
      expect(mockReplace).toHaveBeenCalledWith(
        expect.stringContaining("q=123"),
      ),
    );
  });

  it("should clear search params when close it", async () => {
    render(<Search />);
    const searchButton = screen.getByRole("button", {
      name: /open search bar/i,
    });

    await user.click(searchButton);

    const searchInput = screen.getByPlaceholderText(/search.../i);
    await user.type(searchInput, "123");

    expect(searchInput).toHaveDisplayValue("123");

    await waitFor(() =>
      expect(mockReplace).toHaveBeenCalledWith(
        expect.stringContaining("q=123"),
      ),
    );

    await user.click(searchButton);

    expect(screen.queryByPlaceholderText(/search.../i)).not.toBeInTheDocument();

    expect(mockReplace).toHaveBeenCalledTimes(1);
  });

  it("should open pre-filled when a q param already exists on mount", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("q=milk"));

    render(<Search />);

    expect(screen.getByPlaceholderText(/search.../i)).toHaveDisplayValue(
      "milk",
    );
  });

  it("should render only on /notes pathname", () => {
    render(
      <NotesPathBoundary>
        <Search />
      </NotesPathBoundary>,
    );

    expect(
      screen.getByRole("button", {
        name: /open search bar/i,
      }),
    ).toBeInTheDocument();
  });

  it("should NOT render on other pathnames", () => {
    mockedUsePathname.mockReturnValueOnce("/notes/123123123");

    render(
      <NotesPathBoundary>
        <Search />
      </NotesPathBoundary>,
    );

    expect(
      screen.queryByRole("button", {
        name: /open search bar/i,
      }),
    ).not.toBeInTheDocument();
  });
});
