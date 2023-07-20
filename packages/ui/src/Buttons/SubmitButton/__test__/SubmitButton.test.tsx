import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { SubmitButton } from "..";

const values = {
  label: "Submit",
};

test("button is rendered", async () => {
  render(<SubmitButton label={values.label} />);

  expect(screen.getByText(values.label)).toBeDefined();
});

test("loading is rendered", async () => {
  render(<SubmitButton label={values.label} />);

  expect(screen.getByText(values.label)).toBeDefined();

  render(<SubmitButton label={values.label} loading={true} />);

  await waitFor(() => {
    expect(screen.getByTestId("loading")).toBeDefined();
  });
});
