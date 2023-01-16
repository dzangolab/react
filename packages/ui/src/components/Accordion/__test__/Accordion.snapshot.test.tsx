import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test } from "vitest";

import Accordions from "../Accordions";
import Accordion from "../Accordion";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(
    <Accordions>
      <Accordion title="Accordion one">
        <p>Some text</p>
      </Accordion>
      <Accordion title="Accordion two">
        <p>Some text</p>
      </Accordion>
    </Accordions>
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
