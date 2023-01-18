import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test } from "vitest";

import AccordionTitle from "../AccordionTitle";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(
    <AccordionTitle
      title="accordion title"
      eventKey={1}
      selected={1}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setSelected={() => {}}
    />
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
