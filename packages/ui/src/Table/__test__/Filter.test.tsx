import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test, vi } from "vitest";

import Filter from "../common/Filter";

const mockFunction = vi.fn();

test("filter button expands filter menu when clicked", async () => {
  render(<Filter columnType="string" handleChange={mockFunction} />);

  const filterButton = screen.getByRole("button");
  expect(screen.queryByRole("dialog")).toBeNull();

  fireEvent.click(filterButton);
  expect(screen.queryByRole("dialog")).toBeDefined();
});
