import FormButton from "@/components/UI/formElements/form-button";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";

describe("FormButton", () => {
  it("should render 'Create'", () => {
    render(
      <FormButton isLoading={false}>
        <span>Create</span>
      </FormButton>,
    );

    const createButton = screen.getByRole("button", { name: /create/i });

    expect(createButton).toBeInTheDocument();
    expect(createButton).not.toBeDisabled();
  });

  it("should render loading...", () => {
    render(
      <FormButton isLoading={true}>
        <span>Create</span>
      </FormButton>,
    );

    expect(
      screen.queryByRole("button", { name: /create/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should be disabled while loading", () => {
    render(<FormButton isLoading={true}>Create</FormButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
