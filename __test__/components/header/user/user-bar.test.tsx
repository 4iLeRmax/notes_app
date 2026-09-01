import UserBar from "@/components/header/header-section/user/user-bar";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockSessionUser } from "../../../../jest.setup";

describe("UserBar", () => {
  it("should render user avatar with first letter", () => {
    render(<UserBar user={mockSessionUser} />);

    const userIcon = screen.getByLabelText(/user icon/i);
    expect(userIcon).toHaveTextContent(mockSessionUser.name[0]);
  });

  it("should display user name", () => {
    render(<UserBar user={mockSessionUser} />);

    const userName = screen.getByRole("heading", { name: /user name/i });
    expect(userName).toHaveTextContent(mockSessionUser.name);
  });

  it("should display user email", () => {
    render(<UserBar user={mockSessionUser} />);

    const userEmail = screen.getByRole("paragraph", { name: /user email/i });
    expect(userEmail).toHaveTextContent(mockSessionUser.email);
  });

  it("should render logout button", () => {
    render(<UserBar user={mockSessionUser} />);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toHaveTextContent(/Logout/i);
    expect(logoutButton).toBeInTheDocument();
  });
});
