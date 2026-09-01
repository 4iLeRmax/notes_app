import User from "@/components/header/header-section/user/user";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import { mockSessionUser } from "../../../../jest.setup";
import { authClient } from "@/lib/auth-client";

describe("User", () => {
  it("should open user bar and render it correctly when button is clicked", async () => {
    render(<User />);

    const userButton = screen.getByRole("button", { name: /user info/i });
    expect(userButton).toBeInTheDocument();

    await user.click(userButton);

    expect(screen.getByLabelText(/user icon/i)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /user name/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(mockSessionUser.email)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("should open and close user bar when button is clicked twice", async () => {
    render(<User />);

    const userButton = screen.getByRole("button", { name: /user info/i });
    expect(userButton).toBeInTheDocument();

    await user.click(userButton);

    expect(screen.getByLabelText(/user icon/i)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /user name/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(mockSessionUser.email)).toBeInTheDocument();

    await user.click(userButton);

    expect(screen.queryByLabelText(/user icon/i)).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: mockSessionUser.name,
      }),
    ).not.toBeInTheDocument();

    expect(screen.queryByText(mockSessionUser.email)).not.toBeInTheDocument();
  });

  it("should close when click outside", async () => {
    render(
      <>
        <User />
        <button>CLick Outside</button>
      </>,
    );

    const userButton = screen.getByRole("button", { name: /user info/i });

    await user.click(userButton);

    expect(screen.getByText(mockSessionUser.email)).toBeInTheDocument();

    const clickOutsideButton = screen.getByRole("button", {
      name: /click outside/i,
    });

    await user.click(clickOutsideButton);

    expect(screen.queryByText(mockSessionUser.email)).not.toBeInTheDocument();
  });

  it("should close when on scroll", async () => {
    render(<User />);

    const userButton = screen.getByRole("button", { name: /user info/i });

    await user.click(userButton);

    expect(screen.getByText(mockSessionUser.email)).toBeInTheDocument();

    fireEvent.scroll(window);

    expect(screen.queryByText(mockSessionUser.email)).not.toBeInTheDocument();
  });

  it("should render UserIconSkeleton when session isPending equal to true", () => {
    (authClient.useSession as jest.Mock).mockReturnValueOnce({
      data: {
        user: mockSessionUser,
        session: { userId: mockSessionUser.id },
      },
      isPending: true,
    });

    render(<User />);

    expect(
      screen.queryByRole("button", { name: /user info/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId(/user-skeleton/i)).toBeInTheDocument();
  });

  it("should render UserIconSkeleton when session data is null", () => {
    (authClient.useSession as jest.Mock).mockReturnValueOnce({
      data: null,
      isPending: false,
    });

    render(<User />);

    expect(
      screen.queryByRole("button", { name: /user info/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId(/user-skeleton/i)).toBeInTheDocument();
  });

  it("should NOT render UserIconSkeleton when session date is NOT empty AND isPending equal to false", () => {
    (authClient.useSession as jest.Mock).mockReturnValueOnce({
      data: {
        user: mockSessionUser,
        session: { userId: mockSessionUser.id },
      },
      isPending: false,
    });

    render(<User />);

    expect(
      screen.getByRole("button", { name: /user info/i }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId(/user-skeleton/i)).not.toBeInTheDocument();
  });
});
