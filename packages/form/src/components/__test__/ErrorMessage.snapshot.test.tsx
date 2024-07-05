import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { ErrorMessage } from "../ErrorMessage";

test("Component matches snapshot", () => {
  const { container } = render(<ErrorMessage message="Error message" />);

  expect(container).toMatchSnapshot();
});
