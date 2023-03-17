import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test } from "vitest";

import SubmitButton from "..";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(<SubmitButton label="Submit" />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
