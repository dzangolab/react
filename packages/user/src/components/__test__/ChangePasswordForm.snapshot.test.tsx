import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import ChangePasswordForm from "../ChangePasswordForm";

test("Component matches snapshot", () => {
  const { container } = render(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <ChangePasswordForm handleSubmit={() => {}} />,
  );

  expect(container).toMatchSnapshot();
});
