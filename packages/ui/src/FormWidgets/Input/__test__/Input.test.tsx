import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { expect, test, describe, vi } from "vitest";

import { Input } from "..";

describe("Input", () => {
  test("should render input with a label", () => {
    render(<Input label="username" name="username" />);

    expect(screen.getByLabelText("username")).toBeInTheDocument();
  });

  test("should render input with placeholder when placeholder is provided", () => {
    render(
      <Input label="username" name="username" placeholder="Enter username" />,
    );

    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  test("should have the correct initial value when defaultValue is provided", () => {
    render(<Input label="username" name="username" defaultValue="john" />);

    expect(screen.getByDisplayValue("john")).toBeInTheDocument();
  });

  test("should display helper text", () => {
    render(
      <Input
        label="username"
        name="username"
        helperText="Please enter your username"
      />,
    );

    const helperText = screen.getByText("Please enter your username");
    expect(helperText).toBeInTheDocument();
  });

  test("should display error message", () => {
    render(
      <Input label="username" name="username" errorMessage="Required field" />,
    );

    const errorMessage = screen.getByText("Required field");
    expect(errorMessage).toBeInTheDocument();
  });

  test("should trigger onChange correclty", () => {
    const handleChange = vi.fn();
    render(<Input label="username" name="username" onChange={handleChange} />);

    const input = screen.getByLabelText("username");
    fireEvent.change(input, { target: { value: "value" } });

    expect(input).toHaveValue("value");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("should disable the input field when disabled is true", () => {
    render(<Input label="username" name="username" disabled={true} />);

    const input = screen.getByLabelText("username");
    expect(input).toBeDisabled();
  });

  test("should not disable the input field when disabled is true", () => {
    render(<Input label="username" name="username" />);

    const input = screen.getByLabelText("username");
    expect(input).not.toBeDisabled();
  });

  test("should apply aria-invalid when hasError is true", () => {
    render(<Input label="username" name="username" hasError={true} />);

    const input = screen.getByLabelText("username");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  test("should set the correct input type when type is passed", () => {
    render(<Input name="age" label="age" type="number" />);

    const input = screen.getByLabelText("age");
    expect(input).toHaveAttribute("type", "number");
  });

  test("should render custom className", () => {
    const { container } = render(
      <Input label="username" name="username" className="custom-class" />,
    );

    expect(container.querySelector("div")).toHaveClass("custom-class");
  });
});
