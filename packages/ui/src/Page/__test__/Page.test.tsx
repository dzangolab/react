import { render, screen, within } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import Page from "../index";

const pageData = {
  title: "This is the title",
  subtitle: "This is the subtitle",
};

test("correct title, subtitle and content are displayed", async () => {
  render(
    <Page title={pageData.title} subtitle={pageData.subtitle}>
      <p>This is the content</p>
    </Page>,
  );

  const header = screen.getByRole("heading", { level: 1 });
  expect(header).toBeDefined();
  const { getByText } = within(header);
  expect(getByText(pageData.title)).toBeDefined();
  // expect(getByText(pageData.subtitle)).toBeDefined();

  const content = screen.getByTestId("page-content");
  expect(content).toBeDefined();
  const { getByText: getByTextOfContent } = within(content);
  expect(getByTextOfContent("This is the content")).toBeDefined();
});
