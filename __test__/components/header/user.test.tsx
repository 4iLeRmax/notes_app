import UserInfo from "@/components/header/user/user-info";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";

const mockSessionUser = {
  id: "1",
  name: "Test User",
  email: "test@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
  emailVerified: true,
};

describe("User", () => {
  it("should open user bar and render it correctly when button is clicked", async () => {
    render(<UserInfo user={mockSessionUser} />);

    const userButton = screen.getByRole("button", { name: /user info/i });
    expect(userButton).toBeInTheDocument();

    await user.click(userButton);

    const userName = screen.getByRole("heading", {
      name: mockSessionUser.name,
    });
    expect(userName).toBeInTheDocument();

    const userEmail = screen.getByText(mockSessionUser.email);
    expect(userEmail).toBeInTheDocument();

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });

  it("should open and close user bar when button is clicked twice", async () => {
    render(<UserInfo user={mockSessionUser} />);

    const userButton = screen.getByRole("button", { name: /user info/i });
    expect(userButton).toBeInTheDocument();

    await user.click(userButton);

    expect(
      screen.getByRole("heading", {
        name: mockSessionUser.name,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(mockSessionUser.email)).toBeInTheDocument();

    await user.click(userButton);

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
        <UserInfo user={mockSessionUser} />
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

  it("should close when user scroll", async () => {
    render(<UserInfo user={mockSessionUser} />);

    const userButton = screen.getByRole("button", { name: /user info/i });

    await user.click(userButton);

    expect(screen.getByText(mockSessionUser.email)).toBeInTheDocument();

    fireEvent.scroll(window);

    expect(screen.queryByText(mockSessionUser.email)).not.toBeInTheDocument();
  });
});
