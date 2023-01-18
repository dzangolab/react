import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test } from "vitest";

import Accordion from "../Accordion";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(
    <Accordion title="accordion title">
      <p>accordion body</p>
    </Accordion>
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
