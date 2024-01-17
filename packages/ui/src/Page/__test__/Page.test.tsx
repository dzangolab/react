import { render, screen, within } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { Button } from "../../Buttons/ButtonBasic";
import Page from "../index";

const pageData = {
  title: "This is the title",
  subtitle: "This is the subtitle",
  toolbar: <Button label="Click me" />,
};

test("when title, subtitle, toolbar and content are provided", async () => {
  render(
    <Page
      title={pageData.title}
      subtitle={pageData.subtitle}
      toolbar={pageData.toolbar}
    >
      <p>This is the content</p>
    </Page>,
  );

  const header = screen.getByRole("heading", { level: 1 });
  expect(header).toBeDefined();
  expect(header.textContent).toBe(pageData.title);

  const subtitle = screen.getByTestId("subtitle");
  expect(subtitle).toBeDefined();
  expect(subtitle.textContent).toBe(pageData.subtitle);

  const toolbar = screen.getByTestId("toolbar");
  expect(toolbar).toBeDefined();
  const button = within(toolbar).queryByText("Click me");
  expect(button).toBeDefined();

  const content = screen.getByTestId("page-content");
  expect(content).toBeDefined();
  expect(content.textContent).toBe("This is the content");
});

test("when title, subtitle, and toolbar are not provided", async () => {
  render(
    <Page>
      <p>This is the content</p>
    </Page>,
  );

  const title = screen.queryByRole("heading", { level: 1 });
  expect(title).toBeNull();

  const subtitle = screen.queryByTestId("subtitle");
  expect(subtitle).toBeNull();

  const toolbar = screen.queryByTestId("toolbar");
  expect(toolbar).toBeNull();

  const content = screen.getByTestId("page-content");
  expect(content).toBeDefined();
  expect(content.textContent).toBe("This is the content");
});
