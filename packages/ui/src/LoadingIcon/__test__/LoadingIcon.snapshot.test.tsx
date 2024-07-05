import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import LoadingIcon from "../../LoadingIcon";

test("Component matches snapshot", () => {
  const { container } = render(<LoadingIcon />);
  expect(container).toMatchSnapshot();
});
