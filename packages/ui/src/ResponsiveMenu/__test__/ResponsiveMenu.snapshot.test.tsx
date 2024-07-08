import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import ResponsiveMenu from "../index";

export const menuRoutes = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "About",
    route: "/about",
  },
];

test("Component matches snapshot", () => {
  const { container } = render(<ResponsiveMenu routes={menuRoutes} />);
  expect(container).toMatchSnapshot();
});
