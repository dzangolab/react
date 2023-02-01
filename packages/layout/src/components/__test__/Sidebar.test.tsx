import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import Sidebar from "../Sidebar";

test("Sidebar toggle test", async () => {
  const { container } = render(<Sidebar />);

  const toggleButton = await screen.getByTestId("toggle-button");

  expect(toggleButton).toBeDefined();
  expect(container.firstChild).toHaveProperty("className", "sidebar-menu open");

  fireEvent.click(toggleButton);

  expect(container.firstChild).toHaveProperty("className", "sidebar-menu");
});
