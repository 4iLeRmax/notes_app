import User from "@/components/header/header-section/user/user";
import UserButton from "@/components/header/header-section/user/user-button";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { mockSessionUser } from "../../../../jest.setup";

describe("UserButton", () => {
  it("should display user initial as first character of name", () => {
    render(<User />);

    const userButton = screen.getByRole("button", { name: /user info/i });
    expect(userButton).toBeInTheDocument();
    expect(userButton).toHaveTextContent(mockSessionUser.name[0]);
  });

  it("should display close icon after was clicked once", async () => {
    user.setup();

    render(<User />);
    const userButton = screen.getByRole("button", { name: /user info/i });

    expect(userButton.querySelector(".lucide-x")).not.toBeInTheDocument();
    await user.click(userButton);
    expect(
      screen
        .getByRole("button", { name: /user info/i })
        .querySelector(".lucide-x"),
    ).toBeInTheDocument();
  });
});
