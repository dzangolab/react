import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import DropdownUserMenuItem from "../DropdownUserMenuItem";

test("Component matches snapshot", () => {
  const { container } = render(
    <DropdownUserMenuItem>test</DropdownUserMenuItem>,
  );

  expect(container).toMatchSnapshot();
});
