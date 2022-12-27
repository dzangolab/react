import React from "react";
import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import SignupForm from "../SignupForm";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const component = renderer.create(<SignupForm handleSubmit={() => {}} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
