import React from "react";
import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import LoginForm from "../LoginForm";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const component = renderer.create(<LoginForm handleSubmit={() => {}} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
