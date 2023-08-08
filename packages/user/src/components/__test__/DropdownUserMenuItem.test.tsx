import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";

import DropdownUserMenuItem from "../DropdownUserMenuItem";

test("test DropdownUserMenuItem for children", async () => {
  render(<DropdownUserMenuItem children={"profile"} />);

  expect(await screen.findByText("profile")).toBeDefined();
});

test("test DropdownUserMenuItem for link", async () => {
  const route = "/profile";

  render(
    <MemoryRouter>
      <DropdownUserMenuItem children={undefined} route={route} />
    </MemoryRouter>,
  );

  const link = screen.getByRole("link");

  expect(link).toBeDefined();
  expect(link.getAttribute("href")).toBe(route);
});
