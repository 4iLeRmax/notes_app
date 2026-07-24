import "@testing-library/jest-dom";
import TestComponent from "@/components/test-component";
import { render, screen } from "@testing-library/react";

describe("Test component", () => {
  it("should renders correctly", () => {
    render(<TestComponent />);
    const divElement = screen.getByText("Test text");

    expect(divElement).toBeInTheDocument();
  });
});
