import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { SubmitButton } from "..";

test("Component matches snapshot", () => {
  const { container } = render(<SubmitButton label="Submit" />);
  expect(container).toMatchSnapshot();
});
