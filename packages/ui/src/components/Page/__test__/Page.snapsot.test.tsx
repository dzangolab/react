import React from "react";
import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import Page from "../index";

const pageData = {
  title: "This is the title",
  subtitle: "This is the subtitle",
};

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = renderer.create(
    <Page title={pageData.title} subtitle={pageData.subtitle}>
      <p>This is the content</p>
    </Page>
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
