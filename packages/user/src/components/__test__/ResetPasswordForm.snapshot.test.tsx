import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { ForgotPasswordForm } from "../ForgotPasswordForm";

test("Component matches snapshot", () => {
  const { container } = render(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <ForgotPasswordForm handleSubmit={() => {}} />,
  );

  expect(container).toMatchSnapshot();
});
