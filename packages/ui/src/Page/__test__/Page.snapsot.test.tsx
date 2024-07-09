import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import Page from "../index";

const pageData = {
  title: "This is the title",
  subtitle: "This is the subtitle",
};

test("Component matches snapshot", () => {
  const { container } = render(
    <Page title={pageData.title} subtitle={pageData.subtitle}>
      <p>This is the content</p>
    </Page>,
  );
  expect(container).toMatchSnapshot();
});
