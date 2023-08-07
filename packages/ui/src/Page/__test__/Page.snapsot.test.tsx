import React from "react";
import { create } from "react-test-renderer";
import { expect, test } from "vitest";

import Page from "../index";

import type {
  ReactTestRenderer,
  ReactTestRendererJSON,
} from "react-test-renderer";

const pageData = {
  title: "This is the title",
  subtitle: "This is the subtitle",
};

function toJson(component: ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(
    <Page title={pageData.title} subtitle={pageData.subtitle}>
      <p>This is the content</p>
    </Page>,
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
