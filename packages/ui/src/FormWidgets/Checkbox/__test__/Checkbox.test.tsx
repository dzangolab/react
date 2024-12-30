import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test, describe } from "vitest";

import { Checkbox } from "..";

describe("Checkbox component", () => {
  test("should render the checkbox input", () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDefined();
  });
});
