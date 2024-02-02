import { render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import ResponsiveMenu from "../index";

export const menuRoutes = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "About",
    route: "/about",
  },
];

test("menu items are rendered", async () => {
  render(<ResponsiveMenu routes={menuRoutes} />);

  const links: HTMLAnchorElement[] = screen.getAllByRole("link");

  expect(links[0].textContent).toEqual("Home");
  expect(links[0].href).toContain("/");

  expect(links[1].textContent).toEqual("About");
  expect(links[1].href).toContain("/about");
});
