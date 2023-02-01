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
      index={1}
      icon="icon1.jpg"
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handleClick={() => {}}
    />
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
