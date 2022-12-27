import { render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import Page from "../Page";

test("All the page component are rendered", () => {
  render(
    <Page
      title="Test title"
      subTitle="Test subtitle"
      toolbar={<div>Toolbar content</div>}
    />
  );

  const title = screen.getByRole("heading");
  const subTitle = screen.getByText("Test subtitle");
  const toolbar = screen.getByText("Toolbar content");

  expect(title).toBeDefined();
  expect(subTitle).toBeDefined();
  expect(title.textContent).toBe("Test titleTest subtitle");
  expect(toolbar).toBeDefined();
});
