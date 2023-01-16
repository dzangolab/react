import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test } from "vitest";

import Tabs from "../Tabs";
import Tab from "../Tab";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(
    <Tabs>
      <Tab title="Tab one">
        <p>Some text</p>
      </Tab>
      <Tab title="Tab two">
        <p>Some text</p>
      </Tab>
    </Tabs>
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
