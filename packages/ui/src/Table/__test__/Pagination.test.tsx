import { render, screen } from "@testing-library/react";
import React from "react";
import { expect, test, vi } from "vitest";

import Pagination from "../Pagination";

const mockFunction = vi.fn();

const config = [
  {
    onClick: mockFunction,
    isDisabled: true,
    icon: "start.png",
  },
  {
    onClick: mockFunction,
    isDisabled: true,
    icon: "previous.png",
  },
  {
    onClick: mockFunction,
    isDisabled: false,
    icon: "next.png",
  },
  {
    onClick: mockFunction,
    isDisabled: false,
    icon: "end.png",
  },
];

test("correct buttons are disabled", async () => {
  render(<Pagination config={config} />);

  const paginationButton = screen.getAllByRole("button") as HTMLButtonElement[];

  expect(paginationButton[0].disabled).toBe(true);
  expect(paginationButton[1].disabled).toBe(true);
  expect(paginationButton[2].disabled).toBe(false);
  expect(paginationButton[3].disabled).toBe(false);
});
