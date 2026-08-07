import Header from "@/components/header/header";
import TanstackQueryWrapper from "@/components/wrappers/tanstack-query-wrapper";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

describe("Header", () => {
  it("should render correctly", () => {
    render(
      <TanstackQueryWrapper>
        <Header />
      </TanstackQueryWrapper>,
    );
    const syncDataButton = screen.getByRole("button", { name: /sync data/i });
    expect(syncDataButton).toBeInTheDocument();

    const searchButton = screen.getByRole("button", { name: /search/i });
    expect(searchButton).toBeInTheDocument();

    const userButton = screen.getByRole("button", { name: /user info/i });
    expect(userButton).toBeInTheDocument();
  });
  it(
    "should switch to selected notes menu when one ore more notes are selected",
  );
});
